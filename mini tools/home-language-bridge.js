/* =====================================================================
   TOOL #29 — SAY IT BOARD   (home-language-bridge.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). The Many-Languages Classroom. Premium Tools v2, build #3.

   The child who cannot yet say anything taps a picture, and the room
   hears it in the classroom language. Twelve things a five-year-old
   needs on their first day, in their own voice.

   THE ONE THESIS — A CHILD WHO CANNOT SPEAK THE ROOM'S LANGUAGE IS NOT
   SILENT BY CHOICE. Give them a way to be heard on day one and the rest
   of the year is different. This is not vocabulary teaching and it is
   not assessment: it is a voice.

   ⚠ WHY IT IS ICON-FIRST, AND WHY THAT MATTERS MORE THAN IT SOUNDS.
   This began as a two-language word list. It was cut, for two reasons
   found in the codebase rather than guessed:
     1. `picture-word-wall.js` already has `compose(loc, card, plural)`
        — LOCALE IS ALREADY AN ARGUMENT, every call site just passes
        `api.lang` — and it already ships "Our words", a pinned wall
        whose own placeholder reads "Name this wall (e.g. Week 12 — On
        the farm)". A bilingual word list is therefore ~80 lines INSIDE
        that tool, not a second tool. Shipping it here would have sold a
        teacher the same object twice.
     2. `lcs-shell.js:22` fixes the platform at eleven Latin-script
        European locales. The child who actually arrives mid-year in a
        German, Swedish or Dutch classroom speaks Ukrainian, Arabic,
        Turkish, Somali or Romanian — none of which we have. A tool
        built on a home-language WORD would have served the
        international-school child while wearing the newcomer's name.
   An ICON is understood by every child in every language. So the board
   is pictures first; the classroom-language line is support for the
   adult; and the home-language line appears only when that language
   happens to be one of ours — a bonus, never the premise. That single
   decision is what lets this tool honestly serve the child it names.

   HOW IT WORKS: the child taps a picture. The device speaks the phrase
   in the CLASSROOM language — the language the room needs to hear —
   at a calm rate. Nothing is recorded, nothing is counted, nothing is
   sent anywhere.

   PRECEDENT, and the doctrine that comes with it: `feelings-check-in.js`
   :616 already does tap-a-chip → `_speak(api.t(key))` in eleven locales,
   and its help menu is deliberately free with the comment "the
   supportive half is never sold". This board is the same kind of care
   surface, so the WHOLE BOARD IS FREE, forever. Premium is the
   teacher's side only: the printable card and their own added phrases.

   ⚠ THE AUTHORING IS THE MOAT, and it is real. Every per-locale phrase
   in this codebase is in the wrong grammatical person — routine labels,
   adult offers, system announcements, all spoken BY an adult TO a child.
   `our-day.js` has a `bathroom` label ("Toilettid", "le passage aux
   toilettes"); that is a timetable entry, not a request. This is the
   first surface in the product where the CHILD is the speaker, in the
   first person, to an adult — which flips register in all eleven at
   once: politeness formulas, the child-to-teacher register, and whether
   the toilet request is euphemised (it is, differently, in every one).
   Those twelve utterances exist nowhere in the repo and were authored
   here; the native ensembles own them next.

   ⚠ NEVER SPEAK A LANGUAGE THE DEVICE HAS NO VOICE FOR. `LCSAudio` sets
   `u.lang` and hopes; a missing voice is silently substituted, so a
   Finnish line gets German phonology. `hasVoice(lang, voices)` is
   generalised from `our-day.js:439` / `choral-counting.js:316` (both of
   which are single-language and cannot serve two). A language without a
   voice is SHOWN and not spoken — worse than silence is a wrong model.

   FENCES:
     Picture Word Wall  a vocabulary WALL: browse a theme, tap a card,
     (#12)              hear the noun with its article. This board has
                        no themes, no nouns, no articles, no index —
                        the gate asserts it never fetches pww-index at
                        all, so it cannot drift into being that tool.
     Feelings Check-In  owns how a child FEELS and its own day-slot.
     (#24)              This owns what a child NEEDS. Same mechanism,
                        different question; no shared state.
     Our Day (#20)      owns the timetable. A schedule label is not a
                        request.

   REFUSES, FOREVER: no assessment of the newcomer — no level, no score,
   no progress, no "words learned" (every product in this space does it
   and it is the harmful part) · nothing about a child is stored or sent
   · NO FLAGS: a flag is a country, not a language, and Spanish is not
   Spain to a Mexican child — languages are named endonymically · the
   home language is never smaller, greyed or bracketed · no timers.
   ===================================================================== */
var HomeLanguageBridge = {
  id: 'home-language-bridge',

  /* ⚠ CURATION: en authored here; the other ten are builder drafts and are
     corrected in place by scripts/apply-home-language-bridge-fanout.js from
     the per-locale native 3-agent ensembles (§A.13.48). These are FIRST-
     PERSON CHILD utterances — the register is the whole job, and no
     existing string in the repo can be reused for them.
     ONE PHYSICAL LINE PER KEY. sv/da/no/fi carry [NSR-FLAG]. */
  strings: {
    title:        {en:'Say It Board',de:'Sag-es-Tafel',fr:'Le tableau pour se faire comprendre',it:'La tavola per farsi capire',es:'El tablero para decirlo',pt:'Meu quadro para falar',nl:'Het zegbord',sv:'Säg-det-tavlan',da:'Sig-det-tavlen',no:'Si-det-tavla',fi:'Sanomistaulu'},
    instruction:  {en:'Tap a picture — the class hears it out loud, in the language of the room.',de:'Tippe ein Bild an — die Klasse hört es laut, in der Sprache des Klassenzimmers.',fr:'Touche une image — la classe l’entend à voix haute, dans la langue de la classe.',it:'Tocca un’immagine — la classe la sente ad alta voce, nella lingua dell’aula.',es:'Toca una imagen — la clase lo oye en voz alta, en el idioma del aula.',pt:'Toque numa imagem — a turma ouve em voz alta, na língua da sala.',nl:'Tik op een plaatje — de klas hoort het hardop, in de taal van het lokaal.',sv:'Tryck på en bild — klassen hör det högt, på klassrummets språk.',da:'Tryk på et billede — klassen hører det højt, på klassens sprog.',no:'Trykk på et bilde — klassen hører det høyt, på klasserommets språk.',fi:'Napauta kuvaa — luokka kuulee sen ääneen, luokan kielellä.'},
    addHome:      {en:'Add the child’s language',de:'Sprache des Kindes hinzufügen',fr:'Ajouter la langue de l’enfant',it:'Aggiungi la lingua del bambino',es:'Añadir el idioma del niño',pt:'Adicionar a língua da criança',nl:'De taal van het kind toevoegen',sv:'Lägg till barnets språk',da:'Tilføj barnets sprog',no:'Legg til barnets språk',fi:'Lisää lapsen kieli'},
    homeHint:     {en:'Only if it is one of ours — the pictures work whatever the child speaks.',de:'Nur wenn sie dabei ist — die Bilder funktionieren in jeder Sprache.',fr:'Seulement si elle est dans la liste — les images marchent quelle que soit la langue.',it:'Solo se è tra queste — le immagini funzionano qualunque lingua parli.',es:'Solo si está en la lista — las imágenes funcionan hable el idioma que hable.',pt:'Só se estiver na lista — as imagens funcionam seja qual for a língua.',nl:'Alleen als die erbij staat — de plaatjes werken bij elke taal.',sv:'Bara om det finns med — bilderna fungerar oavsett språk.',da:'Kun hvis det er på listen — billederne virker uanset sprog.',no:'Bare hvis det er på lista — bildene virker uansett språk.',fi:'Vain jos se on listalla — kuvat toimivat kielestä riippumatta.'},
    noHome:       {en:'Pictures only',de:'Nur Bilder',fr:'Images seules',it:'Solo immagini',es:'Solo imágenes',pt:'Só imagens',nl:'Alleen plaatjes',sv:'Bara bilder',da:'Kun billeder',no:'Bare bilder',fi:'Vain kuvat'},
    changeLang:   {en:'Change language',de:'Sprache wechseln',fr:'Changer de langue',it:'Cambia lingua',es:'Cambiar idioma',pt:'Mudar de língua',nl:'Taal wijzigen',sv:'Byt språk',da:'Skift sprog',no:'Bytt språk',fi:'Vaihda kieltä'},
    speakAria:    {en:'Say this out loud',de:'Das laut sagen',fr:'Dire ceci à voix haute',it:'Di’ questo ad alta voce',es:'Decir esto en voz alta',pt:'Dizer isso em voz alta',nl:'Dit hardop zeggen',sv:'Säg det här högt',da:'Sig det her højt',no:'Si dette høyt',fi:'Sano tämä ääneen'},
    noVoice:      {en:'This device has no voice for that language — the words are shown, not spoken.',de:'Dieses Gerät hat keine Stimme für diese Sprache — die Wörter werden gezeigt, nicht gesprochen.',fr:'Cet appareil n’a pas de voix pour cette langue — les mots sont affichés, pas prononcés.',it:'Questo dispositivo non ha una voce per quella lingua — le parole sono mostrate, non pronunciate.',es:'Este dispositivo no tiene voz para ese idioma — las palabras se muestran, no se dicen.',pt:'Este aparelho não tem voz para essa língua — as palavras aparecem, não são faladas.',nl:'Dit apparaat heeft geen stem voor die taal — de woorden worden getoond, niet uitgesproken.',sv:'Den här enheten har ingen röst för det språket — orden visas men sägs inte.',da:'Denne enhed har ingen stemme til det sprog — ordene vises, men siges ikke.',no:'Denne enheten har ingen stemme for det språket — ordene vises, men sies ikke.',fi:'Tässä laitteessa ei ole ääntä sille kielelle — sanat näytetään, mutta niitä ei sanota.'},
    privacyLine:  {en:'Nothing here is saved, counted or sent anywhere.',de:'Hier wird nichts gespeichert, gezählt oder irgendwohin gesendet.',fr:'Rien ici n’est enregistré, compté ni envoyé où que ce soit.',it:'Qui non si salva, non si conta e non si invia nulla.',es:'Aquí no se guarda, no se cuenta ni se envía nada.',pt:'Aqui nada é guardado, contado nem enviado para lugar nenhum.',nl:'Hier wordt niets bewaard, geteld of ergens naartoe gestuurd.',sv:'Ingenting här sparas, räknas eller skickas någonstans.',da:'Intet her bliver gemt, talt eller sendt nogen steder hen.',no:'Ingenting her blir lagret, talt eller sendt noe sted.',fi:'Täällä ei tallenneta, lasketa eikä lähetetä mitään.'},
    printBtn:     {en:'Print a card',de:'Karte drucken',fr:'Imprimer une carte',it:'Stampa una scheda',es:'Imprimir una tarjeta',pt:'Imprimir um cartão',nl:'Een kaart afdrukken',sv:'Skriv ut ett kort',da:'Udskriv et kort',no:'Skriv ut et kort',fi:'Tulosta kortti'},
    printHead:    {en:'I can say',de:'Das kann ich sagen',fr:'Je peux dire',it:'Posso dire',es:'Puedo decir',pt:'Eu posso dizer',nl:'Dit kan ik zeggen',sv:'Det här kan jag säga',da:'Det her kan jeg sige',no:'Dette kan jeg si',fi:'Näin voin sanoa'},
    setVoice:     {en:'Say it aloud',de:'Laut vorlesen',fr:'Dire à voix haute',it:'Leggi ad alta voce',es:'Decirlo en voz alta',pt:'Dizer em voz alta',nl:'Hardop zeggen',sv:'Säg det högt',da:'Sig det højt',no:'Si det høyt',fi:'Sano ääneen'},
    gatePrint:    {en:'Printing is part of the Teacher plan.',de:'Das Drucken gehört zum Lehrer-Paket.',fr:'L’impression fait partie de l’offre Enseignant.',it:'La stampa fa parte del piano Insegnante.',es:'La impresión es parte del plan Docente.',pt:'A impressão faz parte do plano Professor.',nl:'Afdrukken hoort bij het Leerkracht-pakket.',sv:'Utskrift ingår i Lärarpaketet.',da:'Udskrivning er en del af Lærerpakken.',no:'Utskrift er en del av Lærerpakken.',fi:'Tulostus kuuluu Opettaja-tilaukseen.'},
    unlock:       {en:'See the Teacher plan',de:'Lehrer-Paket ansehen',fr:'Voir l’offre Enseignant',it:'Vedi il piano Insegnante',es:'Ver el plan Docente',pt:'Ver o plano Professor',nl:'Bekijk het Leerkracht-pakket',sv:'Se Lärarpaketet',da:'Se Lærerpakken',no:'Se Lærerpakken',fi:'Katso Opettaja-tilaus'}
  },

  /* ⚠ ENDONYMS — a language is named in ITSELF, never by a flag. A flag is
     a country: Spanish is not Spain to a Mexican child, German is not
     Germany to an Austrian one. The gate bans regional-indicator
     codepoints anywhere in this file. */
  ENDONYM: {
    en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano', es: 'Español',
    pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi'
  },

  /* ⚠ FIRST-PERSON CHILD UTTERANCES. Not labels, not offers — the child
     speaking to an adult. Twelve, because a board a child cannot scan in
     one look is a board they will not use under pressure.
     `icon` names a drawing in ICONS; the picture is the primary channel
     and carries the meaning for a child whose language we do not have. */
  PHRASES: [
    { id: 'help',   icon: 'hand',   t: {en:'I need help',de:'Ich brauche Hilfe',fr:'J’ai besoin d’aide',it:'Ho bisogno di aiuto',es:'Necesito ayuda',pt:'Preciso de ajuda',nl:'Ik heb hulp nodig',sv:'Jag behöver hjälp',da:'Jeg har brug for hjælp',no:'Jeg trenger hjelp',fi:'Tarvitsen apua'} },
    { id: 'nounder',icon: 'quest',  t: {en:'I don’t understand',de:'Ich verstehe das nicht',fr:'Je ne comprends pas',it:'Non capisco',es:'No entiendo',pt:'Não entendi',nl:'Ik snap het niet',sv:'Jag förstår inte',da:'Jeg forstår det ikke',no:'Jeg forstår ikke',fi:'En ymmärrä'} },
    { id: 'again',  icon: 'again',  t: {en:'Please say that again',de:'Bitte sag das noch einmal',fr:'Peux-tu répéter, s’il te plaît ?',it:'Puoi ripetere, per favore?',es:'¿Puedes repetirlo, por favor?',pt:'Você pode repetir, por favor?',nl:'Kun je dat nog eens zeggen?',sv:'Kan du säga det igen?',da:'Kan du sige det igen?',no:'Kan du si det en gang til?',fi:'Voitko sanoa sen uudelleen?'} },
    { id: 'toilet', icon: 'door',   t: {en:'I need the toilet',de:'Ich muss auf die Toilette',fr:'Je dois aller aux toilettes',it:'Devo andare in bagno',es:'Necesito ir al baño',pt:'Preciso ir ao banheiro',nl:'Ik moet naar de wc',sv:'Jag behöver gå på toaletten',da:'Jeg skal på toilettet',no:'Jeg må på toalettet',fi:'Minun pitää päästä vessaan'} },
    { id: 'water',  icon: 'cup',    t: {en:'May I have some water?',de:'Darf ich etwas Wasser haben?',fr:'Est-ce que je peux avoir de l’eau ?',it:'Posso avere un po’ d’acqua?',es:'¿Me das un poco de agua?',pt:'Posso tomar um pouco de água?',nl:'Mag ik wat water?',sv:'Kan jag få lite vatten?',da:'Må jeg få noget vand?',no:'Kan jeg få litt vann?',fi:'Saanko vähän vettä?'} },
    { id: 'unwell', icon: 'unwell', t: {en:'I don’t feel well',de:'Mir geht es nicht gut',fr:'Je ne me sens pas bien',it:'Non mi sento bene',es:'No me siento bien',pt:'Não estou me sentindo bem',nl:'Ik voel me niet lekker',sv:'Jag mår inte bra',da:'Jeg har det ikke godt',no:'Jeg føler meg ikke bra',fi:'Minulla on paha olo'} },
    { id: 'done',   icon: 'done',   t: {en:'I have finished',de:'Ich bin fertig',fr:'J’ai fini',it:'Ho finito',es:'Ya terminé',pt:'Já terminei',nl:'Ik ben klaar',sv:'Jag är klar',da:'Jeg er færdig',no:'Jeg er ferdig',fi:'Olen valmis'} },
    { id: 'myturn', icon: 'turn',   t: {en:'It’s my turn',de:'Ich bin dran',fr:'C’est mon tour',it:'Tocca a me',es:'Me toca a mí',pt:'É a minha vez',nl:'Ik ben aan de beurt',sv:'Det är min tur',da:'Det er min tur',no:'Det er min tur',fi:'Nyt on minun vuoroni'} },
    { id: 'where',  icon: 'where',  t: {en:'Where should I go?',de:'Wo soll ich hingehen?',fr:'Où est-ce que je dois aller ?',it:'Dove devo andare?',es:'¿Adónde tengo que ir?',pt:'Onde eu devo ir?',nl:'Waar moet ik heen?',sv:'Vart ska jag gå?',da:'Hvor skal jeg hen?',no:'Hvor skal jeg gå?',fi:'Minne minun pitää mennä?'} },
    { id: 'break',  icon: 'rest',   t: {en:'I need a little break',de:'Ich brauche eine kleine Pause',fr:'J’ai besoin d’une petite pause',it:'Ho bisogno di una piccola pausa',es:'Necesito un descansito',pt:'Preciso de uma pausinha',nl:'Ik heb een kleine pauze nodig',sv:'Jag behöver en liten paus',da:'Jeg har brug for en lille pause',no:'Jeg trenger en liten pause',fi:'Tarvitsen pienen tauon'} },
    { id: 'friend', icon: 'friend', t: {en:'Can I play too?',de:'Darf ich mitspielen?',fr:'Est-ce que je peux jouer aussi ?',it:'Posso giocare anch’io?',es:'¿Puedo jugar yo también?',pt:'Posso brincar também?',nl:'Mag ik ook meedoen?',sv:'Får jag vara med?',da:'Må jeg være med?',no:'Kan jeg være med?',fi:'Saanko minäkin leikkiä?'} },
    { id: 'thanks', icon: 'heart',  t: {en:'Thank you',de:'Danke',fr:'Merci',it:'Grazie',es:'Gracias',pt:'Obrigado',nl:'Dank je wel',sv:'Tack',da:'Tak',no:'Takk',fi:'Kiitos'} }
  ],

  /* Plain geometric line drawings, drawn here so the board has no image
     dependency and works offline. Deliberately simple placeholders in the
     Direction A palette — the character-art pipeline can replace them
     without touching a line of logic. */
  ICONS: {
    hand:   'M13 26V11a2.5 2.5 0 0 1 5 0v8m0-2a2.5 2.5 0 0 1 5 0v2m0-1a2.5 2.5 0 0 1 5 0v3m0-1a2.5 2.5 0 0 1 5 0v8c0 5-4 9-9 9h-3c-5 0-8-3-9-7l-2-6a2.5 2.5 0 0 1 4-3l3 3',
    quest:  'M14 15a8 8 0 1 1 10 8v4m0 6v1',
    again:  'M30 12v8h-8M8 28v-8h8M9 18a11 11 0 0 1 19-5M31 22a11 11 0 0 1-19 5',
    door:   'M12 6h16v28H12zM24 20h.1',
    cup:    'M11 12h18l-2 20a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3zM29 16h3a3 3 0 0 1 0 8h-2',
    unwell: 'M20 5a15 15 0 1 0 0 30 15 15 0 0 0 0-30zM14 17h.1M26 17h.1M14 27c3-3 9-3 12 0',
    /* ⚠ NOT a tick. A ✓ is a verdict mark, and this board refuses verdicts
       — a teacher glancing at a card would read "correct", which is the
       one thing it must never say. A finished page instead. */
    done:   'M11 5h13l6 6v24H11zM24 5v6h6M16 21h9M16 27h9',
    /* ⚠ NOT a circular arrow. `again` is already one, and at card size the
       two were indistinguishable — the child could not tell "say it again"
       from "my turn". An arrow pointing AT a person says whose turn. */
    turn:   'M27 15a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM15 34c0-5 3.5-8.5 7.5-8.5S30 29 30 34M4 24h8m-3.5-3.5L12 24l-3.5 3.5',
    where:  'M20 5c-6 0-10 4-10 10 0 7 10 20 10 20s10-13 10-20c0-6-4-10-10-10zm0 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    rest:   'M6 26h28M9 26V16a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v10M6 26v6M34 26v6',
    /* two whole children, side by side — the previous glyph read as one
       person with a smudge beside the head at card size */
    friend: 'M16 15a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM4 33c0-4.5 3-7.5 7.5-7.5S19 28.5 19 33M33 15a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM21 33c0-4.5 3-7.5 7.5-7.5S36 28.5 36 33',
    heart:  'M20 33S7 25 7 16a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 9-13 17-13 17z'
  },

  STORE_KEY: 'lcs:home-language-bridge:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { voice: true },
  settings: [{ key: 'voice', type: 'toggle', labelKey: 'setVoice' }],

  premium: false,

  /* =================================================================
     PURE ENGINE — no DOM, no storage, no api.
     ================================================================= */
  LOCALES: ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'],

  endonymFor: function (loc) { return this.ENDONYM[loc] || loc; },

  /* home may be null — the board works on pictures alone, which is the
     whole point: it must serve a child whose language we do not have. */
  cardFor: function (id, classroom, home) {
    for (var i = 0; i < this.PHRASES.length; i++) {
      var p = this.PHRASES[i];
      if (p.id !== id) continue;
      return {
        id: id,
        icon: p.icon,
        classroom: p.t[classroom] || p.t.en,
        home: (home && p.t[home]) ? p.t[home] : null
      };
    }
    return null;
  },

  boardFor: function (classroom, home) {
    var out = [];
    for (var i = 0; i < this.PHRASES.length; i++) {
      var c = this.cardFor(this.PHRASES[i].id, classroom, home);
      if (c) out.push(c);
    }
    return out;
  },

  /* ⚠ Generalised from our-day.js:439 / choral-counting.js:316, both of
     which cache a SINGLE boolean for the page locale and so cannot serve
     two languages. Permissive when the device reports no voices at all
     (they load asynchronously). */
  hasVoice: function (lang, voices) {
    if (!voices || !voices.length) return true;
    var want = ({ no: 'nb', pt: 'pt' }[lang] || lang).toLowerCase();
    for (var i = 0; i < voices.length; i++) {
      if (String(voices[i].lang || '').toLowerCase().indexOf(want) === 0) return true;
    }
    if (lang === 'no') {
      for (var j = 0; j < voices.length; j++) if (String(voices[j].lang || '').toLowerCase().indexOf('no') === 0) return true;
    }
    return false;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectSayItBoardCSS();
    document.body.classList.add('hlb-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.classroom = api.lang;
    this.home = this._store.home || null;   /* optional, always */
    this.picking = false;
    this._timers = [];

    this._fetchEntitlement();
    this.render();
  },

  destroy: function () { this._clearTimers(); },
  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },

  _saveStore: function () {
    var s = this._store || {};
    s.v = 1;
    s.home = this.home;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
    this._store = s;
  },

  _fetchEntitlement: function () {
    var self = this;
    var tok = null;
    try { tok = localStorage.getItem('accessToken'); } catch (_) {}
    if (!tok) return;
    try {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + tok } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var tier = d && d.user && d.user.subscriptionTier;
          var sub = d && d.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._saveStore();
          if (self._wrap) self.render();
        })
        .catch(function () {});
    } catch (_) {}
  },

  _voices: function () {
    try { return (window.speechSynthesis && window.speechSynthesis.getVoices()) || []; }
    catch (_) { return []; }
  },

  _canSpeak: function (lang) { return this.hasVoice(lang, this._voices()); },

  /* the room must hear the CLASSROOM language — that is the point */
  _say: function (text, lang) {
    if (!this.api.settings.voice || !text) return;
    if (!this._canSpeak(lang)) return;
    try { LCSAudio.speak({ type: 'word', text: String(text), lang: lang, rate: 0.9 }); } catch (_) {}
  },

  _setHome: function (loc) {
    this.home = loc;
    this.picking = false;
    this._saveStore();
    this.render();
  },

  reset: function () { this.picking = false; this.render(); },
  onSettings: function () { this._saveStore(); if (this._wrap) this.render(); },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hlb-wrap');
    this._wrap = wrap;

    wrap.appendChild(this._buildLangBar());
    if (this.picking) wrap.appendChild(this._buildChooser());
    wrap.appendChild(this._buildBoard());
    wrap.appendChild(this._buildFoot());
    if (this.premium) wrap.appendChild(this._buildPrintSheet());

    api.stage.appendChild(wrap);
  },

  _buildLangBar: function () {
    var self = this, api = this.api;
    var bar = api.el('div', 'hlb-langbar');

    var heard = api.el('div', 'hlb-heard');
    heard.textContent = this.endonymFor(this.classroom);
    heard.setAttribute('lang', this.classroom);
    bar.appendChild(heard);

    var btn = api.el('button', 'hlb-chip'); btn.type = 'button';
    if (this.home) {
      btn.textContent = this.endonymFor(this.home) + ' · ' + api.t('changeLang');
      btn.setAttribute('lang', this.home);
    } else {
      btn.textContent = api.t('addHome');
    }
    btn.addEventListener('click', function () { self.picking = !self.picking; self.render(); });
    bar.appendChild(btn);
    return bar;
  },

  _buildChooser: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'hlb-chooser');
    var hint = api.el('div', 'hlb-hint');
    hint.textContent = api.t('homeHint');
    box.appendChild(hint);

    var grid = api.el('div', 'hlb-langgrid');
    var none = api.el('button', 'hlb-langbtn' + (this.home ? '' : ' active')); none.type = 'button';
    none.textContent = api.t('noHome');
    none.addEventListener('click', function () { self._setHome(null); });
    grid.appendChild(none);

    for (var i = 0; i < this.LOCALES.length; i++) {
      (function (loc) {
        if (loc === self.classroom) return;
        var b = api.el('button', 'hlb-langbtn' + (self.home === loc ? ' active' : '')); b.type = 'button';
        /* ⚠ the language is named in ITSELF — never a flag, never a code */
        b.textContent = self.endonymFor(loc);
        b.setAttribute('lang', loc);
        b.addEventListener('click', function () { self._setHome(loc); });
        grid.appendChild(b);
      }(this.LOCALES[i]));
    }
    box.appendChild(grid);
    return box;
  },

  _buildBoard: function () {
    var self = this, api = this.api;
    var board = api.el('div', 'hlb-board');
    var cards = this.boardFor(this.classroom, this.home);
    for (var i = 0; i < cards.length; i++) {
      (function (c) {
        var b = api.el('button', 'hlb-card'); b.type = 'button';
        b.appendChild(self._icon(c.icon));

        /* the picture is the primary channel; the words support the adult */
        if (c.home) {
          var h = api.el('span', 'hlb-text'); h.textContent = c.home; h.setAttribute('lang', self.home);
          b.appendChild(h);
        }
        var t = api.el('span', 'hlb-text'); t.textContent = c.classroom; t.setAttribute('lang', self.classroom);
        b.appendChild(t);

        b.setAttribute('aria-label', c.classroom + ' — ' + api.t('speakAria'));
        b.addEventListener('click', function () { self._say(c.classroom, self.classroom); });
        board.appendChild(b);
      }(cards[i]));
    }
    return board;
  },

  _icon: function (name) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hlb-icon');
    svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', this.ICONS[name] || this.ICONS.hand);
    p.setAttribute('class', 'hlb-ipath');
    svg.appendChild(p);
    return svg;
  },

  _buildFoot: function () {
    var self = this, api = this.api;
    var foot = api.el('div', 'hlb-foot');

    if (!this._canSpeak(this.classroom)) {
      var n = api.el('div', 'hlb-voicenote'); n.textContent = api.t('noVoice');
      foot.appendChild(n);
    }
    var pr = api.el('button', 'hlb-chip' + (this.premium ? '' : ' hlb-locked')); pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    });
    foot.appendChild(pr);

    var pv = api.el('div', 'hlb-privacy'); pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _buildPrintSheet: function () {
    var api = this.api;
    var sheet = api.el('div', 'hlb-printsheet');
    var h = api.el('div', 'hlb-printhead');
    h.textContent = api.t('printHead');
    sheet.appendChild(h);
    var cards = this.boardFor(this.classroom, this.home);
    for (var i = 0; i < cards.length; i++) {
      var r = api.el('div', 'hlb-printrow');
      if (cards[i].home) {
        var a = api.el('span', 'hlb-printcell'); a.textContent = cards[i].home; a.setAttribute('lang', this.home);
        r.appendChild(a);
      }
      var b = api.el('span', 'hlb-printcell'); b.textContent = cards[i].classroom; b.setAttribute('lang', this.classroom);
      r.appendChild(b);
      sheet.appendChild(r);
    }
    return sheet;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host) return;
    var old = this._wrap.querySelector('.hlb-gate');
    if (old) old.remove();
    var g = api.el('div', 'hlb-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-home-language-bridge';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectSayItBoardCSS() {
  if (document.getElementById('hlb-style')) return;
  var st = document.createElement('style');
  st.id = 'hlb-style';
  st.textContent = ''
    + '.hlb-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'

    + '.hlb-langbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.hlb-heard{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;color:#146B5E;}'
    + '.hlb-chip{min-height:44px;padding:8px 15px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#3C7C72;font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;}'
    + '.hlb-chip:hover{background:#F3EADA;}'

    + '.hlb-chooser{display:flex;flex-direction:column;align-items:center;gap:10px;width:min(100%,720px);'
    +   'padding:14px;border-radius:16px;background:#FFFDF7;border:2px solid rgba(20,107,94,.18);}'
    + '.hlb-hint{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#3C7C72;text-align:center;max-width:52ch;}'
    + '.hlb-langgrid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
    + '.hlb-langbtn{min-height:44px;padding:9px 15px;border-radius:12px;border:2px solid rgba(20,107,94,.3);'
    +   'background:#FBF3E4;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:16px;cursor:pointer;}'
    + '.hlb-langbtn.active{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'

    /* THE BOARD — the picture is the primary channel, so it is big. Read
       across a room and tapped by a child under pressure. */
    /* ⚠ NOT vw. The shell caps .lcs-app at 720px, so a viewport unit keeps
       growing after the container has stopped — at 1024 a 20vw minimum
       bought THREE columns where 768 got four, i.e. the board grew taller
       on the wider screen. Size the column from the container. */
    + '.hlb-board{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));'
    +   'gap:12px;width:min(100%,900px);}'
    + '.hlb-card{display:flex;flex-direction:column;align-items:center;gap:6px;min-height:132px;'
    +   'padding:14px 10px;border-radius:16px;border:2px solid rgba(20,107,94,.22);background:#FFFDF7;'
    +   'cursor:pointer;font:inherit;text-align:center;}'
    + '.hlb-card:hover{background:#F3EADA;}'
    + '.hlb-card:active{transform:translateY(1px);}'
    + '.hlb-card:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
    + '.hlb-icon{width:clamp(44px,13vw,56px);height:clamp(44px,13vw,56px);flex:0 0 auto;}'
    + '.hlb-ipath{fill:none;stroke:#146B5E;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}'
    /* ⚠ ONE text class for BOTH languages: identical size, weight and
       colour, so neither can become the secondary one. */
    + '.hlb-text{font-family:Nunito,system-ui,sans-serif;font-size:15px;line-height:1.25;color:#146B5E;}'

    + '.hlb-foot{display:flex;flex-direction:column;align-items:center;gap:8px;}'
    /* on a wide screen the foot is one line, so the board keeps the height */
    + '@media (min-width:600px){.hlb-foot{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px 16px;}}'
    + '.hlb-voicenote{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;max-width:52ch;}'
    + '.hlb-privacy{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'

    + '.hlb-locked{opacity:1;border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.hlb-locked::before{content:"";display:inline-block;width:11px;height:13px;margin-right:7px;'
    +   'vertical-align:-1px;border:2px solid currentColor;border-radius:2px;border-top-width:6px;'
    +   'border-top-left-radius:7px;border-top-right-radius:7px;box-sizing:border-box;}'

    + '.hlb-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
    +   'margin:0 0 8px;padding:9px 13px;border-radius:12px;background:#FBE6DA;'
    +   'border:1px solid rgba(242,120,75,.45);font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A3B1B;}'
    + '.hlb-gate a{color:#C2562F;font-weight:700;}'

    + '.hlb-printsheet{display:none;}'

    + '@media (max-width:480px){'
    +   '.hlb-board{grid-template-columns:repeat(2,1fr);gap:9px;}'
    +   '.hlb-card{min-height:116px;padding:11px 7px;}'
    +   '.hlb-text{font-size:14px;}'
    + '}'
    + 'body.hlb-wide .lcs-header{flex-direction:column;}'
    /* the shell sets html,body{overflow:hidden} — past the fold on a phone
       is UNREACHABLE, not merely off-screen (letter-studio precedent) */
    + '@media (max-width:560px){body.hlb-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'

    + '@media (prefers-reduced-motion:reduce){.hlb-card{transition:none !important;}}'

    /* PRINT — the take-home card. Re-tone every ink, not just the
       headline one (the recorded letter-studio defect). */
    /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
       `.hlb-board` is `repeat(auto-fit, minmax(150px,1fr))` inside a 900px
       cap, so raising the cap genuinely adds columns of readable cards rather
       than stretching a few — the center-board shape. The card's min-height
       and its type move with it, or a wider board would hold the same small
       cards. */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.hlb-wide .hlb-board{width:min(100%,1150px);grid-template-columns:repeat(auto-fit,minmax(190px,1fr));}'
    +   'body.hlb-wide .hlb-card{min-height:168px;padding:18px 13px;font-size:18px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.hlb-wide .hlb-board{width:min(100%,1460px);grid-template-columns:repeat(auto-fit,minmax(230px,1fr));}'
    +   'body.hlb-wide .hlb-card{min-height:200px;padding:22px 16px;font-size:20px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.hlb-wide .hlb-board{width:min(100%,1660px);grid-template-columns:repeat(auto-fit,minmax(260px,1fr));}'
    +   'body.hlb-wide .hlb-card{min-height:224px;padding:24px 18px;font-size:22px;}'
    + '}'
    + '@media print{'
    +   '.hlb-langbar,.hlb-chooser,.hlb-board,.hlb-foot,.hlb-gate{display:none !important;}'
    +   '.hlb-printsheet{display:block !important;padding:10mm;}'
    +   '.hlb-printhead{font-size:15pt;color:#000;margin-bottom:7mm;}'
    +   '.hlb-printrow{display:flex;gap:8mm;margin-bottom:5mm;page-break-inside:avoid;break-inside:avoid;'
    +     'border-bottom:.5pt solid #999;padding-bottom:2mm;}'
    +   '.hlb-printcell{flex:1;font-size:12pt;color:#000;}'

    + '}';
  document.head.appendChild(st);
}
