'use strict';
module.exports = {
  type: 'wordsearch',
  eyebrow: 'Opgave: Ordjagt',
  strand: 'Den første læsning',
  standard: () => 'RF.K.3.c',
  slotWord: 'ordjagt',
  level: '1-klasse',
  h1: (mk, theme) => 'Ordjagt med ' + theme.plIndef + ' – opgave til 1. klasse',
  carousel: (mk, h1Display) => 'Ordjagt – ' + h1Display,
  modes: {
    'null': {
      SKEL: [
        'I denne ordjagt med {N_PL} gemmer ordene sig mellem bogstaverne. Ved siden af står en liste med billeder: dit barn læser et ord, holder ordbilledet fast i hovedet og leder så efter det på langs og på tværs. Dukker ordet op i en række eller en kolonne, må der sættes ring om det – og så videre til det næste. På den måde læser dit barn hvert ord på listen først i ro og genkender det bagefter midt i en lang række bogstaver. Det er netop den øvelse, der hører til den første læsning i 1. klasse. Billederne støtter undervejs, så også en helt ny læser kan være med. Ingen hast og intet pres: bare kigge bogstav for bogstav, til alle ord om {N_PL} er fundet.',

        'Et felt fuldt af bogstaver og ved siden af en liste med ord og billeder: mere skal der ikke til i denne ordjagt med {N_PL}. Dit barn læser et ord fra listen, lægger mærke til, hvordan det ser ud, og jagter det derefter mellem bogstaverne – række for række og kolonne for kolonne. Så snart ordet er fundet, sættes der ring om det, og det næste står klar. Hvert billede viser, hvad ordet betyder, så læsningen får en hjælpende hånd hele vejen. For et barn i 1. klasse er det en dejlig måde at træne ordbilledet på: først læse, så genkende ordet blandt alle de andre bogstaver. Og fordi intet skal gå stærkt, bliver jagten på ordene til {N_PL_DEF} ved med at være sjov.',

        'Hvor gemmer ordet sig? I denne ordjagt med {N_PL} holder bogstaverne ordene fra listen skjult. Dit barn ser på billedet, læser ordet ved siden af og går derefter bogstav for bogstav frem: på langs og på tværs. Står de rigtige bogstaver pænt efter hinanden, streges ordet ud – og det føles godt hver gang. Imens sker der noget vigtigt: dit barn læser det samme ord flere gange og holder ordbilledet bedre og bedre fast. Det er lige præcis, hvad den første læsning i 1. klasse handler om. Kigge roligt, sammenligne omhyggeligt og spore det ene gemte ord efter det andet – mere beder denne opgave ikke om. Til sidst er alle ord om {N_PL} fundet, og listen kan lægges væk med god samvittighed.',

        'Denne ordjagt med {N_PL} handler om at kigge godt og læse godt. Ved siden af bogstaverne står en liste med billeder og ord. Dit barn læser først ordet, ser på billedet og leder derefter efter stedet, hvor netop de bogstaver står samlet. Ordene gemmer sig på langs eller på tværs, så dit barn samtidig lærer at kigge i læseretningen. Der sættes ring om hvert fundet ord, indtil hele listen er klaret. Sådan øver dit barn sig i at genkende bogstaver og huske ord, uden at det føles som træning. For 1. klasse er det et værdifuldt skridt: jo oftere et ord dukker op, desto bedre sidder ordbilledet fast. Og billederne på listen sørger for, at ordene om {N_PL} hele tiden giver mening.',

        'Mellem alle bogstaverne gemmer der sig ord, som alle sammen har med {N_PL} at gøre. Dit barn tager listen frem, læser det første ord og leder efter bogstaverne ude mellem de andre. Lykkes det at finde hele ordet, streges det roligt ud, og dit barn går videre til det næste. Billederne ved siden af ordene giver netop den støtte, en ny læser sætter pris på. Det, der gør denne opgave så velegnet til 1. klasse, er, at dit barn kigger meget nøje på bogstavernes rækkefølge – og lige det omhyggelige blik hjælper på læsningen. Ingen regnestykker og ingen lange forklaringer: kun bogstaver, ord og {N_PL_DEF} på billederne. Et stille øjeblik med en blyant er alt, hvad der skal til.',

        'Med denne opgave får dit barn en rigtig ordjagt i hænderne, fuld af ord om {N_PL}. Listen ved siden af viser med billeder, hvilke ord der venter på at blive fundet. Dit barn læser et ord, holder bogstaverne fast i hovedet et øjeblik og lader så blikket glide gennem rækkerne og kolonnerne, til ordet pludselig dukker frem. Ring om det – og videre til det næste! Fordi hvert ord først læses og bagefter genkendes mellem bogstaverne, bliver ordbilledet trænet grundigt. Det passer fint til den første læsning i 1. klasse. Alt foregår i barnets eget tempo, for i en ordjagt skal ingenting gå stærkt. Til gengæld vokser glæden, hver gang endnu et gemt ord kommer for en dag.',

        'Bogstaver er der nok af her – men hvilke hører sammen? Denne ordjagt med {N_PL} udfordrer dit barn til at finde ordene fra listen igen mellem alle de løse bogstaver. Først læses ordet, så kigges der på billedet, og derefter ledes der omhyggeligt: på langs og på tværs. Hver fundet bogstavrække streges ud, indtil listen er helt færdig. For børn i 1. klasse er det læsning i legeform: det samme ord kommer forbi et par gange og sætter sig dermed bedre og bedre fast i hukommelsen. Dit barn øver tålmodigt blik og omhyggelig læsning på én gang, og imens bliver ordene om {N_PL} hængende helt af sig selv. En lille jagt, en stor læsegevinst – og ingen, der holder øje med uret.',

        'En ordjagt er et lille læseeventyr, og denne her er fuld af ord, der hører til {N_PL}. Dit barn begynder ved listen: dér står hvert ord med et tydeligt billede ved siden af. Bagefter flytter blikket over til bogstaverne, hvor de samme ord venter godt gemt mellem alle de andre. Den, der kigger grundigt, ser dem dukke op i en række eller en kolonne og må straks sætte ring om dem. Sådan læser dit barn hvert ord først for sig selv og genkender det bagefter igen – to gange øvelse i én opgave. Det styrker ordbilledet, og det er guld værd i 1. klasse. Dit barn bestemmer selv, hvor længe der skal ledes efter hvert ord, og hvornår turen går videre.',
      ],
      P2: [
        'Denne opgave er lavet til børn i 1. klasse, der lige er begyndt at læse. Billederne ved siden af ordene giver støtte, så også en helt ny læser kan arbejde helt på egen hånd. I spiller ordjagten gratis på skærmen, eller I printer den ud og lægger en blyant ved siden af. Begge dele foregår i ro og mag, ord for ord.',

        'For seks- og syvårige er denne ordjagt en behagelig læseøvelse helt uden pres. Ingen kigger på uret, og ingenting skal nås. Vil dit barn hellere arbejde på papir? Ét tryk på printknappen, og bogstaverne ligger klar på bordet. Foretrækker I tabletten? Også dér er alt gratis og lige til at gå i gang med – uden besvær.',

        'Den første læsning trives bedst med materiale, der føles som leg, og det er lige netop, hvad en ordjagt gør. Dit barn læser, leder og streger ud i sit eget tempo. Opgaven ligger gratis klar på nettet og er lige så nem at printe til en stille stund derhjemme eller i klassen. Så vælger I fra dag til dag, hvad der passer bedst.',

        'Det her er en opgave til 1. klasse, hvor læsning og opmærksomhed følges ad. Dit barn skal ikke regne og ikke holde styr på noget – kun spore ord og sætte ring om dem. Åbn ordjagten direkte på skærmen, helt uden betaling, eller print den ud, hvis dit barn er mest glad for papir og blyant. Begge dele er lige hyggelige.',

        'Fordi hvert ord har sit eget billede, kan selv et barn, der kun har læst i kort tid, klare denne ordjagt helt alene. Det giver selvtillid. Det koster ikke noget at øve derhjemme: opgaven er frit tilgængelig på skærmen og kan printes til turen eller køkkenbordet. Dit barn vælger selv, hvor der skal ledes, og må bruge al den tid, det har lyst til.',

        'En ordjagt passer fint ind i en rolig læsestund: først kigger I listen igennem sammen, og bagefter går dit barn selv på jagt mellem bogstaverne. For børn på seks-syv år er det overskueligt og sjovt på samme tid. Opgaven kan bruges online med det samme, uden at det koster noget, og hvem der hellere vil printe, har den på papir på et øjeblik.',

        'I 1. klasse er alle læseoplevelser værdifulde, og denne ordjagt byder på en hel masse af dem – helt gennem leg. Dit barn gentager ordene af sig selv ved at læse og lede, uden at det føles som lektier. Brug opgaven gratis på computer eller tablet, eller print den til en stund uden skærm. Uanset hvad bestemmer dit barn selv tempoet.',
      ],
    },
  },
  P3: 'Har dit barn fået smag for at jagte ord? Der står mange flere ordjagter klar til at blive prøvet. Kig for eksempel på opgaverne med {NB1}, fulde af nye ord at spore, eller skift til {NB2} for en helt anden liste. Hver ordjagt fungerer på samme måde: læse, lede mellem bogstaverne og roligt strege ud – uden ur og uden pres. Hele samlingen med {GEN} er gratis at bruge, online på tablet eller computer eller printet til en stille læsestund ved bordet. Sådan bliver dit barn ved med at øve læsning, ord for ord, i sit eget tempo og altid med glæde.',
};
