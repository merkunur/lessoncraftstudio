/* =====================================================================
   INKY'S BOOK WORKSHOP — ACTIVITY  (inky-book-workshop-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.K.6 — define the role of author vs illustrator. Inky the octopus
   makes books with ink; the child sees a job being done and taps whose job it
   is — Author (writes the words), Illustrator (draws the pictures), or Reader
   (reads it). Validity DERIVED by author-illustrator-core.js (the card whose
   role === the job's role). answerType:'state' tap-a-card + shell Check; cards
   shuffle. Text + SVG art only — no image-library, no audio dependency. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.AuthorIllustratorCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', PURPLE: '#8E6FC4' };
  var EMOJI = { author: '✍️', illustrator: '🎨', reader: '📖' };
  /* es: «Ilustrador» per §A.13.61 — RL.K.6 IS a naming standard ("name the author and
     illustrator"), so the label is the FORMAL curriculum term, never a transparent
     paraphrase. «Dibujante» (= draughtsman/cartoonist) rejected: SEP-issued books print
     «Autor:» / «Ilustrador:» ON THE PORTADA, so Mexican children meet this exact word on
     the books in their hands. Generic masculine is correct on the CARD — do NOT
     inclusive-ize to «Autor(a)»: parentheses + a morpheme to decode would land on the
     response surface, which is what sets this activity's grade. The NEM Igualdad-de-género
     eje is honoured in the parent prose instead. */
  /* it labels per §A.13.61 (RL.K.6 = naming standard) — the FORMAL terms printed on Italian book
     covers («Autore:» / «Illustratore:»), generic-masculine on the card (do NOT inclusive-ize:
     a slash + morpheme on the muted response surface would raise decoding load = grade-setting). */
  var LABEL = { en: { author: 'Author', illustrator: 'Illustrator', reader: 'Reader' }, de: { author: 'Autor', illustrator: 'Illustrator', reader: 'Leser' }, fr: { author: 'Auteur', illustrator: 'Illustrateur', reader: 'Lecteur' }, es: { author: 'Autor', illustrator: 'Ilustrador', reader: 'Lector' }, pt: { author: 'Autor', illustrator: 'Ilustrador', reader: 'Leitor' }, it: { author: 'Autore', illustrator: 'Illustratore', reader: 'Lettore' }, nl: { author: 'Schrijver', illustrator: 'Illustrator', reader: 'Lezer' } };
  var LANG = 'en';
  function label(role) { return (LABEL[LANG] && LABEL[LANG][role]) || LABEL.en[role]; }

  function speak(text) {
    /* es→es-MX in BOTH arms: bare LANG + the en-US fallback default would speak
       «Ilustrador» in an American English voice. Third engine with this defect
       (#84 author-purpose, #85 juniper, #86 here) — check every engine's call site. */
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = (LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function octoSVG() {
    return '<svg class="ibw-oct-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Inky, der Tintenfisch' : LANG === 'fr' ? 'Inky la pieuvre' : LANG === 'es' ? 'Inky el pulpo' : LANG === 'pt' ? 'Tinoco, o polvo' : LANG === 'it' ? 'Nino il polpo' : LANG === 'nl' ? 'Inky de inktvis' : 'Inky the octopus') + '">' +
      '<circle cx="50" cy="42" r="22" fill="#8E6FC4"/>' +                          /* head */
      '<circle cx="43" cy="40" r="3" fill="#fff"/><circle cx="57" cy="40" r="3" fill="#fff"/>' +
      '<circle cx="43" cy="40" r="1.5" fill="#2A2A35"/><circle cx="57" cy="40" r="1.5" fill="#2A2A35"/>' +
      '<path d="M44 50 q6 4 12 0" stroke="#5E3F94" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M30 60 q-6 14 -2 22 M40 64 q-3 16 0 24 M50 66 q0 16 0 24 M60 64 q3 16 0 24 M70 60 q6 14 2 22" stroke="#8E6FC4" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* A book page whose drawing changes with the job: words / a picture / reading. */
  function jobArtSVG(job) {
    var inner;
    if (job === 'wrote') inner = '<line x1="20" y1="22" x2="56" y2="22"/><line x1="20" y1="33" x2="60" y2="33"/><line x1="20" y1="44" x2="50" y2="44"/><line x1="20" y1="55" x2="58" y2="55"/>';
    else if (job === 'drew') inner = '<circle cx="30" cy="30" r="8" fill="#F2C14E" stroke="none"/><path d="M18 56 l14 -16 l10 10 l12 -14 l8 20z" fill="#7FB069" stroke="none"/>';
    else inner = '<circle cx="40" cy="26" r="7" fill="#F2C14E" stroke="none"/><path d="M28 56 q12 -16 24 0" fill="none" stroke="#F2784B" stroke-width="3"/><text x="40" y="50" font-size="13" text-anchor="middle" fill="#F2784B">★</text>';
    return '<svg class="ibw-page-svg" viewBox="0 0 80 70" role="img" aria-hidden="true">' +
      '<rect x="6" y="6" width="68" height="58" rx="5" fill="#fff" stroke="#C9B79A" stroke-width="2"/>' +
      '<g stroke="#9AA0A6" stroke-width="2.4" stroke-linecap="round">' + inner + '</g></svg>';
  }

  global.InkyBookWorkshopActivity = {
    id: 'inky-book-workshop-activity',

    strings: {
      /* es-MX. ⚠ «trabajo» NOT «tarea»: in Mexico `tarea` is overwhelmingly HOMEWORK, so
         «¿Quién hace esa tarea?» reads to a 6-year-old as "who does that homework?" — a
         direct collision (stronger in MX than in Spain, where *deberes* carries homework).
         ⚠ «¿Quién hace ese trabajo?» is a deliberate deviation from de/fr's POSSESSIVE
         frame («wessen Aufgabe» / «à qui est ce travail») — Spanish `de quién es X` is
         ownership-flavoured, not role-attribution; «¿a quién le toca?» reads as
         turn-taking. Do NOT restore the possessive to match de/fr.
         ⚠ CAPS keep their tildes (RAE): ESCRIBIÓ/DIBUJÓ — and DIBUJO untilded is a
         DIFFERENT WORD (the noun "drawing").
         §A.13.54: anchors are Toca/Mira (tú), «Alguien» (invariant), «Ya sabes» (verb) and
         role nouns naming the BOOK's people — never the child. A naive `win` like
         «¡Muy bien, campeón!» would break gender-invariance. */
      /* pt: character renamed «Inky»→«Tinoco» (operator-ruled — «Inky» is opaque to a BR kid, the
         ink→tinta pun invisible; «Tinoco» is built on tinta/ink, reads phonetically, fits o polvo,
         distinct from Espinho/Marujo/Fagulha). pt-only divergence. LABEL roles are FORMAL (§A.13.61,
         RL.K.6 is a naming standard): Autor/Ilustrador/Leitor. win anchors on fixed «o trabalho». */
      /* it: mascot «Inky»→«Nino» (pedagogue-decisive — «Inky» opaque, the ink pun invisible; «Nino»
         = a warm phonetically-native masc name with a soft «in-»/«inchiostro» echo, agrees with «il
         polpo», ≠ Fabio/Spino/Marino/Ginepro). ⚠ APOSTROPHE-free: the role nouns «autore»/
         «illustratore» are vowel-initial → «l'autore» elides (forbidden JS) → use the INDEFINITE
         «un autore»/«un illustratore»/«un lettore» frame (never elides). §A.13.54: win/hint/prompts
         anchor on «tu» verbs (Tocca/Guarda/Sai) + «Qualcuno» (invariant), never the child's gender;
         win «Sai» (NO «Bravo/Brava»). prompts use the role frame «Chi fa questo lavoro?» (= es). */
      title: { en: "Inky's Book Workshop", de: 'Inkys Buchwerkstatt', fr: 'L’atelier de livres d’Inky', es: 'El taller de libros de Inky', pt: 'A oficina de livros do Tinoco', it: 'La bottega dei libri di Nino', nl: 'De boekenwerkplaats van Inky' },
      instruction: { en: 'Tap whose job it is: author, illustrator, or reader.', de: 'Tippe, wessen Aufgabe das ist: Autor, Illustrator oder Leser.', fr: 'Touche à qui est ce travail : auteur, illustrateur ou lecteur.', es: 'Toca quién hace ese trabajo: autor, ilustrador o lector.', pt: 'Toque em quem faz esse trabalho: autor, ilustrador ou leitor.', it: 'Tocca chi fa questo lavoro: autore, illustratore o lettore.', nl: 'Tik op wie deze taak doet: schrijver, illustrator of lezer.' },
      /* it prompts COMPRESSED to a single direct role-attribution clause «Chi ha X …?» — the
         two-clause «Qualcuno ha X. Chi fa questo lavoro?» wrapped to 4 lines in the big shell prompt
         banner (visual-qa CUT-OFF at desktop 1024×900); the single clause fits + reads clearer for
         K-1. Still gender-safe («Chi» + invariant verb, no agreement with anyone); apostrophe-free. */
      promptWrote: { en: 'Someone WROTE the words. Whose job is that?', de: 'Jemand hat die Wörter GESCHRIEBEN. Wessen Aufgabe ist das?', fr: 'Quelqu’un a ÉCRIT les mots. À qui est ce travail ?', es: 'Alguien ESCRIBIÓ las palabras. ¿Quién hace ese trabajo?', pt: 'Alguém ESCREVEU as palavras. De quem é esse trabalho?', it: 'Chi ha SCRITTO le parole?', nl: 'Iemand SCHREEF de woorden. Wie doet dat?' },
      promptDrew: { en: 'Someone DREW the pictures. Whose job is that?', de: 'Jemand hat die Bilder GEZEICHNET. Wessen Aufgabe ist das?', fr: 'Quelqu’un a DESSINÉ les images. À qui est ce travail ?', es: 'Alguien DIBUJÓ las imágenes. ¿Quién hace ese trabajo?', pt: 'Alguém DESENHOU as figuras. De quem é esse trabalho?', it: 'Chi ha DISEGNATO le immagini?', nl: 'Iemand TEKENDE de plaatjes. Wie doet dat?' },
      promptRead: { en: 'Someone is READING the book. Whose job is that?', de: 'Jemand LIEST das Buch. Wessen Aufgabe ist das?', fr: 'Quelqu’un LIT le livre. À qui est ce travail ?', es: 'Alguien está LEYENDO el libro. ¿Quién hace ese trabajo?', pt: 'Alguém está LENDO o livro. De quem é esse trabalho?', it: 'Chi sta LEGGENDO il libro?', nl: 'Iemand LEEST het boek. Wie doet dat?' },
      inkyIntro: { en: 'Every book has an author, an illustrator — and a reader!', de: 'Jedes Buch hat einen Autor, einen Illustrator – und einen Leser!', fr: 'Chaque livre a un auteur, un illustrateur — et un lecteur !', es: '¡Cada libro tiene un autor, un ilustrador… y un lector!', pt: 'Todo livro tem um autor, um ilustrador… e um leitor!', it: 'Ogni libro ha un autore, un illustratore… e un lettore!', nl: 'Elk boek heeft een schrijver, een illustrator — en een lezer!' },
      capWrote: { en: 'Writing the words ✍️', de: 'Die Wörter schreiben ✍️', fr: 'Écrire les mots ✍️', es: 'Escribir las palabras ✍️', pt: 'Escrever as palavras ✍️', it: 'Scrivere le parole ✍️', nl: 'De woorden schrijven ✍️' },
      capDrew: { en: 'Drawing the pictures 🎨', de: 'Die Bilder zeichnen 🎨', fr: 'Dessiner les images 🎨', es: 'Dibujar las imágenes 🎨', pt: 'Desenhar as figuras 🎨', it: 'Disegnare le immagini 🎨', nl: 'De plaatjes tekenen 🎨' },
      capRead: { en: 'Reading the book 📖', de: 'Das Buch lesen 📖', fr: 'Lire le livre 📖', es: 'Leer el libro 📖', pt: 'Ler o livro 📖', it: 'Leggere il libro 📖', nl: 'Het boek lezen 📖' },
      hintPick: { en: 'Author writes the words. Illustrator draws the pictures. Reader reads it.', de: 'Der Autor schreibt die Wörter. Der Illustrator zeichnet die Bilder. Der Leser liest es.', fr: 'L’auteur écrit les mots. L’illustrateur dessine les images. Le lecteur le lit.', es: 'El autor escribe las palabras. El ilustrador dibuja las imágenes. El lector lee el libro.', pt: 'O autor escreve as palavras. O ilustrador desenha as figuras. O leitor lê o livro.', it: 'Un autore scrive le parole. Un illustratore disegna le immagini. Un lettore legge il libro.', nl: 'De schrijver schrijft de woorden. De illustrator tekent de plaatjes. De lezer leest het boek.' },
      hintWrong: { en: 'Look again — who WRITES, who DRAWS, who READS?', de: 'Schau noch mal – wer SCHREIBT, wer ZEICHNET, wer LIEST?', fr: 'Regarde encore — qui ÉCRIT, qui DESSINE, qui LIT ?', es: 'Mira otra vez: ¿quién ESCRIBE, quién DIBUJA, quién LEE?', pt: 'Olhe de novo — quem ESCREVE, quem DESENHA, quem LÊ?', it: 'Guarda di nuovo: chi SCRIVE, chi DISEGNA, chi LEGGE?', nl: 'Kijk nog eens — wie SCHRIJFT, wie TEKENT, wie LEEST?' },
      win: { en: 'Yes! You know the job. 🐙', de: 'Ja! Du kennst die Aufgabe. 🐙', fr: 'Oui ! Tu connais le travail. 🐙', es: '¡Sí! Ya sabes quién hace cada trabajo. 🐙', pt: 'Isso! Você sabe de quem é o trabalho. 🐙', it: 'Sì! Sai di chi è il lavoro. 🐙', nl: 'Ja! Je weet wie het doet. 🐙' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'ibw-wrap'); var root = api.el('div', 'ibw-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, r = this.round, job = r.job;

      var row = api.el('div', 'ibw-row');
      var oct = api.el('div', 'ibw-oct'); oct.innerHTML = octoSVG(); row.appendChild(oct);
      var say = api.el('div', 'ibw-say'); say.textContent = api.t('inkyIntro'); row.appendChild(say);
      root.appendChild(row);

      var book = api.el('div', 'ibw-book');
      var page = api.el('div', 'ibw-page'); page.innerHTML = jobArtSVG(job); book.appendChild(page);
      var cap = api.el('div', 'ibw-cap'); cap.textContent = api.t(job === 'wrote' ? 'capWrote' : job === 'drew' ? 'capDrew' : 'capRead'); book.appendChild(cap);
      var topic = api.el('div', 'ibw-topic'); topic.textContent = r.book; book.appendChild(topic);
      root.appendChild(book);

      var opts = api.el('div', 'ibw-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'ibw-opt' + (self.sel === o.id ? ' ibw-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', label(o.role));
        var em = api.el('span', 'ibw-em'); em.textContent = EMOJI[o.role]; b.appendChild(em);
        var lb = api.el('span', 'ibw-lb'); lb.textContent = label(o.role); b.appendChild(lb);
        b.addEventListener('click', function () { self._tap(o.id, o.role); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, role) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(label(role)); this.render();
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
      fetch('/mini-tools/inky-book-workshop-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[inky-book-workshop] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ibw-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.ibw-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,13px);background:linear-gradient(180deg,#FBF3E4,#EFEAF6);border-radius:20px;padding:clamp(10px,2.4vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,100,170,.1);}'
        + '.ibw-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.ibw-oct{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.ibw-oct-svg{width:100%;height:auto;display:block;}'
        + '.ibw-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.ibw-book{display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff;border:2px solid rgba(142,111,196,.28);border-radius:14px;padding:8px 14px;box-shadow:0 2px 0 rgba(120,100,170,.16);}'
        + '.ibw-page{width:clamp(70px,18vw,92px);}.ibw-page-svg{width:100%;height:auto;display:block;}'
        + '.ibw-cap{font:800 clamp(13px,3.3vw,16px)/1.1 "Baloo 2",sans-serif;color:' + C.PURPLE + ';}'
        + '.ibw-topic{font:700 clamp(11px,2.8vw,13px)/1.25 "Nunito",sans-serif;color:' + C.INK + ';text-align:center;max-width:90%;font-style:italic;}'
        + '.ibw-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.ibw-opt{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:clamp(82px,25vw,116px);min-height:62px;padding:9px 14px;border-radius:14px;border:2px solid rgba(20,107,94,.26);background:#fff;color:' + C.INK + ';cursor:pointer;box-shadow:0 2px 0 rgba(140,120,60,.16);touch-action:manipulation;}'
        + '.ibw-em{font-size:clamp(20px,5.4vw,26px);line-height:1;}'
        + '.ibw-lb{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;}'
        + '.ibw-opt.ibw-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.ibw-opt:active{transform:translateY(1px);}'
        + '.ibw-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.ibw-root{gap:clamp(6px,1.5vw,10px);}.ibw-oct{width:clamp(40px,8vw,50px);}.ibw-page{width:clamp(62px,15vw,80px);}.ibw-opt{min-height:58px;}}'
        + '@media (max-height:700px){.ibw-root{gap:6px;padding:11px;}.ibw-row{display:none;}.ibw-page{width:64px;}.ibw-opt{min-height:54px;padding:8px 12px;}}'
        + '@media (max-height:640px){.ibw-root{gap:5px;padding:9px;}.ibw-page{width:54px;}.ibw-topic{display:none;}.ibw-opt{min-height:50px;}}'
        + '@media (max-width:380px){.ibw-opt{min-width:72px;}.ibw-lb{font-size:14px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-inky-book-workshop', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      var pk = round.job === 'wrote' ? 'promptWrote' : round.job === 'drew' ? 'promptDrew' : 'promptRead';
      return {
        id: 'inky-book-workshop.' + round.id, band: round.band || 1, promptKey: pk, promptArgs: {}, answerType: 'state',
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
