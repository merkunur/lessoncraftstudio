/**
 * LCS Grammar v1 — shared per-locale grammar engine for worksheet-generator apps.
 *
 * Consumers: find-and-count.html (instruction builder), prepositions.html
 * (fill-in sentence builder). Served as /worksheet-generators/js/lcs-grammar.js.
 *
 * DESIGN CONTRACT (operator commission 2026-08-18 — "never grammatically
 * incorrect"):
 *  - Every noun that reaches emitted text comes from verified vocabulary data
 *    (image-vocabulary.js or a hand-verified table in this file) and passes
 *    through a per-locale assembly rule. There is NO naive suffix-guessing
 *    pluralizer anywhere in this module.
 *  - Every builder returns null when it cannot produce a guaranteed-correct
 *    sentence (missing gender, missing Finnish genitive, unknown word). The
 *    caller must then degrade to a static hand-verified fallback or refuse
 *    the item — never emit a guessed form.
 *  - Locale strategies (ratified by 11 native-linguist audits on rendered
 *    output, 2026-08-18):
 *      en          definite article ("the")
 *      de          indefinite dative (einem/einer) — avoids the im/in dem
 *                  contraction split entirely; "zwischen zwei <Dat.Pl>"
 *      nl          invariant "een"; "tussen twee <pl>"
 *      sv/da/no    indefinite en/ett/et — the definite SUFFIX (stjärnan) is
 *                  never derived by rule; "mellan två/mellem to/mellom to <pl>"
 *      fr          un/une, two frames: A "___ un cercle." B "___ d'un cercle."
 *      es/pt/it    un/una · um/uma · un/uno/una/un' — the indefinite article
 *                  needs NO preposition contraction (de+un, em um, a un are
 *                  all uncontracted and correct)
 *      fi          postposition governing the GENITIVE: "on tähden ___." —
 *                  genitives come ONLY from the audited FI_GENITIVES table.
 *
 * UMD-ish: exposes window.LCSGrammar in browsers, module.exports in Node
 * (unit tests: scripts/lcs-grammar.test.js).
 */
(function (root) {
  'use strict';

  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

  // ---------------------------------------------------------------------
  // Casing
  // ---------------------------------------------------------------------
  // German capitalizes all nouns; every other locale lowercases a noun that
  // sits mid-sentence. Vocabulary values are stored Title-Case.
  function sentenceCaseNoun(word, locale) {
    if (word == null) return '';
    var w = String(word);
    if (locale === 'de') return w; // German nouns keep their capital
    return w.toLocaleLowerCase(locale === 'en' ? 'en' : locale);
  }

  // ---------------------------------------------------------------------
  // List joining ("A, B and C")
  // ---------------------------------------------------------------------
  var CONJUNCTIONS = {
    en: 'and', de: 'und', fr: 'et', es: 'y', pt: 'e', it: 'e',
    nl: 'en', sv: 'och', da: 'og', no: 'og', fi: 'ja'
  };

  // Spanish "y" becomes "e" before an i-/hi- sound (but not hie-):
  // "gatos e iguanas", "perros e hipopótamos", but "agua y hierba".
  function conjunctionFor(locale, nextWord) {
    var c = CONJUNCTIONS[locale] || 'and';
    if (locale === 'es' && nextWord) {
      var w = String(nextWord).toLowerCase();
      if (/^(i|í)/.test(w) || (/^hi/.test(w) && !/^hie/.test(w))) c = 'e';
    }
    return c;
  }

  function listJoin(locale, items) {
    var parts = (items || []).filter(function (s) { return s != null && String(s).length; });
    if (parts.length === 0) return '';
    if (parts.length === 1) return String(parts[0]);
    var last = parts[parts.length - 1];
    var head = parts.slice(0, -1).join(', ');
    // US K-3 materials model the serial (Oxford) comma on 3+ items.
    var serial = (locale === 'en' && parts.length > 2) ? ',' : '';
    return head + serial + ' ' + conjunctionFor(locale, last) + ' ' + last;
  }

  // ---------------------------------------------------------------------
  // Italian articles (phonologically conditioned)
  // ---------------------------------------------------------------------
  // "lo/gli/uno" before s+consonant, z, gn, ps, pn, x, y, i+vowel;
  // elision before plain vowels (singular only; masc. indefinite never
  // elides: "un albero", NOT "un'albero").
  function itNeedsLoForm(word) {
    return /^(s[bcdfghj-np-tv-z]|z|gn|ps|pn|x|y|i[aeiou])/i.test(String(word || ''));
  }
  function itStartsWithVowel(word) {
    return /^[aeiouàèéìòù]/i.test(String(word || ''));
  }
  function itDefArticle(word, gender, isPlural) {
    if (gender === 'f') {
      if (isPlural) return 'le';
      return itStartsWithVowel(word) ? "l'" : 'la';
    }
    if (gender === 'm') {
      if (isPlural) return (itNeedsLoForm(word) || itStartsWithVowel(word)) ? 'gli' : 'i';
      if (itNeedsLoForm(word)) return 'lo';
      if (itStartsWithVowel(word)) return "l'";
      return 'il';
    }
    return null;
  }
  function itIndefArticle(word, gender) {
    if (gender === 'f') return itStartsWithVowel(word) ? "un'" : 'una';
    if (gender === 'm') return itNeedsLoForm(word) ? 'uno' : 'un';
    return null;
  }
  // The uovo class (uovo/uova, braccio/braccia, dito/dita…): vocabulary
  // stores gender 'f' (the PLURAL is feminine) but the SINGULAR is masculine
  // ("un uovo sodo", never "un'uovo"). Structural tell: f + singular in -o +
  // plural in -a. Invariable feminines in -o (foto, radio, moto) keep an
  // unchanged plural, so they are correctly untouched.
  function itSingularArticleGender(singular, plural, gender) {
    // Compare the HEAD NOUN (first token — Italian adjectives follow):
    // "Uovo sodo"/"Uova sode" → uovo/uova → masculine singular article.
    var sgHead = String(singular || '').split(/\s+/)[0];
    var plHead = String(plural || '').split(/\s+/)[0];
    if (gender === 'f' && /o$/i.test(sgHead) && /a$/i.test(plHead)) {
      return 'm';
    }
    return gender;
  }

  // ---------------------------------------------------------------------
  // French "de" elision (needed for "Combien de/d'…" and the frame-B
  // suffix "d'un/d'une"). h-aspiré words do NOT elide: "de hiboux".
  // List curated against image-vocabulary.js fr h-words.
  // ---------------------------------------------------------------------
  var FR_H_ASPIRE = [
    'hache', 'hamac', 'hamburger', 'hamster', 'hanche', 'haricot', 'harpe',
    'hibou', 'hochet', 'hockey', 'homard', 'hotte', 'hutte', 'hood',
    'hérisson', 'héron', 'hasard', 'haut', 'hors'
  ];
  function frIsAspirateH(word) {
    var w = String(word || '').toLowerCase();
    if (w.charAt(0) !== 'h') return false;
    for (var i = 0; i < FR_H_ASPIRE.length; i++) {
      if (w.indexOf(FR_H_ASPIRE[i]) === 0) return true;
    }
    return false;
  }
  function frStartsWithVowelSound(word) {
    var w = String(word || '').toLowerCase();
    if (/^[aeiouyàâéèêëïîôùûüæœ]/.test(w)) return true;
    if (w.charAt(0) === 'h' && !frIsAspirateH(w)) return true; // h muet
    return false;
  }
  // "de " or "d'" before a noun ("Combien de chats ?" / "Combien d'étoiles ?")
  function frDe(word) {
    return frStartsWithVowelSound(word) ? "d'" : 'de ';
  }

  // ---------------------------------------------------------------------
  // Indefinite articles from vocabulary gender codes
  // (vocab codes: de m/f/n · fr/es/pt/it m/f · nl d/h · sv/da t=ett/et,
  //  n=en-word · no m/f/n)
  // ---------------------------------------------------------------------
  function indefArticle(locale, gender, word) {
    switch (locale) {
      case 'de': // DATIVE indefinite (locative prepositional phrases)
        if (gender === 'f') return 'einer';
        if (gender === 'm' || gender === 'n') return 'einem';
        return null;
      case 'fr':
        if (gender === 'f') return 'une';
        if (gender === 'm') return 'un';
        return null;
      case 'es':
        if (gender === 'f') return 'una';
        if (gender === 'm') return 'un';
        return null;
      case 'pt':
        if (gender === 'f') return 'uma';
        if (gender === 'm') return 'um';
        return null;
      case 'it':
        return itIndefArticle(word, gender);
      case 'nl':
        return 'een'; // invariant — gender not needed
      case 'sv':
        if (gender === 't') return 'ett';
        if (gender === 'n') return 'en';
        return null;
      case 'da':
        if (gender === 't') return 'et';
        if (gender === 'n') return 'en';
        return null;
      case 'no':
        if (gender === 'n') return 'et';
        if (gender === 'm' || gender === 'f') return 'en';
        return null;
      default:
        return null;
    }
  }

  // German dative plural: append -n unless the plural already ends in -n/-s
  // (near-exceptionless standard rule: Sterne→Sternen, Autos→Autos,
  // Herzen→Herzen).
  function deDativePlural(pluralForm) {
    var w = String(pluralForm || '');
    if (!w) return null;
    var last = w.charAt(w.length - 1).toLowerCase();
    if (last === 'n' || last === 's') return w;
    return w + 'n';
  }

  // "two" for the between-frame; Portuguese inflects for gender.
  function twoWord(locale, gender) {
    switch (locale) {
      case 'de': return 'zwei';
      case 'nl': return 'twee';
      case 'sv': return 'två';
      case 'da': return 'to';
      case 'no': return 'to';
      case 'fr': return 'deux';
      case 'es': return 'dos';
      case 'pt': return gender === 'f' ? 'duas' : 'dois';
      case 'it': return 'due';
      case 'fi': return 'kahden'; // genitive (governed by the postposition)
      default: return 'two';
    }
  }

  // ---------------------------------------------------------------------
  // Romance plural quantifier for Find-and-Count ("all the X")
  // Applied PER NOUN so mixed-gender lists agree:
  // "tous les chats et toutes les étoiles".
  // ---------------------------------------------------------------------
  function romanceQuantifier(locale, gender, pluralWord) {
    switch (locale) {
      case 'fr':
        if (gender === 'f') return 'toutes les';
        if (gender === 'm') return 'tous les';
        return null;
      case 'es':
        if (gender === 'f') return 'todas las';
        if (gender === 'm') return 'todos los';
        return null;
      case 'pt':
        if (gender === 'f') return 'todas as';
        if (gender === 'm') return 'todos os';
        return null;
      case 'it':
        if (gender === 'f') return 'tutte le';
        if (gender === 'm') {
          var art = itDefArticle(pluralWord, 'm', true);
          return art ? ('tutti ' + art) : null;
        }
        return null;
      default:
        return null;
    }
  }

  // ---------------------------------------------------------------------
  // Find-and-Count instruction builder
  // nouns: [{plural, gender}] in the TARGET locale (plural REQUIRED from
  // verified vocab; gender required for fr/es/pt/it). Returns null when any
  // noun is unusable → caller falls back to its static generic instruction.
  // ---------------------------------------------------------------------
  var FAC_TEMPLATES = {
    en: { circle: 'Circle {list}', square: 'Put a square around {list}', cross: 'Cross out {list}', count: 'Count {list}' },
    de: { circle: 'Kreise {list} ein', square: 'Zeichne ein Quadrat um {list}', cross: 'Streiche {list} durch', count: 'Zähle {list}' },
    fr: { circle: 'Entoure {list}', square: 'Encadre {list}', cross: 'Barre {list}', count: 'Compte {list}' },
    es: { circle: 'Rodea {list}', square: 'Pon un cuadrado alrededor de {list}', cross: 'Tacha {list}', count: 'Cuenta {list}' },
    pt: { circle: 'Circule {list}', square: 'Coloque um quadrado em volta de {list}', cross: 'Risque {list}', count: 'Conte {list}' },
    it: { circle: 'Cerchia {list}', square: 'Metti un quadrato intorno a {list}', cross: 'Barra {list}', count: 'Conta {list}' },
    nl: { circle: 'Omcirkel {list}', square: 'Zet een vierkant om {list}', cross: 'Streep {list} door', count: 'Tel {list}' },
    sv: { circle: 'Ringa in {list}', square: 'Rita en kvadrat runt {list}', cross: 'Stryk över {list}', count: 'Räkna {list}' },
    da: { circle: 'Sæt ring om {list}', square: 'Sæt en firkant omkring {list}', cross: 'Sæt kryds over {list}', count: 'Tæl {list}' },
    no: { circle: 'Sett ring rundt {list}', square: 'Sett en firkant rundt {list}', cross: 'Stryk over {list}', count: 'Tell {list}' },
    fi: { circle: 'Ympyröi {list}', square: 'Merkitse {list} neliöllä', cross: 'Yliviivaa {list}', count: 'Laske {list}' }
  };
  // The universal quantifier for non-Romance locales ("all the …").
  var ALL_WORD = {
    en: 'all the', de: 'alle', nl: 'alle', sv: 'alla', da: 'alle', no: 'alle', fi: 'kaikki'
  };

  function findCountInstruction(locale, taskType, nouns) {
    var tpl = (FAC_TEMPLATES[locale] || FAC_TEMPLATES.en)[taskType];
    if (!tpl) return null;
    if (!nouns || !nouns.length) return null;
    var isRomance = (locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it');
    var chunks = [];
    for (var i = 0; i < nouns.length; i++) {
      var n = nouns[i];
      if (!n || !n.plural) return null;
      var word = sentenceCaseNoun(n.plural, locale);
      if (locale === 'de' && /\s/.test(word)) {
        // German adjective+noun phrase: re-declines after "alle" —
        // curated form or refuse (caller falls back to the generic line).
        word = (n.key && DE_ALLE_FORMS[n.key]) || null;
        if (!word) return null;
      }
      if (isRomance) {
        var q = romanceQuantifier(locale, n.gender, word);
        if (!q) return null; // missing/invalid gender → caller falls back
        chunks.push(q + ' ' + word);
      } else {
        chunks.push(word);
      }
    }
    var list;
    if (isRomance) {
      list = listJoin(locale, chunks);
    } else {
      var all = ALL_WORD[locale] || ALL_WORD.en;
      list = all + ' ' + listJoin(locale, chunks);
    }
    return tpl.replace('{list}', list);
  }

  // ---------------------------------------------------------------------
  // "How many X?" question (Find-and-Count legend inputs / aria labels)
  // noun: {plural, gender} in the target locale. Finnish is noun-free by
  // design (the noun would need the partitive). Returns null when the noun
  // is unusable → caller uses howManyShort(locale).
  // ---------------------------------------------------------------------
  var HOW_MANY_SHORT = {
    en: 'How many?', de: 'Wie viele?', fr: 'Combien ?', es: '¿Cuántos?',
    pt: 'Quantos?', it: 'Quanti?', nl: 'Hoeveel?', sv: 'Hur många?',
    da: 'Hvor mange?', no: 'Hvor mange?', fi: 'Kuinka monta?'
  };
  function howManyShort(locale) {
    return HOW_MANY_SHORT[locale] || HOW_MANY_SHORT.en;
  }
  function howManyQuestion(locale, noun) {
    if (locale === 'fi') return HOW_MANY_SHORT.fi; // noun would need partitive
    if (!noun || !noun.plural) return null;
    var w = sentenceCaseNoun(noun.plural, locale);
    switch (locale) {
      case 'en': return 'How many ' + w + '?';
      case 'de': return 'Wie viele ' + w + '?';
      case 'fr': return 'Combien ' + frDe(w) + w + ' ?';
      case 'es':
        if (noun.gender === 'f') return '¿Cuántas ' + w + '?';
        if (noun.gender === 'm') return '¿Cuántos ' + w + '?';
        return null;
      case 'pt':
        if (noun.gender === 'f') return 'Quantas ' + w + '?';
        if (noun.gender === 'm') return 'Quantos ' + w + '?';
        return null;
      case 'it':
        if (noun.gender === 'f') return 'Quante ' + w + '?';
        if (noun.gender === 'm') return 'Quanti ' + w + '?';
        return null;
      case 'nl': return 'Hoeveel ' + w + '?';
      case 'sv': return 'Hur många ' + w + '?';
      case 'da': return 'Hvor mange ' + w + '?';
      case 'no': return 'Hvor mange ' + w + '?';
      default: return null;
    }
  }

  // ---------------------------------------------------------------------
  // Prepositions — fill-in sentence builder
  // ---------------------------------------------------------------------
  // Localized preposition forms as they FILL THE BLANK. French splits into
  // frame A ("___ un cercle.") and frame B ("___ d'un cercle."): the frame-B
  // label omits the "de", which is printed in the suffix.
  var PREP_FORMS = {
    // 'in' uses dentro-forms in es/pt/it (native panels 2026-08-18: "en"/"em"
    // also describe on-contact, making them ambiguous tap options; "dentro"
    // is the K-3 classroom term for inside).
    'in':          { en: 'in',          de: 'in',       fr: 'dans',       frFrame: 'A', es: 'dentro de',     pt: 'dentro de',     it: 'dentro',      nl: 'in',      sv: 'i',         da: 'i',            no: 'i',            fi: 'sisällä' },
    // da: with a complement Retskrivningsordbogen requires TWO words
    // ("oven på et hjerte"); the one-word adverb "ovenpå" is standalone-only.
    'on top of':   { en: 'on top of',   de: 'auf',      fr: 'sur',        frFrame: 'A', es: 'encima de',     pt: 'em cima de',    it: 'sopra',       nl: 'bovenop', sv: 'ovanpå', da: 'oven på', no: 'oppå',    fi: 'päällä' },
    'under':       { en: 'under',       de: 'unter',    fr: 'sous',       frFrame: 'A', es: 'debajo de',     pt: 'embaixo de',    it: 'sotto',       nl: 'onder',   sv: 'under',     da: 'under',        no: 'under',        fi: 'alla' },
    'next to':     { en: 'next to',     de: 'neben',    fr: 'à côté', frFrame: 'B', es: 'al lado de', pt: 'ao lado de', it: 'accanto a', nl: 'naast', sv: 'bredvid', da: 'ved siden af', no: 'ved siden av', fi: 'vieressä' },
    'behind':      { en: 'behind',      de: 'hinter',   fr: 'derrière', frFrame: 'A', es: 'detrás de', pt: 'atrás de', it: 'dietro',   nl: 'achter',  sv: 'bakom',     da: 'bag',          no: 'bak',          fi: 'takana' },
    'between':     { en: 'between',     de: 'zwischen', fr: 'entre',      frFrame: 'A', es: 'entre',         pt: 'entre',         it: 'tra',         nl: 'tussen',  sv: 'mellan',    da: 'mellem',       no: 'mellom',       fi: 'välissä' },
    'above':       { en: 'above',       de: 'über', fr: 'au-dessus', frFrame: 'B', es: 'por encima de', pt: 'acima de',      it: 'al di sopra di', nl: 'boven', sv: 'ovanför', da: 'over',      no: 'over',         fi: 'yläpuolella' },
    'in front of': { en: 'in front of', de: 'vor',      fr: 'devant',     frFrame: 'A', es: 'delante de',    pt: 'na frente de',  it: 'davanti a',   nl: 'voor',    sv: 'framför', da: 'foran',     no: 'foran',        fi: 'edessä' }
  };

  // Keys that must never be a singular-frame landmark in article locales
  // (plural-only proper nouns etc. that the Finnish-PT proxy cannot see).
  var LANDMARK_DENY = ['us'];

  var COPULA = {
    en: 'is', de: 'ist', fr: 'est', es: 'está', pt: 'está',
    it: 'è', nl: 'is', sv: 'är', da: 'er', no: 'er', fi: 'on'
  };

  // French frame-B distractor extras (label-only; never a correct answer):
  // grammatical in "___ d'un cercle." and clearly false for the pictured scenes.
  var FR_B_EXTRA_LABELS = ['au-dessous', 'autour'];

  // landmark: {key, singular, plural, gender, fiGen, fiPt}
  //   singular/plural — target-locale forms from verified vocab (Title-Case OK,
  //   the builder sentence-cases). gender — vocab code. fiGen/fiPt — Finnish
  //   genitive + plurale-tantum flag from FI_GENITIVES (resolved by the
  //   caller or via key lookup here).
  // Returns {prefix, expected, suffix} where:
  //   worksheet  = prefix + '__________' + suffix
  //   answer key = prefix + expected + suffix
  // or null when a guaranteed-correct sentence cannot be built.
  function prepSentence(locale, prepKey, landmark) {
    return _renderPrep(locale, prepKey, landmark, prepKey === 'between');
  }

  // Core renderer. plFrame=true renders the "between two X" plural frame —
  // used both for 'between' itself and for rendering DISTRACTOR candidates
  // inside a between-exercise ("unter zwei Sternen" etc.). 'between' itself
  // is only ever valid in the plural frame.
  function _renderPrep(locale, prepKey, landmark, plFrame) {
    var forms = PREP_FORMS[prepKey];
    if (!forms || !landmark) return null;
    var prep = forms[locale];
    if (!prep) return null;
    var cop = COPULA[locale];
    var isBetween = plFrame;
    if (prepKey === 'between' && !plFrame) return null;

    if (locale === 'fi') {
      var gen = landmark.fiGen || (landmark.key && FI_GENITIVES[landmark.key] ? FI_GENITIVES[landmark.key].gen : null);
      var isPt = landmark.fiPt != null ? !!landmark.fiPt
        : !!(landmark.key && FI_GENITIVES[landmark.key] && FI_GENITIVES[landmark.key].pt);
      if (!gen) return null;
      var pre = '{img} on ';
      if (isBetween && !isPt) pre += 'kahden ';
      pre += gen + ' ';
      return { prefix: pre, expected: prep, suffix: '.' };
    }

    var pre2 = '{img} ' + cop + ' ';

    if (isBetween) {
      if (!landmark.plural) return null;
      var pw = sentenceCaseNoun(landmark.plural, locale);
      if (locale === 'en') {
        return { prefix: pre2, expected: prep, suffix: ' the ' + pw + '.' };
      }
      if (locale === 'de') {
        var dat;
        if (/\s/.test(landmark.plural)) {
          dat = (landmark.key && DE_DATIVE_PL[landmark.key]) || null; // refuse unknown phrases
        } else {
          dat = deDativePlural(landmark.plural);
        }
        if (!dat) return null;
        return { prefix: pre2, expected: prep, suffix: ' zwei ' + dat + '.' };
      }
      if (locale === 'es' || locale === 'pt' || locale === 'it' || locale === 'fr' ||
          locale === 'nl' || locale === 'sv' || locale === 'da' || locale === 'no') {
        var two = twoWord(locale, landmark.gender);
        if (locale === 'pt' && landmark.gender !== 'm' && landmark.gender !== 'f') return null;
        if (locale === 'fr' && forms.frFrame === 'B') {
          // "à côté de deux cercles" — the de is printed, the label stays bare
          return { prefix: pre2, expected: prep, suffix: ' de ' + two + ' ' + pw + '.' };
        }
        return { prefix: pre2, expected: prep, suffix: ' ' + two + ' ' + pw + '.' };
      }
      return null;
    }

    // Singular frames
    if (!landmark.singular) return null;
    // Plurale-tantum guard: a plural-only noun cannot sit in an indefinite
    // singular frame ("dentro de un tijeras"). Tell: the locale's stored
    // singular equals its plural AND the key is flagged plural-only in the
    // audited Finnish table (proxy), or is on the explicit deny list.
    // English keeps them (definite "the scissors" is grammatical); Finnish
    // handles them natively (PT genitive). Between-frames are also fine
    // ("entre dos tijeras") — this guard is singular-frame only.
    if (locale !== 'en' && landmark.singular === landmark.plural && landmark.key) {
      var figPt = FI_GENITIVES[landmark.key];
      if ((figPt && figPt.pt) || LANDMARK_DENY.indexOf(landmark.key) >= 0) return null;
    }
    var sw = sentenceCaseNoun(landmark.singular, locale);
    // German n-Deklination (weak nouns): dative singular differs from the
    // stored nominative ("einem Elefanten", "einem Löwen", "einem Herzen").
    // Audited table below; keys absent from it use the nominative (correct
    // for all strong nouns).
    if (locale === 'de') {
      if (landmark.key && DE_DATIVE_SG[landmark.key]) {
        sw = DE_DATIVE_SG[landmark.key];
      } else if (/\s/.test(sw)) {
        return null; // uncurated adjective+noun phrase — refuse, never guess
      }
    }
    if (locale === 'en') {
      return { prefix: pre2, expected: prep, suffix: ' the ' + sw + '.' };
    }
    var artGender = (locale === 'it')
      ? itSingularArticleGender(landmark.singular, landmark.plural, landmark.gender)
      : landmark.gender;
    var art = indefArticle(locale, artGender, sw);
    if (!art) return null;
    if (locale === 'fr') {
      if (forms.frFrame === 'B') {
        // "à côté d'un cercle" — the de/d' is printed in the suffix
        return { prefix: pre2, expected: prep, suffix: " d'" + art + ' ' + sw + '.' };
      }
      return { prefix: pre2, expected: prep, suffix: ' ' + art + ' ' + sw + '.' };
    }
    if (locale === 'it' && art === "un'") {
      return { prefix: pre2, expected: prep, suffix: " un'" + sw + '.' };
    }
    return { prefix: pre2, expected: prep, suffix: ' ' + art + ' ' + sw + '.' };
  }

  // Distractor candidates for a rendered exercise: every other preposition
  // whose rendering under the SAME landmark yields the IDENTICAL prefix and
  // suffix (structurally guaranteed frame-compatible) and a DISTINCT label.
  // Semantically confusable pairs (native panels 2026-08-18): a child cannot
  // reliably separate contact ("on top of") from no-contact ("above"), so
  // neither may appear as a distractor for the other.
  var CONFUSABLE_PREPS = {
    'above': ['on top of'],
    'on top of': ['above']
  };

  function prepDistractorLabels(locale, prepKey, landmark) {
    var base = prepSentence(locale, prepKey, landmark);
    if (!base) return [];
    var labels = [];
    var plFrame = (prepKey === 'between');
    var confusable = CONFUSABLE_PREPS[prepKey] || [];
    var keys = Object.keys(PREP_FORMS);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (k === prepKey) continue;
      if (confusable.indexOf(k) >= 0) continue;
      var r = _renderPrep(locale, k, landmark, plFrame);
      if (!r) continue;
      if (r.prefix === base.prefix && r.suffix === base.suffix &&
          r.expected !== base.expected && labels.indexOf(r.expected) < 0) {
        labels.push(r.expected);
      }
    }
    if (locale === 'fr') {
      for (var j = 0; j < FR_B_EXTRA_LABELS.length; j++) {
        var ex = FR_B_EXTRA_LABELS[j];
        // extras only fit frame B, and only when the pool is short
        var isB = PREP_FORMS[prepKey] && PREP_FORMS[prepKey].frFrame === 'B' && prepKey !== 'between';
        if (isB && labels.length < 2 && ex !== base.expected && labels.indexOf(ex) < 0) {
          labels.push(ex);
        }
      }
    }
    return labels;
  }

  // ---------------------------------------------------------------------
  // Hand-verified default-shape noun table for the Prepositions app —
  // ONE source of truth for noun + gender (replaces the SHAPE_TRANSLATIONS
  // noun / IMAGE_VOCABULARY gender split that could disagree).
  // Shape keys: circle cube cylinder heart hexagon square star triangle.
  // Per locale: [singular, plural, gender] (en/fi omit gender; fi genitive
  // lives in FI_GENITIVES under the same key).
  // ---------------------------------------------------------------------
  var SHAPE_NOUNS = {
    circle:   { en: ['circle', 'circles'], de: ['Kreis', 'Kreise', 'm'], fr: ['cercle', 'cercles', 'm'], es: ['círculo', 'círculos', 'm'], pt: ['círculo', 'círculos', 'm'], it: ['cerchio', 'cerchi', 'm'], nl: ['cirkel', 'cirkels', 'd'], sv: ['cirkel', 'cirklar', 'n'], da: ['cirkel', 'cirkler', 'n'], no: ['sirkel', 'sirkler', 'm'], fi: ['ympyrä', 'ympyrät'] },
    cube:     { en: ['cube', 'cubes'], de: ['Würfel', 'Würfel', 'm'], fr: ['cube', 'cubes', 'm'], es: ['cubo', 'cubos', 'm'], pt: ['cubo', 'cubos', 'm'], it: ['cubo', 'cubi', 'm'], nl: ['kubus', 'kubussen', 'd'], sv: ['kub', 'kuber', 'n'], da: ['terning', 'terninger', 'n'], no: ['terning', 'terninger', 'm'], fi: ['kuutio', 'kuutiot'] },
    // fi cylinder: the K-3 school term for the SHAPE is "lieriö" (sylinteri
    // reads as an engine part); fi rows carry the GENITIVE in slot 3 since
    // Finnish has no gender (custom-image cylinders still resolve to the
    // vocab's sylinteri + FI_GENITIVES.cylinder = sylinterin).
    cylinder: { en: ['cylinder', 'cylinders'], de: ['Zylinder', 'Zylinder', 'm'], fr: ['cylindre', 'cylindres', 'm'], es: ['cilindro', 'cilindros', 'm'], pt: ['cilindro', 'cilindros', 'm'], it: ['cilindro', 'cilindri', 'm'], nl: ['cilinder', 'cilinders', 'd'], sv: ['cylinder', 'cylindrar', 'n'], da: ['cylinder', 'cylindre', 'n'], no: ['sylinder', 'sylindere', 'm'], fi: ['lieriö', 'lieriöt', 'lieriön'] },
    heart:    { en: ['heart', 'hearts'], de: ['Herz', 'Herzen', 'n'], fr: ['cœur', 'cœurs', 'm'], es: ['corazón', 'corazones', 'm'], pt: ['coração', 'corações', 'm'], it: ['cuore', 'cuori', 'm'], nl: ['hart', 'harten', 'h'], sv: ['hjärta', 'hjärtan', 't'], da: ['hjerte', 'hjerter', 't'], no: ['hjerte', 'hjerter', 'n'], fi: ['sydän', 'sydämet'] },
    hexagon:  { en: ['hexagon', 'hexagons'], de: ['Sechseck', 'Sechsecke', 'n'], fr: ['hexagone', 'hexagones', 'm'], es: ['hexágono', 'hexágonos', 'm'], pt: ['hexágono', 'hexágonos', 'm'], it: ['esagono', 'esagoni', 'm'], nl: ['zeshoek', 'zeshoeken', 'd'], sv: ['sexhörning', 'sexhörningar', 'n'], da: ['sekskant', 'sekskanter', 'n'], no: ['sekskant', 'sekskanter', 'm'], fi: ['kuusikulmio', 'kuusikulmiot'] },
    square:   { en: ['square', 'squares'], de: ['Quadrat', 'Quadrate', 'n'], fr: ['carré', 'carrés', 'm'], es: ['cuadrado', 'cuadrados', 'm'], pt: ['quadrado', 'quadrados', 'm'], it: ['quadrato', 'quadrati', 'm'], nl: ['vierkant', 'vierkanten', 'h'], sv: ['kvadrat', 'kvadrater', 'n'], da: ['kvadrat', 'kvadrater', 't'], no: ['kvadrat', 'kvadrater', 'n'], fi: ['neliö', 'neliöt'] },
    star:     { en: ['star', 'stars'], de: ['Stern', 'Sterne', 'm'], fr: ['étoile', 'étoiles', 'f'], es: ['estrella', 'estrellas', 'f'], pt: ['estrela', 'estrelas', 'f'], it: ['stella', 'stelle', 'f'], nl: ['ster', 'sterren', 'd'], sv: ['stjärna', 'stjärnor', 'n'], da: ['stjerne', 'stjerner', 'n'], no: ['stjerne', 'stjerner', 'f'], fi: ['tähti', 'tähdet'] },
    triangle: { en: ['triangle', 'triangles'], de: ['Dreieck', 'Dreiecke', 'n'], fr: ['triangle', 'triangles', 'm'], es: ['triángulo', 'triángulos', 'm'], pt: ['triângulo', 'triângulos', 'm'], it: ['triangolo', 'triangoli', 'm'], nl: ['driehoek', 'driehoeken', 'd'], sv: ['triangel', 'trianglar', 'n'], da: ['trekant', 'trekanter', 'n'], no: ['trekant', 'trekanter', 'm'], fi: ['kolmio', 'kolmiot'] }
  };

  function shapeLandmark(shapeKey, locale) {
    var row = SHAPE_NOUNS[shapeKey];
    if (!row || !row[locale]) return null;
    var e = row[locale];
    if (locale === 'fi') {
      // fi rows: [singular, plural, genitive?] — slot 3 is the GENITIVE
      // (no gender in Finnish); fall back to the audited FI_GENITIVES.
      var g = FI_GENITIVES[shapeKey];
      return {
        key: shapeKey, singular: e[0], plural: e[1], gender: null,
        fiGen: e[2] || (g ? g.gen : null),
        fiPt: g ? !!g.pt : false
      };
    }
    return { key: shapeKey, singular: e[0], plural: e[1], gender: e[2] || null };
  }

  // ---------------------------------------------------------------------
  // Finnish genitive-singular table (audited by native-fi linguists).
  // {gen: 'tähden'} · pt:true marks plurale tantum (genitive PLURAL stored;
  // the between-frame drops 'kahden' for these). A key ABSENT from this
  // table means: the word may NOT be used as a Finnish landmark — the app
  // must refuse/substitute, never guess.
  // The 8 default shapes are hand-verified here and always present.
  // ---------------------------------------------------------------------
  var FI_GENITIVES = {
    'accordion': { gen: 'haitarin' },
    'acorn': { gen: 'tammenterhon' },
    'actor': { gen: 'näyttelijän' },
    'air-conditioning': { gen: 'ilmastoinnin' },
    'airplane': { gen: 'lentokoneen' },
    'alarm-clock': { gen: 'herätyskellon' },
    'alligator': { gen: 'alligaattorin' },
    'allosaurus': { gen: 'allosauruksen' },
    'alpaca': { gen: 'alpakan' },
    'ambulance': { gen: 'ambulanssin' },
    'analog-clock': { gen: 'analogisen kellon' },
    'anchor': { gen: 'ankkurin' },
    'angel': { gen: 'enkelin' },
    'angelfish': { gen: 'enkelikalan' },
    'ankle': { gen: 'nilkan' },
    'ankylosaurus': { gen: 'ankylosauruksen' },
    'ant': { gen: 'muurahaisen' },
    'antelope': { gen: 'antiloopin' },
    'apatosaurus': { gen: 'apatosauruksen' },
    'apple': { gen: 'omenan' },
    'apple-pie': { gen: 'omenapiirakan' },
    'apple-tree': { gen: 'omenapuun' },
    'apricot': { gen: 'aprikoosin' },
    'apron': { gen: 'esiliinan' },
    'architect': { gen: 'arkkitehdin' },
    'argentinosaurus': { gen: 'argentinosauruksen' },
    'arm': { gen: 'käsivarren' },
    'armadillo': { gen: 'vyötiäisen' },
    'armchair': { gen: 'nojatuolin' },
    'artist': { gen: 'taiteilijan' },
    'ash-tree': { gen: 'saarnen' },
    'asparagus': { gen: 'parsan' },
    'aspen-tree': { gen: 'haavan' },
    'aster': { gen: 'asterin' },
    'asteroid': { gen: 'asteroidin' },
    'astronaut': { gen: 'astronautin' },
    'athlete': { gen: 'urheilijan' },
    'author': { gen: 'kirjailijan' },
    'avocado': { gen: 'avokadon' },
    'axe': { gen: 'kirveen' },
    'azalea': { gen: 'atsalean' },
    'baby': { gen: 'vauvan' },
    'baby\'s-onesie': { gen: 'vauvan bodyn' },
    'baby-bottle': { gen: 'tuttipullon' },
    'baby-carriage': { gen: 'lastenvaunujen', pt: true },
    'baby-girl': { gen: 'tyttövauvan' },
    'baby-overall': { gen: 'vauvan haalarin' },
    'backpack': { gen: 'repun' },
    'bacon': { gen: 'pekonin' },
    'badge': { gen: 'merkin' },
    'badger': { gen: 'mäyrän' },
    'badminton': { gen: 'sulkapallon' },
    'bag': { gen: 'kassin' },
    'bagel': { gen: 'bagelin' },
    'baguette': { gen: 'patongin' },
    'baker': { gen: 'leipurin' },
    'baking-sheet': { gen: 'uunipellin' },
    'ball': { gen: 'pallon' },
    'ballerina': { gen: 'ballerinan' },
    'balloon': { gen: 'ilmapallon' },
    'banana': { gen: 'banaanin' },
    'banana-tree': { gen: 'banaanipuun' },
    'bandage': { gen: 'siteen' },
    'banyan-tree': { gen: 'baniaanipuun' },
    'baobab-tree': { gen: 'apinanleipäpuun' },
    'barbecue': { gen: 'grillin' },
    'barber': { gen: 'parturin' },
    'barn': { gen: 'ladon' },
    'barrette': { gen: 'hiussoljen' },
    'basket': { gen: 'korin' },
    'basketball': { gen: 'koripallon' },
    'bat': { gen: 'lepakon' },
    'bathing-suit': { gen: 'uimapuvun' },
    'bathtub': { gen: 'kylpyammeen' },
    'beach': { gen: 'rannan' },
    'beach-bag': { gen: 'rantalaukun' },
    'beach-ball': { gen: 'rantapallon' },
    'beach-umbrella': { gen: 'aurinkovarjon' },
    'beanie': { gen: 'pipon' },
    'bear': { gen: 'karhun' },
    'beaver': { gen: 'majavan' },
    'bed': { gen: 'sängyn' },
    'bee': { gen: 'mehiläisen' },
    'beech-tree': { gen: 'pyökin' },
    'beetle': { gen: 'kovakuoriaisen' },
    'beetroot': { gen: 'punajuuren' },
    'begonia': { gen: 'begonian' },
    'bell': { gen: 'kellon' },
    'bell-pepper': { gen: 'paprikan' },
    'belt': { gen: 'vyön' },
    'bench': { gen: 'penkin' },
    'bible': { gen: 'raamatun' },
    'bicycle': { gen: 'polkupyörän' },
    'binder': { gen: 'kansion' },
    'binoculars': { gen: 'kiikarin' },
    'birch-tree': { gen: 'koivun' },
    'bird': { gen: 'linnun' },
    'birdhouse': { gen: 'linnunpöntön' },
    'biscuit': { gen: 'keksin' },
    'bison': { gen: 'biisonin' },
    'blackberry': { gen: 'karhunvatukan' },
    'blanket': { gen: 'peiton' },
    'blender': { gen: 'tehosekoittimen' },
    'blocks': { gen: 'palikoiden', pt: true },
    'blouse': { gen: 'puseron' },
    'blue-jay': { gen: 'sinitöyhtönärhen' },
    'bluebell': { gen: 'sinililjan' },
    'blueberry': { gen: 'mustikan' },
    'boat': { gen: 'veneen' },
    'boiled-egg': { gen: 'keitetyn munan' },
    'bolt': { gen: 'pultin' },
    'bone': { gen: 'luun' },
    'bonfire': { gen: 'nuotion' },
    'book': { gen: 'kirjan' },
    'bookcase': { gen: 'kirjahyllyn' },
    'bookshelf': { gen: 'kirjahyllyn' },
    'boombox': { gen: 'mankan' },
    'boots': { gen: 'saappaiden', pt: true },
    'bottle': { gen: 'pullon' },
    'bow': { gen: 'rusetin' },
    'bow-tie': { gen: 'rusetin' },
    'bowl': { gen: 'kulhon' },
    'bowling-ball': { gen: 'keilapallon' },
    'box': { gen: 'laatikon' },
    'boxing-glove': { gen: 'nyrkkeilyhanskan' },
    'boy': { gen: 'pojan' },
    'bracelet': { gen: 'rannerenkaan' },
    'brachiosaurus': { gen: 'brachiosauruksen' },
    'brain': { gen: 'aivojen', pt: true },
    'branch': { gen: 'oksan' },
    'bread': { gen: 'leivän' },
    'briefcase': { gen: 'salkun' },
    'broccoli': { gen: 'parsakaalin' },
    'brontosaurus': { gen: 'brontosauruksen' },
    'broom': { gen: 'luudan' },
    'brother': { gen: 'veljen' },
    'brownie': { gen: 'brownien' },
    'brush': { gen: 'harjan' },
    'bucket': { gen: 'ämpärin' },
    'bud': { gen: 'silmun' },
    'bull': { gen: 'härän' },
    'bulldozer': { gen: 'puskutraktorin' },
    'bun': { gen: 'sämpylän' },
    'bunny': { gen: 'pupun' },
    'burrito': { gen: 'burriton' },
    'bus': { gen: 'bussin' },
    'bus-driver': { gen: 'linja-autonkuljettajan' },
    'butter': { gen: 'voin' },
    'butter-knife': { gen: 'voiveitsen' },
    'buttercup': { gen: 'leinikin' },
    'butterfly': { gen: 'perhosen' },
    'cabana': { gen: 'rantamajan' },
    'cabbage': { gen: 'kaalin' },
    'cabin': { gen: 'mökin' },
    'cabinet': { gen: 'kaapin' },
    'cable-car': { gen: 'köysiradan' },
    'cactus': { gen: 'kaktuksen' },
    'cake': { gen: 'kakun' },
    'cake-pan': { gen: 'kakkuvuoan' },
    'calculator': { gen: 'laskimen' },
    'calendar': { gen: 'kalenterin' },
    'calf': { gen: 'vasikan' },
    'camel': { gen: 'kamelin' },
    'camera': { gen: 'kameran' },
    'camp': { gen: 'leirin' },
    'camper': { gen: 'matkailuauton' },
    'campfire': { gen: 'nuotion' },
    'camping-chair': { gen: 'retkituolin' },
    'can': { gen: 'tölkin' },
    'canary': { gen: 'kanarialinnun' },
    'candle': { gen: 'kynttilän' },
    'candy': { gen: 'karkin' },
    'candy-cane': { gen: 'karamellitangon' },
    'canoe': { gen: 'kanootin' },
    'cap': { gen: 'lippiksen' },
    'cape': { gen: 'viitan' },
    'capybara': { gen: 'kapybaran' },
    'car': { gen: 'auton' },
    'card': { gen: 'kortin' },
    'cardigan': { gen: 'neuletakin' },
    'cardinal': { gen: 'punakardinaalin' },
    'cards': { gen: 'korttien', pt: true },
    'carnation': { gen: 'neilikan' },
    'carnotaurus': { gen: 'carnotauruksen' },
    'carpenter': { gen: 'puusepän' },
    'carpet': { gen: 'maton' },
    'carriage': { gen: 'vaunujen', pt: true },
    'carrot': { gen: 'porkkanan' },
    'cart': { gen: 'ostoskärryn' },
    'cash-register': { gen: 'kassakoneen' },
    'cashier': { gen: 'kassatyöntekijän' },
    'cast': { gen: 'kipsin' },
    'cat': { gen: 'kissan' },
    'caterpillar': { gen: 'toukan' },
    'cauliflower': { gen: 'kukkakaalin' },
    'caulking-gun': { gen: 'saumauspistoolin' },
    'cedar-tree': { gen: 'setrin' },
    'celery': { gen: 'sellerin' },
    'cement-mixer': { gen: 'betonimyllyn' },
    'centipede': { gen: 'juoksujalkaisen' },
    'cereal': { gen: 'murojen', pt: true },
    'chainsaw': { gen: 'moottorisahan' },
    'chair': { gen: 'tuolin' },
    'chameleon': { gen: 'kameleontin' },
    'chandelier': { gen: 'kattokruunun' },
    'cheeks': { gen: 'poskien', pt: true },
    'cheese': { gen: 'juuston' },
    'cheeseburger': { gen: 'juustohampurilaisen' },
    'cheesecake': { gen: 'juustokakun' },
    'cheetah': { gen: 'gepardin' },
    'chef': { gen: 'kokin' },
    'chef\'s-knife': { gen: 'kokinveitsen' },
    'cherry': { gen: 'kirsikan' },
    'cherry-blossom': { gen: 'kirsikankukan' },
    'cherry-tree': { gen: 'kirsikkapuun' },
    'chess': { gen: 'shakin' },
    'chestnut-tree': { gen: 'kastanjapuun' },
    'chick': { gen: 'tipun' },
    'chicken': { gen: 'kanan' },
    'chili-pepper': { gen: 'chilipippurin' },
    'chimney': { gen: 'savupiipun' },
    'chimpanzee': { gen: 'simpanssin' },
    'chin': { gen: 'leuan' },
    'chinchilla': { gen: 'chinchillan' },
    'chipmunk': { gen: 'maaoravan' },
    'chips': { gen: 'sipsien', pt: true },
    'chocolate': { gen: 'suklaan' },
    'chocolate-bar': { gen: 'suklaapatukan' },
    'christmas-stocking': { gen: 'joulusukan' },
    'christmas-tree': { gen: 'joulukuusen' },
    'church': { gen: 'kirkon' },
    'cinnamon-roll': { gen: 'korvapuustin' },
    'circle': { gen: 'ympyrän' },
    'clementine': { gen: 'klementiinin' },
    'clock': { gen: 'kellon' },
    'closet': { gen: 'vaatekaapin' },
    'cloud': { gen: 'pilven' },
    'clover': { gen: 'apilan' },
    'clownfish': { gen: 'vuokkokalan' },
    'coach': { gen: 'valmentajan' },
    'coat': { gen: 'takin' },
    'cobra': { gen: 'kobran' },
    'cockatiel': { gen: 'neitokakadun' },
    'cocktail': { gen: 'cocktailin' },
    'coconut': { gen: 'kookospähkinän' },
    'coconut-tree': { gen: 'kookospalmun' },
    'coffee-carafe': { gen: 'kahvipannun' },
    'coffee-mug': { gen: 'kahvimukin' },
    'coffee-table': { gen: 'sohvapöydän' },
    'colander': { gen: 'siivilän' },
    'columbine': { gen: 'akileijan' },
    'comb': { gen: 'kamman' },
    'comet': { gen: 'komeetan' },
    'compass': { gen: 'kompassin' },
    'computer': { gen: 'tietokoneen' },
    'computer-keyboard': { gen: 'tietokonenäppäimistön' },
    'cone': { gen: 'kartion' },
    'construction-worker': { gen: 'rakennustyöntekijän' },
    'controller': { gen: 'ohjaimen' },
    'conversation-heart': { gen: 'karkkisydämen' },
    'cook': { gen: 'kokin' },
    'cookie': { gen: 'keksin' },
    'cookie-cutter': { gen: 'keksileikkurin' },
    'cookie-sheet': { gen: 'leivinpellin' },
    'cookies': { gen: 'keksien', pt: true },
    'cooler': { gen: 'kylmälaukun' },
    'coral': { gen: 'korallin' },
    'corn': { gen: 'maissin' },
    'cornflower': { gen: 'ruiskaunokin' },
    'couch': { gen: 'sohvan' },
    'cow': { gen: 'lehmän' },
    'crab': { gen: 'ravun' },
    'cranberry': { gen: 'karpalon' },
    'crane': { gen: 'kurjen' },
    'crayon': { gen: 'vahaliidun' },
    'crayons': { gen: 'värikynien', pt: true },
    'crib': { gen: 'pinnasängyn' },
    'cricket': { gen: 'sirkan' },
    'crocodile': { gen: 'krokotiilin' },
    'crocus': { gen: 'krookuksen' },
    'croissant': { gen: 'croissantin' },
    'cross': { gen: 'ristin' },
    'crossing-guard': { gen: 'liikenteenohjaajan' },
    'crow': { gen: 'variksen' },
    'crown': { gen: 'kruunun' },
    'cruise-ship': { gen: 'risteilyaluksen' },
    'crutches': { gen: 'kainalosauvojen', pt: true },
    'cube': { gen: 'kuution' },
    'cuckoo-clock': { gen: 'käkikellon' },
    'cucumber': { gen: 'kurkun' },
    'cup': { gen: 'kupin' },
    'cupcake': { gen: 'kuppikakun' },
    'curtain': { gen: 'verhon' },
    'curtains': { gen: 'verhojen', pt: true },
    'cushion': { gen: 'tyynyn' },
    'cutting-board': { gen: 'leikkuulaudan' },
    'cylinder': { gen: 'sylinterin' },
    'cymbals': { gen: 'symbaalien', pt: true },
    'cypress-tree': { gen: 'sypressin' },
    'daffodil': { gen: 'narsissin' },
    'dahlia': { gen: 'daalian' },
    'dandelion': { gen: 'voikukan' },
    'dart': { gen: 'tikan' },
    'deck-chair': { gen: 'aurinkotuolin' },
    'deer': { gen: 'peuran' },
    'deinonychus': { gen: 'deinonychuksen' },
    'delivery-driver': { gen: 'kuljettajan' },
    'delivery-truck': { gen: 'jakeluauton' },
    'desk': { gen: 'työpöydän' },
    'desk-lamp': { gen: 'työpöytälampun' },
    'detective': { gen: 'etsivän' },
    'diamond': { gen: 'vinoneliön' },
    'dice': { gen: 'noppien', pt: true },
    'dimetrodon': { gen: 'dimetrodonin' },
    'dinosaur': { gen: 'dinosauruksen' },
    'diplodocus': { gen: 'diplodocuksen' },
    'dishwasher': { gen: 'astianpesukoneen' },
    'doctor': { gen: 'lääkärin' },
    'dog': { gen: 'koiran' },
    'dogwood-tree': { gen: 'kanukan' },
    'doll': { gen: 'nuken' },
    'dolphin': { gen: 'delfiinin' },
    'domino': { gen: 'dominon' },
    'donkey': { gen: 'aasin' },
    'donut': { gen: 'donitsin' },
    'door': { gen: 'oven' },
    'double-decker-bus': { gen: 'kaksikerrosbussin' },
    'doughnut': { gen: 'donitsin' },
    'dove': { gen: 'kyyhkyn' },
    'dragon': { gen: 'lohikäärmeen' },
    'dragon-fruit': { gen: 'lohikäärmehedelmän' },
    'dragonfly': { gen: 'sudenkorennon' },
    'dress': { gen: 'mekon' },
    'dresser': { gen: 'lipaston' },
    'driftwood': { gen: 'ajopuun' },
    'droplet': { gen: 'pisaran' },
    'drum': { gen: 'rummun' },
    'drumstick': { gen: 'kanankoiven' },
    'dryer': { gen: 'kuivausrummun' },
    'duck': { gen: 'ankan' },
    'duckling': { gen: 'ankanpoikasen' },
    'dumbbell': { gen: 'käsipainon' },
    'dump-truck': { gen: 'kippiauton' },
    'durian': { gen: 'durion' },
    'dustpan': { gen: 'rikkalapion' },
    'eagle': { gen: 'kotkan' },
    'ear': { gen: 'korvan' },
    'earth': { gen: 'maan' },
    'earthworm': { gen: 'kastemadon' },
    'easter-egg': { gen: 'pääsiäismunan' },
    'eclair': { gen: 'tuulihatun' },
    'egg': { gen: 'munan' },
    'eggplant': { gen: 'munakoison' },
    'eight-ball': { gen: 'kahdeksanpallon' },
    'elbow': { gen: 'kyynärpään' },
    'electric-drill': { gen: 'sähköporan' },
    'electric-kettle': { gen: 'vedenkeittimen' },
    'elephant': { gen: 'norsun' },
    'elf': { gen: 'tontun' },
    'elm-tree': { gen: 'jalavan' },
    'envelope': { gen: 'kirjekuoren' },
    'eraser': { gen: 'pyyhekumin' },
    'erlenmeyer-flask': { gen: 'erlenmeyerpullon' },
    'espresso-machine': { gen: 'espressokoneen' },
    'excavator': { gen: 'kaivinkoneen' },
    'extension-cord': { gen: 'jatkojohdon' },
    'eye': { gen: 'silmän' },
    'eyebrow': { gen: 'kulmakarvan' },
    'eyelashes': { gen: 'silmäripsien', pt: true },
    'face': { gen: 'kasvojen', pt: true },
    'face-mask': { gen: 'kasvomaskin' },
    'falcon': { gen: 'haukan' },
    'family': { gen: 'perheen' },
    'fan': { gen: 'tuulettimen' },
    'farmer': { gen: 'maanviljelijän' },
    'father': { gen: 'isän' },
    'faucet': { gen: 'hanan' },
    'feather': { gen: 'höyhenen' },
    'fence': { gen: 'aidan' },
    'ferret': { gen: 'fretin' },
    'ferry': { gen: 'lautan' },
    'fig': { gen: 'viikunan' },
    'filing-cabinet': { gen: 'arkistokaapin' },
    'finch': { gen: 'peipon' },
    'finger': { gen: 'sormen' },
    'fir-tree': { gen: 'pihdan' },
    'fire-truck': { gen: 'paloauton' },
    'firefighter': { gen: 'palomiehen' },
    'firefly': { gen: 'tulikärpäsen' },
    'fireplace': { gen: 'takan' },
    'fish': { gen: 'kalan' },
    'fishbowl': { gen: 'kala-akvaarion' },
    'fishing-rod': { gen: 'onkivavan' },
    'flag': { gen: 'lipun' },
    'flamingo': { gen: 'flamingon' },
    'flashlight': { gen: 'taskulampun' },
    'flight-attendant': { gen: 'lentoemännän' },
    'flip-flops': { gen: 'varvassandaalien', pt: true },
    'flipper': { gen: 'räpylän' },
    'floor-lamp': { gen: 'jalkalampun' },
    'florist': { gen: 'kukkakauppiaan' },
    'flower': { gen: 'kukan' },
    'flute': { gen: 'huilun' },
    'foal': { gen: 'varsan' },
    'folder': { gen: 'kansion' },
    'food': { gen: 'ruoan' },
    'foot': { gen: 'jalan' },
    'football': { gen: 'amerikkalaisen jalkapallon' },
    'forehead': { gen: 'otsan' },
    'forest': { gen: 'metsän' },
    'forget-me-not': { gen: 'lemmikin' },
    'fork': { gen: 'haarukan' },
    'forklift': { gen: 'trukin' },
    'forsythia': { gen: 'onnenpensaan' },
    'fox': { gen: 'ketun' },
    'french-fries': { gen: 'ranskalaisten', pt: true },
    'fridge': { gen: 'jääkaapin' },
    'fried-chicken': { gen: 'paistetun kanan' },
    'fried-egg': { gen: 'paistetun munan' },
    'frisbee': { gen: 'frisbeen' },
    'frog': { gen: 'sammakon' },
    'frying-pan': { gen: 'paistinpannun' },
    'galaxy': { gen: 'galaksin' },
    'garage': { gen: 'autotallin' },
    'garbage-truck': { gen: 'jäteauton' },
    'garden': { gen: 'puutarhan' },
    'garden-fork': { gen: 'puutarhahangon' },
    'gardener': { gen: 'puutarhurin' },
    'garland': { gen: 'köynnöksen' },
    'garlic': { gen: 'valkosipulin' },
    'gas-pump': { gen: 'bensiinipumpun' },
    'gate': { gen: 'portin' },
    'gazelle': { gen: 'gasellin' },
    'gecko': { gen: 'gekon' },
    'gerbil': { gen: 'gerbiilin' },
    'ghost': { gen: 'kummituksen' },
    'gift': { gen: 'lahjan' },
    'gift-box': { gen: 'lahjapaketin' },
    'giganotosaurus': { gen: 'giganotosauruksen' },
    'gingerbread': { gen: 'piparkakun' },
    'gingerbread-house': { gen: 'piparkakkutalon' },
    'giraffe': { gen: 'kirahvin' },
    'girl': { gen: 'tytön' },
    'glass': { gen: 'lasin' },
    'glasses': { gen: 'silmälasien', pt: true },
    'globe': { gen: 'maapallon' },
    'glove': { gen: 'hansikkaan' },
    'gloves': { gen: 'käsineiden', pt: true },
    'glue': { gen: 'liiman' },
    'goat': { gen: 'vuohen' },
    'goggles': { gen: 'suojalasien', pt: true },
    'goldfish': { gen: 'kultakalan' },
    'goose': { gen: 'hanhen' },
    'gorilla': { gen: 'gorillan' },
    'graduation-cap': { gen: 'ylioppilaslakin' },
    'grandfather': { gen: 'isoisän' },
    'grandmother': { gen: 'isoäidin' },
    'grapefruit': { gen: 'greipin' },
    'grapes': { gen: 'viinirypäleiden', pt: true },
    'grass': { gen: 'ruohon' },
    'grasshopper': { gen: 'heinäsirkan' },
    'grater': { gen: 'raastimen' },
    'green-beans': { gen: 'vihreiden papujen', pt: true },
    'greeting-card': { gen: 'onnittelukortin' },
    'grill': { gen: 'grillin' },
    'guinea-pig': { gen: 'marsun' },
    'guitar': { gen: 'kitaran' },
    'hair': { gen: 'hiusten', pt: true },
    'hair-tie': { gen: 'hiuslenkin' },
    'ham': { gen: 'kinkun' },
    'hamburger': { gen: 'hampurilaisen' },
    'hammer': { gen: 'vasaran' },
    'hammock': { gen: 'riippumaton' },
    'hamster': { gen: 'hamsterin' },
    'hand': { gen: 'käden' },
    'handbag': { gen: 'käsilaukun' },
    'handsaw': { gen: 'käsisahan' },
    'hanger': { gen: 'vaateripustimen' },
    'harp': { gen: 'harpun' },
    'harvest': { gen: 'sadon' },
    'hat': { gen: 'hatun' },
    'hawk': { gen: 'haukan' },
    'hay': { gen: 'heinän' },
    'haystack': { gen: 'heinäsuovan' },
    'head': { gen: 'pään' },
    'headband': { gen: 'hiuspannan' },
    'heart': { gen: 'sydämen' },
    'heart-monitor': { gen: 'sydänmonitorin' },
    'heater': { gen: 'lämmittimen' },
    'hedgehog': { gen: 'siilin' },
    'heel': { gen: 'kantapään' },
    'helicopter': { gen: 'helikopterin' },
    'helmet': { gen: 'kypärän' },
    'hemlock-tree': { gen: 'hemlokin' },
    'hen': { gen: 'kanan' },
    'heptagon': { gen: 'seitsenkulmion' },
    'hermit-crab': { gen: 'erakkoravun' },
    'heron': { gen: 'haikaran' },
    'hexagon': { gen: 'kuusikulmion' },
    'hibiscus': { gen: 'hibiskuksen' },
    'high-heeled-shoes': { gen: 'korkokenkien', pt: true },
    'hippopotamus': { gen: 'virtahevon' },
    'honey': { gen: 'hunajan' },
    'hoodie': { gen: 'hupparin' },
    'hornbill': { gen: 'sarvinokkalinnun' },
    'horse': { gen: 'hevosen' },
    'hose': { gen: 'letkun' },
    'hospital-bed': { gen: 'sairaalasängyn' },
    'hospital-gown': { gen: 'sairaalatakin' },
    'hot-air-balloon': { gen: 'kuumailmapallon' },
    'hot-cocoa': { gen: 'kaakaon' },
    'hot-dog': { gen: 'hodarin' },
    'hotel': { gen: 'hotellin' },
    'house': { gen: 'talon' },
    'human-torso': { gen: 'ihmisen vartalon' },
    'hummingbird': { gen: 'kolibrin' },
    'hydrangea': { gen: 'hortensian' },
    'hyena': { gen: 'hyeenan' },
    'ice': { gen: 'jään' },
    'ice-cream': { gen: 'jäätelön' },
    'ice-cream-truck': { gen: 'jäätelöauton' },
    'ice-pop': { gen: 'mehujään' },
    'ice-skate': { gen: 'luistimen' },
    'ice-skates': { gen: 'luistimien', pt: true },
    'ichthyosaurus': { gen: 'ichthyosauruksen' },
    'icicle': { gen: 'jääpuikon' },
    'igloo': { gen: 'iglun' },
    'iguana': { gen: 'iguaanin' },
    'iguanodon': { gen: 'iguanodonin' },
    'inflatable-ring': { gen: 'uimarenkaan' },
    'iron': { gen: 'silitysraudan' },
    'ironing-board': { gen: 'silityslaudan' },
    'island': { gen: 'saaren' },
    'jacket': { gen: 'takin' },
    'jaguar': { gen: 'jaguaarin' },
    'jam': { gen: 'hillon' },
    'janitor': { gen: 'talonmiehen' },
    'jar': { gen: 'purkin' },
    'jasmine': { gen: 'jasmiinin' },
    'jeans': { gen: 'farkkujen', pt: true },
    'jeep': { gen: 'maasturin' },
    'jelly-beans': { gen: 'hyytelökarkkien', pt: true },
    'jellyfish': { gen: 'meduusan' },
    'jet': { gen: 'suihkukoneen' },
    'judge': { gen: 'tuomarin' },
    'jug': { gen: 'kannun' },
    'juice': { gen: 'mehun' },
    'juice-box': { gen: 'mehupakkauksen' },
    'jump-rope': { gen: 'hyppynarun' },
    'jumpsuit': { gen: 'haalarin' },
    'juniper-tree': { gen: 'katajan' },
    'jupiter': { gen: 'Jupiterin' },
    'kangaroo': { gen: 'kengurun' },
    'kayak': { gen: 'kajakin' },
    'kettle': { gen: 'vedenkeittimen' },
    'kettlebell': { gen: 'kahvakuulan' },
    'key': { gen: 'avaimen' },
    'keyboard': { gen: 'koskettimien', pt: true },
    'kingfisher': { gen: 'kuningaskalastajan' },
    'kitchen': { gen: 'keittiön' },
    'kitchen-scale': { gen: 'keittiövaa\'an' },
    'kite': { gen: 'leijan' },
    'kiwi': { gen: 'kiivin' },
    'knee': { gen: 'polven' },
    'knife': { gen: 'veitsen' },
    'koala': { gen: 'koalan' },
    'komodo-dragon': { gen: 'komodonvaraanin' },
    'ladder': { gen: 'tikkaiden', pt: true },
    'ladle': { gen: 'kauhan' },
    'ladybug': { gen: 'leppäkertun' },
    'lake': { gen: 'järven' },
    'lamb': { gen: 'karitsan' },
    'lamp': { gen: 'lampun' },
    'lantern': { gen: 'lyhdyn' },
    'laundry-basket': { gen: 'pyykkikorin' },
    'lavender': { gen: 'laventelin' },
    'lawn-mower': { gen: 'ruohonleikkurin' },
    'layer-cake': { gen: 'kerroskakun' },
    'leaf': { gen: 'lehden' },
    'leek': { gen: 'purjon' },
    'leg': { gen: 'säären' },
    'leggings': { gen: 'legginsien', pt: true },
    'lego': { gen: 'legon' },
    'lemon': { gen: 'sitruunan' },
    'lemon-tree': { gen: 'sitruunapuun' },
    'lemonade': { gen: 'limonadin' },
    'lemur': { gen: 'makin' },
    'leopard': { gen: 'leopardin' },
    'letter': { gen: 'kirjeen' },
    'lettuce': { gen: 'salaatin' },
    'librarian': { gen: 'kirjastonhoitajan' },
    'lid': { gen: 'kannen' },
    'life-jacket': { gen: 'pelastusliivin' },
    'life-preserver': { gen: 'pelastusrenkaan' },
    'lifeguard': { gen: 'hengenpelastajan' },
    'lifeguard-tower': { gen: 'hengenpelastajan tornin' },
    'light': { gen: 'valon' },
    'light-bulb': { gen: 'hehkulampun' },
    'light-switch': { gen: 'valokatkaisimen' },
    'lighthouse': { gen: 'majakan' },
    'lightning': { gen: 'salaman' },
    'lights': { gen: 'valojen', pt: true },
    'lilac': { gen: 'syreenin' },
    'lily': { gen: 'liljan' },
    'lime': { gen: 'limetin' },
    'lion': { gen: 'leijonan' },
    'lip': { gen: 'huulen' },
    'lizard': { gen: 'liskon' },
    'llama': { gen: 'laaman' },
    'loader': { gen: 'pyöräkuormaajan' },
    'lobster': { gen: 'hummerin' },
    'lock': { gen: 'lukon' },
    'log': { gen: 'halon' },
    'log-cabin': { gen: 'hirsimökin' },
    'lollipop': { gen: 'tikkarin' },
    'lotus': { gen: 'lootuksen' },
    'lounge-chair': { gen: 'aurinkotuolin' },
    'lounger': { gen: 'aurinkotuolin' },
    'love-letter': { gen: 'rakkauskirjeen' },
    'love-note': { gen: 'rakkauskirjeen' },
    'lunchbox': { gen: 'eväslaatikon' },
    'macaron': { gen: 'macaronin' },
    'macaw': { gen: 'aran' },
    'magnifying-glass': { gen: 'suurennuslasin' },
    'magpie': { gen: 'harakan' },
    'maiasaura': { gen: 'maiasauran' },
    'mail-carrier': { gen: 'postinkantajan' },
    'mail-truck': { gen: 'postiauton' },
    'mailbox': { gen: 'postilaatikon' },
    'manatee': { gen: 'manaatin' },
    'mango': { gen: 'mangon' },
    'map': { gen: 'kartan' },
    'maple-tree': { gen: 'vaahteran' },
    'marigold': { gen: 'kehäkukan' },
    'marker': { gen: 'tussin' },
    'mars': { gen: 'Marsin' },
    'mask': { gen: 'naamion' },
    'measuring-cup': { gen: 'mittakannun' },
    'mechanic': { gen: 'mekaanikon' },
    'medal': { gen: 'mitalin' },
    'medical-chart': { gen: 'potilaskertomuksen' },
    'medical-gloves': { gen: 'lääkärin hanskojen', pt: true },
    'medicine': { gen: 'lääkkeen' },
    'melon': { gen: 'melonin' },
    'mercury': { gen: 'Merkuriuksen' },
    'meteor': { gen: 'meteorin' },
    'microphone': { gen: 'mikrofonin' },
    'microscope': { gen: 'mikroskoopin' },
    'microwave': { gen: 'mikroaaltouunin' },
    'milk': { gen: 'maidon' },
    'milkshake': { gen: 'pirtelön' },
    'millipede': { gen: 'tuhatjalkaisen' },
    'minibus': { gen: 'pikkubussin' },
    'mirror': { gen: 'peilin' },
    'mistletoe': { gen: 'mistelin' },
    'mitten': { gen: 'kintaan' },
    'mittens': { gen: 'lapasten', pt: true },
    'mixer': { gen: 'sähkövatkaimen' },
    'monkey': { gen: 'apinan' },
    'monster-truck': { gen: 'monsteriauton' },
    'moon': { gen: 'kuun' },
    'moose': { gen: 'hirven' },
    'mop': { gen: 'mopin' },
    'morning-glory': { gen: 'purppurakierron' },
    'mortar-and-pestle': { gen: 'huhmareen' },
    'mosasaurus': { gen: 'mosasauruksen' },
    'mosquito': { gen: 'hyttysen' },
    'mother': { gen: 'äidin' },
    'motorcycle': { gen: 'moottoripyörän' },
    'mountain': { gen: 'vuoren' },
    'mouse': { gen: 'hiiren' },
    'mouth': { gen: 'suun' },
    'muffin': { gen: 'muffinin' },
    'muffin-tin': { gen: 'muffinivuoan' },
    'mug': { gen: 'mukin' },
    'muscles': { gen: 'lihasten', pt: true },
    'museum': { gen: 'museon' },
    'mushroom': { gen: 'sienen' },
    'musical-note': { gen: 'nuotin' },
    'musician': { gen: 'muusikon' },
    'nail': { gen: 'kynnen' },
    'narwhal': { gen: 'sarvivalaan' },
    'native-american': { gen: 'intiaanin' },
    'nativity': { gen: 'jouluseimen' },
    'neck': { gen: 'kaulan' },
    'necklace': { gen: 'kaulakorun' },
    'necktie': { gen: 'solmion' },
    'nectarine': { gen: 'nektariinin' },
    'neptune': { gen: 'Neptunuksen' },
    'nest': { gen: 'pesän' },
    'net': { gen: 'verkon' },
    'nightstand': { gen: 'yöpöydän' },
    'nose': { gen: 'nenän' },
    'notebook': { gen: 'vihon' },
    'nurse': { gen: 'sairaanhoitajan' },
    'nut': { gen: 'mutterin' },
    'nutcracker': { gen: 'pähkinänsärkijän' },
    'oak-tree': { gen: 'tammen' },
    'oar': { gen: 'airon' },
    'oatmeal': { gen: 'kaurapuuron' },
    'octagon': { gen: 'kahdeksankulmion' },
    'octopus': { gen: 'mustekalan' },
    'office-worker': { gen: 'toimistotyöntekijän' },
    'oil': { gen: 'öljyn' },
    'onion': { gen: 'sipulin' },
    'orange': { gen: 'appelsiinin' },
    'orange-tree': { gen: 'appelsiinipuun' },
    'orangutan': { gen: 'orangin' },
    'orca': { gen: 'miekkavalaan' },
    'orchard': { gen: 'hedelmätarhan' },
    'orchid': { gen: 'orkidean' },
    'ornament': { gen: 'joulupallon' },
    'ostrich': { gen: 'strutsin' },
    'otter': { gen: 'saukon' },
    'ottoman': { gen: 'rahin' },
    'outlet': { gen: 'pistorasian' },
    'oval': { gen: 'soikion' },
    'oven': { gen: 'uunin' },
    'oven-mitt': { gen: 'patakintaan' },
    'overalls': { gen: 'haalareiden', pt: true },
    'oviraptor': { gen: 'oviraptorin' },
    'owl': { gen: 'pöllön' },
    'ox': { gen: 'härän' },
    'oyster': { gen: 'osterin' },
    'pachycephalosaurus': { gen: 'pachycephalosauruksen' },
    'package': { gen: 'paketin' },
    'padlock': { gen: 'riippulukon' },
    'paint-brush': { gen: 'maalipensselin' },
    'paint-roller': { gen: 'maalitelan' },
    'paintbrush': { gen: 'siveltimen' },
    'painting': { gen: 'maalauksen' },
    'pajamas': { gen: 'pyjaman' },
    'palette': { gen: 'paletin' },
    'palm-tree': { gen: 'palmun' },
    'pan': { gen: 'pannun' },
    'pancake': { gen: 'pannukakun' },
    'panda': { gen: 'pandan' },
    'pants': { gen: 'housujen', pt: true },
    'papaya': { gen: 'papaijan' },
    'paper': { gen: 'paperin' },
    'paper-airplane': { gen: 'paperilennokin' },
    'parallelogram': { gen: 'suunnikkaan' },
    'paramedic': { gen: 'ensihoitajan' },
    'parasaurolophus': { gen: 'parasaurolophuksen' },
    'parasol': { gen: 'aurinkovarjon' },
    'park-ranger': { gen: 'metsänvartijan' },
    'parrot': { gen: 'papukaijan' },
    'parsnip': { gen: 'palsternakan' },
    'party-hat': { gen: 'juhlahatun' },
    'passport': { gen: 'passin' },
    'pasta': { gen: 'pastan' },
    'pea': { gen: 'herneen' },
    'peach': { gen: 'persikan' },
    'peach-tree': { gen: 'persikkapuun' },
    'peacock': { gen: 'riikinkukon' },
    'peanut-butter': { gen: 'maapähkinävoin' },
    'pear': { gen: 'päärynän' },
    'pear-tree': { gen: 'päärynäpuun' },
    'peas': { gen: 'herneiden', pt: true },
    'peeler': { gen: 'kuorimaveitsen' },
    'pegasus': { gen: 'pegasoksen' },
    'pelican': { gen: 'pelikaanin' },
    'pen': { gen: 'kynän' },
    'pencil': { gen: 'lyijykynän' },
    'penguin': { gen: 'pingviinin' },
    'pentagon': { gen: 'viisikulmion' },
    'peony': { gen: 'pionin' },
    'pepper': { gen: 'paprikan' },
    'perfume': { gen: 'hajuveden' },
    'persimmon': { gen: 'persimonin' },
    'petunia': { gen: 'petunian' },
    'pharmacist': { gen: 'apteekkarin' },
    'phlox': { gen: 'leimukukan' },
    'photographer': { gen: 'valokuvaajan' },
    'piano': { gen: 'pianon' },
    'pickaxe': { gen: 'hakun' },
    'pickup-truck': { gen: 'avolava-auton' },
    'picnic-table': { gen: 'piknikpöydän' },
    'picture-frame': { gen: 'valokuvakehyksen' },
    'pie': { gen: 'piirakan' },
    'pig': { gen: 'sian' },
    'pigeon': { gen: 'kyyhkysen' },
    'piglet': { gen: 'porsaan' },
    'pillow': { gen: 'tyynyn' },
    'pilot': { gen: 'lentäjän' },
    'pine-tree': { gen: 'männyn' },
    'pineapple': { gen: 'ananaksen' },
    'pinecone': { gen: 'kävyn' },
    'pinwheel': { gen: 'tuulihyrrän' },
    'pipe-wrench': { gen: 'putkipihtien', pt: true },
    'pitcher': { gen: 'kannun' },
    'pizza': { gen: 'pizzan' },
    'planet': { gen: 'planeetan' },
    'plant': { gen: 'kasvin' },
    'plate': { gen: 'lautasen' },
    'playground': { gen: 'leikkikentän' },
    'plesiosaurus': { gen: 'plesiosauruksen' },
    'pliers': { gen: 'pihtien', pt: true },
    'plum': { gen: 'luumun' },
    'plum-tree': { gen: 'luumupuun' },
    'plunger': { gen: 'viemäripumpun' },
    'polar-bear': { gen: 'jääkarhun' },
    'police-car': { gen: 'poliisiauton' },
    'police-officer': { gen: 'poliisin' },
    'pomegranate': { gen: 'granaattiomenan' },
    'pony': { gen: 'ponin' },
    'pool': { gen: 'uima-altaan' },
    'popcorn': { gen: 'popcornin' },
    'poplar-tree': { gen: 'poppelin' },
    'popsicle': { gen: 'mehujään' },
    'porcupine': { gen: 'piikkisian' },
    'porridge': { gen: 'puuron' },
    'post-office': { gen: 'postitoimiston' },
    'postal-scale': { gen: 'postivaa\'an' },
    'pot': { gen: 'kattilan' },
    'potato': { gen: 'perunan' },
    'potato-chips': { gen: 'perunalastujen', pt: true },
    'pottery': { gen: 'keramiikan' },
    'present': { gen: 'lahjan' },
    'pretzel': { gen: 'rinkelin' },
    'price-tag': { gen: 'hintalapun' },
    'projector': { gen: 'projektorin' },
    'pruning-shears': { gen: 'oksasaksien', pt: true },
    'pudding': { gen: 'vanukkaan' },
    'puddle': { gen: 'lätäkön' },
    'pufferfish': { gen: 'pallokalan' },
    'puffin': { gen: 'lunnin' },
    'pumpkin': { gen: 'kurpitsan' },
    'purse': { gen: 'kukkaron' },
    'push-pin': { gen: 'nastan' },
    'puzzle': { gen: 'palapelin' },
    'pyramid': { gen: 'pyramidin' },
    'quail': { gen: 'viiriäisen' },
    'rabbit': { gen: 'kanin' },
    'raccoon': { gen: 'pesukarhun' },
    'race-car': { gen: 'kilpa-auton' },
    'radish': { gen: 'retiisin' },
    'rain': { gen: 'sateen' },
    'rain-boots': { gen: 'kumisaappaiden', pt: true },
    'rainbow': { gen: 'sateenkaaren' },
    'raincoat': { gen: 'sadetakin' },
    'raindrop': { gen: 'sadepisaran' },
    'rake': { gen: 'haravan' },
    'raspberry': { gen: 'vadelman' },
    'ray': { gen: 'rauskun' },
    'rectangle': { gen: 'suorakulmion' },
    'rectangular-box': { gen: 'suorakulmaisen särmiön' },
    'redwood-tree': { gen: 'punapuun' },
    'refrigerator': { gen: 'jääkaapin' },
    'reindeer': { gen: 'poron' },
    'rhino': { gen: 'sarvikuonon' },
    'rhinoceros': { gen: 'sarvikuonon' },
    'ribbon': { gen: 'nauhan' },
    'rice': { gen: 'riisin' },
    'ring': { gen: 'sormuksen' },
    'river': { gen: 'joen' },
    'roasted-turkey': { gen: 'paistetun kalkkunan' },
    'robin': { gen: 'punarinnan' },
    'robot': { gen: 'robotin' },
    'rock': { gen: 'kallion' },
    'rocket': { gen: 'raketin' },
    'rocking-chair': { gen: 'keinutuolin' },
    'rocking-horse': { gen: 'keinuhevosen' },
    'rollerblade': { gen: 'rullaluistimen' },
    'rolling-pin': { gen: 'kaulimen' },
    'rooster': { gen: 'kukon' },
    'rope': { gen: 'köyden' },
    'rose': { gen: 'ruusun' },
    'rosette': { gen: 'ruusukkeen' },
    'rubber-boot': { gen: 'kumisaappaan' },
    'rudolph': { gen: 'Rudolfin' },
    'rug': { gen: 'maton' },
    'ruler': { gen: 'viivaimen' },
    'sack': { gen: 'säkin' },
    'sailboat': { gen: 'purjeveneen' },
    'salad': { gen: 'salaatin' },
    'salamander': { gen: 'salamanterin' },
    'salt': { gen: 'suolan' },
    'salt-shaker': { gen: 'suolasirottimen' },
    'sand': { gen: 'hiekan' },
    'sandals': { gen: 'sandaalien', pt: true },
    'sandbox': { gen: 'hiekkalaatikon' },
    'sandcastle': { gen: 'hiekkalinnan' },
    'sandwich': { gen: 'voileivän' },
    'sanitation-worker': { gen: 'jätehuoltotyöntekijän' },
    'santa': { gen: 'joulupukin' },
    'santa-claus': { gen: 'joulupukin' },
    'santa-hat': { gen: 'tonttulakin' },
    'satellite': { gen: 'satelliitin' },
    'saturn': { gen: 'Saturnuksen' },
    'sauce': { gen: 'kastikkeen' },
    'saucepan': { gen: 'kattilan' },
    'sausage': { gen: 'makkaran' },
    'saxophone': { gen: 'saksofonin' },
    'scale': { gen: 'vaa\'an' },
    'scallop': { gen: 'kampasimpukan' },
    'scarecrow': { gen: 'linnunpelättimen' },
    'scarf': { gen: 'huivin' },
    'school-bus': { gen: 'koulubussin' },
    'scissors': { gen: 'saksien', pt: true },
    'scooter': { gen: 'potkulaudan' },
    'screw': { gen: 'ruuvin' },
    'screwdriver': { gen: 'ruuvimeisselin' },
    'scrubs': { gen: 'hoitajan asun' },
    'sea-horse': { gen: 'merihevosen' },
    'sea-lion': { gen: 'merileijonan' },
    'sea-snail': { gen: 'merikotilon' },
    'sea-turtle': { gen: 'merikilpikonnan' },
    'seagull': { gen: 'lokin' },
    'seahorse': { gen: 'merihevosen' },
    'seal': { gen: 'hylkeen' },
    'seashell': { gen: 'simpukan' },
    'seaweed': { gen: 'merilevän' },
    'sequoia-tree': { gen: 'jättiläispunapuun' },
    'sewing-machine': { gen: 'ompelukoneen' },
    'shampoo': { gen: 'shampoon' },
    'shark': { gen: 'hain' },
    'sheep': { gen: 'lampaan' },
    'shelf': { gen: 'hyllyn' },
    'ship': { gen: 'laivan' },
    'shirt': { gen: 'paidan' },
    'shoe': { gen: 'kengän' },
    'shoes': { gen: 'kenkien', pt: true },
    'shopping-bag': { gen: 'ostoskassin' },
    'shopping-cart': { gen: 'ostoskärryn' },
    'shorts': { gen: 'shortsien', pt: true },
    'shoulder': { gen: 'olkapään' },
    'shovel': { gen: 'lapion' },
    'shrimp': { gen: 'katkaravun' },
    'shuttlecock': { gen: 'sulkapallon' },
    'sickle': { gen: 'sirpin' },
    'signpost': { gen: 'opastekyltin' },
    'singer': { gen: 'laulajan' },
    'sink': { gen: 'pesualtaan' },
    'sister': { gen: 'siskon' },
    'skateboard': { gen: 'rullalaudan' },
    'skeleton': { gen: 'luurangon' },
    'skirt': { gen: 'hameen' },
    'sky': { gen: 'taivaan' },
    'sled': { gen: 'kelkan' },
    'sleeping-bag': { gen: 'makuupussin' },
    'sleigh': { gen: 'reen' },
    'slide': { gen: 'liukumäen' },
    'slippers': { gen: 'tohvelien', pt: true },
    'sloth': { gen: 'laiskiaisen' },
    'slug': { gen: 'etanan' },
    'smartphone': { gen: 'älypuhelimen' },
    'smartwatch': { gen: 'älykellon' },
    'smoothie': { gen: 'smoothien' },
    'snail': { gen: 'etanan' },
    'snake': { gen: 'käärmeen' },
    'sneaker': { gen: 'lenkkareiden', pt: true },
    'sneakers': { gen: 'lenkkareiden', pt: true },
    'snorkel': { gen: 'snorkkelin' },
    'snow-boots': { gen: 'lumikenkien', pt: true },
    'snow-globe': { gen: 'lumipallon' },
    'snow-shovel': { gen: 'lumikolan' },
    'snowdrop': { gen: 'lumikellon' },
    'snowflake': { gen: 'lumihiutaleen' },
    'snowman': { gen: 'lumiukon' },
    'snowsuit': { gen: 'toppahaalarin' },
    'soccer': { gen: 'jalkapallon' },
    'soccer-ball': { gen: 'jalkapallon' },
    'sock': { gen: 'sukan' },
    'soda': { gen: 'limonadin' },
    'sofa': { gen: 'sohvan' },
    'soup': { gen: 'keiton' },
    'spade': { gen: 'lapion' },
    'sparrow': { gen: 'varpusen' },
    'spatula': { gen: 'lastan' },
    'speaker': { gen: 'kaiuttimen' },
    'sphere': { gen: 'pallon' },
    'spider': { gen: 'hämähäkin' },
    'spinach': { gen: 'pinaatin' },
    'spinning-top': { gen: 'hyrrän' },
    'spirit-level': { gen: 'vesivaa\'an' },
    'sponge': { gen: 'sienen' },
    'spoon': { gen: 'lusikan' },
    'spray': { gen: 'suihkepullon' },
    'spruce-tree': { gen: 'kuusen' },
    'square': { gen: 'neliön' },
    'squash': { gen: 'kesäkurpitsan' },
    'squid': { gen: 'kalmarin' },
    'squirrel': { gen: 'oravan' },
    'stage': { gen: 'lavan' },
    'stairs': { gen: 'portaiden', pt: true },
    'stamp': { gen: 'leiman' },
    'stapler': { gen: 'nitojan' },
    'star': { gen: 'tähden' },
    'starfish': { gen: 'meritähden' },
    'statue': { gen: 'patsaan' },
    'stegosaurus': { gen: 'stegosauruksen' },
    'stethoscope': { gen: 'stetoskoopin' },
    'stingray': { gen: 'keihäsrauskun' },
    'stocking': { gen: 'joulusukan' },
    'stool': { gen: 'jakkaran' },
    'stopwatch': { gen: 'sekuntikellon' },
    'stork': { gen: 'haikaran' },
    'stove': { gen: 'lieden' },
    'strawberry': { gen: 'mansikan' },
    'stretcher': { gen: 'paarien', pt: true },
    'student': { gen: 'oppilaan' },
    'styracosaurus': { gen: 'styracosauruksen' },
    'submarine': { gen: 'sukellusveneen' },
    'subway': { gen: 'metron' },
    'suitcase': { gen: 'matkalaukun' },
    'sun': { gen: 'auringon' },
    'sun-hat': { gen: 'aurinkohatun' },
    'sundae': { gen: 'jäätelöannoksen' },
    'sunflower': { gen: 'auringonkukan' },
    'sunglasses': { gen: 'aurinkolasien', pt: true },
    'sunrise': { gen: 'auringonnousun' },
    'sunscreen': { gen: 'aurinkovoiteen' },
    'surfboard': { gen: 'surffilaudan' },
    'suspenders': { gen: 'henkselien', pt: true },
    'suv': { gen: 'maastoauton' },
    'swallow': { gen: 'pääskysen' },
    'swan': { gen: 'joutsenen' },
    'sweater': { gen: 'villapaidan' },
    'sweatpants': { gen: 'verkkareiden', pt: true },
    'sweatshirt': { gen: 'collegepaidan' },
    'swimsuit': { gen: 'uimapuvun' },
    'swing': { gen: 'keinun' },
    'swordfish': { gen: 'miekkakalan' },
    'sycamore-tree': { gen: 'plataanin' },
    'syringe': { gen: 'ruiskun' },
    't-rex': { gen: 't-rexin' },
    't-shirt': { gen: 't-paidan' },
    'table': { gen: 'pöydän' },
    'table-lamp': { gen: 'pöytälampun' },
    'tablet': { gen: 'tabletin' },
    'taco': { gen: 'tacon' },
    'tailor': { gen: 'räätälin' },
    'tank': { gen: 'panssarivaunun' },
    'tank-top': { gen: 'topin' },
    'tanker-truck': { gen: 'säiliöauton' },
    'tape': { gen: 'teipin' },
    'tape-measure': { gen: 'mittanauhan' },
    'tart': { gen: 'tortun' },
    'taxi': { gen: 'taksin' },
    'teacher': { gen: 'opettajan' },
    'teacup': { gen: 'teekupin' },
    'teapot': { gen: 'teekannun' },
    'teddy-bear': { gen: 'nallekarhun' },
    'telephone': { gen: 'puhelimen' },
    'telescope': { gen: 'kaukoputken' },
    'television': { gen: 'television' },
    'tennis-ball': { gen: 'tennispallon' },
    'tennis-racket': { gen: 'tennismailan' },
    'tent': { gen: 'teltan' },
    'theater': { gen: 'teatterin' },
    'therizinosaurus': { gen: 'therizinosauruksen' },
    'thermometer': { gen: 'lämpömittarin' },
    'thumb': { gen: 'peukalon' },
    'thunderstorm': { gen: 'ukkosen' },
    'tiara': { gen: 'tiaran' },
    'ticket': { gen: 'lipun' },
    'tie': { gen: 'solmion' },
    'tiger': { gen: 'tiikerin' },
    'tights': { gen: 'sukkahousujen', pt: true },
    'timer': { gen: 'ajastimen' },
    'tissue': { gen: 'nenäliinan' },
    'toad': { gen: 'rupikonnan' },
    'toast': { gen: 'paahtoleivän' },
    'toaster': { gen: 'leivänpaahtimen' },
    'toe': { gen: 'varpaan' },
    'toilet': { gen: 'wc:n' },
    'toilet-paper': { gen: 'wc-paperin' },
    'tomato': { gen: 'tomaatin' },
    'tongs': { gen: 'pihtien', pt: true },
    'tongue': { gen: 'kielen' },
    'toolbox': { gen: 'työkalulaatikon' },
    'tooth': { gen: 'hampaan' },
    'toothbrush': { gen: 'hammasharjan' },
    'toothpaste': { gen: 'hammastahnan' },
    'torch': { gen: 'soihdun' },
    'tortoise': { gen: 'kilpikonnan' },
    'tote-bag': { gen: 'kangaskassin' },
    'toucan': { gen: 'tukaanin' },
    'tow-truck': { gen: 'hinausauton' },
    'towel': { gen: 'pyyhkeen' },
    'tractor': { gen: 'traktorin' },
    'traffic-cone': { gen: 'liikennekartion' },
    'trail': { gen: 'polun' },
    'train': { gen: 'junan' },
    'trapezoid': { gen: 'puolisuunnikkaan' },
    'trash-can': { gen: 'roskakorin' },
    'tree': { gen: 'puun' },
    'triangle': { gen: 'kolmion' },
    'triceratops': { gen: 'triceratopsin' },
    'trillium': { gen: 'kolmilehden' },
    'trombone': { gen: 'pasuunan' },
    'trophy': { gen: 'palkinnon' },
    'trousers': { gen: 'housujen', pt: true },
    'trowel': { gen: 'muurauslastan' },
    'truck': { gen: 'kuorma-auton' },
    'truck-driver': { gen: 'rekkakuskin' },
    'trumpet': { gen: 'trumpetin' },
    'tulip': { gen: 'tulppaanin' },
    'tuna': { gen: 'tonnikalan' },
    'turkey': { gen: 'kalkkunan' },
    'turnip': { gen: 'nauriin' },
    'turtle': { gen: 'kilpikonnan' },
    'tyrannosaurus-rex': { gen: 'tyrannosaurus rexin' },
    'ufo': { gen: 'ufon' },
    'umbrella': { gen: 'sateenvarjon' },
    'underpants': { gen: 'alushousujen', pt: true },
    'unicorn': { gen: 'yksisarvisen' },
    'uniform': { gen: 'univormun' },
    'uranus': { gen: 'Uranuksen' },
    'us': { gen: 'USA:n' },
    'vacuum-cleaner': { gen: 'pölynimurin' },
    'van': { gen: 'pakettiauton' },
    'vanity': { gen: 'meikkauspöydän' },
    'vanity-table': { gen: 'meikkauspöydän' },
    'vase': { gen: 'maljakon' },
    'vegetables': { gen: 'vihannesten', pt: true },
    'velociraptor': { gen: 'velociraptorin' },
    'venus': { gen: 'Venuksen' },
    'vest': { gen: 'liivin' },
    'veterinarian': { gen: 'eläinlääkärin' },
    'video-game': { gen: 'videopelin' },
    'violin': { gen: 'viulun' },
    'volleyball': { gen: 'lentopallon' },
    'vulture': { gen: 'korppikotkan' },
    'waffle': { gen: 'vohvelin' },
    'waitress': { gen: 'tarjoilijan' },
    'wallet': { gen: 'lompakon' },
    'walnut-tree': { gen: 'saksanpähkinäpuun' },
    'walrus': { gen: 'mursun' },
    'wand': { gen: 'taikasauvan' },
    'wardrobe': { gen: 'vaatekaapin' },
    'washing-machine': { gen: 'pesukoneen' },
    'wasp': { gen: 'ampiaisen' },
    'watch': { gen: 'rannekellon' },
    'water': { gen: 'veden' },
    'water-bottle': { gen: 'vesipullon' },
    'water-lily': { gen: 'lumpeen' },
    'watering-can': { gen: 'kastelukannun' },
    'watermelon': { gen: 'vesimelonin' },
    'wave': { gen: 'aallon' },
    'weasel': { gen: 'lumikon' },
    'whale': { gen: 'valaan' },
    'wheelbarrow': { gen: 'kottikärryjen', pt: true },
    'wheelchair': { gen: 'pyörätuolin' },
    'whisk': { gen: 'vispilän' },
    'whistle': { gen: 'pillin' },
    'whiteboard': { gen: 'valkotaulun' },
    'windmill': { gen: 'tuulimyllyn' },
    'window': { gen: 'ikkunan' },
    'winter-hat': { gen: 'pipon' },
    'winter-jacket': { gen: 'talvitakin' },
    'wisteria': { gen: 'sinisateen' },
    'wolf': { gen: 'suden' },
    'woodpecker': { gen: 'tikan' },
    'worm': { gen: 'madon' },
    'wreath': { gen: 'seppeleen' },
    'wrench': { gen: 'jakoavaimen' },
    'wrist': { gen: 'ranteen' },
    'x-ray': { gen: 'röntgenkuvan' },
    'xylophone': { gen: 'ksylofonin' },
    'yacht': { gen: 'jahdin' },
    'yak': { gen: 'jakin' },
    'yogurt': { gen: 'jogurtin' },
    'zebra': { gen: 'seepran' },
    'zinnia': { gen: 'zinnian' }
  };

  function fiGenitive(key) {
    return FI_GENITIVES[key] || null;
  }

  // ---------------------------------------------------------------------
  // German weak-noun (n-Deklination) dative singulars, keyed by vocab key —
  // audited by native-de linguists. Nouns not listed keep their nominative
  // (correct for strong nouns).
  // ---------------------------------------------------------------------
  var DE_DATIVE_SG = {
    'architect': 'Architekten',
    'asteroid': 'Asteroiden',
    'astronaut': 'Astronauten',
    'athlete': 'Athleten',
    'bear': 'Bären',
    'beetroot': 'roten Bete',
    'boiled-egg': 'gekochten Ei',
    'boy': 'Jungen',
    'cheetah': 'Geparden',
    'chimpanzee': 'Schimpansen',
    'comet': 'Kometen',
    'conversation-heart': 'Zuckerherzen',
    'crossing-guard': 'Schülerlotsen',
    'dragon': 'Drachen',
    'elephant': 'Elefanten',
    'elf': 'Elfen',
    'falcon': 'Falken',
    'farmer': 'Bauern',
    'finch': 'Finken',
    'florist': 'Floristen',
    'green-beans': 'grünen Bohne',
    'heart': 'Herzen',
    'hot-cocoa': 'heißen Schokolade',
    'human-torso': 'menschlichen Torso',
    'leopard': 'Leoparden',
    'lion': 'Löwen',
    'monkey': 'Affen',
    'native-american': 'indigenen Amerikaner',
    'office-worker': 'Büroangestellten',
    'ox': 'Ochsen',
    'photographer': 'Fotografen',
    'pilot': 'Piloten',
    'planet': 'Planeten',
    'polar-bear': 'Eisbären',
    'police-officer': 'Polizisten',
    'raccoon': 'Waschbären',
    'roasted-turkey': 'gebratenen Truthahn',
    'satellite': 'Satelliten',
    'sea-lion': 'Seelöwen',
    'sparrow': 'Spatzen',
    'teddy-bear': 'Teddybären'
  };

  // German multi-word entries (adjective + noun phrases): the pre-nominal
  // adjective RE-DECLINES by case/determiner, so the stored strong-nominative
  // form cannot be inserted raw. Curated forms below; a de entry containing
  // a space that is NOT in the relevant table is REFUSED (null) — never
  // guessed. (Romance/Scandinavian multi-word entries are safe: their stored
  // forms already agree inside the indefinite frames.)
  var DE_DATIVE_PL = { // "zwischen zwei …" (dative plural)
    'beetroot': 'roten Beten',
    'boiled-egg': 'gekochten Eiern',
    'green-beans': 'grünen Bohnen',
    'hot-cocoa': 'heißen Schokoladen',
    'human-torso': 'menschlichen Torsos',
    'medical-gloves': 'medizinischen Handschuhen',
    'native-american': 'indigenen Amerikanern',
    'roasted-turkey': 'gebratenen Truthähnen'
  };
  var DE_ALLE_FORMS = { // Find-and-Count "alle …" (plural after 'alle')
    'beetroot': 'roten Beten',
    'boiled-egg': 'gekochten Eier',
    'french-fries': 'Pommes frites',
    'green-beans': 'grünen Bohnen',
    'hot-cocoa': 'heißen Schokoladen',
    'human-torso': 'menschlichen Torsos',
    'medical-gloves': 'medizinischen Handschuhe',
    'native-american': 'indigenen Amerikaner',
    'roasted-turkey': 'gebratenen Truthähne'
  };

  var api = {
    LOCALES: LOCALES,
    sentenceCaseNoun: sentenceCaseNoun,
    listJoin: listJoin,
    conjunctionFor: conjunctionFor,
    itDefArticle: itDefArticle,
    itIndefArticle: itIndefArticle,
    itNeedsLoForm: itNeedsLoForm,
    frDe: frDe,
    frIsAspirateH: frIsAspirateH,
    indefArticle: indefArticle,
    deDativePlural: deDativePlural,
    twoWord: twoWord,
    romanceQuantifier: romanceQuantifier,
    findCountInstruction: findCountInstruction,
    howManyQuestion: howManyQuestion,
    howManyShort: howManyShort,
    prepSentence: prepSentence,
    prepDistractorLabels: prepDistractorLabels,
    shapeLandmark: shapeLandmark,
    fiGenitive: fiGenitive,
    SHAPE_NOUNS: SHAPE_NOUNS,
    PREP_FORMS: PREP_FORMS,
    FI_GENITIVES: FI_GENITIVES
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.LCSGrammar = api;
  }
})(typeof window !== 'undefined' ? window : null);
