/* =====================================================================
   OLIVE'S KIND-OF TREE — ACTIVITY  (olive-kind-of-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.b — define words by category & key attributes. Olive the owl: see
   a picture + an attribute clue, tap the CATEGORY it belongs to. Validity
   DERIVED by category-define-core.js (the choice whose word === the category).
   answerType:'state' tap-a-word + shell Check; the picture has a 🔊. Per-pass
   reshuffle. Picture from the image library; SVG char stub. No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CategoryDefineCore;
  /* ⚠ CORAL2 is a TEXT colour in all three of its uses (.okt-cluelab, .okt-ask, .okt-opt.okt-sel)
     and the old #D9572F measured 3.37-3.85:1 against this card's grounds — below the 4.5:1 AA
     floor, and none of the three is large text (the 3.0 exemption needs >=18.66px bold). Computed,
     not eyeballed: #B8431C gives 4.94 / 4.68 / 5.35 / 5.11:1 on the four grounds it meets.
     CORAL stays #F2784B: its only use is a BORDER, where the floor is 3:1. */
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#B8431C', INK: '#2A2A35', GOLD: '#E8A53A', WIN: '#2E7D46', WINTX: '#1B5E33' };
  var LANG = 'en';

  /* ⚠ A TABLE, not another ternary arm. The label is auto-spoken 320 ms into every round and again
     on every tap, so a missing branch is a wrong voice CONTINUOUSLY, not incidentally. Both the
     LCSAudio path and the SpeechSynthesis fallback read this — the old code passed a bare 2-letter
     code on the first and fell through to 'en-US' on the second. */
  var VOICE = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-MX', pt: 'pt-BR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE' };
  function voice() { return VOICE[LANG] || VOICE.en; }

  /* The picture button's aria-label. ⚠ Swedish takes the POSTPOSED form like de/nl — a fronted
     "lyssna på en hund" reads as *listen to a dog*. Table, not a 7th ternary arm (the
     pronoun-activity precedent, which shipped half a blind surface in English). */
  var HEAR = {
    en: function (w) { return 'hear ' + w; },
    de: function (w) { return w + ' anhören'; },
    fr: function (w) { return 'écouter ' + w; },
    es: function (w) { return 'escuchar ' + w; },
    pt: function (w) { return 'ouvir ' + w; },
    it: function (w) { return 'ascolta ' + w; },
    nl: function (w) { return w + ' beluisteren'; },
    sv: function (w) { return w + ' – lyssna'; }
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: voice(), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; u.lang = voice(); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function owlSVG() {
    return '<svg class="okt-owl-svg" viewBox="0 0 100 100" role="img" aria-label="Olive the owl">' +
      '<path d="M28 30 L40 22 L40 40 Z" fill="#8A6A3A"/><path d="M72 30 L60 22 L60 40 Z" fill="#8A6A3A"/>' +   /* ear tufts */
      '<ellipse cx="50" cy="56" rx="27" ry="28" fill="#A6803F"/>' +                /* body */
      '<ellipse cx="50" cy="64" rx="16" ry="18" fill="#E0C794"/>' +               /* belly */
      '<circle cx="40" cy="46" r="9" fill="#FFFDF6"/><circle cx="60" cy="46" r="9" fill="#FFFDF6"/>' +
      '<circle cx="40" cy="46" r="4" fill="#2A2A35"/><circle cx="60" cy="46" r="4" fill="#2A2A35"/>' +
      '<path d="M46 52 L54 52 L50 58 Z" fill="#F2A03B"/>' +                         /* beak */
      '</svg>';
  }

  global.OliveKindOfActivity = {
    id: 'olive-kind-of-activity',

    /* it (#27 fan-out — 3rd it VOCABULARY strand «Lessico»; categorie/iperonimo, classe seconda): clothing category
       = «Abbigliamento» (the only iperonimo that admits a hat — a cappello is an accessorio, NOT a vestito; both
       experts decisive); 6 labels all singular. Olive = FEMININE agreement but ⚠ bare «Olive», NEVER «la Olive»
       (article+female-name is dialectal in scholastic Italian). «indizio» not «pista». ⚠ ’ (U+2019) in elisions
       (L’albero, l’indizio) keeps the single-quoted JS strings intact. oliveIntro SHORT (2-line bubble @360px). */
    /* sv (#27 — 3rd sv VOCABULARY-strand deck «Ord och begrepp», åk 2 · överbegrepp): the child-facing
       metalanguage is `sort`, NEVER `grupp` — Swedish `grupp` is the COUNTING word, load-bearing in at
       least five shipped sv MATH decks ("Vilken grupp har fler?", "Lika grupper"), so the English
       theAsk "Tap the GROUP it belongs to" cannot be translated literally. `överbegrepp` is the right
       term but is mellanstadium metalanguage: it belongs in the slug and page_title (the adult/SEO
       surface), never on the child's screen.
       ⚠⚠ AN INVARIANT SWEDISH PROMPT CANNOT CONTAIN AN ANAPHORIC PRONOUN. `den`/`det` agrees with each
       round's noun gender (en hund → den, ett träd → det), and the prompt is ONE string across all
       rounds — so «Vilken sort hör det till?» and «Vad är den för sorts sak?» are both dead. The escape
       is Swedish's identificational `det`, which does not agree: «Vad är det?» → «Det är en hund / ett
       bord». Every string below is built on that frame or points at the BUTTON (`sort`, an en-word,
       invariant), never at the target. de gets away with «Was für ein Ding ist das?» for the same reason.
       ⚠ `oliveIntro` must stay SHORT (2-line clamp) and must NOT carry the instruction — `.okt-row` is
       `display:none` below max-height 640px, so the owl and its bubble vanish on a short viewport.
       That is what `theAsk` is for; it persists.
       ⚠ `hintWrong` REPLACES the shell's own «Inte än – försök igen!» rather than joining it
       (lcs-shell.js:877), so it must diagnose AND re-invite in one line. */
    strings: {
      title: { en: "Olive's Kind-Of Tree", de: 'Olives Oberbegriff-Baum', fr: 'L’arbre des catégories d’Olive', es: 'El árbol de categorías de Olive', pt: 'A árvore de categorias da Olive', it: 'L’albero delle categorie di Olive', nl: 'Olives groepenboom', sv: 'Olgas grenar' },
      prompt: { en: 'What kind of thing is it?', de: 'Was für ein Ding ist das?', fr: 'Quelle sorte de chose est-ce ?', es: '¿Qué tipo de cosa es?', pt: 'Que tipo de coisa é essa?', it: 'Che tipo di cosa è?', nl: 'Wat voor ding is dit?', sv: 'Vad är det för sorts sak?' },
      oliveIntro: { en: 'Read the clue — what KIND of thing is this?', de: 'Lies den Tipp – was für ein Ding ist das?', fr: 'Lis l’indice : quelle sorte de chose est-ce ?', es: 'Lee la pista: ¿qué TIPO de cosa es esta?', pt: 'Leia a pista: que tipo de coisa é?', it: 'Leggi l’indizio: che tipo di cosa è?', nl: 'Lees de hint — wat voor ding is dit?', sv: 'Titta på bilden och läs ledtråden!' },
      clueLab: { en: 'Clue:', de: 'Tipp:', fr: 'Indice :', es: 'Pista:', pt: 'Pista:', it: 'Indizio:', nl: 'Hint:', sv: 'Ledtråd:' },
      theAsk: { en: 'Tap the group it belongs to.', de: 'Tippe auf die Gruppe, zu der es gehört.', fr: 'Touche la bonne catégorie.', es: 'Toca el grupo al que pertenece.', pt: 'Toque no grupo a que ela pertence.', it: 'Tocca il gruppo a cui appartiene.', nl: 'Tik op de groep waar het bij hoort.', sv: 'Tryck på rätt sort.' },
      /* ⚠ THE SHELL DEMANDS THIS KEY AND NOBODY DECLARED IT. lcs-shell.js:449 does
         i18n.t(tool.strings,'instruction'), and i18n.t RETURNS THE RAW KEY when the entry is absent
         (:82), so the role="application" container has been announcing itself to every screen-reader
         user, in every locale, as "Interactive <Title> activity. instruction". Measured: 37 of the 120
         activities with a strings block are missing it. Repaired here from each locale's own theAsk —
         already native, already imperative — so all eight locales are fixed at no new copy.
         (It is display:none in the embed the activity page always uses, so this is the a11y surface
         only — I checked lcs-shell.css:261 and page.tsx:573 before saying so.) */
      instruction: { en: 'Tap the group it belongs to.', de: 'Tippe auf die Gruppe, zu der es gehört.', fr: 'Touche la bonne catégorie.', es: 'Toca el grupo al que pertenece.', pt: 'Toque no grupo a que ela pertence.', it: 'Tocca il gruppo a cui appartiene.', nl: 'Tik op de groep waar het bij hoort.', sv: 'Tryck på rätt sort.' },
      hintPick: { en: 'Read the clue, then tap a group!', de: 'Lies den Tipp und tippe dann auf eine Gruppe!', fr: 'Lis l’indice, puis touche une catégorie !', es: 'Lee la pista y luego toca un grupo.', pt: 'Leia a pista e toque em um grupo!', it: 'Leggi l’indizio, poi tocca un gruppo!', nl: 'Lees de hint en tik dan op een groep!', sv: 'Läs ledtråden och tryck på en sort!' },
      hintWrong: { en: "Not that group — read the clue once more.", de: 'Nicht diese Gruppe – lies den Tipp noch einmal.', fr: 'Pas cette catégorie… relis bien l’indice.', es: 'Ese grupo no es. Vuelve a leer la pista.', pt: 'Esse não é o grupo — leia a pista mais uma vez.', it: 'Non è quel gruppo — rileggi l’indizio.', nl: 'Niet die groep — lees de hint nog eens.', sv: 'Inte den sorten – läs ledtråden och försök igen!' },
      win: { en: 'Yes! You found its group. 🦉', de: 'Ja! Du hast die richtige Gruppe gefunden. 🦉', fr: 'Bravo ! Tu as trouvé la bonne catégorie. 🦉', es: '¡Sí! Encontraste su grupo. 🦉', pt: 'Isso! Você achou o grupo dela. 🦉', it: 'Sì! Hai trovato il suo gruppo. 🦉', nl: 'Ja! Je hebt de juiste groep gevonden. 🦉', sv: 'Ja! Du hittade rätt sort. 🦉' }
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
      var wrap = api.el('div', 'okt-wrap'); var root = api.el('div', 'okt-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;
      var dispWord = (this.round.target && this.round.target.label) || v.target.noun;

      var row = api.el('div', 'okt-row');
      var owl = api.el('div', 'okt-owl'); owl.innerHTML = owlSVG(); row.appendChild(owl);
      var say = api.el('div', 'okt-say'); say.textContent = api.t('oliveIntro'); row.appendChild(say);
      root.appendChild(row);

      var mid = api.el('div', 'okt-mid');
      var pic = api.el('button', 'okt-pic'); pic.type = 'button'; pic.setAttribute('aria-label', (HEAR[LANG] || HEAR.en)(dispWord));
      pic.innerHTML = '<img class="okt-img" src="' + imgUrl(v.target) + '" alt="' + esc(dispWord) + '" onerror="this.style.visibility=\'hidden\'"><span class="okt-spk">🔊</span>';
      pic.addEventListener('click', function () { speak(dispWord); });
      mid.appendChild(pic);
      var clue = api.el('div', 'okt-clue');
      var clab = api.el('span', 'okt-cluelab'); clab.textContent = api.t('clueLab'); clue.appendChild(clab);
      var ctxt = api.el('span', 'okt-cluetxt'); ctxt.textContent = v.clue; clue.appendChild(ctxt);
      mid.appendChild(clue);
      root.appendChild(mid);

      var ask = api.el('div', 'okt-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'okt-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'okt-opt' + (self.sel === o.id ? ' okt-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(dispWord); }, 320); }
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
      fetch('/mini-tools/olive-kind-of-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[olive-kind-of] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.okt-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.okt-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.okt-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.okt-owl{width:clamp(42px,9vw,54px);flex:0 0 auto;}.okt-owl-svg{width:100%;height:auto;display:block;}'
        + '.okt-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.okt-mid{display:flex;align-items:center;gap:clamp(8px,2.4vw,16px);justify-content:center;flex-wrap:wrap;}'
        + '.okt-pic{position:relative;border-radius:16px;border:3px solid ' + C.GOLD + ';background:#FFFDF6;padding:clamp(5px,1.4vw,9px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.okt-img{width:clamp(62px,18vw,100px);height:clamp(62px,18vw,100px);object-fit:contain;display:block;}'
        /* ⚠ MEASURED: the badge sat INSIDE the picture and covered 21.9% of it at 320/360 — a fifth of
             the only thing the child reasons from, worst where the picture is smallest. Moved onto
             the card's own padding/edge instead of the artwork. */
        + '.okt-spk{position:absolute;right:-7px;bottom:-7px;font-size:13px;line-height:1;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:9px;padding:2px 4px;}'
        + '.okt-clue{max-width:200px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:7px 11px;}'
        + '.okt-cluelab{font:800 clamp(10px,2.5vw,12px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';text-transform:uppercase;letter-spacing:.04em;margin-right:5px;}'
        + '.okt-cluetxt{font:700 clamp(13px,3.4vw,16px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        /* ⚠ coral was carrying THREE meanings at once — this standing instruction, the SELECTED card,
             and (on the shell's prompt) the wrong-answer verdict. A child whose only channel is colour
             cannot tell "I picked this" from "this was wrong". The neutral instruction gives up its
             claim on coral; measured 5.48-5.78:1 in teal, better than the 4.68-4.94 it had. */
        + '.okt-ask{text-align:center;font:800 clamp(14px,3.2vw,17px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.okt-opts{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.okt-opt{min-width:clamp(74px,22vw,110px);min-height:50px;padding:10px 16px;border-radius:14px;border:2px solid rgba(20,107,94,.45);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.okt-opt.okt-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        /* ⚠ THE MOST COMMON CHILD STATE HAD NO BOARD FEEDBACK. On a failed Check the shell turns the
             PROMPT to try-again and swaps in the hint, but the card the child tapped kept the identical
             coral .okt-sel — so nothing on the board changed at the one moment the child is looking at
             it. This is a QUIET neutral treatment: no red, no X, no cross. It says "you tried this one",
             and deliberately says nothing about which card is right. */
        /* ⚠⚠ THE COLOUR OF A CORRECT ANSWER ON A SUCCESS SCREEN. Until this build the card the child
             got RIGHT kept the coral .okt-sel treatment while the shell said "Bra jobbat!" in green —
             the child's correct answer flagged in the attention colour beside a green celebration.
             Found by READING THE 1024 RENDER; every gate passed.
             ⚠ `.okt-right` and `.okt-sel` are BOTH two-class rules, so specificity ties and ORDER
             decides — this must stay BELOW .okt-sel. ⚠ And the colours are palette KEYS that exist:
             the sv #26 trap was `C.GOOD` in a palette that had `GREEN`, which is an invalid
             declaration, dropped WHOLE and SILENTLY, so the defect shipped inside its own fix. */
        + '.okt-opt.okt-right{border-color:' + C.WIN + ';background:#EAF7EF;color:' + C.WINTX + ';box-shadow:0 0 0 3px rgba(46,125,70,.22);transform:translateY(-2px);}'
        + '.okt-opt.okt-tried{border-color:rgba(20,107,94,.20);background:#F4F1E9;color:rgba(42,42,53,.70);box-shadow:none;transform:none;}'
        + '.okt-opt:active{transform:translateY(1px);}'
        + '.okt-pic:focus-visible,.okt-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.okt-root{gap:clamp(4px,1.1vw,8px);}.okt-owl{width:clamp(40px,7vw,48px);}.okt-img{width:clamp(56px,15vw,84px);height:clamp(56px,15vw,84px);}.okt-opt{min-height:48px;}}'
        + '@media (max-height:700px){.okt-root{gap:5px;padding:10px;}.okt-owl{width:clamp(38px,6.5vw,44px);}.okt-img{width:clamp(52px,13vw,70px);height:clamp(52px,13vw,70px);}.okt-cluetxt{font-size:14px;}.okt-opt{min-height:46px;padding:8px 14px;font-size:17px;}}'
        /* ⚠ THE SHORTEST VIEWPORT + THE WRONG-ANSWER STATE, which no sweep could see until this
           build had a `missed` phase. On a failed Check the shell adds its hint line INSIDE
           .lcs-activity-prompt (+33px), and at 320x640 that pushed the Check button to 655px —
           cut off, in EVERY locale, en included. Recovered here rather than by moving a gate
           threshold: a tighter clue box, and the clue allowed to use the width it actually has. */
        + '@media (max-height:640px){.okt-root{gap:4px;padding:8px;}.okt-row{display:none;}.okt-img{width:clamp(48px,13vw,60px);height:clamp(48px,13vw,60px);}.okt-opt{min-height:44px;font-size:16px;}.okt-clue{padding:4px 9px;}}'
        /* ⚠⚠ The shell sets `.lcs-app.activity .lcs-activity-prompt{font-size:clamp(22px,6vh,48px)}`
             (lcs-shell.css:585), so on a desktop the INVARIANT question rendered at up to 48px against
             15-19px word cards — the question twice the size of the only thing the child reads to
             answer. Two recorded traps at once: a media query adds NO specificity (this must sit AFTER
             the rule it overrides, which it does — it is injected into <head> at mount), and a
             SINGLE-class override cannot beat the shell's two-class rule and fails SILENTLY. */
        + '@media (min-width:768px){.lcs-app.activity .lcs-activity-prompt{font-size:clamp(24px,2.6vw,30px);}}'
        /* ⚠⚠ `.okt-clue{max-width:170px}` made the clue wrap to five lines on a 320px card that is
           ~304px wide — 80px of height for one sentence. Widening it is the height fix.
           ⚠⚠ AND THIS BLOCK USED TO PIN `.okt-ask` BACK TO 11px, silently defeating the AA-floor
           raise above, on the narrowest phones — where it matters most. A media query adds no
           specificity, so a LATER one wins: the recorded trap, found in my own fix by measuring the
           computed style rather than trusting the edit. */
        + '@media (max-width:380px){.okt-opt{min-width:64px;font-size:16px;}.okt-img{width:48px;height:48px;}.okt-mid{flex-wrap:nowrap;align-items:stretch;}.okt-pic{flex:0 0 auto;align-self:center;}.okt-clue{flex:1 1 auto;min-width:0;max-width:none;padding:4px 9px;display:flex;align-items:center;flex-wrap:wrap;}.okt-cluetxt{font-size:13px;line-height:1.2;}.okt-root{gap:4px;}.okt-mid{gap:6px;}.okt-opts{gap:6px;}.okt-ask{font-size:14px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-olive-kind-of', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'olive-kind-of.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) {
          var ok = Core.grade(round, tool.sel);
          /* ⚠ Only the WRONG case marks, and only the card the child actually tapped. Marking the
             correct one would leak the answer on a failed attempt — which is exactly what the
             local-test asserts against. */
          var el = document.querySelector('.okt-opt.okt-sel');
          if (el) el.classList.add(ok ? 'okt-right' : 'okt-tried');
          /* ⚠ the standing instruction contradicted the verdict: every success frame said
             "Bra jobbat!" at the top and "Tryck på rätt sort." directly above the answered board,
             in the same slot the miss hint uses. `visibility` not `display`, so nothing reflows. */
          var ask = document.querySelector('.okt-ask'); if (ask && ok) ask.style.visibility = 'hidden';
          return ok;
        },
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
