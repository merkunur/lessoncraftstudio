'use strict';

/**
 * keyword-specs.js — per-locale SEO keyword GRAMMAR for the Part-4 keyword lock.
 *
 * Produced by 11 native SEO keyword-expert agents (de/es/pt/it/nl/fr + NSR-flagged
 * sv/da/no/fi) + en authored directly. Each locale supplies:
 *   grammar           — primary head-term pattern per axis ({name} = localized axis name)
 *   secondaryTemplate — 3 supporting/long-tail patterns ({name}) applied to every page
 *   intersection      — primary pattern per canonical pair (two localized names)
 *   hub               — primary for the 3 hub pages
 *
 * build-keyword-ownership-map.js v2 applies grammar(localizedName) to ALL single-axis
 * keys, composes intersections from the two axis names, assigns hubs, then runs
 * detectPrimaryCollisions (must be 0). Real characters only (no \uXXXX).
 *
 * Bespoke per-key head-term refinements from the agent specs (e.g. de addition →
 * "Additionsaufgaben Arbeitsblätter") are recorded in the commission's plan file and
 * may be layered as `bespoke` overrides later; the grammar already yields native,
 * collision-free, high-intent primaries for every page.
 */

// Canonical intersection pair → [axis1, axis2]; the page's axisKey is key1__key2.
var PAIR_AXES = {
  'theme×educational-level': ['theme', 'educational-level'],
  'theme×exercise-type': ['theme', 'exercise-type'],
  'educational-level×exercise-type': ['educational-level', 'exercise-type'],
};

var SPECS = {
  en: {
    grammar: { 'exercise-type': '{name} worksheets', theme: '{name} worksheets', 'educational-level': '{name} worksheets' },
    secondaryTemplate: ['free {name} worksheets', 'printable {name} worksheets pdf', '{name} worksheets for kids'],
    intersection: {
      'theme__educational-level': '{theme} worksheets for {level}',
      'theme__exercise-type': '{type} worksheets with {theme}',
      'educational-level__exercise-type': '{type} worksheets for {level}',
    },
    hub: { worksheets: 'free printable worksheets for kids', topic: 'worksheets by topic', activities: 'interactive learning activities' },
  },
  de: {
    grammar: { 'exercise-type': '{name}-Arbeitsblätter', theme: 'Arbeitsblätter mit {name}', 'educational-level': 'Arbeitsblätter für {name}' },
    secondaryTemplate: ['kostenlose {name}-Arbeitsblätter', '{name}-Arbeitsblätter zum Ausdrucken', '{name} Grundschule'],
    intersection: {
      'theme__educational-level': '{theme}-Arbeitsblätter für {level}',
      'theme__exercise-type': '{type}-Arbeitsblätter mit {theme}',
      'educational-level__exercise-type': '{type}-Arbeitsblätter für {level}',
    },
    hub: { worksheets: 'Kostenlose Arbeitsblätter für Kinder', topic: 'Arbeitsblätter nach Thema', activities: 'Interaktive Übungen online spielen' },
  },
  es: {
    grammar: { 'exercise-type': 'Fichas de {name}', theme: 'Fichas de {name}', 'educational-level': 'Fichas para {name}' },
    secondaryTemplate: ['fichas de {name} para imprimir', '{name} en PDF gratis', '{name} para infantil'],
    intersection: {
      'theme__educational-level': 'Fichas de {theme} para {level}',
      'theme__exercise-type': 'Fichas de {type} con tema de {theme}',
      'educational-level__exercise-type': 'Fichas de {type} para {level}',
    },
    hub: { worksheets: 'Hojas de trabajo imprimibles para infantil y primaria', topic: 'Fichas por tema', activities: 'Actividades interactivas para niños' },
  },
  pt: {
    grammar: { 'exercise-type': 'Atividades de {name}', theme: 'Atividades com tema {name}', 'educational-level': 'Fichas para {name}' },
    secondaryTemplate: ['atividades de {name} para imprimir', '{name} em PDF grátis', '{name} educação infantil'],
    intersection: {
      'theme__educational-level': 'Atividades de {theme} para {level}',
      'theme__exercise-type': 'Atividades de {type} com tema {theme}',
      'educational-level__exercise-type': 'Atividades de {type} para {level}',
    },
    hub: { worksheets: 'Fichas grátis para imprimir', topic: 'Atividades por tema', activities: 'Atividades interativas para crianças' },
  },
  it: {
    grammar: { 'exercise-type': 'Schede di {name}', theme: 'Schede a tema {name}', 'educational-level': 'Schede per {name}' },
    secondaryTemplate: ['schede di {name} da stampare', '{name} in PDF', '{name} scuola primaria'],
    intersection: {
      'theme__educational-level': 'Schede di {theme} per {level}',
      'theme__exercise-type': 'Schede di {type} a tema {theme}',
      'educational-level__exercise-type': 'Schede di {type} per {level}',
    },
    hub: { worksheets: 'Schede didattiche gratis da stampare', topic: 'Schede per tema', activities: 'Attività interattive per bambini' },
  },
  nl: {
    grammar: { 'exercise-type': '{name} werkbladen', theme: 'werkbladen met {name}', 'educational-level': 'werkbladen voor {name}' },
    secondaryTemplate: ['gratis {name} werkbladen', '{name} werkbladen pdf', '{name} voor kinderen'],
    intersection: {
      'theme__educational-level': '{theme}-werkbladen voor {level}',
      'theme__exercise-type': '{type} werkbladen met {theme}',
      'educational-level__exercise-type': '{type} werkbladen voor {level}',
    },
    hub: { worksheets: 'Gratis werkbladen voor kinderen', topic: 'Werkbladen per thema', activities: 'Interactieve oefeningen online' },
  },
  fr: {
    grammar: { 'exercise-type': 'Fiches de {name}', theme: 'Fiches sur le thème {name}', 'educational-level': 'Fiches pour {name}' },
    secondaryTemplate: ['fiches de {name} à imprimer', '{name} en PDF gratuit', '{name} pour enfants'],
    intersection: {
      'theme__educational-level': 'Fiches de {theme} pour {level}',
      'theme__exercise-type': 'Fiches de {type} sur le thème {theme}',
      'educational-level__exercise-type': 'Fiches de {type} pour {level}',
    },
    hub: { worksheets: 'Fiches gratuites à imprimer', topic: 'Fiches par thème', activities: 'Activités interactives pour enfants' },
  },
  sv: {
    grammar: { 'exercise-type': '{name} arbetsblad', theme: 'arbetsblad med {name}', 'educational-level': 'arbetsblad för {name}' },
    secondaryTemplate: ['gratis {name} arbetsblad', '{name} arbetsblad att skriva ut', '{name} för barn'],
    intersection: {
      'theme__educational-level': '{theme} arbetsblad för {level}',
      'theme__exercise-type': '{type} arbetsblad med {theme}',
      'educational-level__exercise-type': '{type} arbetsblad för {level}',
    },
    hub: { worksheets: 'Gratis arbetsblad för barn', topic: 'Arbetsblad efter tema', activities: 'Interaktiva aktiviteter online' },
  },
  da: {
    grammar: { 'exercise-type': '{name} arbejdsark', theme: 'arbejdsark med {name}', 'educational-level': 'arbejdsark til {name}' },
    secondaryTemplate: ['gratis {name} arbejdsark', '{name} arbejdsark til print', '{name} for børn'],
    intersection: {
      'theme__educational-level': '{theme} arbejdsark til {level}',
      'theme__exercise-type': '{type} arbejdsark med {theme}',
      'educational-level__exercise-type': '{type} arbejdsark til {level}',
    },
    hub: { worksheets: 'Gratis arbejdsark til print', topic: 'Arbejdsark efter tema', activities: 'Interaktive aktiviteter online' },
  },
  no: {
    grammar: { 'exercise-type': '{name}-arbeidsark', theme: 'arbeidsark med tema {name}', 'educational-level': 'arbeidsark for {name}' },
    secondaryTemplate: ['gratis {name}-arbeidsark', '{name}-arbeidsark til utskrift', '{name} for barn'],
    intersection: {
      'theme__educational-level': '{theme}-arbeidsark for {level}',
      'theme__exercise-type': '{type}-arbeidsark med {theme}',
      'educational-level__exercise-type': '{type}-arbeidsark for {level}',
    },
    hub: { worksheets: 'Gratis arbeidsark for barn', topic: 'Arbeidsark etter tema', activities: 'Interaktive aktiviteter online' },
  },
  fi: {
    grammar: { 'exercise-type': '{name}tehtävät', theme: '{name}aiheiset tehtävät', 'educational-level': '{name}n tehtävät' },
    secondaryTemplate: ['ilmaiset {name}tehtävät', 'tulostettavat {name}tehtävät', '{name} lapsille'],
    intersection: {
      'theme__educational-level': '{theme}tehtävät luokalle {level}',
      'theme__exercise-type': '{type}tehtävät: {theme}',
      'educational-level__exercise-type': '{type}tehtävät luokalle {level}',
    },
    hub: { worksheets: 'Ilmaiset tehtäväarkit lapsille', topic: 'Tehtävät aiheen mukaan', activities: 'Interaktiiviset harjoitukset verkossa' },
  },
};

// Level-keyword overrides for the 4 locales whose educational-level NAMES are
// descriptive parentheticals (§17.4.3 descriptor-differentiation): stripping the
// parenthetical would collapse preschool+kindergarten to the same head term, so
// supply distinct, natural search forms. Other 7 locales have discrete level
// terms (kindergarten / Kindergarten / jardín infantil / kleuterklas /
// Förskoleklass / Børnehaveklasse / Esiopetus) that need no override.
var LEVEL_KEYWORD = {
  it: { preschool: "scuola dell'infanzia 3-5 anni", kindergarten: "scuola dell'infanzia 5-7 anni" },
  fr: { preschool: 'maternelle petite section', kindergarten: 'maternelle grande section' },
  pt: { preschool: 'educação infantil creche', kindergarten: 'educação infantil pré-escola' },
  no: { preschool: 'barnehage 3-5 år', kindergarten: 'barnehage 5-7 år' },
};

// Strip descriptive "(...)" parentheticals from an axis name for keyword use
// (e.g. "CP (cours préparatoire)" -> "CP"; "1º ano do ensino fundamental"
// unchanged). Collapse whitespace.
function cleanName(n) {
  return String(n || '').replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

function fill(template, vars) {
  if (!template) return null;
  return template.replace(/\{(name|theme|level|type)\}/g, function (m, k) {
    return vars[k] != null ? vars[k] : m;
  }).replace(/\s+/g, ' ').trim();
}

module.exports = { SPECS: SPECS, PAIR_AXES: PAIR_AXES, LEVEL_KEYWORD: LEVEL_KEYWORD, fill: fill, cleanName: cleanName };
