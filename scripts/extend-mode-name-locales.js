#!/usr/bin/env node
/**
 * One-shot taxonomy authoring script — populates
 * axes.exercise-mode.<key>.name.<locale> for the 8 locales currently null
 * in frontend/config/topics-taxonomy.json (nl, it, fr, pt, sv, da, no, fi).
 *
 * 49 mode keys × 8 locales = 392 new entries. Existing en/de/es entries
 * are preserved untouched.
 *
 * Per CLAUDE.md §17.5 + §17.5.1:
 *   - nl (Tier 2): Claude reliable, ship.
 *   - fr / it / pt (Tier 4 Romance): Claude reliable, ship. pt is BR-canonical
 *     per §6 (caminhão / ônibus register; soma not adição for "addition").
 *   - sv / da / no (Tier 3) / fi: NSR-flagged per §17.5.1; ship with
 *     [NSR-flag] in commit message for native-speaker review later.
 *   - no = bokmål-canonical per §6 (no nynorsk variants).
 *
 * Algebraic-pattern keys (aab / aabb / abb / abc) intentionally kept as-is
 * across all 11 locales, mirroring the en/de/es treatment (algebraic notation
 * is universal). Numerals in count-template keys (one/two/three/four/five-
 * missing, N-symbols-*) stay as digits across all locales.
 *
 * Idempotent: re-running on already-populated taxonomy is a no-op (script
 * detects non-null values and skips them, exiting cleanly).
 *
 * Usage:
 *   node scripts/extend-mode-name-locales.js [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');

var TAXONOMY_PATH = path.resolve(__dirname, '..', 'frontend', 'config', 'topics-taxonomy.json');
var TARGET_LOCALES = ['nl', 'it', 'fr', 'pt', 'sv', 'da', 'no', 'fi'];

// ============================================================================
// Translation table: 49 mode keys × 8 missing locales
// Format: { <modeKey>: { nl, it, fr, pt, sv, da, no, fi } }
// ============================================================================
var TRANSLATIONS = {
  // Algebraic-pattern keys — identical across all locales (matches en/de/es)
  'aab':  { nl: 'AAB',  it: 'AAB',  fr: 'AAB',  pt: 'AAB',  sv: 'AAB',  da: 'AAB',  no: 'AAB',  fi: 'AAB'  },
  'aabb': { nl: 'AABB', it: 'AABB', fr: 'AABB', pt: 'AABB', sv: 'AABB', da: 'AABB', no: 'AABB', fi: 'AABB' },
  'abb':  { nl: 'ABB',  it: 'ABB',  fr: 'ABB',  pt: 'ABB',  sv: 'ABB',  da: 'ABB',  no: 'ABB',  fi: 'ABB'  },
  'abc':  { nl: 'ABC',  it: 'ABC',  fr: 'ABC',  pt: 'ABC',  sv: 'ABC',  da: 'ABC',  no: 'ABC',  fi: 'ABC'  },

  // Difficulty + state
  'easy':     { nl: 'Makkelijk',  it: 'Facile',     fr: 'Facile',   pt: 'Fácil',    sv: 'Lätt',    da: 'Let',     no: 'Lett',       fi: 'Helppo'    },
  'medium':   { nl: 'Gemiddeld',  it: 'Medio',      fr: 'Moyen',    pt: 'Médio',    sv: 'Medel',   da: 'Mellem',  no: 'Middels',    fi: 'Keskitaso' },
  'hard':     { nl: 'Moeilijk',   it: 'Difficile',  fr: 'Difficile', pt: 'Difícil',  sv: 'Svår',    da: 'Svær',    no: 'Vanskelig',  fi: 'Vaikea'    },
  'normal':   { nl: 'Normaal',    it: 'Normale',    fr: 'Normal',   pt: 'Normal',   sv: 'Normal',  da: 'Normal',  no: 'Normal',     fi: 'Normaali'  },
  'standard': { nl: 'Standaard',  it: 'Standard',   fr: 'Standard', pt: 'Padrão',   sv: 'Standard',da: 'Standard',no: 'Standard',   fi: 'Vakio'     },

  // Arithmetic operations
  'addition':        { nl: 'Optellen',       it: 'Addizione',   fr: 'Addition',          pt: 'Soma',               sv: 'Addition',          da: 'Addition',         no: 'Addisjon',         fi: 'Yhteenlasku'         },
  'subtraction':     { nl: 'Aftrekken',      it: 'Sottrazione', fr: 'Soustraction',      pt: 'Subtração',          sv: 'Subtraktion',       da: 'Subtraktion',      no: 'Subtraksjon',      fi: 'Vähennyslasku'       },
  'find-addend':     { nl: 'Zoek de optelterm', it: 'Trova l\'addendo', fr: 'Trouve le terme', pt: 'Encontre o termo', sv: 'Hitta termen',  da: 'Find addend',     no: 'Finn ledd',        fi: 'Etsi yhteenlaskettava' },
  'find-subtrahend': { nl: 'Zoek de aftrekker',  it: 'Trova il sottraendo', fr: 'Trouve le soustracteur', pt: 'Encontre o subtraendo', sv: 'Hitta subtrahenden', da: 'Find subtrahend', no: 'Finn subtrahend',  fi: 'Etsi vähentäjä'      },

  // Image-X pairs (preserve hyphen-style template across locales)
  'image-image':  { nl: 'Beeld-Beeld',    it: 'Immagine-Immagine', fr: 'Image-Image', pt: 'Imagem-Imagem', sv: 'Bild-Bild',   da: 'Billede-Billede',no: 'Bilde-Bilde', fi: 'Kuva-Kuva'   },
  'image-number': { nl: 'Beeld-Getal',    it: 'Immagine-Numero',   fr: 'Image-Nombre',pt: 'Imagem-Número',sv: 'Bild-Nummer', da: 'Billede-Tal',    no: 'Bilde-Tall',  fi: 'Kuva-Numero' },

  // Missing-pieces (template: "N <piece-noun> <missing-form>", numerals preserved)
  'one-missing':   { nl: '1 ontbrekend stukje',  it: '1 pezzo mancante',   fr: '1 pièce manquante',  pt: '1 peça faltando',   sv: '1 saknad bit',    da: '1 manglende brik',    no: '1 manglende brikke',  fi: '1 puuttuva pala'   },
  'two-missing':   { nl: '2 ontbrekende stukjes', it: '2 pezzi mancanti',  fr: '2 pièces manquantes',pt: '2 peças faltando',  sv: '2 saknade bitar', da: '2 manglende brikker', no: '2 manglende brikker', fi: '2 puuttuvaa palaa' },
  'three-missing': { nl: '3 ontbrekende stukjes', it: '3 pezzi mancanti',  fr: '3 pièces manquantes',pt: '3 peças faltando',  sv: '3 saknade bitar', da: '3 manglende brikker', no: '3 manglende brikker', fi: '3 puuttuvaa palaa' },
  'four-missing':  { nl: '4 ontbrekende stukjes', it: '4 pezzi mancanti',  fr: '4 pièces manquantes',pt: '4 peças faltando',  sv: '4 saknade bitar', da: '4 manglende brikker', no: '4 manglende brikker', fi: '4 puuttuvaa palaa' },
  'five-missing':  { nl: '5 ontbrekende stukjes', it: '5 pezzi mancanti',  fr: '5 pièces manquantes',pt: '5 peças faltando',  sv: '5 saknade bitar', da: '5 manglende brikker', no: '5 manglende brikker', fi: '5 puuttuvaa palaa' },

  // N-symbols-add(-sub) (template: "N <symbols>, <op>[+<op>]")
  'two-symbols-add':       { nl: '2 symbolen, optellen',          it: '2 simboli, addizione',      fr: '2 symboles, addition',           pt: '2 símbolos, soma',             sv: '2 symboler, addition',         da: '2 symboler, addition',         no: '2 symboler, addisjon',         fi: '2 symbolia, yhteenlasku'       },
  'three-symbols-add':     { nl: '3 symbolen, optellen',          it: '3 simboli, addizione',      fr: '3 symboles, addition',           pt: '3 símbolos, soma',             sv: '3 symboler, addition',         da: '3 symboler, addition',         no: '3 symboler, addisjon',         fi: '3 symbolia, yhteenlasku'       },
  'four-symbols-add':      { nl: '4 symbolen, optellen',          it: '4 simboli, addizione',      fr: '4 symboles, addition',           pt: '4 símbolos, soma',             sv: '4 symboler, addition',         da: '4 symboler, addition',         no: '4 symboler, addisjon',         fi: '4 symbolia, yhteenlasku'       },
  'two-symbols-add-sub':   { nl: '2 symbolen, optellen+aftrekken', it: '2 simboli, add+sott',      fr: '2 symboles, add+sous',           pt: '2 símbolos, soma+sub',         sv: '2 symboler, add+sub',          da: '2 symboler, add+sub',          no: '2 symboler, add+sub',          fi: '2 symbolia, yht+vähen'         },
  'three-symbols-add-sub': { nl: '3 symbolen, optellen+aftrekken', it: '3 simboli, add+sott',      fr: '3 symboles, add+sous',           pt: '3 símbolos, soma+sub',         sv: '3 symboler, add+sub',          da: '3 symboler, add+sub',          no: '3 symboler, add+sub',          fi: '3 symbolia, yht+vähen'         },
  'four-symbols-add-sub':  { nl: '4 symbolen, optellen+aftrekken', it: '4 simboli, add+sott',      fr: '4 symboles, add+sous',           pt: '4 símbolos, soma+sub',         sv: '4 symboler, add+sub',          da: '4 symboler, add+sub',          no: '4 symboler, add+sub',          fi: '4 symbolia, yht+vähen'         },

  // Spatial / directional
  'cardinal-arrows': { nl: 'Op/Neer/Links/Rechts', it: 'Su/Giù/Sinistra/Destra', fr: 'Haut/Bas/Gauche/Droite', pt: 'Cima/Baixo/Esq/Dir',     sv: 'Upp/Ner/Vänster/Höger', da: 'Op/Ned/Venstre/Højre', no: 'Opp/Ned/Venstre/Høyre', fi: 'Ylös/Alas/Vasen/Oikea' },
  'compass':         { nl: 'Windrichtingen',       it: 'Punti cardinali',        fr: 'Points cardinaux',       pt: 'Pontos cardeais',        sv: 'Väderstreck',           da: 'Verdenshjørner',        no: 'Himmelretninger',       fi: 'Ilmansuunnat'          },
  'pathway':         { nl: 'Beeldroute',            it: 'Sentiero illustrato',    fr: 'Chemin imagé',          pt: 'Caminho com imagens',    sv: 'Bildstig',              da: 'Billedsti',             no: 'Bildesti',              fi: 'Kuvapolku'             },
  'classic-maze':    { nl: 'Klassiek doolhof',     it: 'Labirinto classico',     fr: 'Labyrinthe classique',  pt: 'Labirinto clássico',     sv: 'Klassisk labyrint',     da: 'Klassisk labyrint',     no: 'Klassisk labyrint',     fi: 'Perinteinen sokkelo'   },
  'choose-path':     { nl: 'Kies het juiste pad',  it: 'Scegli il percorso giusto', fr: 'Choisis le bon chemin', pt: 'Escolha o caminho certo', sv: 'Välj rätt väg',         da: 'Vælg den rigtige vej',  no: 'Velg riktig vei',       fi: 'Valitse oikea polku'   },

  // Find-X variants
  'find-odd':      { nl: 'Vind de andere',     it: 'Trova il diverso',  fr: 'Trouve l\'intrus',     pt: 'Encontre o diferente', sv: 'Hitta den udda',     da: 'Find den anderledes', no: 'Finn den som er ulik', fi: 'Etsi erilainen'        },
  'find-shadow':   { nl: 'Koppel de schaduw',  it: 'Abbina l\'ombra',   fr: 'Associe l\'ombre',     pt: 'Combine a sombra',     sv: 'Para skuggan',       da: 'Match skyggen',       no: 'Match skyggen',        fi: 'Yhdistä varjo'         },
  'findbig':       { nl: 'Vind de Grote',      it: 'Trova il Grande',   fr: 'Trouve le Grand',      pt: 'Encontre o Grande',    sv: 'Hitta den stora',    da: 'Find den store',      no: 'Finn den store',       fi: 'Etsi iso'              },
  'i-spy':         { nl: 'Ik zie, ik zie',     it: 'Vedo vedo',          fr: 'Je vois je vois',      pt: 'Vejo vejo',            sv: 'Jag ser, jag ser',   da: 'Jeg ser, jeg ser',    no: 'Jeg ser, jeg ser',     fi: 'Näen näen'             },
  'hidden-object': { nl: 'Verborgen objecten', it: 'Oggetti nascosti',   fr: 'Objets cachés',        pt: 'Objetos escondidos',   sv: 'Gömda föremål',       da: 'Skjulte genstande',   no: 'Skjulte gjenstander',  fi: 'Piilotetut esineet'    },

  // Other operations
  'check-cross':     { nl: 'Aankruisen en doorstrepen', it: 'Spunta e barra gruppi',  fr: 'Coche et barre les groupes', pt: 'Marque e risque grupos', sv: 'Bocka och stryk grupper', da: 'Sæt kryds og streg over grupper', no: 'Kryss av og strek over grupper', fi: 'Merkitse ja yliviivaa ryhmät' },
  'cross-out':       { nl: 'Doorstrepen',              it: 'Barrare',                fr: 'Barrer',                     pt: 'Riscar',                 sv: 'Stryk över',              da: 'Streg over',                      no: 'Strek over',                     fi: 'Yliviivaa'                    },
  'cross-theme':     { nl: 'Themaoverstijgend',        it: 'Multi-tema',             fr: 'Multi-thèmes',               pt: 'Multi-tema',             sv: 'Tvärtema',                da: 'På tværs af temaer',              no: 'På tvers av temaer',             fi: 'Aiheiden välillä'             },
  'fillin':          { nl: 'Invullen',                 it: 'Riempi',                 fr: 'À compléter',                pt: 'Complete',               sv: 'Fyll i',                  da: 'Udfyld',                          no: 'Fyll inn',                       fi: 'Täytä'                        },
  'letter':          { nl: 'Letter',                   it: 'Lettera',                fr: 'Lettre',                     pt: 'Letra',                  sv: 'Bokstav',                 da: 'Bogstav',                         no: 'Bokstav',                        fi: 'Kirjain'                      },
  'letter-spotting': { nl: 'Letters zoeken',           it: 'Trova lettere',          fr: 'Cherche les lettres',        pt: 'Procurar letras',        sv: 'Hitta bokstäver',         da: 'Find bogstaver',                  no: 'Finn bokstaver',                 fi: 'Etsi kirjaimia'               },
  'make-whole':      { nl: 'Maak het heel',            it: 'Completa',               fr: 'Complète',                   pt: 'Complete',               sv: 'Gör hel',                 da: 'Gør hel',                         no: 'Gjør hel',                       fi: 'Tee kokonaiseksi'             },
  'mixed':           { nl: 'Gemengd',                  it: 'Misto',                  fr: 'Mixte',                      pt: 'Misto',                  sv: 'Blandat',                 da: 'Blandet',                         no: 'Blandet',                        fi: 'Sekoitettu'                   },
  'multiplechoice':  { nl: 'Meerkeuze',                it: 'Scelta multipla',        fr: 'Choix multiple',             pt: 'Múltipla escolha',       sv: 'Flerval',                 da: 'Flervalg',                        no: 'Flervalg',                       fi: 'Monivalinta'                  },
  'name':            { nl: 'Namen',                    it: 'Nomi',                   fr: 'Noms',                       pt: 'Nomes',                  sv: 'Namn',                    da: 'Navne',                           no: 'Navn',                           fi: 'Nimet'                        },
  'orderasc':        { nl: 'Oplopende volgorde',       it: 'Ordine crescente',       fr: 'Ordre croissant',            pt: 'Ordem crescente',        sv: 'Stigande ordning',        da: 'Stigende rækkefølge',             no: 'Stigende rekkefølge',            fi: 'Nouseva järjestys'            },
  'same-theme':      { nl: 'Zelfde thema',             it: 'Stesso tema',            fr: 'Même thème',                 pt: 'Mesmo tema',             sv: 'Samma tema',              da: 'Samme tema',                      no: 'Samme tema',                     fi: 'Sama aihe'                    },
  'secret-word':     { nl: 'Geheim woord',             it: 'Parola segreta',         fr: 'Mot secret',                 pt: 'Palavra secreta',        sv: 'Hemligt ord',             da: 'Hemmeligt ord',                   no: 'Hemmelig ord',                   fi: 'Salasana'                     }
};

function main() {
  var dryRun = process.argv.indexOf('--dry-run') !== -1;

  var raw = fs.readFileSync(TAXONOMY_PATH, 'utf8');
  var taxonomy = JSON.parse(raw);
  var modes = taxonomy.axes && taxonomy.axes['exercise-mode'];
  if (!modes) {
    console.error('FATAL: axes.exercise-mode missing from taxonomy');
    process.exit(1);
  }

  var stats = { written: 0, alreadyPresent: 0, missingFromTable: [], unknownKey: [] };

  // Validate every translation table key exists in taxonomy
  Object.keys(TRANSLATIONS).forEach(function (k) {
    if (!modes[k]) stats.unknownKey.push(k);
  });

  // Validate every taxonomy mode key has a translation entry (except keys
  // whose en/de/es already match — algebraic patterns etc.; report any gap)
  Object.keys(modes).forEach(function (k) {
    if (k.charAt(0) === '$') return;
    if (!TRANSLATIONS[k]) stats.missingFromTable.push(k);
  });

  if (stats.unknownKey.length || stats.missingFromTable.length) {
    console.error('SCHEMA MISMATCH:');
    if (stats.unknownKey.length) console.error('  Translation keys not in taxonomy:', stats.unknownKey);
    if (stats.missingFromTable.length) console.error('  Taxonomy keys missing from translation table:', stats.missingFromTable);
    process.exit(2);
  }

  // Apply
  Object.keys(TRANSLATIONS).forEach(function (k) {
    var modeEntry = modes[k];
    if (!modeEntry.name) modeEntry.name = {};
    TARGET_LOCALES.forEach(function (loc) {
      var current = modeEntry.name[loc];
      var newVal = TRANSLATIONS[k][loc];
      if (current === null || current === undefined) {
        modeEntry.name[loc] = newVal;
        stats.written++;
      } else if (current === newVal) {
        stats.alreadyPresent++;
      } else {
        // Existing non-null value differs — preserve it; the operator may
        // have hand-tuned. Skip silently.
        stats.alreadyPresent++;
      }
    });
  });

  console.log('Translation table validated. ' + Object.keys(TRANSLATIONS).length + ' modes × ' + TARGET_LOCALES.length + ' locales.');
  console.log('Would write: ' + stats.written + ' entries.');
  console.log('Already present (preserved): ' + stats.alreadyPresent + ' entries.');

  if (dryRun) {
    console.log('--dry-run: NO FILE WRITES');
    return;
  }

  // Preserve original JSON formatting style (2-space indent)
  fs.writeFileSync(TAXONOMY_PATH, JSON.stringify(taxonomy, null, 2) + '\n', 'utf8');
  console.log('Wrote ' + TAXONOMY_PATH);
}

main();
