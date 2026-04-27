// One-shot Group A 5A.3 Commit 3: add per-app sr-only translation keys
// + shared SEO/end-deck keys (where missing) + math-worksheet's 3
// srOperator keys to the 19 Group A apps' translation files.
//
// English + German only per Brief A's Tier 1 commitment. Other 9
// languages fall back to English via the existing t() chain (debt
// tracked in project_brief_a_translation_debt.md).

const fs = require('fs');
const path = require('path');

// Shared keys that go into every app's translation file (in addition
// to per-app srExercise* keys). Already present in addition,
// wordsearch, treasure-hunt — script skips when already present.
const SHARED_EN = {
  seoFreeInteractive: 'Free interactive',
  seoFor: 'for',
  seoPrintOrPlayOnline: 'Print or play online',
  srWorksheetQuestions: 'Worksheet questions',
  endDeckHeading: 'Want more?',
  endDeckMoreType: 'More {type} worksheets',
  endDeckMoreTheme: 'More {theme} worksheets',
  endDeckMoreLevel: 'More worksheets for {level}',
  endDeckBrowseAll: 'Browse all worksheets'
};
const SHARED_DE = {
  seoFreeInteractive: 'Kostenloses interaktives',
  seoFor: 'für',
  seoPrintOrPlayOnline: 'Drucken oder online spielen',
  srWorksheetQuestions: 'Arbeitsblatt-Fragen',
  endDeckHeading: 'Mehr davon?',
  endDeckMoreType: 'Mehr {type}-Arbeitsblätter',
  endDeckMoreTheme: 'Mehr {theme}-Arbeitsblätter',
  endDeckMoreLevel: 'Mehr Arbeitsblätter für {level}',
  endDeckBrowseAll: 'Alle Arbeitsblätter durchsuchen'
};

// Per-app translation files + per-app sr-only keys (en + de).
// File names match REFERENCE TRANSLATIONS/ entries.
const APPS = {
  'translations-subtraction.js': {
    en: {
      srExerciseSubtraction: 'Question {n}: {minuend} minus {subtrahend} equals blank.',
      srExerciseSubtractionFindSubtrahend: 'Question {n}: {minuend} minus blank equals {result}.'
    },
    de: {
      srExerciseSubtraction: 'Frage {n}: {minuend} minus {subtrahend} ist gleich Leerzeichen.',
      srExerciseSubtractionFindSubtrahend: 'Frage {n}: {minuend} minus Leerzeichen ist gleich {result}.'
    }
  },
  'translations-code-addition.js': {
    en: {
      srExerciseCodeAddition: 'Question {n}: Add the picture values together and write the total.',
      srExerciseCodeAdditionWordReveal: 'Question {n}: Add the picture values, then write the letter that matches the total.'
    },
    de: {
      srExerciseCodeAddition: 'Frage {n}: Addiere die Bildwerte und schreibe die Summe.',
      srExerciseCodeAdditionWordReveal: 'Frage {n}: Addiere die Bildwerte und schreibe dann den Buchstaben, der zur Summe passt.'
    }
  },
  'translations-more-less.js': {
    en: {
      srExerciseMoreLessCheckCross: 'Question {n}: Count the {pluralA} on the left and the {pluralB} on the right. Write each count.',
      srExerciseMoreLessComparison: 'Question {n}: Compare the groups of {pluralA} and {pluralB}. Pick the correct sign: greater than, less than, or equal to.'
    },
    de: {
      srExerciseMoreLessCheckCross: 'Frage {n}: Zähle die {pluralA} links und die {pluralB} rechts. Schreibe jede Anzahl auf.',
      srExerciseMoreLessComparison: 'Frage {n}: Vergleiche die Gruppen aus {pluralA} und {pluralB}. Wähle das richtige Zeichen: größer als, kleiner als oder gleich.'
    }
  },
  'translations-math-puzzle.js': {
    en: {
      srExerciseMathPuzzle: 'Question {n}: {operationText} blank.'
    },
    de: {
      srExerciseMathPuzzle: 'Frage {n}: {operationText} Leerzeichen.'
    }
  },
  'translations-math-worksheet-final.js': {
    en: {
      srExerciseMathWorksheet: 'Question {n}: Find what each picture equals using these equations: {equations}.',
      srOperatorPlus: 'plus',
      srOperatorMinus: 'minus',
      srOperatorEquals: 'equals'
    },
    de: {
      srExerciseMathWorksheet: 'Frage {n}: Finde heraus, was jedes Bild ergibt, mit Hilfe dieser Gleichungen: {equations}.',
      srOperatorPlus: 'plus',
      srOperatorMinus: 'minus',
      srOperatorEquals: 'ist gleich'
    }
  },
  'translations-alphabet-train-complete.js': {
    en: {
      srExerciseAlphabetTrain: 'Question {n}: Drag the correct letter into wagon {n}.'
    },
    de: {
      srExerciseAlphabetTrain: 'Frage {n}: Ziehe den richtigen Buchstaben in Waggon {n}.'
    }
  },
  'translations-pattern-train.js': {
    en: {
      srExercisePatternTrain: 'Question {n}: Drag the correct image into wagon {n} to complete the pattern.'
    },
    de: {
      srExercisePatternTrain: 'Frage {n}: Ziehe das richtige Bild in Waggon {n}, um das Muster zu vervollständigen.'
    }
  },
  'translations-prepositions.js': {
    en: {
      srExercisePrepositionsChoice: 'Question {n}: Choose the preposition that describes the position of the {item} relative to the {shape}.',
      srExercisePrepositionsFillIn: 'Question {n}: Write the preposition that describes the position of the {item} relative to the {shape}.'
    },
    de: {
      srExercisePrepositionsChoice: 'Frage {n}: Wähle die Präposition, die die Position der {item} im Verhältnis zur {shape} beschreibt.',
      srExercisePrepositionsFillIn: 'Frage {n}: Schreibe die Präposition, die die Position der {item} im Verhältnis zur {shape} beschreibt.'
    }
  },
  'translations-word-guess.js': {
    en: {
      srExerciseWordGuess: 'Question {n}: Spell the word for the picture shown. Some letters are already filled in.'
    },
    de: {
      srExerciseWordGuess: 'Frage {n}: Buchstabiere das Wort zum gezeigten Bild. Einige Buchstaben sind bereits ausgefüllt.'
    }
  },
  'translations-word-scramble-complete.js': {
    en: {
      srExerciseWordScramble: 'Question {n}: Unscramble the letters {scrambledLetters} to spell the word for the picture shown.'
    },
    de: {
      srExerciseWordScramble: 'Frage {n}: Entwirre die Buchstaben {scrambledLetters}, um das Wort zum gezeigten Bild zu schreiben.'
    }
  },
  'translations-big-small.js': {
    en: {
      srExerciseBigSmallFindSmall: 'Question {n}: Circle the smallest one.',
      srExerciseBigSmallFindBig: 'Question {n}: Circle the biggest one.',
      srExerciseBigSmallFindMed: 'Question {n}: Circle the medium-sized one.',
      srExerciseBigSmallOrderAsc: 'Question {n}: Number the {N} pictures from smallest (1) to biggest.',
      srExerciseBigSmallOrderDesc: 'Question {n}: Number the {N} pictures from biggest (1) to smallest.'
    },
    de: {
      srExerciseBigSmallFindSmall: 'Frage {n}: Kreise das kleinste ein.',
      srExerciseBigSmallFindBig: 'Frage {n}: Kreise das größte ein.',
      srExerciseBigSmallFindMed: 'Frage {n}: Kreise das mittelgroße ein.',
      srExerciseBigSmallOrderAsc: 'Frage {n}: Nummeriere die {N} Bilder vom kleinsten (1) bis zum größten.',
      srExerciseBigSmallOrderDesc: 'Frage {n}: Nummeriere die {N} Bilder vom größten (1) bis zum kleinsten.'
    }
  },
  'translations-pattern-worksheet.js': {
    en: {
      srExercisePatternWorksheetBlank: 'Question {n}: Fill in the blank to complete the pattern.',
      srExercisePatternWorksheetOptions: 'Question {n}: Choose the picture that completes the pattern.'
    },
    de: {
      srExercisePatternWorksheetBlank: 'Frage {n}: Fülle die Lücke, um das Muster zu vervollständigen.',
      srExercisePatternWorksheetOptions: 'Frage {n}: Wähle das Bild, das das Muster vervollständigt.'
    }
  },
  'translations-find-and-count-complete.js': {
    en: {
      srExerciseFindAndCountCircle: 'Question {n}: Circle every {word} in the picture.',
      srExerciseFindAndCountSquare: 'Question {n}: Draw a square around every {word} in the picture.',
      srExerciseFindAndCountCross: 'Question {n}: Cross out every {word} in the picture.',
      srExerciseFindAndCountCount: 'Question {n}: Count every {word} in the picture and write the total.'
    },
    de: {
      srExerciseFindAndCountCircle: 'Frage {n}: Kreise jedes {word} im Bild ein.',
      srExerciseFindAndCountSquare: 'Frage {n}: Zeichne ein Quadrat um jedes {word} im Bild.',
      srExerciseFindAndCountCross: 'Frage {n}: Streiche jedes {word} im Bild durch.',
      srExerciseFindAndCountCount: 'Frage {n}: Zähle jedes {word} im Bild und schreibe die Anzahl auf.'
    }
  },
  'translations-chart-count.js': {
    en: {
      srExerciseChartCount: 'Question {n}: Count the {word} in the picture and shade the column to show how many you counted.'
    },
    de: {
      srExerciseChartCount: 'Frage {n}: Zähle die {word} im Bild und schattiere die Spalte, um zu zeigen, wie viele du gezählt hast.'
    }
  },
  'translations-matchup-maker.js': {
    en: {
      srExerciseMatching: 'Question {n}: Match {leftValue} on the left to its matching item on the right.'
    },
    de: {
      srExerciseMatching: 'Frage {n}: Verbinde {leftValue} links mit dem passenden Bild rechts.'
    }
  },
  'translations-shadow-match.js': {
    en: {
      srExerciseShadowMatchShadow: 'Question {n}: Match the {item} to its shadow.',
      srExerciseShadowMatchMakeItWhole: 'Question {n}: Match the {item} to the piece that completes it.'
    },
    de: {
      srExerciseShadowMatchShadow: 'Frage {n}: Verbinde das {item} mit seinem Schatten.',
      srExerciseShadowMatchMakeItWhole: 'Frage {n}: Verbinde das {item} mit dem Teil, das es vervollständigt.'
    }
  },
  'translations-grid-match.js': {
    en: {
      srExerciseGridMatch: 'Question {n}: Drag the {label} tile into its matching grid cell.'
    },
    de: {
      srExerciseGridMatch: 'Frage {n}: Ziehe das Feld {label} in die passende Gitterzelle.'
    }
  },
  'translations-missing-pieces.js': {
    en: {
      srExerciseMissingPieces: 'Question {n}: Drag the missing {pieceShape} piece into the empty space at position {n}.'
    },
    de: {
      srExerciseMissingPieces: 'Frage {n}: Ziehe das fehlende {pieceShape}-Stück in die leere Stelle an Position {n}.'
    }
  },
  'translations-odd-one-out.js': {
    en: {
      srExerciseOddOneOut: "Question {n}: Find the picture that doesn't belong with the others."
    },
    de: {
      srExerciseOddOneOut: 'Frage {n}: Finde das Bild, das nicht zu den anderen passt.'
    }
  }
};

function addKeysToBlock(content, langCode, kvPairs) {
  const startRe = new RegExp('(?:^|[\\s,])"?' + langCode + '"?\\s*:\\s*\\{', 'm');
  const startMatch = content.match(startRe);
  if (!startMatch) return { content, changed: 0, error: 'no language block ' + langCode };

  const startIdx = startMatch.index + startMatch[0].length;
  let depth = 1;
  let inString = false;
  let escapeNext = false;
  let i = startIdx;
  while (i < content.length && depth > 0) {
    const c = content[i];
    if (escapeNext) { escapeNext = false; }
    else if (c === '\\') { escapeNext = true; }
    else if (inString) {
      if (c === '"') inString = false;
    } else {
      if (c === '"') inString = true;
      else if (c === '{') depth++;
      else if (c === '}') depth--;
      if (depth === 0) break;
    }
    i++;
  }
  if (depth !== 0) return { content, changed: 0, error: 'unbalanced braces' };

  let j = i - 1;
  while (j > startIdx && /\s/.test(content[j])) j--;
  const prevChar = content[j];
  const needsComma = prevChar !== ',' && prevChar !== '{';

  // Filter out keys that already exist in the language block (idempotent)
  const blockSlice = content.slice(startIdx, i);
  const filteredPairs = {};
  for (const [k, v] of Object.entries(kvPairs)) {
    const re = new RegExp('"' + k + '"\\s*:');
    if (!re.test(blockSlice)) {
      filteredPairs[k] = v;
    }
  }
  if (Object.keys(filteredPairs).length === 0) {
    return { content, changed: 0 };
  }

  const indent = '    ';
  const newLines = Object.entries(filteredPairs)
    .map(([k, v]) => indent + JSON.stringify(k) + ': ' + JSON.stringify(v))
    .join(',\n');
  const insert = (needsComma ? ',\n' : '\n') + newLines + '\n  ';
  const out = content.slice(0, i) + insert + content.slice(i);
  return { content: out, changed: Object.keys(filteredPairs).length };
}

const dir = 'REFERENCE TRANSLATIONS';
let totalFiles = 0, totalKeys = 0;
const failed = [];

for (const [file, perAppKeys] of Object.entries(APPS)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.error('MISSING: ' + filePath);
    failed.push(file);
    continue;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  const enKeys = Object.assign({}, SHARED_EN, perAppKeys.en);
  const deKeys = Object.assign({}, SHARED_DE, perAppKeys.de);

  let r = addKeysToBlock(s, 'en', enKeys);
  if (r.error) { console.error('FAIL en for ' + file + ': ' + r.error); failed.push(file); continue; }
  s = r.content;
  const enAdded = r.changed;

  r = addKeysToBlock(s, 'de', deKeys);
  if (r.error) { console.error('FAIL de for ' + file + ': ' + r.error); failed.push(file); continue; }
  s = r.content;
  const deAdded = r.changed;

  fs.writeFileSync(filePath, s, 'utf8');
  console.log('OK: ' + file + ' (en: +' + enAdded + ', de: +' + deAdded + ')');
  totalFiles++;
  totalKeys += enAdded + deAdded;
}

console.log('');
console.log('Total: ' + totalFiles + ' files, ' + totalKeys + ' key additions.');
if (failed.length > 0) {
  console.log('Failed: ' + failed.join(', '));
}
