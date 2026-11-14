## Klasser och resultat

Lärare med paketet Lärare kan skapa en klass på LessonCraftStudio, ge eleverna arbetsblad att göra på en skärm och se hur det gick för varje barn. Det här avsnittet förklarar vad den funktionen sparar. Om du använder webbplatsen utan klasslänk gäller avsnittet inte dig; resten av den här policyn beskriver vad webbplatsen gör för alla besökare.

### Vem som är ansvarig

Skolan bestämmer om funktionen används och för vilka barn. När en lärare arbetar på en skola är skolan (eller huvudmannen som driver den) ”personuppgiftsansvarig” för klassens uppgifter, och läraren använder funktionen för skolans räkning. En privatlärare eller en förälder som undervisar sitt barn hemma är själv personuppgiftsansvarig. Vi driver funktionen åt dem och följer deras instruktioner; i dataskyddsreglernas mening är vi deras ”personuppgiftsbiträde”, enligt [villkoren för behandling av personuppgifter för klasser](/class-terms), som gäller för varje klass och som en skola kan få undertecknade av båda parter. För två saker är vi själva ansvariga: att leverera sidorna säkert (då används enhetens IP-adress så länge förfrågan pågår) och lärarens eget konto.

### Vad vi sparar om ett barn

- **Inget namn.** En klass arbetar med nummer: varje barn har ett platsnummer och en bild av ett djur. Läraren har själv listan över vem som har vilket nummer; vi får den aldrig.
- **Resultat**: för varje arbetsblad som ett barn gör via klasslänken: vilket arbetsblad det var, när det öppnades, hur många svar som var rätt när barnet första gången tryckte på ”Kontrollera svar” och när det var, hur många svar det fanns, vilka som var rätt, hur många gånger barnet tryckte på ”Kontrollera svar” och om sidan gjordes klar. För ett nivåset sparar vi också vilken nivå sidan hade.
- **Klassen**: namnet som läraren gav den och dess språk. Klassens namn visas på klassens sida, så en lärare bör inte skriva en persons namn i det.

Det är allt. Vi frågar inte efter och sparar inte efternamn, födelsedatum, e-postadress, foto, adress eller var barnet befinner sig. Vi sparar inte vad ett barn har skrivit eller ritat, bara om ett svar var rätt. Ingen tidtagning pågår, och ingen får se hur lång tid ett barn tog på sig.

### Så fungerar det för ett barn

Ett barn öppnar klasslänken, trycker på sitt eget nummer och sin bild och gör arbetsbladet. Inget konto, inget lösenord, inget att installera. Barnet ser inga poäng, ingen topplista och ingen tidtagning. Klassens sida är gemensam: ett barn som trycker på en annan plats ser vilka arbetsblad den platsen redan har gjort (gjort eller inte gjort, aldrig hur många svar som var rätt).

Klassens sida visar hela klassens platser (nummer och bilder) så att varje barn kan hitta sin egen. Alla som har klasslänken kan öppna den sidan, så en lärare bör bara dela länken med klassen. Länken innehåller en lång slumpmässig nyckel, och läraren kan när som helst byta ut den, vilket stänger av den gamla länken.

### Vem som kan se resultaten

På webbplatsen kan bara den lärare som skapade klassen se resultaten, och bara som inloggad. Vi visar inte resultat för andra lärare, andra kunder eller allmänheten, och det finns ingen sida för vårdnadshavare. Vi tittar inte själva på klassuppgifter; vi kan bara komma åt databasen för att driva och reparera tjänsten. En vårdnadshavare som vill se vad som är sparat om barnet frågar läraren eller skolan.

### Vad vi använder uppgifterna till

Bara till att visa lärare resultaten för deras egna klasser. Vi använder inte klassuppgifter för reklam, vi säljer dem inte, vi delar dem inte med någon utom de två företag som står för serverdriften och leveransen av webbplatsen (se nedan), och vi använder dem inte för att träna något system. Vi bygger ingen profil av ett barn för något eget ändamål. En sak sker automatiskt och är en del av undervisningen: i ett nivåset blir nästa sida lättare eller svårare beroende på hur den förra gick, och lärarens skärm sorterar varje resultat som ”Nästan allt rätt”, ”Några fel” eller ”Många fel”. Webbplatsen fattar inget beslut om ett barn.

### Kakor och spårning

På klassens sida och på varje sida som ett barn öppnar därifrån laddas ingenting från något annat företag, ingen besöksanalys körs och ingen annonstagg finns. De förfrågningar som dessa sidor skickar har ingen kaka med sig och sätter ingen. För att ett barn ska komma tillbaka till sin egen lista kommer webbläsarfliken ihåg den plats barnet tryckte på i 20 minuter, bara på enheten. Som alla webbservrar tar vår emot enhetens IP-adress med varje förfrågan; för klassens sida och förfrågningarna bakom den skriver vi inte in den adressen i vår logg. Vår allmänna logg över förfrågningar (IP-adress, tid, sidans adress) sparas av säkerhetsskäl och raderas efter 14 dagar.

### Hur länge vi sparar uppgifterna

- Läraren kan när som helst radera ett barns resultat, ett barn eller hela klassen. Raderingen sker direkt i vår databas.
- En klass som inte har använts på 14 månader raderas automatiskt.
- Varje enskilt resultat raderas senast 14 månader efter att det kom till, även om klassen fortfarande används. En sida som ett barn öppnade men aldrig kontrollerade tas bort efter 7 dagar.
- Om lärarens paket upphör raderas lärarens klasser 60 dagar senare. Under de 60 dagarna kan läraren fortfarande läsa och radera dem.
- Raderade uppgifter försvinner från våra säkerhetskopior inom 7 dagar.

### Var uppgifterna finns

I en enda databas på en server som vi hyr av Hetzner Online GmbH (Tyskland) och som står i Finland. Säkerhetskopior som innehåller klassuppgifter förvaras bara på den servern. Cloudflare, Inc. (USA) levererar webbplatsen: varje förfrågan, även ett resultat, går genom Cloudflares nät och lagras inte där utöver kortlivade tekniska loggar. Cloudflare är certifierat enligt EU-US Data Privacy Framework, och vårt avtal med Cloudflare innehåller EU:s standardavtalsklausuler. Dessa två företag är de enda som hanterar klassuppgifter.

### Dina rättigheter

Vårdnadshavare och barn har rätt att få se vad som är sparat, att få det rättat eller raderat, att få användningen begränsad och att invända mot den. Eftersom skolan ansvarar för klassen och bara läraren vet vilken plats som hör till vilket barn ber vi dig att först fråga läraren eller skolan; vi hjälper dem att svara. Du kan också skriva till oss på support@lessoncraftstudio.com; vi skickar begäran vidare till läraren utan dröjsmål. Du kan när som helst klaga hos dataskyddsmyndigheten i ditt land. Konton på LessonCraftStudio är för vuxna (18 år eller äldre); barn skapar aldrig något konto.

### USA

Riza Kunur Genc (LessonCraftStudio), Björkvägen 15D, 459 31 Ljungskile, Sverige, support@lessoncraftstudio.com, driver den här funktionen och är den enda operatör som samlar in information genom den. Vi tillhandahåller den till skolor och lärare enbart för skoländamål. Från ett barns enhet tar vi emot de resultat som räknas upp ovan och, med varje förfrågan, enhetens IP-adress. Vi använder den adressen bara för att leverera sidan och hålla tjänsten säker; vi använder den inte för att kontakta ett barn, för att känna igen ett barn på andra webbplatser, för att bygga en profil eller för att visa reklam, och vi sparar den inte tillsammans med resultaten. Vi säljer aldrig elevinformation, använder den aldrig för riktad reklam och använder den aldrig för ett kommersiellt ändamål som inte hör ihop med skolans användning. Vi sparar inte resultat längre än vad som anges under ”Hur länge vi sparar uppgifterna” och raderar dem sedan. En skola eller lärare kan när som helst granska och radera ett barns resultat och kan stoppa fortsatt insamling genom att ta bort platsen; en vårdnadshavare frågar skolan, eller skriver till oss så skickar vi begäran vidare. För en skola agerar vi som ”school official” (skolans företrädare) enligt FERPA, och på begäran undertecknar vi ett skoldistrikts avtal om skydd av elevuppgifter (student data privacy agreement).

### Om något går fel

Om klassuppgifter går förlorade eller ses av någon som inte borde se dem meddelar vi läraren och skolan utan dröjsmål och senast 48 timmar efter att vi fått veta det.

### Ändringar

Vi meddelar lärare via e-post innan vi ändrar vad funktionen sparar eller vilka företag som hanterar uppgifterna.
