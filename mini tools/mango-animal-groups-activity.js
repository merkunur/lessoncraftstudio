/* =====================================================================
   MANGO'S ANIMAL GROUPS — ACTIVITY  (mango-animal-groups-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.a — collective nouns. Mango the monkey: see an animal, tap the word
   for a GROUP of them (a group of cows is a herd). Validity DERIVED by
   collective-noun-core.js (the choice whose word === the correct collective
   noun). answerType:'state' tap-a-word + shell Check; the picture has a 🔊.
   Per-pass reshuffle. Picture from the image library; SVG char stub. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CollectiveNounCore;
  var LANG = 'en';   // #103 — set in init from api.lang
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  /* fr « de {plural} » elision: « d’oiseaux » / « d’éléphants » / « d’abeilles » before a vowel, else « de … ». U+2019 apostrophe. */
  function elideDe(w) { return /^[aeiouyàâäéèêëîïôöûü]/i.test(String(w)) ? ('d’' + w) : ('de ' + w); }
  function groupPhrase(v) { return LANG === 'de' ? ('viele ' + v.plural) : LANG === 'fr' ? ('un groupe ' + elideDe(v.plural)) : LANG === 'es' ? ('un grupo de ' + v.plural) : LANG === 'pt' ? ('um grupo de ' + v.plural) : LANG === 'it' ? ('un gruppo di ' + v.plural) : LANG === 'nl' ? ('een groep ' + v.plural) : ('a group of ' + v.plural); }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function monkeySVG() {
    return '<svg class="mag-mon-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Mango le singe' : LANG === 'es' ? 'Mango el mono' : LANG === 'pt' ? 'Mango, o macaco' : LANG === 'it' ? 'Mango la scimmia' : LANG === 'nl' ? 'Mango de aap' : 'Mango the monkey') + '">' +
      '<circle cx="30" cy="40" r="9" fill="#8A5A33"/><circle cx="70" cy="40" r="9" fill="#8A5A33"/>' +   /* ears */
      '<circle cx="30" cy="40" r="4.5" fill="#C99A6E"/><circle cx="70" cy="40" r="4.5" fill="#C99A6E"/>' +
      '<circle cx="50" cy="48" r="24" fill="#8A5A33"/>' +                           /* head */
      '<ellipse cx="50" cy="56" rx="16" ry="15" fill="#E6C79E"/>' +                /* face */
      '<circle cx="43" cy="46" r="2.8" fill="#2A2A35"/><circle cx="57" cy="46" r="2.8" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="56" rx="3" ry="2.4" fill="#5A3A22"/>' +                /* nose */
      '<path d="M44 62 q6 5 12 0" stroke="#5A3A22" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.MangoAnimalGroupsActivity = {
    id: 'mango-animal-groups-activity',

    strings: {
      title: { en: "Mango's Animal Groups", de: 'Mango der Affe', fr: 'Mango le singe', es: 'Mango el mono', pt: 'Mango, o macaco', it: 'Mango e i gruppi di animali', nl: 'Mango de aap' },
      prompt: { en: 'What do we call a group of them?', de: 'Wie heißt die Gruppe?', fr: 'Comment appelle-t-on ce groupe ?', es: '¿Cómo se llama su grupo?', pt: 'Como se chama um grupo deles?', it: 'Come si chiama il loro gruppo?', nl: 'Hoe noem je deze groep dieren?' },
      mangoIntro: { en: 'Lots of animals together make a group — what is it called?', de: 'Viele Tiere zusammen sind eine Gruppe – wie heißt sie?', fr: 'Plein d’animaux ensemble, ça forme un groupe — comment ça s’appelle ?', es: 'Muchos animales juntos forman un grupo. ¿Cómo se llama?', pt: 'Muitos animais juntos formam um grupo. Como ele se chama?', it: 'Tanti animali insieme formano un gruppo. Come si chiama?', nl: 'Veel dieren samen vormen een groep — hoe heet die groep?' },
      askTpl: { en: 'A group of {plural} is a …', de: 'Wie nennt man viele {plural}?', fr: 'Comment appelle-t-on un groupe {dePlural} ?', es: '¿Cómo se llama un grupo de {plural}?', pt: 'Um grupo de {plural} se chama…', it: 'Come si chiama un gruppo di {plural}?', nl: 'Hoe noem je een groep {plural}?' },
      theAsk: { en: 'Tap the word for the group.', de: 'Tipp den Sammelnamen.', fr: 'Tape le bon nom de groupe.', es: 'Toca el nombre del grupo.', pt: 'Toque na palavra que dá nome ao grupo.', it: 'Tocca il nome del gruppo.', nl: 'Tik het verzamelwoord aan.' },
      hintPick: { en: 'Each animal has its own group word — tap your pick!', de: 'Jedes Tier hat sein eigenes Gruppenwort – tipp deine Wahl!', fr: 'Chaque animal a son mot de groupe — tape ta réponse !', es: 'Cada animal tiene su palabra de grupo. ¡Toca la tuya!', pt: 'Cada animal tem a sua própria palavra de grupo — toque na sua escolha!', it: 'Ogni animale ha il suo nome di gruppo. Tocca la tua scelta!', nl: 'Elk dier heeft zijn eigen groepswoord — tik jouw keuze aan!' },
      hintWrong: { en: "Not that one — think of the special word for this group.", de: 'Nicht ganz – denk an das besondere Wort für diese Gruppe.', fr: 'Pas tout à fait — pense au mot juste pour ce groupe.', es: 'Esa no. Piensa en la palabra especial para este grupo.', pt: 'Essa não — pense na palavra especial para este grupo.', it: 'Non questa. Pensa alla parola giusta per questo gruppo.', nl: 'Die niet — denk aan het speciale woord voor deze groep.' },
      win: { en: 'Yes! That is the group word. 🐒', de: 'Genau! Das ist der Sammelname. 🐒', fr: 'Oui ! C’est bien le nom du groupe. 🐒', es: '¡Sí! Esa es la palabra del grupo. 🐒', pt: 'Isso! Essa é a palavra do grupo. 🐒', it: 'Sì! È il nome giusto del gruppo. 🐒', nl: 'Ja! Dat is het groepswoord. 🐒' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'mag-wrap'); var root = api.el('div', 'mag-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'mag-row');
      var mon = api.el('div', 'mag-mon'); mon.innerHTML = monkeySVG(); row.appendChild(mon);
      var say = api.el('div', 'mag-say'); say.textContent = api.t('mangoIntro'); row.appendChild(say);
      root.appendChild(row);

      var mid = api.el('div', 'mag-mid');
      var pic = api.el('button', 'mag-pic'); pic.type = 'button'; pic.setAttribute('aria-label', LANG === 'fr' ? ('écouter : ' + v.plural) : LANG === 'de' ? ('anhören: ' + v.plural) : LANG === 'es' ? ('escuchar: ' + v.plural) : LANG === 'pt' ? ('ouvir: ' + v.plural) : LANG === 'it' ? ('ascolta: ' + v.plural) : LANG === 'nl' ? ('luister: ' + v.plural) : ('hear ' + v.subject.noun));
      pic.innerHTML = '<img class="mag-img" src="' + imgUrl(v.subject) + '" alt="' + esc(v.subject.noun) + '" onerror="this.style.visibility=\'hidden\'"><span class="mag-spk">🔊</span>';
      pic.addEventListener('click', function () { speak(groupPhrase(v)); });
      mid.appendChild(pic);
      var q = api.el('div', 'mag-q'); q.textContent = api.t('askTpl').replace('{plural}', v.plural).replace('{dePlural}', elideDe(v.plural)); mid.appendChild(q);
      root.appendChild(mid);

      var ask = api.el('div', 'mag-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'mag-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'mag-opt' + (self.sel === o.id ? ' mag-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(groupPhrase(v)); }, 320); }
    },

    _tap: function (id, word) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(word); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
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
      fetch('/mini-tools/mango-animal-groups-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var src = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(src.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[mango-animal-groups] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.mag-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.mag-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.mag-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.mag-mon{width:clamp(42px,9vw,54px);flex:0 0 auto;}.mag-mon-svg{width:100%;height:auto;display:block;}'
        + '.mag-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.mag-mid{display:flex;align-items:center;gap:clamp(8px,2.4vw,16px);justify-content:center;flex-wrap:wrap;}'
        + '.mag-pic{position:relative;border-radius:16px;border:3px solid ' + C.GOLD + ';background:#FFFDF6;padding:clamp(5px,1.4vw,9px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.mag-img{width:clamp(62px,18vw,100px);height:clamp(62px,18vw,100px);object-fit:contain;display:block;}'
        + '.mag-spk{position:absolute;right:3px;bottom:3px;font-size:15px;background:#EAF2EE;border-radius:7px;padding:0 4px;}'
        + '.mag-q{font:800 clamp(15px,4vw,20px)/1.3 "Baloo 2",sans-serif;color:' + C.INK + ';max-width:200px;}'
        + '.mag-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.mag-opts{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.mag-opt{min-width:clamp(78px,23vw,112px);min-height:50px;padding:10px 16px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#fff;color:' + C.T + ';font:800 clamp(16px,4.2vw,20px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.mag-opt.mag-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.mag-opt:active{transform:translateY(1px);}'
        + '.mag-pic:focus-visible,.mag-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.mag-root{gap:clamp(4px,1.1vw,8px);}.mag-mon{width:clamp(40px,7vw,48px);}.mag-img{width:clamp(56px,15vw,84px);height:clamp(56px,15vw,84px);}.mag-opt{min-height:48px;}}'
        + '@media (max-height:700px){.mag-root{gap:5px;padding:10px;}.mag-mon{width:clamp(38px,6.5vw,44px);}.mag-img{width:clamp(52px,13vw,70px);height:clamp(52px,13vw,70px);}.mag-q{font-size:16px;}.mag-opt{min-height:46px;padding:8px 14px;font-size:18px;}}'
        + '@media (max-height:640px){.mag-root{gap:4px;padding:8px;}.mag-row{display:none;}.mag-img{width:clamp(48px,13vw,60px);height:clamp(48px,13vw,60px);}.mag-opt{min-height:44px;font-size:17px;}}'
        + '@media (max-width:380px){.mag-opt{min-width:66px;font-size:17px;}.mag-img{width:56px;height:56px;}.mag-q{font-size:16px;max-width:170px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-mango-animal-groups', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'mango-animal-groups.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel != null ? 'hintWrong' : 'hintPick'; }
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
