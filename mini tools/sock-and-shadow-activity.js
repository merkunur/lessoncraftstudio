/* =====================================================================
   SOCK & SHADOW — ACTIVITY  (sock-and-shadow-activity.js)
   ---------------------------------------------------------------------
   CCSS SL.K.6 (express ideas CLEARLY) + L.1.1.J. The Lost-and-Found
   Puppet Theater: SOCK works the counter + CAN see the bin; the child is
   Sock's voice. SHADOW is behind the curtain + CANNOT see — Shadow only
   HEARS the words, then fetches. The child composes Sock's turn from
   meaning-chips → "Tell Shadow" → Shadow acts. A vague turn → Shadow holds
   BOTH cups ("which one? I can't tell from back here!"); too many words →
   "I forgot half!". Only the minimal-sufficient turn wins.

   Outcome DERIVED by mini tools/puppet-speak-core.js (resolve = match-set
   cardinality + memory cap; NO stored answer; politeness/feeling INERT).
   Two phases (internal state; the #7 pattern): COMPOSE → RESOLVE → done.
   No timer/score/streak. Sock/Shadow/customers = SVG PLACEHOLDERS. Words
   ALWAYS DOM. No-mic: TTS voices the turn; the page carries the scope note.
   0 lines to the protected cores + lcs-shell.{js,css}. answerType:'state'.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PuppetSpeakCore;

  /* ---- German surface (0 lines to puppet-speak-core.js; the rounds are locale-neutral
     enum keys, so the whole DE surface lives here in label maps + deUtter). #101. ---- */
  var LANG = 'en';                                  // set in init from api.lang
  var ART_DE   = { cup: 'Die', ball: 'Der', hat: 'Der', teddy: 'Der', car: 'Das', block: 'Der', blocks: 'Die', stool: 'Der' };
  var NOUN_DE  = { cup: 'Tasse', ball: 'Ball', hat: 'Hut', teddy: 'Teddy', car: 'Auto', block: 'Baustein', blocks: 'Bausteine', stool: 'Stuhl' };
  var CHIP_DE  = { red: 'rot', blue: 'blau', green: 'grün', brown: 'braun', white: 'weiß', big: 'groß', small: 'klein' };   // BASE (chip tiles)
  var POS_DE   = { top: 'oben', bottom: 'unten' };
  var FEEL_DE  = { sad: 'traurig', mad: 'wütend' };
  var REASON_DE       = { 'tower-fell': 'mein Turm umgefallen ist', 'lost-teddy': 'ich meinen Teddy verloren habe', 'cant-reach': 'ich nicht rankomme' };
  var SHORT_REASON_DE = { 'tower-fell': 'Turm umgefallen', 'lost-teddy': 'Teddy weg', 'cant-reach': 'nicht ran' };   // short tap-labels; full clause in deUtter
  function infl(k) { return CHIP_DE[k] + 'e'; }     // uniform -e after the definite article (nominative sing.), all genders
  function deUtter(round, turn) {
    var t = turn, a = t.attrs || {};
    if (round.listenerAction === 'mood') return 'Ich bin ' + (FEEL_DE[t.feeling] || '…') + (t.reason ? ', weil ' + (REASON_DE[t.reason] || '') : '') + '.';
    var parts = [ART_DE[t.object] || 'Das'];
    if (a.size) parts.push(infl(a.size));
    if (a.color) parts.push(infl(a.color));
    parts.push(NOUN_DE[t.object] || '…');
    if (a.position) parts.push(POS_DE[a.position]);
    return parts.join(' ') + '.';
  }
  function deObjAria(o) {                            // objSVG aria — grammatical + plural-safe
    if (o.object === 'blocks') return 'Die Bausteine';
    return [ART_DE[o.object], (o.size ? infl(o.size) : ''), (o.color ? infl(o.color) : ''), NOUN_DE[o.object]].filter(Boolean).join(' ');
  }

  /* ---- French surface (0 lines to puppet-speak-core.js; rounds are locale-neutral enum keys). #112.
     ⚠ French noun-phrase: article + [SIZE before noun] + noun + [COLOR after noun] + [position],
     all agreeing in gender+number (per-noun GENDER_FR). Distinct from de (both adjectives before). ---- */
  var GENDER_FR = { cup: 'f', ball: 'm', hat: 'm', teddy: 'm', car: 'f', block: 'm', blocks: 'p', stool: 'm' };
  var NOUN_FR   = { cup: 'tasse', ball: 'ballon', hat: 'chapeau', teddy: 'nounours', car: 'voiture', block: 'cube', blocks: 'cubes', stool: 'tabouret' };
  var ART_FR    = { m: 'Le', f: 'La', p: 'Les' };
  var SIZE_FR   = { big: { m: 'grand', f: 'grande', p: 'grands' }, small: { m: 'petit', f: 'petite', p: 'petits' } };
  var COLOR_FR  = { red: { m: 'rouge', f: 'rouge', p: 'rouges' }, blue: { m: 'bleu', f: 'bleue', p: 'bleus' }, green: { m: 'vert', f: 'verte', p: 'verts' }, brown: { m: 'brun', f: 'brune', p: 'bruns' }, white: { m: 'blanc', f: 'blanche', p: 'blancs' } };
  var CHIP_FR   = { red: 'rouge', blue: 'bleu', green: 'vert', brown: 'brun', white: 'blanc', big: 'grand', small: 'petit' };   // BASE (chip tiles, masc-sing citation)
  var POS_FR    = { top: 'en haut', bottom: 'en bas' };
  var FEEL_FR   = { sad: 'triste', mad: 'en colère' };   // both INVARIABLE (speaker gender unknown)
  var REASON_FR       = { 'tower-fell': 'ma tour est tombée', 'lost-teddy': 'j’ai perdu mon nounours', 'cant-reach': 'je n’arrive pas à l’attraper' };
  var SHORT_REASON_FR = { 'tower-fell': 'tour tombée', 'lost-teddy': 'nounours perdu', 'cant-reach': 'pas atteindre' };
  function frGender(obj) { return GENDER_FR[obj] || 'm'; }
  function frAdj(map, key, g) { var m = map[key]; return m ? (m[g] || m.m) : key; }
  function frUtter(round, turn) {
    var t = turn, a = t.attrs || {};
    if (round.listenerAction === 'mood') return 'Je suis ' + (FEEL_FR[t.feeling] || '…') + (t.reason ? ', parce que ' + (REASON_FR[t.reason] || '') : '') + '.';
    var g = frGender(t.object), parts = [ART_FR[g] || 'Le'];
    if (a.size) parts.push(frAdj(SIZE_FR, a.size, g));      // SIZE before the noun
    parts.push(NOUN_FR[t.object] || '…');
    if (a.color) parts.push(frAdj(COLOR_FR, a.color, g));   // COLOR after the noun
    if (a.position) parts.push(POS_FR[a.position]);
    return parts.join(' ') + '.';
  }
  function frObjAria(o) {                            // objSVG aria — agreed + plural-safe
    if (o.object === 'blocks') return 'Les cubes';
    var g = frGender(o.object);
    return [ART_FR[g], (o.size ? frAdj(SIZE_FR, o.size, g) : ''), NOUN_FR[o.object], (o.color ? frAdj(COLOR_FR, o.color, g) : '')].filter(Boolean).join(' ');
  }

  /* ---- Spanish surface (0 lines to puppet-speak-core.js; rounds are locale-neutral enum keys). #101.
     ⚠ Spanish noun-phrase: article + noun + [COLOR agreed] + [SIZE agreed] + [position], color+size AFTER
     the noun (distinct from de [both before] and fr [size before / color after]); per-noun GENDER_ES. ---- */
  var GENDER_ES = { cup: 'f', ball: 'f', hat: 'm', teddy: 'm', car: 'm', block: 'm', blocks: 'p', stool: 'm' };
  var NOUN_ES   = { cup: 'taza', ball: 'pelota', hat: 'sombrero', teddy: 'osito', car: 'carro', block: 'bloque', blocks: 'bloques', stool: 'banquito' };
  var ART_ES    = { m: 'El', f: 'La', p: 'Los' };   // capitalized, sentence-initial (mirrors de's capitalized articles)
  var COLOR_ES  = { red: { m: 'rojo', f: 'roja' }, blue: { m: 'azul', f: 'azul' }, green: { m: 'verde', f: 'verde' }, brown: { m: 'café', f: 'café' }, white: { m: 'blanco', f: 'blanca' } };   // café/azul/verde INVARIANT
  var SIZE_ES   = { big: { m: 'grande', f: 'grande' }, small: { m: 'chico', f: 'chica' } };   // grande INVARIANT
  var CHIP_ES   = { red: 'rojo', blue: 'azul', green: 'verde', brown: 'café', white: 'blanco', big: 'grande', small: 'chico' };   // BASE (chip tiles, masc-sing citation)
  var POS_ES      = { top: 'de arriba', bottom: 'de abajo' };   // in-sentence
  var POSCHIP_ES  = { top: 'arriba', bottom: 'abajo' };         // chip tiles
  var FEELPRED_ES = { sad: 'Estoy triste', mad: 'Me da coraje' };   // spoken predicate — BOTH invariant (kid gender unknown; "Me da coraje" avoids the masc leak of "Estoy enojado")
  var FEELCHIP_ES = { sad: 'triste', mad: 'enojado' };             // chip tiles (recognizable word)
  var REASON_ES       = { 'tower-fell': 'se me cayó la torre', 'lost-teddy': 'perdí mi osito', 'cant-reach': 'no alcanzo mi juguete' };   // keep the dative "se me"
  var SHORT_REASON_ES = { 'tower-fell': 'torre caída', 'lost-teddy': 'osito perdido', 'cant-reach': 'no alcanzo' };
  function esGender(obj) { return GENDER_ES[obj] || 'm'; }
  function esAdj(map, key, g) { var m = map[key]; return m ? (m[g] || m.m) : key; }
  function esUtter(round, turn) {
    var t = turn, a = t.attrs || {};
    if (round.listenerAction === 'mood') return (FEELPRED_ES[t.feeling] || '…') + (t.reason ? ' porque ' + (REASON_ES[t.reason] || '') : '') + '.';
    var g = esGender(t.object), parts = [ART_ES[g] || 'El', NOUN_ES[t.object] || '…'];
    if (a.color) parts.push(esAdj(COLOR_ES, a.color, g));   // COLOR before SIZE, both after the noun
    if (a.size) parts.push(esAdj(SIZE_ES, a.size, g));
    if (a.position) parts.push(POS_ES[a.position]);
    var s = parts.join(' ');
    return s.charAt(0).toUpperCase() + s.slice(1) + '.';
  }
  function esObjAria(o) {                            // objSVG aria — agreed + plural-safe
    if (o.object === 'blocks') return 'Los bloques';
    var g = esGender(o.object);
    return [ART_ES[g], NOUN_ES[o.object], (o.color ? esAdj(COLOR_ES, o.color, g) : ''), (o.size ? esAdj(SIZE_ES, o.size, g) : '')].filter(Boolean).join(' ');
  }

  /* ---- pt-BR noun-phrase (like es: article + noun + [COLOR agreed] + [SIZE agreed] + [position],
     color+size AFTER the noun); per-noun GENDER_PT. Feelings gender-safe (kid gender unknown). #101. ---- */
  var GENDER_PT = { cup: 'f', ball: 'f', hat: 'm', teddy: 'm', car: 'm', block: 'm', blocks: 'p', stool: 'm' };
  var NOUN_PT   = { cup: 'xícara', ball: 'bola', hat: 'chapéu', teddy: 'ursinho', car: 'carrinho', block: 'bloco', blocks: 'blocos', stool: 'banquinho' };
  var ART_PT    = { m: 'O', f: 'A', p: 'Os' };   // capitalized, sentence-initial
  var COLOR_PT  = { red: { m: 'vermelho', f: 'vermelha' }, blue: { m: 'azul', f: 'azul' }, green: { m: 'verde', f: 'verde' }, brown: { m: 'marrom', f: 'marrom' }, white: { m: 'branco', f: 'branca' } };   // azul/verde/marrom INVARIANT (gender)
  var SIZE_PT   = { big: { m: 'grande', f: 'grande' }, small: { m: 'pequeno', f: 'pequena' } };   // grande INVARIANT
  var CHIP_PT   = { red: 'vermelho', blue: 'azul', green: 'verde', brown: 'marrom', white: 'branco', big: 'grande', small: 'pequeno' };   // BASE (chip tiles, masc-sing citation)
  var POS_PT      = { top: 'de cima', bottom: 'de baixo' };   // in-sentence
  var POSCHIP_PT  = { top: 'em cima', bottom: 'embaixo' };    // chip tiles
  var FEELPRED_PT = { sad: 'Estou triste', mad: 'Estou com raiva' };   // spoken predicate — BOTH invariant (kid gender unknown; "com raiva" avoids the bravo/brava leak)
  var FEELCHIP_PT = { sad: 'triste', mad: 'com raiva' };               // chip tiles (gender-safe)
  var REASON_PT       = { 'tower-fell': 'minha torre caiu', 'lost-teddy': 'perdi meu ursinho', 'cant-reach': 'não alcanço meu brinquedo' };
  var SHORT_REASON_PT = { 'tower-fell': 'torre caiu', 'lost-teddy': 'ursinho perdido', 'cant-reach': 'não alcanço' };
  function ptGender(obj) { return GENDER_PT[obj] || 'm'; }
  function ptAdj(map, key, g) { var m = map[key]; return m ? (m[g] || m.m) : key; }
  function ptUtter(round, turn) {
    var t = turn, a = t.attrs || {};
    if (round.listenerAction === 'mood') return (FEELPRED_PT[t.feeling] || '…') + (t.reason ? ' porque ' + (REASON_PT[t.reason] || '') : '') + '.';
    var g = ptGender(t.object), parts = [ART_PT[g] || 'O', NOUN_PT[t.object] || '…'];
    if (a.color) parts.push(ptAdj(COLOR_PT, a.color, g));   // COLOR before SIZE, both after the noun
    if (a.size) parts.push(ptAdj(SIZE_PT, a.size, g));
    if (a.position) parts.push(POS_PT[a.position]);
    var s = parts.join(' ');
    return s.charAt(0).toUpperCase() + s.slice(1) + '.';
  }
  function ptObjAria(o) {                            // objSVG aria — agreed + plural-safe
    if (o.object === 'blocks') return 'Os blocos';
    var g = ptGender(o.object);
    return [ART_PT[g], NOUN_PT[o.object], (o.color ? ptAdj(COLOR_PT, o.color, g) : ''), (o.size ? ptAdj(SIZE_PT, o.size, g) : '')].filter(Boolean).join(' ');
  }

  /* ---- it noun-phrase (Romance model like es/pt: article + noun + COLOR + SIZE + [position], adjectives AFTER the noun; gender
     agreement). ⚠ Italian articles are INITIAL-dependent, so ART_IT is PER-NOUN (La/Il/L'/Lo/I): l'orsetto (elision, no space),
     lo sgabello (s impura), i cubi (plural). Feelings gender-safe (§A.13.54; «Che rabbia!» = a fem NOUN the speaker has). #101. ---- */
  var GENDER_IT = { cup: 'f', ball: 'f', hat: 'm', teddy: 'm', car: 'f', block: 'm', blocks: 'p', stool: 'm' };
  var NOUN_IT   = { cup: 'tazza', ball: 'palla', hat: 'cappello', teddy: 'orsetto', car: 'macchina', block: 'cubo', blocks: 'cubi', stool: 'sgabello' };
  var ART_IT    = { cup: 'La', ball: 'La', hat: 'Il', teddy: 'L’', car: 'La', block: 'Il', blocks: 'I', stool: 'Lo' };   // PER-NOUN (initial-dependent); L’ elides onto the noun (no space)
  var COLOR_IT  = { red: { m: 'rosso', f: 'rossa' }, blue: { m: 'blu', f: 'blu' }, green: { m: 'verde', f: 'verde' }, brown: { m: 'marrone', f: 'marrone' }, white: { m: 'bianco', f: 'bianca' } };   // blu/verde/marrone INVARIANT
  var SIZE_IT   = { big: { m: 'grande', f: 'grande' }, small: { m: 'piccolo', f: 'piccola' } };   // grande INVARIANT
  var CHIP_IT   = { red: 'rosso', blue: 'blu', green: 'verde', brown: 'marrone', white: 'bianco', big: 'grande', small: 'piccolo' };   // BASE (chip tiles, masc-sing citation)
  var POS_IT      = { top: 'in alto', bottom: 'in basso' };   // in-sentence
  var POSCHIP_IT  = { top: 'sopra', bottom: 'sotto' };         // chip tiles
  var FEELPRED_IT = { sad: 'Sono triste', mad: 'Che rabbia!' };   // spoken predicate — both gender-safe (triste invariant; «Che rabbia!» = fem noun, no agreement with the child)
  var FEELCHIP_IT = { sad: 'triste', mad: 'arrabbiato' };         // chip tiles (recognizable word; masc citation only)
  var REASON_IT       = { 'tower-fell': 'è caduta la torre', 'lost-teddy': 'ho perso l’orsetto', 'cant-reach': 'non arrivo al giocattolo' };
  var SHORT_REASON_IT = { 'tower-fell': 'torre caduta', 'lost-teddy': 'orsetto perso', 'cant-reach': 'non arrivo' };
  function itGender(obj) { return GENDER_IT[obj] || 'm'; }
  function itAdj(map, key, g) { var m = map[key]; return m ? (m[g] || m.m) : key; }
  function itArtNoun(obj) { var a = ART_IT[obj] || 'Il', n = NOUN_IT[obj] || '…'; return a.charAt(a.length - 1) === '’' ? (a + n) : (a + ' ' + n); }   // «L’orsetto» / «La tazza»
  function itUtter(round, turn) {
    var t = turn, a = t.attrs || {};
    if (round.listenerAction === 'mood') {
      var fp = FEELPRED_IT[t.feeling] || '…';
      if (!t.reason) return fp.charAt(fp.length - 1) === '!' ? fp : (fp + '.');
      var rc = REASON_IT[t.reason] || '';
      // «Sono triste» → «… perché …»; «Che rabbia!» (ends in !) → reason as a capitalized standalone clause
      if (fp.charAt(fp.length - 1) === '!') return fp + ' ' + rc.charAt(0).toUpperCase() + rc.slice(1) + '.';
      return fp + ' perché ' + rc + '.';
    }
    var g = itGender(t.object), parts = [itArtNoun(t.object)];
    if (a.color) parts.push(itAdj(COLOR_IT, a.color, g));   // COLOR before SIZE, both after the noun
    if (a.size) parts.push(itAdj(SIZE_IT, a.size, g));
    if (a.position) parts.push(POS_IT[a.position]);
    return parts.join(' ') + '.';   // article is already sentence-initial-capitalized
  }
  function itObjAria(o) {                            // objSVG aria — agreed + plural-safe
    if (o.object === 'blocks') return 'I cubi';
    var g = itGender(o.object), parts = [itArtNoun(o.object)];
    if (o.color) parts.push(itAdj(COLOR_IT, o.color, g));
    if (o.size) parts.push(itAdj(SIZE_IT, o.size, g));
    return parts.join(' ');
  }

  /* ---- nl noun-phrase (structurally like de: article + SIZE + COLOR + noun + [position], both
     adjectives BEFORE the noun). ⚠ Dutch inflection is IRREGULAR (rood→rode, wit→witte, groot→grote)
     → INFL_NL lookup, NOT CHIP_NL[k]+'e'. After the definite article both de-/het-words take -e. #101. ---- */
  var ART_NL   = { cup: 'De', ball: 'De', hat: 'De', teddy: 'De', car: 'De', block: 'Het', blocks: 'De', stool: 'De' };
  var NOUN_NL  = { cup: 'beker', ball: 'bal', hat: 'hoed', teddy: 'teddybeer', car: 'auto', block: 'blok', blocks: 'blokken', stool: 'kruk' };
  var CHIP_NL  = { red: 'rood', blue: 'blauw', green: 'groen', brown: 'bruin', white: 'wit', big: 'groot', small: 'klein' };        // BASE (chip tiles)
  var INFL_NL  = { red: 'rode', blue: 'blauwe', green: 'groene', brown: 'bruine', white: 'witte', big: 'grote', small: 'kleine' };  // after the definite article (article-independent)
  var POS_NL   = { top: 'bovenaan', bottom: 'onderaan' };
  var FEEL_NL  = { sad: 'verdrietig', mad: 'boos' };   // predicative "Ik ben ___" — gender-invariant in Dutch
  var REASON_NL       = { 'tower-fell': 'mijn toren is omgevallen', 'lost-teddy': 'ik mijn teddy kwijt ben', 'cant-reach': 'ik er niet bij kan' };   // verb-final omdat-clause
  var SHORT_REASON_NL = { 'tower-fell': 'toren omgevallen', 'lost-teddy': 'teddy kwijt', 'cant-reach': 'kan er niet bij' };   // short tap-labels; full clause in nlUtter
  function nlInfl(k) { return INFL_NL[k] || k; }   // ⚠ NOT CHIP_NL[k]+'e' — Dutch inflection is irregular
  function nlUtter(round, turn) {
    var t = turn, a = t.attrs || {};
    if (round.listenerAction === 'mood') return 'Ik ben ' + (FEEL_NL[t.feeling] || '…') + (t.reason ? ', omdat ' + (REASON_NL[t.reason] || '') : '') + '.';
    var parts = [ART_NL[t.object] || 'De'];
    if (a.size) parts.push(nlInfl(a.size));
    if (a.color) parts.push(nlInfl(a.color));
    parts.push(NOUN_NL[t.object] || '…');
    if (a.position) parts.push(POS_NL[a.position]);
    return parts.join(' ') + '.';
  }
  function nlObjAria(o) {                            // objSVG aria — grammatical + plural-safe
    if (o.object === 'blocks') return 'De blokken';
    return [ART_NL[o.object], (o.size ? nlInfl(o.size) : ''), (o.color ? nlInfl(o.color) : ''), NOUN_NL[o.object]].filter(Boolean).join(' ');
  }

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', CURTAIN: '#185E54'
  };
  var COLORS = { red: '#E2574B', blue: '#3F76C7', green: '#4FA86A', brown: '#9C6B43', white: '#EDEDF0' };
  var SHORT_REASON = { 'tower-fell': 'tower fell', 'lost-teddy': 'lost teddy', 'cant-reach': "can't reach" };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function posRank(p) { return p === 'top' ? 0 : (p === 'bottom' ? 2 : 1); }   // stack order top→bottom (§101 truthful oben/unten)

  /* a bin object — a simple SVG noun-shape tinted by colour + scaled by size. */
  function objSVG(o, opts) {
    opts = opts || {};
    var tint = COLORS[o.color] || '#B9C4C0', stroke = o.color === 'white' ? '#B9C0C8' : 'rgba(0,0,0,.18)';
    var sc = o.size === 'small' ? 0.74 : 1, body;
    switch (o.object) {
      case 'cup': body = '<path d="M22 26 L78 26 L70 82 Q50 90 30 82 Z" fill="' + tint + '"/><path d="M78 36 Q94 38 92 56 Q90 70 76 66" fill="none" stroke="' + tint + '" stroke-width="7"/>'; break;
      case 'ball': body = '<circle cx="50" cy="56" r="30" fill="' + tint + '"/><path d="M28 46 Q50 60 72 46" stroke="rgba(255,255,255,.5)" stroke-width="3" fill="none"/>'; break;
      case 'hat': body = '<ellipse cx="50" cy="80" rx="38" ry="9" fill="' + tint + '"/><path d="M30 80 Q34 30 50 30 Q66 30 70 80 Z" fill="' + tint + '"/>'; break;
      case 'teddy': body = '<circle cx="32" cy="34" r="11" fill="' + tint + '"/><circle cx="68" cy="34" r="11" fill="' + tint + '"/><circle cx="50" cy="58" r="26" fill="' + tint + '"/><circle cx="44" cy="52" r="2.5" fill="#2A2A35"/><circle cx="56" cy="52" r="2.5" fill="#2A2A35"/>'; break;
      case 'car': body = '<rect x="16" y="54" width="68" height="22" rx="7" fill="' + tint + '"/><path d="M30 54 Q38 38 56 40 L70 54 Z" fill="' + tint + '"/><circle cx="33" cy="78" r="9" fill="#384149"/><circle cx="67" cy="78" r="9" fill="#384149"/>'; break;
      case 'block': body = '<rect x="26" y="32" width="48" height="48" rx="6" fill="' + tint + '"/>'; break;
      case 'blocks': body = '<rect x="30" y="56" width="40" height="26" rx="4" fill="' + tint + '"/><rect x="36" y="32" width="28" height="24" rx="4" fill="' + (COLORS.blue) + '"/>'; break;
      case 'stool': body = '<rect x="26" y="40" width="48" height="12" rx="4" fill="' + tint + '"/><rect x="30" y="52" width="7" height="30" fill="' + tint + '"/><rect x="63" y="52" width="7" height="30" fill="' + tint + '"/>'; break;
      default: body = '<circle cx="50" cy="55" r="28" fill="' + tint + '"/>';
    }
    var aria = LANG === 'de' ? deObjAria(o) : LANG === 'fr' ? frObjAria(o) : LANG === 'es' ? esObjAria(o) : LANG === 'pt' ? ptObjAria(o) : LANG === 'it' ? itObjAria(o) : LANG === 'nl' ? nlObjAria(o) : ((o.size ? o.size + ' ' : '') + (o.color ? o.color + ' ' : '') + o.object);
    return '<svg class="ss-obj-svg" viewBox="0 0 100 100" role="img" aria-label="' + esc(aria) + '" style="transform:scale(' + sc + ')"><g stroke="' + stroke + '" stroke-width="1.5">' + body + '</g></svg>';
  }

  function puppet(kind, pose) {
    if (kind === 'sock') return '<svg viewBox="0 0 100 100" class="ss-pup-svg"><ellipse cx="50" cy="60" rx="22" ry="30" fill="' + C.CORAL + '"/><ellipse cx="50" cy="44" rx="20" ry="16" fill="' + C.CORAL + '"/><ellipse cx="50" cy="58" rx="15" ry="6" fill="#C24A28"/><circle cx="42" cy="40" r="4" fill="#fff"/><circle cx="58" cy="40" r="4" fill="#fff"/><circle cx="42" cy="40" r="2" fill="#2A2A35"/><circle cx="58" cy="40" r="2" fill="#2A2A35"/></svg>';
    // shadow
    var eyes = pose === 'worried' ? '<path d="M38 42 Q42 46 46 42" stroke="#cfe" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M54 42 Q58 46 62 42" stroke="#cfe" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : '<circle cx="42" cy="42" r="3" fill="#cfe"/><circle cx="58" cy="42" r="3" fill="#cfe"/>';
    return '<svg viewBox="0 0 100 100" class="ss-pup-svg"><ellipse cx="50" cy="60" rx="22" ry="30" fill="' + C.CURTAIN + '"/><ellipse cx="50" cy="44" rx="20" ry="16" fill="' + C.CURTAIN + '"/>' + eyes + '<path d="M44 54 Q50 ' + (pose === 'worried' ? '50' : '58') + ' 56 54" stroke="#cfe" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
  }

  global.SockAndShadowActivity = {
    id: 'sock-and-shadow-activity',

    strings: {
      title: { en: 'Sock & Shadow', de: 'Socke & Schatten', fr: 'Chaussette et Ombre', es: 'Calcetín y Sombra', pt: 'Meia e Sombra', it: 'Calzino e Ombra', nl: 'Sok en Schaduw' },
      prompt: { en: "Tell Shadow which one.", de: 'Sag Schatten, was es ist.', fr: 'Dis à Ombre lequel c’est.', es: 'Dile a Sombra cuál es.', pt: 'Diga para a Sombra qual é.', it: 'Spiega a Ombra qual è.', nl: 'Vertel Schaduw wat het is.' },
      tellFetch: { en: 'The kid lost this one. Tell Shadow which to fetch.', de: 'Das Kind hat das hier verloren. Sag Schatten, was er holen soll.', fr: 'L’enfant a perdu celui-ci. Dis à Ombre lequel aller chercher.', es: 'Se le perdió esto. Dile a Sombra cuál traer.', pt: 'A criança perdeu este aqui. Diga para a Sombra qual buscar.', it: 'Il bambino ha perso questo. Spiega a Ombra quale prendere.', nl: 'Het kind is dit kwijt. Zeg welk voorwerp Schaduw moet pakken.' },
      tellMood: { en: 'Tell Shadow how the kid feels — and why.', de: 'Sag Schatten, wie sich das Kind fühlt – und warum.', fr: 'Dis à Ombre ce qu’il ressent, et pourquoi.', es: 'Dile a Sombra cómo se siente — y por qué.', pt: 'Diga para a Sombra como a criança se sente — e por quê.', it: 'Spiega a Ombra come si sente il bambino, e perché.', nl: 'Zeg hoe het kind zich voelt — en waarom.' },
      tell: { en: 'Tell Shadow', de: 'Sag es Schatten', fr: 'Dis-le à Ombre', es: 'Dile a Sombra', pt: 'Falar com a Sombra', it: 'Parla con Ombra', nl: 'Zeg het tegen Schaduw' },
      needObject: { en: 'Pick what it is first.', de: 'Sag zuerst, was es ist.', fr: 'Dis d’abord ce que c’est.', es: 'Primero escoge qué es.', pt: 'Escolha primeiro o que é.', it: 'Prima scegli che cosa è.', nl: 'Kies eerst een voorwerp.' },
      again: { en: 'Tell Shadow again', de: 'Sag es Schatten nochmal', fr: 'Redis-le à Ombre', es: 'Dile otra vez a Sombra.', pt: 'Fale de novo com a Sombra', it: 'Parla di nuovo con Ombra', nl: 'Nog een keer' },
      ambiguous: { en: "I can't tell from back here — which {cat}?", de: "Ich seh's von hier hinten nicht – welche {cat}?", fr: 'Je ne vois pas d’ici — quelle {cat} ?', es: 'Mmm, no me queda claro. Dime {cat}.', pt: 'Não sei bem daqui — qual {cat}?', it: 'Non lo vedo bene da qui: quale {cat}?', nl: 'Er zijn er meer zo. Kies ook een {cat}.' },
      overwhelmed: { en: 'Too many words — I forgot half! Just what I need?', de: 'Zu viele Wörter – die Hälfte hab ich vergessen! Nur das Nötigste?', fr: 'Trop de mots — j’en ai oublié la moitié ! Juste l’essentiel ?', es: '¡Uy, muchas palabras! Se me olvidó la mitad. ¿Nada más lo que necesito?', pt: 'Palavras demais — esqueci metade! Só o que eu preciso?', it: 'Troppe parole, ne ho dimenticata metà! Solo quello che serve?', nl: 'Dat zijn er te veel. Haal er een weg.' },
      wrong: { en: "Hmm, I don't see that one. Tell me again?", de: "Hmm, das seh ich hier nicht. Sag's nochmal?", fr: 'Hmm, je ne le vois pas ici. Tu peux répéter ?', es: 'Mmm, no lo encuentro. ¿Me lo dices otra vez?', pt: 'Hmm, não estou vendo esse aqui. Fala de novo?', it: 'Mmm, non lo vedo. Me lo ridici?', nl: 'Oeps, dat was niet de goede.' },
      clear: { en: 'Got it! Here you go.', de: 'Hab ich! Hier, bitte.', fr: 'Ça y est ! Tiens, voilà.', es: '¡Listo! Aquí está.', pt: 'Achei! Aqui está.', it: 'Trovato! Ecco qua.', nl: 'Gelukt! Hier, alsjeblieft.' },
      catColor: { en: 'colour', de: 'Farbe', fr: 'couleur', es: 'el color', pt: 'cor', it: 'il colore', nl: 'kleur' }, catSize: { en: 'size', de: 'Größe', fr: 'taille', es: 'el tamaño', pt: 'tamanho', it: 'la grandezza', nl: 'grootte' }, catPosition: { en: 'spot', de: 'Stelle', fr: 'place', es: 'dónde está', pt: 'lugar', it: 'il posto', nl: 'plek' }, catReason: { en: 'reason', de: 'Grund', fr: 'raison', es: 'por qué', pt: 'motivo', it: 'il perché', nl: 'reden' },
      hintCheck: { en: 'Tell Shadow, then tap Check.', de: 'Sag es Schatten, dann tipp auf Prüfen.', fr: 'Dis-le à Ombre, puis touche Vérifier.', es: 'Dile a Sombra y toca Comprobar.', pt: 'Fale com a Sombra e toque em Verificar.', it: 'Parla con Ombra, poi tocca Verifica.', nl: 'Zeg het tegen Schaduw, dan tik je op Controleer.' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.phase = 'compose'; this.turn = null; this.outcome = null; this.misses = 0;
      this.readOnly = false; this.solved = 0; this.glowCat = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.phase = 'compose'; this.outcome = null; this.misses = 0; this.readOnly = false; this.glowCat = null;
      this.turn = { object: null, attrs: {}, feeling: null, reason: null, politeness: null };
      this._chipOrder = null;
    },

    /* the meaning-bearing placed chips, in reading order */
    _placed: function () {
      var t = this.turn, out = [];
      if (t.feeling) out.push({ slot: 'feeling', value: t.feeling });
      if (t.attrs.size) out.push({ slot: 'size', value: t.attrs.size });
      if (t.attrs.color) out.push({ slot: 'color', value: t.attrs.color });
      if (t.object) out.push({ slot: 'object', value: t.object });
      if (t.attrs.position) out.push({ slot: 'position', value: t.attrs.position });
      if (t.reason) out.push({ slot: 'reason', value: t.reason });
      if (t.politeness) out.push({ slot: 'politeness', value: t.politeness });
      return out;
    },
    _has: function (slot) { var t = this.turn; return slot === 'object' ? t.object != null : (slot === 'feeling' ? t.feeling != null : (slot === 'reason' ? t.reason != null : (slot === 'politeness' ? t.politeness != null : t.attrs[slot] != null))); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'ss-wrap' + (LANG === 'fr' ? ' ss-fr' : (LANG === 'es' || LANG === 'pt' || LANG === 'it' || LANG === 'nl') ? ' ss-es' : ''));
      var theater = api.el('div', 'ss-theater'); this._theaterEl = theater;
      if (!this.round) { wrap.appendChild(theater); stage.appendChild(wrap); return; }
      if (this.phase === 'resolve' || this.phase === 'done') this._renderResolve(theater);
      else this._renderCompose(theater);
      // lost-and-found shelf (vessel)
      var shelf = api.el('div', 'ss-shelf');
      for (var i = 0; i < ((this._pool && this._pool.length) || 7); i++) { var s = api.el('span', 'ss-slot'); shelf.appendChild(s); }
      this._shelfEl = shelf; theater.appendChild(shelf);
      wrap.appendChild(theater); stage.appendChild(wrap);
      this._paintShelf();
    },

    _renderCompose: function (theater) {
      var self = this, api = this.api, r = this.round;
      // stage row: Sock (sees the bin) + the greyed curtain with Shadow ducked
      var top = api.el('div', 'ss-stagerow');
      var sock = api.el('div', 'ss-sock'); sock.innerHTML = puppet('sock'); top.appendChild(sock);
      var curtain = api.el('div', 'ss-curtain ss-curtain-closed'); curtain.innerHTML = '<span class="ss-duck">' + puppet('shadow') + '</span><span class="ss-nopeek">' + (LANG === 'de' ? 'Nicht gucken!' : LANG === 'fr' ? 'on ne regarde pas !' : LANG === 'es' ? '¡Sin espiar!' : LANG === 'pt' ? 'Sem espiar!' : LANG === 'it' ? 'Non sbirciare!' : LANG === 'nl' ? 'Niet gluren!' : 'no peeking!') + '</span>'; top.appendChild(curtain);
      theater.appendChild(top);

      // the bin (Sock can see; the target glows) — fetch only. When a round varies by
      // position (top/bottom), stack the bin VERTICALLY so "oben"/"unten" is visually
      // truthful (the described spot is real, not glow-only). Both locales benefit. #101.
      if (r.listenerAction !== 'mood') {
        // stack vertically ONLY when position is the genuine distinguisher — every object
        // carries a position AND they're otherwise identical (same object + same colour),
        // so oben/unten is the real difference (round pos-top-ball). Rounds where position is
        // redundant (different objects/colours, e.g. overspec-red-car) stay horizontal.
        var allPos = r.tray.every(function (o) { return o.position != null; });
        var oneObj = r.tray.reduce(function (s, o) { return (s.indexOf(o.object) < 0 ? s.concat([o.object]) : s); }, []).length === 1;
        var oneCol = r.tray.reduce(function (s, o) { return (s.indexOf(o.color) < 0 ? s.concat([o.color]) : s); }, []).length === 1;
        var hasPos = allPos && oneObj && oneCol;
        var bin = api.el('div', 'ss-bin' + (hasPos ? ' ss-bin-vert' : ''));
        var cells = r.tray.map(function (o, i) { return { o: o, i: i }; });
        if (hasPos) cells.sort(function (x, y) { return posRank(x.o.position) - posRank(y.o.position); });
        cells.forEach(function (c) { var cell = api.el('div', 'ss-binobj' + (c.i === r.target ? ' ss-target' : '')); cell.innerHTML = objSVG(c.o); bin.appendChild(cell); });
        theater.appendChild(bin);
      } else {
        var kid = api.el('div', 'ss-kid'); kid.innerHTML = '<span class="ss-kid-face">😢</span><span class="ss-kid-say">' + api.t('tellMood') + '</span>'; theater.appendChild(kid);
      }

      // "Sock's words" tray (the assembling turn)
      var words = api.el('div', 'ss-words');
      var placed = this._placed();
      if (!placed.length) { var ph = api.el('span', 'ss-words-ph'); ph.textContent = '…'; words.appendChild(ph); }
      placed.forEach(function (p) {
        var chip = api.el('button', 'ss-word ss-word-' + p.slot); chip.type = 'button'; chip.textContent = self._chipLabel(p);
        if (self.readOnly) chip.disabled = true; else chip.addEventListener('click', function () { self._remove(p.slot); });
        words.appendChild(chip);
      });
      theater.appendChild(words);

      // the chip rail
      var rail = api.el('div', 'ss-rail');
      if (!this._chipOrder) this._chipOrder = shuffle(Core.chipsFor(r));
      this._chipOrder.forEach(function (c) {
        var used = self._has(c.slot) && (c.slot === 'object' ? self.turn.object === c.value : (['color', 'size', 'position'].indexOf(c.slot) >= 0 ? self.turn.attrs[c.slot] === c.value : (self.turn[c.slot] === c.value)));
        var glow = self.glowCat === c.slot;
        var b = api.el('button', 'ss-chip ss-chip-' + c.slot + (used ? ' ss-chip-used' : '') + (glow ? ' ss-chip-glow' : '')); b.type = 'button'; b.textContent = self._chipLabel(c);
        if (self.readOnly) b.disabled = true; else b.addEventListener('click', function () { self._place(c); });
        rail.appendChild(b);
      });
      theater.appendChild(rail);

      // Tell Shadow
      var tell = api.el('button', 'ss-tell'); tell.type = 'button'; tell.textContent = api.t('tell');
      if (this.readOnly) tell.disabled = true; else tell.addEventListener('click', function () { self._tellShadow(); });
      theater.appendChild(tell);
    },

    _renderResolve: function (theater) {
      var self = this, api = this.api, r = this.round, res = this._res;
      var top = api.el('div', 'ss-stagerow ss-resolve');
      var sh = api.el('div', 'ss-shadow-out'); sh.innerHTML = puppet('shadow', res.outcome === 'clear' ? 'idle' : 'worried'); top.appendChild(sh);
      // Shadow's hands hold the matched objects (fetch) — the visible consequence
      if (r.listenerAction !== 'mood') {
        var hold = api.el('div', 'ss-hold');
        var shown = (res.outcome === 'overwhelmed') ? r.tray.slice(0, 2) : (res.matches.length ? res.matches : [r.tray[r.target]]);
        shown.forEach(function (o) { var c = api.el('div', 'ss-holdobj'); c.innerHTML = objSVG(o); hold.appendChild(c); });
        top.appendChild(hold);
      } else {
        var hold2 = api.el('div', 'ss-hold');
        var shown2 = res.outcome === 'clear' ? res.matches : r.tray;
        shown2.forEach(function (o) { var c = api.el('div', 'ss-holdobj'); c.innerHTML = objSVG({ object: o.object, color: 'brown' }); hold2.appendChild(c); });
        top.appendChild(hold2);
      }
      theater.appendChild(top);

      // the spoken bubble
      var bubble = api.el('div', 'ss-bubble');
      bubble.textContent = LANG === 'de' ? ('„' + deUtter(r, this.turn) + '“') : LANG === 'fr' ? ('« ' + frUtter(r, this.turn) + ' »') : LANG === 'es' ? ('«' + esUtter(r, this.turn) + '»') : LANG === 'pt' ? ('“' + ptUtter(r, this.turn) + '”') : LANG === 'it' ? ('«' + itUtter(r, this.turn) + '»') : LANG === 'nl' ? ('„' + nlUtter(r, this.turn) + '“') : ('“' + Core.utter(r, this.turn, 'en') + '”');
      theater.appendChild(bubble);

      // Shadow's line
      var line = api.el('div', 'ss-line');
      if (res.outcome === 'clear') line.textContent = api.t('clear');
      else if (res.outcome === 'overwhelmed') line.textContent = api.t('overwhelmed');
      else if (res.outcome === 'wrong') line.textContent = api.t('wrong');
      else line.textContent = api.t('ambiguous').replace('{cat}', this._catWord(res.missingCategory));
      theater.appendChild(line);

      if (res.outcome !== 'clear' && !this.readOnly) {
        var again = api.el('button', 'ss-tell ss-again'); again.type = 'button'; again.textContent = api.t('again');
        again.addEventListener('click', function () { self.phase = 'compose'; self.render(); });
        theater.appendChild(again);
      }
    },

    _chipLabel: function (c) {
      if (LANG === 'de') {
        if (c.slot === 'object') return NOUN_DE[c.value] || c.value;
        if (c.slot === 'politeness') return 'bitte';
        if (c.slot === 'reason') return SHORT_REASON_DE[c.value] || c.value;   // short on the chip; full clause in deUtter()
        if (c.slot === 'position') return POS_DE[c.value] || c.value;
        if (c.slot === 'feeling') return FEEL_DE[c.value] || c.value;
        return CHIP_DE[c.value] || c.value;   // color / size (base form)
      }
      if (LANG === 'fr') {
        if (c.slot === 'object') return NOUN_FR[c.value] || c.value;
        if (c.slot === 'politeness') return 's’il te plaît';
        if (c.slot === 'reason') return SHORT_REASON_FR[c.value] || c.value;   // short on the chip; full clause in frUtter()
        if (c.slot === 'position') return POS_FR[c.value] || c.value;
        if (c.slot === 'feeling') return FEEL_FR[c.value] || c.value;
        return CHIP_FR[c.value] || c.value;   // color / size (base masc-sing form)
      }
      if (LANG === 'es') {
        if (c.slot === 'object') return NOUN_ES[c.value] || c.value;
        if (c.slot === 'politeness') return 'por favor';
        if (c.slot === 'reason') return SHORT_REASON_ES[c.value] || c.value;   // short on the chip; full clause in esUtter()
        if (c.slot === 'position') return POSCHIP_ES[c.value] || c.value;      // bare arriba/abajo on the chip; "de arriba" in esUtter
        if (c.slot === 'feeling') return FEELCHIP_ES[c.value] || c.value;      // "triste"/"enojado" chip; "Estoy triste"/"Me da coraje" spoken
        return CHIP_ES[c.value] || c.value;   // color / size (base masc-sing form)
      }
      if (LANG === 'pt') {
        if (c.slot === 'object') return NOUN_PT[c.value] || c.value;
        if (c.slot === 'politeness') return 'por favor';
        if (c.slot === 'reason') return SHORT_REASON_PT[c.value] || c.value;   // short on the chip; full clause in ptUtter()
        if (c.slot === 'position') return POSCHIP_PT[c.value] || c.value;      // bare em cima/embaixo on the chip; "de cima" in ptUtter
        if (c.slot === 'feeling') return FEELCHIP_PT[c.value] || c.value;      // "triste"/"com raiva" chip; "Estou triste"/"Estou com raiva" spoken
        return CHIP_PT[c.value] || c.value;   // color / size (base masc-sing form)
      }
      if (LANG === 'it') {
        if (c.slot === 'object') return NOUN_IT[c.value] || c.value;
        if (c.slot === 'politeness') return 'per favore';
        if (c.slot === 'reason') return SHORT_REASON_IT[c.value] || c.value;   // short on the chip; full clause in itUtter()
        if (c.slot === 'position') return POSCHIP_IT[c.value] || c.value;      // bare sopra/sotto on the chip; "in alto"/"in basso" in itUtter
        if (c.slot === 'feeling') return FEELCHIP_IT[c.value] || c.value;      // "triste"/"arrabbiato" chip; "Sono triste"/"Che rabbia!" spoken
        return CHIP_IT[c.value] || c.value;   // color / size (base masc-sing form)
      }
      if (LANG === 'nl') {
        if (c.slot === 'object') return NOUN_NL[c.value] || c.value;
        if (c.slot === 'politeness') return 'alsjeblieft';
        if (c.slot === 'reason') return SHORT_REASON_NL[c.value] || c.value;   // short on the chip; full clause in nlUtter()
        if (c.slot === 'position') return POS_NL[c.value] || c.value;
        if (c.slot === 'feeling') return FEEL_NL[c.value] || c.value;
        return CHIP_NL[c.value] || c.value;   // color / size (base form)
      }
      if (c.slot === 'object') return c.value;
      if (c.slot === 'politeness') return 'please';
      if (c.slot === 'reason') return SHORT_REASON[c.value] || c.value;   // short on the chip; full text in utter()
      if (c.slot === 'position') return 'on ' + c.value;
      return c.value;   // color / size / feeling
    },
    _catWord: function (cat) { return this.api.t(cat === 'color' ? 'catColor' : cat === 'size' ? 'catSize' : cat === 'position' ? 'catPosition' : 'catReason'); },

    _place: function (c) {
      if (this.readOnly) return;
      var t = this.turn;
      if (c.slot === 'object') t.object = c.value;
      else if (['color', 'size', 'position'].indexOf(c.slot) >= 0) t.attrs[c.slot] = c.value;
      else if (c.slot === 'reason') { t.attrs.reason = c.value; t.reason = c.value; }
      else if (c.slot === 'feeling') t.feeling = c.value;
      else if (c.slot === 'politeness') t.politeness = c.value;
      this.glowCat = null; this.api.sound && this.api.sound(560); speak(this._chipLabel(c)); this.render();
    },
    _remove: function (slot) {
      if (this.readOnly) return;
      var t = this.turn;
      if (slot === 'object') t.object = null;
      else if (slot === 'reason') { t.attrs.reason = null; t.reason = null; }
      else if (slot === 'feeling') t.feeling = null;
      else if (slot === 'politeness') t.politeness = null;
      else t.attrs[slot] = null;
      this.api.sound && this.api.sound(420); this.render();
    },

    _tellShadow: function () {
      if (this.readOnly) return;
      if (!Core.coherent(this.round, this.turn)) { this.api.announce && this.api.announce(this.api.t('needObject')); return; }
      speak(LANG === 'de' ? deUtter(this.round, this.turn) : LANG === 'fr' ? frUtter(this.round, this.turn) : LANG === 'es' ? esUtter(this.round, this.turn) : LANG === 'pt' ? ptUtter(this.round, this.turn) : LANG === 'it' ? itUtter(this.round, this.turn) : LANG === 'nl' ? nlUtter(this.round, this.turn) : Core.utter(this.round, this.turn, 'en'));
      this._res = Core.resolve(this.round, this.turn);
      this.phase = 'resolve';
      if (this._res.outcome === 'clear') { this._win(); return; }
      this.misses++; this.api.sound && this.api.sound(300);
      // content-withholding repair: name the missing CATEGORY, glow its chips (not the value)
      this.glowCat = this._res.missingCategory || null;
      this.render();
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done';
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 7);
      this.api.sound && this.api.sound(880);
      this.render();
      var msg = this.api.t('clear'); this.api.announce && this.api.announce(msg); speak(msg);
    },

    _paintShelf: function () { if (!this._shelfEl) return; var p = this._shelfEl.children; for (var i = 0; i < p.length; i++) p[i].classList.toggle('ss-slot-on', i < this.solved); },
    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]);
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n);
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/sock-and-shadow-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[sock-and-shadow] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ss-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.ss-theater{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.1vw,7px);'
        +   'background:linear-gradient(180deg,#F3EAD6,#EADFC6);border-radius:18px;padding:clamp(6px,1.4vw,10px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* stage row: Sock + curtain */
        + '.ss-stagerow{display:flex;align-items:flex-end;justify-content:center;gap:clamp(8px,3vw,18px);width:100%;}'
        + '.ss-sock{width:clamp(40px,10vw,52px);}.ss-pup-svg{width:100%;height:auto;display:block;}'
        + '.ss-shadow-out{width:clamp(60px,16vw,82px);flex:0 0 auto;}'
        /* the stage curtain Shadow ducks behind (a valance + a rod, not a text box) */
        + '.ss-curtain{position:relative;flex:1 1 auto;max-width:152px;height:clamp(38px,10vw,50px);border-radius:0 0 8px 8px;background:repeating-linear-gradient(90deg,' + C.CURTAIN + ' 0 8px,#13524a 8px 16px);display:flex;align-items:flex-end;justify-content:center;overflow:hidden;box-shadow:inset 0 -6px 8px rgba(0,0,0,.18);}'
        + '.ss-curtain::before{content:"";position:absolute;top:0;left:-2%;right:-2%;height:9px;background:' + C.CORAL + ';border-radius:0 0 6px 6px;box-shadow:0 1px 0 rgba(0,0,0,.12);}'
        + '.ss-curtain::after{content:"";position:absolute;top:9px;left:0;right:0;height:7px;background:radial-gradient(circle at 8px -2px,transparent 7px,#13524a 7px) repeat-x;background-size:16px 7px;}'
        + '.ss-duck{width:clamp(30px,8vw,42px);opacity:.55;filter:grayscale(1) brightness(.65);margin-bottom:-5px;}.ss-duck .ss-pup-svg{width:100%;}'
        + '.ss-nopeek{position:absolute;top:8px;z-index:2;font:800 9px/1 "Baloo 2",sans-serif;color:#fff;background:rgba(19,82,74,.85);padding:2px 6px;border-radius:7px;}'   /* z-index+pill so the caption clears the ::after valance + reads over the curtain (all locales; #101) */
        /* the bin */
        + '.ss-bin{display:flex;flex-wrap:wrap;gap:clamp(4px,1.4vw,8px);justify-content:center;padding:clamp(4px,1.4vw,8px);background:#E7D9BD;border-radius:12px;box-shadow:inset 0 2px 6px rgba(120,90,40,.18);}'
        + '.ss-bin-vert{flex-direction:column;flex-wrap:nowrap;align-items:center;}'   /* position rounds: stack top→bottom so oben/unten is real */
        + '.ss-binobj{width:clamp(36px,9.5vw,48px);height:clamp(36px,9.5vw,48px);border-radius:9px;background:#FCF6EA;display:flex;align-items:center;justify-content:center;}.ss-obj-svg{width:86%;height:86%;}'
        + '.ss-target{box-shadow:0 0 0 3px ' + C.CORAL + ';background:#FFF1E8;}'
        + '.ss-kid{display:flex;flex-direction:column;align-items:center;gap:1px;}.ss-kid-face{font-size:clamp(24px,6vw,32px);}.ss-kid-say{font:700 clamp(11px,2.8vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;}'
        /* Sock\'s words */
        + '.ss-words{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;min-height:32px;width:100%;padding:3px clamp(6px,2vw,12px);background:#FFF9EC;border:2px dashed rgba(20,107,94,.25);border-radius:11px;}'
        + '.ss-words-ph{color:rgba(20,107,94,.4);font:800 20px/1 "Baloo 2",sans-serif;}'
        + '.ss-word{border:0;border-radius:8px;padding:4px 8px;min-height:30px;font:700 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:#fff;background:' + C.T + ';cursor:pointer;touch-action:manipulation;}'
        + '.ss-word-politeness,.ss-word-feeling{background:#A99;}.ss-word:active{transform:translateY(1px);}'
        /* chip rail */
        + '.ss-rail{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;}'
        + '.ss-chip{min-height:44px;padding:0 clamp(10px,3vw,16px);border-radius:12px;border:2px solid rgba(20,107,94,.2);background:#FFF6E6;font:700 clamp(13px,3.6vw,17px)/1 "Baloo 2",sans-serif;color:' + C.T + ';cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.2);touch-action:manipulation;}'
        + '.ss-chip-object{background:#EAF2EE;}.ss-chip-politeness,.ss-chip-feeling{color:#7a6a6a;}'
        + '.ss-chip:active{transform:translateY(2px);}.ss-chip-used{opacity:.4;}'
        + '.ss-chip-glow{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.3),0 2px 0 rgba(160,120,60,.2);animation:ssGlow 1.2s ease-in-out infinite;}'
        + '@keyframes ssGlow{0%,100%{box-shadow:0 0 0 3px rgba(242,120,75,.25),0 2px 0 rgba(160,120,60,.2)}50%{box-shadow:0 0 0 6px rgba(242,120,75,.4),0 2px 0 rgba(160,120,60,.2)}}'
        + '.ss-chip:focus-visible,.ss-tell:focus-visible,.ss-word:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* Tell Shadow */
        + '.ss-tell{min-height:46px;padding:0 clamp(18px,6vw,30px);border-radius:14px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.ss-tell:active{transform:translateY(2px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}.ss-tell:disabled{opacity:.5;}'
        + '.ss-again{background:' + C.T + ';box-shadow:0 3px 0 rgba(20,107,94,.4);}'
        /* resolve — Shadow has emerged + holds the objects (the visible consequence) */
        + '.ss-resolve{align-items:center;gap:clamp(8px,3vw,16px);padding:clamp(6px,2vw,12px) 0 clamp(4px,1.4vw,8px);background:linear-gradient(180deg,rgba(24,94,84,.08),transparent);border-radius:14px;width:100%;}'
        + '.ss-hold{display:flex;gap:clamp(7px,2.4vw,14px);align-items:flex-end;}'
        + '.ss-holdobj{width:clamp(54px,15vw,74px);height:clamp(54px,15vw,74px);border-radius:11px;background:#FCF6EA;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(120,90,40,.2);}'
        + '.ss-bubble{max-width:90%;background:#fff;border:2px solid rgba(20,107,94,.2);border-radius:13px;padding:7px 13px;font:700 clamp(15px,4vw,19px)/1.3 "Baloo 2",sans-serif;color:' + C.INK + ';text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;box-shadow:0 2px 4px rgba(120,90,40,.1);}'
        + '.ss-line{font:700 clamp(13px,3.4vw,16px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;}'
        /* shelf vessel */
        + '.ss-shelf{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;}'
        + '.ss-slot{width:clamp(11px,3vw,16px);height:7px;border-radius:3px;background:rgba(20,107,94,.16);transition:background .3s;}'
        + '.ss-slot-on{background:' + C.CORAL + ';}'
        + '@media (max-width:412px){.ss-theater{padding:5px;gap:2px;}.ss-binobj{width:28px;height:28px;}.ss-bin{gap:2px;padding:2px;}.ss-chip{padding:0 6px;font-size:12px;min-height:44px;}.ss-rail{gap:3px;}.ss-words{min-height:24px;padding:2px 6px;}.ss-word{min-height:28px;padding:3px 6px;font-size:12px;}.ss-tell{min-height:44px;}.ss-sock{width:36px;}.ss-curtain{height:34px;max-width:124px;}.ss-stagerow{gap:6px;}.ss-kid-face{font-size:21px;}}'
        /* fr: French chips (nounours perdu / pas atteindre / s\'il te plaît) are wider than EN → the mood-round rail wraps an extra row + the longer say-line pushes past a 320px fold. fr-scoped @360 tightening (chips stay ≥44px tall) so the rail packs tighter — EN untouched (passes at 320). */
        + '@media (max-width:360px){.ss-fr .ss-chip{padding:0 3px;font-size:11px;}.ss-fr .ss-rail{gap:2px;}.ss-fr .ss-kid-say{font-size:10.5px;line-height:1.12;}.ss-fr .ss-kid-face{font-size:18px;}.ss-fr .ss-theater{gap:1px;padding:4px;}.ss-fr .ss-words{min-height:20px;padding:1px 5px;}.ss-fr .ss-word{font-size:11px;min-height:26px;padding:2px 5px;}}'
        /* es: the mood-round chips (torre caída / osito perdido / no alcanzo / por favor) are wider than EN → the rail wraps an extra row past the 320px fold. es-scoped narrow tightening (chips stay ≥44px tall) so the rail packs tighter — EN/de/fr untouched (§A.13.62 fix at the narrow band, never the gate). */
        + '@media (max-width:360px){.ss-es .ss-chip{padding:0 3px;font-size:11px;}.ss-es .ss-rail{gap:2px;}.ss-es .ss-kid-say{font-size:10.5px;line-height:1.12;}.ss-es .ss-kid-face{font-size:18px;}.ss-es .ss-theater{gap:1px;padding:4px;}.ss-es .ss-words{min-height:20px;padding:1px 5px;}.ss-es .ss-word{font-size:11px;min-height:26px;padding:2px 5px;}}'
        + '@media (prefers-reduced-motion: reduce){.ss-chip-glow{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-sock-shadow', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'sock-and-shadow.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
