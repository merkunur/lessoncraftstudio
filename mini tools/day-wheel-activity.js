/* =====================================================================
   day-wheel-activity.js — ACTIVITY #158 of the one-by-one rebuild:
   "Sprocket's Clock — A.M. or P.M.?" → THE DAY WHEEL (2.MD.C.7, the
   a.m./p.m. clause; all 11 locales). Model: day-wheel-core.js
   (DayWheelCore). Design: docs/activities-rebuild/designs/158-clock-ampm.md
   ---------------------------------------------------------------------
   The invention: a day wheel geared at HALF speed turns behind the clock
   face, seen through a window at the top. Gold is the lap from midnight
   to noon, violet the lap from noon to midnight; the sun rides the wheel
   at noon, the moon at midnight. Every round starts at midnight. The child
   winds the hour hand round to the card's time — and the same 7 o'clock
   comes round twice: once with gold in the window, once with violet.
   No timer, no score; the event picture seats itself in the window on
   success and Sprocket the rooster bounces.
   Test seams: window.DayWheelActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._wind / ._step / ._check / ._g /
   .FAST / .OK_MS.
   ===================================================================== */
var DayWheelActivity = {
  id: 'day-wheel',
  /* the drawn apparatus (the hierarchy gate): the clock, the wheel, the badge */
  apparatusClasses: ['dw-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Sprocket's Clock","de":"Sprockets Uhr","fr":"L’horloge de Sprocket","es":"El reloj de Sprocket","pt":"O relógio do Sprocket","it":"L’orologio di Sprocket","nl":"De klok van Sprocket","sv":"Sprockets klocka","da":"Sprockets ur","no":"Sprockets klokke","fi":"Sprocketin kello"},
    instruction: {"en":"Every round starts at midnight. Drag the hour hand round the clock: it goes round twice a day, and the day wheel in the window shows which lap you are on, gold before noon and violet after noon. Stop at the card's time in the right lap and press Check.","de":"Jede Aufgabe beginnt um Mitternacht. Zieh den Stundenzeiger um die Uhr: Er geht zweimal am Tag herum, und das Tagesrad im Fenster zeigt, in welcher Runde du bist, goldgelb vor dem Mittag und lila nach dem Mittag. Halte bei der Uhrzeit auf der Karte in der richtigen Runde an und drück auf Prüfen.","fr":"Chaque partie commence à minuit. Fais tourner la petite aiguille autour de l’horloge : elle fait deux tours par jour, et la roue du jour dans la fenêtre montre dans quel tour tu es, jaune avant midi et violette après midi. Arrête-toi à l’heure de la carte, dans le bon tour, puis appuie sur Vérifier.","es":"Cada ronda empieza a la medianoche. Arrastra la manecilla de las horas alrededor del reloj: da dos vueltas al día, y la rueda del día en la ventana muestra en qué vuelta estás, amarilla antes del mediodía y morada después del mediodía. Detente en la hora de la tarjeta, en la vuelta correcta, y presiona Revisar.","pt":"Cada rodada começa à meia-noite. Arraste o ponteiro das horas em volta do relógio: ele dá duas voltas por dia, e a roda do dia na janela mostra em que volta você está, amarela antes do meio-dia e roxa depois do meio-dia. Pare na hora do cartão, na volta certa, e aperte Conferir.","it":"Ogni turno comincia a mezzanotte. Trascina la lancetta delle ore intorno all’orologio: fa due giri al giorno, e la ruota del giorno nella finestra mostra in quale giro sei, gialla prima di mezzogiorno e viola dopo mezzogiorno. Fermati all’ora del cartellino, nel giro giusto, e premi Controlla.","nl":"Elke opdracht begint om middernacht. Sleep de kleine wijzer rond de klok: hij gaat twee keer per dag rond, en het dagwiel in het venster laat zien in welk rondje je bent, geel voor 12 uur ’s middags en paars erna. Stop bij de tijd op de kaart, in het goede rondje, en druk op Controleer.","sv":"Varje runda börjar vid midnatt. Dra timvisaren runt klockan: den går två varv om dagen, och dagshjulet i fönstret visar vilket varv du är på, gult före klockan tolv på dagen och lila efter. Stanna vid tiden på kortet, på rätt varv, och tryck på Kolla.","da":"Hver runde begynder ved midnat. Træk den lille viser rundt om uret: den går to omgange om dagen, og dagshjulet i vinduet viser, hvilken omgang du er på, gult før klokken tolv om dagen og lilla efter. Stop ved tiden på kortet i den rigtige omgang, og tryk på Tjek.","no":"Hver oppgave begynner ved midnatt. Dra timeviseren rundt klokka: den går to runder i døgnet, og dagshjulet i vinduet viser hvilken runde du er på, gult før klokka tolv på dagen og lilla etter. Stopp ved tiden på kortet i riktig runde, og trykk på Sjekk.","fi":"Jokainen tehtävä alkaa keskiyöllä. Vedä tuntiviisaria kellon ympäri: se kiertää kaksi kierrosta vuorokaudessa, ja ikkunan päiväpyörä näyttää, kummalla kierroksella olet: keltainen ennen keskipäivää ja violetti sen jälkeen. Pysähdy kortin aikaan oikealla kierroksella ja paina Tarkista."},
    taskLine: {"en":"Wind the clock from midnight. Stop at the time this happens.","de":"Dreh die Uhr ab Mitternacht. Halte an, wenn das passiert.","fr":"Fais tourner l’horloge depuis minuit. Arrête-toi à l’heure où cela se passe.","es":"Gira el reloj desde la medianoche. Detente a la hora en que pasa esto.","pt":"Gire o relógio a partir da meia-noite. Pare na hora em que isso acontece.","it":"Gira l’orologio da mezzanotte. Fermati all’ora in cui succede.","nl":"Draai de klok vanaf middernacht. Stop op het moment dat dit gebeurt.","sv":"Vrid klockan från midnatt. Stanna när det här händer.","da":"Drej uret fra midnat. Stop, når det her sker.","no":"Vri klokka fra midnatt. Stopp når dette skjer.","fi":"Kierrä kelloa keskiyöstä. Pysähdy, kun tämä tapahtuu."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    s_wake: {"en":"You wake up and get out of bed.","de":"Du wachst auf und stehst auf.","fr":"Tu te réveilles et tu te lèves.","es":"Te despiertas y te levantas.","pt":"Você acorda e sai da cama.","it":"Ti svegli e ti alzi dal letto.","nl":"Je wordt wakker en staat op.","sv":"Du vaknar och kliver upp ur sängen.","da":"Du vågner og står op.","no":"Du våkner og står opp.","fi":"Heräät ja nouset sängystä."},
    s_breakfast: {"en":"You eat breakfast.","de":"Du frühstückst.","fr":"Tu prends le petit-déjeuner.","es":"Desayunas.","pt":"Você toma café da manhã.","it":"Fai colazione.","nl":"Je eet je ontbijt.","sv":"Du äter frukost.","da":"Du spiser morgenmad.","no":"Du spiser frokost.","fi":"Syöt aamupalaa."},
    s_school: {"en":"School starts.","de":"Die Schule beginnt.","fr":"L’école commence.","es":"Entras a la escuela.","pt":"A escola começa.","it":"Comincia la scuola.","nl":"De school begint.","sv":"Skolan börjar.","da":"Skolen begynder.","no":"Skolen begynner.","fi":"Koulu alkaa."},
    s_apple: {"en":"You eat an apple at break time.","de":"Du isst in der Pause einen Apfel.","fr":"Tu manges une pomme à la récréation.","es":"Comes una manzana en el recreo.","pt":"Você come uma maçã no recreio.","it":"Mangi una mela durante la ricreazione.","nl":"Je eet een appel in de pauze.","sv":"Du äter ett äpple på rasten.","da":"Du spiser et æble i frikvarteret.","no":"Du spiser et eple i friminuttet.","fi":"Syöt omenan välitunnilla."},
    s_playground: {"en":"You play on the playground after school.","de":"Nach der Schule spielst du auf dem Spielplatz.","fr":"Après l’école, tu joues au parc.","es":"Después de la escuela juegas en el parque.","pt":"Depois da escola, você brinca no parquinho.","it":"Dopo la scuola giochi al parco giochi.","nl":"Na school speel je in de speeltuin.","sv":"Efter skolan leker du på lekplatsen.","da":"Efter skole leger du på legepladsen.","no":"Etter skolen leker du på lekeplassen.","fi":"Koulun jälkeen leikit leikkipuistossa."},
    s_bike: {"en":"You ride your bike.","de":"Du fährst Fahrrad.","fr":"Tu fais du vélo.","es":"Andas en bicicleta.","pt":"Você anda de bicicleta.","it":"Vai in bicicletta.","nl":"Je fietst.","sv":"Du cyklar.","da":"Du cykler.","no":"Du sykler.","fi":"Pyöräilet."},
    s_dinner: {"en":"You eat dinner.","de":"Du isst zu Abend.","fr":"Tu dînes.","es":"Cenas.","pt":"Você janta.","it":"Ceni.","nl":"Je eet avondeten.","sv":"Du äter middag.","da":"Du spiser aftensmad.","no":"Du spiser middag.","fi":"Syöt päivällistä."},
    s_story: {"en":"You read a bedtime story.","de":"Du liest eine Gutenachtgeschichte.","fr":"Tu lis une histoire du soir.","es":"Lees un cuento antes de dormir.","pt":"Você lê uma história antes de dormir.","it":"Leggi una storia della buonanotte.","nl":"Je leest een verhaaltje voor het slapengaan.","sv":"Du läser en godnattsaga.","da":"Du læser en godnathistorie.","no":"Du leser en godnatthistorie.","fi":"Luet iltasatua."},
    s_bed: {"en":"You go to bed.","de":"Du gehst ins Bett.","fr":"Tu vas au lit.","es":"Te vas a dormir.","pt":"Você vai para a cama.","it":"Vai a letto.","nl":"Je gaat naar bed.","sv":"Du går och lägger dig.","da":"Du går i seng.","no":"Du legger deg.","fi":"Menet nukkumaan."},
    s_brushAm: {"en":"You brush your teeth after breakfast.","de":"Nach dem Frühstück putzt du dir die Zähne.","fr":"Après le petit-déjeuner, tu te brosses les dents.","es":"Después del desayuno te lavas los dientes.","pt":"Depois do café da manhã, você escova os dentes.","it":"Dopo colazione ti lavi i denti.","nl":"Na het ontbijt poets je je tanden.","sv":"Efter frukosten borstar du tänderna.","da":"Efter morgenmaden børster du tænder.","no":"Etter frokost pusser du tennene.","fi":"Aamupalan jälkeen peset hampaat."},
    s_riddleAm: {"en":"Half an hour after midnight.","de":"Eine halbe Stunde nach Mitternacht.","fr":"Une demi-heure après minuit.","es":"Media hora después de la medianoche.","pt":"Meia hora depois da meia-noite.","it":"Mezz’ora dopo mezzanotte.","nl":"Een half uur na middernacht.","sv":"En halvtimme efter midnatt.","da":"En halv time efter midnat.","no":"En halvtime etter midnatt.","fi":"Puoli tuntia keskiyön jälkeen."},
    s_riddlePm: {"en":"Half an hour after noon.","de":"Eine halbe Stunde nach 12 Uhr mittags.","fr":"Une demi-heure après midi.","es":"Media hora después del mediodía.","pt":"Meia hora depois do meio-dia.","it":"Mezz’ora dopo mezzogiorno.","nl":"Een half uur na 12 uur ’s middags.","sv":"En halvtimme efter klockan tolv på dagen.","da":"En halv time efter klokken tolv om dagen.","no":"En halvtime etter klokka tolv på dagen.","fi":"Puoli tuntia keskipäivän jälkeen."},
    s_piano: {"en":"You have a piano lesson after school.","de":"Nach der Schule hast du Klavierunterricht.","fr":"Après l’école, tu as ton cours de piano.","es":"Después de la escuela tienes clase de piano.","pt":"Depois da escola, você tem aula de piano.","it":"Dopo la scuola hai lezione di pianoforte.","nl":"Na school heb je pianoles.","sv":"Efter skolan har du pianolektion.","da":"Efter skole har du klavertime.","no":"Etter skolen har du pianotime.","fi":"Koulun jälkeen sinulla on pianotunti."},
    s_campfire: {"en":"You sit by the campfire.","de":"Du sitzt am Lagerfeuer.","fr":"Tu t’assois près du feu de camp.","es":"Te sientas junto a la fogata.","pt":"Você senta perto da fogueira.","it":"Ti siedi vicino al falò.","nl":"Je zit bij het kampvuur.","sv":"Du sitter vid lägerelden.","da":"Du sidder ved lejrbålet.","no":"Du sitter ved bålet.","fi":"Istut nuotiolla."},
    s_brushPm: {"en":"You brush your teeth before bed.","de":"Vor dem Schlafengehen putzt du dir die Zähne.","fr":"Avant d’aller au lit, tu te brosses les dents.","es":"Antes de dormir te lavas los dientes.","pt":"Antes de dormir, você escova os dentes.","it":"Prima di andare a letto ti lavi i denti.","nl":"Voor het slapengaan poets je je tanden.","sv":"Innan du lägger dig borstar du tänderna.","da":"Før du går i seng, børster du tænder.","no":"Før du legger deg, pusser du tennene.","fi":"Ennen nukkumaanmenoa peset hampaat."},
    ok_wake: {"en":"{say}: you get up in the morning!","de":"{say}: Du stehst am Morgen auf, in der ersten Runde!","fr":"{say} : tu te lèves le matin, au premier tour !","es":"{say}: ¡te levantas en la mañana!","pt":"{say}: você levanta de manhã, na primeira volta!","it":"{say}: ti alzi la mattina, al primo giro!","nl":"{say}: je staat ’s ochtends op, in het eerste rondje!","sv":"{say}: du går upp på morgonen, på första varvet!","da":"{say}: du står op om morgenen, på første omgang!","no":"{say}: du står opp om morgenen, i første runde!","fi":"{say}: heräät aamulla!"},
    ok_breakfast: {"en":"{say}: breakfast is before noon!","de":"{say}: Das Frühstück ist vor dem Mittag, in der ersten Runde!","fr":"{say} : le petit-déjeuner, c’est avant midi !","es":"{say}: ¡el desayuno es antes del mediodía!","pt":"{say}: o café da manhã é antes do meio-dia!","it":"{say}: la colazione è prima di mezzogiorno!","nl":"{say}: het ontbijt is voor 12 uur ’s middags!","sv":"{say}: frukosten är före klockan tolv på dagen!","da":"{say}: morgenmaden er før klokken tolv om dagen!","no":"{say}: frokosten er før klokka tolv på dagen!","fi":"{say}: aamupala on ennen keskipäivää!"},
    ok_school: {"en":"{say}: school starts before noon!","de":"{say}: Die Schule beginnt vor dem Mittag!","fr":"{say} : l’école commence avant midi !","es":"{say}: ¡la escuela empieza antes del mediodía!","pt":"{say}: a escola começa antes do meio-dia!","it":"{say}: la scuola comincia prima di mezzogiorno!","nl":"{say}: de school begint voor 12 uur ’s middags!","sv":"{say}: skolan börjar före klockan tolv på dagen!","da":"{say}: skolen begynder før klokken tolv om dagen!","no":"{say}: skolen begynner før klokka tolv på dagen!","fi":"{say}: koulu alkaa ennen keskipäivää!"},
    ok_apple: {"en":"{say}: break time is still before noon!","de":"{say}: Die Pause ist noch vor dem Mittag!","fr":"{say} : la récréation, c’est encore avant midi !","es":"{say}: ¡el recreo todavía es antes del mediodía!","pt":"{say}: o recreio ainda é antes do meio-dia!","it":"{say}: la ricreazione è ancora prima di mezzogiorno!","nl":"{say}: de pauze is nog voor 12 uur ’s middags!","sv":"{say}: rasten är fortfarande före klockan tolv på dagen!","da":"{say}: frikvarteret er stadig før klokken tolv om dagen!","no":"{say}: friminuttet er fortsatt før klokka tolv på dagen!","fi":"{say}: välitunti on vielä ennen keskipäivää!"},
    ok_playground: {"en":"{say}: after noon, so it's p.m.!","de":"{say}: nach dem Mittag, also in der zweiten Runde!","fr":"{say} : après midi, donc au deuxième tour !","es":"{say}: ¡después del mediodía, así que es p. m.!","pt":"{say}: depois do meio-dia, então é a segunda volta!","it":"{say}: dopo mezzogiorno, quindi al secondo giro!","nl":"{say}: na 12 uur ’s middags, dus in het tweede rondje!","sv":"{say}: efter klockan tolv på dagen, alltså på andra varvet!","da":"{say}: efter klokken tolv om dagen, altså i anden omgang!","no":"{say}: etter klokka tolv på dagen, altså i andre runde!","fi":"{say}: keskipäivän jälkeen, siis ip.!"},
    ok_bike: {"en":"{say}: after noon, so it's p.m.!","de":"{say}: nach dem Mittag, also in der zweiten Runde!","fr":"{say} : après midi, donc au deuxième tour !","es":"{say}: ¡después del mediodía, así que es p. m.!","pt":"{say}: depois do meio-dia, então é a segunda volta!","it":"{say}: dopo mezzogiorno, quindi al secondo giro!","nl":"{say}: na 12 uur ’s middags, dus in het tweede rondje!","sv":"{say}: efter klockan tolv på dagen, alltså på andra varvet!","da":"{say}: efter klokken tolv om dagen, altså i anden omgang!","no":"{say}: etter klokka tolv på dagen, altså i andre runde!","fi":"{say}: keskipäivän jälkeen, siis ip.!"},
    ok_dinner: {"en":"{say}: dinner is after noon!","de":"{say}: Das Abendessen ist nach dem Mittag, in der zweiten Runde!","fr":"{say} : le dîner, c’est après midi !","es":"{say}: ¡la cena es después del mediodía!","pt":"{say}: o jantar é depois do meio-dia!","it":"{say}: la cena è dopo mezzogiorno!","nl":"{say}: het avondeten is na 12 uur ’s middags!","sv":"{say}: middagen är efter klockan tolv på dagen!","da":"{say}: aftensmaden er efter klokken tolv om dagen!","no":"{say}: middagen er etter klokka tolv på dagen!","fi":"{say}: päivällinen on keskipäivän jälkeen!"},
    ok_story: {"en":"{say}: a bedtime story, after noon!","de":"{say}: die Gutenachtgeschichte, nach dem Mittag!","fr":"{say} : l’histoire du soir, après midi !","es":"{say}: ¡el cuento antes de dormir, después del mediodía!","pt":"{say}: a história antes de dormir, depois do meio-dia!","it":"{say}: la storia della buonanotte, dopo mezzogiorno!","nl":"{say}: het verhaaltje voor het slapengaan, na 12 uur ’s middags!","sv":"{say}: godnattsagan, efter klockan tolv på dagen!","da":"{say}: godnathistorien, efter klokken tolv om dagen!","no":"{say}: godnatthistorien, etter klokka tolv på dagen!","fi":"{say}: iltasatu, keskipäivän jälkeen!"},
    ok_bed: {"en":"{say}: bedtime is on the second lap!","de":"{say}: Schlafenszeit ist in der zweiten Runde!","fr":"{say} : l’heure du coucher, c’est au deuxième tour !","es":"{say}: ¡la hora de dormir está en la segunda vuelta!","pt":"{say}: a hora de dormir é na segunda volta!","it":"{say}: l’ora di andare a letto è al secondo giro!","nl":"{say}: bedtijd is in het tweede rondje!","sv":"{say}: läggdags är på andra varvet!","da":"{say}: sengetid er i anden omgang!","no":"{say}: leggetid er i andre runde!","fi":"{say}: nukkumaanmeno on toisella kierroksella!"},
    ok_brushAm: {"en":"{say}: teeth after breakfast, before noon!","de":"{say}: Zähneputzen nach dem Frühstück, vor dem Mittag!","fr":"{say} : les dents après le petit-déjeuner, avant midi !","es":"{say}: ¡los dientes después del desayuno, antes del mediodía!","pt":"{say}: os dentes depois do café da manhã, antes do meio-dia!","it":"{say}: i denti dopo colazione, prima di mezzogiorno!","nl":"{say}: tanden poetsen na het ontbijt, voor 12 uur ’s middags!","sv":"{say}: tänderna efter frukost, före klockan tolv på dagen!","da":"{say}: tænder efter morgenmaden, før klokken tolv om dagen!","no":"{say}: tannpuss etter frokost, før klokka tolv på dagen!","fi":"{say}: hampaat aamupalan jälkeen, ennen keskipäivää!"},
    ok_riddleAm: {"en":"{say}: half an hour after midnight is a.m.!","de":"{say}: Eine halbe Stunde nach Mitternacht ist ganz am Anfang der ersten Runde!","fr":"{say} : une demi-heure après minuit, c’est tout au début du premier tour !","es":"{say}: ¡media hora después de la medianoche es a. m.!","pt":"{say}: meia hora depois da meia-noite é bem no começo da primeira volta!","it":"{say}: mezz’ora dopo mezzanotte è proprio all’inizio del primo giro!","nl":"{say}: een half uur na middernacht is helemaal aan het begin van het eerste rondje!","sv":"{say}: en halvtimme efter midnatt är allra först på första varvet!","da":"{say}: en halv time efter midnat er helt i starten af første omgang!","no":"{say}: en halvtime etter midnatt er helt i starten av første runde!","fi":"{say}: puoli tuntia keskiyön jälkeen on ap.!"},
    ok_riddlePm: {"en":"{say}: half an hour after noon is already p.m.!","de":"{say}: Eine halbe Stunde nach 12 Uhr mittags ist schon die zweite Runde!","fr":"{say} : une demi-heure après midi, c’est déjà le deuxième tour !","es":"{say}: ¡media hora después del mediodía ya es p. m.!","pt":"{say}: meia hora depois do meio-dia já é a segunda volta!","it":"{say}: mezz’ora dopo mezzogiorno è già il secondo giro!","nl":"{say}: een half uur na 12 uur ’s middags is al het tweede rondje!","sv":"{say}: en halvtimme efter klockan tolv på dagen är redan andra varvet!","da":"{say}: en halv time efter klokken tolv om dagen er allerede anden omgang!","no":"{say}: en halvtime etter klokka tolv på dagen er allerede andre runde!","fi":"{say}: puoli tuntia keskipäivän jälkeen on jo ip.!"},
    ok_piano: {"en":"{say}: after school, after noon!","de":"{say}: nach der Schule, nach dem Mittag!","fr":"{say} : après l’école, après midi !","es":"{say}: ¡después de la escuela, después del mediodía!","pt":"{say}: depois da escola, depois do meio-dia!","it":"{say}: dopo la scuola, dopo mezzogiorno!","nl":"{say}: na school, na 12 uur ’s middags!","sv":"{say}: efter skolan, efter klockan tolv på dagen!","da":"{say}: efter skole, efter klokken tolv om dagen!","no":"{say}: etter skolen, etter klokka tolv på dagen!","fi":"{say}: koulun jälkeen, keskipäivän jälkeen!"},
    ok_campfire: {"en":"{say}: the campfire is after noon!","de":"{say}: Das Lagerfeuer ist nach dem Mittag!","fr":"{say} : le feu de camp, c’est après midi !","es":"{say}: ¡la fogata es después del mediodía!","pt":"{say}: a fogueira é depois do meio-dia!","it":"{say}: il falò è dopo mezzogiorno!","nl":"{say}: het kampvuur is na 12 uur ’s middags!","sv":"{say}: lägerelden är efter klockan tolv på dagen!","da":"{say}: lejrbålet er efter klokken tolv om dagen!","no":"{say}: bålet er etter klokka tolv på dagen!","fi":"{say}: nuotio on keskipäivän jälkeen!"},
    ok_brushPm: {"en":"{say}: teeth before bed, on the second lap!","de":"{say}: Zähneputzen vor dem Schlafen, in der zweiten Runde!","fr":"{say} : les dents avant le coucher, au deuxième tour !","es":"{say}: ¡los dientes antes de dormir, en la segunda vuelta!","pt":"{say}: os dentes antes de dormir, na segunda volta!","it":"{say}: i denti prima di andare a letto, al secondo giro!","nl":"{say}: tanden poetsen voor het slapengaan, in het tweede rondje!","sv":"{say}: tänderna före läggdags, på andra varvet!","da":"{say}: tænder før sengetid, i anden omgang!","no":"{say}: tannpuss før leggetid, i andre runde!","fi":"{say}: hampaat ennen nukkumaanmenoa, toisella kierroksella!"},
    hintIdle: {"en":"Wind the hour hand round to the time on the card.","de":"Dreh den Stundenzeiger bis zur Uhrzeit auf der Karte.","fr":"Fais tourner la petite aiguille jusqu’à l’heure de la carte.","es":"Gira la manecilla de las horas hasta la hora de la tarjeta.","pt":"Gire o ponteiro das horas até a hora do cartão.","it":"Gira la lancetta delle ore fino all’ora del cartellino.","nl":"Draai de kleine wijzer naar de tijd op de kaart.","sv":"Vrid timvisaren till tiden på kortet.","da":"Drej den lille viser hen til tiden på kortet.","no":"Vri timeviseren til tiden på kortet.","fi":"Kierrä tuntiviisari kortin aikaan."},
    hintTime: {"en":"The card says {card}. Your clock says {set}.","de":"Auf der Karte steht {card}. Deine Uhr zeigt {set}.","fr":"La carte dit {card}. Ton horloge indique {set}.","es":"La tarjeta dice {card}. Tu reloj marca {set}.","pt":"O cartão diz {card}. O seu relógio marca {set}.","it":"Il cartellino dice {card}. Il tuo orologio segna {set}.","nl":"Op de kaart staat {card}. Jouw klok wijst {set} aan.","sv":"På kortet står det {card}. Din klocka visar {set}.","da":"På kortet står der {card}. Dit ur viser {set}.","no":"På kortet står det {card}. Klokka di viser {set}.","fi":"Kortissa lukee {card}. Kellosi näyttää {set}."},
    hintLap: {"en":"Does this happen before noon or after noon? Before noon is a.m., the gold half. After noon is p.m., the violet half.","de":"Passiert das vor oder nach 12 Uhr mittags? Vor dem Mittag ist die erste Runde, goldgelb. Nach dem Mittag ist die zweite Runde, lila.","fr":"Est-ce que cela se passe avant ou après midi ? Avant midi, c’est le premier tour, en jaune. Après midi, c’est le deuxième tour, en violet.","es":"¿Esto pasa antes o después del mediodía? Antes del mediodía es a. m., la mitad amarilla. Después del mediodía es p. m., la mitad morada.","pt":"Isso acontece antes ou depois do meio-dia? Antes do meio-dia é a primeira volta, amarela. Depois do meio-dia é a segunda volta, roxa.","it":"Succede prima o dopo mezzogiorno? Prima di mezzogiorno è il primo giro, giallo. Dopo mezzogiorno è il secondo giro, viola.","nl":"Gebeurt dit voor of na 12 uur ’s middags? Daarvoor is het eerste rondje, geel. Daarna is het tweede rondje, paars.","sv":"Händer det här före eller efter klockan tolv på dagen? Före är det första varvet, gult. Efter är det andra varvet, lila.","da":"Sker det her før eller efter klokken tolv om dagen? Før er det første omgang, gul. Efter er det anden omgang, lilla.","no":"Skjer dette før eller etter klokka tolv på dagen? Før er det første runde, gul. Etter er det andre runde, lilla.","fi":"Tapahtuuko tämä ennen keskipäivää vai sen jälkeen? Ennen keskipäivää on ap., keltainen puoli. Sen jälkeen on ip., violetti puoli."},
    hintMore: {"en":"Wind one more lap: the same time comes round again.","de":"Dreh noch eine Runde weiter: Dieselbe Uhrzeit kommt noch einmal.","fr":"Fais encore un tour : la même heure revient.","es":"Da una vuelta más: la misma hora vuelve a llegar.","pt":"Dê mais uma volta: a mesma hora aparece de novo.","it":"Fai un altro giro: la stessa ora torna di nuovo.","nl":"Draai nog een rondje verder: dezelfde tijd komt nog een keer.","sv":"Vrid ett varv till: samma tid kommer igen.","da":"Drej en omgang mere: det samme klokkeslæt kommer igen.","no":"Vri én runde til: det samme klokkeslettet kommer igjen.","fi":"Kierrä vielä yksi kierros: sama aika tulee uudestaan."},
    hintBack: {"en":"Wind one lap back: the same time was there before.","de":"Dreh eine Runde zurück: Dieselbe Uhrzeit war schon einmal da.","fr":"Reviens d’un tour : la même heure était déjà passée.","es":"Regresa una vuelta: la misma hora ya había pasado.","pt":"Gire uma volta para trás: a mesma hora já tinha passado.","it":"Torna indietro di un giro: la stessa ora c’era già stata.","nl":"Draai een rondje terug: dezelfde tijd was er al eerder.","sv":"Vrid tillbaka ett varv: samma tid fanns redan förut.","da":"Drej en omgang tilbage: det samme klokkeslæt var der før.","no":"Vri én runde tilbake: det samme klokkeslettet var der før.","fi":"Kierrä yksi kierros takaisin: sama aika oli jo aiemmin."},
    setTimes: {"en":"Times","de":"Uhrzeiten","fr":"Heures","es":"Horas","pt":"Horas","it":"Orari","nl":"Tijden","sv":"Tider","da":"Tider","no":"Tider","fi":"Ajat"},
    tOclock: {"en":"O'clock","de":"Volle Stunden","fr":"Heures pile","es":"En punto","pt":"Horas exatas","it":"Ore esatte","nl":"Hele uren","sv":"Hela timmar","da":"Hele timer","no":"Hele timer","fi":"Tasatunnit"},
    tHalf: {"en":"Half past","de":"Halbe Stunden","fr":"Et demie","es":"Y media","pt":"E meia","it":"E mezza","nl":"Halve uren","sv":"Halvtimmar","da":"Halve timer","no":"Halve timer","fi":"Puolitunnit"},
    setClue: {"en":"Clue","de":"Hinweis","fr":"Indice","es":"Pista","pt":"Pista","it":"Indizio","nl":"Hint","sv":"Ledtråd","da":"Ledetråd","no":"Hint","fi":"Vihje"},
    cWhat: {"en":"What happens","de":"Was passiert","fr":"Ce qui se passe","es":"Lo que pasa","pt":"O que acontece","it":"Che cosa succede","nl":"Wat er gebeurt","sv":"Vad som händer","da":"Hvad der sker","no":"Hva som skjer","fi":"Mitä tapahtuu"},
    cLabel: {"en":"The a.m./p.m. label","de":"Die Tageszeit","fr":"Le moment de la journée","es":"La etiqueta a. m./p. m.","pt":"O período do dia","it":"Il momento della giornata","nl":"Het dagdeel","sv":"Tiden på dygnet","da":"Tiden på døgnet","no":"Tiden på døgnet","fi":"Ap./ip.-merkintä"},
    legAm: {"en":"12 midnight → 12 noon","de":"Mitternacht → 12 Uhr mittags","fr":"minuit → midi","es":"medianoche → mediodía","pt":"meia-noite → meio-dia","it":"mezzanotte → mezzogiorno","nl":"middernacht → 12 uur ’s middags","sv":"midnatt → klockan tolv på dagen","da":"midnat → klokken tolv om dagen","no":"midnatt → klokka tolv på dagen","fi":"keskiyö → keskipäivä"},
    legPm: {"en":"12 noon → 12 midnight","de":"12 Uhr mittags → Mitternacht","fr":"midi → minuit","es":"mediodía → medianoche","pt":"meio-dia → meia-noite","it":"mezzogiorno → mezzanotte","nl":"12 uur ’s middags → middernacht","sv":"klockan tolv på dagen → midnatt","da":"klokken tolv om dagen → midnat","no":"klokka tolv på dagen → midnatt","fi":"keskipäivä → keskiyö"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    aHand: {"en":"Hour hand at {time}, {part}","de":"Stundenzeiger auf {time}, {part}","fr":"Petite aiguille sur {time}, {part}","es":"Manecilla de las horas en {time}, {part}","pt":"Ponteiro das horas em {time}, {part}","it":"Lancetta delle ore sulle {time}, {part}","nl":"Kleine wijzer op {time}, {part}","sv":"Timvisaren på {time}, {part}","da":"Den lille viser på {time}, {part}","no":"Timeviseren på {time}, {part}","fi":"Tuntiviisari: {time}, {part}"},
    aWheelAm: {"en":"Day wheel: the half from midnight to noon","de":"Tagesrad: die Hälfte von Mitternacht bis 12 Uhr mittags","fr":"Roue du jour : la moitié de minuit à midi","es":"Rueda del día: la mitad de la medianoche al mediodía","pt":"Roda do dia: a metade da meia-noite ao meio-dia","it":"Ruota del giorno: la metà da mezzanotte a mezzogiorno","nl":"Dagwiel: de helft van middernacht tot 12 uur ’s middags","sv":"Dagshjulet: halvan från midnatt till klockan tolv på dagen","da":"Dagshjulet: halvdelen fra midnat til klokken tolv om dagen","no":"Dagshjulet: halvdelen fra midnatt til klokka tolv på dagen","fi":"Päiväpyörä: puolikas keskiyöstä keskipäivään"},
    aWheelPm: {"en":"Day wheel: the half from noon to midnight","de":"Tagesrad: die Hälfte von 12 Uhr mittags bis Mitternacht","fr":"Roue du jour : la moitié de midi à minuit","es":"Rueda del día: la mitad del mediodía a la medianoche","pt":"Roda do dia: a metade do meio-dia à meia-noite","it":"Ruota del giorno: la metà da mezzogiorno a mezzanotte","nl":"Dagwiel: de helft van 12 uur ’s middags tot middernacht","sv":"Dagshjulet: halvan från klockan tolv på dagen till midnatt","da":"Dagshjulet: halvdelen fra klokken tolv om dagen til midnat","no":"Dagshjulet: halvdelen fra klokka tolv på dagen til midnatt","fi":"Päiväpyörä: puolikas keskipäivästä keskiyöhön"},
    aFlap: {"en":"The picture is hidden under a flap","de":"Das Bild ist unter einer Klappe versteckt","fr":"L’image est cachée sous un rabat","es":"La imagen está escondida bajo una solapa","pt":"A imagem está escondida embaixo de uma aba","it":"L’immagine è nascosta sotto una linguetta","nl":"Het plaatje zit verstopt onder een klepje","sv":"Bilden är gömd under en lucka","da":"Billedet er gemt under en klap","no":"Bildet er gjemt under en luke","fi":"Kuva on piilossa läpän alla"}
  },/*STRINGS-END*/
  defaults: { times: '1', clue: 'what' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: '1', labelKey: 'tOclock' }, { value: '2', labelKey: 'tHalf' }] },
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'what', labelKey: 'cWhat' }, { value: 'label', labelKey: 'cLabel' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['farm-animals', 'breakfast', 'classroom', 'activities', 'around-the-house', 'furniture', 'camping', 'beach'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._drag = null;
    injectDayWheelCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return DayWheelCore.levelOf(this._setting('times')); },
  _label: function () { return this._setting('clue') === 'label'; },
  _loc: function () { return DayWheelCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level() + '/' + this._loc(); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = DayWheelCore.rounds(this._level(), this._loc()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = DayWheelCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'day-wheel.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = DayWheelCore.newState(this._level(), k, this._loc());
    this._view = { note: '', soft: false, win: false, raw: null, bump: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'dw-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="dw-main"><div class="dw-clockcol"><div class="dw-clock" data-qa="clock"></div><div class="dw-under"></div></div><div class="dw-side"></div></div><p class="dw-note" data-qa="note" aria-live="polite"></p><div class="dw-goline"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _geometry: function (W) {
    var wide = W >= 560, cramp = W < 330;
    var S = wide ? Math.min(380, W - 250) : Math.min(cramp ? 200 : 300, W - 8);
    return { W: W, wide: wide, cramp: cramp, S: S, k: S / 400, side: wide ? W - S - 18 : W, pic: wide ? 120 : cramp ? 64 : 72, rooster: wide ? 96 : 64 };
  },
  /* the minutes the hands show right now (live while dragging) */
  _shown: function () { return this._view.raw != null ? this._view.raw : this.st.minutes; },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W);
    this._wrap.className = 'dw-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (this._label() ? ' is-label' : '');
    this._paintSide();
    this._paintClock();
    this._paintUnder();
    this._paintGo();
    var note = this._qs('.dw-note');
    if (v.note) { note.textContent = v.note; note.className = 'dw-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'dw-note'; }
    this._setPrompt();
  },
  _pic: function (theme, key, size, cls) {
    var th = this._themes[theme]; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* the ticket (the event and its time), the legend and Sprocket */
  _paintSide: function () {
    var st = this.st, r = st.round, g = this._g, C = DayWheelCore, side = this._qs('.dw-side'), loc = this._loc(), lab = this._label(), vk = st.verdict && st.verdict.kind;
    side.innerHTML = '';
    var tk = document.createElement('div'); tk.className = 'dw-ticket'; tk.setAttribute('data-qa', 'ticket');
    var hide = lab && !st.done;
    if (r.pic) {
      if (hide) { var fl = document.createElement('div'); fl.className = 'dw-flap'; fl.setAttribute('data-flap', '1'); fl.setAttribute('role', 'img'); fl.setAttribute('aria-label', this._t('aFlap')); fl.style.width = g.pic + 'px'; fl.style.height = g.pic + 'px'; fl.innerHTML = '<span aria-hidden="true">?</span>'; tk.appendChild(fl); }
      else { var im = this._pic(r.pic[0], r.pic[1], g.pic, 'dw-tpic'); if (im) tk.appendChild(im); }
    }
    var tx = document.createElement('div'); tx.className = 'dw-ttext';
    var sen = document.createElement('p'); sen.className = 'dw-sentence' + (hide ? ' is-hidden' : ''); sen.setAttribute('data-qa', 'sentence'); sen.textContent = hide ? '' : this._t(C.storyKey(r)); tx.appendChild(sen);
    var tm = document.createElement('p'); tm.className = 'dw-ttime' + (vk === 'time' ? ' is-mark' : ''); tm.setAttribute('data-qa', 'cardtime');
    tm.textContent = lab ? C.spoken(loc, r.answer) : C.fmt(loc, r.answer); tx.appendChild(tm);
    tk.appendChild(tx);
    if (st.done) tk.insertAdjacentHTML('beforeend', '<span class="dw-stamp" data-stamp="1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
    side.appendChild(tk);
    if (g.wide) {
      var lg = document.createElement('div'); lg.className = 'dw-legend dw-art';
      lg.innerHTML = '<span class="dw-sw is-am"></span><span>' + this._esc(this._t('legAm')) + '</span><span class="dw-sw is-pm"></span><span>' + this._esc(this._t('legPm')) + '</span>';
      side.appendChild(lg);
      var ro = this._pic('farm-animals', 'rooster', g.rooster, 'dw-rooster' + (this._view.win ? ' is-crow' : ''));
      if (ro) { ro.setAttribute('data-rooster', '1'); side.appendChild(ro); }
    }
  },
  /* the clock face (viewBox 400): the window with the day wheel, the numerals, the hands */
  _paintClock: function () {
    var st = this.st, r = st.round, g = this._g, C = DayWheelCore, self = this, v = this._view, el = this._qs('.dw-clock'), loc = this._loc();
    var min = this._shown(), wa = C.wheelAngle(min), ha = C.hourAngle(min), ma = C.minuteAngle(min), vk = st.verdict && st.verdict.kind;
    el.innerHTML = ''; el.style.width = g.S + 'px'; el.style.height = g.S + 'px';
    var P = function (a, rad) { var t = (a - 90) * Math.PI / 180; return [200 + rad * Math.cos(t), 200 + rad * Math.sin(t)]; };
    /* the window: an annular sector at the top of the face, between the 11 and the 1 */
    var a0 = -27, a1 = 27, r0 = 70, r1 = 128, p1 = P(a0, r1), p2 = P(a1, r1), p3 = P(a1, r0), p4 = P(a0, r0);
    var winPath = 'M' + p1.join(' ') + 'A' + r1 + ' ' + r1 + ' 0 0 1 ' + p2.join(' ') + 'L' + p3.join(' ') + 'A' + r0 + ' ' + r0 + ' 0 0 0 ' + p4.join(' ') + 'Z';
    var o = '<defs><clipPath id="dwWin"><path d="' + winPath + '"/></clipPath></defs>';
    o += '<circle class="dw-face" cx="200" cy="200" r="186"/>';
    /* the day wheel: day position p sits at angle p/1440·360; turned back by the wheel angle, the current minute is at the top */
    var gold = '<path class="dw-am" d="M200 200L200 ' + (200 - 150) + 'A150 150 0 0 1 200 ' + (200 + 150) + 'Z"/>', violet = '<path class="dw-pm" d="M200 200L200 ' + (200 + 150) + 'A150 150 0 0 1 200 ' + (200 - 150) + 'Z"/>';
    var mark = function (p, theme, key) { var q = P(p / 1440 * 360, 99), s = 46, th = self._themes[theme]; if (!th || typeof LCSPictures === 'undefined') return ''; return '<image class="dw-mark" data-mark="' + key + '" href="' + LCSPictures.url(th, key) + '" x="' + (q[0] - s / 2).toFixed(1) + '" y="' + (q[1] - s / 2).toFixed(1) + '" width="' + s + '" height="' + s + '" transform="rotate(' + (p / 1440 * 360).toFixed(1) + ' ' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ')"/>'; };
    o += '<g clip-path="url(#dwWin)"><g class="dw-wheel" data-wheel="' + wa.toFixed(2) + '" transform="rotate(' + (-wa).toFixed(2) + ' 200 200)">' + gold + violet + mark(0, 'camping', 'moon') + mark(720, 'beach', 'sun') + '</g></g>';
    o += '<path class="dw-winframe' + (vk === 'lap' ? ' is-wrong' : '') + '" data-window="' + C.lapOf(min) + '" d="' + winPath + '"/>';
    /* the noon line, at the window's centre: the pointer the wheel turns past */
    o += '<path class="dw-pointer" d="M200 ' + (200 - r1 - 2) + 'v-8"/>';
    /* minute ticks and numerals */
    for (var i = 0; i < 60; i++) { var t1 = P(i * 6, 176), t2 = P(i * 6, i % 5 ? 170 : 164); o += '<path class="dw-tick' + (i % 5 ? '' : ' is-hour') + '" d="M' + t1[0].toFixed(1) + ' ' + t1[1].toFixed(1) + 'L' + t2[0].toFixed(1) + ' ' + t2[1].toFixed(1) + '"/>'; }
    for (var h = 1; h <= 12; h++) { var q = P(h * 30, 149); o += '<text class="dw-num" x="' + q[0].toFixed(1) + '" y="' + (q[1] + 10).toFixed(1) + '" text-anchor="middle">' + h + '</text>'; }
    o += '<circle class="dw-rim" cx="200" cy="200" r="186"/>';
    /* the stop pin at 12: the day starts and ends at midnight */
    o += '<circle class="dw-pin" cx="200" cy="10" r="6"/>';
    /* miss 2 on the wrong lap: a dashed arrow one lap round, the way to wind */
    if (st.help && vk === 'lap') {
      var dir = st.verdict.dir === 'more' ? 1 : -1, s0 = P(dir > 0 ? 8 : -8, 194), s1 = P(dir > 0 ? 340 : -340, 194), tip = s1, back = P(dir > 0 ? 328 : -328, 194), side1 = P(dir > 0 ? 330 : -330, 186), side2 = P(dir > 0 ? 330 : -330, 202);
      o += '<path class="dw-ghost" data-ghost="' + st.verdict.dir + '" d="M' + s0.join(' ') + 'A194 194 0 1 ' + (dir > 0 ? 1 : 0) + ' ' + s1.join(' ') + '"/><path class="dw-ghosthead" d="M' + side1.join(' ') + 'L' + tip.join(' ') + 'L' + side2.join(' ') + '"/>';
      void back;
    }
    /* the hands: the minute hand geared, the hour hand with its grip */
    var mt = P(ma, 158), ht = P(ha, 50);
    o += '<path class="dw-mhand" data-minute="' + Math.round(ma) + '" d="M200 200L' + mt[0].toFixed(1) + ' ' + mt[1].toFixed(1) + '"/>';
    o += '<path class="dw-hhand" data-hour="' + ha.toFixed(1) + '" d="M200 200L' + ht[0].toFixed(1) + ' ' + ht[1].toFixed(1) + '"/>';
    o += '<circle class="dw-grip" cx="' + ht[0].toFixed(1) + '" cy="' + ht[1].toFixed(1) + '" r="17"/><circle class="dw-cap" cx="200" cy="200" r="10"/>';
    el.insertAdjacentHTML('beforeend', '<svg class="dw-art dw-svg" viewBox="0 0 400 400" width="' + g.S + '" height="' + g.S + '" aria-hidden="true">' + o + '</svg>');
    /* the event picture seats itself in the window on success */
    if (st.done && r.pic) {
      var ss = Math.round(52 * g.k), sp = this._pic(r.pic[0], r.pic[1], ss, 'dw-seat'); if (sp) { sp.setAttribute('data-seat', '1'); sp.setAttribute('data-mark', '1'); sp.style.left = (g.S / 2 - ss / 2) + 'px'; sp.style.top = (g.S * (200 - 99) / 400 - ss / 2) + 'px'; el.appendChild(sp); }
    }
    if (!g.wide) { var ro = this._pic('farm-animals', 'rooster', g.rooster, 'dw-rooster is-corner' + (v.win ? ' is-crow' : '')); if (ro) { ro.setAttribute('data-rooster', '1'); el.appendChild(ro); } }
    /* the whole face takes a drag (the hand follows the finger's angle); the grip is the keyboard handle */
    var surf = document.createElement('div'); surf.className = 'dw-surface';
    surf.addEventListener('pointerdown', function (e) { if (e.button || st.done) return; e.preventDefault(); self._dragHand(e); });
    el.appendChild(surf);
    var gp = this._btn('dw-griphit', 'hand', this._t('aHand', { time: C.fmt(loc, min), part: C.part(loc, min) }));
    var gs = Math.max(48, 56 * g.k);
    gp.style.cssText = 'left:' + (ht[0] * g.k - gs / 2).toFixed(1) + 'px;top:' + (ht[1] * g.k - gs / 2).toFixed(1) + 'px;width:' + gs.toFixed(0) + 'px;height:' + gs.toFixed(0) + 'px;';
    gp.setAttribute('role', 'slider'); gp.setAttribute('aria-valuemin', '0'); gp.setAttribute('aria-valuemax', String(C.maxMinutes(st.level))); gp.setAttribute('aria-valuenow', String(st.minutes));
    gp.setAttribute('aria-valuetext', C.fmt(loc, min) + ' ' + C.part(loc, min));
    gp.disabled = st.done;
    gp.addEventListener('pointerdown', function (e) { if (e.button || st.done) return; e.preventDefault(); self._dragHand(e); });
    el.appendChild(gp);
  },
  /* the lap badge (the day-part word — colour only when the card itself carries the label) and the digital readout */
  _paintUnder: function () {
    var st = this.st, el = this._qs('.dw-under'), C = DayWheelCore, loc = this._loc(), min = this._shown(), lap = C.lapOf(min), vk = st.verdict && st.verdict.kind;
    el.innerHTML = '';
    var b = document.createElement('div'); b.className = 'dw-badge dw-art is-' + lap + (st.done ? ' is-glow' : ''); b.setAttribute('data-lap', lap); b.setAttribute('role', 'img');
    b.setAttribute('aria-label', this._t(lap === 'am' ? 'aWheelAm' : 'aWheelPm'));
    b.textContent = this._label() ? '' : C.part(loc, min);
    el.appendChild(b);
    var d = document.createElement('div'); d.className = 'dw-readout' + (vk === 'time' ? ' is-mark' : ''); d.setAttribute('data-qa', 'readout'); d.textContent = C.fmt(loc, min);
    el.appendChild(d);
  },
  _paintGo: function () {
    var st = this.st, self = this, el = this._qs('.dw-goline'); el.innerHTML = '';
    var c = this._btn('dw-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._paint(); },
  _wind: function (min) { if (!DayWheelCore.wind(this.st, min)) return false; this._after(); return true; },
  _step: function (n) { var s = DayWheelCore.step(this.st.level), before = this.st.minutes; if (!this._wind(before + n * s)) { this.api.sound(160); return false; } if (DayWheelCore.lapOf(before) !== DayWheelCore.lapOf(this.st.minutes)) this.api.sound(520); return true; },
  /* drag: the hand follows the finger's angle; the cumulative angle counts the laps, the stop pins hold the day */
  _dragHand: function (e) {
    var self = this, st = this.st, C = DayWheelCore, box = this._qs('.dw-clock').getBoundingClientRect(), cx = box.left + box.width / 2, cy = box.top + box.height / 2;
    var ang = function (ev) { return (Math.atan2(ev.clientX - cx, -(ev.clientY - cy)) * 180 / Math.PI + 360) % 360; };
    this._endDrag();
    var last = ang(e), raw = st.minutes, max = C.maxMinutes(st.level), lastLap = C.lapOf(raw);
    var mv = function (ev) {
      ev.preventDefault();
      var a = ang(ev), d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      raw = Math.max(0, Math.min(max, raw + d / 360 * 720));
      self._view.raw = raw;
      var lp = C.lapOf(raw); if (lp !== lastLap) { lastLap = lp; self.api.sound(520); }
      self._paintClock(); self._paintUnder();
    };
    var up = function () { self._endDrag(); self._view.raw = null; if (!self._wind(raw)) self._paint(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _keyboard: function (e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowUp') { e.preventDefault(); this._step(1); }
    else if (k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); this._step(-1); }
    else if (k === 'PageUp') { e.preventDefault(); this._step(360 / DayWheelCore.step(this.st.level)); }
    else if (k === 'PageDown') { e.preventDefault(); this._step(-360 / DayWheelCore.step(this.st.level)); }
    else if (k === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = DayWheelCore; if (st.done) return;
    var res = C.check(st), loc = this._loc();
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    var key = C.hint(st);
    v.soft = false; v.note = this._t(key, { card: C.fmt(loc, st.round.answer), set: C.fmt(loc, st.minutes) });
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = DayWheelCore, loc = this._loc();
    /* the said time opens the sentence: capital first letter ("Minuit et demi : …") */
    var say = C.spoken(loc, r.answer); say = say.charAt(0).toUpperCase() + say.slice(1);
    var msg = this._t(C.okKey(r), { say: say });
    v.note = ''; v.win = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectDayWheelCSS() {
  if (typeof document === 'undefined' || document.getElementById('dw-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.dw-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .dw-wrap:focus{outline:none;}'
  + '.dw-main{display:flex;flex-direction:column-reverse;align-items:center;gap:10px;width:100%;} .dw-wrap.is-wide .dw-main{flex-direction:row-reverse;align-items:flex-start;justify-content:center;gap:18px;}'
  + '.dw-clockcol{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.dw-side{display:flex;flex-direction:column;align-items:stretch;gap:12px;width:100%;} .dw-wrap.is-wide .dw-side{width:auto;flex:1;min-width:0;}'
  + '.dw-ticket{position:relative;display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #E6D9BF;} .dw-wrap.is-wide .dw-ticket{flex-direction:column;text-align:center;padding:14px 12px;}'
  + '.dw-tpic{flex:none;object-fit:contain;} .dw-ttext{display:flex;flex-direction:column;gap:2px;min-width:0;}'
  + '.dw-sentence{margin:0;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.3;color:' + INK + ';} .dw-wrap.is-narrow .dw-sentence{font-size:16px;} .dw-sentence.is-hidden{display:none;}'
  + '.dw-ttime{margin:0;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1.05;color:#146B5E;} .dw-wrap.is-narrow .dw-ttime{font-size:30px;} .dw-wrap.is-label .dw-ttime{font-size:30px;} .dw-wrap.is-narrow.is-label .dw-ttime{font-size:24px;}'
  + '.dw-ttime.is-mark,.dw-readout.is-mark{text-decoration:underline;text-decoration-color:#E0603A;text-decoration-thickness:3px;text-underline-offset:4px;}'
  + '.dw-flap{flex:none;border-radius:12px;background:repeating-linear-gradient(45deg,#F3E3C3 0 10px,#EAD5AE 10px 20px);box-shadow:inset 0 0 0 2px #B08550;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:40px;color:#8C6A3C;}'
  + '.dw-stamp{position:absolute;right:8px;top:8px;width:34px;height:34px;border-radius:50%;background:#2E9C88;color:#fff;display:flex;align-items:center;justify-content:center;transform:rotate(-12deg);} .dw-stamp svg{width:22px;height:22px;}'
  + '.dw-legend{display:grid;grid-template-columns:22px 1fr;align-items:center;gap:6px 8px;font-family:' + B + ';font-weight:700;font-size:16px;color:' + INK + ';padding:0 4px;} .dw-sw{width:22px;height:22px;border-radius:50%;box-shadow:inset 0 0 0 2px ' + INK + ';} .dw-sw.is-am{background:#F6D57A;} .dw-sw.is-pm{background:#8C7BC4;}'
  + '.dw-rooster{align-self:center;object-fit:contain;} .dw-rooster.is-corner{position:absolute;left:-4px;top:-4px;z-index:1;pointer-events:none;} .dw-wrap:not(.is-fast) .dw-rooster.is-crow{animation:dwBounce .5s ease-out 2;}'
  + '.dw-clock{position:relative;flex:none;touch-action:none;}'
  + '.dw-svg{position:absolute;left:0;top:0;overflow:visible;}'
  + '.dw-face{fill:#FFFDF6;} .dw-rim{fill:none;stroke:#146B5E;stroke-width:10;} .dw-am{fill:#F6D57A;} .dw-pm{fill:#8C7BC4;}'
  + '.dw-winframe{fill:none;stroke:' + INK + ';stroke-width:3;} .dw-winframe.is-wrong{stroke:#E0603A;stroke-width:5;} .dw-pointer{stroke:' + INK + ';stroke-width:3;stroke-linecap:round;}'
  + '.dw-tick{stroke:#8A8197;stroke-width:1.5;} .dw-tick.is-hour{stroke:' + INK + ';stroke-width:3;} .dw-num{font-family:' + H + ';font-weight:800;font-size:28px;fill:' + INK + ';}'
  + '.dw-pin{fill:#E0603A;stroke:' + INK + ';stroke-width:2;}'
  + '.dw-mhand{stroke:#F2784B;stroke-width:7;stroke-linecap:round;} .dw-hhand{stroke:#146B5E;stroke-width:12;stroke-linecap:round;} .dw-grip{fill:#146B5E;stroke:#FFFDF6;stroke-width:4;} .dw-cap{fill:' + INK + ';}'
  + '.dw-ghost{fill:none;stroke:#146B5E;stroke-width:4;stroke-dasharray:9 7;opacity:.8;} .dw-ghosthead{fill:none;stroke:#146B5E;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;opacity:.8;}'
  + '.dw-surface{position:absolute;inset:0;border-radius:50%;cursor:grab;touch-action:none;}'
  + '.dw-griphit{position:absolute;padding:0;margin:0;border:0;border-radius:50%;background:transparent;cursor:grab;touch-action:none;z-index:2;} .dw-griphit:focus-visible{outline:3px solid #F2784B;outline-offset:2px;} .dw-griphit:disabled{cursor:default;}'
  + '.dw-seat{position:absolute;z-index:2;object-fit:contain;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25));} .dw-wrap:not(.is-fast) .dw-seat{animation:dwSeat .45s ease-out both;}'
  + '.dw-under{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.dw-badge{min-width:150px;height:48px;padding:0 14px;box-sizing:border-box;border-radius:24px;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:21px;box-shadow:inset 0 0 0 2px ' + INK + ';white-space:nowrap;} .dw-badge.is-am{background:#F6D57A;color:' + INK + ';} .dw-badge.is-pm{background:#8C7BC4;color:#fff;} .dw-badge.is-glow{box-shadow:inset 0 0 0 2px ' + INK + ',0 0 0 4px #2E9C88;}'
  + '.dw-wrap.is-narrow .dw-badge{min-width:120px;height:44px;font-size:17px;} .dw-wrap.is-label .dw-badge{min-width:64px;}'
  + '.dw-readout{min-width:96px;height:48px;padding:0 10px;box-sizing:border-box;border-radius:12px;background:#2F2A3B;color:#FFFDF6;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:26px;} .dw-wrap.is-narrow .dw-readout{height:44px;font-size:22px;}'
  + '.dw-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .dw-wrap.is-narrow .dw-note{font-size:16px;line-height:1.25;} .dw-note.is-hint{color:#9A3412;} .dw-wrap.is-cramp .dw-note:empty{display:none;}'
  + '.dw-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .dw-go svg{width:22px;height:22px;} .dw-go:disabled{opacity:.45;cursor:default;} .dw-wrap.is-narrow .dw-go{height:48px;}'
  + '.dw-wrap.is-cramp .dw-badge{height:40px;min-width:104px;font-size:15px;} .dw-wrap.is-cramp .dw-readout{height:40px;font-size:19px;min-width:76px;} .dw-wrap.is-cramp .dw-note{font-size:14px;line-height:1.18;} .dw-wrap.is-cramp .dw-sentence{font-size:14px;line-height:1.2;} .dw-wrap.is-cramp .dw-ttime{font-size:26px;} .dw-wrap.is-cramp .dw-main{gap:6px;} .dw-wrap.is-cramp .dw-clockcol{gap:5px;} .dw-wrap.is-done .dw-goline{display:none;} .dw-wrap.is-cramp.is-done .dw-side{display:none;} .dw-wrap.is-done .dw-note:empty{display:none;} .dw-wrap.is-cramp{gap:6px;} .dw-wrap.is-cramp .dw-ticket{padding:6px 10px;gap:8px;}'
  + '@keyframes dwBounce{0%,100%{transform:scale(1);}40%{transform:scale(1.12) translateY(-6px);}} @keyframes dwSeat{from{opacity:0;transform:translateY(40px) scale(.6);}to{opacity:1;transform:none;}}'
  + '.dw-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'dw-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.DayWheelActivity = DayWheelActivity;
