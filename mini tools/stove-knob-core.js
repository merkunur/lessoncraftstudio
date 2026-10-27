/* =====================================================================
   stove-knob-core.js — the model for ACTIVITY #134 of the one-by-one
   rebuild: "Pesto's Soup Stall" → THE STOVE KNOB (L.1.5.d; all 11
   locales).
   Design: docs/activities-rebuild/designs/134-shades.md
   ---------------------------------------------------------------------
   Pesto's stove knob has a word on every click. Turn it up and the flame
   grows click by click; the soup takes the strength of the WORD on that
   click. The words are in the right order only when flame and soup rise
   together — a word out of place makes the soup jump.
   · level 1: order a ladder (warm · hot · boiling) from a little to a lot;
   · level 2: read the order ticket, turn the knob to the word it needs,
     serve — and find the word between two others;
   · level 3: twin words share one click (start / begin);
   · level 4: two knobs — going words by speed, looking words by time.
   DATA is written by a build script. Pure and DOM-free; UMD
   (window.StoveKnobCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StoveKnobCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  /*DATA-BEGIN*/ var DATA = {"LOCALES":["en","de","fr","es","pt","it","nl","sv","da","no","fi"],"IDS":["heat","cold","wet","voice","said","size","speed","time"],"ORD":[["heat",1],["heat",3],["wet",1],["wet",3],["voice",1],["voice",3],["size",1],["size",3],["speed",1],["speed",3],["time",1],["time",3],["voice",2],["size",2],["said",1],["said",2],["said",3]],"BETWEEN":[["heat","cold"],["cold","heat"],["size","size"],["wet","wet"]],"GO_ROUNDS":[[1,3,4],[0,2,4],[1,2,3],[0,3,4],[2,3,4],[0,2,3],[1,2,4]],"SCALE":{"heat":["#F8E1B4","#E2574B"],"cold":["#F0F7FC","#5E8FC2"],"wet":["#E3F1FB","#2D6FB3"],"voice":["#EEE8F7","#6B3FA0"],"said":["#EEE8F7","#6B3FA0"],"size":["#E8F4DC","#4E8A2E"],"speed":["#FFF0D9","#D9822B"],"time":["#E6F4F1","#146B5E"]},"en":{"lad":{"heat":{"w3":["warm","hot","boiling"],"w4":["lukewarm","warm","hot","boiling"]},"cold":{"w3":["cool","cold","freezing"],"w4":["cool","chilly","cold","freezing"]},"wet":{"w3":["damp","wet","soaked"],"w4":null},"voice":{"w3":["whisper","talk","shout"],"w4":["whisper","talk","shout","scream"]},"said":{"w3":["whispered","said","shouted"],"w4":null},"size":{"w3":["small","big","huge"],"w4":["tiny","small","big","huge"]},"speed":{"w3":["stroll","run","dash"],"w4":["stroll","walk","run","dash"]},"time":{"w3":["glance","look","stare"],"w4":null}},"tickets":["Grandpa likes his soup only a little heated, so he can sip it right away.","This soup has bubbled on the stove all morning — it would burn your tongue!","The towel only caught a little mist from the sea.","The towel fell right into the pond and came out dripping everywhere!","Use your softest voice so the sleeping baby does not wake up.","Your friend is all the way across the field — make sure she hears you!","The ant is so little you can hardly see it.","The whale is longer than a school bus!","We take our time in the park and smell every flower.","The bus is leaving — go as fast as you can!","Her eyes go to the clock for just one second.","His eyes stay on the fish tank for a long, long time.","Tell Grandma about your day in your everyday voice.","The puppy has grown — now it fills Grandpa's whole lap.","\"The baby is asleep,\" ___ Mia, very softly.","\"Please pass the bread,\" ___ Tom at the table.","\"Watch out for the ball!\" ___ Sam across the yard."],"decoy":{"heat":["cold"],"cold":["hot"],"size":["tiny"],"wet":["dry"]},"twins":[["small","little","big"],["shut","close","open"],["start","begin","stop"],["smart","clever","funny"],["fast","quick","slow"],["fix","repair","break"],["big","large","small"],["talk","speak","shout"]],"go":["creep","stroll","walk","run","dash"],"field":["going","looking"]},"de":{"lad":{"heat":{"w3":["warm","heiß","kochend heiß"],"w4":["lauwarm","warm","heiß","kochend heiß"]},"cold":{"w3":["kühl","kalt","eiskalt"],"w4":null},"wet":{"w3":["feucht","nass","klatschnass"],"w4":null},"voice":{"w3":["flüstern","sprechen","schreien"],"w4":["flüstern","sprechen","rufen","schreien"]},"said":{"w3":["flüsterte","sagte","schrie"],"w4":null},"size":{"w3":["klein","groß","riesig"],"w4":["winzig","klein","groß","riesig"]},"speed":{"w3":["schlendern","rennen","rasen"],"w4":["schlendern","gehen","rennen","rasen"]},"time":{"w3":["kurz hinschauen","schauen","starren"],"w4":null}},"tickets":["Opa will seine Suppe gleich schlürfen, ohne zu pusten.","Diese Suppe hat den ganzen Morgen auf dem Herd gebrodelt – sie würde dir die Zunge verbrennen!","Das Handtuch hat nur ein wenig Nebel vom Meer abbekommen.","Das Handtuch ist in den Teich gefallen und tropft überall!","Nimm deine leiseste Stimme, damit das Baby nicht aufwacht.","Dein Freund steht ganz am anderen Ende der Wiese – er soll dich hören!","Die Ameise sieht man kaum.","Der Wal ist länger als ein Schulbus!","Wir lassen uns Zeit im Park und riechen an jeder Blume.","Der Bus fährt gleich ab – lauf, so schnell du kannst!","Ihre Augen gehen nur eine Sekunde lang zur Uhr.","Seine Augen bleiben ganz, ganz lange am Aquarium hängen.","Erzähl Oma mit deiner ganz normalen Stimme von deinem Tag.","Der Welpe ist gewachsen – jetzt füllt er Opas ganzen Schoß.","„Das Baby schläft“, ___ Mia ganz leise.","„Gib mir bitte das Brot“, ___ Tom am Tisch.","„Pass auf, der Ball!“, ___ Sam über den ganzen Hof."],"decoy":{"heat":["kalt"],"cold":["heiß"],"size":["winzig"],"wet":["trocken"]},"twins":[["anfangen","beginnen","aufhören"],["schließen","zumachen","öffnen"],["klug","schlau","müde"],["sprechen","reden","schreien"],["schmutzig","dreckig","sauber"],["leise","still","laut"],["lustig","witzig","traurig"],["seltsam","merkwürdig","normal"]],"go":["schleichen","schlendern","gehen","rennen","rasen"],"field":["Bewegen","Sehen"]},"fr":{"lad":{"heat":{"w3":["tiède","chaud","brûlant"],"w4":null},"cold":{"w3":["frais","froid","glacé"],"w4":null},"wet":{"w3":["humide","mouillé","trempé"],"w4":null},"voice":{"w3":["chuchoter","parler","crier"],"w4":["chuchoter","parler","crier","hurler"]},"said":{"w3":["chuchote","dit","crie"],"w4":null},"size":{"w3":["petit","grand","énorme"],"w4":["minuscule","petit","grand","énorme"]},"speed":{"w3":["flâner","courir","foncer"],"w4":["flâner","marcher","courir","foncer"]},"time":{"w3":["jeter un coup d’œil","regarder","fixer"],"w4":null}},"tickets":["Papi peut boire sa soupe tout de suite, sans souffler dessus.","Cette soupe a bouilli sur le feu toute la matinée : elle te brûlerait la langue !","La serviette a juste pris un peu de brume de la mer.","La serviette est tombée dans l’étang et elle dégouline de partout !","Prends ta voix la plus douce pour ne pas réveiller le bébé.","Ton amie est tout au bout du champ : il faut qu’elle t’entende !","On voit à peine la fourmi.","La baleine est plus longue qu’un car scolaire !","Nous prenons notre temps au parc et sentons chaque fleur.","Le bus part : va aussi vite que tu peux !","Ses yeux vont vers l’horloge pendant une seule seconde.","Ses yeux restent sur l’aquarium très, très longtemps.","Raconte ta journée à Mamie avec ta voix de tous les jours.","Le chiot a pris des forces : maintenant, il prend toute la place sur les genoux de Papi.","« Le bébé dort », ___ Mia tout doucement.","« Passe-moi le pain, s’il te plaît », ___ Tom à table.","« Attention au ballon ! » ___ Sam à travers la cour."],"decoy":{"heat":["froid"],"cold":["chaud"],"size":["minuscule"],"wet":["sec"]},"twins":[["commencer","débuter","arrêter"],["finir","terminer","continuer"],["facile","simple","difficile"],["bizarre","étrange","normal"],["amusant","drôle","triste"],["gentil","aimable","méchant"],["fâché","en colère","calme"],["difficile","compliqué","facile"]],"go":["ramper","flâner","marcher","courir","foncer"],"field":["avancer","voir"]},"es":{"lad":{"heat":{"w3":["tibio","caliente","hirviendo"],"w4":null},"cold":{"w3":["fresco","frío","helado"],"w4":null},"wet":{"w3":["húmedo","mojado","empapado"],"w4":null},"voice":{"w3":["susurrar","hablar","gritar"],"w4":null},"said":{"w3":["susurró","dijo","gritó"],"w4":null},"size":{"w3":["pequeño","grande","enorme"],"w4":["diminuto","pequeño","grande","enorme"]},"speed":{"w3":["pasear","correr","salir disparado"],"w4":["pasear","caminar","correr","salir disparado"]},"time":{"w3":["echar un vistazo","mirar","quedarse mirando"],"w4":null}},"tickets":["Al abuelo le gusta la sopa que no quema nada, para tomarla enseguida.","Esta sopa estuvo burbujeando en la estufa toda la mañana: ¡te quemaría la lengua!","La toalla solo recibió unas gotitas de rocío.","¡La toalla se cayó al estanque y está chorreando por todos lados!","Usa tu voz más suave para que el bebé no se despierte.","Tu amiga está del otro lado del campo: ¡asegúrate de que te oiga!","La hormiga es tan chica que casi no se ve.","¡La ballena es más larga que un autobús escolar!","En el parque vamos sin prisa y olemos cada flor.","El camión se va: ¡ve lo más rápido que puedas!","Sus ojos van al reloj solo un segundo.","Sus ojos se quedan en la pecera mucho, mucho tiempo.","Cuéntale a la abuela tu día con tu voz de siempre.","El cachorro creció: ahora le llena todo el regazo al abuelo.","—El bebé está dormido —___ Mía muy bajito.","—Pásame el pan, por favor —___ Tomás en la mesa.","—¡Cuidado con la pelota! —___ Sam desde el otro lado del patio."],"decoy":{"heat":["frío"],"cold":["caliente"],"size":["diminuto"],"wet":["seco"]},"twins":[["empezar","comenzar","terminar"],["terminar","acabar","empezar"],["rápido","veloz","lento"],["fácil","sencillo","difícil"],["raro","extraño","normal"],["contento","alegre","triste"],["brincar","saltar","sentarse"],["hablar","platicar","gritar"]],"go":["gatear","pasear","caminar","correr","salir disparado"],"field":["moverse","ver"]},"pt":{"lad":{"heat":{"w3":["morno","quente","fervendo"],"w4":null},"cold":{"w3":["fresco","frio","congelante"],"w4":null},"wet":{"w3":["úmido","molhado","encharcado"],"w4":null},"voice":{"w3":["sussurrar","falar","gritar"],"w4":["sussurrar","falar","gritar","berrar"]},"said":{"w3":["sussurrou","disse","gritou"],"w4":null},"size":{"w3":["pequeno","grande","enorme"],"w4":["minúsculo","pequeno","grande","enorme"]},"speed":{"w3":["passear","correr","sair em disparada"],"w4":["passear","caminhar","correr","sair em disparada"]},"time":{"w3":["dar uma olhadinha","olhar","encarar"],"w4":null}},"tickets":["O vovô gosta da sopa só um pouquinho aquecida, para tomar logo.","Esta sopa ficou borbulhando no fogão a manhã toda: ia queimar sua língua!","A toalha só pegou um pouquinho da névoa do mar.","A toalha caiu no lago e está pingando por todo lado!","Use sua voz mais suave para o bebê não acordar.","Sua amiga está lá do outro lado do campo: ela precisa ouvir você!","A formiga é tão miudinha que quase não dá para ver.","A baleia é mais comprida que um ônibus escolar!","No parque, vamos sem pressa e cheiramos cada flor.","O ônibus está saindo: vá o mais rápido que puder!","Os olhos dela vão até o relógio por um segundo só.","Os olhos dele ficam no aquário por muito, muito tempo.","Conte o seu dia para a vovó com a sua voz de sempre.","O cachorrinho cresceu: agora ele ocupa o colo inteiro do vovô.","— O bebê está dormindo — ___ Mia, bem baixinho.","— Me passa o pão, por favor — ___ Tom à mesa.","— Cuidado com a bola! — ___ Sam do outro lado do quintal."],"decoy":{"heat":["frio"],"cold":["quente"],"size":["minúsculo"],"wet":["seco"]},"twins":[["começar","iniciar","terminar"],["terminar","acabar","começar"],["rápido","veloz","lento"],["fácil","simples","difícil"],["pular","saltar","sentar"],["contente","alegre","triste"],["cair","tombar","levantar"],["bravo","zangado","calmo"]],"go":["engatinhar","passear","caminhar","correr","sair em disparada"],"field":["andar","ver"]},"it":{"lad":{"heat":{"w3":["tiepido","caldo","bollente"],"w4":null},"cold":{"w3":["fresco","freddo","gelido"],"w4":null},"wet":{"w3":["umido","bagnato","fradicio"],"w4":null},"voice":{"w3":["sussurrare","parlare","gridare"],"w4":null},"said":{"w3":["sussurrò","disse","gridò"],"w4":null},"size":{"w3":["piccolo","grande","enorme"],"w4":["minuscolo","piccolo","grande","enorme"]},"speed":{"w3":["passeggiare","correre","sfrecciare"],"w4":["passeggiare","camminare","correre","sfrecciare"]},"time":{"w3":["dare un’occhiata","guardare","fissare"],"w4":null}},"tickets":["Al nonno piace la minestra che non scotta per niente, così la beve subito.","Questa minestra ha bollito sul fuoco tutta la mattina: ti brucerebbe la lingua!","L’asciugamano ha preso solo un po’ di nebbiolina dal mare.","L’asciugamano è caduto nello stagno e gocciola dappertutto!","Usa la tua voce più dolce, così il bambino non si sveglia.","La tua amica è in fondo al prato: deve sentirti!","La formica è così piccina che quasi non si vede.","La balena è più lunga di uno scuolabus!","Al parco ce la prendiamo comoda e annusiamo ogni fiore.","L’autobus sta partendo: vai più veloce che puoi!","Lo sguardo va all’orologio solo per un secondo.","Lo sguardo resta sull’acquario per tanto, tanto tempo.","Racconta la tua giornata alla nonna con la tua voce di tutti i giorni.","Il cucciolo è cresciuto: ora occupa tutto il grembo del nonno.","«Il bambino dorme», ___ Mia piano piano.","«Passami il pane, per favore», ___ Tom a tavola.","«Attento alla palla!», ___ Sam dall’altra parte del cortile."],"decoy":{"heat":["freddo"],"cold":["caldo"],"size":["minuscolo"],"wet":["asciutto"]},"twins":[["cominciare","iniziare","finire"],["finire","terminare","cominciare"],["veloce","rapido","lento"],["facile","semplice","difficile"],["strano","bizzarro","normale"],["sporco","sudicio","pulito"],["allegro","contento","triste"],["buttare","gettare","tenere"]],"go":["strisciare","passeggiare","camminare","correre","sfrecciare"],"field":["muoversi","vedere"]},"nl":{"lad":{"heat":{"w3":["lauw","warm","heet"],"w4":null},"cold":{"w3":["koel","koud","ijskoud"],"w4":null},"wet":{"w3":["vochtig","nat","kletsnat"],"w4":null},"voice":{"w3":["fluisteren","praten","schreeuwen"],"w4":["fluisteren","praten","roepen","schreeuwen"]},"said":{"w3":["fluisterde","zei","schreeuwde"],"w4":null},"size":{"w3":["klein","groot","reusachtig"],"w4":["piepklein","klein","groot","reusachtig"]},"speed":{"w3":["slenteren","rennen","sprinten"],"w4":["slenteren","lopen","rennen","sprinten"]},"time":{"w3":["even kijken","kijken","staren"],"w4":null}},"tickets":["Opa wil meteen van zijn soep slurpen, zonder te blazen.","Deze soep heeft de hele ochtend op het vuur gepruttelt — je zou je tong branden!","De handdoek heeft alleen een beetje mist van de zee gevangen.","De handdoek viel in de vijver en druipt overal!","Gebruik je zachtste stem, zodat de baby niet wakker wordt.","Je vriendin staat helemaal aan de andere kant van het veld — ze moet je horen!","Je ziet de mier bijna niet.","De walvis is langer dan een schoolbus!","We nemen de tijd in het park en ruiken aan elke bloem.","De bus vertrekt — ga zo snel als je kunt!","Haar ogen gaan maar één tel naar de klok.","Zijn ogen blijven heel, heel lang op het aquarium.","Vertel oma over je dag met je gewone stem.","De puppy is ouder geworden — nu ligt hij over opa's hele schoot.","\"De baby slaapt,\" ___ Mia heel zachtjes.","\"Wil je het brood even aangeven?\" ___ Tom aan tafel.","\"Pas op voor de bal!\" ___ Sam over het hele plein."],"decoy":{"heat":["koud"],"cold":["heet"],"size":["piepklein"],"wet":["droog"]},"twins":[["beginnen","starten","stoppen"],["sluiten","dichtdoen","opendoen"],["snel","vlug","langzaam"],["makkelijk","eenvoudig","moeilijk"],["raar","vreemd","gewoon"],["vies","vuil","schoon"],["boos","kwaad","blij"],["kiezen","uitzoeken","weggooien"]],"go":["kruipen","slenteren","lopen","rennen","sprinten"],"field":["gaan","zien"]},"sv":{"lad":{"heat":{"w3":["ljummen","varm","kokhet"],"w4":null},"cold":{"w3":["sval","kall","iskall"],"w4":null},"wet":{"w3":["fuktig","blöt","genomblöt"],"w4":null},"voice":{"w3":["viska","prata","skrika"],"w4":["viska","prata","ropa","skrika"]},"said":{"w3":["viskade","sa","skrek"],"w4":null},"size":{"w3":["liten","stor","jättestor"],"w4":["pytteliten","liten","stor","jättestor"]},"speed":{"w3":["promenera","springa","rusa"],"w4":["promenera","gå","springa","rusa"]},"time":{"w3":["kasta en blick","titta","stirra"],"w4":null}},"tickets":["Morfar vill smutta på soppan direkt, utan att blåsa.","Soppan har bubblat på spisen hela morgonen – den skulle bränna tungan!","Handduken fick bara lite dimma från havet på sig.","Handduken ramlade i dammen och droppar överallt!","Använd din mjukaste röst så att bebisen inte vaknar.","Din kompis står långt bort på andra sidan fältet – hon måste höra dig!","Myran syns knappt alls.","Valen är längre än en skolbuss!","Vi tar god tid på oss i parken och luktar på varje blomma.","Bussen går snart – skynda så fort du kan!","Hennes ögon går mot klockan bara en sekund.","Hans ögon stannar på akvariet länge, länge.","Berätta om din dag för mormor med din vanliga röst.","Valpen har växt – nu fyller den hela morfars knä.","”Bebisen sover”, ___ Mia, mycket lågt.","”Kan du skicka brödet?” ___ Tom vid bordet.","”Akta bollen!” ___ Sam tvärs över gården."],"decoy":{"heat":["kall"],"cold":["varm"],"size":["pytteliten"],"wet":["torr"]},"twins":[["börja","starta","sluta"],["stänga","slå igen","öppna"],["snabb","kvick","långsam"],["konstig","underlig","vanlig"],["smutsig","lortig","ren"],["trött","sömnig","pigg"],["prata","tala","skrika"],["välja","plocka ut","kasta"]],"go":["krypa","promenera","gå","springa","rusa"],"field":["röra sig","se"]},"da":{"lad":{"heat":{"w3":["lunken","varm","glohed"],"w4":null},"cold":{"w3":["kølig","kold","iskold"],"w4":null},"wet":{"w3":["fugtig","våd","gennemblødt"],"w4":null},"voice":{"w3":["hviske","tale","råbe"],"w4":["hviske","tale","råbe","skrige"]},"said":{"w3":["hviskede","sagde","råbte"],"w4":null},"size":{"w3":["lille","stor","kæmpestor"],"w4":["bitte lille","lille","stor","kæmpestor"]},"speed":{"w3":["slentre","løbe","spurte"],"w4":["slentre","gå","løbe","spurte"]},"time":{"w3":["kaste et blik","kigge","stirre"],"w4":null}},"tickets":["Morfar vil drikke sin suppe med det samme uden at puste på den.","Suppen har boblet på komfuret hele formiddagen – den ville brænde din tunge!","Håndklædet fik kun lidt dis fra havet.","Håndklædet faldt i dammen og drypper over det hele!","Brug din blødeste stemme, så babyen ikke vågner.","Din veninde står helt ovre i den anden ende af marken – hun skal kunne høre dig!","Myren kan man næsten ikke se.","Hvalen er længere end en skolebus!","Vi tager os god tid i parken og dufter til hver blomst.","Bussen kører nu – skynd dig, så hurtigt du kan!","Hendes øjne går hen til uret i bare ét sekund.","Hans øjne bliver på akvariet længe, længe.","Fortæl mormor om din dag med din helt almindelige stemme.","Hvalpen er vokset – nu fylder den hele morfars skød.","\"Babyen sover,\" ___ Mia helt stille.","\"Vil du række mig brødet?\" ___ Tom ved bordet.","\"Pas på bolden!\" ___ Sam tværs over gården."],"decoy":{"heat":["kold"],"cold":["varm"],"size":["bitte lille"],"wet":["tør"]},"twins":[["begynde","starte","stoppe"],["slutte","ende","begynde"],["hurtig","rap","langsom"],["nem","enkel","svær"],["mærkelig","underlig","almindelig"],["beskidt","snavset","ren"],["tale","snakke","råbe"],["træt","søvnig","frisk"]],"go":["kravle","slentre","gå","løbe","spurte"],"field":["bevæge sig","se"]},"no":{"lad":{"heat":{"w3":["lunken","varm","brennhet"],"w4":null},"cold":{"w3":["kjølig","kald","iskald"],"w4":null},"wet":{"w3":["fuktig","våt","søkkvåt"],"w4":null},"voice":{"w3":["hviske","snakke","rope"],"w4":["hviske","snakke","rope","skrike"]},"said":{"w3":["hvisket","sa","ropte"],"w4":null},"size":{"w3":["liten","stor","kjempestor"],"w4":["bitteliten","liten","stor","kjempestor"]},"speed":{"w3":["rusle","løpe","spurte"],"w4":["rusle","gå","løpe","spurte"]},"time":{"w3":["kaste et blikk","se","stirre"],"w4":null}},"tickets":["Morfar vil drikke suppa med en gang, uten å blåse på den.","Suppa har boblet på komfyren hele morgenen – den ville brent tunga di!","Håndkleet fikk bare litt tåke fra havet.","Håndkleet falt i dammen og drypper overalt!","Bruk den mykeste stemmen din, så babyen ikke våkner.","Venninnen din står helt borte på andre siden av jordet – hun må høre deg!","Mauren ser du nesten ikke.","Hvalen er lengre enn en skolebuss!","Vi tar oss god tid i parken og lukter på hver blomst.","Bussen går nå – skynd deg så fort du kan!","Øynene hennes går bort til klokka i bare ett sekund.","Øynene hans blir på akvariet lenge, lenge.","Fortell mormor om dagen din med den vanlige stemmen din.","Valpen har vokst – nå fyller den hele fanget til morfar.","«Babyen sover», ___ Mia, helt stille.","«Kan du sende meg brødet?» ___ Tom ved bordet.","«Pass deg for ballen!» ___ Sam over hele gården."],"decoy":{"heat":["kald"],"cold":["varm"],"size":["bitteliten"],"wet":["tørr"]},"twins":[["begynne","starte","slutte"],["lukke","stenge","åpne"],["rask","kjapp","treg"],["rar","merkelig","vanlig"],["skitten","møkkete","ren"],["snakke","prate","rope"],["velge","plukke ut","kaste"],["trøtt","søvnig","opplagt"]],"go":["krype","rusle","gå","løpe","spurte"],"field":["bevege seg","bruke øynene"]},"fi":{"lad":{"heat":{"w3":["lämmin","kuuma","tulikuuma"],"w4":["haalea","lämmin","kuuma","tulikuuma"]},"cold":{"w3":["viileä","kylmä","jääkylmä"],"w4":null},"wet":{"w3":["kostea","märkä","likomärkä"],"w4":null},"voice":{"w3":["kuiskata","puhua","huutaa"],"w4":null},"said":{"w3":["kuiskasi","sanoi","huusi"],"w4":null},"size":{"w3":["pieni","iso","valtava"],"w4":["pikkuruinen","pieni","iso","valtava"]},"speed":{"w3":["kuljeskella","juosta","syöksyä"],"w4":["kuljeskella","kävellä","juosta","syöksyä"]},"time":{"w3":["vilkaista","katsoa","tuijottaa"],"w4":null}},"tickets":["Ukki voi hörppiä keittoa heti, eikä hänen tarvitse puhaltaa siihen.","Tämä keitto on porissut liedellä koko aamun – se polttaisi kielesi!","Pyyhe sai vain vähän sumua mereltä.","Pyyhe putosi lampeen ja tippuu joka puolelta!","Käytä pehmeintä ääntäsi, ettei vauva herää.","Kaverisi on kaukana pellon toisella puolella – hänen pitää kuulla sinut!","Muurahainen on niin pikkuinen, että sitä tuskin näkee.","Valas on pidempi kuin koulubussi!","Puistossa pidämme kiireettä ja haistelemme jokaista kukkaa.","Bussi lähtee – mene niin nopeasti kuin pääset!","Hänen silmänsä käyvät kellossa vain sekunnin ajan.","Hänen silmänsä pysyvät akvaariossa pitkään, pitkään.","Kerro mummolle päivästäsi tavallisella äänelläsi.","Pentu on kasvanut – nyt se täyttää koko ukin sylin.","”Vauva nukkuu”, ___ Mia hiljaa hiljaa.","”Ojennatko leivän?” ___ Tom pöydässä.","”Varo palloa!” ___ Sam koko pihan yli."],"decoy":{"heat":["kylmä"],"cold":["kuuma"],"size":["pikkuruinen"],"wet":["kuiva"]},"twins":[["iloinen","onnellinen","surullinen"],["sulkea","panna kiinni","avata"],["nopea","vikkelä","hidas"],["iso","suuri","pieni"],["outo","kummallinen","tavallinen"],["puhua","jutella","huutaa"],["valita","poimia","heittää pois"],["vahva","voimakas","heikko"]],"go":["ryömiä","kuljeskella","kävellä","juosta","syöksyä"],"field":["liikkua","nähdä"]}}; /*DATA-END*/

  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return DATA.LOCALES && DATA.LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levels() { return ['1', '2', '3', '4']; }
  function levelOf(v) { v = String(v); return levels().indexOf(v) >= 0 ? v : '1'; }
  function wordsOf(v) { return String(v) === '4' ? 4 : 3; }
  function rounds(lvl) { var n = { '1': 8, '2': 21, '3': 8, '4': 7 }[levelOf(lvl)]; var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function same(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function ident(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  /* a shelf order that is never already in order and never simply reversed */
  function messy(n, rnd) { var id = ident(n), rev = id.slice().reverse(); for (var k = 0; k < 50; k++) { var c = shuffle(id, rnd); if (!same(c, id) && !same(c, rev)) return c; } return n === 3 ? [1, 2, 0] : [2, 0, 3, 1]; }
  var FIX3 = [1, 2, 0], FIX4 = [2, 0, 3, 1];

  /* ---------------- a round ---------------- */
  /* rd: knobs [{ladder, n, field?}], windows [{knob, click, slot}], tiles [{text, ladder, rank, kind, knob?}], fixed [window → tile], plus ticket / answer per kind */
  function ladder(loc, id, four) { var L = DATA[loc].lad[id]; return four && L.w4 ? L.w4 : L.w3; }
  function round(loc, lvl, r, opts) {
    loc = locale(loc); lvl = levelOf(lvl); opts = opts || {};
    var D = DATA[loc], rd = { loc: loc, lvl: lvl, r: r, knobs: [], windows: [], tiles: [], fixed: {} };
    var addKnob = function (id, n, field) { var k = rd.knobs.length; rd.knobs.push({ ladder: id, n: n, field: field == null ? null : field }); for (var c = 0; c < n; c++) rd.windows.push({ knob: k, click: c, slot: 0 }); return k; };
    if (lvl === '1') {
      var id = DATA.IDS[r], w = ladder(loc, id, wordsOf(opts.words) === 4), n = w.length, ord = opts.order && opts.order.length === n ? opts.order : (n === 3 ? FIX3 : FIX4);
      rd.kind = 'order'; addKnob(id, n);
      rd.tiles = ord.map(function (i) { return { text: w[i], ladder: id, rank: i + 1, kind: 'ladder' }; });
      return rd;
    }
    if (lvl === '2') {
      if (r < DATA.ORD.length) {
        var o = DATA.ORD[r], wl = ladder(loc, o[0], false);
        rd.kind = 'pick'; rd.ticket = D.tickets[r]; rd.answer = o[1] - 1; addKnob(o[0], 3);
        rd.tiles = wl.map(function (t, i) { return { text: t, ladder: o[0], rank: i + 1, kind: 'ladder' }; });
        rd.windows.forEach(function (_, i) { rd.fixed[i] = i; });
        return rd;
      }
      var b = DATA.BETWEEN[r - DATA.ORD.length], bid = b[0], bw = ladder(loc, bid, false), dec = D.decoy[bid];
      rd.kind = 'between'; addKnob(bid, 3); rd.low = bw[0]; rd.high = bw[2];
      var cand = [{ text: bw[1], ladder: bid, rank: 2, kind: 'ladder' }].concat(dec.map(function (t) { return { text: t, ladder: bid, rank: 0, kind: 'decoy' }; }));
      var so = opts.order && opts.order.length === cand.length ? opts.order : ident(cand.length).reverse();
      rd.tiles = [{ text: bw[0], ladder: bid, rank: 1, kind: 'ladder' }, { text: bw[2], ladder: bid, rank: 3, kind: 'ladder' }].concat(so.map(function (i) { return cand[i]; }));
      rd.fixed[0] = 0; rd.fixed[2] = 1; rd.answer = 2 + so.indexOf(0);
      return rd;
    }
    if (lvl === '3') {
      var t = D.twins[r], to = opts.order && opts.order.length === 2 ? opts.order : (r % 2 ? [1, 0] : [0, 1]);
      rd.kind = 'twin'; rd.knobs.push({ ladder: 'twin', n: 1, field: null }); rd.windows = [{ knob: 0, click: 0, slot: 0 }, { knob: 0, click: 0, slot: 1 }];
      var pair = [{ text: t[1], ladder: 'twin', rank: 1, kind: 'twin' }, { text: t[2], ladder: 'twin', rank: 0, kind: 'other' }];
      rd.tiles = [{ text: t[0], ladder: 'twin', rank: 1, kind: 'target' }].concat(to.map(function (i) { return pair[i]; }));
      rd.fixed[0] = 0; rd.answer = 1 + to.indexOf(0);
      return rd;
    }
    var g = DATA.GO_ROUNDS[r], look = ladder(loc, 'time', false);
    rd.kind = 'golook'; addKnob('speed', 3, 0); addKnob('time', 3, 1);
    var all = g.map(function (gi, i) { return { text: D.go[gi], ladder: 'speed', rank: i + 1, kind: 'ladder', knob: 0 }; }).concat(look.map(function (t, i) { return { text: t, ladder: 'time', rank: i + 1, kind: 'ladder', knob: 1 }; }));
    var go4 = opts.order && opts.order.length === 6 ? opts.order : [3, 1, 5, 0, 4, 2];
    rd.tiles = go4.map(function (i) { return all[i]; });
    return rd;
  }

  /* ---------------- the state ---------------- */
  function newState(loc, lvl, r, opts) {
    var rd = round(loc, lvl, r, opts), st = { loc: rd.loc, lvl: rd.lvl, r: r, rd: rd, misses: 0, last: null, done: false, sel: null, jumped: [], help: false };
    st.win = rd.windows.map(function (_, w) { return rd.fixed[w] != null ? rd.fixed[w] : null; });
    st.knob = rd.knobs.map(function () { return 0; });
    return st;
  }
  function isFixed(st, w) { return st.rd.fixed[w] != null; }
  function where(st, j) { return st.win.indexOf(j); }
  function moved(st) { st.last = null; st.jumped = []; st.help = false; }
  /* choose a tile on the shelf (the same again lets go); a tile on the knob goes back to the shelf */
  function pick(st, j) {
    if (st.done || j < 0 || j >= st.rd.tiles.length) return 'no';
    var w = where(st, j); if (w >= 0) { if (isFixed(st, w)) return 'no'; moved(st); st.win[w] = null; st.sel = null; return 'home'; }
    moved(st); st.sel = st.sel === j ? null : j; return st.sel === j ? 'sel' : 'unsel';
  }
  /* put a tile on a window: a full window swaps (the old word goes where the new one came from) */
  function place(st, j, w) {
    if (st.done || w < 0 || w >= st.win.length || isFixed(st, w)) return 'no';
    if (j == null) j = st.sel; if (j == null || j < 0 || j >= st.rd.tiles.length) return 'no';
    var from = where(st, j); if (from >= 0 && isFixed(st, from)) return 'no';
    moved(st); var old = st.win[w];
    if (from >= 0) st.win[from] = old != null ? old : null;
    st.win[w] = j; st.sel = null; return 'on';
  }
  function turn(st, k, c) { var K = st.rd.knobs[k]; if (!K || st.done) return 'no'; c = Math.max(0, Math.min(K.n - 1, c)); if (st.knob[k] === c) return 'same'; st.knob[k] = c; if (st.rd.kind === 'pick') { st.last = null; st.help = false; } return 'turn'; }
  /* is the word on this window the right one there? */
  function rightAt(st, w) {
    var rd = st.rd, j = st.win[w], W = rd.windows[w]; if (j == null) return false;
    var t = rd.tiles[j];
    if (rd.kind === 'order') return t.rank === W.click + 1;
    if (rd.kind === 'between') return w !== 1 || t.kind === 'ladder';
    if (rd.kind === 'twin') return w === 0 || t.kind === 'twin';
    if (rd.kind === 'golook') return t.knob === W.knob && t.rank === W.click + 1;
    return true;
  }
  /* the soup a window makes: t in 0..1 along the ladder's colour scale, 'grey' for a word that is not this soup, null for an empty window */
  function soupAt(st, w) {
    var rd = st.rd, j = st.win[w]; if (j == null) return null;
    var t = rd.tiles[j], K = rd.knobs[rd.windows[w].knob];
    if (rd.kind === 'twin') return t.kind === 'other' ? 'grey' : 0.7;
    if (t.kind === 'decoy') return 'grey';
    if (rd.kind === 'golook' && t.knob !== rd.windows[w].knob) return 'grey';
    var n = rd.kind === 'golook' ? 3 : K.n; return n < 2 ? 0.7 : 0.12 + 0.88 * (t.rank - 1) / (n - 1);
  }
  function windowOf(st, k, c, slot) { var ws = st.rd.windows; for (var i = 0; i < ws.length; i++) if (ws[i].knob === k && ws[i].click === c && (slot == null || ws[i].slot === slot)) return i; return -1; }
  /* Check (turn it up / serve): the sweep */
  function check(st) {
    var rd = st.rd; if (st.done) return { result: 'done' };
    if (rd.kind === 'pick') {
      if (st.knob[0] === rd.answer) { st.done = true; st.last = 'ok'; return { result: 'ok' }; }
      st.misses++; st.last = 'miss'; st.help = st.misses >= 2; return { result: 'miss', served: st.knob[0] };
    }
    if (st.win.some(function (j) { return j == null; })) { st.last = 'empty'; return { result: 'empty' }; }
    var bad = []; st.win.forEach(function (_, w) { if (!rightAt(st, w)) bad.push(w); });
    if (!bad.length) { st.done = true; st.last = 'ok'; st.jumped = []; return { result: 'ok' }; }
    st.misses++; st.last = 'miss'; st.jumped = bad; st.help = st.misses >= 2;
    return { result: 'miss', jumped: bad };
  }
  function hint(st) {
    var rd = st.rd, l = st.last, k = rd.kind;
    if (l === 'empty') return k === 'between' ? 'hintBetween' : k === 'twin' ? 'hintTwin' : 'hintEmpty';
    if (l !== 'miss') return null;
    if (k === 'pick') return st.help ? 'missPick2' : 'missPick';
    if (k === 'between') return 'missBetween';
    if (k === 'twin') return 'missTwin';
    if (k === 'golook' && st.jumped.some(function (w) { var j = st.win[w]; return rd.tiles[j].knob !== rd.windows[w].knob; })) return 'missField';
    return st.help ? 'missGlow' : 'missJump';
  }
  /* the word the hint names: the first window where the soup jumped (or the wrong twin) */
  function hintWord(st) { var w = st.jumped[0]; return w == null ? '' : st.rd.tiles[st.win[w]].text; }
  /* the pieces of the success line */
  function okParts(st) {
    var rd = st.rd, by = function (k) { var a = []; rd.windows.forEach(function (W, w) { if (W.knob === k) a.push(rd.tiles[st.win[w]].text); }); return a; };
    if (rd.kind === 'order') return { key: 'okOrder', list: by(0) };
    if (rd.kind === 'pick') return { key: 'okPick', w: rd.tiles[rd.answer].text };
    if (rd.kind === 'between') return { key: 'okPick', w: rd.tiles[st.win[1]].text };
    if (rd.kind === 'twin') return { key: 'okTwin', a: rd.tiles[0].text, b: rd.tiles[st.win[1]].text };
    return { key: 'okGoLook', f1: DATA[rd.loc].field[0], f2: DATA[rd.loc].field[1], l1: by(0), l2: by(1) };
  }

  /* ---------------- the plan ---------------- */
  /* per pass: a fresh round order; the shelf messy (never in order, never reversed), the twin's and the middle word's shelf place balanced over the pass */
  function plan(loc, lvl, rnd, prev, words) {
    rnd = rnd || Math.random; loc = locale(loc); lvl = levelOf(lvl);
    var ids = rounds(lvl), o = null;
    for (var a = 0; a < 200; a++) { var c = shuffle(ids, rnd); if (!same(c, prev)) { o = c; break; } }
    o = o || ids;
    var orders = {}, flip = shuffle(ident(o.length).map(function (i) { return i % 2; }), rnd);
    o.forEach(function (r, i) {
      if (lvl === '1') orders[r] = messy(ladder(loc, DATA.IDS[r], wordsOf(words) === 4).length, rnd);
      else if (lvl === '2') { if (r >= DATA.ORD.length) { var n = 1 + DATA[loc].decoy[DATA.BETWEEN[r - DATA.ORD.length][0]].length; var p = shuffle(ident(n), rnd); orders[r] = p; } }
      else if (lvl === '3') orders[r] = flip[i] ? [1, 0] : [0, 1];
      else orders[r] = shuffle(ident(6), rnd);
    });
    return { order: o, orders: orders };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 340 }; }

  return {
    DATA: DATA, locale: locale, levels: levels, levelOf: levelOf, wordsOf: wordsOf, rounds: rounds, ladder: ladder, round: round,
    newState: newState, pick: pick, place: place, turn: turn, rightAt: rightAt, soupAt: soupAt, windowOf: windowOf, check: check, hint: hint, hintWord: hintWord, okParts: okParts, plan: plan, band: band, messy: messy
  };
});
