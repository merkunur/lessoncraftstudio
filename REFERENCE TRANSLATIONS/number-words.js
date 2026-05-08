/**
 * NUMBER_WORDS — locale-specific number-word data for K-3 numeracy.
 *
 * Shipped at Stream A Phase 2 (2026-05-08) per Arc 11 close operator
 * ratification (Stream A escalation σ-α). Per CLAUDE.md §A.3
 * IMAGE_VOCABULARY direct-modification commission-authorized at Arc 11
 * close; NUMBER_WORDS is the parallel infrastructure for numeral-cards
 * material gender-toggle (per Arc 8 Phase 1 + Arc 9 Phase 1 numeracy-
 * work surfacing the need; per CLAUDE.md materials-catalog.json
 * numeral-cards spec doctrine_notes "Arc 3 will design").
 *
 * Schema (mirrors IMAGE_VOCABULARY pattern):
 *   "numeric-key": {
 *     "en": ["word"],                          // no gender
 *     "de": ["word", "gender-form-OR-null"],   // gender-toggle for "1" only
 *     "fr": ["word", "feminine-form-OR-null"], // ditto
 *     "es": ["word", "feminine-form-OR-null"],
 *     ...
 *   }
 *
 * Gender-toggle convention:
 *   - "1" in es/it/pt/fr requires gender agreement (uno/una; un/une);
 *     entry shape: ["masculine-form", "feminine-form"]
 *   - "1" in de requires article-form for definite ("ein/eine") OR
 *     unchanged for cardinal ("eins"); entry shape: ["cardinal-eins",
 *     "indefinite-article-ein"]
 *   - All other numbers: single form across genders; entry shape: ["word"]
 *
 * For numeral-cards material consumption: when numeral-cards renders a
 * number alongside a noun (e.g., "1 cat" / "1 mother"), the gender-toggle
 * resolves to the correct form per noun gender (cat=m → "uno"/"un";
 * mother=f → "una"/"une"). Default behavior (no gender-toggle) uses
 * the masculine-cardinal form per locale convention.
 *
 * v1 ships 1-20 cardinal numbers; tens (30-100) follow in Stream A Arc 2
 * if numeracy work warrants (currently sufficient for K-3 K-Grade-1 work
 * which uses 1-20 primarily; skip-counting work uses multiples-of-N).
 *
 * Per Stream A commission spec §3 Phase 2.
 */

'use strict';

const NUMBER_WORDS = {
  // Cardinal numbers 1-20.
  // For "1" entries: 2-element arrays [masculine, feminine] in Romance
  // locales; [cardinal, article-form] in German. Single-form locales
  // (en, fi, sv, da, no) use 1-element arrays.
  "1":  {"en":["one"],            "de":["eins","ein"],   "fr":["un","une"],          "es":["uno","una"],         "pt":["um","uma"],          "it":["uno","una"],         "nl":["één"],         "sv":["ett"],         "da":["en"],          "no":["en"],          "fi":["yksi"]},
  "2":  {"en":["two"],            "de":["zwei"],         "fr":["deux"],              "es":["dos"],               "pt":["dois"],              "it":["due"],               "nl":["twee"],        "sv":["två"],         "da":["to"],          "no":["to"],          "fi":["kaksi"]},
  "3":  {"en":["three"],          "de":["drei"],         "fr":["trois"],             "es":["tres"],              "pt":["três"],              "it":["tre"],               "nl":["drie"],        "sv":["tre"],         "da":["tre"],         "no":["tre"],         "fi":["kolme"]},
  "4":  {"en":["four"],           "de":["vier"],         "fr":["quatre"],            "es":["cuatro"],            "pt":["quatro"],            "it":["quattro"],           "nl":["vier"],        "sv":["fyra"],        "da":["fire"],        "no":["fire"],        "fi":["neljä"]},
  "5":  {"en":["five"],           "de":["fünf"],         "fr":["cinq"],              "es":["cinco"],             "pt":["cinco"],             "it":["cinque"],            "nl":["vijf"],        "sv":["fem"],         "da":["fem"],         "no":["fem"],         "fi":["viisi"]},
  "6":  {"en":["six"],            "de":["sechs"],        "fr":["six"],               "es":["seis"],              "pt":["seis"],              "it":["sei"],               "nl":["zes"],         "sv":["sex"],         "da":["seks"],        "no":["seks"],        "fi":["kuusi"]},
  "7":  {"en":["seven"],          "de":["sieben"],       "fr":["sept"],              "es":["siete"],             "pt":["sete"],              "it":["sette"],             "nl":["zeven"],       "sv":["sju"],         "da":["syv"],         "no":["sju"],         "fi":["seitsemän"]},
  "8":  {"en":["eight"],          "de":["acht"],         "fr":["huit"],              "es":["ocho"],              "pt":["oito"],              "it":["otto"],              "nl":["acht"],        "sv":["åtta"],        "da":["otte"],        "no":["åtte"],        "fi":["kahdeksan"]},
  "9":  {"en":["nine"],           "de":["neun"],         "fr":["neuf"],              "es":["nueve"],             "pt":["nove"],              "it":["nove"],              "nl":["negen"],       "sv":["nio"],         "da":["ni"],          "no":["ni"],          "fi":["yhdeksän"]},
  "10": {"en":["ten"],            "de":["zehn"],         "fr":["dix"],               "es":["diez"],              "pt":["dez"],               "it":["dieci"],             "nl":["tien"],        "sv":["tio"],         "da":["ti"],          "no":["ti"],          "fi":["kymmenen"]},
  "11": {"en":["eleven"],         "de":["elf"],          "fr":["onze"],              "es":["once"],              "pt":["onze"],              "it":["undici"],            "nl":["elf"],         "sv":["elva"],        "da":["elleve"],      "no":["elleve"],      "fi":["yksitoista"]},
  "12": {"en":["twelve"],         "de":["zwölf"],        "fr":["douze"],             "es":["doce"],              "pt":["doze"],              "it":["dodici"],            "nl":["twaalf"],      "sv":["tolv"],        "da":["tolv"],        "no":["tolv"],        "fi":["kaksitoista"]},
  "13": {"en":["thirteen"],       "de":["dreizehn"],     "fr":["treize"],            "es":["trece"],             "pt":["treze"],             "it":["tredici"],           "nl":["dertien"],     "sv":["tretton"],     "da":["tretten"],     "no":["tretten"],     "fi":["kolmetoista"]},
  "14": {"en":["fourteen"],       "de":["vierzehn"],     "fr":["quatorze"],          "es":["catorce"],           "pt":["catorze"],           "it":["quattordici"],       "nl":["veertien"],    "sv":["fjorton"],     "da":["fjorten"],     "no":["fjorten"],     "fi":["neljätoista"]},
  "15": {"en":["fifteen"],        "de":["fünfzehn"],     "fr":["quinze"],            "es":["quince"],            "pt":["quinze"],            "it":["quindici"],          "nl":["vijftien"],    "sv":["femton"],      "da":["femten"],      "no":["femten"],      "fi":["viisitoista"]},
  "16": {"en":["sixteen"],        "de":["sechzehn"],     "fr":["seize"],             "es":["dieciséis"],         "pt":["dezesseis"],         "it":["sedici"],            "nl":["zestien"],     "sv":["sexton"],      "da":["seksten"],     "no":["seksten"],     "fi":["kuusitoista"]},
  "17": {"en":["seventeen"],      "de":["siebzehn"],     "fr":["dix-sept"],          "es":["diecisiete"],        "pt":["dezessete"],         "it":["diciassette"],       "nl":["zeventien"],   "sv":["sjutton"],     "da":["sytten"],      "no":["sytten"],      "fi":["seitsemäntoista"]},
  "18": {"en":["eighteen"],       "de":["achtzehn"],     "fr":["dix-huit"],          "es":["dieciocho"],         "pt":["dezoito"],           "it":["diciotto"],          "nl":["achttien"],    "sv":["arton"],       "da":["atten"],       "no":["atten"],       "fi":["kahdeksantoista"]},
  "19": {"en":["nineteen"],       "de":["neunzehn"],     "fr":["dix-neuf"],          "es":["diecinueve"],        "pt":["dezenove"],          "it":["diciannove"],        "nl":["negentien"],   "sv":["nitton"],      "da":["nitten"],      "no":["nitten"],      "fi":["yhdeksäntoista"]},
  "20": {"en":["twenty"],         "de":["zwanzig"],      "fr":["vingt"],             "es":["veinte"],            "pt":["vinte"],             "it":["venti"],             "nl":["twintig"],     "sv":["tjugo"],       "da":["tyve"],        "no":["tjue"],        "fi":["kaksikymmentä"]}
};

/**
 * Resolve number-word for a given numeral + locale + optional gender.
 *
 * @param {number|string} numeral - Numeric value (1-20 in v1).
 * @param {string} locale - 11 platform locales: en, de, fr, es, pt, it, nl, sv, da, no, fi.
 * @param {string|null} gender - Optional gender for "1" gender-toggle in
 *                                Romance/German locales: "m" (masculine; default)
 *                                or "f" (feminine). Ignored for other numerals
 *                                + non-gender-toggle locales.
 * @returns {string|null} Number-word string, or null if numeral not in v1
 *                        range OR locale not supported.
 */
const NumberWords = {
  get: function (numeral, locale, gender) {
    var key = String(numeral);
    if (!NUMBER_WORDS[key]) return null;
    var localeData = NUMBER_WORDS[key][locale];
    if (!localeData) return null;
    // Gender-toggle for "1" in Romance (es/it/pt/fr) + German.
    // Convention per schema: index 0 = default (masculine in Romance;
    // cardinal in German); index 1 = feminine (Romance) / indefinite
    // article (German).
    if (key === "1" && gender === "f" && localeData.length > 1) {
      // Skip German because de's index 1 is indefinite-article ("ein"),
      // not a feminine form. de feminine indefinite is "eine" — would need
      // separate handling. For now, default to index 0 ("eins") for de
      // regardless of gender parameter; numeral-cards material can opt
      // into article-form via separate parameter.
      if (locale === 'de') return localeData[0];
      return localeData[1];
    }
    return localeData[0];
  },
  hasGenderToggle: function (numeral, locale) {
    var key = String(numeral);
    if (!NUMBER_WORDS[key]) return false;
    var localeData = NUMBER_WORDS[key][locale];
    if (!localeData) return false;
    return key === "1" && localeData.length > 1 && locale !== 'de';
  },
  // Module + browser exposure.
  data: NUMBER_WORDS
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NumberWords;
}
if (typeof window !== 'undefined') {
  window.NumberWords = NumberWords;
}
