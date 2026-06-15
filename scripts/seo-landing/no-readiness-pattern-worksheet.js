'use strict';

module.exports = {
  type: 'pattern-worksheet',
  eyebrow: 'Oppgave: Fortsett mønsteret',
  strand: 'Antall, rom og form',
  slotWord: 'mønster',
  level: '1-trinn',
  h1: (mk, theme) => 'Mønster-ark med ' + theme.plIndef + ' – oppgave til 1. trinn',
  carousel: (mk, h1Display) => 'Mønster-ark – ' + h1Display,
  modes: {
    'null': {
      SKEL: [
        'På dette mønster-arket står {N_PL} i en rekke som gjentar seg, og barnet ser hva som kommer igjen og igjen før det tegner videre på det som mangler. Rekken har en fast rekkefølge, så {N_PL_DEF} følger hverandre i samme orden bortover hele arket. Den voksne trenger ikke forklare så mye; barnet kjenner snart igjen mønsteret og fyller inn det tomme feltet selv. Dette er et rolig oppgaveark for de yngste, der det viktigste er å se hvordan {N_PL_DEF} gjentar seg og fortsette den samme rekken. Barnet jobber i sitt eget tempo, og det er ingen tid å slå og ingen poeng å samle. Last ned, skriv ut, og la barnet tegne videre der rekken stopper. Du kan også la barnet peke på hver del av mønsteret før det fyller inn, så det får et godt grep om rekkefølgen.',

        'Et enkelt oppgaveark der {N_PL} følger en fast rekkefølge bortover rekken. Barnet ser på de første {N_PL_DEF}, kjenner igjen hvordan de gjentar seg, og tegner videre på det som mangler lengst ute i rekken. Hva mangler i mønsteret? Det er spørsmålet barnet svarer på her, helt uten å telle og uten å lese. Arket passer fint for de yngste som akkurat har begynt på 1. trinn, og det kan brukes både hjemme ved kjøkkenbordet og i klasserommet. Barnet jobber i sitt eget tempo, og det er ingen poeng og ingen klokke som teller. Når mønsteret er fullført, kan dere se på rekken sammen og snakke om hvordan {N_PL_DEF} kommer igjen i samme orden. Skriv ut så mange ark dere vil, helt gratis.',

        'Her øver de yngste på å se og fortsette et mønster på papir. Arket viser {N_PL} satt opp i en rekke med fast rekkefølge, og barnet skal tegne videre slik at mønsteret holder fram på samme måte. Det handler ikke om å telle eller lese, men om å legge merke til hvordan {N_PL_DEF} gjentar seg. Når barnet har sett rytmen i rekken, blir det lett å fylle inn det som mangler. Dette mønster-arket er laget for små hender og korte økter, og barnet kan ta så mange pauser det vil. Ingen poeng, ingen tid å slå, bare rolig øving. Du kan skrive ut arket og legge det fram, eller la barnet løse oppgaven på skjermen. Begge deler er helt gratis, og barnet bestemmer selv hvor fort det vil gå.',

        'Dette oppgavearket lar barnet bli kjent med mønster gjennom {N_PL} som står i en rekke. Rekkefølgen er fast, så de samme {N_PL_DEF} kommer igjen og igjen i en bestemt orden. Barnet ser på rekken, finner ut hva som mangler i mønsteret, og tegner videre der det er tomt. For mange av de yngste er det en aha-opplevelse å se at noe gjentar seg på den måten, og at de kan forutsi hva som kommer. Arket er enkelt og rent, uten distraksjoner, slik at barnet får øvd på det ene: å fortsette mønsteret. Det er ingen tidtaking og ingen poengsum, bare øving i sitt eget tempo. Skriv ut arket hjemme eller i barnehagen og på 1. trinn, og la barnet jobbe så lenge det selv vil.',

        'Når {N_PL} står oppstilt i en rekke som gjentar seg, blir det enkelt for barnet å se mønsteret og tegne videre. Det er nettopp dette barnet gjør på dette mønster-arket: ser på de første delene, kjenner igjen rekkefølgen og fyller inn det som mangler lengst ute. {N_PL_DEF} følger hverandre i samme orden hele veien, så barnet kan stole på at mønsteret holder seg likt bortover. Dette er en fin første øving i å oppdage en fast rekkefølge, og barnet trenger verken å telle eller lese for å klare den. Arket er laget for de yngste, og barnet jobber i sitt eget tempo uten klokke og uten poeng. Last ned og skriv ut så mange ganger dere vil, helt gratis, og legg arket fram når barnet har lyst til å øve.',

        'Et rolig mønster-ark for de aller yngste, der {N_PL} gjentar seg bortover en rekke. Barnet ser på hvordan {N_PL_DEF} kommer igjen i fast rekkefølge, og tegner videre på det feltet som er tomt. Hele poenget er å oppdage rytmen i rekken og fortsette den, ikke å telle og ikke å lese. Mange barn synes det er morsomt nettopp fordi de selv kan se hva som skal komme, og fylle det inn riktig. Arket er enkelt nok til at barnet kan jobbe alene, men det er også fint å sitte sammen og snakke om mønsteret underveis. Det er ingen poeng å samle og ingen tid å slå; barnet bestemmer selv farten. Du kan skrive ut arket eller la barnet løse det på nett, og begge deler koster ingenting.',

        'På dette arket møter barnet {N_PL} som står på rad og gjentar seg i en fast rekkefølge. Oppgaven er enkel og tydelig: se hvordan rekken bygger seg opp, og tegne videre slik at mønsteret fortsetter på samme måte. Når barnet har funnet ut hva som mangler i mønsteret, fyller det inn det tomme feltet selv. {N_PL_DEF} kommer igjen i samme orden hele veien, og det gjør oppgaven trygg og oversiktlig for små barn. Dette er et oppgaveark uten telling og uten lesing, laget for de yngste på 1. trinn. Barnet jobber i sitt eget tempo, og ingen klokke teller mens det øver. Skriv ut arket og legg det fram, eller la barnet løse mønsteret på skjermen. Alt er helt gratis, og dere kan gjenta så mange ganger dere vil.',

        'Mønster er noe av det første barn liker å oppdage, og dette oppgavearket bygger på akkurat det. {N_PL} står i en rekke med fast rekkefølge, og barnet skal kjenne igjen hvordan {N_PL_DEF} gjentar seg for så å tegne videre. Det tomme feltet i rekken er der barnet fyller inn det som hører til, slik at mønsteret holder fram likt. Ingen del av oppgaven krever telling eller lesing, så selv de yngste kan løse den på egen hånd. Arket er rent og enkelt, og barnet kan ta korte økter med så mange pauser det vil. Det er ingen poeng og ingen tid å slå her, bare rolig øving i sitt eget tempo. Last ned og skriv ut gratis, eller løs mønsteret på nett – dere velger selv hva som passer best akkurat nå.',
      ],
      P2: [
        'Dette mønster-arket er laget for de yngste, i barnehagen og på 1. trinn, der barnet øver på å se rekken og tegne videre. Det er helt gratis, og du kan skrive ut så mange ark du vil eller la barnet løse mønsteret på nett. Ingen tid å slå, ingen poeng – bare rolig øving i sitt eget tempo.',

        'Oppgavearket passer fint for de yngste som akkurat skal i gang med mønster. Barnet ser hvordan rekken gjentar seg og tegner videre på det som mangler. Du kan skrive ut arket gratis eller spille på nett, og barnet bestemmer selv farten. Helt gratis, uten klokke og uten poeng.',

        'For de yngste i barnehagen og på 1. trinn er dette en trygg første øving i mønster. Barnet finner den faste rekkefølgen i rekken og tegner videre selv. Last ned og skriv ut gratis, eller la barnet løse oppgaven online. Ingen tid å slå og ingen poeng å samle her.',

        'Et enkelt oppgaveark for de minste, der barnet ser hvordan mønsteret gjentar seg og fyller inn det som mangler i rekken. Det er helt gratis å bruke, både som utskrift og på skjerm. Barnet jobber i sitt eget tempo, uten poeng og uten en klokke som teller.',

        'Dette mønster-arket egner seg for de yngste, både hjemme og på 1. trinn. Barnet tegner videre der rekken stopper, etter å ha sett hvordan den gjentar seg. Skriv ut gratis så mange ganger du vil, eller spill på nett. Ingen poeng, ingen tid å slå – bare rolig øving.',

        'Laget for de yngste i barnehagen og på 1. trinn, der barnet øver på å fortsette en rekke som gjentar seg. Du kan skrive ut arket gratis eller la barnet løse mønsteret online. Alt skjer i barnets eget tempo, helt uten poeng og uten klokke.',

        'Et rolig oppgaveark for de minste, der barnet ser den faste rekkefølgen i rekken og tegner videre på det som mangler. Helt gratis å skrive ut eller spille på nett. Barnet bestemmer selv farten, og det er ingen tid å slå og ingen poeng å bekymre seg for.',
      ],
    },
  },
  P3: 'Vil dere øve mer på mønster, kan dere prøve også {NB1} på et lignende ark, eller et oppgaveark med {NB2} der rekken gjentar seg på samme måte. Da får barnet se den faste rekkefølgen på nytt med andre bilder, og det blir lettere å kjenne igjen mønsteret hver gang. Alle arkene med {GEN} er helt gratis å skrive ut eller spille på nett, og barnet jobber i sitt eget tempo uten poeng og uten en klokke som teller. Skriv ut det dere har lyst på, og la barnet tegne videre så mange ganger det vil.',
};
