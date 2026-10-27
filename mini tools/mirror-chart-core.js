/* =====================================================================
   mirror-chart-core.js — the model for ACTIVITY #130 of the one-by-one
   rebuild: "Word Doctor's Clinic" → THE MIRROR CHART (L.1.2.e; all 11
   locales).
   Design: docs/activities-rebuild/designs/130-word-clinic.md
   ---------------------------------------------------------------------
   The patient is a library picture. The child spells its name; the
   doctor's mirror shows only what the letters really spell: the right
   word shows the same picture and the patient is healed; another picture
   word shows THAT picture (cup for cap, Hand for Hund, pato for gato); a
   string that is no picture word leaves the mirror foggy. A plural patient
   (two pictures) is healed only by the plural — the singular shows one.
   · level 1 (fill): one sick sound box and a tray of three tiles, each
     wrong tile chosen so the mirror shows another picture or fog;
   · level 2 (write): the whole word, with the help the teacher picks
     (boxes, the first letter, a word bank, or a plain line);
   · level 3 (rule): one spelling rule per locale (ck/k, ç/c, qu/c, ç/ss,
     ch/c, ei/ij, double consonants, long vowels) — word-only rounds show
     the word itself on a clear mirror;
   · level 4 (plural): the singular is given, the child adds the ending.
   The mirror reads the page locale's picture vocabulary
   (mirror-chart-index.js: every noun picture's singular and plural label
   → one canonical picture). German nouns start with a capital.
   DATA is written by a build script. Pure and DOM-free; UMD
   (window.MirrorChartCore / require()).
   ===================================================================== */
(function (root, factory) {
  var idx = typeof module === 'object' && module.exports ? require('./mirror-chart-index.js') : root.MirrorChartIndex;
  var api = factory(idx);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MirrorChartCore = api;
})(typeof self !== 'undefined' ? self : this, function (INDEX) {
  'use strict';

  /*DATA-BEGIN*/var DATA = {"LOCALES":["en","de","fr","es","pt","it","nl","sv","da","no","fi"],"en":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"l1":[{"boxes":["c","a","p"],"sick":1,"tray":["a","u","o"]},{"boxes":["m","o","p"],"sick":1,"tray":["o","a","u"]},{"boxes":["p","e","n"],"sick":1,"tray":["e","a","i"]},{"boxes":["b","e","d"],"sick":1,"tray":["e","u","a"]},{"boxes":["m","u","g"],"sick":0,"tray":["m","j","h"]},{"boxes":["d","o","g"],"sick":0,"tray":["d","l","b"]},{"boxes":["s","o","ck"],"sick":1,"tray":["o","a","e"]},{"boxes":["b","e","ll"],"sick":1,"tray":["e","a","u"]},{"boxes":["sh","i","p"],"sick":0,"tray":["sh","s","ch"]},{"boxes":["c","oa","t"],"sick":1,"tray":["oa","a","o"]},{"boxes":["c","r","a","b"],"sick":2,"tray":["a","i","o"]},{"boxes":["s","k","ir","t"],"sick":2,"tray":["ir","ur","er"]}],"l2":["lamp","nest","vest","fish","jug","drum","boat","flag","frog","duck","sun","fox"],"l3":{"unit":"ck · k","rounds":[{"boxes":["d","u","ck"],"sick":2,"tray":["ck","k"]},{"boxes":["s","o","ck"],"sick":2,"tray":["ck","k"]},{"boxes":["t","r","u","ck"],"sick":3,"tray":["ck","k"]},{"boxes":["ch","i","ck"],"sick":2,"tray":["ck","k"]},{"boxes":["d","e","s","k"],"sick":3,"tray":["k","ck"]},{"boxes":["f","or","k"],"sick":2,"tray":["k","ck"]},{"boxes":["m","i","l","k"],"sick":3,"tray":["k","ck"]},{"boxes":["c","a","k","e"],"sick":2,"tray":["k","ck"]}]},"l4":[{"sg":"cat","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"ies","drop":1}]},{"sg":"dog","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"","drop":0}]},{"sg":"hen","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"ies","drop":1}]},{"sg":"fox","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"ies","drop":1}]},{"sg":"bus","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"ies","drop":1}]},{"sg":"watch","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"","drop":0}]},{"sg":"cherry","tiles":[{"t":"ies","drop":1},{"t":"s","drop":0},{"t":"es","drop":0}]},{"sg":"bench","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"ies","drop":1}]}]},"de":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ä","ö","ü","ß"],"l1":[{"boxes":["H","u","n","d"],"sick":1,"tray":["u","a","o"]},{"boxes":["M","au","s"],"sick":1,"tray":["au","ai","ei"]},{"boxes":["F","i","sch"],"sick":0,"tray":["F","T","K"]},{"boxes":["T","o","pf"],"sick":0,"tray":["T","K","W"]},{"boxes":["H","o","s","e"],"sick":0,"tray":["H","R","D"]},{"boxes":["V","a","s","e"],"sick":0,"tray":["V","N","W"]},{"boxes":["G","l","a","s"],"sick":1,"tray":["l","r","n"]},{"boxes":["H","uh","n"],"sick":1,"tray":["uh","ah","oh"]},{"boxes":["Z","ah","n"],"sick":1,"tray":["ah","au","oh"]},{"boxes":["B","ie","n","e"],"sick":1,"tray":["ie","i","ei"]},{"boxes":["Sch","a","f"],"sick":2,"tray":["f","l","t"]},{"boxes":["M","o","n","d"],"sick":1,"tray":["o","u","a"]}],"l2":["Rose","Nase","Haus","Hut","Sofa","Nest","Auto","Esel","Ente","Brot","Igel","Lama"],"l3":{"unit":"ck · k","rounds":[{"boxes":["S","o","ck","e"],"sick":2,"tray":["ck","k"]},{"boxes":["J","a","ck","e"],"sick":2,"tray":["ck","k"]},{"boxes":["R","o","ck"],"sick":2,"tray":["ck","k"]},{"boxes":["G","l","o","ck","e"],"sick":3,"tray":["ck","k"]},{"boxes":["Sch","au","k","e","l"],"sick":2,"tray":["k","ck"]},{"boxes":["B","a","n","k"],"sick":3,"tray":["k","ck"]},{"boxes":["Sch","r","a","n","k"],"sick":4,"tray":["k","ck"]},{"boxes":["P","au","k","e"],"sick":2,"tray":["k","ck"]}]},"l4":[{"sg":"Hund","tiles":[{"t":"e","drop":0},{"t":"er","drop":0},{"t":"ern","drop":0}]},{"sg":"Schaf","tiles":[{"t":"e","drop":0},{"t":"er","drop":0},{"t":"","drop":0}]},{"sg":"Bett","tiles":[{"t":"en","drop":0},{"t":"er","drop":0},{"t":"ern","drop":0}]},{"sg":"Katze","tiles":[{"t":"n","drop":0},{"t":"en","drop":0},{"t":"s","drop":0}]},{"sg":"Ente","tiles":[{"t":"n","drop":0},{"t":"e","drop":0},{"t":"s","drop":0}]},{"sg":"Auto","tiles":[{"t":"s","drop":0},{"t":"e","drop":0},{"t":"","drop":0}]},{"sg":"Sofa","tiles":[{"t":"s","drop":0},{"t":"en","drop":0},{"t":"e","drop":0}]},{"sg":"Hose","tiles":[{"t":"n","drop":0},{"t":"e","drop":0},{"t":"s","drop":0}]}]},"fr":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","é","è","ê","à","â","ç","î","ô","û","œ"],"l1":[{"boxes":["l","u","ne"],"sick":2,"tray":["ne","ge","me"]},{"boxes":["r","o","be"],"sick":2,"tray":["be","se","pe"]},{"boxes":["s","a","c"],"sick":0,"tray":["s","l","b"]},{"boxes":["b","u","s"],"sick":0,"tray":["b","j","m"]},{"boxes":["p","ain"],"sick":0,"tray":["p","m","b"]},{"boxes":["ch","ou"],"sick":0,"tray":["ch","cl","j"]},{"boxes":["v","eau"],"sick":0,"tray":["v","s","b"]},{"boxes":["t","a","b","le"],"sick":0,"tray":["t","s","c"]},{"boxes":["c","a","r","te"],"sick":0,"tray":["c","t","p"]},{"boxes":["g","â","t","eau"],"sick":0,"tray":["g","r","p"]},{"boxes":["b","ou","che"],"sick":0,"tray":["b","l","f"]},{"boxes":["v","e","rre"],"sick":0,"tray":["v","t","p"]}],"l2":["moto","lama","vache","tomate","vélo","lion","ours","banane","pomme","tasse","livre","lapin"],"l3":{"unit":"c · ç","rounds":[{"boxes":["g","a","r","ç","on"],"sick":3,"tray":["ç","c"]},{"boxes":["g","l","a","ç","on"],"sick":3,"tray":["ç","c"]},{"boxes":["l","e","ç","on"],"sick":2,"tray":["ç","c"]},{"boxes":["m","a","ç","on"],"sick":2,"tray":["ç","c"]},{"boxes":["c","i","t","r","on"],"sick":0,"tray":["c","ç"]},{"boxes":["c","e","r","i","s","e"],"sick":0,"tray":["c","ç"]},{"boxes":["c","y","g","n","e"],"sick":0,"tray":["c","ç"]},{"boxes":["c","i","el"],"sick":0,"tray":["c","ç"]}]},"l4":[{"sg":"chat","tiles":[{"t":"s","drop":0},{"t":"x","drop":0},{"t":"es","drop":0}]},{"sg":"lit","tiles":[{"t":"s","drop":0},{"t":"x","drop":0},{"t":"","drop":0}]},{"sg":"gâteau","tiles":[{"t":"x","drop":0},{"t":"s","drop":0},{"t":"es","drop":0}]},{"sg":"bateau","tiles":[{"t":"x","drop":0},{"t":"s","drop":0},{"t":"es","drop":0}]},{"sg":"seau","tiles":[{"t":"x","drop":0},{"t":"s","drop":0},{"t":"es","drop":0}]},{"sg":"nid","tiles":[{"t":"s","drop":0},{"t":"x","drop":0},{"t":"","drop":0}]},{"sg":"robe","tiles":[{"t":"s","drop":0},{"t":"x","drop":0},{"t":"es","drop":0}]},{"sg":"oiseau","tiles":[{"t":"x","drop":0},{"t":"s","drop":0},{"t":"es","drop":0}]}]},"es":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z","á","é","í","ó","ú"],"l1":[{"boxes":["g","a","t","o"],"sick":0,"tray":["g","p","r"]},{"boxes":["l","u","n","a"],"sick":0,"tray":["l","c","m"]},{"boxes":["m","a","n","o"],"sick":1,"tray":["a","o","e"]},{"boxes":["f","o","c","a"],"sick":0,"tray":["f","b","r"]},{"boxes":["c","a","s","a"],"sick":2,"tray":["s","m","p"]},{"boxes":["o","s","o"],"sick":1,"tray":["s","j","l"]},{"boxes":["s","o","l"],"sick":1,"tray":["o","a","e"]},{"boxes":["n","i","ñ","a"],"sick":0,"tray":["n","p","l"]},{"boxes":["t","o","r","o"],"sick":0,"tray":["t","l","m"]},{"boxes":["c","a","b","r","a"],"sick":1,"tray":["a","o","e"]},{"boxes":["b","a","r","c","o"],"sick":2,"tray":["r","n","l"]},{"boxes":["g","o","rr","o"],"sick":0,"tray":["g","z","c"]}],"l2":["mesa","pato","pera","rana","pelota","mapa","pala","mono","dedo","tren","foca","loro"],"l3":{"unit":"c · qu","rounds":[{"boxes":["qu","e","s","o"],"sick":0,"tray":["qu","c"]},{"boxes":["m","o","s","qu","i","t","o"],"sick":3,"tray":["qu","c"]},{"boxes":["r","a","qu","e","t","a"],"sick":2,"tray":["qu","c"]},{"boxes":["e","s","qu","í"],"sick":2,"tray":["qu","c"]},{"boxes":["c","o","n","e","j","o"],"sick":0,"tray":["c","qu"]},{"boxes":["c","a","s","a"],"sick":0,"tray":["c","qu"]},{"boxes":["c","u","n","a"],"sick":0,"tray":["c","qu"]},{"boxes":["c","o","p","a"],"sick":0,"tray":["c","qu"]}]},"l4":[{"sg":"gato","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"z","drop":0}]},{"sg":"mesa","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"","drop":0}]},{"sg":"flor","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"z","drop":0}]},{"sg":"tren","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"z","drop":0}]},{"sg":"pan","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"z","drop":0}]},{"sg":"pato","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"","drop":0}]},{"sg":"sol","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"z","drop":0}]},{"sg":"luna","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"z","drop":0}]}]},"pt":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ç","ã","õ","á","é","í","ó","ú","â","ê","ô"],"l1":[{"boxes":["g","a","t","o"],"sick":0,"tray":["g","p","r"]},{"boxes":["v","a","c","a"],"sick":0,"tray":["v","f","m"]},{"boxes":["b","o","c","a"],"sick":0,"tray":["b","f","t"]},{"boxes":["p","ão"],"sick":0,"tray":["p","m","l"]},{"boxes":["m","e","s","a"],"sick":2,"tray":["s","i","l"]},{"boxes":["c","a","m","a"],"sick":2,"tray":["m","s","p"]},{"boxes":["d","e","n","t","e"],"sick":0,"tray":["d","p","m"]},{"boxes":["p","o","r","t","a"],"sick":0,"tray":["p","t","c"]},{"boxes":["b","o","l","o"],"sick":3,"tray":["o","a","e"]},{"boxes":["s","a","l"],"sick":1,"tray":["a","o","e"]},{"boxes":["j","a","n","e","l","a"],"sick":0,"tray":["j","p","v"]},{"boxes":["a","lh","o"],"sick":0,"tray":["a","o","e"]}],"l2":["lobo","bola","pato","galo","pipa","garfo","livro","leite","cama","flor","urso","balde"],"l3":{"unit":"r · rr","rounds":[{"boxes":["c","a","rr","o"],"sick":2,"tray":["rr","r"]},{"boxes":["c","a","ch","o","rr","o"],"sick":4,"tray":["rr","r"]},{"boxes":["g","o","rr","o"],"sick":2,"tray":["rr","r"]},{"boxes":["b","u","rr","o"],"sick":2,"tray":["rr","r"]},{"boxes":["p","e","r","a"],"sick":2,"tray":["r","rr"]},{"boxes":["a","r","a","r","a"],"sick":3,"tray":["r","rr"]},{"boxes":["c","o","r","o","a"],"sick":2,"tray":["r","rr"]},{"boxes":["g","i","r","a","f","a"],"sick":2,"tray":["r","rr"]}]},"l4":[{"sg":"gato","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"z","drop":0}]},{"sg":"pato","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"","drop":0}]},{"sg":"bola","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"z","drop":0}]},{"sg":"mesa","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"z","drop":0}]},{"sg":"flor","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"z","drop":0}]},{"sg":"colher","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"","drop":0}]},{"sg":"colar","tiles":[{"t":"es","drop":0},{"t":"s","drop":0},{"t":"z","drop":0}]},{"sg":"raposa","tiles":[{"t":"s","drop":0},{"t":"es","drop":0},{"t":"z","drop":0}]}]},"it":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","à","è","é","ì","ò","ù"],"l1":[{"boxes":["c","a","n","e"],"sick":0,"tray":["c","p","m"]},{"boxes":["n","a","s","o"],"sick":0,"tray":["n","v","c"]},{"boxes":["t","o","r","o"],"sick":2,"tray":["r","p","l"]},{"boxes":["m","u","cc","a"],"sick":0,"tray":["m","z","b"]},{"boxes":["p","o","r","t","a"],"sick":0,"tray":["p","t","c"]},{"boxes":["s","o","l","e"],"sick":1,"tray":["o","a","e"]},{"boxes":["t","a","zz","a"],"sick":0,"tray":["t","g","p"]},{"boxes":["v","a","s","o"],"sick":1,"tray":["a","i","e"]},{"boxes":["c","o","ll","a"],"sick":1,"tray":["o","u","a"]},{"boxes":["t","e","n","d","a"],"sick":0,"tray":["t","b","m"]},{"boxes":["s","a","cc","o"],"sick":1,"tray":["a","u","o"]},{"boxes":["c","e","r","v","o"],"sick":1,"tray":["e","o","a"]}],"l2":["gatto","rana","mela","pera","luna","nave","treno","palla","libro","dito","sedia","rosa"],"l3":{"unit":"c · ch","rounds":[{"boxes":["ch","i","a","v","e"],"sick":0,"tray":["ch","c"]},{"boxes":["f","o","r","ch","e","tt","a"],"sick":3,"tray":["ch","c"]},{"boxes":["p","e","s","ch","e"],"sick":3,"tray":["ch","c"]},{"boxes":["ch","i","t","a","rr","a"],"sick":0,"tray":["ch","c"]},{"boxes":["c","e","n","a"],"sick":0,"tray":["c","ch"]},{"boxes":["c","i","e","l","o"],"sick":0,"tray":["c","ch"]},{"boxes":["c","i","p","o","ll","a"],"sick":0,"tray":["c","ch"]},{"boxes":["c","i","n","e","m","a"],"sick":0,"tray":["c","ch"]}]},"l4":[{"sg":"treno","tiles":[{"t":"i","drop":1},{"t":"e","drop":1},{"t":"a","drop":1}]},{"sg":"palla","tiles":[{"t":"e","drop":1},{"t":"i","drop":1},{"t":"","drop":0}]},{"sg":"mela","tiles":[{"t":"e","drop":1},{"t":"i","drop":1},{"t":"a","drop":1}]},{"sg":"cane","tiles":[{"t":"i","drop":1},{"t":"e","drop":1},{"t":"a","drop":1}]},{"sg":"pera","tiles":[{"t":"e","drop":1},{"t":"i","drop":1},{"t":"a","drop":1}]},{"sg":"libro","tiles":[{"t":"i","drop":1},{"t":"e","drop":1},{"t":"","drop":0}]},{"sg":"vaso","tiles":[{"t":"i","drop":1},{"t":"e","drop":1},{"t":"a","drop":1}]},{"sg":"rana","tiles":[{"t":"e","drop":1},{"t":"i","drop":1},{"t":"a","drop":1}]}]},"nl":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],"l1":[{"boxes":["k","a","t"],"sick":2,"tray":["t","m","n"]},{"boxes":["v","i","s"],"sick":1,"tray":["i","o","e"]},{"boxes":["h","o","n","d"],"sick":1,"tray":["o","a","e"]},{"boxes":["p","e","n"],"sick":1,"tray":["e","a","i"]},{"boxes":["j","a","s"],"sick":0,"tray":["j","t","d"]},{"boxes":["l","a","m"],"sick":0,"tray":["l","k","j"]},{"boxes":["s","o","k"],"sick":0,"tray":["s","r","m"]},{"boxes":["v","e","s","t"],"sick":0,"tray":["v","n","b"]},{"boxes":["g","l","a","s"],"sick":1,"tray":["l","r","p"]},{"boxes":["b","oo","t"],"sick":1,"tray":["oo","ou","eu"]},{"boxes":["t","a","f","e","l"],"sick":0,"tray":["t","w","k"]},{"boxes":["k","aa","s"],"sick":0,"tray":["k","v","b"]}],"l2":["bal","zon","boot","kat","kip","koe","muis","pop","raket","slak","maan","vork"],"l3":{"unit":"d · t","rounds":[{"boxes":["h","o","n","d"],"sick":3,"tray":["d","t"]},{"boxes":["h","a","n","d"],"sick":3,"tray":["d","t"]},{"boxes":["p","aa","r","d"],"sick":3,"tray":["d","t"]},{"boxes":["h","oe","d"],"sick":2,"tray":["d","t"]},{"boxes":["k","a","t"],"sick":2,"tray":["t","d"]},{"boxes":["g","ei","t"],"sick":2,"tray":["t","d"]},{"boxes":["b","oo","t"],"sick":2,"tray":["t","d"]},{"boxes":["f","ie","t","s"],"sick":2,"tray":["t","d"]}]},"l4":[{"sg":"hond","tiles":[{"t":"en","drop":0},{"t":"s","drop":0},{"t":"n","drop":0}]},{"sg":"boek","tiles":[{"t":"en","drop":0},{"t":"s","drop":0},{"t":"","drop":0}]},{"sg":"eend","tiles":[{"t":"en","drop":0},{"t":"s","drop":0},{"t":"n","drop":0}]},{"sg":"kikker","tiles":[{"t":"s","drop":0},{"t":"en","drop":0},{"t":"n","drop":0}]},{"sg":"lepel","tiles":[{"t":"s","drop":0},{"t":"en","drop":0},{"t":"n","drop":0}]},{"sg":"tafel","tiles":[{"t":"s","drop":0},{"t":"en","drop":0},{"t":"","drop":0}]},{"sg":"vork","tiles":[{"t":"en","drop":0},{"t":"s","drop":0},{"t":"n","drop":0}]},{"sg":"geit","tiles":[{"t":"en","drop":0},{"t":"s","drop":0},{"t":"n","drop":0}]}]},"sv":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","å","ä","ö"],"l1":[{"boxes":["k","a","tt"],"sick":0,"tray":["k","h","m"]},{"boxes":["h","u","n","d"],"sick":1,"tray":["u","a","o"]},{"boxes":["h","ä","s","t"],"sick":0,"tray":["h","v","b"]},{"boxes":["g","å","s"],"sick":0,"tray":["g","l","p"]},{"boxes":["k","o","pp"],"sick":0,"tray":["k","m","t"]},{"boxes":["m","u","s"],"sick":2,"tray":["s","n","l"]},{"boxes":["s","o","l"],"sick":1,"tray":["o","ä","a"]},{"boxes":["r","i","s"],"sick":1,"tray":["i","o","e"]},{"boxes":["b","a","n","d"],"sick":0,"tray":["b","t","s"]},{"boxes":["l","ö","k"],"sick":2,"tray":["k","v","t"]},{"boxes":["sk","å","l"],"sick":2,"tray":["l","p","t"]},{"boxes":["p","a","j"],"sick":0,"tray":["p","h","k"]}],"l2":["boll","båt","buss","fisk","gris","hatt","kam","lampa","måne","säng","sko","tåg"],"l3":{"unit":"enkel · dubbel","rounds":[{"boxes":["k","a","tt"],"sick":2,"tray":["tt","t"]},{"boxes":["h","a","tt"],"sick":2,"tray":["tt","t"]},{"boxes":["b","o","ll"],"sick":2,"tray":["ll","l"]},{"boxes":["k","o","pp"],"sick":2,"tray":["pp","p"]},{"boxes":["g","r","i","s"],"sick":3,"tray":["s","ss"]},{"boxes":["r","o","s"],"sick":2,"tray":["s","ss"]},{"boxes":["s","o","l"],"sick":2,"tray":["l","ll"]},{"boxes":["l","ö","k"],"sick":2,"tray":["k","kk"]}]},"l4":[{"sg":"katt","tiles":[{"t":"er","drop":0},{"t":"ar","drop":0},{"t":"or","drop":0}]},{"sg":"hund","tiles":[{"t":"ar","drop":0},{"t":"er","drop":0},{"t":"","drop":0}]},{"sg":"bil","tiles":[{"t":"ar","drop":0},{"t":"er","drop":0},{"t":"or","drop":0}]},{"sg":"gris","tiles":[{"t":"ar","drop":0},{"t":"er","drop":0},{"t":"or","drop":0}]},{"sg":"boll","tiles":[{"t":"ar","drop":0},{"t":"er","drop":0},{"t":"or","drop":0}]},{"sg":"kopp","tiles":[{"t":"ar","drop":0},{"t":"er","drop":0},{"t":"","drop":0}]},{"sg":"sol","tiles":[{"t":"ar","drop":0},{"t":"er","drop":0},{"t":"or","drop":0}]},{"sg":"blomma","tiles":[{"t":"or","drop":1},{"t":"ar","drop":1},{"t":"er","drop":1}]}]},"da":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","æ","ø","å"],"l1":[{"boxes":["k","a","t"],"sick":0,"tray":["k","h","m"]},{"boxes":["h","u","nd"],"sick":1,"tray":["u","å","o"]},{"boxes":["h","e","s","t"],"sick":0,"tray":["h","v","b"]},{"boxes":["g","å","s"],"sick":0,"tray":["g","l","p"]},{"boxes":["m","u","s"],"sick":0,"tray":["m","b","h"]},{"boxes":["s","o","l"],"sick":1,"tray":["o","æ","a"]},{"boxes":["t","o","g"],"sick":0,"tray":["t","b","s"]},{"boxes":["k","o","p"],"sick":2,"tray":["p","k","t"]},{"boxes":["p","o","s","e"],"sick":0,"tray":["p","r","b"]},{"boxes":["v","a","nd"],"sick":0,"tray":["v","t","s"]},{"boxes":["j","a","kk","e"],"sick":0,"tray":["j","p","b"]},{"boxes":["sk","i","b"],"sick":1,"tray":["i","a","o"]}],"l2":["hus","sol","bus","fisk","gris","hat","kam","lampe","måne","seng","sko","bil"],"l3":{"unit":"enkelt · dobbelt","rounds":[{"boxes":["k","a","pp","e"],"sick":2,"tray":["pp","p"]},{"boxes":["j","a","kk","e"],"sick":2,"tray":["kk","k"]},{"boxes":["d","u","kk","e"],"sick":2,"tray":["kk","k"]},{"boxes":["b","o","ll","e"],"sick":2,"tray":["ll","l"]},{"boxes":["h","a","n","e"],"sick":2,"tray":["n","nn"]},{"boxes":["r","o","s","e"],"sick":2,"tray":["s","ss"]},{"boxes":["p","o","s","e"],"sick":2,"tray":["s","ss"]},{"boxes":["v","a","s","e"],"sick":2,"tray":["s","ss"]}]},"l4":[{"sg":"hund","tiles":[{"t":"e","drop":0},{"t":"er","drop":0},{"t":"r","drop":0}]},{"sg":"hest","tiles":[{"t":"e","drop":0},{"t":"er","drop":0},{"t":"","drop":0}]},{"sg":"bord","tiles":[{"t":"e","drop":0},{"t":"er","drop":0},{"t":"r","drop":0}]},{"sg":"stol","tiles":[{"t":"e","drop":0},{"t":"er","drop":0},{"t":"r","drop":0}]},{"sg":"bil","tiles":[{"t":"er","drop":0},{"t":"e","drop":0},{"t":"r","drop":0}]},{"sg":"lampe","tiles":[{"t":"r","drop":0},{"t":"er","drop":0},{"t":"","drop":0}]},{"sg":"rose","tiles":[{"t":"r","drop":0},{"t":"er","drop":0},{"t":"e","drop":0}]},{"sg":"jakke","tiles":[{"t":"r","drop":0},{"t":"er","drop":0},{"t":"e","drop":0}]}]},"no":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","æ","ø","å"],"l1":[{"boxes":["k","a","tt"],"sick":0,"tray":["k","h","m"]},{"boxes":["h","u","n","d"],"sick":1,"tray":["u","å","o"]},{"boxes":["h","e","s","t"],"sick":0,"tray":["h","v","b"]},{"boxes":["g","å","s"],"sick":0,"tray":["g","l","p"]},{"boxes":["m","u","s"],"sick":0,"tray":["m","h","b"]},{"boxes":["s","o","l"],"sick":1,"tray":["o","e","a"]},{"boxes":["k","o","pp"],"sick":0,"tray":["k","m","t"]},{"boxes":["p","o","s","e"],"sick":0,"tray":["p","r","b"]},{"boxes":["sk","i","p"],"sick":1,"tray":["i","a","o"]},{"boxes":["t","a","nn"],"sick":0,"tray":["t","v","b"]},{"boxes":["j","a","kk","e"],"sick":0,"tray":["j","p","b"]},{"boxes":["k","a","k","e"],"sick":0,"tray":["k","r","n"]}],"l2":["ball","båt","buss","fisk","gris","hatt","kam","lampe","måne","seng","sko","tog"],"l3":{"unit":"enkel · dobbel","rounds":[{"boxes":["k","a","tt"],"sick":2,"tray":["tt","t"]},{"boxes":["h","a","tt"],"sick":2,"tray":["tt","t"]},{"boxes":["k","o","pp"],"sick":2,"tray":["pp","p"]},{"boxes":["b","a","ll"],"sick":2,"tray":["ll","l"]},{"boxes":["s","o","l"],"sick":2,"tray":["l","ll"]},{"boxes":["b","i","l"],"sick":2,"tray":["l","ll"]},{"boxes":["m","u","s"],"sick":2,"tray":["s","ss"]},{"boxes":["r","i","s"],"sick":2,"tray":["s","ss"]}]},"l4":[{"sg":"hund","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"r","drop":0}]},{"sg":"bil","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"","drop":0}]},{"sg":"katt","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"r","drop":0}]},{"sg":"hest","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"r","drop":0}]},{"sg":"stol","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"r","drop":0}]},{"sg":"lampe","tiles":[{"t":"r","drop":0},{"t":"er","drop":0},{"t":"","drop":0}]},{"sg":"fisk","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"r","drop":0}]},{"sg":"sol","tiles":[{"t":"er","drop":0},{"t":"or","drop":0},{"t":"r","drop":0}]}]},"fi":{"keys":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ä","ö"],"l1":[{"boxes":["k","a","l","a"],"sick":2,"tray":["l","n","s"]},{"boxes":["j","u","n","a"],"sick":0,"tray":["j","m","k"]},{"boxes":["k","uu"],"sick":0,"tray":["k","s","n"]},{"boxes":["p","a","ll","o"],"sick":1,"tray":["a","u","o"]},{"boxes":["l","a","s","i"],"sick":0,"tray":["l","a","m"]},{"boxes":["m","a","tt","o"],"sick":2,"tray":["tt","ss","kk"]},{"boxes":["k","u","kk","o"],"sick":0,"tray":["k","l","p"]},{"boxes":["m","u","k","i"],"sick":1,"tray":["u","a","o"]},{"boxes":["t","a","kk","i"],"sick":2,"tray":["kk","ks","tt"]},{"boxes":["s","u","kk","a"],"sick":0,"tray":["s","k","p"]},{"boxes":["k","a","nn","u"],"sick":0,"tray":["k","p","t"]},{"boxes":["m","e","kk","o"],"sick":0,"tray":["m","g","p"]}],"l2":["kissa","koira","auto","kala","pallo","juna","kirja","omena","leija","kenkä","kuppi","vene"],"l3":{"unit":"lyhyt · pitkä","rounds":[{"boxes":["k","u","kk","o"],"sick":2,"tray":["kk","k"]},{"boxes":["k","uu"],"sick":1,"tray":["uu","u"]},{"boxes":["t","a","kk","i"],"sick":2,"tray":["kk","k"]},{"boxes":["m","ö","kk","i"],"sick":2,"tray":["kk","k"]},{"boxes":["k","a","l","a"],"sick":2,"tray":["l","ll"]},{"boxes":["s","i","k","a"],"sick":2,"tray":["k","kk"]},{"boxes":["m","u","n","a"],"sick":2,"tray":["n","nn"]},{"boxes":["j","uu","s","t","o"],"sick":1,"tray":["uu","u"]}]},"l4":[{"sg":"kissa","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"tt","drop":0}]},{"sg":"koira","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"","drop":0}]},{"sg":"auto","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"tt","drop":0}]},{"sg":"kala","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"tt","drop":0}]},{"sg":"pallo","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"tt","drop":0}]},{"sg":"juna","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"","drop":0}]},{"sg":"kirja","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"tt","drop":0}]},{"sg":"omena","tiles":[{"t":"t","drop":0},{"t":"at","drop":0},{"t":"tt","drop":0}]}]}};/*DATA-END*/

  var KINDS = { '1': 'fill', '2': 'write', '3': 'rule', '4': 'plural' };
  var HELPS = ['all', 'boxfirst', 'boxbank', 'first', 'bank', 'line'];
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return DATA.LOCALES && DATA.LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levels() { return ['1', '2', '3', '4']; }
  function levelOf(v) { v = String(v); return levels().indexOf(v) >= 0 ? v : '1'; }
  function helpOf(v) { return HELPS.indexOf(v) >= 0 ? v : 'all'; }
  function kind(lvl) { return KINDS[levelOf(lvl)]; }
  function rounds(lvl) { var n = { fill: 12, write: 12, rule: 8, plural: 8 }[kind(lvl)], a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function same(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  /* help modes: boxes or a line; the first letter given; a word bank instead of the keyboard */
  function helpParts(h) { h = helpOf(h); return { boxes: h === 'all' || h === 'boxfirst' || h === 'boxbank', first: h === 'all' || h === 'boxfirst' || h === 'first', bank: h === 'all' || h === 'boxbank' || h === 'bank' }; }

  /* ---------------- the mirror ---------------- */
  /* what a string spells: a picture (its canonical noun, and one or two of it), or nothing */
  function lookUp(loc, s) {
    loc = locale(loc); var r = INDEX && INDEX.words[loc] && INDEX.words[loc][String(s || '').toLowerCase()];
    return r ? { noun: r[0], pic: INDEX.nouns[r[0]], number: r[1] } : null;
  }

  /* ---------------- a round ---------------- */
  /* tray: the plan's order for the tiles (levels 1, 3, 4) or the bank (level 2) */
  function round(loc, lvl, r, tray, help) {
    loc = locale(loc); lvl = levelOf(lvl);
    var D = DATA[loc], k = kind(lvl), rd = { loc: loc, lvl: lvl, r: r, kind: k };
    if (k === 'fill' || k === 'rule') {
      var x = k === 'fill' ? D.l1[r] : D.l3.rounds[r];
      rd.boxes = x.boxes.slice(); rd.sick = x.sick; rd.tiles = x.tray.slice(); rd.right = 0;
      rd.target = x.boxes.join(''); rd.unit = k === 'rule' ? D.l3.unit : null;
    } else if (k === 'plural') {
      var y = D.l4[r];
      rd.sg = y.sg; rd.tiles = y.tiles.map(function (t) { return t.t + (t.drop ? '-' + t.drop : ''); }); rd.right = 0;
      rd.target = y.sg.slice(0, y.sg.length - y.tiles[0].drop) + y.tiles[0].t;
    } else {
      rd.target = D.l2[r]; rd.help = helpOf(help); rd.parts = helpParts(rd.help); rd.keys = D.keys.slice();
      rd.bank = bankFor(loc, r, rd.parts.boxes);
    }
    var m = lookUp(loc, rd.target); rd.pic = m ? m.pic : null; rd.number = k === 'plural' ? 1 : 0; rd.wordOnly = !m;
    if (tray && tray.length) rd.order = tray.slice(); else rd.order = (rd.kind === 'write' ? rd.bank : rd.tiles).map(function (_, i) { return i; });
    return rd;
  }
  /* level 2's word bank: the word and three others of the pool — with boxes, all the same length; one differs by one letter where the pool has one */
  function bankFor(loc, r, boxes) {
    var pool = DATA[loc].l2, w = pool[r], d1 = [], same = [], any = [];
    pool.forEach(function (v, i) { if (i === r) return; if (v.length === w.length) { if (dist(v, w) === 1) d1.push(v); else same.push(v); } else any.push(v); });
    var pick = d1.concat(same); if (!boxes) pick = pick.concat(any);
    var out = [w];
    for (var i = 0; i < pick.length && out.length < 4; i++) out.push(pick[i]);
    if (boxes && out.length < 4) { /* boxes need the same length: pad with the target's own one-letter changes that are no picture */
      var abc = DATA[loc].keys; for (var p = 1; p < w.length && out.length < 4; p++) for (var q = 0; q < abc.length && out.length < 4; q++) { var v2 = w.slice(0, p) + abc[q] + w.slice(p + 1); if (v2 !== w && out.indexOf(v2) < 0 && !lookUp(loc, v2) && /[aeiouyäöüåæøéèàáíóú]/i.test(abc[q]) === /[aeiouyäöüåæøéèàáíóú]/i.test(w[p])) out.push(v2); }
    }
    return out;
  }
  function dist(a, b) { if (a.length !== b.length) return 9; var d = 0; for (var i = 0; i < a.length; i++) if (a[i].toLowerCase() !== b[i].toLowerCase()) d++; return d; }

  /* ---------------- the state ---------------- */
  function newState(loc, lvl, r, tray, help) {
    var rd = round(loc, lvl, r, tray, help), st = { loc: rd.loc, lvl: rd.lvl, r: r, rd: rd, misses: 0, show: 0, last: null, reason: null, mirror: null, done: false };
    if (rd.kind === 'write') {
      st.letters = []; var n = rd.parts.boxes ? rd.target.length : 0;
      for (var i = 0; i < n; i++) st.letters.push(null);
      if (rd.parts.first) { if (rd.parts.boxes) st.letters[0] = rd.target.charAt(0); else st.letters = [rd.target.charAt(0)]; }
      st.given = rd.parts.first ? 1 : 0;
    } else st.tile = null;
    return st;
  }
  function moved(st) { st.last = null; st.reason = null; st.mirror = null; }
  /* levels 1, 3, 4: a tile into the sick box; the same tile again takes it out */
  function place(st, i) { var rd = st.rd; if (st.done || rd.kind === 'write' || i < 0 || i >= rd.tiles.length) return 'no'; moved(st); if (st.tile === i) { st.tile = null; return 'out'; } st.tile = i; return 'in'; }
  /* level 2: a key into the next empty box (or onto the line); back out of the last; a bank word fills it all */
  function type(st, ch) {
    var rd = st.rd; if (st.done || rd.kind !== 'write' || !ch) return 'no';
    if (rd.parts.boxes) { var i = st.letters.indexOf(null); if (i < 0) return 'full'; moved(st); st.letters[i] = ch; return 'in'; }
    if (st.letters.length >= 12) return 'full'; moved(st); st.letters.push(ch); return 'in';
  }
  function back(st) {
    var rd = st.rd; if (st.done || rd.kind !== 'write') return 'no';
    if (rd.parts.boxes) { for (var i = st.letters.length - 1; i >= st.given; i--) if (st.letters[i] != null) { moved(st); st.letters[i] = null; return 'out'; } return 'no'; }
    if (st.letters.length > st.given) { moved(st); st.letters.pop(); return 'out'; } return 'no';
  }
  function clearBox(st, i) { var rd = st.rd; if (st.done || rd.kind !== 'write' || !rd.parts.boxes || i < st.given || st.letters[i] == null) return 'no'; moved(st); st.letters[i] = null; return 'out'; }
  function bank(st, j) {
    var rd = st.rd; if (st.done || rd.kind !== 'write' || !rd.parts.bank || j < 0 || j >= rd.bank.length) return 'no';
    var w = rd.bank[j]; moved(st);
    st.letters = w.split(''); if (rd.parts.boxes) st.letters = st.letters.slice(0, rd.target.length);
    return 'in';
  }
  /* the word the child has spelled so far */
  function spelled(st) {
    var rd = st.rd;
    if (rd.kind === 'write') return st.letters.map(function (c) { return c == null ? '' : c; }).join('');
    if (st.tile == null) return null;
    if (rd.kind === 'plural') { var t = /^(.+)-(\d)$/.exec(rd.tiles[st.tile]); return t ? rd.sg.slice(0, rd.sg.length - +t[2]) + t[1] : rd.sg + rd.tiles[st.tile]; }
    var b = rd.boxes.slice(); b[rd.sick] = rd.tiles[st.tile]; return b.join('');
  }
  function complete(st) { var rd = st.rd; if (rd.kind !== 'write') return st.tile != null; return rd.parts.boxes ? st.letters.indexOf(null) < 0 : st.letters.length > st.given; }

  /* ---------------- the mirror reads ---------------- */
  function look(st) {
    var rd = st.rd, s = spelled(st), m = lookUp(st.loc, s), same = s != null && s.toLowerCase() === rd.target.toLowerCase();
    if (same && st.loc === 'de' && s.charAt(0) !== rd.target.charAt(0)) return { kind: 'capital', letters: s, pic: m ? m.pic : null, number: m ? m.number : 0 };
    if (same) return { kind: 'match', letters: s, pic: rd.pic, number: rd.number, word: rd.wordOnly };
    if (m && rd.kind === 'plural' && m.noun === lookUp(st.loc, rd.target).noun) return { kind: 'count', letters: s, pic: m.pic, number: m.number };
    if (m) return { kind: 'other', letters: s, pic: m.pic, number: m.number };
    return { kind: 'fog', letters: s };
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    if (!complete(st)) { st.last = 'empty'; return { result: 'empty' }; }
    var m = look(st); st.mirror = m;
    if (m.kind === 'match') { st.done = true; st.last = 'ok'; return { result: 'ok', mirror: m }; }
    st.misses++; st.show = Math.min(3, st.misses); st.last = 'miss'; st.reason = m.kind;
    return { result: 'miss', reason: m.kind, mirror: m };
  }
  var MISS = { other: 'missOther', fog: 'missFog', count: 'missCount', capital: 'missCapital' };
  function hint(st) {
    if (st.last === 'empty') return st.rd.kind === 'write' && !st.rd.parts.boxes ? 'hintLine' : 'hintEmpty';
    if (st.last !== 'miss') return null;
    if (st.show >= 2) return 'missGlow';
    return MISS[st.reason];
  }
  /* from miss 2: the boxes whose letter is wrong turn misty (levels 1, 3, 4: the sick box; level 2: every box that differs) */
  function misty(st) {
    if (st.done || st.last !== 'miss' || st.show < 2) return null;
    var rd = st.rd;
    if (rd.kind !== 'write') return [rd.kind === 'plural' ? 'end' : rd.sick];
    var out = [], t = rd.target; for (var i = 0; i < st.letters.length; i++) if (st.letters[i] == null || st.letters[i] !== t.charAt(i)) out.push(i);
    if (!rd.parts.boxes && st.letters.length > t.length) for (var j = t.length; j < st.letters.length; j++) if (out.indexOf(j) < 0) out.push(j);
    return out;
  }
  function okKey(st) { return st.rd.kind === 'plural' ? 'okPlural' : st.rd.wordOnly ? 'okWord' : 'okHealed'; }

  /* ---------------- the plan ---------------- */
  /* per pass: a fresh order; the right tile in every tray slot equally often (levels 1, 3, 4); level 2 a shuffled bank */
  function plan(loc, lvl, help, rnd, prev) {
    rnd = rnd || Math.random; loc = locale(loc); lvl = levelOf(lvl);
    var ids = rounds(lvl), o = null, k = kind(lvl);
    for (var a = 0; a < 200; a++) { var c = shuffle(ids, rnd); if (!same(c, prev)) { o = c; break; } }
    o = o || ids;
    var trays = {};
    if (k === 'write') { o.forEach(function (r) { var n = round(loc, lvl, r, null, help).bank.length, s = shuffle(ids.slice(0, n).map(function (_, i) { return i; }), rnd); trays[r] = s; }); return { order: o, trays: trays }; }
    var size = k === 'rule' ? 2 : 3, slots = shuffle(o.map(function (_, i) { return i % size; }), rnd);
    o.forEach(function (r, i) {
      var at = slots[i], others = shuffle(ids.slice(0, size).map(function (_, j) { return j; }).filter(function (j) { return j !== 0; }), rnd);
      trays[r] = others.slice(0, at).concat([0], others.slice(at));
    });
    return { order: o, trays: trays };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 340, xs: w < 300 }; }

  return {
    DATA: DATA, INDEX: INDEX, HELPS: HELPS, locale: locale, levels: levels, levelOf: levelOf, helpOf: helpOf, helpParts: helpParts, kind: kind, rounds: rounds,
    lookUp: lookUp, round: round, bankFor: bankFor, newState: newState, place: place, type: type, back: back, clearBox: clearBox, bank: bank,
    spelled: spelled, complete: complete, look: look, check: check, hint: hint, misty: misty, okKey: okKey, plan: plan, band: band
  };
});
