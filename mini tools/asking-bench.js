/* =====================================================================
   TOOL #36 — THE ASKING BENCH   (asking-bench.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #7. The L2 entry, renamed from
   "Question Builder" once the fence cut it down.

   THE BENCH · THE TELLING · THE ASKING.

   THE ROUTINE, which is what makes this an instrument and not a demo:
     "Build a telling sentence. Say what will happen when we ask it.
      Then ask it."   ... and then the move that matters:
     "Now change the verb and ask it again."

   ⭐ THE ONE THESIS — THE CHILD DOES NOT CHOOSE HOW TO ASK. THE CHILD
   CHOOSES WHAT TO ASK, AND THE LANGUAGE ANSWERS DIFFERENTLY DEPENDING
   ON WHAT THEY BUILT. One lever, four structurally different answers,
   and which one you get depends on a card a child picked up:
     The dog IS big.  -> IS the dog big?    a word jumps; nothing arrives
     The dog RUNS.    -> DOES the dog run?  a word arrives that was never
                                            there, AND runs -> run
     The dog CAN run. -> CAN the dog run?   the modal jumps, nothing else
     The dog RAN.     -> DID the dog run?   a word arrives AND the verb
                                            travels back to its base
   "Why did IS jump but RUNS needed a helper?" is a real, K-3-sized,
   immersion-classroom argument settled by the material and not by the
   grown-up. That is the whole tool.

   ⚠ THE FENCE — FOUR SURFACES, AND THREE OF THIS TOOL'S FOUR PLANNED
   MOVES WERE ALREADY OWNED:
     sentence-builder.build-a-sentence.l-1-1-j (en/de/es/fr) OWNS L.1.1.j
       AND owns the mechanic — sentence-builder-core.js:4-14, "arrange
       SCRAMBLED word-tiles into a complete sentence … exact-order
       grading". So NOBODY HERE EVER REORDERS WORDS BY HAND.
     wren-question-window.question-words.l-k-1-d (en/de/es/fr) OWNS the
       taught wh-set (question-word-core.js:19-20). So this tool never
       teaches, shows or contains a question word.
     sentence-clinic.fix-it.l-2-1 (en/de/es/fr) owns in-sentence reorder
       (order-svo) and END-MARK INSERTION, with "?" already a distractor.
       So the child never places a mark; a recipe's `wrap` emits it.
     CLEAN elsewhere: no tool manipulates a sentence; worksheet-gen's 240
       printable types have zero sentence-level literacy (K-221..K-235 is
       all sub-word); material-generators/sentence-strips.html:133 has
       seven frames, all declarative.
   ⇒ UNCLAIMED ON ALL FOUR SURFACES: the statement→question
     TRANSFORMATION itself. Nobody takes a declarative and converts it.

   ⚠ IT IS A TOOL, NEVER AN ACTIVITY. An activity here would collide with
   L.1.1.j. A free-play tool declares no `tasks`/`nextTask`, carries no
   educationalAlignment, and claims no code at all.

   ⭐ THE SENTENCE IS NEVER TEXT UNTIL THE MOMENT OF RENDER. State is a
   tuple {frameId, nounKey, verbId, …}; the telling and the asking are
   both rendered from it through an AUTHORED per-locale table. Nothing is
   ever parsed, because there is never a string to parse — which makes
   free-text-plus-heuristics unrepresentable rather than merely
   forbidden. (Rejected on arithmetic, not taste: fronting the finite
   verb in German requires knowing which verb IS finite. That is a
   parser, in eleven languages.)

   ⭐ AND NOTHING IS EVER GENERATED. Every surface string a child can see
   is `===` a string authored in the grammar file — `Does` is authored,
   `run` is authored, `Is` is authored, even `the dog` (the lower-case
   subject) is an authored lookup. No morpheme is ever concatenated.
   Gate M-CLOSURE proves it exhaustively, which is what lets a Finnish
   -ko form be DATA and vowel harmony be a CHECK rather than a function.

   FOUR STRUCTURAL RESTRICTIONS, each gated, each disarming a whole class
   of wrongness in languages I cannot read:
     NOMINATIVE ONLY, FOREVER — the noun is always the subject and never
       moves. Legitimate because the yes/no transformation works on the
       verb region. Kills the German accusative and the Finnish
       partitive outright.
     3rd-PERSON NOUN SUBJECTS ONLY — disarms Dutch t-deletion, French
       complex inversion, English *am I*.
     NO SEPARABLE VERBS — "Läuft der Hund weg?" splits; one token would
       ship broken German.
     NO NEGATION — nicht-placement is its own science.

   ⚠ THE CLAIM IS NOT A VERDICT, AND THAT IS A THEOREM. Four cards, the
   same four in every language, multi-select: nothing moves / a word
   jumps to the front / a new word comes in / a word changes its shape.
   Several fire at once, so there is no single right chip. The outcome is
   rendered ONLY on the sentence; the claim row is never recoloured,
   crossed, counted or scored. M-CLAIM-INDEPENDENCE proves the rendered
   output is byte-identical across ALL SIXTEEN subsets of the claim set —
   the output is not a function of the claim.

   ⚠ NO SPEECH. Settled by measurement, not taste: reading-easel.js:45-52
   found seven voices on this machine, en+sv only, and a missing voice is
   SILENTLY SUBSTITUTED (Finnish read with German phonology). The ear
   cannot be the judge in a tool about grammar.

   REFUSES, FOREVER: no score, no timer, no streak · no verdict wording
   or colour · no right answer · no question words (wren owns them) · no
   hand reordering (sentence-builder owns it) · no child-placed end mark
   (sentence-clinic owns it) · no pronoun subjects · no negation.
   ===================================================================== */
var AskingBench = {
  id: 'asking-bench',

  /* ⚠ CURATION: en authored here; the other ten are REPLACED WHOLESALE by
     their own native 3-agent ensembles (§A.13.48). [NSR-FLAG] sv/da/no/fi.
     pt Brazilian, es Mexican per §6. */
  strings: {
    title:        { en: "The Asking Bench", de: "Die Fragebank", fr: "Le banc des questions", es: "La banca de preguntas", pt: "O banco das perguntas", it: "Il banco delle domande", nl: "De vraagbank", sv: "Frågebänken", da: "Spørgebænken", no: "Spørrebenken", fi: "Kysymyspenkki" },
    instruction:  { en: "Build a telling sentence. Say what will happen when we ask it. Then ask it.", de: "Baut einen Aussagesatz. Sagt vorher, was passiert, wenn wir fragen. Dann fragt.", fr: "Construisez une phrase qui raconte. Dites ce qui va changer quand on pose la question. Puis posez-la.", es: "Armen una oración que cuenta. Digan qué va a pasar cuando preguntemos. Luego pregunten.", pt: "Montem uma frase que conta. Digam o que vai acontecer quando perguntarmos. Depois perguntem.", it: "Costruite una frase che racconta. Dite che cosa succederà quando faremo la domanda. Poi fatela.", nl: "Bouw een vertellende zin. Zeg wat er gebeurt als we het vragen. Vraag het dan.", sv: "Bygg en berättande mening. Säg vad som händer när vi frågar. Fråga sedan.", da: "Byg en fortællende sætning. Sig, hvad der sker, når vi spørger. Spørg så.", no: "Bygg en fortellende setning. Si hva som skjer når vi spør. Spør så.", fi: "Rakentakaa kertova lause. Sanokaa, mitä tapahtuu kun kysymme. Kysykää sitten." },
    tryAgain:     { en: "Now change the verb and ask it again.", de: "Tauscht jetzt das Verb aus und fragt noch einmal.", fr: "Changez maintenant le verbe et posez la question à nouveau.", es: "Ahora cambien el verbo y vuelvan a preguntar.", pt: "Agora troquem o verbo e perguntem de novo.", it: "Ora cambiate il verbo e fate di nuovo la domanda.", nl: "Verwissel nu het werkwoord en vraag het opnieuw.", sv: "Byt nu ut verbet och fråga igen.", da: "Skift nu verbet ud, og spørg igen.", no: "Bytt nå ut verbet og spør en gang til.", fi: "Vaihtakaa nyt verbi ja kysykää uudelleen." },
    tellingLabel: { en: "The telling", de: "Der Aussagesatz", fr: "La phrase qui raconte", es: "La oración que cuenta", pt: "A frase que conta", it: "La frase che racconta", nl: "De vertellende zin", sv: "Den berättande meningen", da: "Den fortællende sætning", no: "Den fortellende setningen", fi: "Kertova lause" },
    askingLabel:  { en: "The asking", de: "Die Frage", fr: "La question", es: "La pregunta", pt: "A pergunta", it: "La domanda", nl: "De vraag", sv: "Frågan", da: "Spørgsmålet", no: "Spørsmålet", fi: "Kysymys" },
    askBtn:       { en: "Ask it", de: "Fragen", fr: "Poser la question", es: "Preguntar", pt: "Perguntar", it: "Chiedi", nl: "Vragen", sv: "Fråga", da: "Spørg", no: "Spør", fi: "Kysy" },
    tellBtn:      { en: "Tell it again", de: "Wieder erzählen", fr: "Raconter à nouveau", es: "Contar otra vez", pt: "Contar de novo", it: "Racconta di nuovo", nl: "Weer vertellen", sv: "Berätta igen", da: "Fortæl igen", no: "Fortell igjen", fi: "Kerro uudelleen" },
    claimLabel:   { en: "What will happen?", de: "Was wird passieren?", fr: "Que va-t-il se passer ?", es: "¿Qué va a pasar?", pt: "O que vai acontecer?", it: "Che cosa succederà?", nl: "Wat gaat er gebeuren?", sv: "Vad kommer att hända?", da: "Hvad kommer der til at ske?", no: "Hva kommer til å skje?", fi: "Mitä tapahtuu?" },
    claimNothing: { en: "Nothing moves", de: "Nichts bewegt sich", fr: "Rien ne bouge", es: "Nada se mueve", pt: "Nada se mexe", it: "Non si muove niente", nl: "Er beweegt niets", sv: "Ingenting flyttar sig", da: "Intet flytter sig", no: "Ingenting flytter seg", fi: "Mikään ei liiku" },
    claimJumps:   { en: "A word jumps to the front", de: "Ein Wort springt nach vorn", fr: "Un mot saute au début", es: "Una palabra salta al principio", pt: "Uma palavra pula para a frente", it: "Una parola salta all'inizio", nl: "Een woord springt naar voren", sv: "Ett ord hoppar först", da: "Et ord hopper forrest", no: "Et ord hopper først", fi: "Yksi sana hyppää eteen" },
    claimArrives: { en: "A new word comes in", de: "Ein neues Wort kommt dazu", fr: "Un mot nouveau arrive", es: "Llega una palabra nueva", pt: "Chega uma palavra nova", it: "Arriva una parola nuova", nl: "Er komt een nieuw woord bij", sv: "Ett nytt ord kommer in", da: "Der kommer et nyt ord", no: "Det kommer et nytt ord", fi: "Mukaan tulee uusi sana" },
    claimShape:   { en: "A word changes its shape", de: "Ein Wort ändert seine Form", fr: "Un mot change de forme", es: "Una palabra cambia de forma", pt: "Uma palavra muda de forma", it: "Una parola cambia forma", nl: "Een woord verandert van vorm", sv: "Ett ord byter form", da: "Et ord skifter form", no: "Et ord skifter form", fi: "Yksi sana muuttaa muotoaan" },
    whoLabel:     { en: "Who or what", de: "Wer oder was", fr: "Qui ou quoi", es: "Quién o qué", pt: "Quem ou o quê", it: "Chi o che cosa", nl: "Wie of wat", sv: "Vem eller vad", da: "Hvem eller hvad", no: "Hvem eller hva", fi: "Kuka tai mikä" },
    doesLabel:    { en: "Doing word", de: "Tunwort", fr: "Mot d'action", es: "Palabra de acción", pt: "Palavra de ação", it: "Parola che fa", nl: "Doewoord", sv: "Görandeord", da: "Gøreord", no: "Gjøreord", fi: "Tekemissana" },
    regPlain:     { en: "the plain way", de: "die einfache Art", fr: "la façon simple", es: "la forma sencilla", pt: "o jeito simples", it: "il modo semplice", nl: "de gewone manier", sv: "det enkla sättet", da: "den enkle måde", no: "den enkle måten", fi: "yksinkertainen tapa" },
    clear:        { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Recomeçar", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" },
    printBtn:     { en: "Print the bench", de: "Bank drucken", fr: "Imprimer le banc", es: "Imprimir la banca", pt: "Imprimir o banco", it: "Stampa il banco", nl: "Bank afdrukken", sv: "Skriv ut bänken", da: "Print bænken", no: "Skriv ut benken", fi: "Tulosta penkki" },
    gatePrint:    { en: "Printing the bench is part of the Teacher plan.", de: "Das Drucken gehört zum Lehrer-Paket.", fr: "L'impression fait partie de l'offre Enseignant.", es: "La impresión es parte del plan Docente.", pt: "Imprimir faz parte do plano Professor.", it: "La stampa fa parte del piano Insegnante.", nl: "Afdrukken hoort bij het Leerkracht-pakket.", sv: "Utskrift ingår i Lärarpaketet.", da: "Print hører til Lærerabonnementet.", no: "Utskrift hører til Lærerabonnementet.", fi: "Tulostaminen kuuluu Opettajan tilaukseen." },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Conhecer o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettajan tilaus" },
    setStack:     { en: "Keep the earlier askings", de: "Frühere Fragen behalten", fr: "Garder les questions précédentes", es: "Conservar las preguntas anteriores", pt: "Guardar as perguntas anteriores", it: "Tieni le domande precedenti", nl: "Eerdere vragen bewaren", sv: "Behåll tidigare frågor", da: "Behold tidligere spørgsmål", no: "Behold tidligere spørsmål", fi: "Säilytä aiemmat kysymykset" },
    loading:      { en: "Getting the bench ready…", de: "Die Bank wird vorbereitet…", fr: "Le banc se prépare…", es: "Preparando la banca…", pt: "Preparando o banco…", it: "Il banco si prepara…", nl: "De bank wordt klaargezet…", sv: "Bänken görs i ordning…", da: "Bænken gøres klar…", no: "Benken gjøres klar…", fi: "Penkkiä valmistellaan…" }
  },

  STORE_KEY: 'lcs:asking-bench:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { stack: true },
  settings: [
    { key: 'stack', type: 'toggle', labelKey: 'setStack' }
  ],

  premium: false,
  premiumKnown: false,

  /* the four claim cards, in a fixed order, THE SAME FOUR IN EVERY
     LANGUAGE — which is what lets a dual-language room compare German to
     Spanish on one screen */
  CLAIMS: ['nothing', 'jumps', 'arrives', 'shape'],
  CLAIM_LABEL: { nothing: 'claimNothing', jumps: 'claimJumps', arrives: 'claimArrives', shape: 'claimShape' },

  MAX_STACK: 3,

  /* =================================================================
     THE MODEL — pure, immutable, total. Reads the authored table only.
     ================================================================= */
  newState: function () {
    return {
      frameId: null, nounKey: null, verbId: null, adjKey: null, objKey: null, mainKey: null,
      register: null, claim: [], asked: false, stack: []
    };
  },

  _clone: function (st) {
    var s = st || this.newState();
    return {
      frameId: s.frameId, nounKey: s.nounKey, verbId: s.verbId,
      adjKey: s.adjKey, objKey: s.objKey, mainKey: s.mainKey, register: s.register,
      claim: s.claim.slice(), asked: !!s.asked, stack: s.stack.slice()
    };
  },

  /* the first legal tuple in the table — every locale opens on something */
  firstState: function (d) {
    var st = this.newState();
    if (!d || !d.frames || !d.frames.length) return st;
    var f = d.frames[0];
    st.frameId = f.id;
    st.nounKey = d.nouns[0].key;
    st.verbId = this.verbsFor(d, f.id)[0].id;
    st.adjKey = d.adjs && d.adjs.length ? d.adjs[0].key : null;
    st.objKey = d.objs && d.objs.length ? d.objs[0].key : null;
    st.mainKey = d.mains && d.mains.length ? d.mains[0].key : null;
    st.register = d.registers[0].id;
    return st;
  },

  byId: function (list, key, val) {
    for (var i = 0; i < (list || []).length; i++) if (list[i][key] === val) return list[i];
    return null;
  },
  frame: function (d, id) { return this.byId(d.frames, 'id', id); },
  verb:  function (d, id) { return this.byId(d.verbs, 'id', id); },
  noun:  function (d, k)  { return this.byId(d.nouns, 'key', k); },

  /* only the verbs whose class the frame admits — this is what keeps
     "The dog is the ball" unreachable without a special case */
  verbsFor: function (d, frameId) {
    var f = this.frame(d, frameId), self = this;
    if (!f) return [];
    return (d.verbs || []).filter(function (v) { return f.verbClasses.indexOf(v.class) > -1; });
  },

  recipeKey: function (d, st) {
    var v = this.verb(d, st.verbId);
    return st.frameId + '|' + (v ? v.class : '?') + '|' + st.register;
  },
  recipe: function (d, st) { return (d.recipes || {})[this.recipeKey(d, st)] || null; },

  /* ⚠ TOKENS CARRY AN IDENTITY, NOT JUST TEXT. Conservation is stated
     over the CARDS (id), never over the strings — the same card may show
     a different authored face on the asking rail, and that is exactly
     what "a word changes its shape" means. */
  tellTokens: function (d, st) {
    var f = this.frame(d, st.frameId), v = this.verb(d, st.verbId);
    if (!f || !v) return [];
    var out = [], self = this;
    f.slots.forEach(function (slot) {
      if (slot === 'subject') {
        var n = self.noun(d, st.nounKey);
        if (n) out.push({ id: 'subject', slot: 'subject', text: n.subjSg });
      } else if (slot === 'verb') {
        out.push({ id: 'verb', slot: 'verb', text: v.finite });
      } else if (slot === 'adj') {
        var a = self.byId(d.adjs, 'key', st.adjKey);
        if (a) out.push({ id: 'adj', slot: 'adj', text: a.form });
      } else if (slot === 'obj') {
        var o = self.byId(d.objs, 'key', st.objKey);
        if (o) out.push({ id: 'obj', slot: 'obj', text: o.form });
      } else if (slot === 'mainVerb') {
        /* ⚠ a modal needs a verb after it. The first draft let S-V admit a
           modal and rendered "The dog can." — clean, total, and not a
           sentence. No gate can know that, so the FRAME makes it
           unreachable and M-WELLFORMED asserts the pairing. */
        var mv = self.byId(d.mains, 'key', st.mainKey);
        if (mv) out.push({ id: 'mainVerb', slot: 'mainVerb', text: mv.form });
      }
    });
    return out;
  },

  /* apply the recipe's ops. Every text this produces is an AUTHORED
     string looked up on the verb, the noun or the decap map — nothing is
     built, spliced or concatenated (M-CLOSURE). */
  askTokens: function (d, st) {
    var r = this.recipe(d, st), v = this.verb(d, st.verbId);
    var toks = this.tellTokens(d, st).map(function (t) {
      return { id: t.id, slot: t.slot, text: t.text, was: null, arrived: false, moved: false };
    });
    if (!r || !v) return toks;
    var self = this, i;

    (r.ops || []).forEach(function (op) {
      if (op.op === 'insert') {
        var text = v[op.slot];
        if (typeof text !== 'string') return;
        var card = { id: 'helper', slot: 'helper', text: text, was: null, arrived: true, moved: false };
        toks.splice(Math.max(0, Math.min(op.at, toks.length)), 0, card);
      } else if (op.op === 'reshape') {
        for (i = 0; i < toks.length; i++) {
          if (toks[i].slot !== op.slot) continue;
          var to = v[op.to];
          if (typeof to !== 'string') break;
          toks[i].was = toks[i].text;
          toks[i].text = to;
          break;
        }
      } else if (op.op === 'front') {
        for (i = 0; i < toks.length; i++) {
          if (toks[i].slot !== op.slot) continue;
          var card2 = toks.splice(i, 1)[0];
          var fr = v[op.to];
          if (typeof fr === 'string') { card2.was = card2.text; card2.text = fr; }
          card2.moved = true;
          toks.unshift(card2);
          break;
        }
      } else if (op.op === 'suffix') {
        for (i = 0; i < toks.length; i++) {
          if (toks[i].slot !== op.slot) continue;
          var sf = v[op.to];
          if (typeof sf !== 'string') break;
          toks[i].was = toks[i].text;
          toks[i].text = sf;
          break;
        }
      }
    });

    /* the capitalisation walk: the fronted card takes the capital and the
       old first card gives it up — BOTH FORMS ARE AUTHORED LOOKUPS, never
       a toUpperCase(). And this is NOT a reshape: it must never light
       "a word changes its shape", so it is a field, not an op. */
    if (r.decap) {
      for (i = 0; i < toks.length; i++) {
        if (toks[i].slot !== r.decap) continue;
        var low = (d.decap || {})[toks[i].text];
        if (typeof low === 'string') toks[i].text = low;
        break;
      }
    }
    return toks;
  },

  endMark: function (d, st, asked) {
    var r = this.recipe(d, st);
    return asked ? ((r && r.wrap) || '') : (d.tellEnd || '');
  },
  openMark: function (d, st, asked) {
    var r = this.recipe(d, st);
    return asked && r && r.open ? r.open : '';
  },

  /* ⭐ THE LEGEND IS DERIVED FROM THE RECIPE, NEVER AUTHORED TWICE. `wrap`
     never contributes: every asking gets an end mark, so a claim that
     lights on every case says nothing at all. */
  opsOf: function (d, st) {
    var r = this.recipe(d, st);
    var out = {};
    if (!r) return out;
    (r.ops || []).forEach(function (op) {
      if (op.op === 'front') out.jumps = true;
      else if (op.op === 'insert') out.arrives = true;
      else if (op.op === 'reshape' || op.op === 'suffix') out.shape = true;
    });
    if (!out.jumps && !out.arrives && !out.shape) out.nothing = true;
    return out;
  },
  legend: function (d, st) {
    var o = this.opsOf(d, st);
    return this.CLAIMS.filter(function (c) { return !!o[c]; });
  },

  /* ---- setters. All immutable; all clamp, none reject. ---- */
  setFrame: function (d, st, frameId) {
    var next = this._clone(st);
    if (!this.frame(d, frameId)) return next;
    next.frameId = frameId;
    var vs = this.verbsFor(d, frameId);
    if (!this.byId(vs, 'id', next.verbId)) next.verbId = vs.length ? vs[0].id : null;
    next.asked = false;
    return next;
  },
  setNoun: function (d, st, key) {
    var next = this._clone(st);
    if (this.noun(d, key)) next.nounKey = key;
    next.asked = false;
    return next;
  },
  setVerb: function (d, st, id) {
    var next = this._clone(st);
    if (this.byId(this.verbsFor(d, next.frameId), 'id', id)) next.verbId = id;
    next.asked = false;
    return next;
  },
  setMain: function (d, st, key) {
    var next = this._clone(st);
    if (this.byId(d.mains, 'key', key)) next.mainKey = key;
    next.asked = false;
    return next;
  },
  setRegister: function (d, st, id) {
    var next = this._clone(st);
    if (this.byId(d.registers, 'id', id)) next.register = id;
    next.asked = false;
    return next;
  },
  toggleClaim: function (st, c) {
    var next = this._clone(st);
    if (this.CLAIMS.indexOf(c) === -1) return next;
    var at = next.claim.indexOf(c);
    if (at > -1) next.claim.splice(at, 1); else next.claim.push(c);
    return next;
  },

  /* ⚠ THE ASKINGS STACK, so the lesson is the DIFFERENCE between two of
     them and one tap cannot produce it. No counter — the stack is the
     record, never a score. */
  ask: function (d, st, keepStack) {
    var next = this._clone(st);
    if (!this.recipe(d, st)) return next;
    next.asked = true;
    if (keepStack) {
      var toks = this.askTokens(d, st);
      next.stack = next.stack.concat([{
        tokens: toks.map(function (t) { return { id: t.id, text: t.text }; }),
        end: this.endMark(d, st, true), open: this.openMark(d, st, true)
      }]);
      while (next.stack.length > this.MAX_STACK) next.stack.shift();
    }
    return next;
  },
  tellAgain: function (st) { var n = this._clone(st); n.asked = false; return n; },
  clearAll: function (d) { var s = this.firstState(d); return s; },

  /* ⭐ THE COLUMN SET — WHY THE ALIGNMENT IS TRUE BY CONSTRUCTION.
     Both rails live in ONE css grid, and this decides its columns, so a
     word that did not move is in the SAME COLUMN on both rows and lands
     at the same x without anybody computing a pixel. A word that moved
     gets a column at each end — one where it started, one where it
     landed — which is exactly what makes the move visible. Same trick as
     the folding sheet's flap and the class graph's bar: let the layout
     answer, never arithmetic. */
  columns: function (d, st) {
    var tell = this.tellTokens(d, st), ask = this.askTokens(d, st), cols = [], i;
    /* every asking card gets a column; a moved or arrived card's column
       is exclusive to the asking row */
    for (i = 0; i < ask.length; i++) {
      cols.push({ id: ask[i].id, ask: ask[i], tell: null, exclusive: !!(ask[i].moved || ask[i].arrived) });
    }
    /* then seat the telling cards, opening a column where one moved away */
    var cursor = 0;
    for (i = 0; i < tell.length; i++) {
      var t = tell[i], at = -1, j;
      for (j = cursor; j < cols.length; j++) {
        if (cols[j].id === t.id && !cols[j].exclusive) { at = j; break; }
      }
      if (at > -1) { cols[at].tell = t; cursor = at + 1; }
      else {
        cols.splice(cursor, 0, { id: t.id, ask: null, tell: t, exclusive: true });
        cursor++;
      }
    }
    return cols;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectAskingBenchCSS();
    document.body.classList.add('abn-wide');
    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.data = null;
    this.st = this.newState();
    this._timers = [];
    this._fetchEntitlement();
    this._fetchGrammar();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },
  reset: function () { if (this.data) this.st = this.clearAll(this.data); this.render(); },
  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    document.body.classList.remove('abn-wide');
  },
  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  _loadStore: function () {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY) || '{}') || {}; } catch (_) { s = {}; }
    return s;
  },
  _saveStore: function () { try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {} },

  /* the authored grammar for THIS locale — blending-board.js:186's shape */
  _fetchGrammar: function () {
    var self = this;
    fetch('/mini-tools/asking-bench-grammar-' + this.api.lang + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () {
        return fetch('/mini-tools/asking-bench-grammar-en.json', { cache: 'no-cache' })
          .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
      })
      .then(function (data) {
        if (!data) return;
        self.data = data;
        self.st = self.firstState(data);
        self.render();
      });
  },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      if (self._wrap) self.render();
    };
    if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        if (self._wrap) self.render();
      })
      .catch(trustCache);
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'abn-wrap');
    this._wrap = wrap;
    if (!this.data) {
      var l = api.el('div', 'abn-note');
      l.textContent = api.t('loading');
      wrap.appendChild(l);
      api.stage.appendChild(wrap);
      return;
    }
    wrap.appendChild(this._buildPickers());
    wrap.appendChild(this._buildClaims());
    wrap.appendChild(this._buildBench());
    wrap.appendChild(this._buildNote());
    wrap.appendChild(this._buildBar());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'abn-chip' + (on ? ' abn-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    b.setAttribute('aria-pressed', String(!!on));
    return b;
  },

  _buildPickers: function () {
    var api = this.api, self = this, d = this.data, st = this.st;
    var box = api.el('div', 'abn-pickers');
    var f = this.frame(d, st.frameId);

    var who = api.el('div', 'abn-picker');
    var wl = api.el('span', 'abn-plab'); wl.textContent = api.t('whoLabel');
    who.appendChild(wl);
    var sel = document.createElement('select');
    sel.className = 'abn-select';
    sel.setAttribute('aria-label', api.t('whoLabel'));
    (d.nouns || []).forEach(function (n) {
      var o = document.createElement('option');
      o.value = n.key; o.textContent = n.subjSg;
      if (n.key === st.nounKey) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { self.st = self.setNoun(d, self.st, sel.value); self.render(); });
    who.appendChild(sel);
    box.appendChild(who);

    var doing = api.el('div', 'abn-picker');
    var dl = api.el('span', 'abn-plab'); dl.textContent = api.t('doesLabel');
    doing.appendChild(dl);
    /* ⚠ every verb in the table, across every frame — because CHANGING THE
       VERB is the move the whole tool turns on, and hiding the ones that
       need a different frame would hide the lesson. Picking one switches
       to the frame that licenses it. */
    (d.verbs || []).forEach(function (v) {
      doing.appendChild(self._chip(v.finite, v.id === st.verbId, function () {
        var fr = (d.frames || []).filter(function (x) { return x.verbClasses.indexOf(v.class) > -1; })[0];
        var next = self.st;
        if (fr && fr.id !== next.frameId) next = self.setFrame(d, next, fr.id);
        next = self.setVerb(d, next, v.id);
        self.st = next;
        self.render();
      }, 'abn-verb'));
    });
    box.appendChild(doing);

    if (f && f.slots.indexOf('mainVerb') > -1 && (d.mains || []).length) {
      var mv = api.el('div', 'abn-picker');
      (d.mains || []).forEach(function (m) {
        mv.appendChild(self._chip(m.form, m.key === st.mainKey, function () {
          self.st = self.setMain(d, self.st, m.key); self.render();
        }, 'abn-small'));
      });
      box.appendChild(mv);
    }
    if (f && f.slots.indexOf('adj') > -1) {
      var aj = api.el('div', 'abn-picker');
      (d.adjs || []).forEach(function (a) {
        aj.appendChild(self._chip(a.form, a.key === st.adjKey, function () {
          var n2 = self._clone(self.st); n2.adjKey = a.key; n2.asked = false; self.st = n2; self.render();
        }, 'abn-small'));
      });
      box.appendChild(aj);
    }
    if (f && f.slots.indexOf('obj') > -1) {
      var ob = api.el('div', 'abn-picker');
      (d.objs || []).forEach(function (o) {
        ob.appendChild(self._chip(o.form, o.key === st.objKey, function () {
          var n3 = self._clone(self.st); n3.objKey = o.key; n3.asked = false; self.st = n3; self.render();
        }, 'abn-small'));
      });
      box.appendChild(ob);
    }
    if ((d.registers || []).length > 1) {
      var rg = api.el('div', 'abn-picker');
      d.registers.forEach(function (r) {
        rg.appendChild(self._chip(api.t(r.labelKey) || r.id, r.id === st.register, function () {
          self.st = self.setRegister(d, self.st, r.id); self.render();
        }, 'abn-small'));
      });
      box.appendChild(rg);
    }
    return box;
  },

  /* ⭐ ONE GRID, TWO ROWS. The telling and the asking share a column set,
     so a word that did not move is in the same column on both rows and
     lands at the same x. Nothing here computes a position. */
  _buildBench: function () {
    var api = this.api, d = this.data, st = this.st;
    var cols = this.columns(d, st);
    var box = api.el('div', 'abn-bench');
    var grid = api.el('div', 'abn-grid');
    grid.style.gridTemplateColumns = 'auto repeat(' + cols.length + ', auto)';

    var self = this, i;
    var tl = api.el('div', 'abn-rowlab'); tl.textContent = api.t('tellingLabel');
    tl.style.gridRow = '1'; tl.style.gridColumn = '1';
    grid.appendChild(tl);
    if (st.asked) {
      var al = api.el('div', 'abn-rowlab'); al.textContent = api.t('askingLabel');
      al.style.gridRow = '2'; al.style.gridColumn = '1';
      grid.appendChild(al);
    }
    /* row 1 — the telling */
    for (i = 0; i < cols.length; i++) {
      var c = cols[i];
      var cell = api.el('div', 'abn-cell abn-tellcell');
      cell.style.gridColumn = String(i + 2);
      cell.style.gridRow = '1';
      if (c.tell) {
        var card = api.el('span', 'abn-card');
        card.textContent = c.tell.text;
        card.setAttribute('data-id', c.tell.id);
        card.setAttribute('data-rail', 'tell');
        cell.appendChild(card);
      }
      grid.appendChild(cell);
    }
    /* the telling's end mark rides on the last filled telling cell */
    var tellEnd = api.el('div', 'abn-endmark');
    tellEnd.style.gridRow = '1';
    tellEnd.style.gridColumn = String(cols.length + 2);
    tellEnd.textContent = this.endMark(d, st, false);
    grid.appendChild(tellEnd);

    /* row 2 — the asking, only once it has been asked */
    if (st.asked) {
      var open = this.openMark(d, st, true);
      for (i = 0; i < cols.length; i++) {
        var c2 = cols[i];
        var cell2 = api.el('div', 'abn-cell abn-askcell');
        cell2.style.gridColumn = String(i + 2);
        cell2.style.gridRow = '2';
        if (c2.ask) {
          var card2 = api.el('span', 'abn-card abn-asked'
            + (c2.ask.arrived ? ' abn-arrived' : '')
            + (c2.ask.moved ? ' abn-moved' : '')
            + (c2.ask.was && !c2.ask.moved ? ' abn-reshaped' : ''));
          card2.textContent = (i === 0 && open ? open : '') + c2.ask.text;
          card2.setAttribute('data-id', c2.ask.id);
          card2.setAttribute('data-rail', 'ask');
          if (c2.ask.was && !c2.ask.moved) {
            var ghost = api.el('span', 'abn-ghost');
            ghost.textContent = c2.ask.was;
            card2.appendChild(ghost);
          }
          cell2.appendChild(card2);
        }
        grid.appendChild(cell2);
      }
      var askEnd = api.el('div', 'abn-endmark abn-askend');
      askEnd.style.gridRow = '2';
      askEnd.style.gridColumn = String(cols.length + 2);
      askEnd.textContent = this.endMark(d, st, true);
      grid.appendChild(askEnd);
    }

    box.appendChild(grid);
    /* the earlier askings, so the lesson is the DIFFERENCE between two */
    if (this.api.settings.stack && st.stack.length > 1) {
      var older = api.el('div', 'abn-stack');
      st.stack.slice(0, -1).forEach(function (e) {
        var line = api.el('div', 'abn-stackline');
        line.textContent = (e.open || '') + e.tokens.map(function (t) { return t.text; }).join(' ') + (e.end || '');
        older.appendChild(line);
      });
      box.appendChild(older);
    }
    return box;
  },

  /* ⚠ THE CLAIM ROW IS NEVER TOUCHED BY THE OUTCOME. It is rendered from
     st.claim alone; nothing here reads the recipe, the legend or `asked`.
     M-CLAIM-INDEPENDENCE proves the converse — that the OUTPUT never
     reads the claim — so the two are provably independent in both
     directions and the tool cannot grade. */
  _buildClaims: function () {
    var api = this.api, self = this, st = this.st;
    var box = api.el('div', 'abn-claims');
    var lab = api.el('span', 'abn-plab'); lab.textContent = api.t('claimLabel');
    box.appendChild(lab);
    this.CLAIMS.forEach(function (c) {
      box.appendChild(self._chip(api.t(self.CLAIM_LABEL[c]), st.claim.indexOf(c) > -1, function () {
        self.st = self.toggleClaim(self.st, c);
        self.render();
      }, 'abn-claim'));
    });
    return box;
  },

  _buildBar: function () {
    var api = this.api, self = this, d = this.data, st = this.st;
    var bar = api.el('div', 'abn-toolbar');
    if (st.asked) {
      bar.appendChild(this._chip(api.t('tellBtn'), false, function () {
        self.st = self.tellAgain(self.st); self.render();
      }));
    } else {
      bar.appendChild(this._chip(api.t('askBtn'), false, function () {
        self.st = self.ask(d, self.st, !!self.api.settings.stack); self.render();
      }, 'abn-ask'));
    }
    return bar;
  },

  /* the legend NAMES what is on screen; it never says whether anybody was
     right, and it is derived from the recipe, never authored twice */
  _buildNote: function () {
    var api = this.api, d = this.data, st = this.st;
    var note = api.el('div', 'abn-note');
    if (!st.asked) { note.textContent = api.t('tryAgain'); return note; }
    var self = this;
    var leg = api.el('div', 'abn-legend');
    this.legend(d, st).forEach(function (c) {
      var item = api.el('span', 'abn-leg');
      item.textContent = api.t(self.CLAIM_LABEL[c]);
      leg.appendChild(item);
    });
    note.appendChild(leg);
    return note;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'abn-foot');
    foot.appendChild(this._chip(api.t('clear'), false, function () { self.reset(); }));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'abn-locked');
    foot.appendChild(pr);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.abn-gate');
    if (old) old.remove();
    var g = api.el('div', 'abn-gate');
    var s = api.el('span'); s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-asking-bench';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectAskingBenchCSS() {
  if (document.getElementById('abn-style')) return;
  var st = document.createElement('style');
  st.id = 'abn-style';
  st.textContent = ''
    + '.abn-wrap{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;}'
    + '.abn-pickers,.abn-picker,.abn-claims,.abn-toolbar,.abn-foot{display:flex;flex-wrap:wrap;'
    +   'gap:8px;justify-content:center;align-items:center;}'
    + '.abn-pickers{flex-direction:column;gap:7px;}'
    + '.abn-plab{font:600 14px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;opacity:.85;}'
    + '.abn-chip{min-height:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background:#FFFDF8;color:#146B5E;font:600 15px/1.15 Nunito,system-ui,sans-serif;cursor:pointer;}'
    + '.abn-chip:hover{background:#F3EADA;}'
    + '.abn-chip:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.abn-on{background:#146B5E;color:#FFFDF8;}'
    + '.abn-small{min-height:44px;padding:8px 12px;font-size:14px;}'
    + '.abn-ask{background:#146B5E;color:#FFFDF8;}'
    + '.abn-locked{border-style:dashed;border-color:#F2784B;color:#F2784B;}'
    + '.abn-select{min-height:44px;padding:6px 10px;border-radius:12px;border:2px solid #146B5E;'
    +   'background:#FFFDF8;color:#146B5E;font:600 15px/1.15 Nunito,system-ui,sans-serif;}'
    /* ⭐ THE BENCH — ONE GRID, TWO ROWS, SHARED COLUMNS. A word that did
       not move is in the same column on both rows, so it lands at the
       same x and the alignment is the layout's own answer. */
    + '.abn-bench{width:100%;display:flex;flex-direction:column;align-items:center;gap:4px;}'
    + '.abn-grid{display:grid;align-items:center;justify-content:center;gap:4px 6px;'
    +   'padding:10px 12px;background:#FFFDF8;border:2px solid #E0D5C0;border-radius:10px;'
    +   'box-shadow:0 2px 0 #E0D5C0;max-width:100%;}'
    + '.abn-rowlab{font:600 13px/1.2 Nunito,system-ui,sans-serif;color:#8A7E6B;'
    +   'padding-right:8px;white-space:nowrap;}'
    /* ⚠ flex-START, not centre. Sharing a grid column aligns the CELLS,
       but a centred card floats to the middle of it — and "runs" is wider
       than "run", so the two left edges drifted 2-5px apart and the whole
       alignment claim with them. Words in a sentence line up on their
       left edges anyway; centring them was both wrong and prettier. */
    + '.abn-cell{display:flex;align-items:center;justify-content:flex-start;min-height:46px;}'
    + '.abn-card{display:inline-block;padding:7px 11px;border-radius:10px;background:#F3EADA;'
    +   'color:#2F2A22;font:600 clamp(15px,2.6vmin,21px)/1.25 Nunito,system-ui,sans-serif;'
    +   'white-space:nowrap;position:relative;'
    +   'transition:transform .38s cubic-bezier(.4,0,.2,1),background .3s;}'
    + '.abn-asked{background:#E6EFEA;}'
    + '.abn-arrived{background:#F2C879;box-shadow:0 0 0 2px rgba(90,83,72,.2);}'
    + '.abn-moved{box-shadow:0 0 0 3px #146B5E;}'
    + '.abn-reshaped{background:#E7DFF2;}'
    /* the old face, ghosted under the new one — the change made visible */
    + '.abn-ghost{display:block;font-size:.72em;opacity:.5;text-decoration:line-through;'
    +   'font-weight:600;line-height:1.1;}'
    + '.abn-endmark{display:flex;align-items:center;font:700 clamp(15px,2.6vmin,21px)/1.25 '
    +   'Nunito,system-ui,sans-serif;color:#5A5348;}'
    + '.abn-askend{color:#146B5E;}'
    + '.abn-stack{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:4px;}'
    + '.abn-stackline{font:600 14px/1.35 Nunito,system-ui,sans-serif;color:#A2988A;}'
    + '.abn-claims{max-width:640px;}'
    + '.abn-claim{font-size:14px;padding:8px 12px;}'
    + '.abn-note{min-height:22px;text-align:center;'
    +   'font:600 14px/1.35 Nunito,system-ui,sans-serif;color:#5A5348;}'
    + '.abn-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}'
    /* ⚠ NO pseudo-element glyph here. The first attempt wrote a CSS
       content escape through a helper script, which over-escaped it into
       a literal backslash pair and put "92?a0A new word comes in" on the
       board. The legend is already distinct from the claim chips — plain
       text, under the bench, no pill — and a decorative arrow is not
       worth an escaping layer between me and the stylesheet. */
    + '.abn-leg{padding:2px 4px 3px;color:#5A5348;'
    +   'font:600 14px/1.3 Nunito,system-ui,sans-serif;border-bottom:2px solid #CFE0D8;}'
    + '.abn-gate{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;'
    +   'margin:6px 0;padding:8px 12px;border-radius:12px;background:#FDF1E7;'
    +   'font:600 14px/1.3 Nunito,system-ui,sans-serif;color:#8A4B2A;}'
    + '.abn-gate a{color:#F2784B;font-weight:700;}'
    /* ⚠ reduced motion COMPRESSES the travel; it never skips it. The move
       IS the content here, exactly as the fold is in the folding sheet. */
    + '@media (prefers-reduced-motion:reduce){.abn-card{transition-duration:.12s;}}'
    + 'body.abn-wide .lcs-header{flex-direction:column;}'
    + '@media (max-width:700px){body.abn-wide{overflow-y:auto;overflow-x:hidden;'
    +   'height:auto;min-height:100%;}}'
    /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
       The apparatus is a sentence laid out on a grid, so the WORD CARDS are
       the instrument: `clamp(15px, 2.6vmin, 21px)` computes 37px at 1440 and
       clamps back to 21, which is why the bench read small on a projector.
       Type, cell height and the row labels move together; the claims panel is
       prose and gets a measured, not a maximal, widening.
       ⚠ `.abn-cell` is flex-START by design (the file records why: a centred
       card floats and the left edges drift) — the tiers touch its HEIGHT
       only, never its justification. */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.abn-wide .abn-card{font-size:clamp(15px,2.6vmin,29px);padding:9px 14px;}'
    +   'body.abn-wide .abn-cell{min-height:56px;}'
    +   'body.abn-wide .abn-rowlab{font-size:17px;}'
    +   'body.abn-wide .abn-claims{max-width:820px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.abn-wide .abn-card{font-size:clamp(15px,2.6vmin,37px);padding:11px 17px;}'
    +   'body.abn-wide .abn-cell{min-height:66px;}'
    +   'body.abn-wide .abn-rowlab{font-size:19px;}'
    +   'body.abn-wide .abn-claims{max-width:980px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.abn-wide .abn-card{font-size:clamp(15px,2.6vmin,43px);padding:12px 19px;}'
    +   'body.abn-wide .abn-cell{min-height:74px;}'
    +   'body.abn-wide .abn-rowlab{font-size:21px;}'
    +   'body.abn-wide .abn-claims{max-width:1080px;}'
    + '}'
    + '@media print{.abn-pickers,.abn-claims,.abn-toolbar,.abn-foot,.abn-gate{display:none!important;}'
    +   '.abn-grid{border-color:#333;}}';
  document.head.appendChild(st);
}

if (typeof module !== 'undefined' && module.exports) module.exports = AskingBench;
