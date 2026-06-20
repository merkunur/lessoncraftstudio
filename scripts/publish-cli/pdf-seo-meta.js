/**
 * pdf-seo-meta.js — compose PDF-SPECIFIC, printable-intent, localized SEO
 * metadata (/Title, /Subject, /Keywords) for a deck's printable PDF.
 *
 * Why this exists (2026-06-20 PDF-metadata-SEO commission): the printable PDFs
 * are image-only (no text layer), so the /Info metadata is the ONLY text Google
 * can read from them. The prior composer reused the deck.html <title> + meta
 * description verbatim, which (a) duplicated the HTML landing title → cannibalization,
 * (b) carried "interactive / play online" framing wrong for a printable file,
 * (c) leaked raw mode tokens ("Image-Image") and English ("worksheet, K-3") onto
 * non-EN PDFs. This module composes clean, printable-DOWNLOAD-intent, fully
 * localized metadata instead, distinct from the landing title.
 *
 * Keyword patterns are grounded in real per-locale SERP research (printable +
 * free + native worksheet word + level term + "pdf"). sv/da/no/fi strings are
 * framework-credible but [NSR] (native-speaker-review pending per §17.5.1).
 *
 * Anti-cannibalization:
 *   - PDF /Title leads with the download facet ("Printable {Type} Worksheet PDF
 *     – {Theme}, {Level}"), a different head term + word order than the landing's
 *     grade-led title; same long-tail vocab, adjacent intents.
 *   - Per-deck uniqueness from type×theme×level (+ mode qualifier + vocab in the
 *     /Subject). "Set {N}" disambiguator appended when manifest carries variant_id>1.
 *   - Answer-key handled by the caller (appends localized "Answer Key").
 *
 * Pure function of (manifest, locale) → re-runnable / idempotent.
 */
'use strict';

var taxonomy = require('./taxonomy');
var richAlt = require('./deck-rich-alt');

// ---- Short, search-credible level labels (NOT the verbose taxonomy level names) ----
// keyed by [locale][levelAxisKey] where levelAxisKey ∈ preschool/kindergarten/grade-1..3
var LEVEL_LABEL = {
  en: { preschool: 'Preschool', kindergarten: 'Kindergarten', 'grade-1': 'Grade 1', 'grade-2': 'Grade 2', 'grade-3': 'Grade 3' },
  de: { preschool: 'Vorschule', kindergarten: 'Kindergarten', 'grade-1': '1. Klasse', 'grade-2': '2. Klasse', 'grade-3': '3. Klasse' },
  es: { preschool: 'Preescolar', kindergarten: 'Preescolar', 'grade-1': '1.º Primaria', 'grade-2': '2.º Primaria', 'grade-3': '3.º Primaria' },
  pt: { preschool: 'Educação Infantil', kindergarten: 'Educação Infantil', 'grade-1': '1.º ano', 'grade-2': '2.º ano', 'grade-3': '3.º ano' },
  fr: { preschool: 'Maternelle', kindergarten: 'Maternelle GS', 'grade-1': 'CP', 'grade-2': 'CE1', 'grade-3': 'CE2' },
  it: { preschool: 'Infanzia', kindergarten: 'Infanzia', 'grade-1': 'Classe 1ª', 'grade-2': 'Classe 2ª', 'grade-3': 'Classe 3ª' },
  nl: { preschool: 'Peuters', kindergarten: 'Kleuters', 'grade-1': 'Groep 3', 'grade-2': 'Groep 4', 'grade-3': 'Groep 5' },
  sv: { preschool: 'Förskola', kindergarten: 'Förskoleklass', 'grade-1': 'Åk 1', 'grade-2': 'Åk 2', 'grade-3': 'Åk 3' },
  da: { preschool: 'Børnehave', kindergarten: 'Børnehaveklasse', 'grade-1': '1. klasse', 'grade-2': '2. klasse', 'grade-3': '3. klasse' },
  no: { preschool: 'Barnehage (3–4 år)', kindergarten: 'Barnehage (5 år)', 'grade-1': '1. trinn', 'grade-2': '2. trinn', 'grade-3': '3. trinn' },
  fi: { preschool: 'Varhaiskasvatus', kindergarten: 'Esiopetus', 'grade-1': '1. luokka', 'grade-2': '2. luokka', 'grade-3': '3. luokka' }
};

// ---- Per-locale builders: title(p) / subject(p) / keywords(p) ----
// p = { type, qual, theme, level, vocab, setN }
//   type  : localized exercise-type name (e.g. "Addition" / "Suma")
//   qual  : localized mode name or '' (e.g. "Find the Addend") — used only in /Subject
//   theme : localized theme name or '' (e.g. "Animals" / "Tiere")
//   level : short level label from LEVEL_LABEL
//   vocab : localized top-noun phrase or '' (e.g. "cats, dogs and rabbits")
//   setN  : integer >1 or 0
function tail(theme, level) {
  var t = [theme, level].filter(Boolean);
  return t.length ? ' – ' + t.join(', ') : '';
}
function setSuffix(setN, word) { return setN > 1 ? ' (' + word + ' ' + setN + ')' : ''; }
function clause(qual, vocab, joiner) { // optional " — <qual>, <vocab>" style snippet
  var bits = [qual, vocab].filter(Boolean);
  return bits.length ? joiner + bits.join(', ') : '';
}

var PATTERNS = {
  en: {
    title: function (p) { return 'Printable ' + p.type + ' Worksheet PDF' + tail(p.theme, p.level) + setSuffix(p.setN, 'Set'); },
    subject: function (p) {
      var th = p.theme ? ' about ' + p.theme : '';
      var vo = p.vocab ? ' featuring ' + p.vocab : '';
      return 'Printable PDF ' + p.level + ' ' + p.type.toLowerCase() + ' worksheet' + th + vo + '. Free to download and print — no login.';
    },
    keywords: function (p) {
      return [
        'free printable ' + p.type.toLowerCase() + ' worksheets',
        p.level.toLowerCase() + ' ' + p.type.toLowerCase() + ' worksheets pdf',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' worksheet' : null,
        p.type.toLowerCase() + ' worksheet printable pdf',
        p.theme ? p.theme.toLowerCase() + ' worksheet for ' + p.level.toLowerCase() : null,
        'free ' + p.type.toLowerCase() + ' worksheet ' + p.level.toLowerCase()
      ];
    }
  },
  de: {
    title: function (p) { return p.type + '-Arbeitsblatt zum Ausdrucken (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Satz'); },
    subject: function (p) {
      var th = p.theme ? ' zum Thema ' + p.theme : '';
      var vo = p.vocab ? ' mit ' + p.vocab : '';
      return p.level + '-Arbeitsblatt ' + p.type + th + vo + ' als PDF. Kostenlos herunterladen und ausdrucken — ohne Anmeldung.';
    },
    keywords: function (p) {
      return [
        p.type + ' Arbeitsblätter kostenlos',
        p.level + ' ' + p.type + ' Arbeitsblatt PDF',
        p.theme ? p.theme + ' ' + p.type + ' Arbeitsblatt' : null,
        p.type + ' zum Ausdrucken',
        p.theme ? p.theme + ' Arbeitsblatt ' + p.level : null,
        'Arbeitsblatt ' + p.type + ' PDF kostenlos'
      ];
    }
  },
  es: {
    title: function (p) { return 'Ficha de ' + p.type + ' para imprimir (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Set'); },
    subject: function (p) {
      var th = p.theme ? ' con ' + p.theme : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Ficha de ' + p.type + ' en PDF para ' + p.level + th + vo + '. Gratis para descargar e imprimir — sin registro.';
    },
    keywords: function (p) {
      return [
        'fichas de ' + p.type.toLowerCase() + ' para imprimir',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? 'ficha de ' + p.type.toLowerCase() + ' con ' + p.theme.toLowerCase() : null,
        p.type.toLowerCase() + ' imprimible gratis',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' ' + p.level.toLowerCase() : null,
        'ejercicios de ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  pt: {
    title: function (p) { return 'Atividade de ' + p.type + ' para imprimir (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Conjunto'); },
    subject: function (p) {
      var th = p.theme ? ' com ' + p.theme : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Atividade de ' + p.type + ' em PDF para ' + p.level + th + vo + '. Grátis para baixar e imprimir — sem cadastro.';
    },
    keywords: function (p) {
      return [
        'atividades de ' + p.type.toLowerCase() + ' para imprimir',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? 'atividade de ' + p.type.toLowerCase() + ' com ' + p.theme.toLowerCase() : null,
        p.type.toLowerCase() + ' para imprimir grátis',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' ' + p.level.toLowerCase() : null,
        'exercícios de ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  fr: {
    title: function (p) { return 'Fiche ' + p.type.toLowerCase() + ' à imprimer (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Série'); },
    subject: function (p) {
      var th = p.theme ? ' sur le thème ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Fiche ' + p.type.toLowerCase() + ' en PDF pour ' + p.level + th + vo + '. Gratuite à télécharger et à imprimer — sans inscription.';
    },
    keywords: function (p) {
      return [
        'fiches de ' + p.type.toLowerCase() + ' à imprimer',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? 'fiche ' + p.type.toLowerCase() + ' ' + p.theme.toLowerCase() : null,
        p.type.toLowerCase() + ' à imprimer gratuit',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' ' + p.level.toLowerCase() : null,
        'exercices ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  it: {
    title: function (p) { return 'Scheda di ' + p.type.toLowerCase() + ' da stampare (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Set'); },
    subject: function (p) {
      var th = p.theme ? ' con ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Scheda di ' + p.type.toLowerCase() + ' in PDF per ' + p.level + th + vo + '. Gratis da scaricare e stampare — senza registrazione.';
    },
    keywords: function (p) {
      return [
        'schede di ' + p.type.toLowerCase() + ' da stampare',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? 'scheda di ' + p.type.toLowerCase() + ' ' + p.theme.toLowerCase() : null,
        p.type.toLowerCase() + ' da stampare gratis',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' ' + p.level.toLowerCase() : null,
        'esercizi di ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  nl: {
    title: function (p) { return 'Werkblad ' + p.type.toLowerCase() + ' om te printen (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Set'); },
    subject: function (p) {
      var th = p.theme ? ' met ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Werkblad ' + p.type.toLowerCase() + ' als PDF voor ' + p.level + th + vo + '. Gratis te downloaden en te printen — zonder account.';
    },
    keywords: function (p) {
      return [
        'werkbladen ' + p.type.toLowerCase() + ' gratis',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' werkblad' : null,
        p.type.toLowerCase() + ' om te printen',
        p.theme ? p.theme.toLowerCase() + ' werkblad ' + p.level.toLowerCase() : null,
        'werkblad ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  sv: { // [NSR]
    title: function (p) { return 'Arbetsblad ' + p.type.toLowerCase() + ' att skriva ut (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Set'); },
    subject: function (p) {
      var th = p.theme ? ' med ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Arbetsblad ' + p.type.toLowerCase() + ' i PDF för ' + p.level + th + vo + '. Gratis att ladda ner och skriva ut — utan inloggning.';
    },
    keywords: function (p) {
      return [
        'arbetsblad ' + p.type.toLowerCase() + ' gratis',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' arbetsblad' : null,
        p.type.toLowerCase() + ' att skriva ut',
        'arbetsblad ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  da: { // [NSR]
    title: function (p) { return p.type + '-opgaver til print (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Sæt'); },
    subject: function (p) {
      var th = p.theme ? ' med ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return p.type + '-opgaver i PDF til ' + p.level + th + vo + '. Gratis at hente og printe — uden login.';
    },
    keywords: function (p) {
      return [
        p.type.toLowerCase() + ' opgaver gratis',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' opgaver' : null,
        p.type.toLowerCase() + ' til print',
        p.type.toLowerCase() + ' opgaver pdf'
      ];
    }
  },
  no: { // [NSR]
    title: function (p) { return 'Arbeidsark ' + p.type.toLowerCase() + ' til utskrift (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Sett'); },
    subject: function (p) {
      var th = p.theme ? ' med ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      return 'Arbeidsark ' + p.type.toLowerCase() + ' i PDF for ' + p.level + th + vo + '. Gratis å laste ned og skrive ut — uten innlogging.';
    },
    keywords: function (p) {
      return [
        'arbeidsark ' + p.type.toLowerCase() + ' gratis',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' arbeidsark' : null,
        p.type.toLowerCase() + ' til utskrift',
        'arbeidsark ' + p.type.toLowerCase() + ' pdf'
      ];
    }
  },
  fi: { // [NSR]
    title: function (p) { return 'Tulostettava ' + p.type.toLowerCase() + 'tehtävä (PDF)' + tail(p.theme, p.level) + setSuffix(p.setN, 'Sarja'); },
    subject: function (p) {
      var th = p.theme ? ', aihe ' + p.theme.toLowerCase() : '';
      var vo = p.vocab ? ' (' + p.vocab + ')' : '';
      // Native FI review: drop the allative "tasolle" (wrong case for stage nouns);
      // "Ilmaiseksi ladattava ja tulostettava" not "Ilmainen ladata ja tulostaa".
      return 'Tulostettava ' + p.type.toLowerCase() + 'tehtävä (PDF), ' + p.level + th + vo + '. Ilmaiseksi ladattava ja tulostettava — ei kirjautumista.';
    },
    keywords: function (p) {
      return [
        'tulostettava ' + p.type.toLowerCase() + ' tehtäviä',
        p.type.toLowerCase() + ' ' + p.level.toLowerCase() + ' pdf',
        p.theme ? p.theme.toLowerCase() + ' ' + p.type.toLowerCase() + ' tehtävä' : null,
        p.type.toLowerCase() + ' tulostettava ilmainen',
        p.type.toLowerCase() + ' tehtävä pdf'
      ];
    }
  }
};

function resolveAgeRange(manifest) {
  var ar = manifest && (manifest.age_range || (manifest.metadata && manifest.metadata.age_range));
  if (ar) return ar;
  try {
    var app = manifest && manifest.generator && manifest.generator.app;
    if (app) return taxonomy.appConfig(app).default_age_range || null;
  } catch (e) { /* skip */ }
  return null;
}

function resolveTypeName(manifest, locale) {
  // Prefer manifest.exercise_type axis-key; fall back to the app's default type.
  var key = manifest && manifest.exercise_type;
  if (key) {
    try { var r = taxonomy.axisLookup('exercise-type', key, locale); if (r && r.name) return r.name; } catch (e) { /* fall through */ }
  }
  try {
    var app = manifest && manifest.generator && manifest.generator.app;
    if (app) { var r2 = taxonomy.exerciseTypeFor(app, locale); if (r2 && r2.name) return r2.name; }
  } catch (e) { /* skip */ }
  // last resort: title-case the raw key (locale-neutral, never English marketing copy)
  if (key) return String(key).replace(/[-_]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  return null;
}

function resolveVocabPhrase(manifest, locale) {
  try {
    var paths = [];
    if (Array.isArray(manifest.vocabulary)) paths = paths.concat(manifest.vocabulary);
    if (Array.isArray(manifest.images_used)) paths = paths.concat(manifest.images_used);
    if (!paths.length) return '';
    var names = richAlt.resolveVocabNamesFromPaths(paths, locale, 3);
    if (!names || !names.length) return '';
    return richAlt.formatVocabPhrase(names, locale) || '';
  } catch (e) { return ''; }
}

/**
 * composePdfMetadata(manifest, ctx) -> { title, subject, keywords } | null
 * ctx = { locale, slug }
 */
function composePdfMetadata(manifest, ctx) {
  var locale = ctx && ctx.locale;
  if (!locale || !PATTERNS[locale]) return null;
  var pat = PATTERNS[locale];

  var typeName = resolveTypeName(manifest, locale);
  if (!typeName) return null; // can't compose without a type

  var ageRange = resolveAgeRange(manifest);
  var levelKey = ageRange ? taxonomy.AGE_RANGE_TO_LEVEL_AXIS_KEY[ageRange] : null;
  var levelLabel = (levelKey && LEVEL_LABEL[locale] && LEVEL_LABEL[locale][levelKey]) || '';

  var themeName = '';
  if (manifest && manifest.theme) {
    try { var th = taxonomy.themeFor(manifest.theme, locale); if (th && th.name) themeName = th.name; } catch (e) { /* off-taxonomy */ }
  }

  var qual = '';
  if (manifest && manifest.exercise_mode) {
    try { var m = taxonomy.exerciseModeFor(manifest.exercise_mode, locale); if (m && m.name) qual = m.name; } catch (e) { /* skip */ }
  }

  var vocab = resolveVocabPhrase(manifest, locale);

  // NOTE: variant_id is a non-sequential HASH suffix (e.g. "2f6a"), NOT a set
  // number — parsing it as an integer yields garbage ("Satz 26"). Pure-variant
  // siblings (same type+theme+level) share a title but keep unique hash-suffixed
  // URLs; the per-deck vocab in /Subject differentiates them. So: no Set-N.
  var p = { type: typeName, qual: qual, theme: themeName, level: levelLabel, vocab: vocab, setN: 0 };

  var title = pat.title(p).trim();
  var subject = pat.subject(p).trim();
  var keywords = pat.keywords(p).filter(Boolean).join(', ');

  return { title: title, subject: subject, keywords: keywords };
}

module.exports = {
  composePdfMetadata: composePdfMetadata,
  LEVEL_LABEL: LEVEL_LABEL,
  PATTERNS: PATTERNS
};
