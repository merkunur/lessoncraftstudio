/* =====================================================================
   BO'S BERRY PANTRY — ACTIVITY  (bos-berry-pantry-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.NBT.B.2 (two-digit numbers are amounts of TENS and ONES — UNITIZING)
   + a touch of 1.NBT.B.3 (the value-compare lane). Bo the bunny stocks his
   winter pantry: a CRATE holds exactly ten — sealed, un-countable, "a crate
   just IS a ten." The child READS a prompt (a loose PILE / a value-question /
   a numeral), LOCKS the matching pantry shelf, then SLINGS Bo's berries to the
   LOCKED shelf (commit-then-deliver — the launch reads only the lock, never aim).

   THE ANTI-CHEATS: NO numerals on hoard shelves (digit-match dies); the crate is
   ONE sealed composite ten, not a countable grid (count-match dies on the VALUE-
   rounds); the launch always lands on the LOCKED shelf (aim is never graded); a
   wrong lock floats back with a NON-LEAKING re-decode cue (names the wrong
   shelf's crate-count, never the prompt's value). The unitize logic + the SOLVER
   gauntlet live in mini tools/slingshot-tens-core.js (pure). answerType:'state'.

   Bo + crates + berries = SVG STUBS for CA5 (NO image-library → no 404). No
   timer/score/streak; a miss is a warm "count again." First-attempt-correct
   stocks the pantry. 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SlingshotTensCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35', LEAF: '#7FB069' };
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function enWord(n) { n = n | 0; if (n < 20) return ONES[n] || String(n); var t = Math.floor(n / 10), o = n % 10; return o ? TENS[t] + '-' + ONES[o] : TENS[t]; }

  /* German number-words (Klasse 2 ZR bis 100). Compound = UNIT_C_DE[o] + 'und' + TENS_DE[t]
     as ONE word; in a compound the unit 1 is "ein-" (einundzwanzig), standalone "eins". */
  var ONES_DE = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
  var TEENS_DE = ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  var TENS_DE = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
  var UNIT_C_DE = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
  function numWordDE(n) {
    n = n | 0;
    if (n < 10) return ONES_DE[n] || String(n);
    if (n < 20) return TEENS_DE[n - 10];
    var t = Math.floor(n / 10), o = n % 10;
    if (t > 9) return String(n);
    return o ? UNIT_C_DE[o] + 'und' + TENS_DE[t] : TENS_DE[t];
  }
  /* French number-words (ZR bis 100). The vigesimal forms: 70=soixante-dix, 80=quatre-vingts
     (final s standalone), 90=quatre-vingt-dix; "et un" on 21/31/41/51/61 + "et onze" ONLY on 71;
     81/91 take no "et". */
  var ONES_FR = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  var TENS_FR = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
  function numWordFR(n) {
    n = n | 0;
    if (n < 20) return ONES_FR[n] || String(n);
    if (n < 70) { var t = Math.floor(n / 10), o = n % 10; if (o === 0) return TENS_FR[t]; if (o === 1) return TENS_FR[t] + ' et un'; return TENS_FR[t] + '-' + ONES_FR[o]; }
    if (n < 80) { if (n === 71) return 'soixante et onze'; return 'soixante-' + ONES_FR[n - 60]; }
    if (n < 100) { if (n === 80) return 'quatre-vingts'; return 'quatre-vingt-' + ONES_FR[n - 80]; }
    return String(n);
  }
  /* Spanish number-words (ZR bis 100). 0-29 one-word (accents live only here: dieciséis,
     veintidós, veintitrés, veintiséis); 30-99 = TENS_ES[t] + ' y ' + UNIT_ES[o] (accent-free). */
  var ONES_ES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  var TENS_ES = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  var UNIT_ES = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  function numWordES(n) {
    n = n | 0;
    if (n < 30) return ONES_ES[n] || String(n);
    var t = Math.floor(n / 10), o = n % 10;
    if (t > 9) return String(n);
    return o ? TENS_ES[t] + ' y ' + UNIT_ES[o] : TENS_ES[t];
  }
  /* Brazilian Portuguese number-words (2º ano ZR até 100). tens + ' e ' + ones;
     values here never end in 1/2, so the um/uma & dois/duas gender never surfaces. */
  var ONES_PT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  var TENS_PT = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  function numWordPT(n) {
    n = n | 0;
    if (n < 20) return ONES_PT[n] || String(n);
    var t = Math.floor(n / 10), o = n % 10;
    if (t > 9) return String(n);
    return o ? TENS_PT[t] + ' e ' + ONES_PT[o] : TENS_PT[t];
  }
  /* Italian number-words (classe seconda, valore posizionale ZR fino a ~100). tens + ones as ONE word;
     the tens' final vowel ELIDES before uno & otto (venti→ventuno/ventotto); 3 carries an acute accent
     ONLY as a compound suffix (ventitré/sessantatré) — standalone ONES_IT[3]='tre' has no accent. */
  var ONES_IT = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];
  var TENS_IT = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];
  var UNIT_IT = ['', 'uno', 'due', 'tré', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'];
  function numWordIT(n) {
    n = n | 0;
    if (n < 20) return ONES_IT[n] || String(n);
    var t = Math.floor(n / 10), o = n % 10;
    if (t > 9) return String(n);
    if (o === 0) return TENS_IT[t];
    var tens = TENS_IT[t];
    if (o === 1 || o === 8) tens = tens.slice(0, -1);
    return tens + UNIT_IT[o];
  }
  /* Dutch number-words (groep 4, tot 100). Compound = UNIT_C_NL[o] + TENS_NL[t] as ONE word;
     the "en" infix is baked into UNIT_C_NL, with the trema on 2/3 (tweeën-, drieën-); standalone
     numeral 1 = 'één' (accented, to force the "the-number-one" reading, not the article). */
  var ONES_NL = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'];
  var TEENS_NL = ['tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
  var TENS_NL = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
  var UNIT_C_NL = ['', 'eenen', 'tweeën', 'drieën', 'vieren', 'vijfen', 'zesen', 'zevenen', 'achten', 'negenen'];
  function numWordNL(n) {
    n = n | 0;
    if (n < 10) return ONES_NL[n] || String(n);
    if (n < 20) return TEENS_NL[n - 10];
    var t = Math.floor(n / 10), o = n % 10;
    if (t > 9) return String(n);
    return o ? UNIT_C_NL[o] + TENS_NL[t] : TENS_NL[t];
  }
  var LANG = 'en';
  function numWord(n) { return LANG === 'nl' ? numWordNL(n) : (LANG === 'it' ? numWordIT(n) : (LANG === 'pt' ? numWordPT(n) : (LANG === 'es' ? numWordES(n) : (LANG === 'fr' ? numWordFR(n) : (LANG === 'de' ? numWordDE(n) : enWord(n)))))); }
  /* shelf-hoard aria — German needs singular/plural (1 Kiste / N Kisten; 1 lose Beere /
     N lose Beeren) and drops the loose clause when ones=0. EN stays byte-identical. */
  function hoardAria(tens, ones) {
    if (LANG === 'de') {
      var s = tens + (tens === 1 ? ' Kiste' : ' Kisten');
      if (ones) s += ' und ' + ones + (ones === 1 ? ' lose Beere' : ' lose Beeren');
      return s;
    }
    if (LANG === 'fr') {
      var f = tens + (tens === 1 ? ' caisse' : ' caisses');
      if (ones) f += ' et ' + ones + (ones === 1 ? ' baie libre' : ' baies libres');
      return f;
    }
    if (LANG === 'es') {
      var e = (tens === 1 ? '1 caja' : tens + ' cajas');
      if (ones) e += ' y ' + ones + ' ' + (ones === 1 ? 'mora suelta' : 'moras sueltas');
      return e;
    }
    if (LANG === 'pt') {
      var p = (tens === 1 ? '1 caixa' : tens + ' caixas');
      if (ones) p += ' e ' + ones + ' ' + (ones === 1 ? 'amora solta' : 'amoras soltas');
      return p;
    }
    if (LANG === 'it') {
      var it = (tens === 1 ? '1 cassetta' : tens + ' cassette');
      if (ones) it += ' e ' + ones + ' ' + (ones === 1 ? 'mora sfusa' : 'more sfuse');
      return it;
    }
    if (LANG === 'nl') {
      var nl = tens + (tens === 1 ? ' krat' : ' kratten');
      if (ones) nl += ' en ' + ones + ' ' + (ones === 1 ? 'losse bes' : 'losse bessen');
      return nl;
    }
    return tens + ' crates and ' + ones + ' loose berries';
  }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'es' ? 'es-MX' : (LANG === 'de' ? 'de-DE' : (LANG === 'fr' ? 'fr-FR' : (LANG === 'pt' ? 'pt-BR' : (LANG === 'it' ? 'it-IT' : (LANG === 'nl' ? 'nl-NL' : 'en-US')))))); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  var REDUCED = (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function boSVG(mood) {
    var happy = mood === 'happy';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'es' ? 'Bo el conejo' : (LANG === 'de' ? 'Bo das Kaninchen' : (LANG === 'fr' ? 'Bo le lapin' : (LANG === 'pt' ? 'Bo o coelho' : (LANG === 'it' ? 'Bo il coniglio' : (LANG === 'nl' ? 'Bo het konijn' : 'Bo the bunny')))))) + '">'
      + '<ellipse cx="38" cy="20" rx="6" ry="15" fill="#E9D9C6"/><ellipse cx="62" cy="20" rx="6" ry="15" fill="#E9D9C6"/>'   // ears
      + '<ellipse cx="38" cy="20" rx="3" ry="10" fill="#F4C9C0"/><ellipse cx="62" cy="20" rx="3" ry="10" fill="#F4C9C0"/>'
      + '<circle cx="50" cy="52" r="30" fill="#EFE2D2"/>'                                                                     // head
      + '<circle cx="40" cy="48" r="3.6" fill="#2A2A35"/><circle cx="60" cy="48" r="3.6" fill="#2A2A35"/>'
      + '<ellipse cx="50" cy="58" rx="4" ry="3" fill="#F4A7A0"/>'                                                             // nose
      + (happy ? '<path d="M42 64 q8 7 16 0" stroke="#B06A57" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<path d="M44 64 q6 3 12 0" stroke="#B06A57" stroke-width="2.4" fill="none" stroke-linecap="round"/>')
      + '</svg>';
  }
  /* the SEALED un-countable ten-crate — ONE composite icon worth ten (a ten-leaf
     stamp, NOT a countable berry-grid). The §9 count-match-killer, art-enforced. */
  function crateSVG() {
    return '<svg viewBox="0 0 100 100" class="bp-crate-svg" aria-hidden="true">'
      + '<rect x="12" y="26" width="76" height="58" rx="7" fill="#C68B4E"/><rect x="12" y="26" width="76" height="58" rx="7" fill="none" stroke="#8A5A2B" stroke-width="4"/>'
      + '<rect x="12" y="48" width="76" height="6" fill="#8A5A2B" opacity=".55"/><rect x="46" y="26" width="8" height="58" fill="#8A5A2B" opacity=".5"/>'   // slats
      + '<circle cx="50" cy="40" r="11" fill="#2E7D4F"/><path d="M50 33 q7 5 0 13 q-7 -8 0 -13Z" fill="#7FB069"/>'             // ten-leaf stamp
      + '<text x="50" y="44" font-family="Baloo 2,sans-serif" font-weight="800" font-size="11" fill="#fff" text-anchor="middle">10</text>'
      + '</svg>';
  }

  global.BosBerryPantryActivity = {
    id: 'bos-berry-pantry-activity',
    reward: { id: 'pantry', label: "Bo's Winter Pantry", emoji: '🧺' },

    strings: {
      title: { en: "Bo's Berry Pantry", de: 'Bos Beerenkammer', fr: 'Le garde-manger de Bo', es: 'La despensa de Bo', pt: 'A despensa do Bo', it: 'La dispensa di Bo', nl: "Bo's bessenkast" },
      instruction: { en: 'Read Bo’s berries, then sling them to the matching shelf.', de: 'Lies Bos Beeren und schieß sie zum passenden Regal!', fr: 'Lis les baies de Bo, puis lance-les sur la bonne étagère !', es: '¡Lee las moras de Bo y dispáralas al estante que coincide!', pt: 'Leia as amoras do Bo e atire na prateleira certa!', it: 'Leggi le more di Bo, poi lanciale sullo scaffale giusto.', nl: "Lees Bo's bessen en slinger ze naar het juiste schap." },
      prompt: { en: 'Pack Bo’s berries!', de: 'Pack Bos Beeren!', fr: 'Range les baies de Bo !', es: '¡Acomoda las moras de Bo!', pt: 'Guarde as amoras do Bo!', it: 'Sistema le more di Bo!', nl: "Pak Bo's bessen!" },
      qPile: { en: 'Pack Bo’s berries — crates and loose!', de: 'Pack Bos Beeren — Kisten und lose Beeren!', fr: 'Range les baies de Bo — des caisses et des baies libres !', es: '¡Acomoda las moras de Bo: cajas y moras sueltas!', pt: 'Guarde as amoras do Bo: caixas e amoras soltas!', it: 'Sistema le more di Bo: cassette e more sfuse!', nl: "Pak Bo's bessen — kratten en losse bessen!" },
      qDecade: { en: 'Send Bo’s {w} — all crates, no loose!', de: 'Schick Bos {w} — nur Kisten, nichts Loses!', fr: 'Envoie les {w} de Bo — que des caisses, rien de libre !', es: '¡Manda las {w} de Bo: solo cajas, nada suelto!', pt: 'Mande as {w} do Bo: só caixas, nada solto!', it: 'Manda le {w} more di Bo: tutte cassette, niente sfuse!', nl: "Stuur Bo's {w} — alleen kratten, niets los!" },
      qUnitize: { en: 'Pack {w} — use the MOST crates you can!', de: 'Pack {w} — nimm so viele Kisten wie möglich!', fr: 'Range {w} — utilise le PLUS de caisses possible !', es: 'Acomoda {w}: ¡usa la mayor cantidad de cajas posible!', pt: 'Guarde {w}: use o máximo de caixas que der!', it: 'Sistema {w}: usa PIÙ cassette che puoi!', nl: 'Pak {w} — gebruik zo veel mogelijk kratten!' },
      qCompare: { en: 'Which shelf has MORE?', de: 'Welches Regal hat MEHR?', fr: 'Quelle étagère en a le PLUS ?', es: '¿Cuál estante tiene MÁS?', pt: 'Qual prateleira tem MAIS?', it: 'Quale scaffale ne ha di PIÙ?', nl: 'Welk schap heeft MEER?' },
      qNumeral: { en: 'Send {w} home — match the shelf!', de: 'Schick {w} nach Hause — finde das passende Regal!', fr: 'Renvoie {w} à la maison — trouve la bonne étagère !', es: '¡Manda {w} a su lugar: encuentra el estante que coincide!', pt: 'Mande {w} para o lugar certo: ache a prateleira que combina!', it: 'Manda {w} a casa: trova lo scaffale giusto!', nl: 'Stuur {w} naar huis — vind het juiste schap!' },
      qEncode: { en: 'Which number is Bo’s hoard?', de: 'Welche Zahl ist Bos Vorrat?', fr: 'Quel nombre est le trésor de Bo ?', es: '¿Qué número tiene Bo guardado?', pt: 'Que número o Bo guardou?', it: 'Quale numero è la scorta di Bo?', nl: "Welk getal is Bo's voorraad?" },
      crateWord: { en: 'a crate is TEN', de: 'eine Kiste ist ZEHN', fr: 'une caisse, c’est DIX', es: 'una caja tiene DIEZ (una decena)', pt: 'uma caixa tem DEZ (uma dezena)', it: 'una cassetta fa DIECI', nl: 'een krat is TIEN' },
      shelvesLab: { en: 'Pantry shelves', de: 'VORRATSREGALE', fr: 'ÉTAGÈRES DU GARDE-MANGER', es: 'ESTANTES DE LA DESPENSA', pt: 'PRATELEIRAS DA DESPENSA', it: 'SCAFFALI DELLA DISPENSA', nl: 'Voorraadschappen' },
      sling: { en: 'Sling it! 🪃', de: 'Schieß los! 🪃', fr: 'Lance ! 🪃', es: '¡Dispara! 🪃', pt: 'Atire! 🪃', it: 'Lancia! 🪃', nl: 'Slingeren! 🪃' },
      slingHint: { en: 'Tap a shelf, then sling Bo’s berries!', de: 'Tipp ein Regal an und schieß Bos Beeren!', fr: 'Touche une étagère, puis lance les baies de Bo !', es: '¡Toca un estante y dispara las moras de Bo!', pt: 'Toque numa prateleira e atire as amoras do Bo!', it: 'Tocca uno scaffale, poi lancia le more di Bo!', nl: "Tik op een schap en slinger dan Bo's bessen!" },
      lockedHint: { en: 'Now sling it to that shelf!', de: 'Jetzt schieß sie zum Regal!', fr: 'Maintenant, lance-les sur cette étagère !', es: '¡Ahora dispáralas al estante!', pt: 'Agora atire na prateleira!', it: 'Ora lancia su quello scaffale!', nl: 'Slinger ze nu naar dat schap!' },
      wrongCrates: { en: 'That shelf holds {k} crates — count again for Bo!', de: 'Dieses Regal hat {k} Kisten — zähl noch mal für Bo!', fr: 'Cette étagère a {k} caisses — recompte pour Bo !', es: 'Este estante tiene {k} cajas: ¡cuenta otra vez para Bo!', pt: 'Esta prateleira tem {k} caixas: conte de novo para o Bo!', it: 'Quello scaffale tiene {k} cassette: riconta per Bo!', nl: 'Dat schap heeft {k} kratten — tel nog eens voor Bo!' },
      wrongOne: { en: 'That shelf holds 1 crate — count again for Bo!', de: 'Dieses Regal hat 1 Kiste — zähl noch mal für Bo!', fr: 'Cette étagère a 1 caisse — recompte pour Bo !', es: 'Este estante tiene 1 caja: ¡cuenta otra vez para Bo!', pt: 'Esta prateleira tem 1 caixa: conte de novo para o Bo!', it: 'Quello scaffale tiene 1 cassetta: riconta per Bo!', nl: 'Dat schap heeft 1 krat — tel nog eens voor Bo!' },
      wrongNum: { en: 'That number isn’t Bo’s hoard — count again!', de: 'Das ist nicht Bos Vorrat — zähl noch mal!', fr: 'Ce n’est pas le trésor de Bo — recompte !', es: 'Ese no es lo que guardó Bo: ¡cuenta otra vez!', pt: 'Não foi isso que o Bo guardou: conte de novo!', it: 'Quel numero non è la scorta di Bo: riconta!', nl: "Dat is niet Bo's voorraad — tel nog eens!" },
      win: { en: '{w} — packed into tens! 🧺', de: '{w} — in Zehner gepackt! 🧺', fr: '{w} — rangé en dizaines ! 🧺', es: '{w}: ¡acomodadas en decenas! 🧺', pt: '{w}: guardadas em dezenas! 🧺', it: '{w}: sistemate in decine! 🧺', nl: '{w} — in tientallen gepakt! 🧺' },
      tapCheck: { en: 'Tap Check! ✓', de: 'Tipp auf „Prüfen"! ✓', fr: 'Touche Vérifier ! ✓', es: '¡Toca «Comprobar»! ✓', pt: 'Toque em “Verificar”! ✓', it: 'Tocca Verifica! ✓', nl: 'Tik op Controleer! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cstate = null; this.solved = false; this.solvedCount = 0; this.msg = null; this._flying = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this._flying = false; this.winHoard = null;
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _word: function () { return numWord(this.round.prompt.value | 0); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'bp-wrap'); var root = api.el('div', 'bp-root'); this._rootEl = root; this._shelfEls = {};
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'bp-head' + (this.solved ? ' bp-head-win' : ''));
      var bo = api.el('span', 'bp-bo'); bo.innerHTML = boSVG(this.solved ? 'happy' : 'idle');
      var say = api.el('span', 'bp-say'); say.textContent = this.msg || this._question();
      head.appendChild(bo); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      root.appendChild(this._promptCard());
      root.appendChild(this._shelvesGrid());
      root.appendChild(this._slingBar());

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _question: function () {
      var api = this.api, p = this.round.prompt, w = this._word();
      if (this.round.compare === 'more') return api.t('qCompare');
      if (this.round.lane === 'encode') return api.t('qEncode');
      if (this.round.lane === 'decade') return api.t('qDecade').replace('{w}', w);
      if (this.round.lane === 'unitize-count') return api.t('qUnitize').replace('{w}', w);
      if (p.kind === 'numeral') return api.t('qNumeral').replace('{w}', w);
      return api.t('qPile');
    },

    /* ----- the prompt card: a PILE (no digits) / a value-question / a numeral
       pebble / a hoard (encode). NEVER a tray sum. ----- */
    _promptCard: function () {
      var api = this.api, p = this.round.prompt, card = api.el('div', 'bp-prompt');
      if (p.kind === 'numeral') {
        var peb = api.el('span', 'bp-pebble'); peb.textContent = (p.value | 0); card.appendChild(peb);
      } else if (this.round.lane === 'encode' && p.hoard) {
        card.appendChild(this._hoard(p.hoard.tens | 0, p.hoard.ones | 0, 'bp-prompt-hoard'));
      } else if (p.kind === 'pile') {
        card.appendChild(this._pile(p.value | 0));
      } else {
        /* value-q (decade / unitize-count / compare): a word cue, NO numeral */
        var q = api.el('span', 'bp-qword');
        q.textContent = (this.round.compare === 'more') ? '⚖' : this._word();
        card.appendChild(q);
        var sub = api.el('span', 'bp-qsub'); sub.textContent = api.t('crateWord'); card.appendChild(sub);
      }
      return card;
    },
    /* a loose pile of `n` berries, grouped in 5-frames (subitizable, NO digits). */
    _pile: function (n) {
      var api = this.api, pile = api.el('div', 'bp-pile');
      for (var i = 0; i < n; i++) { var b = api.el('span', 'bp-berry' + ((i + 1) % 5 === 0 ? ' bp-berry-gap' : '')); pile.appendChild(b); }
      return pile;
    },
    /* a hoard = sealed un-countable crates + a 5-framed loose row (NO numerals). */
    _hoard: function (tens, ones, cls) {
      var api = this.api, h = api.el('div', 'bp-hoard' + (cls ? ' ' + cls : ''));
      var cr = api.el('div', 'bp-crates');
      for (var i = 0; i < tens; i++) { var c = api.el('span', 'bp-crate'); c.innerHTML = crateSVG(); cr.appendChild(c); }
      if (tens) h.appendChild(cr);
      if (ones) { var lo = api.el('div', 'bp-loose'); for (var j = 0; j < ones; j++) { var b = api.el('span', 'bp-berry' + ((j + 1) % 5 === 0 ? ' bp-berry-gap' : '')); lo.appendChild(b); } h.appendChild(lo); }
      return h;
    },

    _shelvesGrid: function () {
      var self = this, api = this.api, grid = api.el('div', 'bp-shelves');
      var lab = api.el('div', 'bp-shelveslab'); lab.textContent = api.t('shelvesLab'); grid.appendChild(lab);
      var row = api.el('div', 'bp-shelfrow');
      this.cstate.positions.forEach(function (key) {
        var sh = self.round.shelves[key], locked = (self.cstate.lockedKey === key);
        var btn = api.el('button', 'bp-shelf' + (locked ? ' bp-locked' : '')); btn.type = 'button'; btn.setAttribute('data-key', key);
        if (sh.numeral != null) { var num = api.el('span', 'bp-shnum'); num.textContent = sh.numeral; btn.appendChild(num); btn.setAttribute('aria-label', (LANG === 'es' ? 'el número ' : (LANG === 'de' ? 'die Zahl ' : (LANG === 'fr' ? 'le nombre ' : (LANG === 'pt' ? 'o número ' : (LANG === 'it' ? 'il numero ' : (LANG === 'nl' ? 'het getal ' : 'the number ')))))) + sh.numeral); }
        else { btn.appendChild(self._hoard(sh.tens | 0, sh.ones | 0)); btn.setAttribute('aria-label', hoardAria(sh.tens | 0, sh.ones | 0)); }
        btn.addEventListener('click', function () { self._lockShelf(key); });
        self._shelfEls[key] = btn; row.appendChild(btn);
      });
      grid.appendChild(row);
      return grid;
    },
    _lockShelf: function (key) {
      if (this._flying || this.solved) return;
      Core.lock(this.cstate, key); this.msg = null; this.api.sound && this.api.sound(560);
      this.render();
    },

    _slingBar: function () {
      var self = this, api = this.api, bar = api.el('div', 'bp-slingbar');
      var sling = api.el('span', 'bp-slingstub'); sling.innerHTML = '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M22 56 L22 30 M38 56 L38 30" stroke="#8A5A2B" stroke-width="6" stroke-linecap="round"/><path d="M22 30 Q30 24 38 30" stroke="' + C.CORAL + '" stroke-width="4" fill="none"/><circle cx="30" cy="30" r="6" fill="' + C.CORAL + '"/></svg>';
      this._slingOrigin = sling; bar.appendChild(sling);
      var btn = api.el('button', 'bp-sling'); btn.type = 'button'; btn.textContent = api.t('sling');
      btn.disabled = (this.cstate.lockedKey == null);
      btn.addEventListener('click', function () { self._launch(); });
      bar.appendChild(btn);
      var hint = api.el('div', 'bp-slinghint'); hint.textContent = (this.cstate.lockedKey == null) ? api.t('slingHint') : api.t('lockedHint'); bar.appendChild(hint);
      return bar;
    },

    /* THE LAUNCH — commit-then-deliver. The pellet arcs to the LOCKED shelf, then
       fire() (which reads ONLY the lock) resolves. No aim, no motor grading. */
    _launch: function () {
      if (this._flying || this.solved || this.cstate.lockedKey == null) return;
      var self = this, root = this._rootEl, shelfEl = this._shelfEls[this.cstate.lockedKey], slingEl = this._slingOrigin;
      this.api.sound && this.api.sound(720);
      if (REDUCED || !root || !shelfEl || !slingEl) { this._resolveFire(); return; }
      var rr = root.getBoundingClientRect(), sr = slingEl.getBoundingClientRect(), tr = shelfEl.getBoundingClientRect();
      var ox = sr.left + sr.width / 2 - rr.left, oy = sr.top + sr.height / 2 - rr.top;
      var dx = (tr.left + tr.width / 2 - rr.left) - ox, dy = (tr.top + tr.height / 2 - rr.top) - oy;
      var pellet = this.api.el('div', 'bp-pellet');
      pellet.style.left = ox + 'px'; pellet.style.top = oy + 'px'; pellet.style.setProperty('--dx', dx + 'px'); pellet.style.setProperty('--dy', dy + 'px');
      this._flying = true;
      pellet.addEventListener('animationend', function () { pellet.remove(); self._resolveFire(); });
      root.appendChild(pellet);
    },
    _resolveFire: function () {
      this._flying = false;
      var shelf = this.round.shelves[this.cstate.lockedKey];   // capture BEFORE fire (wrong clears the lock)
      var r = Core.fire(this.cstate);
      if (r === 'sealed') { this._win(); return; }
      if (r === 'wrong') {
        if (shelf.numeral != null) this.msg = this.api.t('wrongNum');
        else { var k = shelf.tens | 0; this.msg = (k === 1) ? this.api.t('wrongOne') : this.api.t('wrongCrates').replace('{k}', k); }
        this.api.sound && this.api.sound(330); speak(LANG === 'es' ? 'cuenta otra vez' : (LANG === 'de' ? 'Zähl noch einmal' : (LANG === 'fr' ? 'Compte encore' : (LANG === 'pt' ? 'Conte de novo' : (LANG === 'it' ? 'Conta di nuovo' : (LANG === 'nl' ? 'Tel nog eens' : 'count again')))))); this.render();
      } else { this.render(); }
    },
    _win: function () {
      var api = this.api, shelf = this.round.shelves[this.cstate.lockedKey];
      this.solved = true;
      if (Core.firstAttemptCorrect(this.cstate)) this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this.winHoard = (shelf.numeral != null) ? (this.round.prompt.hoard || { tens: Math.floor(shelf.numeral / 10), ones: shelf.numeral % 10 }) : { tens: shelf.tens | 0, ones: shelf.ones | 0 };
      var whole = (this.winHoard.tens | 0) * 10 + (this.winHoard.ones | 0);
      this.msg = api.t('win').replace('{w}', numWord(whole));
      this.api.sound && this.api.sound(940); this.render(); this.announce(this.msg);
      this._countByTens(whole);
    },
    /* per-locale payoff (EN pilot): count by TENS (universal, no ordering
       conflict), then speak the whole word. de/nl/da/no ones-first = fast-follow. */
    _countByTens: function (whole) {
      var t = this.winHoard.tens | 0, parts = [];
      for (var i = 1; i <= t; i++) parts.push(numWord(i * 10));
      var line = parts.join(', ') + (parts.length ? ' — ' : '') + numWord(whole);
      speak(line);
    },

    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9;
      if (this.winHoard) { var opened = this._hoard(this.winHoard.tens | 0, this.winHoard.ones | 0, 'bp-opened'); root.appendChild(opened); }
      var cap = api.el('div', 'bp-wholecap'); cap.textContent = ((this.winHoard.tens | 0) * 10 + (this.winHoard.ones | 0)); root.appendChild(cap);
      var pantry = api.el('div', 'bp-pantry');
      for (var i = 0; i < n; i++) { var s = api.el('span', 'bp-cubby' + (i < this.solvedCount ? ' bp-cubby-on' : '')); s.textContent = '🧺'; pantry.appendChild(s); }
      root.appendChild(pantry);
      var nudge = api.el('div', 'bp-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/bos-berry-pantry-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[bos-berry-pantry] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.bp-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.bp-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#F3ECFB,#FBF3E4);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.bp-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.bp-bo{width:clamp(30px,7vw,42px);flex:0 0 auto;}.bp-bo svg{width:100%;height:auto;display:block;}'
        + '.bp-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.bp-head-win .bp-say{color:' + C.CORAL2 + ';}'
        /* prompt card */
        + '.bp-prompt{display:flex;flex-direction:column;align-items:center;gap:3px;background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:14px;padding:5px 14px;min-height:46px;justify-content:center;max-width:96%;}'
        + '.bp-pebble{font:800 clamp(30px,8vw,42px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.bp-qword{font:800 clamp(24px,6.5vw,34px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}.bp-qsub{font:700 clamp(9.5px,2.4vw,11px)/1 "Nunito",sans-serif;color:' + C.GOLD + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.bp-pile{display:flex;flex-wrap:wrap;gap:2.5px;justify-content:center;align-items:center;max-width:clamp(150px,52vw,220px);}'
        + '.bp-berry{width:clamp(8px,2.1vw,11px);height:clamp(8px,2.1vw,11px);border-radius:50%;background:' + C.CORAL + ';box-shadow:inset -1px -1px 0 rgba(0,0,0,.12);}.bp-berry-gap{margin-right:6px;}'
        /* hoard = crates + loose */
        + '.bp-hoard{display:flex;flex-direction:column;align-items:center;gap:3px;}'
        + '.bp-crates{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:100%;}'
        + '.bp-crate{width:clamp(18px,4.6vw,24px);height:clamp(18px,4.6vw,24px);flex:0 0 auto;}.bp-crate-svg{width:100%;height:100%;display:block;}'
        + '.bp-loose{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:clamp(70px,24vw,110px);}'
        + '.bp-prompt-hoard .bp-crate{width:clamp(20px,5.2vw,26px);height:clamp(20px,5.2vw,26px);}'
        /* shelves */
        + '.bp-shelves{display:flex;flex-direction:column;align-items:center;gap:3px;width:100%;}'
        + '.bp-shelveslab{font:700 clamp(9.5px,2.4vw,11px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;opacity:.7;}'
        + '.bp-shelfrow{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(5px,1.5vw,9px);width:100%;max-width:340px;}'
        + '@media (min-width:560px){.bp-shelfrow{grid-template-columns:repeat(4,1fr);max-width:540px;}}'
        + '.bp-shelf{position:relative;min-height:56px;border-radius:13px;border:2px solid rgba(20,107,94,.18);background:#FBF7EF;cursor:pointer;touch-action:manipulation;display:flex;align-items:center;justify-content:center;padding:6px 4px;box-shadow:0 2px 0 rgba(20,107,94,.1);}.bp-shelf:active{transform:translateY(1px);}'
        + '.bp-locked{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.22),0 2px 0 ' + C.CORAL2 + ';background:#FFF6EF;}'
        + '.bp-shnum{font:800 clamp(24px,6.4vw,32px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* sling bar */
        + '.bp-slingbar{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;max-width:340px;}'
        + '.bp-slingstub{width:clamp(28px,7vw,36px);}.bp-slingstub svg{width:100%;height:auto;display:block;}'
        + '.bp-sling{width:100%;min-height:56px;border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.bp-sling:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}.bp-sling:disabled{opacity:.45;box-shadow:0 4px 0 rgba(217,87,47,.4);cursor:default;}'
        + '.bp-slinghint{font:700 clamp(10.5px,2.7vw,12.5px)/1.1 "Nunito",sans-serif;color:#9a8f78;text-align:center;}'
        + '.bp-shelf:focus-visible,.bp-sling:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* the launch pellet (transient; pointer-events none — never affects layout) */
        + '.bp-pellet{position:absolute;width:16px;height:16px;border-radius:50%;background:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.3);pointer-events:none;z-index:6;animation:bpArc .5s ease-in forwards;}'
        + '@keyframes bpArc{0%{transform:translate(0,0);}50%{transform:translate(calc(var(--dx)/2),calc(var(--dy) - 46px)) scale(1.1);}100%{transform:translate(var(--dx),var(--dy)) scale(.7);}}'
        /* done */
        + '.bp-opened .bp-crate{animation:bpPop .4s ease both;}@keyframes bpPop{0%{transform:scale(.6);opacity:0;}100%{transform:scale(1);opacity:1;}}'
        + '.bp-wholecap{font:800 clamp(28px,7vw,38px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#fff;border:3px solid ' + C.CORAL + ';border-radius:14px;padding:2px 18px;}'
        + '.bp-pantry{display:flex;gap:1px;flex-wrap:wrap;justify-content:center;}.bp-cubby{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.bp-cubby-on{filter:none;}'
        + '.bp-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* short-height compaction */
        + '@media (max-height:940px){.bp-root{gap:4px;}.bp-slingstub{width:clamp(22px,5.5vw,28px);}.bp-slingbar{gap:1px;}.bp-slinghint{font-size:10.5px;}.bp-prompt{min-height:40px;padding:4px 12px;}.bp-shelves{gap:2px;}}'
        + '@media (max-height:720px){.bp-bo{width:30px;}.bp-pebble{font-size:30px;}.bp-qword{font-size:24px;}}'
        + '@media (max-height:640px){.bp-root{gap:1px;padding:4px;}.bp-bo{width:26px;}.bp-head{gap:4px;}.bp-say{font-size:11px;}.bp-prompt{min-height:34px;padding:2px 9px;}.bp-pebble{font-size:22px;}.bp-qword{font-size:18px;}.bp-qsub{font-size:9px;}.bp-shelveslab{display:none;}.bp-shelfrow{gap:4px;}.bp-shelf{min-height:44px;padding:3px 2px;}.bp-crate{width:16px;height:16px;}.bp-shnum{font-size:20px;}.bp-slingstub{display:none;}.bp-slingbar{gap:0;}.bp-sling{min-height:46px;}.bp-slinghint{font-size:9.5px;}.bp-berry{width:7px;height:7px;}}'
        + '@media (max-width:340px){.bp-root{padding:5px;}.bp-shelfrow{gap:4px;}}'
        + '@media (prefers-reduced-motion:reduce){.bp-opened .bp-crate,.bp-pellet{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-bos-berry-pantry', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'bos-berry-pantry.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'slingHint'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
