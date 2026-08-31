/* =====================================================================
   THE HARBOR POST — ACTIVITY SKIN  (author-purpose-activity.js)
   ---------------------------------------------------------------------
   RI.2.6 · author's purpose (inform/entertain/instruct) — CLARITY-FIRST
   redesign of #72. The lcs-shell skin over author-purpose-core.js.
   answerType:'state'. EN-ONLY pilot (non-EN 404-by-design).

   Marlow the pelican sorts harbor notes into three bins by the author's MOVE:
   "To tell facts" (inform) / "To tell a fun story" (entertain) / "To show how
   to do it" (instruct). Each round shows ONE short note as a letter card + a
   Hear-it button; the child taps the matching bin. Correct = the bin whose
   purpose === the note's purpose (the authored ground truth), DERIVED not
   stored. Correct → the bin glows + Marlow wiggles (resolve; shell Check hidden
   until `.lcs-app.marlow-resolved`). Wrong → a warm move nudge, no advance.
   0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.AuthorPurposeCore;

  var L = {
    en: {
      q: 'Why did the author write this note?',
      win: 'Yes! {note}', winNote: 'You found the author’s reason!',
      hear: '🔊 Hear it',
      nInform: 'This note tells TRUE FACTS about real things — send it to "To tell facts".',
      nEntertain: 'This note is a FUN STORY with a silly surprise — send it to "To tell a fun story".',
      nInstruct: 'This note shows you HOW — look for "first… next… then" steps.'
    },
    de: {
      q: 'Warum hat der Autor diese Notiz geschrieben?',
      win: 'Ja! {note}', winNote: 'Du hast die Absicht des Autors gefunden!',
      hear: '🔊 Hör zu',
      nInform: 'Diese Notiz nennt echte Fakten – sie will informieren.',
      nEntertain: 'Diese Notiz erzählt eine lustige Geschichte – sie will unterhalten.',
      nInstruct: 'Diese Notiz zeigt Schritt für Schritt, wie es geht – sie will anleiten.'
    },
    fr: {
      q: 'Pourquoi l’auteur a-t-il écrit cette note ?',
      win: 'Oui ! {note}', winNote: 'Tu as trouvé l’intention de l’auteur !',
      hear: '🔊 Écouter',
      nInform: 'Cette note donne de vrais faits — elle veut informer.',
      nEntertain: 'Cette note raconte une histoire drôle — elle veut distraire.',
      nInstruct: 'Cette note montre les étapes — cherche « d’abord… ensuite… enfin ».'
    },
    /* es-MX. `q` is AGENTLESS by design: (a) «el autor» ×9 rounds is the generic
       masculine the NEM Igualdad-de-género eje rules out, (b) the conceit is
       anonymous harbor mail so «el autor» has no referent on screen, and (c) the
       core states the standard agentlessly ("judge WHY a text was written") — the
       author-MOVE law binds the BINS (dar/contar/decir), not the question.
       ⚠ «¿Para qué…?» NOT «¿Por qué…?» — a deliberate divergence from de `Warum` /
       fr `Pourquoi`, forced by Spanish: ¿Por qué?→Porque… is CAUSE; ¿Para qué?→Para…
       is PURPOSE, and every bin reads «Para …». Do not "fix" it back.
       §A.13.54: every agreeing token is anchored to a FIXED noun — `esta`→la nota,
       `real`→la información, `chistoso`→algo — never to the round's varying subject
       (el sol / las abejas / Michi). Never rewrite to «Esta nota es chistosa». */
    es: {
      q: '¿Para qué se escribió esta nota?',
      win: '¡Sí! {note}', winNote: '¡Descubriste el propósito de la nota!',
      hear: '🔊 Escucha',
      nInform: 'Esta nota da información real — quiere informar.',
      nEntertain: 'Esta nota cuenta algo chistoso — quiere entretener.',
      nInstruct: 'Esta nota enseña los pasos — busca «primero… después… al final».'
    },
    /* pt-BR: `q` is AGENTLESS + PURPOSE («Para que…» = purpose, «Por que…» = cause; the bins read
       «Para…»). §A.13.54: nInform/nEntertain/nInstruct anchor agreement on the FIXED noun «esta nota»
       / «ela» (a nota, fem), never the round's varying subject (o sol / as abelhas / o gato Frajola). */
    pt: {
      q: 'Para que esta nota foi escrita?',
      win: 'Isso! {note}', winNote: 'Você descobriu para que a nota foi escrita!',
      hear: '🔊 Ouvir',
      nInform: 'Esta nota dá informação de verdade — ela quer INFORMAR.',
      nEntertain: 'Esta nota conta uma história divertida — ela quer DIVERTIR.',
      nInstruct: 'Esta nota ensina os passos — procure "primeiro… depois… no final".'
    },
    /* it: `q` is AGENTLESS + PURPOSE-framed («A che cosa serve…» = "what is it FOR", unambiguously
       purposive, mirrors the «Per…» bins) — chosen over «Perché è stata scritta…» (Italian «perché»
       tips toward CAUSE). §A.13.54: nInform/nEntertain/nInstruct anchor every agreeing word on the
       FIXED fem noun «questa nota», never the round's varying subject (il sole m / le api f / il
       gatto m); the purpose verbs «vuole informare/divertire» agree with nothing. winNote reworded
       to «lo scopo di questa nota» to dodge the «l'autore» apostrophe (JS = apostrophe-free). */
    it: {
      q: 'A che cosa serve questa nota?',
      win: 'Sì! {note}', winNote: 'Hai trovato lo scopo di questa nota!',
      hear: '🔊 Ascolta',
      nInform: 'Questa nota dà fatti veri — vuole informare.',
      nEntertain: 'Questa nota racconta una storia divertente — vuole divertire.',
      nInstruct: 'Questa nota mostra i passaggi — cerca «prima… poi… infine».'
    },
    nl: {
      q: 'Waarom heeft de schrijver dit briefje geschreven?',
      win: 'Ja! {note}', winNote: 'Je hebt het doel van de schrijver gevonden!',
      hear: '🔊 Luister',
      nInform: 'Dit briefje geeft echte feiten — het wil je informeren.',
      nEntertain: 'Dit briefje is een grappig verhaal — het wil je vermaken.',
      nInstruct: 'Dit briefje laat stap voor stap zien hoe iets moet — het wil je iets uitleggen.'
    }
  };
  var LANG = 'en';
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function marlowSVG() {
    /* Marlow the pelican */
    return '<svg class="ap-mar-svg" viewBox="0 0 56 50" width="40" height="36" aria-hidden="true">' +
      '<path d="M19 26 q-9 2 -8 12 q8 -1 10 -8z" fill="#E4DCCB"/>' +   /* wing */
      '<ellipse cx="25" cy="31" rx="13" ry="13" fill="#F3EFE6" stroke="#B9A98C" stroke-width="2"/>' +
      '<circle cx="31" cy="16" r="7.5" fill="#F3EFE6" stroke="#B9A98C" stroke-width="1.6"/>' +
      '<path d="M38 13 l15 3.5 l-15 3z" fill="#E8A93A" stroke="#C2790F" stroke-width="1"/>' +   /* upper bill */
      '<path d="M38 17 q8 9 14 2 q-2 4 -14 2z" fill="#F2C14E" stroke="#C2790F" stroke-width="1"/>' +   /* pouch */
      '<g class="ap-eyes-open"><circle cx="31" cy="14.5" r="1.9" fill="#2B2B2B"/></g>' +
      '<g class="ap-eyes-happy"><path d="M28.5 14.5 q2.5 -2.5 5 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<line x1="21" y1="44" x2="21" y2="48" stroke="#E8A93A" stroke-width="1.8" stroke-linecap="round"/><line x1="29" y1="44" x2="29" y2="48" stroke="#E8A93A" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }

  var AuthorPurposeActivity = {
    id: 'author-purpose-activity',
    strings: {
      /* pt: character renamed «Marlow»→«Marujo» (operator-ruled — «Marlow» reads as an opaque
         English name to a BR kid; «Marujo» = a warm BR nautical word (a sailor), keeps «Mar-»/sea,
         fits a harbor pelican). pt-only divergence. instruction is agentless («PARA QUE ela foi
         escrita», not «por que o autor escreveu») — aligns with the «Para…» bins. */
      /* it: mascot «Marlow»→«Marino» (pedagogue-decisive — «Marlow» is opaque + the -ow grapheme
         mis-decodes for a classe-2 it reader; «Marino» = a real Italian name AND «del mare», keeps
         «Mar-», = the pt «Marujo» precedent). instruction is agentless (no «l'autore» apostrophe). */
      title: { en: 'The Harbor Post', de: 'Marlows Hafenpost', fr: 'Le courrier du port de Marlow', es: 'El correo del puerto de Marlow', pt: 'O correio do porto do Marujo', it: 'La posta del porto di Marino', nl: 'De havenpost van Marlow' },
      instruction: { en: 'Read the note, then send it to the bin that tells WHY the author wrote it!', de: 'Lies die Notiz und tippe an, warum der Autor sie geschrieben hat.', fr: 'Lis la note, puis envoie-la dans la boîte qui dit POURQUOI l’auteur l’a écrite !', es: 'Lee la nota y toca para qué se escribió.', pt: 'Leia a nota e mande para a caixa que mostra PARA QUE ela foi escrita!', it: 'Leggi la nota, poi mettila nella cassetta che dice PERCHÉ è stata scritta!', nl: 'Lees het briefje en tik waarom de schrijver het schreef.' },
      q: { en: '{q}', pt: '{q}', it: '{q}' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._binLabels = {}; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = null; this._binOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('ap-style')) return;
      var s = el('style'); s.id = 'ap-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.ap-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.ap-note{width:100%;background:#FFFDF6;border:2.5px solid #D9C9A6;border-left:7px solid #E0A93A;border-radius:12px;padding:11px 14px;font:600 clamp(.92rem,3.4vw,1.06rem)/1.4 Nunito,system-ui,sans-serif;color:#2A3A36;text-align:left;}',
        '.ap-hear{align-self:center;border:2px solid #146B5E;border-radius:999px;background:#fff;color:#146B5E;font:700 .82rem/1 Nunito,sans-serif;padding:6px 16px;min-height:44px;cursor:pointer;}',
        '.ap-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.ap-mar{flex:0 0 auto;}',
        '.ap-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.ap-line-msg.miss{color:#C2410C;}',
        '.ap-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;width:100%;}',
        '.ap-cand{flex:1 1 30%;min-width:130px;max-width:220px;display:flex;align-items:center;justify-content:center;text-align:center;padding:11px 14px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:52px;font:800 clamp(.9rem,3.3vw,1.04rem)/1.16 Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.ap-cand.dim{opacity:.42;}',
        '.ap-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.ap-mar-svg .ap-eyes-happy{display:none;}.ap-mar[data-pose=happy] .ap-eyes-open{display:none;}.ap-mar[data-pose=happy] .ap-eyes-happy{display:block;}',
        '.ap-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.ap-root{gap:6px;}.ap-note{padding:8px 10px;font-size:.9rem;line-height:1.34;}.ap-strip{gap:7px;}.ap-cand{flex-basis:30%;min-width:0;min-height:48px;padding:8px 7px;font-size:.82rem;}}',
        '@media (max-width:340px){.ap-hear{display:none;}}',   /* tiniest phones: drop the read-aloud button (the note is on-screen text) to reclaim the resolved-fold budget */
        '.lcs-app:not(.marlow-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'author-purpose.why-wrote.ri-2-6';
      var tries = ['/mini-tools/author-purpose-activities.json', 'author-purpose-activities.json', '../mini tools/author-purpose-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
            self._binLabels = (row && row.params && ((row.params.binLabelsL10n && row.params.binLabelsL10n[LANG]) || row.params.binLabels)) || {};
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: txt('q') }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null;
      this._binOrder = this._shuffle(Core.PURPOSES.slice());   /* shuffle bin display order so position ≠ answer */
      if (this._app) this._app.classList.remove('marlow-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'ap-root');

      /* the note */
      var note = el('div', 'ap-note'); note.textContent = round.note.text; root.appendChild(note);

      /* Hear it */
      var self = this, hear = el('button', 'ap-hear'); hear.type = 'button'; hear.textContent = txt('hear');
      hear.addEventListener('click', function () {
        /* es→es-MX: the bare LANG shipped a generic/peninsular voice, and the 🔊 is
           this activity's only audio (the notes ARE the content). Matches the
           es-shipped siblings (atlas-fact-files :23, bea-two-bookshelves :20). */
        if (global.LCSAudio && global.LCSAudio.speak) { try { global.LCSAudio.speak({ type: 'ui', text: round.note.text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.92 }); } catch (e) { } }
      });
      root.appendChild(hear);

      /* Marlow + live line */
      var say = el('div', 'ap-say');
      var mr = el('div', 'ap-mar'); mr.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); mr.innerHTML = marlowSVG();
      var msg = el('p', 'ap-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(mr, msg); root.appendChild(say); this._mar = mr;

      this._renderBins(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _renderBins: function (root, round) {
      var self = this, tok = this._token;
      var strip = el('div', 'ap-strip');
      var order = this._binOrder || Core.PURPOSES.slice();
      order.forEach(function (purpose) {
        var b = el('button', 'ap-cand' + (self._nonConf[purpose] ? ' dim' : '') + (self._lit === purpose ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-purpose', purpose);
        var label = self._binLabels[purpose] || purpose;
        b.setAttribute('aria-label', label);
        b.textContent = label;
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[purpose] || self._token !== tok) return;
          if (Core.isAnswer(round, purpose)) { self._lit = purpose; self._resolve(); }
          else { self._nonConf[purpose] = 1; self._nudge(round.note.purpose); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('marlow-resolved');
      this.render();
      var line = this._api.stage.querySelector('.ap-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function (purpose) {
      var key = purpose === 'inform' ? 'nInform' : purpose === 'entertain' ? 'nEntertain' : 'nInstruct';
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.ap-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function (round) {
      var self = this, wrap = el('div', 'ap-sronly'); wrap.setAttribute('aria-live', 'polite');
      var bins = Core.PURPOSES.map(function (p) { return self._binLabels[p] || p; }).join(', ');
      wrap.innerHTML = LANG === 'de'
        ? '<p>Notiz: ' + round.note.text + ' ' + txt('q') + ' Zur Auswahl: ' + bins + '.</p>'
        : LANG === 'fr'
        ? '<p>Note : ' + round.note.text + ' ' + txt('q') + ' Choix : ' + bins + '.</p>'
        /* es: no space before the colon (that's a French rule, wrong in Spanish);
           «Opciones» for fr «Choix» — «Cajas»/«Buzones» would read as furniture. */
        : LANG === 'es'
        ? '<p>Nota: ' + round.note.text + ' ' + txt('q') + ' Opciones: ' + bins + '.</p>'
        : LANG === 'pt'
        ? '<p>Nota: ' + round.note.text + ' ' + txt('q') + ' Opções: ' + bins + '.</p>'
        : LANG === 'it'
        ? '<p>Nota: ' + round.note.text + ' ' + txt('q') + ' Opzioni: ' + bins + '.</p>'
        : LANG === 'nl'
        ? '<p>Notitie: ' + round.note.text + ' ' + txt('q') + ' Keuzes: ' + bins + '.</p>'
        : '<p>Note: ' + round.note.text + ' ' + txt('q') + ' Bins: ' + bins + '.</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.AuthorPurposeActivity = AuthorPurposeActivity;

}(typeof window !== 'undefined' ? window : this));
