/* =====================================================================
   opposites-rod-core.js — the model of ACTIVITY #72 of the one-by-one
   rebuild: "Quill's Mirror Market" → THE TWO-ENDED ROD (K.L.5.b, 11
   locales). Design sheet: docs/activities-rebuild/designs/072-opposites.md
   ---------------------------------------------------------------------
   THE INVENTION: every pair of opposites lives on one rod. A word put on
   the rod slides to where its meaning lives: the opposite runs all the
   way to the other end; a middle word (warm, half full) stops at the
   middle groove; a word that means the same parks beside the target; a
   word from another family finds no place and falls off; left and right
   live on the crossing rod. Levels: pictures, same or opposite, pair up,
   sentences (pick a card or write the word), prefix clips (the clip IS
   the rod's far end — the right clip closes on the word and makes its
   opposite; a wrong clip never builds a word).
   No DOM. UMD: window.OppositesRodCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.OppositesRodCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /*DATA-BEGIN*/
  var LEVELS = ["pictures","same","pairs","sentences","prefixes"];
  /* every picture-able word: a library picture with a look (big / small / medium ball; full / half / empty jar; open / closed door;
     lamp on / off; the warm thermometer) or a drawn mark (colour swatch, arrow) */
  var WORDS = {"black":{"mark":"swatch","c":"#262626"},"white":{"mark":"swatch","c":"#FFFFFF"},"red":{"mark":"swatch","c":"#E23B2E"},"up":{"mark":"arrow","d":"up"},"down":{"mark":"arrow","d":"down"},"left":{"mark":"arrow","d":"left"},"big":{"pic":"toys/ball","look":"big"},"small":{"pic":"toys/ball","look":"small"},"medium":{"pic":"toys/ball","look":"medium"},"hot":{"pic":"weather/hot"},"cold":{"pic":"weather/cold"},"warm":{"pic":"weather/thermometer","look":"warm"},"happy":{"pic":"emotions/happy"},"sad":{"pic":"emotions/sad"},"glad":{"pic":"emotions/content"},"day":{"pic":"beach/sun"},"night":{"pic":"space/moon"},"rainbow":{"pic":"weather/rainbow"},"full":{"pic":"kitchen tools/jar","look":"full"},"empty":{"pic":"kitchen tools/jar","look":"empty"},"half":{"pic":"kitchen tools/jar","look":"half"},"open":{"pic":"around the house/door","look":"open"},"closed":{"pic":"around the house/door","look":"closed"},"on":{"pic":"around the house/lamp","look":"on"},"off":{"pic":"around the house/lamp","look":"off"},"upset":{},"push":{},"pull":{},"lift":{}};
  var ROD = {"grey":{"grad":false,"paint":"grey"},"upright":{"grad":false,"vertical":true,"paint":"brass"},"size":{"grad":true,"paint":"taper"},"temp":{"grad":true,"paint":"temp"},"feeling":{"grad":true,"paint":"cream"},"sky":{"grad":false,"paint":"sky"},"fill":{"grad":true,"paint":"tube"},"switch":{"grad":false,"paint":"switch"},"plain":{"grad":false,"paint":"brass"}};
  /* pictures: the target, its opposite (home 'far'), a near-miss with what the rod does to it, an unrelated card ('off') */
  var L1 = [{"id":"black","rod":"grey","target":"black","opp":"white","near":["red","off"],"unrel":"up"},{"id":"up","rod":"upright","target":"up","opp":"down","near":["left","cross"],"unrel":"black"},{"id":"big","rod":"size","target":"big","opp":"small","near":["medium","mid"],"unrel":"happy"},{"id":"hot","rod":"temp","target":"hot","opp":"cold","near":["warm","mid"],"unrel":"big"},{"id":"happy","rod":"feeling","target":"happy","opp":"sad","near":["glad","same"],"unrel":"white"},{"id":"day","rod":"sky","target":"day","opp":"night","near":["rainbow","off"],"unrel":"full"},{"id":"full","rod":"fill","target":"full","opp":"empty","near":["half","mid"],"unrel":"up"},{"id":"open","rod":"switch","target":"open","opp":"closed","near":["on","off"],"unrel":"white"},{"id":"on","rod":"switch","target":"on","opp":"off","near":["open","off"],"unrel":"small"}];
  var SCENE = [["day","night"],["on","off"],["open","closed"]];
  /* sentences: the word on the rod, the answer at the far end, the near-miss, an unrelated card (the sentence is per locale) */
  var L3 = [{"first":"full","ans":"empty","near":["half","mid"],"unrel":"red","rod":"fill"},{"first":"open","ans":"closed","near":["on","off"],"unrel":"big","rod":"switch"},{"first":"on","ans":"off","near":["open","off"],"unrel":"white","rod":"switch"},{"first":"big","ans":"small","near":["medium","mid"],"unrel":"happy","rod":"size"},{"first":"up","ans":"down","near":["left","cross"],"unrel":"black","rod":"upright"},{"first":"day","ans":"night","near":["rainbow","off"],"unrel":"full","rod":"sky"},{"first":"hot","ans":"cold","near":["warm","mid"],"unrel":"big","rod":"temp"},{"first":"sad","ans":"happy","near":["upset","same"],"unrel":"black","rod":"feeling"},{"first":"push","ans":"pull","near":["lift","off"],"unrel":"red","rod":"plain"}];
  /* per locale: w = card words; l3 = sentences; same = [target, same-end words, other-end words, words that fit nowhere]; pairs = three
     pairs per round; flip = three clips and nine [base, right clip, the word it makes]; meaning = re / pre / mis rounds (en) or null
     (a recorded refusal: no transparent K-2 set in the language) */
  var TEXT = {
    en: {"w":{"black":"black","white":"white","red":"red","up":"up","down":"down","left":"left","big":"big","small":"small","medium":"medium","hot":"hot","cold":"cold","warm":"warm","happy":"happy","sad":"sad","glad":"glad","day":"day","night":"night","rainbow":"rainbow","full":"full","empty":"empty","half":"half full","open":"open","closed":"closed","on":"on","off":"off","upset":"upset","push":"push","pull":"pull","lift":"lift"},"l3":["The jar is full. Now it is ___.","The door was open. Now it is ___.","The lamp is on. Now it is ___.","This ball is big. That ball is ___.","The kite goes up. Then it comes ___.","It is day. Soon it will be ___.","Soup is hot. Ice cream is ___.","I was sad. Now I am ___.","Push the door to go in. ___ it to go out."],"same":[["big",["huge","large"],["small","tiny"],[]],["happy",["glad"],["sad","upset","grumpy"],[]],["fast",["quick","speedy"],["slow"],[]],["loud",["noisy"],["quiet","silent","soft"],[]],["hot",["boiling"],["cold","chilly","icy"],[]],["start",["begin"],["stop","finish","end"],[]],["wet",["soaked","soggy"],["dry"],[]],["open",[],["shut","closed"],["red"]]],"pairs":[[["big","small"],["up","down"],["happy","sad"]],[["full","empty"],["fast","slow"],["loud","quiet"]],[["open","closed"],["wet","dry"],["day","night"]],[["hot","cold"],["in","out"],["push","pull"]],[["tall","short"],["on","off"],["old","new"]],[["black","white"],["near","far"],["first","last"]],[["start","stop"],["light","dark"],["front","back"]]],"flip":{"clips":[["un","front"],["dis","front"],["in/im","front"]],"rounds":[["happy",0,"unhappy"],["kind",0,"unkind"],["lock",0,"unlock"],["tie",0,"untie"],["agree",1,"disagree"],["obey",1,"disobey"],["appear",1,"disappear"],["correct",2,"incorrect"],["possible",2,"impossible"]]},"meaning":{"clips":[["re","front"],["pre","front"],["mis","front"]],"gloss":["again","before","wrongly"],"rounds":[["Mia read the story again. She ___ it.","read",0,"reread"],["Heat the oven before you bake. ___ it.","heat",1,"preheat"],["Tom wrote cat as kat. He ___ it.","spelled",2,"misspelled"],["The cup is empty. ___ it, please.","fill",0,"refill"],["Before we read, we look at the pictures. We ___ the book.","view",1,"preview"],["I heard you wrong. I ___ you.","heard",2,"misheard"],["The tower fell down. Let's ___ it.","build",0,"rebuild"],["Before kindergarten, Sam went to ___.","school",1,"preschool"],["He read cat as cot. He ___ the word.","read",2,"misread"]]}},
    de: {"w":{"black":"schwarz","white":"weiß","red":"rot","up":"oben","down":"unten","left":"links","big":"groß","small":"klein","medium":"mittelgroß","hot":"heiß","cold":"kalt","warm":"warm","happy":"fröhlich","sad":"traurig","glad":"froh","day":"Tag","night":"Nacht","rainbow":"Regenbogen","full":"voll","empty":"leer","half":"halb voll","open":"offen","closed":"zu","on":"an","off":"aus","upset":"betrübt","push":"drücken","pull":"ziehen","lift":"heben"},"l3":["Das Glas ist voll. Jetzt ist es ___.","Die Tür war offen. Jetzt ist sie ___.","Die Lampe ist an. Jetzt ist sie ___.","Dieser Ball ist groß. Der andere Ball ist ___.","Der Drachen steigt nach oben. Dann kommt er nach ___.","Es ist Tag. Bald ist es ___.","Die Suppe ist heiß. Das Eis ist ___.","Ich war traurig. Jetzt bin ich ___.","Zum Hineingehen musst du die Tür drücken. Zum Hinausgehen musst du sie ___."],"same":[["groß",["riesig","gewaltig"],["klein","winzig"],[]],["fröhlich",["froh"],["traurig","betrübt","mürrisch"],[]],["schnell",["flink","rasch"],["langsam"],[]],["laut",["lautstark"],["leise","still","ruhig"],[]],["heiß",["glühend heiß"],["kalt","kühl","eisig"],[]],["anfangen",["beginnen"],["aufhören","beenden","stoppen"],[]],["nass",["klatschnass","durchnässt"],["trocken"],[]],["offen",[],["zu","geschlossen"],["rot"]]],"pairs":[[["groß","klein"],["oben","unten"],["fröhlich","traurig"]],[["voll","leer"],["schnell","langsam"],["laut","leise"]],[["offen","zu"],["nass","trocken"],["Tag","Nacht"]],[["heiß","kalt"],["innen","außen"],["drücken","ziehen"]],[["hoch","niedrig"],["an","aus"],["alt","neu"]],[["schwarz","weiß"],["nah","fern"],["erster","letzter"]],[["anfangen","aufhören"],["hell","dunkel"],["vorne","hinten"]]],"flip":{"clips":[["un","front"],["miss","front"],["ent","front"]],"rounds":[["glücklich",0,"unglücklich"],["freundlich",0,"unfreundlich"],["gesund",0,"ungesund"],["ordentlich",0,"unordentlich"],["sicher",0,"unsicher"],["trauen",1,"misstrauen"],["Erfolg",1,"Misserfolg"],["sperren",2,"entsperren"],["laden",2,"entladen"]]},"meaning":null},
    nl: {"w":{"black":"zwart","white":"wit","red":"rood","up":"omhoog","down":"omlaag","left":"links","big":"groot","small":"klein","medium":"middelgroot","hot":"heet","cold":"koud","warm":"warm","happy":"blij","sad":"verdrietig","glad":"vrolijk","day":"dag","night":"nacht","rainbow":"regenboog","full":"vol","empty":"leeg","half":"half vol","open":"open","closed":"dicht","on":"aan","off":"uit","upset":"bedroefd","push":"duwen","pull":"trekken","lift":"tillen"},"l3":["De pot is vol. Nu is hij ___.","De deur was open. Nu is hij ___.","De lamp is aan. Nu is hij ___.","Deze bal is groot. Die bal is ___.","De vlieger gaat omhoog. Dan komt hij weer ___.","Het is dag. Straks is het ___.","De soep is heet. Het ijsje is ___.","Ik was verdrietig. Nu ben ik ___.","Om naar binnen te gaan moet je duwen. Om naar buiten te gaan moet je ___."],"same":[["groot",["reusachtig","enorm"],["klein","piepklein"],[]],["blij",["vrolijk"],["verdrietig","bedroefd","chagrijnig"],[]],["snel",["vlug","rap"],["langzaam"],[]],["luid",["lawaaierig"],["stil","zacht","rustig"],[]],["heet",["kokend"],["koud","fris","ijskoud"],[]],["beginnen",["starten"],["stoppen","eindigen","ophouden"],[]],["nat",["doornat","kletsnat"],["droog"],[]],["open",[],["dicht","gesloten"],["rood"]]],"pairs":[[["groot","klein"],["omhoog","omlaag"],["blij","verdrietig"]],[["vol","leeg"],["snel","langzaam"],["luid","stil"]],[["open","dicht"],["nat","droog"],["dag","nacht"]],[["heet","koud"],["binnen","buiten"],["duwen","trekken"]],[["hoog","laag"],["aan","uit"],["oud","nieuw"]],[["zwart","wit"],["dichtbij","ver"],["eerste","laatste"]],[["beginnen","stoppen"],["licht","donker"],["voor","achter"]]],"flip":{"clips":[["on","front"],["ont","front"],["mis","front"]],"rounds":[["gelukkig",0,"ongelukkig"],["aardig",0,"onaardig"],["gezond",0,"ongezond"],["eerlijk",0,"oneerlijk"],["zeker",0,"onzeker"],["bekend",0,"onbekend"],["kleden",1,"ontkleden"],["koppelen",1,"ontkoppelen"],["lukken",2,"mislukken"]]},"meaning":null},
    da: {"w":{"black":"sort","white":"hvid","red":"rød","up":"op","down":"ned","left":"venstre","big":"stor","small":"lille","medium":"mellemstor","hot":"varm","cold":"kold","warm":"lun","happy":"glad","sad":"ked af det","glad":"tilfreds","day":"dag","night":"nat","rainbow":"regnbue","full":"fuld","empty":"tom","half":"halvfuld","open":"åben","closed":"lukket","on":"tændt","off":"slukket","upset":"trist","push":"skubbe","pull":"trække","lift":"løfte"},"l3":["Krukken er fuld. Nu er den ___.","Døren var åben. Nu er den ___.","Lampen er tændt. Nu er den ___.","Den her bold er stor. Den anden bold er ___.","Dragen flyver op. Så kommer den ___ igen.","Det er dag. Snart bliver det ___.","Suppen er varm. Isen er ___.","Jeg var ked af det. Nu er jeg ___.","Man skal skubbe døren for at gå ind. Man skal ___ i den for at gå ud."],"same":[["stor",["kæmpestor","enorm"],["lille","lillebitte"],[]],["glad",["munter"],["ked af det","trist","sur"],[]],["hurtig",["rap","kvik"],["langsom"],[]],["larmende",["støjende"],["stille","lydløs","dæmpet"],[]],["varm",["kogende"],["kold","kølig","iskold"],[]],["begynde",["starte"],["stoppe","slutte","holde op"],[]],["våd",["gennemblødt","plaskvåd"],["tør"],[]],["åben",[],["lukket"],["rød"]]],"pairs":[[["stor","lille"],["op","ned"],["glad","ked af det"]],[["fuld","tom"],["hurtig","langsom"],["larmende","stille"]],[["åben","lukket"],["våd","tør"],["dag","nat"]],[["varm","kold"],["ind","ud"],["skubbe","trække"]],[["høj","lav"],["tændt","slukket"],["gammel","ny"]],[["sort","hvid"],["nær","fjern"],["først","sidst"]],[["begynde","stoppe"],["lys","mørk"],["foran","bagved"]]],"flip":{"clips":[["u","front"],["mis","front"],["be","front"]],"rounds":[["lykkelig",0,"ulykkelig"],["venlig",0,"uvenlig"],["sund",0,"usund"],["ærlig",0,"uærlig"],["sikker",0,"usikker"],["mulig",0,"umulig"],["tilfreds",0,"utilfreds"],["lykkes",1,"mislykkes"],["trives",1,"mistrives"]]},"meaning":null},
    sv: {"w":{"black":"svart","white":"vit","red":"röd","up":"upp","down":"ner","left":"vänster","big":"stor","small":"liten","medium":"mellanstor","hot":"varm","cold":"kall","warm":"ljummen","happy":"glad","sad":"ledsen","glad":"nöjd","day":"dag","night":"natt","rainbow":"regnbåge","full":"full","empty":"tom","half":"halvfull","open":"öppen","closed":"stängd","on":"tänd","off":"släckt","upset":"nedstämd","push":"trycka","pull":"dra","lift":"lyfta"},"l3":["Burken är full. Nu är den ___.","Dörren var öppen. Nu är den ___.","Lampan är tänd. Nu är den ___.","Den här bollen är stor. Den där bollen är ___.","Draken åker upp. Sedan kommer den ___ igen.","Det är dag. Snart blir det ___.","Soppan är varm. Glassen är ___.","Jag var ledsen. Nu är jag ___.","Du ska trycka på dörren för att gå in. Du ska ___ i den för att gå ut."],"same":[["stor",["jättestor","enorm"],["liten","pytteliten"],[]],["glad",["munter"],["ledsen","nedstämd","sur"],[]],["snabb",["kvick","rapp"],["långsam"],[]],["högljudd",["bullrig"],["tyst","ljudlös","dämpad"],[]],["varm",["kokhet"],["kall","kylig","iskall"],[]],["börja",["starta"],["sluta","avsluta","stoppa"],[]],["blöt",["genomblöt","dyblöt"],["torr"],[]],["öppen",[],["stängd"],["röd"]]],"pairs":[[["stor","liten"],["upp","ner"],["glad","ledsen"]],[["full","tom"],["snabb","långsam"],["högljudd","tyst"]],[["öppen","stängd"],["blöt","torr"],["dag","natt"]],[["varm","kall"],["in","ut"],["trycka","dra"]],[["hög","låg"],["tänd","släckt"],["gammal","ny"]],[["svart","vit"],["nära","långt borta"],["först","sist"]],[["börja","sluta"],["ljus","mörk"],["fram","bak"]]],"flip":{"clips":[["o","front"],["miss","front"],["van","front"]],"rounds":[["lycklig",0,"olycklig"],["vänlig",0,"ovänlig"],["trygg",0,"otrygg"],["ärlig",0,"oärlig"],["säker",0,"osäker"],["möjlig",0,"omöjlig"],["lyckas",1,"misslyckas"],["nöjd",1,"missnöjd"],["trivas",2,"vantrivas"]]},"meaning":null},
    no: {"w":{"black":"svart","white":"hvit","red":"rød","up":"opp","down":"ned","left":"venstre","big":"stor","small":"liten","medium":"middels stor","hot":"varm","cold":"kald","warm":"lunken","happy":"glad","sad":"lei seg","glad":"fornøyd","day":"dag","night":"natt","rainbow":"regnbue","full":"full","empty":"tom","half":"halvfull","open":"åpen","closed":"lukket","on":"på","off":"av","upset":"trist","push":"dytte","pull":"dra","lift":"løfte"},"l3":["Krukka er full. Nå er den ___.","Døra var åpen. Nå er den ___.","Lampa er på. Nå er den ___.","Denne ballen er stor. Den andre ballen er ___.","Dragen flyr opp. Så kommer den ___ igjen.","Det er dag. Snart blir det ___.","Suppa er varm. Isen er ___.","Jeg var lei meg. Nå er jeg ___.","Du må dytte døra for å gå inn. Du må ___ i den for å gå ut."],"same":[["stor",["kjempestor","enorm"],["liten","bitteliten"],[]],["glad",["munter"],["lei seg","trist","sur"],[]],["rask",["kjapp","kvikk"],["langsom"],[]],["bråkete",["støyende"],["stille","lydløs","dempet"],[]],["varm",["kokende"],["kald","kjølig","iskald"],[]],["begynne",["starte"],["stoppe","slutte","avslutte"],[]],["våt",["gjennomvåt","klissvåt"],["tørr"],[]],["åpen",[],["lukket","stengt"],["rød"]]],"pairs":[[["stor","liten"],["opp","ned"],["glad","lei seg"]],[["full","tom"],["rask","langsom"],["bråkete","stille"]],[["åpen","lukket"],["våt","tørr"],["dag","natt"]],[["varm","kald"],["inn","ut"],["dytte","dra"]],[["høy","lav"],["på","av"],["gammel","ny"]],[["svart","hvit"],["nær","fjern"],["først","sist"]],[["begynne","stoppe"],["lys","mørk"],["foran","bak"]]],"flip":{"clips":[["u","front"],["mis","front"],["be","front"]],"rounds":[["lykkelig",0,"ulykkelig"],["vennlig",0,"uvennlig"],["sunn",0,"usunn"],["ærlig",0,"uærlig"],["sikker",0,"usikker"],["mulig",0,"umulig"],["trygg",0,"utrygg"],["lykkes",1,"mislykkes"],["trives",1,"mistrives"]]},"meaning":null},
    es: {"w":{"black":"negro","white":"blanco","red":"rojo","up":"arriba","down":"abajo","left":"izquierda","big":"grande","small":"pequeña","medium":"mediana","hot":"caliente","cold":"frío","warm":"tibio","happy":"feliz","sad":"triste","glad":"contento","day":"día","night":"noche","rainbow":"arcoíris","full":"lleno","empty":"vacío","half":"medio lleno","open":"abierta","closed":"cerrada","on":"encendida","off":"apagada","upset":"desanimado","push":"empujar","pull":"jalar","lift":"levantar"},"l3":["El frasco está lleno. Ahora está ___.","La puerta estaba abierta. Ahora está ___.","La lámpara está encendida. Ahora está ___.","Esta pelota es grande. Esa pelota es ___.","El papalote se va para arriba. Luego regresa para ___.","Es de día. Pronto será de ___.","La sopa está caliente. El helado está ___.","Estaba triste. Ahora estoy ___.","Para entrar, hay que empujar la puerta. Para salir, hay que ___."],"same":[["grande",["enorme","gigante"],["pequeño","chiquito"],[]],["feliz",["contento"],["triste","desanimado","gruñón"],[]],["rápido",["veloz","rapidísimo"],["lento"],[]],["ruidoso",["escandaloso"],["callado","silencioso","tranquilo"],[]],["caliente",["hirviendo"],["frío","fresco","helado"],[]],["empezar",["comenzar"],["terminar","parar","acabar"],[]],["mojado",["empapado","ensopado"],["seco"],[]],["abierto",[],["cerrado"],["rojo"]]],"pairs":[[["grande","pequeño"],["arriba","abajo"],["feliz","triste"]],[["lleno","vacío"],["rápido","lento"],["ruidoso","callado"]],[["abierto","cerrado"],["mojado","seco"],["día","noche"]],[["caliente","frío"],["adentro","afuera"],["empujar","jalar"]],[["alto","bajo"],["encendido","apagado"],["viejo","nuevo"]],[["negro","blanco"],["cerca","lejos"],["primero","último"]],[["empezar","terminar"],["claro","oscuro"],["adelante","atrás"]]],"flip":{"clips":[["in","front"],["des","front"],["pre","front"]],"rounds":[["feliz",0,"infeliz"],["útil",0,"inútil"],["justo",0,"injusto"],["cómodo",0,"incómodo"],["hacer",1,"deshacer"],["atar",1,"desatar"],["abrochar",1,"desabrochar"],["conocido",1,"desconocido"],["tapar",1,"destapar"]]},"meaning":null},
    it: {"w":{"black":"nero","white":"bianco","red":"rosso","up":"su","down":"giù","left":"sinistra","big":"grande","small":"piccola","medium":"media","hot":"caldo","cold":"freddo","warm":"tiepido","happy":"felice","sad":"triste","glad":"contento","day":"giorno","night":"notte","rainbow":"arcobaleno","full":"pieno","empty":"vuoto","half":"mezzo pieno","open":"aperta","closed":"chiusa","on":"accesa","off":"spenta","upset":"giù di morale","push":"spingere","pull":"tirare","lift":"sollevare"},"l3":["Il barattolo è pieno. Ora è ___.","La porta era aperta. Ora è ___.","La lampada è accesa. Ora è ___.","Questa palla è grande. Quella palla è ___.","L’aquilone va su. Poi torna ___.","È giorno. Presto sarà ___.","La minestra è calda. Il gelato è ___.","Ero triste. Ora sono ___.","Per entrare devi spingere la porta. Per uscire devi ___."],"same":[["grande",["enorme","gigante"],["piccolo","minuscolo"],[]],["felice",["contento"],["triste","giù di morale","imbronciato"],[]],["veloce",["rapido","svelto"],["lento"],[]],["rumoroso",["chiassoso"],["silenzioso","zitto","tranquillo"],[]],["caldo",["bollente"],["freddo","fresco","ghiacciato"],[]],["iniziare",["cominciare"],["finire","terminare","smettere"],[]],["bagnato",["fradicio","zuppo"],["asciutto"],[]],["aperto",[],["chiuso"],["rosso"]]],"pairs":[[["grande","piccolo"],["su","giù"],["felice","triste"]],[["pieno","vuoto"],["veloce","lento"],["rumoroso","silenzioso"]],[["aperto","chiuso"],["bagnato","asciutto"],["giorno","notte"]],[["caldo","freddo"],["dentro","fuori"],["spingere","tirare"]],[["alto","basso"],["acceso","spento"],["vecchio","nuovo"]],[["nero","bianco"],["vicino","lontano"],["primo","ultimo"]],[["iniziare","finire"],["chiaro","scuro"],["davanti","dietro"]]],"flip":{"clips":[["in/im","front"],["s","front"],["dis","front"]],"rounds":[["felice",0,"infelice"],["certo",0,"incerto"],["giusto",0,"ingiusto"],["possibile",0,"impossibile"],["contento",1,"scontento"],["cortese",1,"scortese"],["gonfiare",1,"sgonfiare"],["onesto",2,"disonesto"],["ubbidiente",2,"disubbidiente"]]},"meaning":null},
    pt: {"w":{"black":"preto","white":"branco","red":"vermelho","up":"em cima","down":"embaixo","left":"esquerda","big":"grande","small":"pequena","medium":"média","hot":"quente","cold":"frio","warm":"morno","happy":"feliz","sad":"triste","glad":"contente","day":"dia","night":"noite","rainbow":"arco-íris","full":"cheio","empty":"vazio","half":"meio cheio","open":"aberta","closed":"fechada","on":"ligado","off":"desligado","upset":"chateado","push":"empurrar","pull":"puxar","lift":"levantar"},"l3":["O pote está cheio. Agora está ___.","A porta estava aberta. Agora está ___.","O abajur está ligado. Agora está ___.","Esta bola é grande. Aquela bola é ___.","A pipa está lá em cima. A bola está lá ___.","É dia. Logo vai ser ___.","A sopa está quente. O sorvete está ___.","Eu estava triste. Agora estou ___.","Para entrar, é preciso empurrar a porta. Para sair, é preciso ___."],"same":[["grande",["enorme","gigante"],["pequeno","pequenininho"],[]],["feliz",["contente"],["triste","chateado","emburrado"],[]],["rápido",["veloz","ligeiro"],["lento"],[]],["barulhento",["ruidoso"],["quieto","silencioso","calmo"],[]],["quente",["fervendo"],["frio","fresco","gelado"],[]],["começar",["iniciar"],["parar","terminar","acabar"],[]],["molhado",["encharcado","ensopado"],["seco"],[]],["aberto",[],["fechado"],["vermelho"]]],"pairs":[[["grande","pequeno"],["em cima","embaixo"],["feliz","triste"]],[["cheio","vazio"],["rápido","lento"],["barulhento","quieto"]],[["aberto","fechado"],["molhado","seco"],["dia","noite"]],[["quente","frio"],["dentro","fora"],["empurrar","puxar"]],[["alto","baixo"],["ligado","desligado"],["velho","novo"]],[["preto","branco"],["perto","longe"],["primeiro","último"]],[["começar","parar"],["claro","escuro"],["na frente","atrás"]]],"flip":{"clips":[["in","front"],["des","front"],["pre","front"]],"rounds":[["feliz",0,"infeliz"],["útil",0,"inútil"],["justo",0,"injusto"],["capaz",0,"incapaz"],["abotoar",1,"desabotoar"],["amarrar",1,"desamarrar"],["ligar",1,"desligar"],["montar",1,"desmontar"],["arrumado",1,"desarrumado"]]},"meaning":null},
    fr: {"w":{"black":"noir","white":"blanc","red":"rouge","up":"en haut","down":"en bas","left":"à gauche","big":"grand","small":"petit","medium":"moyen","hot":"chaud","cold":"froid","warm":"tiède","happy":"joyeux","sad":"triste","glad":"content","day":"jour","night":"nuit","rainbow":"arc-en-ciel","full":"plein","empty":"vide","half":"à moitié plein","open":"ouverte","closed":"fermée","on":"allumée","off":"éteinte","upset":"déçu","push":"pousser","pull":"tirer","lift":"soulever"},"l3":["Le bocal est plein. Maintenant il est ___.","La porte était ouverte. Maintenant elle est ___.","La lampe est allumée. Maintenant elle est ___.","Ce ballon-ci est grand. Ce ballon-là est ___.","Le cerf-volant monte tout en haut. Puis il redescend tout ___.","Il fait jour. Bientôt, il fera ___.","Le thé est chaud. Le jus glacé est ___.","Le bébé était triste. Maintenant il est ___.","Pour entrer, il faut pousser la porte. Pour sortir, il faut la ___."],"same":[["grand",["énorme","immense"],["petit","minuscule"],[]],["joyeux",["content"],["triste","déçu","grognon"],[]],["rapide",["vif","très rapide"],["lent"],[]],["bruyant",["tapageur"],["silencieux","calme","tranquille"],[]],["chaud",["brûlant"],["froid","frais","glacé"],[]],["commencer",["débuter"],["arrêter","finir","terminer"],[]],["mouillé",["trempé"],["sec"],[]],["ouvert",[],["fermé"],["rouge"]]],"pairs":[[["grand","petit"],["en haut","en bas"],["joyeux","triste"]],[["plein","vide"],["rapide","lent"],["bruyant","silencieux"]],[["ouvert","fermé"],["mouillé","sec"],["jour","nuit"]],[["chaud","froid"],["dedans","dehors"],["pousser","tirer"]],[["haut","bas"],["allumé","éteint"],["vieux","neuf"]],[["noir","blanc"],["près","loin"],["premier","dernier"]],[["commencer","arrêter"],["clair","sombre"],["devant","derrière"]]],"flip":{"clips":[["in/im","front"],["dé","front"],["mal","front"]],"rounds":[["juste",0,"injuste"],["possible",0,"impossible"],["connu",0,"inconnu"],["boutonner",1,"déboutonner"],["plier",1,"déplier"],["coller",1,"décoller"],["heureux",2,"malheureux"],["adroit",2,"maladroit"],["chanceux",2,"malchanceux"]]},"meaning":null},
    fi: {"w":{"black":"musta","white":"valkoinen","red":"punainen","up":"ylös","down":"alas","left":"vasemmalle","big":"iso","small":"pieni","medium":"keskikokoinen","hot":"kuuma","cold":"kylmä","warm":"lämmin","happy":"iloinen","sad":"surullinen","glad":"tyytyväinen","day":"päivä","night":"yö","rainbow":"sateenkaari","full":"täynnä","empty":"tyhjä","half":"puolillaan","open":"auki","closed":"kiinni","on":"päällä","off":"pois päältä","upset":"allapäin","push":"työntää","pull":"vetää","lift":"nostaa"},"l3":["Purkki on täynnä. Nyt se on ___.","Ovi oli auki. Nyt se on ___.","Lamppu on päällä. Nyt se on ___.","Tämä pallo on iso. Tuo pallo on ___.","Leija nousee ylös. Sitten se tulee ___.","Nyt on päivä. Pian on ___.","Keitto on kuuma. Jäätelö on ___.","Olin surullinen. Nyt olen ___.","Sisään mennessä ovea pitää työntää. Ulos mennessä sitä pitää ___."],"same":[["iso",["suuri","valtava"],["pieni","pikkuruinen"],[]],["iloinen",["hyväntuulinen"],["surullinen","allapäin","äreä"],[]],["nopea",["vikkelä","ripeä"],["hidas"],[]],["äänekäs",["meluisa"],["hiljainen","äänetön","vaimea"],[]],["kuuma",["tulikuuma"],["kylmä","viileä","jääkylmä"],[]],["aloittaa",["käynnistää"],["lopettaa","päättää","pysäyttää"],[]],["märkä",["likomärkä","läpimärkä"],["kuiva"],[]],["auki",[],["kiinni","suljettu"],["punainen"]]],"pairs":[[["iso","pieni"],["ylös","alas"],["iloinen","surullinen"]],[["täynnä","tyhjä"],["nopea","hidas"],["äänekäs","hiljainen"]],[["auki","kiinni"],["märkä","kuiva"],["päivä","yö"]],[["kuuma","kylmä"],["sisään","ulos"],["työntää","vetää"]],[["pitkä","lyhyt"],["päällä","pois päältä"],["vanha","uusi"]],[["musta","valkoinen"],["lähellä","kaukana"],["ensimmäinen","viimeinen"]],[["aloittaa","lopettaa"],["valoisa","pimeä"],["edessä","takana"]]],"flip":{"clips":[["epä-","front"],["-ton/-tön","back"],["esi-","front"]],"rounds":[["reilu",0,"epäreilu"],["varma",0,"epävarma"],["selvä",0,"epäselvä"],["siisti",0,"epäsiisti"],["mukava",0,"epämukava"],["kohtelias",0,"epäkohtelias"],["onnellinen",1,"onneton"],["vaarallinen",1,"vaaraton"],["virheellinen",1,"virheetön"]]},"meaning":null}
  };
  var LABELS = {"around the house/door":{"en":"Door","de":"Tür","nl":"Deur","da":"Dør","sv":"Dörr","no":"Dør","es":"Puerta","it":"Porta","pt":"Porta","fr":"Porte","fi":"Ovi"},"around the house/lamp":{"en":"Lamp","de":"Lampe","nl":"Lamp","da":"Lampe","sv":"Lampa","no":"Lampe","es":"Lámpara","it":"Lampada","pt":"Luminária","fr":"Lampe","fi":"Lamppu"},"beach/sun":{"en":"Sun","de":"Sonne","nl":"Zon","da":"Sol","sv":"Sol","no":"Sol","es":"Sol","it":"Sole","pt":"Sol","fr":"Soleil","fi":"Aurinko"},"emotions/content":{"en":"Content","de":"Zufrieden","nl":"Tevreden","da":"Tilfreds","sv":"Nöjd","no":"Fornøyd","es":"Contento","it":"Contento","pt":"Contente","fr":"Content","fi":"Tyytyväinen"},"emotions/happy":{"en":"Happy","de":"Glücklich","nl":"Blij","da":"Glad","sv":"Glad","no":"Glad","es":"Feliz","it":"Felice","pt":"Feliz","fr":"Heureux","fi":"Iloinen"},"emotions/sad":{"en":"Sad","de":"Traurig","nl":"Verdrietig","da":"Trist","sv":"Ledsen","no":"Trist","es":"Triste","it":"Triste","pt":"Triste","fr":"Triste","fi":"Surullinen"},"kitchen tools/jar":{"en":"Jar","de":"Glas","nl":"Pot","da":"Krukke","sv":"Burk","no":"Krukke","es":"Frasco","it":"Barattolo","pt":"Pote","fr":"Bocal","fi":"Purkki"},"space/moon":{"en":"Moon","de":"Mond","nl":"Maan","da":"Måne","sv":"Måne","no":"Måne","es":"Luna","it":"Luna","pt":"Lua","fr":"Lune","fi":"Kuu"},"toys/ball":{"en":"Ball","de":"Ball","nl":"Bal","da":"Bold","sv":"Boll","no":"Ball","es":"Pelota","it":"Palla","pt":"Bola","fr":"Ballon","fi":"Pallo"},"weather/cold":{"en":"Cold","de":"Kalt","nl":"Koud","da":"Koldt","sv":"Kallt","no":"Kaldt","es":"Frío","it":"Freddo","pt":"Frio","fr":"Froid","fi":"Kylmä"},"weather/hot":{"en":"Hot","de":"Heiß","nl":"Heet","da":"Varmt","sv":"Varmt","no":"Varmt","es":"Caliente","it":"Caldo","pt":"Quente","fr":"Chaud","fi":"Kuuma"},"weather/rainbow":{"en":"Rainbow","de":"Regenbogen","nl":"Regenboog","da":"Regnbue","sv":"Regnbåge","no":"Regnbue","es":"Arcoíris","it":"Arcobaleno","pt":"Arco-íris","fr":"Arc-en-ciel","fi":"Sateenkaari"},"weather/thermometer":{"en":"Thermometer","de":"Thermometer","nl":"Thermometer","da":"Termometer","sv":"Termometer","no":"Termometer","es":"Termómetro","it":"Termometro","pt":"Termômetro","fr":"Thermomètre","fi":"Lämpömittari"}};
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

  function locale(l) { l = String(l || 'en').slice(0, 2); return TEXT[l] ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(v) >= 0 ? v : 'pictures'; }
  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function norm(s) { return String(s || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase().replace(/ß/g, 'ss'); }
  function card(loc, key, home, id) { var W = WORDS[key] || {}; return { id: id || key, key: key, word: TEXT[loc].w[key], home: home, pic: W.pic || null, look: W.look || null, mark: W.mark || null, c: W.c || null, d: W.d || null }; }

  /* ---------------- the rounds ---------------- */
  function ids(loc, level) {
    loc = locale(loc); level = levelOf(level); var T = TEXT[loc], out = [], i;
    if (level === 'pictures') { L1.forEach(function (r) { out.push('pic.' + r.id); }); out.push('pic.scene'); }
    if (level === 'same') for (i = 0; i < T.same.length; i++) out.push('same.' + i);
    if (level === 'pairs') for (i = 0; i < T.pairs.length; i++) out.push('pairs.' + i);
    if (level === 'sentences') for (i = 0; i < L3.length; i++) out.push('sent.' + i);
    if (level === 'prefixes') { for (i = 0; i < T.flip.rounds.length; i++) out.push('flip.' + i); if (T.meaning) for (i = 0; i < T.meaning.rounds.length; i++) out.push('mean.' + i); }
    return out;
  }
  /* a round, with its basket (or clip hook) in the dealt order: slot = where the right card / clip lies; end = the target's end (L | R) */
  function round(loc, id, slot, end) {
    loc = locale(loc); var T = TEXT[loc], p = id.split('.'), k = p[0], n = p[1], r, i;
    end = end === 'R' ? 'R' : 'L';
    if (k === 'pic' && n === 'scene') return { id: id, loc: loc, kind: 'scene', items: SCENE.map(function (s) { return { a: card(loc, s[0], 'near'), b: card(loc, s[1], 'far') }; }) };
    if (k === 'pic' || k === 'sent') {
      var S = k === 'pic' ? L1.filter(function (x) { return x.id === n; })[0] : L3[+n], tk = k === 'pic' ? S.target : S.first, fk = k === 'pic' ? S.opp : S.ans;
      var rk = S.rod, R0 = ROD[rk], cards = [card(loc, fk, 'far'), card(loc, S.near[0], S.near[1]), card(loc, S.unrel, 'off')];
      var basket = [cards[1], cards[2]], out = [];
      for (i = 0, r = 0; i < 3; i++) out.push(i === (slot | 0) % 3 ? cards[0] : basket[r++]);
      var R = { id: id, loc: loc, kind: 'rod', level: k === 'pic' ? 'pictures' : 'sentences', rod: rk, grad: R0.grad, vertical: !!R0.vertical, paint: R0.paint, end: R0.vertical ? 'L' : end, target: card(loc, tk, 'near'), far: cards[0], cards: out };
      if (k === 'sent') { R.sentence = T.l3[+n]; R.fill = atStart(R.sentence) ? cap(cards[0].word) : cards[0].word; }
      return R;
    }
    if (k === 'same') {
      var Q = T.same[+n], list = [];
      Q[1].forEach(function (w, j) { list.push({ id: 's' + j, word: w, home: 'same' }); });
      Q[2].forEach(function (w, j) { list.push({ id: 'o' + j, word: w, home: 'far' }); });
      Q[3].forEach(function (w, j) { list.push({ id: 'x' + j, word: w, home: 'off' }); });
      return { id: id, loc: loc, kind: 'same', end: end, target: { word: Q[0] }, cards: list };
    }
    if (k === 'pairs') {
      var P = T.pairs[+n], rot = (+n) % 3, cs = [0, 1, 2].map(function (j) { return { id: 'p' + j, word: P[j][1], rod: j }; });
      return { id: id, loc: loc, kind: 'pairs', rods: P.map(function (x) { return { a: x[0], b: x[1] }; }), cards: [cs[rot % 3], cs[(rot + 1) % 3], cs[(rot + 2) % 3]] };
    }
    if (k === 'flip' || k === 'mean') {
      var F = k === 'flip' ? T.flip : T.meaning, Fr = F.rounds[+n], clips = F.clips.map(function (c, j) { return { idx: j, label: c[0], side: c[1], gloss: F.gloss ? F.gloss[j] : null }; });
      var right = k === 'flip' ? Fr[1] : Fr[2], others = clips.filter(function (c) { return c.idx !== right; }), hook = [];
      for (i = 0, r = 0; i < 3; i++) hook.push(i === (slot | 0) % 3 ? clips[right] : others[r++]);
      return k === 'flip'
        ? { id: id, loc: loc, kind: 'flip', end: end, base: Fr[0], right: right, fused: Fr[2], clips: hook }
        : { id: id, loc: loc, kind: 'meaning', end: end, sentence: Fr[0], base: Fr[1], right: right, fused: Fr[3], fill: atStart(Fr[0]) ? cap(Fr[3]) : Fr[3], clips: hook, gloss: F.gloss[right] };
    }
    throw new Error('no round ' + id);
  }
  /* a blank that begins a sentence takes a capital ("… go in. ___ it to go out." → Pull) */
  function atStart(s) { return /(^|[.!?…]\s+)___/.test(s); }
  function cap(s) { s = String(s); return s.charAt(0).toLocaleUpperCase() + s.slice(1); }
  /* a pass: every round once, never the last pass's order, never its last round first */
  function plan(loc, level, rnd, prev) {
    var all = ids(loc, level);
    for (var t = 0; t < 2000; t++) {
      var o = shuffle(all.slice(), rnd);
      if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;
      return o;
    }
    return shuffle(all.slice(), rnd);
  }
  /* the right card's (or clip's) basket slot, a pass long: each of the 3 slots equally often (±1) */
  function slots(rnd, len) { var a = []; for (var i = 0; i < len; i++) a.push(i % 3); return shuffle(a, rnd); }

  /* ---------------- the hand ---------------- */
  function newState(r, rnd) {
    var st = { r: r, kind: r.kind, misses: 0, help: 0, show: false, last: null, done: false };
    if (r.kind === 'rod') { st.parked = {}; st.at = null; }
    if (r.kind === 'scene') st.flipped = [false, false, false];
    if (r.kind === 'same') { st.order = shuffle(r.cards.map(function (c) { return c.id; }), rnd || Math.random); st.ends = {}; }
    if (r.kind === 'pairs') st.filled = [null, null, null];
    if (r.kind === 'flip' || r.kind === 'meaning') st.clip = null;
    return st;
  }
  function cardOf(r, id) { return (r.cards || []).filter(function (c) { return c.id === id; })[0] || null; }
  /* a card dropped on the rod slides to where its meaning lives */
  function drop(st, id) {
    if (st.done || st.kind !== 'rod') return null;
    var c = cardOf(st.r, id); if (!c || st.parked[id]) return null;
    return slide(st, c);
  }
  function slide(st, c) {
    var res = { id: c.id, home: c.home, word: c.word };
    if (c.home === 'far') { st.at = c.id; st.done = true; st.show = false; st.last = { reason: 'right' }; return res; }
    if (c.home === 'mid' || c.home === 'same') st.parked[c.id] = c.home;
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: c.home, word: c.word };
    return res;
  }
  /* write mode: the typed word slides like a card; a word the round does not know shakes (never counted as a miss) */
  function typeWord(st, text) {
    if (st.done || st.kind !== 'rod') return null;
    var t = norm(text); if (!t) { st.show = true; st.last = { reason: 'emptyType' }; return { home: 'empty' }; }
    var c = st.r.cards.filter(function (x) { return norm(x.word) === t; })[0];
    if (c) { if (st.parked[c.id]) return { home: 'already', id: c.id }; return slide(st, c); }
    if (norm(st.r.target.word) === t) { st.show = true; st.last = { reason: 'itself', word: st.r.target.word }; st.misses++; st.help = Math.min(2, st.misses); return { home: 'itself' }; }
    var known = Object.keys(TEXT[st.r.loc].w).some(function (k) { return norm(TEXT[st.r.loc].w[k]) === t; });
    if (known) return slide(st, { id: 'typed', word: text.trim(), home: 'off' });
    st.show = true; st.last = { reason: 'spell' }; return { home: 'unknown' };
  }
  function unpark(st, id) { if (st.done || st.kind !== 'rod' || !st.parked[id]) return false; delete st.parked[id]; st.show = false; return true; }
  function flip(st, i) { if (st.done || st.kind !== 'scene' || st.flipped[i]) return false; st.flipped[i] = true; if (st.flipped.every(Boolean)) { st.done = true; st.last = { reason: 'right' }; } return true; }
  /* same or opposite: put each word at an end, then Check */
  function place(st, id, end) { if (st.done || st.kind !== 'same' || !cardOf(st.r, id)) return false; if (end === 'near' || end === 'far') st.ends[id] = end; else delete st.ends[id]; st.show = false; return true; }
  function checkSame(st) {
    if (st.done || st.kind !== 'same') return { ok: false, reason: 'phase' };
    var r = st.r, placed = Object.keys(st.ends);
    if (!placed.length) { st.show = true; st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }
    var wrong = placed.filter(function (id) { var c = cardOf(r, id); return !((c.home === 'same' && st.ends[id] === 'near') || (c.home === 'far' && st.ends[id] === 'far')); });
    wrong.forEach(function (id) { delete st.ends[id]; });
    var need = r.cards.filter(function (c) { return c.home !== 'off'; }), all = need.every(function (c) { return st.ends[c.id]; });
    if (!wrong.length && all) { st.done = true; st.show = false; st.last = { reason: 'right' }; return { ok: true }; }
    if (!wrong.length) { st.show = true; st.last = { reason: 'more' }; return { ok: false, reason: 'more' }; }
    var off = wrong.filter(function (id) { return cardOf(r, id).home === 'off'; });
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: off.length === wrong.length ? 'sameOff' : 'sameWrong', wrong: wrong };
    return { ok: false, reason: 'wrong', wrong: wrong };
  }
  /* pair up: a card slides home only on its own rod */
  function dropOn(st, id, rod) {
    if (st.done || st.kind !== 'pairs') return null;
    var c = cardOf(st.r, id); if (!c || st.filled.indexOf(id) >= 0 || rod < 0 || rod > 2 || st.filled[rod]) return null;
    if (c.rod === rod) { st.filled[rod] = id; st.show = false; st.last = { reason: 'filled' }; if (st.filled.every(Boolean)) { st.done = true; st.last = { reason: 'right' }; } return { ok: true }; }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: 'pairWrong', word: c.word, rod: rod, home: c.rod };
    return { ok: false };
  }
  /* prefix clips: hang a clip at the far end, then push the base word; only the right clip closes — a wrong one never builds a word */
  function hang(st, slot) { if (st.done || (st.kind !== 'flip' && st.kind !== 'meaning') || slot < 0 || slot > 2) return false; st.clip = slot; st.show = false; return true; }
  function push(st) {
    if (st.done || (st.kind !== 'flip' && st.kind !== 'meaning')) return null;
    if (st.clip === null) { st.show = true; st.last = { reason: 'noClip' }; return { reason: 'noClip' }; }
    var c = st.r.clips[st.clip];
    if (c.idx === st.r.right) { st.done = true; st.show = false; st.last = { reason: 'right' }; return { fused: true, word: st.r.fused }; }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: st.kind === 'flip' ? 'clipWrong' : 'meanWrong', clip: c.label, gloss: c.gloss };
    return { rolledBack: true };
  }
  function hint(st) {
    if (!st.show || !st.last) return null;
    var L = st.last.reason, k = st.kind;
    var map = { empty: 'hEmpty', mid: 'hMid', same: 'hSame', off: 'hOff', cross: 'hCross', itself: 'hItself', spell: 'hSpell', emptyType: 'hType', more: 'hMore', sameWrong: 'hSameWrong', sameOff: 'hSameOff', pairWrong: 'hPairWrong', noClip: 'hNoClip', clipWrong: 'hClipWrong', meanWrong: 'hMeanWrong' };
    var key = map[L] || null;
    if (st.help >= 2 && /^(mid|same|off|cross|itself)$/.test(L)) key = 'hMiss2';
    if (st.help >= 2 && L === 'pairWrong') key = 'hPair2';
    if (st.help >= 2 && L === 'clipWrong') key = 'hClip2';
    if (st.help >= 2 && L === 'meanWrong') key = 'hMean2';
    if (st.help >= 2 && /^same(Wrong|Off)$/.test(L)) key = 'hSame2';
    return key;
  }
  /* the help a second miss gives: the far clip pulses (rod), the right rod glows (pairs), the right clip glints (prefixes) */
  function helpOf(st) {
    if (st.help < 2 || st.done) return null;
    if (st.kind === 'rod') return { far: true };
    if (st.kind === 'pairs' && st.last && st.last.home !== undefined) return { rod: st.last.home };
    if (st.kind === 'flip' || st.kind === 'meaning') { for (var i = 0; i < 3; i++) if (st.r.clips[i].idx === st.r.right) return { clip: i }; }
    return null;
  }
  /* sizes: wide (≥ 560 px of stage) or narrow; pictures never below 96 / 64 */
  function layout(W) {
    var wide = W >= 560, tiny = W < 300;
    return { mode: wide ? 'wide' : 'narrow', W: W, pic: wide ? 96 : 64, cw: wide ? 120 : tiny ? 84 : 96, ch: wide ? 150 : tiny ? 112 : 120, word: wide ? 20 : 16, wcard: wide ? 22 : 17, text: wide ? 22 : 18 };
  }

  return {
    DATA: { WORDS: WORDS, ROD: ROD, L1: L1, SCENE: SCENE, L3: L3, TEXT: TEXT, LABELS: LABELS }, LOCALES: LOCALES, LEVELS: LEVELS,
    locale: locale, levelOf: levelOf, atStart: atStart, seeded: seeded, shuffle: shuffle, norm: norm, ids: ids, round: round, plan: plan, slots: slots,
    newState: newState, cardOf: cardOf, drop: drop, typeWord: typeWord, unpark: unpark, flip: flip, place: place, checkSame: checkSame, dropOn: dropOn, hang: hang, push: push, hint: hint, helpOf: helpOf, layout: layout
  };
}));
