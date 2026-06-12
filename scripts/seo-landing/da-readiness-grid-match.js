/* da-readiness-grid-match — Danish prose config for the grid-match landing fan
 * (da ledger-lock 2026-06-12). Single mode 'null'. Readiness type: NO standard;
 * strand = Visuel opmærksomhed og logisk tænkning. Mechanic: billedbrikker —
 * a grid of picture tiles; the child places each brik on its matching spot
 * (visual 1:1 matching, no counting, no reading). B5: never den/det/de
 * (± adjective) before {N_PL_DEF}; adjective frames use the bare plural. */
'use strict';
module.exports = {
  type: 'grid-match',
  eyebrow: 'Opgave: Billedbrikker',
  strand: 'Visuel opmærksomhed og logisk tænkning',
  slotWord: 'billedbrikker',
  level: 'boernehaveklasse',
  h1: (mk, theme) => 'Billedbrikker med ' + theme.plIndef + ' – opgave til børnehaveklassen',
  carousel: (mk, h1Display) => 'Billedbrikker – ' + h1Display,
  modes: {
    'null': {
      SKEL: [
        'På dette ark med {N_PL} venter en række brikker på at blive lagt på plads. Felterne viser billeder, og dit barn kigger nøje efter, hvilken brik der passer sammen med hvilket billede. Når to ens billeder mødes, er brikken landet rigtigt, og lidt efter lidt bliver opgaven færdig. Her skal der hverken læses eller regnes – øjnene gør alt arbejdet. Din lille kan kigge på {N_PL_DEF} i ro og mag, sammenligne farver og former og lægge brikkerne, præcis som det passer barnet. Der er ingen konkurrence og intet pres – kun glæden ved at se billedet falde på plads, brik for brik. På den måde øves blikket for detaljer og fornemmelsen for, hvad der hører sammen – en blød og legende start på børnehaveklassen.',

        'Hvilken brik passer hvor? Det finder dit barn ud af i denne opgave med {N_PL}. Felterne viser en stribe billeder, og brikkerne skal lægges, så to ens billeder mødes. Barnet kigger nøje, sammenligner og prøver sig stille og roligt frem, indtil alle brikkerne ligger på den rette plads. Der er ingen regler at lære udenad og intet pres – kun billeder, der venter på at passe sammen. Mange børn elsker netop den slags kig-og-find-leg, fordi de selv kan se, når det lykkes. Samtidig styrker legen den visuelle opmærksomhed og evnen til at holde blikket fast på små forskelle – netop den slags øvelse, der gør børn klar til børnehaveklassen. Og fordi opgaven handler om {N_PL}, som dit barn kender i forvejen, føles den tryg lige fra første blik.',

        'Find brikkerne frem, og lad øjnene gå på opdagelse! I denne opgave med {N_PL} hører hver brik til et bestemt felt, og dit barn finder frem til det ved at kigge nøje på billederne. Ligner de to billeder hinanden helt, har brikken fundet sin plads. Sådan arbejder barnet sig stille gennem arket, brik for brik, indtil alt passer sammen. Der kræves hverken læsning eller regning – kun lyst til at kigge. Din lille bestemmer selv tempoet og kan bruge al den tid, der føles rar. Imens trænes blikket for små forskelle og ligheder, og det er lige præcis den slags visuel opmærksomhed, børn får brug for i børnehaveklassen. Sådan bliver tiden med {N_PL_DEF} både leg og læring på samme tid.',

        'En rolig stund ved bordet: foran dit barn ligger et ark med {N_PL}, en bunke brikker og felter, der venter på at blive fyldt. Barnet løfter en brik, leder i felterne efter billedet, der ligner, og lægger brikken på plads, når de to billeder passer sammen. Sådan fortsætter legen, indtil alle felterne er fyldt, og billedet står færdigt. Ingenting skal læses, og ingenting skal regnes ud – det er kig-og-læg fra start til slut. Din lille får lov at fordybe sig i {N_PL_DEF}, øve blikket for ligheder og mærke glæden, hver gang en brik lander rigtigt. Og skulle en brik lande forkert, flytter man den bare – her er plads til at prøve igen. Stille og roligt vokser den visuelle opmærksomhed, som børnehaveklassen bygger videre på.',

        'Kan dit barn spotte to billeder, der er helt ens? Det er kernen i denne opgave med {N_PL}. Brikkerne viser billeder, felterne gør det samme, og hver brik hører hjemme et bestemt sted. Ved at kigge nøje og sammenligne finder barnet den rette plads til dem alle sammen. Det lyder enkelt, men for små øjne er det en fin udfordring: nogle af {N_PL_DEF} ligner nemlig hinanden ved første blik, og først ved nærmere eftersyn viser de små forskelle sig. Netop dér ligger den gode træning. Dit barn øver sig i at se ordentligt efter, i sit helt eget tempo og uden noget pres – og hver brik, der falder på plads, giver lyst til at finde den næste.',

        'Sikke mange {N_PL} der er samlet her! Felterne på arket viser billeder, og ved siden af ligger brikkerne klar. Dit barn vælger en brik, kigger nøje rundt i felterne og finder billedet, der passer sammen med den. Vupti – endnu en brik på den rette plads! Sådan arbejder barnet sig roligt igennem opgaven, uden læsning, uden regnestykker og uden pres. For mange børn i børnehavealderen er det ren glæde at lægge ting på plads, og netop dén glæde bærer legen. Samtidig skærpes den visuelle opmærksomhed: øjnene lærer at fange ligheder og bittesmå forskelle mellem billederne af {N_PL}. Det er stille læring forklædt som leg – og det er lige sådan, de mindste lærer bedst.',

        'Leder du efter en rolig aktivitet, der både er leg og god øvelse? Så er dette ark med {N_PL} et fint sted at begynde. Opgaven er ligetil: hver brik viser et billede, og i felterne gemmer der sig billeder, der passer sammen med brikkerne. Dit barn kigger nøje, sammenligner og lægger brikkerne på plads, indtil alt sidder, hvor det skal. Imens øver din lille netop de færdigheder, som børnehaveklassen kalder på: at holde øjnene fast på en opgave, at få øje på ligheder og forskelle og at blive færdig med noget, man selv har styret. Alt sammen uden pres og uden konkurrence – bare barnet, brikkerne og {N_PL_DEF}, der skal finde sammen.',

        'Nogle dage kalder på ro og fordybelse, og lige dér passer denne opgave med {N_PL} rigtig godt. Arket viser felter med billeder, og brikkerne venter på at komme hjem – hver brik til sit eget felt. Dit barn finder selv ud af, hvilke billeder der er ens, og lægger brik efter brik på den rette plads. Det kræver ingen forklaringer og ingen hjælp til læsning – billederne taler for sig selv. Måske tager det tid at finde de første par stykker, og det er helt fint, for her er fordybelsen det vigtigste. Når alle brikkerne ligger rigtigt, står billedet samlet, og dit barn kan med god grund være stolt. Sådan en stund med {N_PL_DEF} styrker både koncentrationen og blikket for detaljer – to trofaste følgesvende gennem børnehaveklassen.',
      ],
      P2: [
        'Opgaven passer til børn på fire til seks år: ingen læsning, ingen regning, kun øjne, der kigger nøje. Du kan lade dit barn lægge brikkerne direkte på skærmen, eller du kan printe arket og lege ved bordet. Begge dele er gratis, og begge dele giver din lille en rolig stund med billeder, der skal passe sammen.',

        'Til børnehavebørn og børn i børnehaveklassen er det her en blid øvelse i at se ordentligt efter. Der er hverken konkurrence eller pres, så barnet kan bruge lige den tid, det har brug for. Arket kan hentes som PDF og printes, eller det kan spilles online med det samme – helt uden betaling og uden oprettelse.',

        'Dit barn behøver ingen forudsætninger for at gå i gang – at kende billederne og have lyst til at kigge er rigeligt. Derfor fungerer opgaven fint allerede i børnehaven og videre ind i 0. klasse. Vælg selv: spil den gratis på tablet eller computer, eller print den ud til en stille stund uden skærm. Hver brik, der lander rigtigt, føles som en lille sejr.',

        'Om I sidder med et printet ark eller foran skærmen, er helt op til jer – begge dele er gratis. For børn på fire til seks år er det en rolig opgave uden pres: bare kigge nøje, finde ens billeder og lægge brikkerne på plads. Din lille bestemmer tempoet, og legen slutter først, når billedet er færdigt – eller når lysten siger stop.',

        'Opgaven er lavet til de yngste, der lærer mest gennem øjne og hænder. Ingen instruktioner skal læses op igen og igen – barnet ser selv, hvad der passer sammen. Du finder arket gratis her på siden: spil det online, eller print det som PDF til børnehavetasken. Uden pres og uden konkurrence bliver det ved med at være leg.',

        'I børnehaveklassen arbejdes der netop med at kigge nøje og gøre små opgaver færdige – og det øver dit barn her, uden at det føles som arbejde. Opgaven koster ikke noget: den kan spilles direkte i browseren eller skrives ud på papir. Lad barnet selv vælge, og giv det ro til at lægge brik efter brik på den rette plads.',

        'En god opgave til både hjemme og i børnehaven: den kræver ingen forberedelse, og alle kan være med. Den ligger frit tilgængelig her på siden – leg den som onlinespil, eller sæt arket på print til hyggestunden ved sofabordet. Dit barn kigger, sammenligner og lægger på plads: stille fordybelse uden pres, præcis som de mindste har det bedst med.',
      ],
    },
  },
  P3: 'Faldt brikkerne i god jord? Så venter der flere opgaver af samme slags. Prøv for eksempel arkene med {NB1}, hvor nye billeder skal finde deres plads, eller skift kulissen ud med {NB2}, hvis din lille trænger til ny inspiration. Alle opgaverne bygger på det samme rolige princip: kigge nøje, finde ens billeder og lægge brikkerne på den rette plads – uden pres og uden konkurrence. Samlingen med {GEN} er gratis: spil den online på tablet eller computer, eller print arkene til en stille stund ved bordet. Sådan kan dit barn blive ved med at øve den visuelle opmærksomhed, én lille brik ad gangen.',
};
