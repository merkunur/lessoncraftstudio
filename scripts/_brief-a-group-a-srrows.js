// One-shot Group A 5A.3 apply: insert per-app srRows construction blocks
// + buildSrRows wiring into each of the 19 smoke-test apps' renderStandaloneHTML.
//
// Anchored on the buildEndDeckLinks declaration (uniformly placed by the
// Step 4 bulk script) and the if (seo.instruction) push (uniformly placed
// by the same script). Insertion is per-app — each app's row-construction
// logic varies because exercise data shape varies.
//
// math-worksheet additionally adds 3 srOperator keys via JSDoc convention —
// the keys themselves land in the translation files (Commit 3).

const fs = require('fs');
const path = require('path');

// Per-app row construction code. The string returned by each function is
// inserted directly after the `var endDeckLinks = ...` declaration.
// Indentation prefix is computed dynamically per app and applied at insert.
//
// Each function returns the raw JavaScript code WITHOUT leading indentation.
// The indentation is added at apply time to match the surrounding code.

const APPS = {
  'subtraction': {
    bundleField: 'bundle.problems',
    rowsCode: `// Per-row sr-only (Brief A §5.4 — Group A multi-row pattern).
var srExerciseTpl = (typeof t === 'function' && t('srExerciseSubtraction'))
    || 'Question {n}: {minuend} minus {subtrahend} equals blank.';
var srFindSubtrahendTpl = (typeof t === 'function' && t('srExerciseSubtractionFindSubtrahend'))
    || 'Question {n}: {minuend} minus blank equals {result}.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var problemsForSr = Array.isArray(bundle.problems) ? bundle.problems : [];
var srRows = problemsForSr.map(function (p, i) {
    var n = i + 1;
    var mode = p.resolvedMode || 'cross-out';
    if (mode === 'find-subtrahend') {
        var result = (typeof p.minuend === 'number' && typeof p.subtrahend === 'number')
            ? (p.minuend - p.subtrahend) : '';
        return srFindSubtrahendTpl
            .replace('{n}', n).replace('{minuend}', p.minuend).replace('{result}', result);
    }
    return srExerciseTpl
        .replace('{n}', n).replace('{minuend}', p.minuend).replace('{subtrahend}', p.subtrahend);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'code-addition': {
    rowsCode: `// Per-row sr-only — code-addition. Word-reveal mode detected via
// presence of slot.slotType === 'letter' (no explicit mode field).
var srExerciseTpl = (typeof t === 'function' && t('srExerciseCodeAddition'))
    || 'Question {n}: Add the picture values together and write the total.';
var srWordRevealTpl = (typeof t === 'function' && t('srExerciseCodeAdditionWordReveal'))
    || 'Question {n}: Add the picture values, then write the letter that matches the total.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var slotsForSr = Array.isArray(bundle.slots) ? bundle.slots : [];
var isWordReveal = slotsForSr.some(function (s) { return s && s.slotType === 'letter'; });
var problemsForSr = Array.isArray(bundle.problems) ? bundle.problems : [];
var srRows = problemsForSr.map(function (_p, i) {
    var n = i + 1;
    var tpl = isWordReveal ? srWordRevealTpl : srExerciseTpl;
    return tpl.replace('{n}', n);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'more-less': {
    rowsCode: `// Per-row sr-only — more-less. Plurals looked up via ImageVocab.plural
// at generation time so the deck.html sr-only carries the localized
// plural form (English-naive trailing 's' won't work in DE/SV/FI).
var srCheckCrossTpl = (typeof t === 'function' && t('srExerciseMoreLessCheckCross'))
    || 'Question {n}: Count the {pluralA} on the left and the {pluralB} on the right. Write each count.';
var srComparisonTpl = (typeof t === 'function' && t('srExerciseMoreLessComparison'))
    || 'Question {n}: Compare the groups of {pluralA} and {pluralB}. Pick the correct sign: greater than, less than, or equal to.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var srLang = (bundle.contentLanguage || 'en').slice(0, 2);
function _moreLessPlural(imagePath) {
    if (!imagePath || !window.ImageVocab) return '';
    var key = ImageVocab.keyFromPath(imagePath);
    if (!key) return '';
    var plural = ImageVocab.plural(key, srLang);
    return plural || key;
}
var problemsForSr = Array.isArray(bundle.problems) ? bundle.problems : [];
var srRows = problemsForSr.map(function (p, i) {
    var n = i + 1;
    var pluralA = _moreLessPlural(p.imageA);
    var pluralB = _moreLessPlural(p.imageB);
    var tpl = (p.comparisonMode === 'check-cross') ? srCheckCrossTpl : srComparisonTpl;
    return tpl.replace('{n}', n).replace('{pluralA}', pluralA).replace('{pluralB}', pluralB);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'math-puzzle': {
    rowsCode: `// Per-row sr-only — math-puzzle. operationText already contains the
// rendered equation (e.g., "5 + 3 ="), so substitution is direct.
var srExerciseTpl = (typeof t === 'function' && t('srExerciseMathPuzzle'))
    || 'Question {n}: {operationText} blank.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var cellsForSr = (bundle.grid && Array.isArray(bundle.grid.cells)) ? bundle.grid.cells : [];
var srRows = cellsForSr.map(function (c, i) {
    var n = i + 1;
    var op = (c && c.operationText) || '';
    return srExerciseTpl.replace('{n}', n).replace('{operationText}', op);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'math-worksheet': {
    rowsCode: `// Per-row sr-only — math-worksheet. One row per puzzle (card). Each
// row stitches puzzle.equations into a localized string by substituting
// each symbol letter with the localized image-vocabulary singular and
// each operator token with srOperator<Name>. Per-language concatenation
// limitation acknowledged in MEMORY.md — works for en + de, awkward in
// Romance/Dutch, structurally broken in Finnish.
var srExerciseTpl = (typeof t === 'function' && t('srExerciseMathWorksheet'))
    || 'Question {n}: Find what each picture equals using these equations: {equations}.';
var srOpPlus = (typeof t === 'function' && t('srOperatorPlus')) || 'plus';
var srOpMinus = (typeof t === 'function' && t('srOperatorMinus')) || 'minus';
var srOpEquals = (typeof t === 'function' && t('srOperatorEquals')) || 'equals';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var srLang = (bundle.contentLanguage || 'en').slice(0, 2);
function _mwSymbolLabel(symbol, imageMap) {
    var imgPath = imageMap && imageMap[symbol];
    if (imgPath && window.ImageVocab) {
        var key = ImageVocab.keyFromPath(imgPath);
        if (key) {
            var name = ImageVocab.singular(key, srLang);
            if (name) return name;
        }
    }
    return symbol;
}
function _mwTokenLabel(tok, imageMap) {
    if (tok === '+') return srOpPlus;
    if (tok === '-') return srOpMinus;
    if (tok === '=') return srOpEquals;
    return _mwSymbolLabel(tok, imageMap);
}
function _mwEquationToString(eq, imageMap) {
    if (!eq || typeof eq.expr !== 'string') return '';
    var parts = eq.expr.split(/\\s+/).filter(Boolean).map(function (tok) {
        return _mwTokenLabel(tok, imageMap);
    });
    return parts.join(' ') + ' ' + srOpEquals + ' ' + (eq.result != null ? eq.result : '');
}
// Group bundle.slots by problemIndex to recover per-puzzle data — math-
// worksheet's bundle exposes slots-flat rather than puzzles[]; the
// puzzles array lives on canvas.problemsData and isn't bundled.
var puzzlesData = (typeof DECK_BUNDLE !== 'undefined' && DECK_BUNDLE.puzzlesData) || (typeof window !== 'undefined' && window._mwPuzzlesData) || [];
// Fallback: derive puzzle indices from slots
var slotsForSr = Array.isArray(bundle.slots) ? bundle.slots : [];
var maxIdx = -1;
slotsForSr.forEach(function (s) { if (s && typeof s.problemIndex === 'number' && s.problemIndex > maxIdx) maxIdx = s.problemIndex; });
var puzzleCount = maxIdx + 1;
var srRows = [];
for (var pi = 0; pi < puzzleCount; pi++) {
    var n = pi + 1;
    var puzzle = puzzlesData[pi] || {};
    var equations = Array.isArray(puzzle.equations) ? puzzle.equations : [];
    var imageMap = puzzle.imageMap || {};
    var equationStrings = equations.map(function (eq) {
        return _mwEquationToString(eq, imageMap);
    }).filter(Boolean);
    var equationsStr = equationStrings.join(', ');
    srRows.push(srExerciseTpl.replace('{n}', n).replace('{equations}', equationsStr));
}
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'alphabet-train': {
    rowsCode: `// Per-row sr-only — alphabet-train. expectedLetter NOT included
// (would leak the deduction the student is supposed to do — see Brief A
// 5A.2 Issue 2 alphabet-train fix).
var srExerciseTpl = (typeof t === 'function' && t('srExerciseAlphabetTrain'))
    || 'Question {n}: Drag the correct letter into wagon {n}.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var cellsForSr = (bundle.grid && Array.isArray(bundle.grid.cells)) ? bundle.grid.cells : [];
var srRows = cellsForSr.map(function (_c, i) {
    var n = i + 1;
    return srExerciseTpl.replace(/\\{n\\}/g, n);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'pattern-train': {
    rowsCode: `// Per-row sr-only — pattern-train. expectedImage NOT included
// (same leak class as alphabet-train).
var srExerciseTpl = (typeof t === 'function' && t('srExercisePatternTrain'))
    || 'Question {n}: Drag the correct image into wagon {n} to complete the pattern.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var cellsForSr = (bundle.grid && Array.isArray(bundle.grid.cells)) ? bundle.grid.cells : [];
var srRows = cellsForSr.map(function (_c, i) {
    var n = i + 1;
    return srExerciseTpl.replace(/\\{n\\}/g, n);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'prepositions': {
    rowsCode: `// Per-row sr-only — prepositions. Mode chosen at deck level
// (multiplechoice vs fill-in). Item + shape names looked up via
// ImageVocab where the assignment carries an image path.
var srChoiceTpl = (typeof t === 'function' && t('srExercisePrepositionsChoice'))
    || 'Question {n}: Choose the preposition that describes the position of the {item} relative to the {shape}.';
var srFillInTpl = (typeof t === 'function' && t('srExercisePrepositionsFillIn'))
    || 'Question {n}: Write the preposition that describes the position of the {item} relative to the {shape}.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var srLang = (bundle.contentLanguage || 'en').slice(0, 2);
function _prepName(obj) {
    if (!obj) return '';
    if (obj.path && window.ImageVocab) {
        var key = ImageVocab.keyFromPath(obj.path);
        if (key) {
            var name = ImageVocab.singular(key, srLang);
            if (name) return name;
            return key;
        }
    }
    return obj.word || obj.name || '';
}
var assignmentsForSr = (bundle.problems && Array.isArray(bundle.problems))
    ? bundle.problems
    : (Array.isArray(bundle.assignments) ? bundle.assignments : []);
var srMode = (bundle.exerciseMode === 'multiplechoice') ? 'choice' : 'fillIn';
var srRows = assignmentsForSr.map(function (a, i) {
    var n = i + 1;
    var item = _prepName(a && a.item);
    var shape = _prepName(a && a.shape);
    var tpl = (srMode === 'choice') ? srChoiceTpl : srFillInTpl;
    return tpl.replace('{n}', n).replace('{item}', item).replace('{shape}', shape);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'word-guess': {
    rowsCode: `// Per-row sr-only — word-guess. One row per puzzle (one word to
// guess). Doesn't expose the answer letters.
var srExerciseTpl = (typeof t === 'function' && t('srExerciseWordGuess'))
    || 'Question {n}: Spell the word for the picture shown. Some letters are already filled in.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var puzzlesForSr = Array.isArray(bundle.puzzles) ? bundle.puzzles : [];
var srRows = puzzlesForSr.map(function (_p, i) {
    var n = i + 1;
    return srExerciseTpl.replace('{n}', n);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'word-scramble': {
    rowsCode: `// Per-row sr-only — word-scramble. The scrambled letters ARE shown
// to the sighted student (they're the puzzle), so including them in
// the sr-only is parity, not a leak.
var srExerciseTpl = (typeof t === 'function' && t('srExerciseWordScramble'))
    || 'Question {n}: Unscramble the letters {scrambledLetters} to spell the word for the picture shown.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var puzzlesForSr = Array.isArray(bundle.puzzles) ? bundle.puzzles : [];
var srRows = puzzlesForSr.map(function (p, i) {
    var n = i + 1;
    var scrambled = '';
    if (p && Array.isArray(p.scrambledWords) && p.scrambledWords.length > 0) {
        scrambled = p.scrambledWords.join(' ');
    }
    return srExerciseTpl.replace('{n}', n).replace('{scrambledLetters}', scrambled);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'big-small': {
    rowsCode: `// Per-row sr-only — big-small. 5 mode variants per qType.
var srFindSmallTpl = (typeof t === 'function' && t('srExerciseBigSmallFindSmall'))
    || 'Question {n}: Circle the smallest one.';
var srFindBigTpl = (typeof t === 'function' && t('srExerciseBigSmallFindBig'))
    || 'Question {n}: Circle the biggest one.';
var srFindMedTpl = (typeof t === 'function' && t('srExerciseBigSmallFindMed'))
    || 'Question {n}: Circle the medium-sized one.';
var srOrderAscTpl = (typeof t === 'function' && t('srExerciseBigSmallOrderAsc'))
    || 'Question {n}: Number the {N} pictures from smallest (1) to biggest.';
var srOrderDescTpl = (typeof t === 'function' && t('srExerciseBigSmallOrderDesc'))
    || 'Question {n}: Number the {N} pictures from biggest (1) to smallest.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var qType = bundle.qType || 'findBig';
var imagesPerProblem = bundle.imagesPerProblem || 0;
var problemsForSr = Array.isArray(bundle.problems) ? bundle.problems : [];
var srRows = problemsForSr.map(function (_p, i) {
    var n = i + 1;
    var tpl;
    if (qType === 'findSmall') tpl = srFindSmallTpl;
    else if (qType === 'findMed') tpl = srFindMedTpl;
    else if (qType === 'orderAsc') tpl = srOrderAscTpl;
    else if (qType === 'orderDesc') tpl = srOrderDescTpl;
    else tpl = srFindBigTpl;
    return tpl.replace('{n}', n).replace('{N}', String(imagesPerProblem));
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'pattern-worksheet': {
    rowsCode: `// Per-row sr-only — pattern-worksheet. qtype lives per-puzzle.
var srBlankTpl = (typeof t === 'function' && t('srExercisePatternWorksheetBlank'))
    || 'Question {n}: Fill in the blank to complete the pattern.';
var srOptionsTpl = (typeof t === 'function' && t('srExercisePatternWorksheetOptions'))
    || 'Question {n}: Choose the picture that completes the pattern.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var puzzlesForSr = Array.isArray(bundle.problems) ? bundle.problems : [];
var srRows = puzzlesForSr.map(function (p, i) {
    var n = i + 1;
    var qtype = (p && p.qtype) || (p && p.questionType) || 'blank';
    var tpl = (qtype === 'options') ? srOptionsTpl : srBlankTpl;
    return tpl.replace('{n}', n);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'find-and-count': {
    rowsCode: `// Per-row sr-only — find-and-count. 4 keys per taskType.
var srCircleTpl = (typeof t === 'function' && t('srExerciseFindAndCountCircle'))
    || 'Question {n}: Circle every {word} in the picture.';
var srSquareTpl = (typeof t === 'function' && t('srExerciseFindAndCountSquare'))
    || 'Question {n}: Draw a square around every {word} in the picture.';
var srCrossTpl = (typeof t === 'function' && t('srExerciseFindAndCountCross'))
    || 'Question {n}: Cross out every {word} in the picture.';
var srCountTpl = (typeof t === 'function' && t('srExerciseFindAndCountCount'))
    || 'Question {n}: Count every {word} in the picture and write the total.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var srLang = (bundle.contentLanguage || 'en').slice(0, 2);
function _facWord(target) {
    if (!target) return '';
    if (target.canonicalKey && window.ImageVocab) {
        var name = ImageVocab.singular(target.canonicalKey, srLang);
        if (name) return name;
    }
    return target.word || '';
}
var targetsForSr = Array.isArray(bundle.targets) ? bundle.targets : [];
var srRows = targetsForSr.map(function (target, i) {
    var n = i + 1;
    var word = _facWord(target);
    var taskType = (target && target.taskType) || 'circle';
    var tpl;
    if (taskType === 'square') tpl = srSquareTpl;
    else if (taskType === 'cross') tpl = srCrossTpl;
    else if (taskType === 'count') tpl = srCountTpl;
    else tpl = srCircleTpl;
    return tpl.replace('{n}', n).replace('{word}', word);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'chart-count': {
    rowsCode: `// Per-row sr-only — chart-count. {totalCount} deliberately NOT
// referenced (would leak the answer per Brief A 5A.2 Issue 1).
var srExerciseTpl = (typeof t === 'function' && t('srExerciseChartCount'))
    || 'Question {n}: Count the {word} in the picture and shade the column to show how many you counted.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var srLang = (bundle.contentLanguage || 'en').slice(0, 2);
function _ccWord(target) {
    if (!target) return '';
    if (target.canonicalKey && window.ImageVocab) {
        var name = ImageVocab.plural(target.canonicalKey, srLang);
        if (name) return name;
    }
    return target.word || '';
}
var targetsForSr = Array.isArray(bundle.targets) ? bundle.targets : [];
var srRows = targetsForSr.map(function (target, i) {
    var n = i + 1;
    return srExerciseTpl.replace('{n}', n).replace('{word}', _ccWord(target));
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'matching': {
    rowsCode: `// Per-row sr-only — matching. leftValue and rightValue are
// already localized strings (image filename basename or custom word).
var srExerciseTpl = (typeof t === 'function' && t('srExerciseMatching'))
    || 'Question {n}: Match {leftValue} on the left to its matching item on the right.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var pairsForSr = Array.isArray(bundle.pairs) ? bundle.pairs : [];
var srRows = pairsForSr.map(function (pair, i) {
    var n = i + 1;
    var leftValue = (pair && pair.leftValue) || '';
    return srExerciseTpl.replace('{n}', n).replace('{leftValue}', leftValue);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'shadow-match': {
    rowsCode: `// Per-row sr-only — shadow-match. Mode lives at deck level (radio).
var srShadowTpl = (typeof t === 'function' && t('srExerciseShadowMatchShadow'))
    || 'Question {n}: Match the {item} to its shadow.';
var srMakeItWholeTpl = (typeof t === 'function' && t('srExerciseShadowMatchMakeItWhole'))
    || 'Question {n}: Match the {item} to the piece that completes it.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var srLang = (bundle.contentLanguage || 'en').slice(0, 2);
function _smName(image) {
    if (!image) return '';
    if (image.path && window.ImageVocab) {
        var key = ImageVocab.keyFromPath(image.path);
        if (key) {
            var name = ImageVocab.singular(key, srLang);
            if (name) return name;
        }
    }
    return (image && (image.word || image.name)) || '';
}
var srMode = bundle.mode || (bundle.exerciseMode === 'makeItWhole' ? 'makeItWhole' : 'shadowMatch');
var pairsForSr = Array.isArray(bundle.pairs) ? bundle.pairs : [];
var srRows = pairsForSr.map(function (pair, i) {
    var n = i + 1;
    var item = _smName(pair && pair.image);
    var tpl = (srMode === 'makeItWhole') ? srMakeItWholeTpl : srShadowTpl;
    return tpl.replace('{n}', n).replace('{item}', item);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'grid-match': {
    rowsCode: `// Per-row sr-only — grid-match. solutionLabels are already-localized
// strings (label per cell). bundle.solutionLabels is a flat array.
var srExerciseTpl = (typeof t === 'function' && t('srExerciseGridMatch'))
    || 'Question {n}: Drag the {label} tile into its matching grid cell.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var labelsForSr = Array.isArray(bundle.solutionLabels) ? bundle.solutionLabels : [];
var srRows = labelsForSr.map(function (label, i) {
    var n = i + 1;
    return srExerciseTpl.replace('{n}', n).replace('{label}', label || '');
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'missing-pieces': {
    rowsCode: `// Per-row sr-only — missing-pieces. pieceShape is a deck-level
// string (square / circle / etc.); positions are bundled.holes.
var srExerciseTpl = (typeof t === 'function' && t('srExerciseMissingPieces'))
    || 'Question {n}: Drag the missing {pieceShape} piece into the empty space at position {n}.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var pieceShape = bundle.pieceShape || 'piece';
var holesForSr = Array.isArray(bundle.holes) ? bundle.holes : [];
var srRows = holesForSr.map(function (_h, i) {
    var n = i + 1;
    return srExerciseTpl.replace(/\\{n\\}/g, n).replace('{pieceShape}', pieceShape);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  },

  'odd-one-out': {
    rowsCode: `// Per-row sr-only — odd-one-out. Mode varies but template is
// constant (the answer-finding instruction is the same regardless of
// whether the odd one is from a different theme — identical/similar).
var srExerciseTpl = (typeof t === 'function' && t('srExerciseOddOneOut'))
    || 'Question {n}: Find the picture that doesn\\'t belong with the others.';
var srExerciseLabel = (typeof t === 'function' && t('srWorksheetQuestions'))
    || 'Worksheet questions';
var problemsForSr = Array.isArray(bundle.problems) ? bundle.problems : [];
var srRows = problemsForSr.map(function (_p, i) {
    var n = i + 1;
    return srExerciseTpl.replace('{n}', n);
});
var srRowsHtml = (window.LCSCatalogExport && LCSCatalogExport.buildSrRows)
    ? LCSCatalogExport.buildSrRows({ label: srExerciseLabel, rows: srRows })
    : '';`
  }
};

function applyToApp(appName, config) {
  const filePath = path.join('REFERENCE APPS', appName + '.html');
  if (!fs.existsSync(filePath)) {
    return { ok: false, reason: 'file not found' };
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('LCSCatalogExport.buildSrRows')) {
    return { ok: false, reason: 'already wired (skipped)' };
  }
  const eol = content.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

  // Find the endDeckLinks declaration as anchor for the rowsCode insertion.
  // Pattern from Step 4: var endDeckLinks = (window.LCSCatalogExport && LCSCatalogExport.buildEndDeckLinks)
  //                          ? LCSCatalogExport.buildEndDeckLinks()
  //                          : '';
  const endDeckRe = /(\n)([ \t]+)var endDeckLinks = \(window\.LCSCatalogExport && LCSCatalogExport\.buildEndDeckLinks\)[\r\n]+\s+\? LCSCatalogExport\.buildEndDeckLinks\(\)[\r\n]+\s+: '';/;
  const endDeckMatch = content.match(endDeckRe);
  if (!endDeckMatch) {
    return { ok: false, reason: 'endDeckLinks declaration not found' };
  }
  const indent = endDeckMatch[2];
  // Indent the rowsCode block, prepending the indent to each line
  const rowsCode = config.rowsCode
    .split('\n')
    .map(line => line.length === 0 ? '' : indent + line)
    .join(eol);
  const insertion = endDeckMatch[0] + eol + eol + rowsCode;
  content = content.replace(endDeckRe, insertion);

  // Find the if (seo.instruction) push as anchor for the srRowsHtml push.
  // Pattern: if (seo.instruction) {
  //              parts.push('  <p class="lcs-sr">' + escapeHtml(seo.instruction) + '</p>');
  //          }
  const instrRe = /(\n)([ \t]+)if \(seo\.instruction\) \{[\r\n]+\s+parts\.push\('  <p class="lcs-sr">' \+ escapeHtml\(seo\.instruction\) \+ '<\/p>'\);[\r\n]+\s+\}/;
  const instrMatch = content.match(instrRe);
  if (!instrMatch) {
    return { ok: false, reason: 'if (seo.instruction) push not found' };
  }
  const instrIndent = instrMatch[2];
  const srRowsPush =
    instrMatch[0] + eol +
    instrIndent + 'if (srRowsHtml) {' + eol +
    instrIndent + '    parts.push(\'  \' + srRowsHtml);' + eol +
    instrIndent + '}';
  content = content.replace(instrRe, srRowsPush);

  fs.writeFileSync(filePath, content, 'utf8');
  return { ok: true };
}

const dryRun = process.argv.includes('--dry-run');
let okCount = 0, failCount = 0;
const failures = [];
for (const [appName, config] of Object.entries(APPS)) {
  if (dryRun) {
    // Just check that the anchors exist
    const filePath = path.join('REFERENCE APPS', appName + '.html');
    const content = fs.readFileSync(filePath, 'utf8');
    const hasEndDeck = /var endDeckLinks = \(window\.LCSCatalogExport && LCSCatalogExport\.buildEndDeckLinks\)/.test(content);
    const hasInstr = /if \(seo\.instruction\) \{/.test(content);
    if (hasEndDeck && hasInstr) {
      console.log('OK (dry-run): ' + appName);
      okCount++;
    } else {
      console.error('FAIL (dry-run): ' + appName + ' — endDeck:' + hasEndDeck + ' instr:' + hasInstr);
      failures.push(appName);
      failCount++;
    }
  } else {
    const result = applyToApp(appName, config);
    if (result.ok) {
      console.log('OK: ' + appName);
      okCount++;
    } else {
      console.error('FAIL: ' + appName + ' — ' + result.reason);
      failures.push({ app: appName, reason: result.reason });
      failCount++;
    }
  }
}
console.log('');
console.log('Summary: ' + okCount + ' ok, ' + failCount + ' failed');
if (dryRun) console.log('(DRY RUN — no files written)');
if (failures.length > 0) {
  console.log('Failures:');
  failures.forEach(f => console.log('  ' + JSON.stringify(f)));
}
