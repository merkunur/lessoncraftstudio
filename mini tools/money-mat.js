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

   NO-SHAME: no timers/scores/verdict colors; tap a mat coin to take it
   back (full reversibility); the another-way invitation is dismissible
   and simply persists until the multiset differs — never a scolding;
   in change mode every offered choice is valid (no wrong tap exists);
   the keeper's face NEVER reacts to the child (fixed smile, idle blink).

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
    takeCoin:     {en:'Take your coin!',de:'Nimm deine Münze!',fr:'Prends ta pièce !',it:'Prendi la tua moneta!',es:'¡Toma tu moneda!',pt:'Pegue sua moeda!',nl:'Pak je munt maar!',sv:'Varsågod — ta myntet!',da:'Tag din mønt!',no:'Ta mynten din!',fi:'Ota kolikkosi!'},
    speakTotal:   {en:'Say the total out loud',de:'Den Betrag vorlesen',fr:'Dire le total à voix haute',it:'Ascolta il totale',es:'Decir el total en voz alta',pt:'Falar o total em voz alta',nl:'Het bedrag hardop horen',sv:'Läs upp summan',da:'Sig beløbet højt',no:'Les opp summen',fi:'Lue summa ääneen'},
    matEmpty:     {en:'The mat is empty.',de:'Die Matte ist leer.',fr:'Le tapis est vide.',it:'Il tappeto è vuoto.',es:'El tapete está vacío.',pt:'O tapete está vazio.',nl:'De mat is leeg.',sv:'Mattan är tom.',da:'Måtten er tom.',no:'Matta er tom.',fi:'Matto on tyhjä.'},
    saveStall:    {en:'Save this stall',de:'Diesen Stand speichern',fr:'Enregistrer cet étal',it:'Salva questo banco',es:'Guardar este puesto',pt:'Salvar esta banca',nl:'Dit kraampje opslaan',sv:'Spara torgståndet',da:'Gem denne bod',no:'Lagre denne boden',fi:'Tallenna tämä koju'},
    savedList:    {en:'Saved stalls',de:'Gespeicherte Stände',fr:'Étals enregistrés',it:'Banchi salvati',es:'Puestos guardados',pt:'Bancas salvas',nl:'Opgeslagen kraampjes',sv:'Sparade torgstånd',da:'Gemte boder',no:'Lagrede boder',fi:'Tallennetut kojut'},
    gateBands:    {en:'Bigger prices, banknotes, getting change, and saved stalls are part of Premium. The small-price stall with every coin — and “make it another way” — is always free.',de:'Größere Preise, Geldscheine, Rückgeld und gespeicherte Stände gehören zu Premium. Der Stand mit kleinen Preisen und allen Münzen — samt „auch anders legen“ — bleibt immer kostenlos.',fr:'Les prix plus grands, les billets, la monnaie rendue et les étals enregistrés font partie de Premium. L’étal des petits prix avec toutes les pièces — et « d’une autre façon » — reste toujours gratuit.',it:'I prezzi più grandi, le banconote, il resto e i banchi salvati fanno parte di Premium. Il banco dei prezzi piccoli con tutte le monete — e «in un altro modo» — resta sempre gratuito.',es:'Los precios más grandes, los billetes, recibir la vuelta y los puestos guardados forman parte de Premium. El puesto de precios pequeños con todas las monedas — y el «de otra manera» — es gratis para siempre.',pt:'Preços maiores, cédulas, troco e bancas salvas fazem parte do Premium. A banca de preços pequenos com todas as moedas — e o “de outro jeito” — é sempre gratuita.',nl:'Grotere prijzen, briefgeld, wisselgeld en opgeslagen kraampjes horen bij Premium. Het kraampje met kleine prijzen en alle munten — én “op een andere manier” — blijft altijd gratis.',sv:'Högre priser, sedlar, växel och sparade torgstånd ingår i Premium. Torgståndet med låga priser och alla mynt — och ”på ett annat sätt” — är alltid gratis.',da:'Større priser, sedler, byttepenge og gemte boder er en del af Premium. Boden med små priser og alle mønter — og “på en anden måde” — er altid gratis.',no:'Større priser, sedler, vekslepenger og lagrede boder er en del av Premium. Boden med små priser og alle myntene — og «på en annen måte» — er alltid gratis.',fi:'Isommat hinnat, setelit, vaihtorahat ja tallennetut kojut kuuluvat Premiumiin. Pienten hintojen koju kolikoineen — ja ”toisella tavalla” — on aina ilmainen.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    loading:      {en:'Opening the stall…',de:'Der Stand wird aufgebaut…',fr:'On installe l’étal…',it:'Apriamo il banco…',es:'Abriendo el puesto…',pt:'Abrindo a banca…',nl:'Het kraampje gaat open…',sv:'Torgståndet öppnar…',da:'Boden åbner…',no:'Boden åpner…',fi:'Koju aukeaa…'},
    setCurrency:  {en:'Currency',de:'Währung',fr:'Devise',it:'Valuta',es:'Moneda',pt:'Moeda',nl:'Munteenheid',sv:'Valuta',da:'Valuta',no:'Valuta',fi:'Valuutta'},
    curUSD:       {en:'Dollars (USD)',de:'Dollar (USD)',fr:'Dollars (USD)',it:'Dollari (USD)',es:'Dólares (USD)',pt:'Dólares (USD)',nl:'Dollars (USD)',sv:'Dollar (USD)',da:'Dollar (USD)',no:'Dollar (USD)',fi:'Dollarit (USD)'},
    curGBP:       {en:'Pounds (GBP)',de:'Pfund (GBP)',fr:'Livres (GBP)',it:'Sterline (GBP)',es:'Libras (GBP)',pt:'Libras (GBP)',nl:'Ponden (GBP)',sv:'Pund (GBP)',da:'Pund (GBP)',no:'Pund (GBP)',fi:'Punnat (GBP)'},
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
  BANDS: {
    1: { maxCents: 100, maxKr: 10, grainCents: 5 },
    2: { maxCents: 500, maxKr: 50, grainCents: 1 },
    3: { maxCents: 2000, maxKr: 100, grainCents: 1 }
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

  defaults: { enCurrency: 'usd', speakNames: true },
  settings: [
    { key: 'enCurrency', type: 'choice', labelKey: 'setCurrency', options: [
      { value: 'usd', labelKey: 'curUSD' }, { value: 'gbp', labelKey: 'curGBP' }
    ], enOnly: true },
    { key: 'speakNames', type: 'toggle', labelKey: 'setSpeak' }
  ],

  STORE_KEY: 'lcs:money-mat:v1',
  ENT_TRUST_DAYS: 14,

  /* ======================= PURE money engine ======================= */

  cur: function () {
    var key = this.api && this.api.lang === 'en' ? (this.api.settings.enCurrency || 'usd') : this.LOCALE_CUR[(this.api && this.api.lang) || 'en'];
    return this.CURRENCIES[key];
  },
  /* the locale VIEW of the currency: same descriptor, coins filtered by
     the COIN_MIN veto — every engine path below consumes the view */
  curView: function () {
    var c = this.cur();
    var min = this.COIN_MIN[(this.api && this.api.lang) || 'en'] || 0;
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
  /* the price TAG: minor-form under 1 major, major-form above */
  formatTag: function (v, cKey) {
    var c = this.CURRENCIES[cKey || this.curKey()];
    if (c.minorPerMajor === 1) return v + ' ' + c.symbol;
    if (v < c.minorPerMajor) {
      var minMark = { eur: 'c', usd: '¢', gbp: 'p', brl: 'c' }[cKey || this.curKey()] || 'c';
      if ((this.api && this.api.lang) === 'nl') minMark = 'ct';   /* Dutch tags read "ct" */
      return v + ' ' + minMark;
    }
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
  /* PURE: shopkeeper change — greedy fewest-coins (canonical sets),
     presented ASCENDING for the counting-on ritual. */
  greedyChange: function (change, coinValues) {
    var vals = coinValues.slice().sort(function (a, b) { return b - a; });
    var out = [], rem = change;
    for (var i = 0; i < vals.length && rem > 0; i++) {
      while (vals[i] <= rem) { out.push(vals[i]); rem -= vals[i]; }
    }
    if (rem !== 0) return null;
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
        var chg = self.greedyChange(d.v - price, coinVals);
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
    var grain = c.minorPerMajor === 1 ? 1 : Math.max(b.grainCents, minCoin);
    var lo, hi;
    if (tier === 1) { lo = grain; hi = Math.max(grain, Math.floor(max * 0.4)); }
    else if (tier === 2) { lo = Math.floor(max * 0.3); hi = Math.floor(max * 0.7); }
    else { lo = Math.floor(max * 0.6); hi = max; }
    lo = Math.max(minCoin, Math.ceil(lo / grain) * grain);
    hi = Math.max(lo, Math.floor(hi / grain) * grain);
    return { lo: lo, hi: hi, grain: grain };
  },
  pickPrice: function (band, tier, cKey, mode) {
    /* CHANGE MODE runs on band-1 prices (≤ 1 major / ≤ 10 kr) at a
       friendly 5-minor grain — counting on within the unit is the K-2
       skill, and the counted-back change stays ≤ 6 speakable coins in
       EVERY currency (gate-proven; larger spans made USD/NOK change
       inhumane). The band chips govern shop mode only. */
    var effBand = mode === 'change' ? 1 : band;
    var minOv = this.COIN_MIN[(this.api && this.api.lang) || 'en'] || 0;
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

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null, stalls: [] };
    if (!this._store.stalls) this._store.stalls = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var params = new URLSearchParams(location.search);
    var wantBand = parseInt(params.get('band'), 10);
    if (wantBand >= 1 && wantBand <= 3) this.band = wantBand;
    if (!this.premium && this.band !== 1) this.band = this.premium ? this.band : 1;

    this.price = this.pickPrice(this.band, this.ITEMS[this.itemIdx].tier, this.curKey(), this.mode);
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
    var wrap = api.el('div', 'mm-wrap');
    api.stage.appendChild(wrap);
    this._wrap = wrap;

    /* ------- the stall scene ------- */
    var scene = api.el('div', 'mm-scene');
    scene.innerHTML =
      '<div class="mm-awning">' + '<span></span><span></span><span></span><span></span><span></span><span></span>' + '</div>' +
      '<div class="mm-keeper">' + this._keeperSVG() + '</div>' +
      '<div class="mm-counter"></div>';
    /* item seated on the counter edge (alpha-trim, the standing rule) */
    var itemKey = this.ITEMS[this.itemIdx].k;
    var anchor = api.el('div', 'mm-item-anchor');
    var phone = false;
    try { phone = window.matchMedia('(max-width: 480px)').matches; } catch (_) {}
    var pl = this._itemPlacement(itemKey, phone ? 72 : 120, phone ? 96 : 150);
    var img = api.el('img', 'mm-item');
    img.src = this._imgUrl(itemKey);
    img.alt = this._noun(itemKey);
    img.draggable = false;
    img.style.width = pl.width + 'px';
    img.style.left = pl.left + 'px';
    img.style.bottom = pl.bottom + 'px';
    anchor.appendChild(img);
    scene.appendChild(anchor);
    /* price tag */
    var tag = api.el('div', 'mm-tag');
    tag.innerHTML = '<span class="mm-tag-string"></span><span class="mm-tag-body">' + this.formatTag(this.price) + '</span>';
    scene.appendChild(tag);
    wrap.appendChild(scene);

    /* ------- mat + total ------- */
    var matZone = api.el('div', 'mm-matzone');
    var inChange = this.phase === 'changePick' || this.phase === 'changeCount';
    var totalRow = api.el('div', 'mm-totalrow' + (inChange ? ' mm-hidden' : ''));
    var pill = api.el('div', 'mm-total');
    pill.textContent = this.formatMoney(this.trayTotal());
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
    var mat = api.el('div', 'mm-mat');
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
  },

  _keeperSVG: function () {
    /* a simple warm keeper: fixed gentle smile, idle blink ONLY — the
       face NEVER reacts to child actions (no-shame audit item) */
    return '<svg viewBox="0 0 120 150" width="110" height="138" aria-hidden="true">' +
      /* shoulders + torso FIRST so the head sits connected on them */
      '<path d="M24 150 L30 104 Q38 82 60 82 Q82 82 90 104 L96 150 Z" fill="#146B5E"/>' +
      '<rect x="42" y="104" width="36" height="46" rx="6" fill="#FBF3E4" opacity="0.9"/>' +
      '<path d="M42 108 h36" stroke="#E7DCC8" stroke-width="2"/>' +
      '<rect x="53" y="66" width="14" height="16" rx="5" fill="#D89A6E"/>' +
      '<circle cx="60" cy="46" r="26" fill="#E0A878"/>' +
      '<path d="M34 42 Q60 12 86 42 Q80 24 60 22 Q40 24 34 42 Z" fill="#5A4630"/>' +
      '<circle class="mm-eye" cx="50" cy="46" r="3" fill="#2A2A35"/>' +
      '<circle class="mm-eye" cx="70" cy="46" r="3" fill="#2A2A35"/>' +
      '<path d="M50 57 q10 7 20 0" stroke="#8A5A3A" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  },

  _coinBtn: function (den, cls) {
    var api = this.api;
    var b = api.el('button', 'mm-coinbtn ' + (cls || ''));
    b.type = 'button';
    b.setAttribute('aria-label', den.label);
    b.dataset.v = den.v;
    var inner = den.fam === 'bi-sg'
      ? '<span class="mm-disc fam-gold" style="width:' + den.d + 'px;height:' + den.d + 'px"><span class="mm-disc-in fam-silver">' + den.label + '</span></span>'
      : den.fam === 'bi-gs'
        ? '<span class="mm-disc fam-silver" style="width:' + den.d + 'px;height:' + den.d + 'px"><span class="mm-disc-in fam-gold">' + den.label + '</span></span>'
        : '<span class="mm-disc fam-' + den.fam + '" style="width:' + den.d + 'px;height:' + den.d + 'px">' + den.label + '</span>';
    b.innerHTML = inner;
    return b;
  },
  _noteBtn: function (den) {
    var b = this.api.el('button', 'mm-notebtn');
    b.type = 'button';
    b.setAttribute('aria-label', den.label);
    b.dataset.v = den.v;
    b.innerHTML = '<span class="mm-note" style="background:' + den.tint + '"><i>' + den.label + '</i><b>' + den.label + '</b></span>';
    return b;
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
    if (this.phase === 'changeCount' || this.phase === 'bothWays') return;
    var c = this.curView();
    c.coins.forEach(function (den) {
      var b = self._coinBtn(den);
      b.addEventListener('click', function () { self._placeCoin(den.v); });
      host.appendChild(b);
    });
    if (this.premium && this.band > 1) {
      c.notes.forEach(function (den) {
        var b = self._noteBtn(den);
        b.addEventListener('click', function () { self._placeCoin(den.v); });
        host.appendChild(b);
      });
    }
  },

  _placeCoin: function (v) {
    if (this.phase === 'bothWays' || this.phase === 'changePick' || this.phase === 'changeCount') return;
    this.tray.push(v);
    var den = this._denOf(v);
    this._sfxClink(den ? (den.d || 40) : 40);
    this._paintTray();
    this._checkPaid();
  },
  _removeCoin: function (idx) {
    if (this.phase === 'bothWays') return;
    var v = this.tray.splice(idx, 1)[0];
    var den = this._denOf(v);
    this._sfxClink(den ? (den.d || 40) : 40, true);
    this._paintTray();
    /* leaving exact-paid state rewinds the invitation phase */
    if (this.phase === 'invited' || this.phase === 'secondWay') {
      if (this.trayTotal() !== this.price) {
        if (this.phase === 'invited' && !this.firstWay) this.phase = 'paying';
      }
    }
    this._paintPhase();
  },
  _paintTray: function () {
    var self = this;
    if (!this._matEl) return;
    this._matEl.innerHTML = '';
    this.tray.forEach(function (v, i) {
      var den = self._denOf(v);
      if (!den) return;
      var b = den.fam ? self._coinBtn(den, 'on-mat') : self._noteBtn(den);
      b.classList.add('on-mat');
      b.addEventListener('click', function () { self._removeCoin(i); });
      self._matEl.appendChild(b);
    });
    if (this._totalEl) this._totalEl.textContent = this.formatMoney(this.trayTotal());
  },
  _checkPaid: function () {
    var self = this;
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
      txt.textContent = this.fmt('anotherWay', { price: this.formatTag(this.price) });
      var go = api.el('button', 'mm-chip small primary');
      go.type = 'button'; go.textContent = '✦';
      go.setAttribute('aria-label', this.fmt('anotherWay', { price: this.formatTag(this.price) }));
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
      var mk = function (way) {
        var box = api.el('div', 'mm-way');
        way.slice().sort(function (a, b) { return b - a; }).forEach(function (v) {
          var den = self._denOf(v);
          if (den) box.innerHTML += den.fam
            ? '<span class="mm-disc mini fam-' + (den.fam === 'bi-sg' ? 'gold' : den.fam === 'bi-gs' ? 'silver' : den.fam) + '">' + den.label + '</span>'
            : '<span class="mm-note mini" style="background:' + den.tint + '"><b>' + den.label + '</b></span>';
        });
        return box;
      };
      var eq = api.el('span', 'mm-eqsign');
      eq.textContent = '=';
      panel.append(mk(this.firstWay), eq, mk(this.tray));
      var cap = api.el('div', 'mm-bothcap');
      cap.textContent = this.fmt('bothWays', { price: this.formatTag(this.price) });
      host.append(panel, cap);
    }
    if (this.phase === 'changePick') {
      var pick = api.el('div', 'mm-changeline');
      pick.textContent = api.t('pickTender');
      host.appendChild(pick);
    }
    if (this.phase === 'changeCount' && this.chg) {
      var strip = api.el('div', 'mm-countstrip');
      strip.textContent = this._chgStripText();
      host.appendChild(strip);
      if (this.chg.idx < this.chg.coins.length) {
        var offer = api.el('div', 'mm-offer');
        var lbl = api.el('span', 'mm-offer-lbl');
        lbl.textContent = api.t('takeCoin');
        var den = this._denOf(this.chg.coins[this.chg.idx]);
        var b = den.fam ? this._coinBtn(den) : this._noteBtn(den);
        b.addEventListener('click', function () { self._acceptChange(); });
        offer.append(lbl, b);
        host.appendChild(offer);
      } else {
        var takenBox = api.el('div', 'mm-way');
        this.chg.coins.forEach(function (v) {
          var den = self._denOf(v);
          if (den) takenBox.innerHTML += '<span class="mm-disc mini fam-' + (den.fam === 'bi-sg' ? 'gold' : den.fam === 'bi-gs' ? 'silver' : (den.fam || 'gold')) + '">' + den.label + '</span>';
        });
        host.appendChild(takenBox);
      }
    }
  },
  _chgStripText: function () {
    if (!this.chg) return '';
    var taken = this.chg.coins.slice(0, this.chg.idx);
    var run = this.price;
    var parts = [this.formatTag(this.price)];
    for (var i = 0; i < taken.length; i++) { run += taken[i]; parts.push(this.formatTag(run)); }
    return parts.join(' → ');
  },
  _pickTender: function (den) {
    var change = den.v - this.price;
    var coins = this.greedyChange(change, this.curView().coins.map(function (d) { return d.v; }));
    if (!coins) return;
    this.chg = { tender: den.v, coins: coins, idx: 0, run: this.price };
    this.phase = 'changeCount';
    this._speak(this.fmt('changeStart', { price: this.spokenAmount(this.price), tender: this.spokenAmount(den.v) }));
    this._paintPhase();
    this._paintPurse();
  },
  _acceptChange: function () {
    if (!this.chg || this.chg.idx >= this.chg.coins.length) return;
    var v = this.chg.coins[this.chg.idx];
    this.chg.idx++;
    this.chg.run += v;
    var last = this.chg.idx >= this.chg.coins.length;
    this._sfxTick(last);
    if (last) {
      this._speak(this.fmt('countDone', { tender: this.spokenAmount(this.chg.tender) }));
      this._sfxCelebrate();
    } else {
      this._speak(this.fmt('countOn', { step: this.spokenAmount(v), run: this.spokenAmount(this.chg.run) }));
    }
    this._paintPhase();
  },

  /* ============================ dock =============================== */

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'mm-dock');
    var row = api.el('div', 'mm-chiprow');
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

    [1, 2, 3].forEach(function (b) {
      var locked = b > 1 && !self.premium;
      var chip = api.el('button', 'mm-chip' + (self.band === b ? ' active' : '') + (locked ? ' locked' : ''));
      chip.type = 'button';
      chip.innerHTML = api.t('bandChip' + b) + (locked ? lock : '');
      chip.addEventListener('click', function () {
        if (locked) { self._gate(dock); return; }
        self.band = b;
        self._newPrice();
        self.render();
      });
      row.appendChild(chip);
    });

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
  + '.mm-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1vmin,10px);width:100%;}'

  /* scene: awning band, wall, counter band, keeper, item, tag */
  + '.mm-scene{position:relative;width:min(680px,94vw);height:190px;border-radius:20px 20px 0 0;overflow:hidden;'
  +   'background:linear-gradient(180deg,#FDF9F0 0%,#FBF3E4 100%);border:2px solid #E7DCC8;border-bottom:none;}'
  + '.mm-awning{position:absolute;top:0;left:0;right:0;height:34px;display:flex;}'
  + '.mm-awning span{flex:1;border-radius:0 0 14px 14px;}'
  + '.mm-awning span:nth-child(odd){background:#F2784B;}'
  + '.mm-awning span:nth-child(even){background:#F2C879;}'
  + '.mm-counter{position:absolute;left:0;right:0;bottom:0;height:44px;'
  +   'background:linear-gradient(180deg,#C99B62,#B9855C);border-top:3px solid #A9814F;}'
  + '.mm-keeper{position:absolute;right:6%;bottom:38px;}'
  + '.mm-eye{animation:mmBlink 5.2s infinite;}'
  + '@keyframes mmBlink{0%,94%,100%{transform:scaleY(1);}96%,98%{transform:scaleY(0.1);}}'
  + '.mm-keeper .mm-eye{transform-box:fill-box;transform-origin:center;}'
  + '.mm-item-anchor{position:absolute;left:26%;bottom:44px;width:0;height:0;}'
  + '.mm-item{position:absolute;user-select:none;-webkit-user-drag:none;pointer-events:none;}'
  + '.mm-tag{position:absolute;left:calc(26% + 66px);bottom:104px;display:flex;flex-direction:column;align-items:center;}'
  + '.mm-tag-string{width:2px;height:16px;background:#8B6F47;}'
  + '.mm-tag-body{background:#FDF0DC;border:2px solid #F2C879;border-radius:10px;padding:5px 12px;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:17px;color:#5A4630;transform:rotate(-3deg);'
  +   'box-shadow:0 3px 8px rgba(20,30,28,.12);}'

  /* mat + total */
  + '.mm-matzone{width:min(680px,94vw);background:#FBF3E4;border:2px solid #E7DCC8;border-top:none;'
  +   'border-radius:0 0 20px 20px;padding:8px 12px 12px;display:flex;flex-direction:column;gap:6px;}'
  + '.mm-totalrow{display:flex;align-items:center;justify-content:center;gap:8px;}'
  + '.mm-total{min-width:110px;text-align:center;background:var(--lcs-surface);border:2px solid var(--lcs-structure);'
  +   'border-radius:var(--lcs-radius-pill);padding:7px 18px;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:21px;color:var(--lcs-structure);}'
  + '.mm-speak{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--lcs-line);background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}'
  + '.mm-mat{min-height:104px;background:#F6E8CF;border:2.5px dashed rgba(20,107,94,.28);border-radius:16px;'
  +   'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;padding:8px;}'

  /* coins + notes */
  + '.mm-coinbtn,.mm-notebtn{min-width:46px;min-height:46px;padding:2px;border:none;background:none;cursor:pointer;'
  +   'display:inline-flex;align-items:center;justify-content:center;}'
  + '.mm-disc{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:11px;color:#4A3B2A;'
  +   'box-shadow:inset 0 0 0 2.5px rgba(90,70,48,.35), 0 2px 4px rgba(20,30,28,.18);}'
  + '.mm-disc.mini{width:30px;height:30px;font-size:9px;}'
  + '.fam-copper{background:radial-gradient(circle at 35% 30%,#D89A6E,#B06A42 78%);color:#5A3620;}'
  + '.fam-silver{background:radial-gradient(circle at 35% 30%,#DCDCE2,#A8A8B2 78%);color:#4A4A55;}'
  + '.fam-gold{background:radial-gradient(circle at 35% 30%,#E8C070,#BE9440 78%);color:#5A4620;}'
  + '.mm-disc-in{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;width:68%;height:68%;'
  +   'font-size:10px;box-shadow:inset 0 0 0 1.5px rgba(90,70,48,.3);}'
  + '.mm-note{display:inline-flex;align-items:center;justify-content:center;position:relative;width:64px;height:36px;'
  +   'border-radius:6px;border:2px solid rgba(90,70,48,.35);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:12px;color:#3A3A45;box-shadow:0 2px 4px rgba(20,30,28,.15);}'
  + '.mm-note.mini{width:46px;height:26px;font-size:10px;}'
  + '.mm-note i{position:absolute;top:1px;left:5px;font-style:normal;font-size:8px;opacity:.75;}'
  + '.mm-note b{font-weight:800;}'

  /* purse */
  + '.mm-purse{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2px;'
  +   'width:min(680px,94vw);min-height:56px;background:var(--lcs-surface);border:1.5px dashed rgba(20,107,94,.3);'
  +   'border-radius:16px;padding:4px 8px;}'

  /* phases */
  + '.mm-phasehost{display:flex;flex-direction:column;align-items:center;gap:6px;width:min(680px,94vw);}'
  + '.mm-invite{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;'
  +   'background:#FDF0DC;border:1.5px dashed #F2C879;border-radius:14px;padding:7px 12px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:#8A6320;}'
  + '.mm-bothways{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:16px;padding:10px 14px;'
  +   'box-shadow:0 0 24px rgba(242,200,121,.5);animation:mmShimmer 1.4s var(--lcs-ease);}'
  + '@keyframes mmShimmer{0%{box-shadow:0 0 0 rgba(242,200,121,0);}55%{box-shadow:0 0 34px rgba(242,200,121,.85);}}'
  + '.mm-way{display:flex;align-items:center;gap:3px;flex-wrap:wrap;max-width:260px;justify-content:center;}'
  + '.mm-eqsign{font-family:var(--lcs-font-display);font-weight:800;font-size:26px;color:#146B5E;}'
  + '.mm-bothcap{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:#5A4630;}'
  + '.mm-changeline{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;color:var(--lcs-ink);text-align:center;}'
  + '.mm-countstrip{font-family:var(--lcs-font-display);font-weight:800;font-size:15px;color:#146B5E;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:6px 14px;max-width:100%;overflow-x:auto;white-space:nowrap;}'
  + '.mm-offer{display:flex;align-items:center;gap:10px;background:var(--lcs-surface);border:1.5px dashed rgba(20,107,94,.35);'
  +   'border-radius:16px;padding:6px 14px;}'
  + '.mm-offer-lbl{font-family:var(--lcs-font-display);font-weight:700;font-size:13.5px;color:var(--lcs-ink-soft);}'

  /* gate + stalls + dock */
  + '.mm-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:560px;margin:2px auto;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:14px;'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.mm-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.mm-stalls{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:min(680px,94vw);}'
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
  + '.mm-purse:empty{display:none;}'
  + '@media (min-width:900px){.mm-purse{gap:10px;padding:8px 10px;}'
  +   '.mm-purse .mm-disc{transform:scale(1.22);}'
  +   '.mm-purse .mm-note{transform:scale(1.15);}}'

  /* phone */
  + '@media (max-width:480px){'
  +   '.mm-scene{height:158px;}'
  +   '.mm-keeper svg{width:84px;height:105px;}'
  +   '.mm-item-anchor{left:22%;}'
  +   '.mm-tag{left:calc(22% + 52px);bottom:96px;}'
  +   '.mm-total{font-size:18px;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.mm-eye{animation:none;}'
  +   '.mm-bothways{animation:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
