/* sv landing config: wordsearch (Ordletare) — CARRIES literacy, årskurs 1, RF.K.3.c.
 * MECHANIC: ett rutnät av bokstäver där ord ligger GÖMDA; ditt barn LETAR UPP och ringar in de
 * dolda orden (med bildledtrådar som visar vilka ord som finns gömda). Vågrätt och lodrätt. Ren
 * ORDIGENKÄNNING — barnet hittar ett ord som redan finns bland bokstäverna, det skriver ingenting.
 * Strand = `Läsa och skriva` (Lgr22). Standard RF.K.3.c. Single mode (null).
 *
 * SATURATE: ordletare, hitta orden, gömda ord i rutnätet, ringa in, leta vågrätt och lodrätt,
 * dolda ord, känn igen ordet bland bokstäverna. Theme {N_PL} = bilderna vars NAMN ligger gömda i
 * rutnätet — barnet letar upp varje ord. Every SKEL carries a theme slot ({N_PL} or {N_PL_DEF}).
 *
 * DIVERGENCE (CRITICAL — 4 ord/stavnings-syskon):
 *   word-guess  = ljuda ut + SKRIVA ett ord i tomma rutor.
 *   word-scramble = KASTA OM givna bokstäver till rätt ordning.
 *   crossword   = STAVA in ord i ett korsande rutnät.
 *   YOUR wordsearch = orden FINNS REDAN gömda i bokstavsrutnätet; barnet LETAR UPP och RINGAR IN dem
 *                     (igenkänning, INTE skrivande). Luta dig mot letandet/hittandet/inringandet av
 *                     gömda ord. ALDRIG skriv-ordet, kasta-om eller korsande-rutnät-framing. (Du delar
 *                     "leta/söka"-idén med find-objects, men HÄR är det ORD bland bokstäver — håll det
 *                     ord-/bokstavsfokuserat, aldrig myllrande bild/föremål.)
 *
 * NEVER: "Common Core". NO counting/numbers/arithmetic framing — detta är ORD och bokstäver, aldrig
 * räkna/summa/antal. No timer/score/gamification (negerat OK: "ingen klocka", "inga poäng").
 * du-register: "ditt barn".
 *
 * Lint (sv-render.js): theme nouns enter ONLY via {N_PL}/{N_PL_DEF}; never "En/Ett <Cap theme noun>"
 * (B2 singular-slot guard). Whitelisted singular frame nouns OK (ord, bokstav, bild, rad, ruta,
 * arbetsblad, barn, ...); "rutnät"/"rutnätet" stay lowercase mid-sentence. */
'use strict';
module.exports = {
  type: 'wordsearch',
  eyebrow: 'Arbetsblad: Ordletare',
  strand: 'Läsa och skriva',
  standard: () => 'RF.K.3.c',
  level: 'ak-1',
  slotWord: 'ordletare',
  h1: (mk, theme, level) => 'Ordletare med ' + theme.plIndef + ' – arbetsblad för årskurs 1',
  carousel: (mk, h1Display) => 'Ordletare – ' + h1Display,
  modes: {
    'null': {
      SKEL: [
        'Hitta de gömda orden! På det här arbetsbladet för årskurs 1 ligger namnen på {N_PL} dolda i ett rutnät av bokstäver, och ditt barn letar upp dem och ringar in vart och ett. Det söker vågrätt längs raderna och lodrätt nedför kolumnerna, känner igen ett bekant ord bland bokstäverna och drar en ring runt det. Att hitta ett ord är hela kärnan: barnet läser bokstäverna och upptäcker plötsligt ett helt ord som det redan känner igen. Eftersom orden kommer från bilder som ditt barn känner till handlar det om att läsa och känna igen, aldrig om att gissa vad orden skulle kunna vara. Med {N_PL} som barnet redan känner blir de dolda orden korta och lätta att upptäcka, så ditt barn får finkamma rutnätet i lugn och ro. Det finns ingen klocka som tickar; barnet får leta så länge det vill, helt i sitt eget tempo.',
        'Var gömmer sig orden i rutnätet? På det här arket för årskurs 1 trängs bokstäverna tätt, och mitt bland dem ligger namnen på {N_PL} dolda. Ditt barn spanar längs raderna och nedför kolumnerna, känner igen ett ord bland bokstäverna och ringar in det. Varje gång det hittar ett av {N_PL_DEF} bland alla bokstäver känns det som en liten skatt funnen. Här gäller det att leta och känna igen, aldrig att skriva eller räkna; barnet upptäcker ett helt ord som redan finns gömt. Bildlistan visar vilka ord som väntar i rutnätet, så uppgiften är att hitta dem, inte att gissa. Den här ordigenkänningen på första blicken är just det läsare i årskurs 1 bygger sin läsning på. Det finns ingen brådska – ögat får leta i sin egen takt.',
        'Leta vågrätt, leta lodrätt, ringa sedan in. På det här arbetsbladet för årskurs 1 göms namnen på {N_PL} i ett rutnät av bokstäver, och ditt barns uppgift är att hitta vart och ett och dra en ring runt det. Eftersom orden är namn på bilder barnet känner igen läser det genom rutnätet och upptäcker varje helt ord så snart bokstäverna ställer upp sig på rad. Den här förmågan att känna igen hela ord är grunden för flytande läsning i årskurs 1: ditt barn samlar på ord som det fångar med en enda blick. Korta, bekanta {N_PL} betyder att barnet kan finkamma en rad, känna igen ett ord och ringa in det med stilla tillfredsställelse. Inget ska skrivas och inget ska räknas – bara letas och kännas igen, i barnets eget lugna tempo.',
        'Här ger sig ditt barn ut på ordjakt i ett rutnät. Namnen på {N_PL} ligger gömda bland bokstäverna – några vågrätt, några lodrätt – och barnet letar upp vart och ett och ringar in det. Det låter blicken glida längs en rad, känner igen ett ord som det kan och drar en ring runt det. Att upptäcka hela ord i rutnätet – i stället för att ljuda ihop dem bokstav för bokstav – gör det här leträtseln till en äkta läsövning för årskurs 1. De bekanta {N_PL} håller varje gömt ord kort och lätt att känna igen, så ditt barn kan leta stadigt och fånga ett ord i taget utan att tappa bort var det är. Det finns inga poäng att samla; bara den lugna glädjen i att hitta de dolda orden, ett efter ett.',
        'Det här arket bjuder ditt barn att läsa och leta på samma gång. Namnen på {N_PL} är gömda vågrätt och lodrätt i ett rutnät av bokstäver, och barnet hittar vart och ett och ringar in det. När det läser längs raderna och kolumnerna spanar ditt barn efter bokstäver som tillsammans bildar ett ord det känner igen. Den här ordigenkänningen på första blicken är läsning i början av årskurs 1 – barnet ser ett helt ord bland bokstäverna och vet genast vilket det är. Bildlistan ger tydliga ledtrådar, så den enda uppgiften är att hitta orden i rutnätet, aldrig att fundera ut vad de skulle heta eller att skriva dem. Här finns ingen brådska och inget fel som bokförs; ditt barn letar och ringar in i sitt eget tempo.',
        'Känn igen ordet bland alla bokstäver – det är gåtan i det här ordletaren för årskurs 1. I rutnätet ligger namnen på {N_PL} dolda mitt i ett vimmel av bokstäver, och ditt barn finkammar raderna och kolumnerna tills ett bekant ord träder fram. Då ringar barnet in det. Att se ett helt ord bland strödda bokstäver och fånga det med blicken är ren ordigenkänning, just den färdighet flytande läsning vilar på. Eftersom {N_PL} redan är välbekanta blir de gömda orden korta och tydliga, så barnet kan söka av en rad, upptäcka ordet och dra en ring runt det med växande säkerhet. Inget ska skrivas och inget ska räknas – bara letas, kännas igen och ringas in, helt i barnets lugna tempo.',
        'På det här arbetsbladet för årskurs 1 bestämmer bildlistan vilka ord som finns, och rutnätet gömmer dem. På jakt efter {N_PL} läser ditt barn längs raderna och nedför kolumnerna tills ett bekant ord dyker upp bland bokstäverna, och ringar sedan in det. Det är läsa och känna igen – barnet upptäcker ett ord det redan kan, i stället för att ljuda ut något nytt eller skriva det självt. De gömda orden ligger där färdiga; uppgiften är bara att hitta dem vågrätt och lodrätt. De bekanta {N_PL} håller de dolda orden tydliga och nära till hands, så hela barnets uppmärksamhet kan gå till sökandet: finkamma rutnätet noga, känna igen varje ord och ringa in det. Det finns ingen klocka och inga poäng – bara letandet, i barnets egen takt.',
        'Hitta varje ord och ringa sedan in det. Ditt barn läser genom ett rutnät där namnen på {N_PL} ligger gömda vågrätt och lodrätt, känner igen varje bekant ord och drar en ring runt det. Att upptäcka hela ord i ett bokstavsrutnät – i stället för att bygga ihop dem av ljud eller skriva in dem – är just den ordigenkänning i årskurs 1 som övas här. De bekanta {N_PL} gör varje gömt ord lätt att känna igen, så att barnet kan finkamma raderna och kolumnerna i sitt eget tempo och fånga ett ord i taget med ett stilla, växande "där är det!". Här ljudas inget ut och inget ska stavas – orden finns redan; ditt barn letar bara upp dem och ringar in dem, ett dolt ord efter ett annat, utan minsta brådska.',
      ],
      P2: [
        'I den här varianten ligger orden riktigt väl gömda i rutnätet, så ditt barn får leta extra noga vågrätt och lodrätt för att spåra upp namnen på {N_PL_DEF}. Det gör jakten till en liten upptäcktsresa. Barnet tar sin tid, finkammar rad efter rad och ringar in varje funnet ord med en nöjd känsla. Inget ska skrivas och inget ska räknas – bara leta och känna igen ordet bland bokstäverna, helt i ditt barns tempo.',
        'Här är rutnätet lite mindre och särskilt överskådligt, så att ditt barn snabbt upptäcker det första gömda ordet bland {N_PL_DEF}. En mjuk start där den första ordjakten lyckas med en gång. Barnet läser längs raderna, känner igen ett bekant ord och ringar in det. Att leta upp och känna igen i stället för att skriva, i sitt alldeles egna tempo, utan press och utan tävling.',
        'I den här versionen göms fler ord i rutnätet, så att ditt barn får leta upp det mesta på egen hand. Med blicken som söker genom raderna och kolumnerna upptäcker det var nästa ord har gömt sig och ringar in ett dolt ord i taget. Det stärker ordigenkänningen och uthålligheten på samma gång. Det finns ingen klocka och inga poäng, bara den lugna glädjen vid varje ord som barnet fångar bland bokstäverna.',
        'Den här varianten lägger orden både vågrätt och lodrätt om vartannat, så att ditt barn vänjer sig vid att söka i båda riktningarna efter {N_PL_DEF}. Det följer raderna och kolumnerna, känner igen ett bekant ord och drar en ring runt det. Det ger ditt barn den goda känslan av att ha hittat ordet alldeles själv. Utan brådska och utan rätt-eller-fel-press, bara att i lugn och ro leta upp och känna igen de gömda orden.',
        'Om ditt barn är osäkert hjälper det att peka på en bild i taget och säga ordets namn högt, och sedan leta efter just det ordet i rutnätet. Så vet barnet vilket gömt ord det söker, och bokstäverna blir lättare att känna igen. Den här ordnade jakten stärker ordigenkänningen och tilltron till den egna läsningen – en fin grund inför läsningen, helt utan press och helt utan att räkna eller skriva.',
        'Du kan följa ditt barn varsamt med en fråga: vilken bokstav börjar ordet på, och var i rutnätet hittar du den? Så leder du blicken mot letandet utan att avslöja var ordet ligger. Det gömda ordet bland {N_PL_DEF} får barnet spåra upp alldeles själv, vågrätt eller lodrätt, i lugn och ro och utan att skriva ett enda ord. Varje gång det ringar in rätt ord växer glädjen och lusten att leta vidare.',
        'I den här varianten myllrar rutnätet av bokstäver, så att ditt barn ur allt brokigt får leta fram just de ord som är gömda. Det finkammar raderna och kolumnerna, känner igen ett bekant ord bland alla bokstäver och ringar in {N_PL_DEF} med eftertanke. Det stärker ordigenkänningen och tålamodet på samma gång. Inga poäng, ingen klocka – bara ditt barn och den stilla glädjen i att upptäcka de dolda orden, ett efter ett.',
      ],
    },
  },
  P3: 'Om ditt barn tycker om att leta upp gömda ord i ett rutnät finns det mer att upptäcka, helt utan press och utan att räkna eller skriva. Prova gärna ordletaren med {NB1}, eller leta efter de gömda orden bland {NB2} – båda bjuder in ditt barn att finkamma rutnätet vågrätt och lodrätt, känna igen ett bekant ord bland bokstäverna och ringa in det. Hela samlingen med {GEN} är gratis och kan spelas online eller skrivas ut, precis som ni vill. Så hittar ditt barn alltid ett nytt rutnät med dolda ord att leta igenom, i sitt eget tempo. Och ju fler ord barnet hittar och ringar in, desto snabbare hoppar de bekanta orden fram ur bokstäverna nästa gång. Mycket nöje med att leta och känna igen orden!',
};
