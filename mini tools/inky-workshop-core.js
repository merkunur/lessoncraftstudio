/* =====================================================================
   inky-workshop-core.js — the model of ACTIVITY #66 of the one-by-one
   rebuild: "Inky's Book Workshop" → THE TWO INKS (RL.K.6, 11 locales).
   Design sheet: docs/activities-rebuild/designs/066-inky-book-workshop.md
   ---------------------------------------------------------------------
   THE INVENTION: each maker can only make their own mark. Inky's press
   prints pages with one half missing; the child carries each page to the
   person who can finish it. The author's ink makes words, the
   illustrator's ink makes pictures, the reader has no ink — she enjoys a
   finished page. Handed the wrong page, a maker still makes their mark,
   in the wrong place (words in the picture box, a picture on the word
   lines, the reader stopping at the gap), and the page comes back. At the
   end of a book the author and the illustrator go on its cover.
   No DOM. UMD: window.InkyWorkshopCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.InkyWorkshopCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /*DATA-BEGIN*/
  /* the eight books: each page = [library picture, the half the press left empty ('picture' | 'words' | 'none' = finished, for the reader)] */
  var BOOKS = {"boat":{"pages":[["toys/boat","picture"],["weather/rainy","words"],["beach/lighthouse","none"]]},"dragon":{"pages":[["Things That Fly/dragon","words"],["camping/moon","picture"],["furniture/bed","none"]]},"balloon":{"pages":[["toys/balloon","picture"],["spring/bird","words"],["miscellaneous/house","none"]]},"moon":{"pages":[["space/moon","words"],["forest creatures/owl","picture"],["christmas/star","none"]]},"farm":{"pages":[["farm animals/pig","picture"],["farm animals/cow","words"],["farm animals/duck","none"]]},"whale":{"pages":[["animals/whale","words"],["beach/crab","picture"],["ocean life/dolphin","none"]]},"garden":{"pages":[["weather/rainbow","picture"],["spring/tulip","words"],["flowers/sunflower","none"]]},"kite":{"pages":[["toys/kite","words"],["tree/apple","picture"],["animals/giraffe","none"]]}};
  var ORDER = ["boat","dragon","balloon","moon","farm","whale","garden","kite"];
  /* the three people (library pictures) and Inky */
  var PEOPLE = {"author":"activities/writing","illustrator":"occupations/artist","reader":"activities/reading"};
  var INKY = "ocean life/octopus";
  /* per locale: inky = the mascot's name, roles = the formal name-plate words, s = each book's three page sentences */
  var TEXT = {
    en: {"inky":"Inky","roles":{"author":"Author","illustrator":"Illustrator","reader":"Reader"},"s":{"boat":["A little boat sailed out.","Then it began to rain.","The lighthouse showed the way home."],"dragon":["Dragon gave a big yawn.","The moon came up.","Dragon’s bed was ready."],"balloon":["The balloon flew away.","A bird saw it.","It landed on a house."],"moon":["The moon was round and bright.","Owl looked up at it.","A star came out too."],"farm":["The pig rolls in the mud.","The cow says moo.","The duckling says quack."],"whale":["Whale sang a song.","Crab tapped along.","Dolphin danced in the waves."],"garden":["A rainbow came out.","A red tulip grew.","A sunflower grew tall."],"kite":["The kite went up high.","It got stuck in a tree.","Giraffe got it down."]}},
    de: {"inky":"Inky","roles":{"author":"Autor","illustrator":"Illustrator","reader":"Leser"},"s":{"boat":["Ein kleines Boot fuhr hinaus.","Dann fing es an zu regnen.","Der Leuchtturm zeigte den Weg nach Hause."],"dragon":["Der Drache gähnte laut.","Der Mond ging auf.","Das Bett des Drachen war bereit."],"balloon":["Der Luftballon flog davon.","Ein Vogel sah ihn.","Er landete auf einem Haus."],"moon":["Der Mond war rund und hell.","Die Eule schaute zu ihm hinauf.","Auch ein Stern kam heraus."],"farm":["Das Schwein wälzt sich im Schlamm.","Die Kuh macht muh.","Das Entenküken macht quak."],"whale":["Der Wal sang ein Lied.","Die Krabbe klopfte den Takt.","Der Delfin tanzte in den Wellen."],"garden":["Ein Regenbogen erschien.","Eine rote Tulpe wuchs.","Eine Sonnenblume wuchs hoch."],"kite":["Der Drachen stieg hoch hinauf.","Er blieb in einem Baum hängen.","Die Giraffe holte ihn herunter."]}},
    nl: {"inky":"Inky","roles":{"author":"Schrijver","illustrator":"Illustrator","reader":"Lezer"},"s":{"boat":["Een bootje voer weg.","Toen begon het te regenen.","De vuurtoren wees de weg naar huis."],"dragon":["De draak gaapte heel hard.","De maan kwam op.","Het bed van de draak stond klaar."],"balloon":["De ballon vloog weg.","Een vogel zag hem.","Hij landde op een huis."],"moon":["De maan was rond en helder.","De uil keek omhoog naar de maan.","Er kwam ook een ster tevoorschijn."],"farm":["Het varken rolt in de modder.","De koe zegt boe.","Het eendje zegt kwak."],"whale":["De walvis zong een lied.","De krab tikte mee.","De dolfijn danste in de golven."],"garden":["Er kwam een regenboog.","Er groeide een rode tulp.","Een zonnebloem groeide hoog."],"kite":["De vlieger ging hoog de lucht in.","Hij bleef in een boom hangen.","De giraf haalde hem naar beneden."]}},
    da: {"inky":"Inky","roles":{"author":"Forfatter","illustrator":"Illustrator","reader":"Læser"},"s":{"boat":["En lille båd sejlede ud.","Så begyndte det at regne.","Fyrtårnet viste vejen hjem."],"dragon":["Dragen gabte stort.","Månen kom frem.","Dragens seng var klar."],"balloon":["Ballonen fløj væk.","En fugl så den.","Den landede på et hus."],"moon":["Månen var rund og klar.","Uglen kiggede op på den.","En stjerne kom også frem."],"farm":["Grisen ruller sig i mudderet.","Koen siger muh.","Ællingen siger rap."],"whale":["Hvalen sang en sang.","Krabben slog takten.","Delfinen dansede i bølgerne."],"garden":["En regnbue kom frem.","En rød tulipan voksede.","En solsikke voksede sig høj."],"kite":["Dragen steg højt op.","Den satte sig fast i et træ.","Giraffen fik den ned."]}},
    sv: {"inky":"Inky","roles":{"author":"Författare","illustrator":"Illustratör","reader":"Läsare"},"s":{"boat":["En liten båt seglade ut.","Sedan började det regna.","Fyren visade vägen hem."],"dragon":["Draken gäspade stort.","Månen gick upp.","Drakens säng var redo."],"balloon":["Ballongen flög iväg.","En fågel såg den.","Den landade på ett hus."],"moon":["Månen var rund och klar.","Ugglan tittade upp på den.","En stjärna kom fram också."],"farm":["Grisen rullar sig i leran.","Kon säger mu.","Ankungen säger kvack."],"whale":["Valen sjöng en sång.","Krabban slog takten.","Delfinen dansade i vågorna."],"garden":["En regnbåge kom fram.","En röd tulpan växte.","En solros växte sig hög."],"kite":["Draken flög högt upp.","Den fastnade i ett träd.","Giraffen tog ner den."]}},
    no: {"inky":"Inky","roles":{"author":"Forfatter","illustrator":"Illustratør","reader":"Leser"},"s":{"boat":["En liten båt seilte ut.","Så begynte det å regne.","Fyret viste veien hjem."],"dragon":["Dragen gjespet stort.","Månen kom opp.","Dragens seng var klar."],"balloon":["Ballongen fløy av gårde.","En fugl så den.","Den landet på et hus."],"moon":["Månen var rund og klar.","Ugla så opp på den.","En stjerne kom fram også."],"farm":["Grisen ruller seg i gjørma.","Kua sier mø.","Andungen sier kvakk."],"whale":["Hvalen sang en sang.","Krabben slo takten.","Delfinen danset i bølgene."],"garden":["En regnbue kom fram.","En rød tulipan vokste.","En solsikke vokste seg høy."],"kite":["Dragen steg høyt opp.","Den satte seg fast i et tre.","Sjiraffen fikk den ned."]}},
    es: {"inky":"Inky","roles":{"author":"Autor","illustrator":"Ilustrador","reader":"Lector"},"s":{"boat":["Un barquito salió a navegar.","Luego empezó a llover.","El faro le mostró el camino a casa."],"dragon":["El dragón dio un gran bostezo.","Salió la luna.","La cama del dragón estaba lista."],"balloon":["El globo se fue volando.","Un pájaro lo vio.","Cayó sobre una casa."],"moon":["La luna estaba redonda y brillante.","El búho la miró.","También salió una estrella."],"farm":["El cerdo se revuelca en el lodo.","La vaca dice mu.","El patito dice cuac."],"whale":["La ballena cantó una canción.","El cangrejo llevó el ritmo.","El delfín bailó en las olas."],"garden":["Salió un arcoíris.","Creció un tulipán rojo.","Un girasol creció muy alto."],"kite":["El papalote subió muy alto.","Se atoró en un árbol.","La jirafa lo bajó."]}},
    it: {"inky":"Nino","roles":{"author":"Autore","illustrator":"Illustratore","reader":"Lettore"},"s":{"boat":["Una barchetta ha preso il largo.","Poi ha cominciato a piovere.","Il faro ha mostrato la strada di casa."],"dragon":["Il drago ha fatto un grande sbadiglio.","È spuntata la luna.","Il letto del drago era pronto."],"balloon":["Il palloncino è volato via.","Un uccello l’ha visto.","È atterrato su una casa."],"moon":["La luna era tonda e luminosa.","Il gufo l’ha guardata.","È spuntata anche una stella."],"farm":["Il maiale si rotola nel fango.","La mucca fa muu.","L’anatroccolo fa qua qua."],"whale":["La balena ha cantato una canzone.","Il granchio ha battuto il tempo.","Il delfino ha ballato tra le onde."],"garden":["È spuntato un arcobaleno.","È cresciuto un tulipano rosso.","Un girasole è cresciuto alto alto."],"kite":["L’aquilone è volato in alto.","Si è impigliato in un albero.","La giraffa l’ha tirato giù."]}},
    pt: {"inky":"Tinoco","roles":{"author":"Autor","illustrator":"Ilustrador","reader":"Leitor"},"s":{"boat":["Um barquinho saiu para navegar.","Depois começou a chover.","O farol mostrou o caminho de casa."],"dragon":["O dragão deu um bocejo enorme.","A lua apareceu.","A cama do dragão estava pronta."],"balloon":["O balão saiu voando.","Um passarinho viu o balão.","Ele caiu em cima de uma casa."],"moon":["A lua estava redonda e brilhante.","A coruja olhou para a lua.","Uma estrela também apareceu."],"farm":["O porco rola na lama.","A vaca faz muu.","O patinho faz quá-quá."],"whale":["A baleia cantou uma música.","O caranguejo marcou o ritmo.","O golfinho dançou nas ondas."],"garden":["Apareceu um arco-íris.","Nasceu uma tulipa vermelha.","Um girassol cresceu bem alto."],"kite":["A pipa subiu bem alto.","Ela ficou presa numa árvore.","A girafa tirou a pipa de lá."]}},
    fr: {"inky":"Inky","roles":{"author":"Auteur","illustrator":"Illustrateur","reader":"Lecteur"},"s":{"boat":["Un petit bateau est parti en mer.","Puis il a commencé à pleuvoir.","Le phare a montré le chemin de la maison."],"dragon":["Le dragon a fait un grand bâillement.","La lune s’est levée.","Le lit du dragon était prêt."],"balloon":["Le ballon s’est envolé.","Un oiseau l’a vu.","Il a atterri sur une maison."],"moon":["La lune était ronde et brillante.","Le hibou l’a regardée.","Une étoile est apparue aussi."],"farm":["Le cochon se roule dans la boue.","La vache fait meuh.","Le caneton fait coin-coin."],"whale":["La baleine a chanté une chanson.","Le crabe a battu la mesure.","Le dauphin a dansé dans les vagues."],"garden":["Un arc-en-ciel est apparu.","Une tulipe rouge a poussé.","Un tournesol a poussé très haut."],"kite":["Le cerf-volant est monté très haut.","Il est resté coincé dans un arbre.","La girafe l’a décroché."]}},
    fi: {"inky":"Inky","roles":{"author":"Kirjailija","illustrator":"Kuvittaja","reader":"Lukija"},"s":{"boat":["Pieni vene lähti merelle.","Sitten alkoi sataa.","Majakka näytti tien kotiin."],"dragon":["Lohikäärme haukotteli isosti.","Kuu nousi.","Lohikäärmeen sänky oli valmiina."],"balloon":["Ilmapallo lensi pois.","Lintu näki sen.","Se laskeutui talon katolle."],"moon":["Kuu oli pyöreä ja kirkas.","Pöllö katsoi ylös kuuhun.","Myös tähti tuli esiin."],"farm":["Possu kieriskelee mudassa.","Lehmä sanoo ammuu.","Ankanpoikanen sanoo kvaak."],"whale":["Valas lauloi laulun.","Rapu naputti tahtia.","Delfiini tanssi aalloissa."],"garden":["Sateenkaari tuli esiin.","Punainen tulppaani kasvoi.","Auringonkukka kasvoi korkeaksi."],"kite":["Leija nousi korkealle.","Se jäi kiinni puuhun.","Kirahvi otti sen alas."]}}
  };
  var LABELS = {"Things That Fly/dragon":{"en":"dragon","de":"Drache","nl":"draak","da":"drage","sv":"drake","no":"drage","es":"dragón","it":"drago","pt":"dragão","fr":"dragon","fi":"lohikäärme"},"activities/reading":{"en":"reading","de":"Lesen","nl":"lezen","da":"læse","sv":"läsa","no":"lese","es":"leer","it":"leggere","pt":"ler","fr":"lecture","fi":"lukeminen"},"activities/writing":{"en":"writing","de":"Schreiben","nl":"schrijven","da":"skrive","sv":"skriva","no":"skrive","es":"escribir","it":"scrivere","pt":"escrever","fr":"écriture","fi":"kirjoittaminen"},"animals/giraffe":{"en":"giraffe","de":"Giraffe","nl":"giraf","da":"giraf","sv":"giraff","no":"sjiraff","es":"jirafa","it":"giraffa","pt":"girafa","fr":"girafe","fi":"kirahvi"},"animals/whale":{"en":"whale","de":"Wal","nl":"walvis","da":"hval","sv":"val","no":"hval","es":"ballena","it":"balena","pt":"baleia","fr":"baleine","fi":"valas"},"beach/crab":{"en":"crab","de":"Krabbe","nl":"krab","da":"krabbe","sv":"krabba","no":"krabbe","es":"cangrejo","it":"granchio","pt":"caranguejo","fr":"crabe","fi":"rapu"},"beach/lighthouse":{"en":"lighthouse","de":"Leuchtturm","nl":"vuurtoren","da":"fyrtårn","sv":"fyr","no":"fyrtårn","es":"faro","it":"faro","pt":"farol","fr":"phare","fi":"majakka"},"camping/moon":{"en":"moon","de":"Mond","nl":"maan","da":"måne","sv":"måne","no":"måne","es":"luna","it":"luna","pt":"lua","fr":"lune","fi":"kuu"},"christmas/star":{"en":"star","de":"Stern","nl":"ster","da":"stjerne","sv":"stjärna","no":"stjerne","es":"estrella","it":"stella","pt":"estrela","fr":"étoile","fi":"tähti"},"farm animals/cow":{"en":"cow","de":"Kuh","nl":"koe","da":"ko","sv":"ko","no":"ku","es":"vaca","it":"mucca","pt":"vaca","fr":"vache","fi":"lehmä"},"farm animals/duck":{"en":"duck","de":"Ente","nl":"eend","da":"and","sv":"anka","no":"and","es":"pato","it":"anatra","pt":"pato","fr":"canard","fi":"ankka"},"farm animals/pig":{"en":"pig","de":"Schwein","nl":"varken","da":"gris","sv":"gris","no":"gris","es":"cerdo","it":"maiale","pt":"porco","fr":"cochon","fi":"sika"},"flowers/sunflower":{"en":"sunflower","de":"Sonnenblume","nl":"zonnebloem","da":"solsikke","sv":"solros","no":"solsikke","es":"girasol","it":"girasole","pt":"girassol","fr":"tournesol","fi":"auringonkukka"},"forest creatures/owl":{"en":"owl","de":"Eule","nl":"uil","da":"ugle","sv":"uggla","no":"ugle","es":"búho","it":"gufo","pt":"coruja","fr":"hibou","fi":"pöllö"},"furniture/bed":{"en":"bed","de":"Bett","nl":"bed","da":"seng","sv":"säng","no":"seng","es":"cama","it":"letto","pt":"cama","fr":"lit","fi":"sänky"},"miscellaneous/house":{"en":"house","de":"Haus","nl":"huis","da":"hus","sv":"hus","no":"hus","es":"casa","it":"casa","pt":"casa","fr":"maison","fi":"talo"},"occupations/artist":{"en":"artist","de":"Künstler","nl":"kunstenaar","da":"kunstner","sv":"konstnär","no":"kunstner","es":"artista","it":"artista","pt":"artista","fr":"artiste","fi":"taiteilija"},"ocean life/dolphin":{"en":"dolphin","de":"Delfin","nl":"dolfijn","da":"delfin","sv":"delfin","no":"delfin","es":"delfín","it":"delfino","pt":"golfinho","fr":"dauphin","fi":"delfiini"},"ocean life/octopus":{"en":"octopus","de":"Oktopus","nl":"octopus","da":"blæksprutte","sv":"bläckfisk","no":"blekksprut","es":"pulpo","it":"polpo","pt":"polvo","fr":"pieuvre","fi":"mustekala"},"space/moon":{"en":"moon","de":"Mond","nl":"maan","da":"måne","sv":"måne","no":"måne","es":"luna","it":"luna","pt":"lua","fr":"lune","fi":"kuu"},"spring/bird":{"en":"bird","de":"Vogel","nl":"vogel","da":"fugl","sv":"fågel","no":"fugl","es":"pájaro","it":"uccello","pt":"pássaro","fr":"oiseau","fi":"lintu"},"spring/tulip":{"en":"tulip","de":"Tulpe","nl":"tulp","da":"tulipan","sv":"tulpan","no":"tulipan","es":"tulipán","it":"tulipano","pt":"tulipa","fr":"tulipe","fi":"tulppaani"},"toys/balloon":{"en":"balloon","de":"Ballon","nl":"ballon","da":"ballon","sv":"ballong","no":"ballong","es":"globo","it":"palloncino","pt":"balão","fr":"ballon","fi":"ilmapallo"},"toys/boat":{"en":"boat","de":"Boot","nl":"boot","da":"båd","sv":"båt","no":"båt","es":"bote","it":"barca","pt":"barco","fr":"bateau","fi":"vene"},"toys/kite":{"en":"kite","de":"Drachen","nl":"vlieger","da":"drage","sv":"drake","no":"drage","es":"papalote","it":"aquilone","pt":"pipa","fr":"cerf-volant","fi":"leija"},"tree/apple":{"en":"apple","de":"Apfel","nl":"appel","da":"æble","sv":"äpple","no":"eple","es":"manzana","it":"mela","pt":"maçã","fr":"pomme","fi":"omena"},"weather/rainbow":{"en":"rainbow","de":"Regenbogen","nl":"regenboog","da":"regnbue","sv":"regnbåge","no":"regnbue","es":"arcoíris","it":"arcobaleno","pt":"arco-íris","fr":"arc-en-ciel","fi":"sateenkaari"},"weather/rainy":{"en":"rainy","de":"Regnerisch","nl":"regenachtig","da":"regnfuldt","sv":"regnigt","no":"regnfullt","es":"lluvioso","it":"piovoso","pt":"chuvoso","fr":"pluvieux","fi":"sateinen"}};
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var JOBS = { '2': ['author', 'illustrator'], '3': ['author', 'illustrator', 'reader'] };
  /* each maker's ink: the author makes words, the illustrator makes pictures, the reader has no ink — she enjoys a finished page */
  var INK = { author: 'words', illustrator: 'picture', reader: 'none' };

  function locale(l) { l = String(l || 'en').slice(0, 2); return TEXT[l] ? l : 'en'; }
  function jobs(j) { return String(j) === '3' ? '3' : '2'; }
  function canFill(role, missing) { return INK[role] === missing; }

  /* ---------------- the rounds: one round = one book (its pages, then its cover) ---------------- */
  function rounds(loc, j) {
    loc = locale(loc); j = jobs(j);
    return ORDER.map(function (b) {
      var P = BOOKS[b].pages.filter(function (p) { return j === '3' || p[1] !== 'none'; });
      return { id: b + '-' + j, book: b, loc: loc, jobs: j, roles: JOBS[j].slice(), cover: BOOKS[b].pages[0][0],
        pages: P.map(function (p, i) { return { i: i, pic: p[0], missing: p[1], sentence: TEXT[loc].s[b][BOOKS[b].pages.indexOf(p)] }; }) };
    });
  }
  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function balanced(n, m, rnd) {
    for (var t = 0; t < 2000; t++) {
      var s = []; for (var i = 0; i < n; i++) s.push(i % m); shuffle(s, rnd);
      var ok = true; for (var q = 2; q < n && ok; q++) if (s[q] === s[q - 1] && s[q] === s[q - 2]) ok = false;
      if (ok) return s;
    }
    var f = []; for (var w = 0; w < n; w++) f.push(w % m); return f;
  }
  /* the deal of a pass, in PLAY order: the seat of the person who finishes page 1 is balanced over the seats and never the same three books
     running (so "the left desk" is never the habit answer); the other people fill the other seats; the cover's two credit slots swap sides
     half the books */
  function deal(pool, o, rnd) {
    var n = pool.length, roles = pool[0].roles, seat = balanced(n, roles.length, rnd), swaps = balanced(n, 2, rnd), out = new Array(n);
    for (var p = 0; p < n; p++) {
      var r = pool[o[p]], need = roleFor(r.pages[0].missing), rest = shuffle(roles.filter(function (x) { return x !== need; }), rnd), seats = [];
      for (var s = 0, k = 0; s < roles.length; s++) seats.push(s === seat[p] ? need : rest[k++]);
      out[o[p]] = { seats: seats, coverSwap: swaps[p] === 1 };
    }
    return out;
  }
  function roleFor(missing) { for (var k in INK) if (INK[k] === missing) return k; return null; }
  function order(pool, rnd, prev) { var idx = pool.map(function (_, i) { return i; }); for (var t = 0; t < 400; t++) { var o = shuffle(idx.slice(), rnd); if (prev && (prev.join() === o.join() || pool[prev[prev.length - 1]].book === pool[o[0]].book)) continue; return o; } return idx.reverse(); }

  /* ---------------- a book ---------------- */
  function newState(r, dl) {
    return { r: r, seats: (dl && dl.seats || r.roles).slice(), coverSwap: !!(dl && dl.coverSwap), page: 0, phase: 'page', cover: { words: null, picture: null }, sel: null, misses: 0, help: 0, show: false, last: null, done: false };
  }
  function current(st) { return st.phase === 'page' ? st.r.pages[st.page] : null; }
  /* hand the waiting page to a person: their ink lands where it can — the author's words, the illustrator's picture, the reader reads */
  function deliver(st, role) {
    var p = current(st);
    if (!p || st.done || st.r.roles.indexOf(role) < 0) return null;
    var ink = INK[role], res = { role: role, missing: p.missing, ok: canFill(role, p.missing) };
    if (role === 'reader') res.landed = p.missing === 'none' ? 'read' : 'gap';
    else if (p.missing === 'none') res.landed = 'hover';
    else res.landed = ink === p.missing ? (ink === 'words' ? 'lines' : 'box') : (ink === 'words' ? 'box' : 'lines');
    if (res.ok) {
      res.page = st.page; st.page++; st.misses = 0; st.help = 0; st.show = false; st.last = { reason: 'right', role: role };
      if (st.page >= st.r.pages.length) st.phase = 'cover';
      return res;
    }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true;
    st.last = { reason: role === 'reader' ? 'reader-gap' : p.missing === 'none' ? 'done-page' : role === 'author' ? 'author-box' : 'illus-lines', role: role };
    return res;
  }
  /* the cover: the author's portrait belongs on the words slot, the illustrator's on the picture slot */
  function placePortrait(st, role, slot) {
    if (st.phase !== 'cover' || st.done || (role !== 'author' && role !== 'illustrator') || (slot !== 'words' && slot !== 'picture')) return null;
    if (st.cover[slot] || st.cover.words === role || st.cover.picture === role) return null;
    if (INK[role] === slot) {
      st.cover[slot] = role; st.show = false; st.last = { reason: 'stamped', role: role };
      if (st.cover.words && st.cover.picture) { st.phase = 'done'; st.done = true; }
      return { ok: true };
    }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { reason: 'cover-' + role, role: role };
    return { ok: false, smear: role === 'illustrator' ? 'paint' : 'letters' };
  }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.reason;
    if (R === 'cover-author') return 'hintCoverAuthor';
    if (R === 'cover-illustrator') return 'hintCoverIllus';
    if (R === 'done-page') return 'hintDone';
    if (st.help >= 2) return 'hintLook';
    return R === 'author-box' ? 'hintAuthor' : R === 'illus-lines' ? 'hintIllus' : 'hintReader';
  }
  /* miss 2 on a page: the doors open and the empty half pulses in the shape of the missing mark */
  function helpOf(st) { if (st.done || st.phase !== 'page' || st.help < 2) return null; return { open: true, pulse: current(st).missing }; }
  function okKey(role) { return role === 'author' ? 'okAuthor' : role === 'illustrator' ? 'okIllus' : 'okReader'; }

  /* the stage: every library picture at its floor (96 at 704, 64 on a phone) */
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.unit = wide ? 96 : 64;
    L.person = wide ? 112 : 64;
    L.pageW = wide ? Math.min(360, W - 150) : W - 84;
    L.inky = wide ? 96 : 64;
    return L;
  }

  return {
    DATA: { BOOKS: BOOKS, ORDER: ORDER, TEXT: TEXT, LABELS: LABELS }, LOCALES: LOCALES, JOBS: JOBS, INK: INK, PEOPLE: PEOPLE, INKY: INKY,
    locale: locale, jobs: jobs, canFill: canFill, rounds: rounds, seeded: seeded, balanced: balanced, deal: deal, roleFor: roleFor, order: order,
    newState: newState, current: current, deliver: deliver, placePortrait: placePortrait, hint: hint, helpOf: helpOf, okKey: okKey, layout: layout
  };
}));
