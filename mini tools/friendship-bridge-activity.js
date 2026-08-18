/* =====================================================================
   THE FRIENDSHIP BRIDGE — ACTIVITY  (friendship-bridge-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.C.6 — compare two groups (≤10): MORE, FEWER, or the SAME, by
   MATCHING and COUNTING. Big and Bit each bring a bunch of fuzzball friends.
   Pair them one-to-one (give everyone a buddy); the friend left with NO buddy
   tells you who has MORE. Then say the word.

   THE WHOLE POINT — beat the eye. A long, spread-out row of 5 LOOKS like more
   than a tight little bunch of 6 — but pairing busts the trick. ≥⅓ of the deck
   is this illusion (incl. a conservation SAME: 5 spread vs 5 tight). The relation
   is the child's COMMITTED word — the app NEVER prints "6 > 5". The see-saw beam
   is LOCKED FLAT through matching + judging; it tips only AFTER a correct commit
   (applause, never the answer). No added cue on the leftover — it's read from
   the structure (a friend with no buddy), never an engine hint.

   Seven distinct act-types: match-judge / count-judge / how-many-more /
   conservation / make-equal / build-equal / predict-verify.

   Comparison cognition + the perceptual heuristic live in mini tools/
   compare-balance-core.js (pure). answerType:'state'. Big/Bit + fuzzballs are
   SVG STUBS for CA5. No timer/score/streak; wrong judgments are no-shame
   "let's pair them up and see". 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CompareBalanceCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35' };
  var WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' };
  var WORDS_DE = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn' };
  var WORDS_FR = { 0: 'zéro', 1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf', 10: 'dix' };
  var WORDS_ES = { 0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez' };
  /* Brazilian Portuguese — masculine-abstract cardinals (a number is masc: "cinco é mais que três"). */
  var WORDS_PT = { 0: 'zero', 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco', 6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez' };
  var LANG = 'en';
  function numWord(n) { return (LANG === 'es' ? WORDS_ES : (LANG === 'de' ? WORDS_DE : (LANG === 'fr' ? WORDS_FR : (LANG === 'pt' ? WORDS_PT : WORDS))))[n]; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: (LANG === 'es' ? 'es-MX' : (LANG === 'pt' ? 'pt-BR' : LANG)), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'es' ? 'es-MX' : (LANG === 'de' ? 'de-DE' : (LANG === 'fr' ? 'fr-FR' : (LANG === 'pt' ? 'pt-BR' : 'en-US')))); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  /* Big & Bit — round fuzzball CHARACTERS (SVG stub for CA5). Big = teal, Bit = coral. */
  function palSVG(side, mood) {
    var col = side === 'left' ? C.T : C.CORAL, col2 = side === 'left' ? C.T2 : C.CORAL2;
    var happy = mood === 'happy';
    return '<svg class="fb-pal-svg" viewBox="0 0 100 100" role="img" aria-label="' + (side === 'left' ? 'Big' : 'Bit') + '">'
      + '<circle cx="50" cy="54" r="34" fill="' + col + '"/><circle cx="50" cy="54" r="34" fill="none" stroke="' + col2 + '" stroke-width="3"/>'
      + '<circle cx="38" cy="30" r="10" fill="' + col + '"/><circle cx="62" cy="30" r="10" fill="' + col + '"/>'
      + '<circle cx="40" cy="50" r="6" fill="#fff"/><circle cx="60" cy="50" r="6" fill="#fff"/>'
      + '<circle cx="41" cy="51" r="3" fill="#2A2A35"/><circle cx="61" cy="51" r="3" fill="#2A2A35"/>'
      + (happy ? '<path d="M40 66 q10 10 20 0" stroke="#2A2A35" stroke-width="3.5" fill="none" stroke-linecap="round"/>' : '<path d="M42 66 q8 5 16 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/>')
      + '</svg>';
  }
  /* one fuzzball "friend" — a small disc token. */
  function friendSVG(side) {
    var col = side === 'left' ? C.T : C.CORAL, col2 = side === 'left' ? C.T2 : C.CORAL2;
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="36" fill="' + col + '"/><circle cx="50" cy="52" r="36" fill="none" stroke="' + col2 + '" stroke-width="4"/>'
      + '<circle cx="42" cy="44" r="6" fill="#fff"/><circle cx="58" cy="44" r="6" fill="#fff"/><circle cx="43" cy="45" r="3" fill="#2A2A35"/><circle cx="57" cy="45" r="3" fill="#2A2A35"/>'
      + '<circle cx="36" cy="30" r="8" fill="' + col + '"/><circle cx="64" cy="30" r="8" fill="' + col + '"/></svg>';
  }

  global.FriendshipBridgeActivity = {
    id: 'friendship-bridge-activity',
    reward: { id: 'friendship-garland', label: 'Friendship Garland', emoji: '🌸' },

    /* child-facing copy below uses MORE / FEWER / SAME words only — no inequality symbols */
    /* RELATION-WORDS-ONLY:strings */
    strings: {
      title: { en: 'The Friendship Bridge', de: 'Die Freundschaftsbrücke', fr: 'Le pont de l’amitié', es: 'El puente de la amistad', pt: 'A Ponte da Amizade' },
      instruction: { en: 'Compare two groups — more, fewer, or same.', de: 'Vergleiche zwei Gruppen — mehr, weniger oder gleich viel.', fr: 'Compare deux groupes — plus, moins ou pareil.', es: 'Compara dos grupos: más, menos o la misma cantidad.', pt: 'Compare dois grupos: mais, menos ou igual.' },
      prompt: { en: 'Who has more?', de: 'Wer hat mehr?', fr: 'Qui en a le plus ?', es: '¿Quién tiene más?', pt: 'Quem tem mais?' },
      promptMoreQ: { en: 'Who has MORE?', de: 'Wer hat MEHR?', fr: 'Qui en a le PLUS ?', es: '¿Quién tiene MÁS?', pt: 'Quem tem MAIS?' },
      promptFewerQ: { en: 'Who has FEWER?', de: 'Wer hat WENIGER?', fr: 'Qui en a le MOINS ?', es: '¿Quién tiene MENOS?', pt: 'Quem tem MENOS?' },
      promptHowMany: { en: 'How many MORE?', de: 'Wie viele MEHR?', fr: 'Combien de PLUS ?', es: '¿Cuántos MÁS?', pt: 'Quantos a MAIS?' },
      promptMakeEqual: { en: 'Make them the SAME!', de: 'Mach beide GLEICH VIEL!', fr: 'Fais-en AUTANT des deux côtés !', es: '¡Hazlos IGUALES!', pt: 'Deixe os dois IGUAIS!' },
      promptBuildEqual: { en: 'Build a matching bunch!', de: 'Bau ein gleich großes Häufchen!', fr: 'Construis un groupe pareil !', es: '¡Arma un montón igual de grande!', pt: 'Monte um montinho igual!' },
      promptPredict: { en: 'Guess: who has more?', de: 'Schätze: Wer hat mehr?', fr: 'Devine : qui en a le plus ?', es: 'Adivina: ¿quién tiene más?', pt: 'Adivinhe: quem tem mais?' },
      bigName: { en: 'Big', de: 'Big', fr: 'Big', es: 'Big', pt: 'Big' },
      bitName: { en: 'Bit', de: 'Bit', fr: 'Bit', es: 'Bit', pt: 'Bit' },
      same: { en: 'Same', de: 'Gleich viel', fr: 'Pareil', es: 'Igual', pt: 'Igual' },
      hintIdle: { en: 'Tap one friend, then a friend on the other side, to make a pair!', de: 'Tippe einen Freund an, dann einen auf der anderen Seite, um ein Paar zu bilden!', fr: 'Touche un ami, puis un ami de l’autre côté, pour faire une paire !', es: '¡Toca un amigo y luego uno del otro lado para hacer una pareja!', pt: 'Toque em um amiguinho e depois em um amiguinho do outro lado para formar um par!' },
      hintPredict: { en: 'No counting yet — what does your eye say?', de: 'Noch nicht zählen — was sagt dein Auge?', fr: 'Pas encore de comptage — que dit ton œil ?', es: 'No cuentes todavía… ¿qué te dicen tus ojos?', pt: 'Ainda não conte — o que o seu olho diz?' },
      hintCount: { en: 'Tap each friend to count them — then say who has more!', de: 'Tippe jeden Freund an, um zu zählen — dann sag, wer mehr hat!', fr: 'Touche chaque ami pour le compter — puis dis qui en a le plus !', es: 'Toca cada amigo para contar… ¡y di quién tiene más!', pt: 'Toque em cada amiguinho para contar e depois diga quem tem mais!' },
      hintBuild: { en: 'Add a friend to the lonely bunch until everyone has a buddy.', de: 'Gib dem einsamen Häufchen Freunde dazu, bis jeder einen Partner hat.', fr: 'Ajoute des amis au petit groupe jusqu’à ce que chacun ait un copain.', es: 'Dale más amigos al montón solito hasta que todos tengan pareja.', pt: 'Adicione um amiguinho ao montinho sozinho até todos terem par.' },
      hintHowMany: { en: 'How many friends are left with no buddy?', de: 'Wie viele Freunde haben keinen Partner?', fr: 'Combien d’amis n’ont pas de copain ?', es: '¿Cuántos amigos se quedaron sin pareja?', pt: 'Quantos amiguinhos ficaram sem par?' },
      hintCheck: { en: 'Pair up the friends, then say MORE, FEWER, or SAME!', de: 'Finde die Partner, dann sag MEHR, WENIGER oder GLEICH VIEL!', fr: 'Forme les paires, puis dis PLUS, MOINS ou PAREIL !', es: 'Encuentra las parejas y luego di MÁS, MENOS o LA MISMA CANTIDAD.', pt: 'Forme os pares e depois diga MAIS, MENOS ou IGUAL!' },
      buddy: { en: 'buddies!', de: 'Partner!', fr: 'copains !', es: '¡Pareja!', pt: 'pares!' },
      addFriend: { en: 'Add a friend', de: 'Freund dazu', fr: 'Ajouter un ami', es: 'Agregar amigo', pt: 'Adicionar amiguinho' },
      takeBack: { en: 'Undo', de: 'Zurück', fr: 'Annuler', es: 'Quitar', pt: 'Desfazer' },
      countTally: { en: '{name}: {n}', de: '{name}: {n}', fr: '{name} : {n}', es: '{name}: {n}', pt: '{name}: {n}' },
      askHowManyMore: { en: 'How many MORE does {name} have?', de: 'Wie viele MEHR hat {name}?', fr: 'Combien de PLUS a {name} ?', es: '¿Cuántos MÁS tiene {name}?', pt: 'Quantos a MAIS {name} tem?' },
      revealMore: { en: 'Yes! {big} has MORE — {bigN} is more than {smallN}!', de: 'Ja! {big} hat MEHR — {bigN} ist mehr als {smallN}!', fr: 'Oui ! {big} en a PLUS — {bigN}, c’est plus que {smallN} !', es: '¡Sí! {big} tiene MÁS: ¡{bigN} es más que {smallN}!', pt: 'Isso! {big} tem MAIS — {bigN} é mais que {smallN}!' },
      revealFewer: { en: 'Yes! {small} has FEWER — {smallN} is fewer than {bigN}!', de: 'Ja! {small} hat WENIGER — {smallN} ist weniger als {bigN}!', fr: 'Oui ! {small} en a MOINS — {smallN}, c’est moins que {bigN} !', es: '¡Sí! {small} tiene MENOS: ¡{smallN} es menos que {bigN}!', pt: 'Isso! {small} tem MENOS — {smallN} é menos que {bigN}!' },
      revealSame: { en: 'They are the SAME — both have {n}! The bunch just looked different.', de: 'Gleich viel! Beide haben {n}. Die Häufchen sahen nur anders aus.', fr: 'C’est PAREIL — les deux en ont {n} ! Le groupe avait juste l’air différent.', es: '¡La misma cantidad! Los dos tienen {n}. Los montones solo se veían diferentes.', pt: 'São IGUAIS — os dois têm {n}! O montinho só parecia diferente.' },
      revealHowMany: { en: 'Right! {big} has {d} more — {d} friend(s) with no buddy.', de: 'Richtig! {big} hat {d} mehr — {d} ohne Partner.', fr: 'Bravo ! {big} en a {d} de plus — {d} ami(s) sans copain.', es: '¡Correcto! {big} tiene {d} más: ¡{d} sin pareja!', pt: 'Certo! {big} tem {d} a mais — {d} amiguinho(s) sem par.' },
      revealBust: { en: 'Surprise! The short little bunch had more. ', de: 'Überraschung! Das kleine Häufchen hatte mehr. ', fr: 'Surprise ! C’est le petit groupe qui en avait le plus. ', es: '¡Sorpresa! El montón chiquito en realidad tenía más. ', pt: 'Surpresa! O montinho baixinho tinha mais. ' },
      reSpread: { en: "Tricky! It LOOKED like more — let's give everyone a buddy and see.", de: 'Knifflig! Das SAH nach mehr aus — geben wir jedem einen Partner und schauen nach!', fr: 'Malin ! On DIRAIT qu’il y en a plus — donnons un copain à chacun pour voir.', es: '¡Tramposo! Eso PARECÍA más… ¡démosle pareja a todos y revisemos!', pt: 'Que truque! PARECIA mais — vamos dar um par para cada um e ver.' },
      reJudge: { en: "Let's pair them up first — then we will know for sure!", de: 'Finde erst die Partner — dann wissen wir es ganz sicher!', fr: 'Formons d’abord les paires — après on saura à coup sûr !', es: 'Primero encuentra las parejas… ¡así lo sabremos seguro!', pt: 'Vamos formar os pares primeiro — aí teremos certeza!' },
      reBuild: { en: 'Not the same yet — keep adding until everyone has a buddy.', de: 'Noch nicht gleich viel — leg noch dazu, bis jeder einen Partner hat.', fr: 'Pas encore pareil — continue d’ajouter jusqu’à ce que chacun ait un copain.', es: 'Todavía no son iguales… agrega más hasta que todos tengan pareja.', pt: 'Ainda não estão iguais — continue adicionando até todos terem par.' },
      reHowMany: { en: 'Count again — how many friends have no buddy?', de: 'Zähl noch mal — wie viele Freunde haben keinen Partner?', fr: 'Compte encore — combien d’amis n’ont pas de copain ?', es: 'Cuenta otra vez: ¿cuántos amigos se quedaron sin pareja?', pt: 'Conte de novo — quantos amiguinhos estão sem par?' },
      tapCheck: { en: 'Tap Check! ✓', de: 'Tippe auf „Prüfen"! ✓', fr: 'Touche Vérifier ! ✓', es: '¡Toca «Revisar»! ✓', pt: 'Toque em Verificar! ✓' },
      guessLead: { en: 'Your guess:', de: 'Deine Schätzung:', fr: 'Ta devinette :', es: 'Tu adivinanza:', pt: 'Seu palpite:' }
    },
    /* :strings */
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.solvedCount = 0; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null;
      this.act = round.actType; this.sel = null; this.pairOrder = []; this.busted = false;
      this.mode = (this.act === 'count-judge') ? 'count' : ((round.ask === 'make-equal' || round.ask === 'build-equal') ? 'build' : 'pair');
      this.phase = round.predict ? 'predict' : 'play';
      this.buildSide = (round.left.count <= round.right.count) ? 'left' : 'right';
      this.buildStart = (this.buildSide === 'left') ? round.left.count : round.right.count;
    },

    announce: function (s) { if (this.api.announce) this.api.announce(s); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'fb-wrap'); var root = api.el('div', 'fb-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      // a slim message bar: Big & Bit (small) + the reveal/reteach line (or the hint)
      var head = api.el('div', 'fb-head' + (this.solved ? ' fb-head-win' : ''));
      var pb = api.el('span', 'fb-pal'); pb.innerHTML = palSVG('left', this.solved ? 'happy' : 'idle');
      var pr = api.el('span', 'fb-pal'); pr.innerHTML = palSVG('right', this.solved ? 'happy' : 'idle');
      var say = api.el('span', 'fb-say'); say.textContent = this.msg || this._hint();
      head.appendChild(pb); head.appendChild(pr); head.appendChild(say);
      root.appendChild(head);

      // the groups (the illusion + the pairing surface)
      root.appendChild(this._groupsEl());

      // the action area
      root.appendChild(this._actionArea());

      // the see-saw beam (LOCKED FLAT until solved) + garland
      root.appendChild(this._beam());
      root.appendChild(this._garland());

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _hint: function () {
      if (this.phase === 'predict') return this.api.t('hintPredict');
      if (this.mode === 'count') return this.api.t('hintCount');
      if (this.mode === 'build') return this.api.t('hintBuild');
      if (this.round.ask === 'how-many-more') return this.api.t('hintHowMany');
      return this.api.t('hintIdle');
    },

    /* ----- the two groups (Big over Bit on phone; side-by-side on desktop) ----- */
    _groupsEl: function () {
      var box = this.api.el('div', 'fb-groups');
      box.appendChild(this._group('left'));
      box.appendChild(this._group('right'));
      return box;
    },
    _group: function (side) {
      var api = this.api, s = this.cstate, ids = (side === 'left') ? s.L : s.R;
      var panel = api.el('div', 'fb-panel fb-panel-' + side);
      var cap = api.el('div', 'fb-cap fb-cap-' + side);
      var nm = api.t(side === 'left' ? 'bigName' : 'bitName');
      if (this.mode === 'count') cap.textContent = api.t('countTally').replace('{name}', nm).replace('{n}', Core.countedOn(s, side));
      else cap.textContent = nm;
      panel.appendChild(cap);
      var discs = api.el('div', 'fb-discs fb-lay-' + (side === 'left' ? this.round.left.layout : this.round.right.layout));
      for (var i = 0; i < ids.length; i++) discs.appendChild(this._disc(side, ids[i]));
      panel.appendChild(discs);
      return panel;
    },
    _disc: function (side, id) {
      var self = this, api = this.api, s = this.cstate;
      var paired = (side === 'left') ? (s.pairs[id] !== undefined) : (s.rpairs[id] !== undefined);
      var counted = !!s.counted[id];
      var seld = this.sel && this.sel.side === side && this.sel.id === id;
      var b = api.el('button', 'fb-disc fb-disc-' + side + (paired ? ' fb-paired' : '') + (counted ? ' fb-counted' : '') + (seld ? ' fb-sel' : ''));
      b.type = 'button'; b.innerHTML = friendSVG(side);
      var badge = this._badgeFor(id);
      if (badge != null) { var bg = api.el('span', 'fb-badge'); bg.textContent = badge; b.appendChild(bg); }
      else if (this.mode === 'count' && counted) { var cn = api.el('span', 'fb-badge fb-badge-count'); cn.textContent = this._countIndex(side, id); b.appendChild(cn); }
      var interactive = (this.phase !== 'predict') && !this.solved;
      b.disabled = !interactive;
      b.setAttribute('aria-label', LANG === 'es'
        ? ('amigo de ' + (side === 'left' ? 'Big' : 'Bit') + (paired ? ', tiene pareja' : ''))
        : (LANG === 'de'
          ? ('Freund von ' + (side === 'left' ? 'Big' : 'Bit') + (paired ? ', hat einen Partner' : ''))
          : (LANG === 'fr'
            ? ('ami de ' + (side === 'left' ? 'Big' : 'Bit') + (paired ? ', a un copain' : ''))
            : (LANG === 'pt'
              ? ('amiguinho do ' + (side === 'left' ? 'Big' : 'Bit') + (paired ? ', tem par' : ''))
              : ((side === 'left' ? 'Big' : 'Bit') + ' friend' + (paired ? ', has a buddy' : ''))))));
      if (interactive) b.addEventListener('click', function () { self._tapDisc(side, id); });
      return b;
    },
    _badgeFor: function (id) { for (var i = 0; i < this.pairOrder.length; i++) { if (this.pairOrder[i][0] === id || this.pairOrder[i][1] === id) return i + 1; } return null; },
    _countIndex: function (side, id) { var arr = (side === 'left') ? this.cstate.L : this.cstate.R, n = 0; for (var i = 0; i < arr.length; i++) { if (this.cstate.counted[arr[i]]) { n++; if (arr[i] === id) return n; } } return n; },

    _tapDisc: function (side, id) {
      var s = this.cstate;
      if (this.mode === 'count') {
        if (!s.counted[id]) { Core.markCounted(s, id); this.api.sound && this.api.sound(560 + Core.countedOn(s, side) * 30); speak(numWord(Core.countedOn(s, side))); }
        this.msg = null; this.render(); return;
      }
      // pair mode: tap a paired disc to unpair; else select / complete a pair
      var paired = (side === 'left') ? (s.pairs[id] !== undefined) : (s.rpairs[id] !== undefined);
      if (paired) { this._unpair(side, id); return; }
      if (this.sel && this.sel.side === side && this.sel.id === id) { this.sel = null; this.render(); return; }
      if (this.sel && this.sel.side !== side) {
        var lid = (side === 'left') ? id : this.sel.id, rid = (side === 'left') ? this.sel.id : id;
        if (Core.addPair(s, lid, rid)) { this.pairOrder.push([lid, rid]); this.api.sound && this.api.sound(720); this.sel = null; this.msg = null; this.render(); return; }
      }
      this.sel = { side: side, id: id }; this.api.sound && this.api.sound(500); this.render();
    },
    _unpair: function (side, id) {
      var s = this.cstate, lid = (side === 'left') ? id : s.rpairs[id];
      Core.removePair(s, lid);
      for (var i = 0; i < this.pairOrder.length; i++) { if (this.pairOrder[i][0] === lid) { this.pairOrder.splice(i, 1); break; } }
      this.api.sound && this.api.sound(360); this.msg = null; this.render();
    },

    /* ----- the action area: guess / pills / number picker / adders ----- */
    _actionArea: function () {
      if (this.solved) return this._doneArea();
      if (this.phase === 'predict') return this._guessRow();
      if (this.mode === 'build') return this._adders();
      if (this.round.ask === 'how-many-more') return this._diffPicker();
      return this._pills();
    },
    _palLabel: function (side) { var api = this.api; var sp = api.el('span', 'fb-pill-ic'); sp.innerHTML = friendSVG(side); var tx = api.el('span'); tx.textContent = api.t(side === 'left' ? 'bigName' : 'bitName'); var w = api.el('span', 'fb-pill-in'); w.appendChild(sp); w.appendChild(tx); return w; },
    _pills: function () {
      var self = this, api = this.api, row = api.el('div', 'fb-pills');
      var pl = api.el('button', 'fb-pill fb-pill-left'); pl.type = 'button'; pl.appendChild(this._palLabel('left')); pl.addEventListener('click', function () { self._commitJudge('left'); });
      var ps = api.el('button', 'fb-pill fb-pill-same'); ps.type = 'button'; ps.innerHTML = '<span class="fb-pill-in"><span class="fb-pill-ic">🤝</span><span>' + api.t('same') + '</span></span>'; ps.addEventListener('click', function () { self._commitJudge('same'); });
      var pr = api.el('button', 'fb-pill fb-pill-right'); pr.type = 'button'; pr.appendChild(this._palLabel('right')); pr.addEventListener('click', function () { self._commitJudge('right'); });
      row.appendChild(pl); row.appendChild(ps); row.appendChild(pr); return row;
    },
    _guessRow: function () {
      var self = this, api = this.api, wrap = api.el('div', 'fb-guess');
      var lab = api.el('div', 'fb-guesslab'); lab.textContent = api.t('promptPredict'); wrap.appendChild(lab);
      var row = api.el('div', 'fb-pills');
      ['left', 'same', 'right'].forEach(function (sd) {
        var b = api.el('button', 'fb-pill fb-pill-' + (sd === 'same' ? 'same' : sd)); b.type = 'button';
        if (sd === 'same') b.innerHTML = '<span class="fb-pill-in"><span class="fb-pill-ic">🤝</span><span>' + api.t('same') + '</span></span>'; else b.appendChild(self._palLabel(sd));
        b.addEventListener('click', function () { Core.predict(self.cstate, sd); self.phase = 'play'; self.msg = null; self.api.sound && self.api.sound(620); self.render(); });
        row.appendChild(b);
      });
      wrap.appendChild(row); return wrap;
    },
    _diffPicker: function () {
      var self = this, api = this.api, s = this.cstate, wrap = api.el('div', 'fb-picker');
      var rel = Core.relation(s), bigSide = rel === 'left' ? 'left' : 'right';
      var lab = api.el('div', 'fb-pickerlab'); lab.textContent = api.t('askHowManyMore').replace('{name}', api.t(bigSide === 'left' ? 'bigName' : 'bitName')); wrap.appendChild(lab);
      var chips = api.el('div', 'fb-chips'); var max = Math.max(s.L.length, s.R.length);
      for (var i = 0; i <= max; i++) { (function (v) { var c = api.el('button', 'fb-chip'); c.type = 'button'; c.textContent = v; c.addEventListener('click', function () { self._commitDiff(v); }); chips.appendChild(c); })(i); }
      wrap.appendChild(chips); return wrap;
    },
    _adders: function () {
      var self = this, api = this.api, s = this.cstate, wrap = api.el('div', 'fb-adders');
      var plus = api.el('button', 'fb-add'); plus.type = 'button'; plus.textContent = '＋ ' + api.t('addFriend');
      plus.addEventListener('click', function () { Core.addFriend(s, self.buildSide); self.api.sound && self.api.sound(700); self._afterBuild(); });
      wrap.appendChild(plus);
      var cur = (this.buildSide === 'left') ? s.L.length : s.R.length;
      if (cur > this.buildStart) { var minus = api.el('button', 'fb-add fb-minus'); minus.type = 'button'; minus.textContent = '－ ' + api.t('takeBack'); minus.addEventListener('click', function () { Core.removeFriend(s, self.buildSide); self.api.sound && self.api.sound(380); self.msg = null; self.render(); }); wrap.appendChild(minus); }
      return wrap;
    },
    _afterBuild: function () { if (Core.isComplete(this.round, this.cstate)) this._succeed(); else { this.msg = null; this.render(); } },

    /* ----- commit + reveal ----- */
    _commitJudge: function (choice) {
      if (Core.judge(this.cstate, choice)) { if (this.cstate.prediction != null && this.cstate.prediction !== Core.relation(this.cstate)) this.busted = true; this._succeed(); }
      else { this.api.sound && this.api.sound(330); this.msg = this.round.misleading ? this.api.t('reSpread') : this.api.t('reJudge'); this.render(); }
    },
    _commitDiff: function (v) {
      Core.setDiff(this.cstate, v);
      if (Core.isComplete(this.round, this.cstate)) this._succeed();
      else { this.api.sound && this.api.sound(330); this.msg = this.api.t('reHowMany'); this.render(); }
    },
    _succeed: function () {
      this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this._composeReveal(); this.api.sound && this.api.sound(920); this.render(); this.announce(this.msg); speak(this._revealSpeech());
    },
    _composeReveal: function () {
      var api = this.api, s = this.cstate, rel = Core.relation(s), lc = s.L.length, rc = s.R.length;
      var bigSide = rel === 'left' ? 'left' : 'right', bigNm = api.t(bigSide === 'left' ? 'bigName' : 'bitName'), smallNm = api.t(bigSide === 'left' ? 'bitName' : 'bigName');
      var bigN = bigSide === 'left' ? lc : rc, smallN = bigSide === 'left' ? rc : lc;
      var pre = this.busted ? api.t('revealBust') : '';
      if (rel === 'same') this.msg = api.t('revealSame').replace('{n}', lc);
      else if (this.round.ask === 'how-many-more') this.msg = api.t('revealHowMany').replace(/\{big\}/g, bigNm).replace(/\{d\}/g, Core.howManyMore(s));
      else if (this.round.compareWord === 'fewer') this.msg = pre + api.t('revealFewer').replace('{small}', smallNm).replace('{smallN}', smallN).replace('{bigN}', bigN);
      else this.msg = pre + api.t('revealMore').replace('{big}', bigNm).replace('{bigN}', bigN).replace('{smallN}', smallN);
    },
    _revealSpeech: function () {
      var s = this.cstate, rel = Core.relation(s);
      if (rel === 'same') return LANG === 'es'
        ? (numWord(s.L.length) + ' y ' + numWord(s.R.length) + ' son la misma cantidad')
        : (LANG === 'de'
          ? (numWord(s.L.length) + ' und ' + numWord(s.R.length) + ' sind gleich viel')
          : (LANG === 'fr'
            ? (numWord(s.L.length) + ' et ' + numWord(s.R.length) + ', c’est pareil')
            : (LANG === 'pt'
              ? (numWord(s.L.length) + ' e ' + numWord(s.R.length) + ' são a mesma quantidade')
              : (WORDS[s.L.length] + ' and ' + WORDS[s.R.length] + ' is the same'))));
      var big = rel === 'left' ? s.L.length : s.R.length, small = rel === 'left' ? s.R.length : s.L.length;
      return LANG === 'es'
        ? (numWord(big) + ' es más que ' + numWord(small))
        : (LANG === 'de'
          ? (numWord(big) + ' ist mehr als ' + numWord(small))
          : (LANG === 'fr'
            ? (numWord(big) + ' c’est plus que ' + numWord(small))
            : (LANG === 'pt'
              ? (numWord(big) + ' é mais que ' + numWord(small))
              : (WORDS[big] + ' is more than ' + WORDS[small]))));
    },

    /* ----- the see-saw beam: LOCKED FLAT (data-tip='') until solved ----- */
    _beam: function () {
      var api = this.api;
      var tip = this.solved ? Core.relation(this.cstate) : '';   // '' = locked flat through match + judge
      var box = api.el('div', 'fb-beambox');
      var svg = '<svg class="fb-beam" viewBox="0 0 220 56" data-tip="' + tip + '" aria-hidden="true">'
        + '<polygon points="110,28 98,54 122,54" fill="#9a8f78"/>'
        + '<g class="fb-plank">'
        + '<rect x="20" y="23" width="180" height="10" rx="5" fill="' + C.T + '"/>'
        + '<circle cx="42" cy="16" r="11" fill="' + C.T + '" opacity="0.25"/><circle cx="178" cy="16" r="11" fill="' + C.CORAL + '" opacity="0.25"/>'
        + '</g></svg>';
      box.innerHTML = svg; box.setAttribute('data-tip', tip);
      return box;
    },
    _garland: function () {
      var api = this.api, g = api.el('div', 'fb-garland'), n = (this._pool && this._pool.length) || 9;
      for (var i = 0; i < n; i++) { var p = api.el('span', 'fb-bloom' + (i < this.solvedCount ? ' fb-bloom-on' : '')); p.textContent = '🌸'; g.appendChild(p); }
      return g;
    },
    _doneArea: function () { var api = this.api, w = api.el('div', 'fb-done'); var n = api.el('div', 'fb-nextnudge'); n.textContent = api.t('tapCheck'); w.appendChild(n); return w; },

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
      fetch('/mini-tools/friendship-bridge-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[friendship-bridge] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.fb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.fb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.3vw,8px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.6vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.fb-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.fb-pal{width:clamp(22px,5vw,30px);flex:0 0 auto;}.fb-pal:nth-child(2){margin-left:-7px;}.fb-pal-svg{width:100%;height:auto;display:block;}'
        + '.fb-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.fb-head-win .fb-say{color:' + C.CORAL2 + ';}'
        /* groups: stacked on phone, side-by-side on desktop */
        + '.fb-groups{display:flex;flex-direction:column;gap:clamp(4px,1.2vw,7px);width:100%;align-items:center;}'
        + '.fb-panel{display:flex;flex-direction:column;align-items:center;gap:2px;background:#fff;border:2px solid rgba(20,107,94,.13);border-radius:14px;padding:4px clamp(6px,2vw,12px);width:100%;max-width:440px;}'
        + '.fb-panel-left{border-color:rgba(20,107,94,.22);}.fb-panel-right{border-color:rgba(242,120,75,.28);}'
        + '.fb-cap{font:800 clamp(12px,3vw,15px)/1 "Baloo 2",sans-serif;}.fb-cap-left{color:' + C.T + ';}.fb-cap-right{color:' + C.CORAL2 + ';}'
        + '.fb-discs{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;min-height:46px;}'
        + '.fb-lay-cluster{gap:3px;max-width:240px;}.fb-lay-grid{gap:4px;max-width:200px;}.fb-lay-row{gap:clamp(5px,2vw,9px);flex-wrap:nowrap;}.fb-lay-scatter{gap:clamp(7px,3vw,15px);}.fb-lay-spread{gap:clamp(8px,4.4vw,26px);flex-wrap:nowrap;}'
        + '.fb-disc{position:relative;min-width:44px;min-height:44px;width:44px;height:44px;padding:0;border:0;background:transparent;cursor:pointer;border-radius:50%;touch-action:manipulation;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}'
        + '.fb-disc svg{width:clamp(26px,6.4vw,34px);height:clamp(26px,6.4vw,34px);display:block;transition:transform .12s;}'
        + '.fb-disc:disabled{cursor:default;}.fb-disc.fb-sel svg{transform:scale(1.12);}.fb-disc.fb-sel{outline:3px solid ' + C.GOLD + ';outline-offset:-2px;border-radius:50%;}'
        + '.fb-disc.fb-paired svg{opacity:.55;}'   /* paired = settled (dimmed); leftover stays plain — no added cue */
        + '.fb-badge{position:absolute;top:-2px;right:-2px;min-width:16px;height:16px;border-radius:9px;background:' + C.GOLD + ';color:#3a2a00;font:800 11px/16px "Baloo 2",sans-serif;text-align:center;padding:0 3px;box-shadow:0 1px 0 rgba(0,0,0,.15);}'
        + '.fb-badge-count{background:' + C.T + ';color:#fff;}'
        + '.fb-disc:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:1px;}'
        /* pills */
        + '.fb-pills{display:flex;gap:clamp(5px,1.6vw,10px);justify-content:center;flex-wrap:nowrap;width:100%;max-width:440px;}'
        + '.fb-pill{min-height:48px;min-width:0;flex:1 1 0;padding:0 clamp(6px,2vw,12px);border-radius:15px;border:0;cursor:pointer;background:#fff;box-shadow:0 3px 0 rgba(20,107,94,.18);touch-action:manipulation;}'
        + '.fb-pill:active{transform:translateY(2px);}.fb-pill-in{display:flex;align-items:center;gap:6px;justify-content:center;font:800 clamp(14px,3.6vw,17px)/1 "Baloo 2",sans-serif;}.fb-pill-ic{width:24px;height:24px;display:inline-flex;}.fb-pill-ic svg{width:24px;height:24px;}'
        + '.fb-pill-left{color:' + C.T + ';box-shadow:0 3px 0 ' + C.T2 + ';}.fb-pill-right{color:' + C.CORAL2 + ';box-shadow:0 3px 0 ' + C.CORAL2 + ';}.fb-pill-same{color:#7a6f30;box-shadow:0 3px 0 #c8a23a;}'
        + '.fb-pill:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* guess + picker + adders */
        + '.fb-guess,.fb-picker{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;}'
        + '.fb-guesslab,.fb-pickerlab{font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}'
        + '.fb-chips{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;}'
        + '.fb-chip{min-width:44px;min-height:44px;border-radius:11px;border:2px solid rgba(20,107,94,.2);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}.fb-chip:active{transform:translateY(1px);}'
        + '.fb-adders{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}'
        + '.fb-add{min-height:50px;padding:0 clamp(14px,4vw,22px);border-radius:15px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.T2 + ';touch-action:manipulation;}.fb-add:active{transform:translateY(2px);}.fb-minus{background:#fff;color:' + C.T + ';box-shadow:0 3px 0 rgba(20,107,94,.2);}'
        + '.fb-chip:focus-visible,.fb-add:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* beam: locked flat; tips only when data-tip is set (solved) */
        + '.fb-beambox{width:clamp(120px,42vw,180px);}.fb-beam{width:100%;height:auto;display:block;}'
        + '.fb-beam .fb-plank{transform-origin:110px 28px;transition:transform .5s cubic-bezier(.34,1.4,.5,1);}'
        + '.fb-beam[data-tip="left"] .fb-plank{transform:rotate(-13deg);}.fb-beam[data-tip="right"] .fb-plank{transform:rotate(13deg);}.fb-beam[data-tip="same"] .fb-plank{transform:rotate(0deg);}'
        /* garland + done */
        + '.fb-garland{display:flex;gap:2px;flex-wrap:wrap;justify-content:center;}'
        + '.fb-bloom{font-size:clamp(13px,3.2vw,17px);filter:grayscale(1) opacity(.4);}.fb-bloom-on{filter:none;}'
        + '.fb-done{display:flex;justify-content:center;}.fb-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        + '@media (min-width:768px){.fb-groups{flex-direction:row;align-items:stretch;}.fb-panel{width:auto;flex:1 1 0;}}'
        /* the beam + garland are juice — show them ONLY on genuinely tall viewports so the controls + the shell Check always clear the fold (the chrome alone eats ~300px at desktop) */
        + '@media (max-height:920px){.fb-beambox,.fb-garland{display:none;}}'
        /* the 320×640 sub-floor — compact discs so groups + the shell Check fit */
        + '@media (max-height:660px){.fb-root{gap:2px;padding:5px;}.fb-pal{width:18px;}.fb-head{gap:4px;}.fb-say{font-size:11px;}.fb-disc{min-width:40px;min-height:36px;width:36px;height:36px;}.fb-disc svg{width:20px;height:20px;}.fb-discs{min-height:36px;}.fb-cap{font-size:11px;}.fb-panel{padding:2px 6px;gap:1px;}.fb-groups{gap:3px;}.fb-pill{min-height:44px;}.fb-add{min-height:44px;}}'
        + '@media (max-width:360px){.fb-lay-spread{gap:8px;}}'
        /* very narrow (≤340) — the shell clamps the stage to ~183px usable; tighten my padding + the wrap gaps so 44px discs pack 4-per-row (2 rows for the 7-8-friend count groups) instead of 3 */
        + '@media (max-width:340px){.fb-root{padding:4px;gap:4px;}.fb-panel{padding:3px 5px;}.fb-lay-cluster{gap:2px;max-width:none;}.fb-lay-grid{gap:2px;}.fb-lay-scatter{gap:3px;}.fb-lay-row{gap:4px;}.fb-head{gap:5px;}.fb-pal{width:20px;}.fb-add{min-height:46px;}.fb-pill{min-height:46px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-friendship-bridge', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function promptKeyFor(round) {
    if (round.predict) return 'promptPredict';
    if (round.ask === 'how-many-more') return 'promptHowMany';
    if (round.ask === 'make-equal') return 'promptMakeEqual';
    if (round.ask === 'build-equal') return 'promptBuildEqual';
    if (round.compareWord === 'fewer') return 'promptFewerQ';
    return 'promptMoreQ';
  }
  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'friendship-bridge.' + round.id, band: round.band || 1, promptKey: promptKeyFor(round), promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
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
