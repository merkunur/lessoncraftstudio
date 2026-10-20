/* =====================================================================
   rhyme-chain-core.js — the model of ACTIVITY #42 of the one-by-one
   rebuild: "Rosa Raccoon's Rhyme Wagon" → THE RHYME CHAIN (RF.K.2.a;
   K-232, K-352, G1-343, G1-344, G1-345).
   Design sheet: docs/activities-rebuild/designs/042-rhyme-shop.md
   ---------------------------------------------------------------------
   THE INVENTION: Rosa's wagon pulls a chain of rings, and a ring only
   closes on a ring whose word ends with the same SOUND. A rhyme is a link
   that holds; a word that does not rhyme springs its ring open and falls
   back onto the grass. The truth is the phonological rime key of each word
   (never its spelling: bear/ear share "-ear" and do not rhyme; snail/whale
   do), so the chain teaches the ear, not the eye.

   Seven kinds of round: JUDGE (rhyme or not), PICK (one of three), ODD
   (three of four rhyme), SORT (two chains), FINISH (Rosa's line ends in a
   blank), FIELD (every one that rhymes), CHAIN (a string of links).
   Every word equals its library picture's label in its own locale (the
   gate checks it against mini tools/pictures). Rhyme is per language and
   never translated: every locale has its own families.
   No DOM. UMD: window.RhymeChainCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RhymeChainCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  function loc(l) { return LOCALES.indexOf(l) >= 0 ? l : 'en'; }

  /* ---------------- the words: label, picture, rime key (by SOUND) ---------------- */
  function T(s) { var o = {}; s.split(';').forEach(function (e) { var p = e.split('|'); o[p[0].toLowerCase()] = { word: p[0], pic: p[1], rime: p[2] }; }); return o; }
  var WORDS = {
    en: T('snail|insects and bugs/snail|EYL;whale|ocean life/whale|EYL;nail|tools/nail|EYL;bear|forest creatures/bear|EHR;chair|around the house/chair|EHR;pear|fruits/pear|EHR;ear|body parts/ear|IYR;bee|insects and bugs/bee|IY;key|around the house/key|IY;pie|bakery/pie|AY;tie|accessories/tie|AY;cat|farm animals/cat|AT;hat|accessories/hat|AT;bat|animals/bat|AT;dog|farm animals/dog|OG;log|camping/log|OG;frog|camping/frog|OG;sun|beach/sun|UN;bus|vehicles/bus|US;boat|vehicles/boat|OAT;goat|farm animals/goat|OAT;coat|clothing/coat|OAT'),
    de: T('Maus|pets/mouse|AUS;Haus|miscellaneous/house|AUS;Fisch|ocean life/fish|ISCH;Tisch|around the house/table|ISCH;Hund|pets/dog|UND;Rose|flowers/rose|OSE;Hose|clothing/trousers|OSE;Schwein|farm animals/pig|EIN;Boot|vehicles/boat|OT;Hahn|farm animals/rooster|AHN;Zahn|body parts/tooth|AHN;Glocke|christmas/bell|OCKE;Socke|accessories/sock|OCKE;Pfanne|around the house/pan|ANNE;Badewanne|around the house/bathtub|ANNE;Kanne|kitchen tools/pitcher|ANNE'),
    fr: T('bateau|vehicles/boat|O;gâteau|desserts and sweets/cake|O;chapeau|accessories/hat|O;seau|toys/bucket|O;oiseau|spring/bird|O;râteau|around the house/rake|O;chat|farm animals/cat|A;poisson|animals/fish|ON;mouton|farm animals/sheep|ON;ballon|toys/ball|ON;cochon|farm animals/pig|ON;citron|fruits/lemon|ON;camion|vehicles/truck|ON;avion|vehicles/airplane|ON;maison|miscellaneous/house|ON;lune|space/moon|UNE;vache|farm animals/cow|ACHE;lapin|farm animals/rabbit|IN;pain|At the Supermarket/bread|IN;main|body parts/hand|IN;ours|forest creatures/bear|OURS;souris|forest creatures/mouse|I;trompette|music/trumpet|ETTE;fourchette|kitchen tools/fork|ETTE;chaussette|accessories/sock|ETTE'),
    es: T('Gato|animals/cat|ATO;Pato|animals/duck|ATO;Zapato|clothing/shoe|ATO;Oveja|animals/sheep|EJA;Camión|vehicles/bus|ON;Ratón|forest creatures/mouse|ON;León|zoo animals/lion|ON;Avión|Things That Fly/airplane|ON;Rosa|flowers/rose|OSA;Manzana|At the Supermarket/apple|ANA;Campana|christmas/bell|ANA;Estrella|christmas/star|ELLA;Galleta|At the Supermarket/cookie|ETA;Paleta|desserts and sweets/lollipop|ETA;Ardilla|camping/squirrel|ILLA'),
    pt: T('Baleia|ocean life/whale|EIA;Meia|accessories/sock|EIA;Gato|animals/cat|ATO;Pato|animals/duck|ATO;Sapato|clothing/shoe|ATO;Rato|forest creatures/mouse|ATO;Galo|farm animals/rooster|ALO;Rosa|flowers/rose|OSA;Abelha|insects and bugs/bee|ELHA;Orelha|body parts/ear|ELHA;Ovelha|animals/sheep|ELHA;Casa|miscellaneous/house|ASA;Mesa|around the house/table|ESA;Dente|body parts/tooth|ENTE;Panela|kitchen tools/pot|ELA;Janela|around the house/window|ELA;Peixe|ocean life/fish|EIXE;Limão|At the Supermarket/lemon|AO;Caminhão|vehicles/truck|AO;Balão|toys/balloon|AO;Avião|Things That Fly/airplane|AO;Chave|around the house/key|AVE'),
    it: T('Gatto|animals/cat|ATTO;Piatto|around the house/plate|ATTO;Limone|At the Supermarket/lemon|ONE;Melone|At the Supermarket/melon|ONE;Pavone|birds/peacock|ONE;Banana|At the Supermarket/banana|ANA;Rana|camping/frog|ANA;Delfino|animals/dolphin|INO;Pinguino|animals/penguin|INO;Calzino|accessories/sock|INO;Panino|bakery/bun|INO;Bambino|toys/baby|INO;Cestino|At the Supermarket/basket|INO;Pulcino|easter/chick|INO;Cappello|accessories/hat|ELLO;Martello|around the house/hammer|ELLO;Anello|accessories/ring|ELLO;Ombrello|accessories/umbrella|ELLO;Padella|around the house/pan|ELLA'),
    nl: T('Muis|forest creatures/mouse|UIS;Huis|miscellaneous/house|UIS;Beer|forest creatures/bear|EER;Peer|fruits/pear|EER;Hond|pets/dog|ONT;Kat|animals/cat|AT;Boot|vehicles/boat|OOT;Schoen|clothing/shoe|OEN;Meloen|At the Supermarket/melon|OEN;Citroen|At the Supermarket/lemon|OEN;Haan|farm animals/rooster|AAN;Banaan|At the Supermarket/banana|AAN;Bel|christmas/bell|EL;Sok|accessories/sock|OK;Vis|ocean life/fish|IS'),
    sv: T('katt|farm animals/cat|ATT;hatt|accessories/hat|ATT;hus|miscellaneous/house|US;mus|forest creatures/mouse|US;hund|farm animals/dog|UND;sol|beach/sun|OL;stol|around the house/chair|OL;bil|vehicles/car|IL;gris|farm animals/pig|IS;ko|farm animals/cow|O;sko|clothing/shoe|O;fisk|animals/fish|ISK;boll|toys/ball|OLL;hand|body parts/hand|AND;sand|summer/sand|AND;tand|body parts/tooth|AND;kopp|kitchen tools/cup|OPP;mopp|around the house/mop|OPP;knopp|spring/bud|OPP'),
    da: T('kat|farm animals/cat|AT;hat|accessories/hat|AT;hus|miscellaneous/house|US;mus|forest creatures/mouse|US;hund|farm animals/dog|UN;sol|beach/sun|OL;stol|around the house/chair|OL;bil|vehicles/car|IL;gris|farm animals/pig|IS;ko|farm animals/cow|O;sko|clothing/shoe|O;fisk|animals/fish|ISK;and|farm animals/duck|AN;sand|summer/sand|AN;tand|body parts/tooth|AN;spand|beach/bucket|AN;negl|body parts/nail|EJL;snegl|insects and bugs/snail|EJL'),
    no: T('katt|farm animals/cat|ATT;hatt|accessories/hat|ATT;hus|miscellaneous/house|US;mus|forest creatures/mouse|US;hund|farm animals/dog|UN;sol|beach/sun|OL;stol|around the house/chair|OL;bil|vehicles/car|IL;gris|farm animals/pig|IS;kake|bakery/cake|AKE;rake|around the house/rake|AKE;fisk|animals/fish|ISK;and|farm animals/duck|AN;sand|summer/sand|AN;tann|body parts/tooth|AN;måke|animals/seagull|ÅKE;kråke|birds 2/crow|ÅKE;ku|farm animals/cow|U;sko|clothing/shoe|O'),
    fi: T('kuu|space/moon|UU;suu|body parts/mouth|UU;kukka|spring/flower|UKKA;sukka|accessories/sock|UKKA;kukko|farm animals/rooster|UKKO;lukko|around the house/lock|UKKO;juna|vehicles/train|UNA;muna|easter/egg|UNA;peruna|vegetables/potato|UNA;orava|camping/squirrel|AVA;harava|around the house/rake|AVA;kissa|farm animals/cat|ISSA;auto|vehicles/car|UTO;kala|animals/fish|ALA;pallo|toys/ball|ALLO;koira|farm animals/dog|OIRA;kana|farm animals/hen|ANA')
  };

  /* ---------------- the rounds ----------------
     ['judge', a, b] · ['pick', anchor, [3]] · ['odd', [4]] · ['sort', [anchorA, anchorB], [pile]]
     ['finish', anchor, [3], line, sung] · ['field', anchor, [choices]] · ['chain', anchor, [[3], [3], …]] */
  function S(s) { return s.split(' '); }
  var ROUNDS = {
    en: [
      ['judge', 'snail', 'whale'], ['judge', 'bear', 'ear'], ['judge', 'bear', 'bus'],
      ['pick', 'snail', S('bee whale key')], ['pick', 'pear', S('pie chair bee')], ['pick', 'cat', S('dog hat sun')],
      ['odd', S('snail nail whale bee')], ['odd', S('bear chair pear key')],
      ['sort', S('whale cat'), S('snail hat nail bat')],
      ['finish', 'whale', S('key nail pie'), 'A snail, a whale and a shiny steel …', 'A snail, a whale and a shiny steel nail!'],
      ['finish', 'key', S('bear bee tie'), 'A shiny golden key — it rhymes with …', 'A shiny golden key — it rhymes with bee!'],
      ['field', 'dog', S('log frog cat bus')],
      ['chain', 'boat', [S('goat sun bee'), S('coat cat key')]]
    ],
    de: [
      ['judge', 'maus', 'haus'], ['judge', 'fisch', 'hund'], ['judge', 'haus', 'hahn'],
      ['pick', 'fisch', S('tisch hund rose')], ['pick', 'hose', S('rose schwein boot')], ['pick', 'hahn', S('zahn glocke maus')],
      ['odd', S('pfanne badewanne kanne socke')],
      ['sort', S('maus pfanne'), S('haus badewanne kanne')],
      ['finish', 'maus', S('haus fisch socke'), 'Da läuft die kleine graue Maus – schnell rennt sie in ihr …', 'Da läuft die kleine graue Maus – schnell rennt sie in ihr Haus!'],
      ['field', 'pfanne', S('badewanne kanne maus fisch')],
      ['chain', 'pfanne', [S('badewanne maus boot'), S('kanne fisch hund')]]
    ],
    fr: [
      ['judge', 'bateau', 'gâteau'], ['judge', 'chat', 'chapeau'],
      ['pick', 'poisson', S('lune mouton vache')], ['pick', 'lapin', S('ours pain chat')], ['pick', 'seau', S('oiseau souris main')],
      ['odd', S('ballon cochon citron vache')], ['odd', S('bateau râteau chapeau lapin')],
      ['sort', S('gâteau trompette'), S('seau fourchette oiseau chaussette')],
      ['finish', 'cochon', S('ballon chat main'), 'Le petit cochon joue avec son …', 'Le petit cochon joue avec son ballon !'],
      ['field', 'camion', S('avion maison chat lune')],
      ['chain', 'main', [S('lapin ours vache'), S('pain lune chat')]]
    ],
    es: [
      ['judge', 'gato', 'pato'], ['judge', 'oveja', 'camión'], ['judge', 'pato', 'paleta'],
      ['pick', 'gato', S('zapato oveja rosa')], ['pick', 'manzana', S('campana estrella león')], ['pick', 'galleta', S('paleta ardilla avión')],
      ['odd', S('ratón león avión oveja')],
      ['sort', S('gato ratón'), S('pato león camión')],
      ['finish', 'gato', S('zapato rosa campana'), 'Mira al gato, mira al gato, se puso un solo …', '¡Mira al gato, mira al gato, se puso un solo zapato!'],
      ['field', 'ratón', S('león avión gato oveja')],
      ['chain', 'ratón', [S('camión gato oveja'), S('avión rosa manzana')]]
    ],
    pt: [
      ['judge', 'baleia', 'meia'], ['judge', 'gato', 'rosa'], ['judge', 'gato', 'galo'],
      ['pick', 'abelha', S('orelha casa dente')], ['pick', 'panela', S('janela peixe galo')], ['pick', 'limão', S('caminhão rosa chave')],
      ['odd', S('gato pato sapato casa')],
      ['sort', S('gato abelha'), S('rato ovelha pato orelha')],
      ['finish', 'gato', S('sapato rosa dente'), 'Olha o gato, olha o gato, calçou um só …', 'Olha o gato, olha o gato, calçou um só sapato!'],
      ['field', 'sapato', S('gato pato rato mesa chave')],
      ['chain', 'balão', [S('limão gato ovelha'), S('avião casa mesa'), S('caminhão rosa peixe')]]
    ],
    it: [
      ['judge', 'gatto', 'piatto'], ['judge', 'limone', 'banana'], ['judge', 'panino', 'padella'],
      ['pick', 'delfino', S('pinguino banana limone')], ['pick', 'cappello', S('martello gatto rana')], ['pick', 'melone', S('limone delfino padella')],
      ['odd', S('calzino panino bambino cappello')],
      ['sort', S('delfino limone'), S('pinguino panino melone pavone')],
      ['finish', 'gatto', S('piatto panino limone'), 'Guarda guarda che bel gatto, mangia tutto nel suo …', 'Guarda guarda che bel gatto, mangia tutto nel suo piatto!'],
      ['field', 'cappello', S('anello martello ombrello gatto rana limone')],
      ['chain', 'bambino', [S('panino banana gatto'), S('cestino limone padella'), S('pulcino rana cappello')]]
    ],
    nl: [
      ['judge', 'muis', 'huis'], ['judge', 'beer', 'hond'], ['judge', 'beer', 'bel'],
      ['pick', 'beer', S('peer kat boot')], ['pick', 'schoen', S('meloen kat boot')], ['pick', 'haan', S('banaan bel sok')],
      ['odd', S('schoen meloen citroen sok')],
      ['sort', S('muis schoen'), S('huis meloen citroen')],
      ['finish', 'haan', S('banaan vis sok'), 'Kijk, daar staat een trotse haan, hij eet een gele …', 'Kijk, daar staat een trotse haan, hij eet een gele banaan!'],
      ['field', 'schoen', S('meloen citroen kat boot')],
      ['chain', 'schoen', [S('meloen kat boot'), S('citroen sok hond')]]
    ],
    sv: [
      ['judge', 'katt', 'hatt'], ['judge', 'hus', 'hund'],
      ['pick', 'sol', S('stol bil gris')], ['pick', 'ko', S('sko katt fisk')], ['pick', 'mus', S('hus sol boll')],
      ['odd', S('hand sand tand gris')], ['odd', S('kopp mopp knopp hatt')],
      ['sort', S('sand kopp'), S('hand tand mopp knopp')],
      ['finish', 'katt', S('hatt sko sol'), 'Titta, en katt med en …', 'Titta, en katt med en hatt!'],
      ['field', 'hand', S('sand tand ko bil')],
      ['chain', 'kopp', [S('mopp katt sol'), S('knopp gris ko')]]
    ],
    da: [
      ['judge', 'kat', 'hat'], ['judge', 'hus', 'hund'],
      ['pick', 'sol', S('stol bil gris')], ['pick', 'ko', S('sko kat fisk')], ['pick', 'mus', S('hus sol ko')],
      ['odd', S('and sand tand gris')], ['judge', 'negl', 'snegl'],
      ['sort', S('and kat'), S('sand tand spand hat')],
      ['finish', 'kat', S('hat sko sol'), 'Se, en kat med en …', 'Se, en kat med en hat!'],
      ['field', 'and', S('sand spand kat sol')],
      ['chain', 'and', [S('sand ko bil'), S('tand mus hat')]]
    ],
    no: [
      ['judge', 'katt', 'hatt'], ['judge', 'hus', 'hund'],
      ['pick', 'sol', S('stol bil gris')], ['pick', 'kake', S('rake katt fisk')], ['pick', 'mus', S('hus sol kake')],
      ['odd', S('and sand tann gris')], ['judge', 'måke', 'kråke'],
      ['sort', S('sand kake'), S('and tann rake')],
      ['finish', 'katt', S('hatt sko sol'), 'Se, en katt med en …', 'Se, en katt med en hatt!'],
      ['field', 'and', S('sand tann katt mus')],
      ['chain', 'and', [S('sand ku bil'), S('tann mus hatt')]]
    ],
    fi: [
      ['judge', 'kuu', 'suu'], ['judge', 'kukka', 'kukko'],
      ['pick', 'kukka', S('sukka kissa auto')], ['pick', 'juna', S('muna kala pallo')], ['pick', 'orava', S('harava koira kana')],
      ['odd', S('juna muna peruna kala')], ['judge', 'kukko', 'lukko'],
      ['sort', S('kukka juna'), S('sukka muna peruna')],
      ['finish', 'suu', S('kuu kala auto'), 'Kissalla on pieni suu, taivaalla loistaa …', 'Kissalla on pieni suu, taivaalla loistaa kuu!'],
      ['field', 'juna', S('muna peruna kissa auto')],
      ['chain', 'orava', [S('harava koira kana')]]
    ]
  };

  /* the word a child sees and hears: German nouns keep their capital, every other locale lower-case */
  function display(l, w) { return l === 'de' ? w.word : w.word.toLocaleLowerCase(l); }
  function word(l, k) { var w = WORDS[loc(l)][k]; if (!w) throw new Error('rhyme-chain: no word ' + l + '/' + k); return w; }
  function rhymes(a, b) { return a.rime === b.rime; }

  /* the pool: each round with its kind index (k) so answer slots balance per locale */
  function rounds(l) {
    l = loc(l);
    var ks = {}, out = [], slot = 0;
    ROUNDS[l].forEach(function (d, i) {
      var kind = d[0], grp = kind === 'finish' ? 'pick' : kind;
      ks[grp] = (ks[grp] || 0); var k = ks[grp]++;
      var r = { loc: l, kind: kind, k: k, n: i };
      if (kind === 'judge') { r.a = d[1]; r.b = d[2]; r.id = 'judge-' + d[1] + '-' + d[2]; }
      else if (kind === 'pick' || kind === 'finish') { r.anchor = d[1]; r.choices = d[2]; r.id = kind + '-' + d[1] + (kind === 'finish' ? '-' + i : ''); if (kind === 'finish') { r.line = d[3]; r.sung = d[4]; } }
      else if (kind === 'odd') { r.choices = d[1]; r.id = 'odd-' + d[1][0]; }
      else if (kind === 'sort') { r.anchors = d[1]; r.choices = d[2]; r.id = 'sort-' + d[1].join('-'); }
      else if (kind === 'field') { r.anchor = d[1]; r.choices = d[2]; r.id = 'field-' + d[1]; }
      else if (kind === 'chain') { r.anchor = d[1]; r.steps = d[2]; r.id = 'chain-' + d[1]; }
      /* one counter over every three-way choice of the locale (PICK, FINISH, each CHAIN step) so the right slot rotates evenly */
      if (kind === 'pick' || kind === 'finish') r.slot = slot++;
      if (kind === 'chain') { r.slot = slot; slot += r.steps.length; }
      out.push(r);
    });
    return out;
  }

  /* the answers, from the rime keys */
  function answerOf(r) {
    var l = r.loc, W = function (k) { return word(l, k); };
    if (r.kind === 'judge') return rhymes(W(r.a), W(r.b));
    if (r.kind === 'pick' || r.kind === 'finish') return r.choices.filter(function (c) { return rhymes(W(c), W(r.anchor)); });
    if (r.kind === 'field') return r.choices.filter(function (c) { return rhymes(W(c), W(r.anchor)); });
    if (r.kind === 'odd') return r.choices.filter(function (c) { return r.choices.filter(function (o) { return rhymes(W(o), W(c)); }).length === 1; });
    if (r.kind === 'sort') return r.choices.map(function (c) { return r.anchors.filter(function (a) { return rhymes(W(a), W(c)); }).map(function (a) { return r.anchors.indexOf(a); }); });
    if (r.kind === 'chain') return r.steps.map(function (s) { return s.filter(function (c) { return rhymes(W(c), W(r.anchor)); }); });
    return null;
  }

  function seeded(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function hashId(id) { var h = 7; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return h; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* the grass is dealt so the right answer's slot rotates (balanced per locale, re-dealt every pass) */
  function placeAt(list, right, slot) { var others = list.filter(function (c) { return c !== right; }); others.splice(slot, 0, right); return others; }
  function deal(r, pass) {
    var l = r.loc, rnd = seeded(hashId(l + r.id) + pass * 977), ans = answerOf(r);
    if (r.kind === 'pick' || r.kind === 'finish') return placeAt(pass % 2 ? r.choices.slice().reverse() : r.choices.slice(), ans[0], (r.slot + pass) % r.choices.length);
    if (r.kind === 'odd') return placeAt(shuffle(r.choices.slice(), rnd), ans[0], (r.k + pass) % r.choices.length);
    if (r.kind === 'chain') return r.steps.map(function (s, i) { return placeAt(pass % 2 ? s.slice().reverse() : s.slice(), ans[i][0], (r.slot + i + pass) % s.length); });
    if (r.kind === 'field' || r.kind === 'sort') {
      var fam = function (o) { var w = word(l, o); return r.kind === 'field' ? (w.rime === word(l, r.anchor).rime) : w.rime; };
      for (var t = 0; t < 40; t++) {
        var o = shuffle(r.choices.slice(), rnd), runs = 1, maxRun = 1;
        for (var i = 1; i < o.length; i++) { runs = fam(o[i]) === fam(o[i - 1]) ? runs + 1 : 1; if (runs > maxRun) maxRun = runs; }
        if (r.kind === 'sort' && maxRun >= Math.max(3, o.length - 1)) continue;
        if (r.kind === 'field' && fam(o[0]) && fam(o[o.length - 1]) && (pass + t) % 3) continue;
        return o;
      }
      return r.choices.slice();
    }
    return null;
  }

  /* ---------------- the state ---------------- */
  function newState(r, pass) {
    pass = pass || 0;
    var l = r.loc, st = { r: r, pass: pass, misses: 0, help: 0, show: false, last: null, done: false, step: 0, judge: null, oddPick: null, falling: null, sel: null };
    var d = deal(r, pass);
    var card = function (k, i) { var w = word(l, k); return { id: k + '#' + i, key: k, word: display(l, w), pic: w.pic, rime: w.rime, revealed: false }; };
    if (r.kind === 'judge') { st.pair = [card(r.a, 0), card(r.b, 1)]; st.grass = []; st.chains = []; }
    else if (r.kind === 'odd') { st.chains = [{ anchor: null, links: d.map(function (k, i) { return card(k, i); }) }]; st.grass = []; }
    else if (r.kind === 'sort') { st.chains = r.anchors.map(function (a, i) { var c = card(a, 'a' + i); c.revealed = true; return { anchor: c, links: [] }; }); st.grass = d.map(card); }
    else {
      var anc = card(r.anchor, 'a'); anc.revealed = true;
      st.chains = [{ anchor: anc, links: [] }];
      if (r.kind === 'chain') { st.stepCards = d.map(function (s, si) { return s.map(function (k, i) { return card(k, si * 10 + i); }); }); st.grass = st.stepCards[0]; }
      else st.grass = d.map(card);
    }
    return st;
  }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function miss(st, last) { st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = last; }

  /* hang a grass picture on chain ci: the ring holds iff its rime is the chain anchor's rime */
  function hang(st, id, ci) {
    var r = st.r; ci = ci || 0;
    if (st.done || r.kind === 'judge' || r.kind === 'odd') return null;
    var c = byId(st.grass, id), ch = st.chains[ci]; if (!c || !ch) return null;
    c.revealed = true;
    if (c.rime !== ch.anchor.rime) { miss(st, { result: 'falls', a: ch.anchor.word, b: c.word, id: id }); st.falling = id; return { result: 'falls', a: ch.anchor, b: c }; }
    st.show = false; st.last = { result: 'holds', a: ch.anchor.word, b: c.word }; st.falling = null;
    st.grass = st.grass.filter(function (x) { return x !== c; });
    ch.links.push(c);
    if (r.kind === 'pick' || r.kind === 'finish') st.done = true;
    if (r.kind === 'chain') { st.step++; st.grass = st.step < st.stepCards.length ? st.stepCards[st.step] : []; }
    return { result: 'holds', a: ch.anchor, b: c };
  }
  function remaining(st) {
    var r = st.r;
    if (r.kind === 'field') { var a = st.chains[0].anchor.rime; return st.grass.filter(function (c) { return c.rime === a; }).length; }
    if (r.kind === 'sort') return st.grass.length;
    if (r.kind === 'chain') return st.stepCards.length - st.step;
    return 0;
  }
  function answerJudge(st, v) {
    if (st.done || st.r.kind !== 'judge') return null;
    var truth = st.pair[0].rime === st.pair[1].rime;
    st.pair[0].revealed = st.pair[1].revealed = true;
    st.judge = v;
    if (v === truth) { st.done = true; st.show = false; st.last = { result: truth ? 'yes' : 'no' }; return { result: 'ok', truth: truth }; }
    miss(st, { result: 'judge', a: st.pair[0].word, b: st.pair[1].word, truth: truth });
    return { result: 'wrong', truth: truth };
  }
  function pickOdd(st, id) {
    if (st.done || st.r.kind !== 'odd') return false;
    st.oddPick = st.oddPick === id ? null : id; st.show = false; st.last = null; return true;
  }
  function oddOne(st) { var L = st.chains[0].links; return L.filter(function (c) { return L.filter(function (o) { return o.rime === c.rime; }).length === 1; })[0]; }
  /* pull the wagon (Check) */
  function pull(st) {
    var r = st.r;
    if (st.done) return { result: 'ok' };
    if (r.kind === 'judge') { st.last = { result: 'empty' }; st.show = true; return { result: 'empty' }; }
    if (r.kind === 'pick' || r.kind === 'finish') { st.last = { result: 'empty' }; st.show = true; return { result: 'empty' }; }
    if (r.kind === 'odd') {
      if (!st.oddPick) { st.last = { result: 'empty' }; st.show = true; return { result: 'empty' }; }
      var o = oddOne(st), p = byId(st.chains[0].links, st.oddPick);
      if (p === o) { st.done = true; st.show = false; st.last = { result: 'odd', x: o.word }; st.chains[0].links.forEach(function (c) { c.revealed = true; }); return { result: 'ok' }; }
      miss(st, { result: 'oddwrong', x: p.word }); return { result: 'wrong' };
    }
    var hung = st.chains.reduce(function (n, c) { return n + c.links.length; }, 0), k = remaining(st);
    if (k === 0) { st.done = true; st.show = false; st.last = { result: 'done' }; return { result: 'ok' }; }
    st.show = true;
    if (!hung) { st.last = { result: 'empty' }; return { result: 'empty' }; }
    st.last = { result: 'more', k: k }; return { result: 'more', k: k };
  }
  /* the hint key for the speech line */
  function hint(st) {
    var r = st.r, L = st.last;
    if (st.done || !st.show || !L) return null;
    if (L.result === 'empty') return r.kind === 'judge' ? 'hintJudge' : r.kind === 'odd' ? 'hintOddEmpty' : 'hintEmpty';
    if (L.result === 'more') return r.kind === 'chain' ? 'hintChainMore' : 'hintMore';
    if (st.help >= 2) return r.kind === 'judge' ? 'hintPatternJudge' : r.kind === 'odd' ? 'hintPatternOdd' : 'hintPattern';
    if (L.result === 'oddwrong') return 'hintOdd';
    return 'hintEnds';
  }
  /* rings show their family pattern: always (setting), once known (revealed/hung), or at help 2 */
  function showsPattern(st, c, always) { return !!(always || c.revealed || (st.help >= 2 && st.show) || st.done); }

  /* order-only reshuffle: a pass starts with a PICK, FINISH rounds never adjacent, no kind three in a row, never the previous order */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 400; t++) {
      var o = shuffle(pool.map(function (_, i) { return i; }), rnd);
      if (pool[o[0]].kind !== 'pick') continue;
      if (prev && prev.join() === o.join()) continue;
      var bad = false;
      for (var i = 1; i < n && !bad; i++) {
        if (pool[o[i]].kind === 'finish' && pool[o[i - 1]].kind === 'finish') bad = true;
        if (i >= 2 && pool[o[i]].kind === pool[o[i - 1]].kind && pool[o[i]].kind === pool[o[i - 2]].kind) bad = true;
      }
      if (bad) continue;
      best = o; break;
    }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout ---------------- */
  function layout(W) {
    var wide = W >= 560;
    var L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.card = wide ? 96 : Math.max(64, Math.min(80, Math.floor((W - 3 * 8) / 4)));
    L.ring = wide ? 40 : 26;
    L.wagon = wide ? 110 : 84;
    L.btn = wide ? 64 : 56;
    return L;
  }

  /* the ring patterns: colour + engraving (dash) per family, assigned per round */
  var PATTERNS = [{ c: '#146B5E', d: '' }, { c: '#E0662F', d: '7 4' }, { c: '#7B4FB0', d: '2 4' }, { c: '#B8862A', d: '10 3 2 3' }, { c: '#2F7FC1', d: '1 3' }, { c: '#B23A48', d: '12 3' }];
  function families(st) {
    var seen = [], add = function (c) { if (c && seen.indexOf(c.rime) < 0) seen.push(c.rime); };
    (st.pair || []).forEach(add); st.chains.forEach(function (ch) { add(ch.anchor); ch.links.forEach(add); });
    st.grass.forEach(add); (st.stepCards || []).forEach(function (s) { s.forEach(add); });
    return seen;
  }
  function patternOf(st, c) { var f = families(st), i = f.indexOf(c.rime); return PATTERNS[(i + st.pass) % PATTERNS.length]; }

  return {
    LOCALES: LOCALES, WORDS: WORDS, ROUNDS: ROUNDS, PATTERNS: PATTERNS,
    loc: loc, display: display, word: word, rhymes: rhymes, rounds: rounds, answerOf: answerOf, deal: deal,
    newState: newState, byId: byId, hang: hang, remaining: remaining, answerJudge: answerJudge, pickOdd: pickOdd, oddOne: oddOne,
    pull: pull, hint: hint, showsPattern: showsPattern, order: order, layout: layout, families: families, patternOf: patternOf
  };
}));
