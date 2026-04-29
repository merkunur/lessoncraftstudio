/**
 * Strict-arg parser for publish-cli per Brief B Phase 4 Surface 5
 * + safety-gap item 20 (queued at addition-image-image-2 cleanup).
 *
 * Schema-driven. Subcommand declares allowed flags and required positionals;
 * unknown flags / unknown subcommands / missing positionals throw structured
 * UsageError with closest-known suggestion (Levenshtein) before any side-effect.
 *
 * Replaces the prior permissive parseArgs at index.js:49-72 which silently
 * ignored unknown flags. The silent-ignore behavior produced an unintended
 * publish during pre-Phase-4 hygiene verification (`--update-deck-id foo`
 * fell through to the new-publish path; addition-image-image-2 was created
 * and later cleaned up).
 */

'use strict';

function UsageError(message, suggestion) {
  var err = new Error(message);
  err.isUsageError = true;
  if (suggestion) err.suggestion = suggestion;
  return err;
}

/**
 * Schema shape:
 *   {
 *     '<cmd>': {
 *       positional: ['<name1>', '<name2>'],   // required positionals in order
 *       flags: { '--name': 'value' | 'bool' } // declared flags
 *     }
 *   }
 *
 * Returns: { cmd, positional: { name: value, ... }, flags: { '--name': value, ... } }.
 *
 * 'value' flags consume the next argv token; 'bool' flags do not.
 */
function parseStrict(argv, schemas) {
  var args = argv.slice(2);
  if (args.length < 1) {
    throw UsageError('No subcommand provided.');
  }
  var cmd = args[0];
  if (!schemas[cmd]) {
    var cmdSuggestion = closestMatch(cmd, Object.keys(schemas));
    throw UsageError(
      'Unknown subcommand "' + cmd + '"' +
      (cmdSuggestion ? ' (did you mean "' + cmdSuggestion + '"?)' : '') + '.',
      cmdSuggestion
    );
  }
  var schema = schemas[cmd];
  var allowedFlags = schema.flags || {};
  var allowedFlagNames = Object.keys(allowedFlags);
  var positional = {};
  var flags = {};
  var positionalIdx = 0;

  for (var i = 1; i < args.length; i++) {
    var tok = args[i];
    if (tok.indexOf('--') === 0) {
      // Flag.
      if (!Object.prototype.hasOwnProperty.call(allowedFlags, tok)) {
        var flagSuggestion = closestMatch(tok, allowedFlagNames);
        throw UsageError(
          'Unknown flag "' + tok + '" for subcommand "' + cmd + '"' +
          (flagSuggestion ? ' (did you mean "' + flagSuggestion + '"?)' : '') + '.',
          flagSuggestion
        );
      }
      var flagKind = allowedFlags[tok];
      if (flagKind === 'bool') {
        flags[tok] = true;
      } else if (flagKind === 'value') {
        if (i + 1 >= args.length) {
          throw UsageError('Flag "' + tok + '" requires a value.');
        }
        flags[tok] = args[i + 1];
        i++;
      } else {
        throw new Error('strict-args: schema bug — flag "' + tok + '" has unknown kind "' + flagKind + '"');
      }
    } else {
      // Positional.
      var posName = (schema.positional || [])[positionalIdx];
      if (!posName) {
        throw UsageError(
          'Unexpected positional argument "' + tok + '" for subcommand "' + cmd +
          '" (expected ' + (schema.positional || []).length + ' positional(s)).'
        );
      }
      positional[posName] = tok;
      positionalIdx++;
    }
  }

  // Verify required positionals supplied.
  var requiredPositionals = schema.positional || [];
  for (var p = 0; p < requiredPositionals.length; p++) {
    var name = requiredPositionals[p];
    if (!Object.prototype.hasOwnProperty.call(positional, name)) {
      throw UsageError('Missing required positional argument <' + name + '> for subcommand "' + cmd + '".');
    }
  }

  return { cmd: cmd, positional: positional, flags: flags };
}

/**
 * Levenshtein edit distance.
 */
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  var matrix = [];
  var i, j;
  for (i = 0; i <= b.length; i++) matrix[i] = [i];
  for (j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Closest-match: returns the candidate with min Levenshtein distance to query,
 * or null if no candidate is within distance 3 (heuristic threshold to avoid
 * surfacing nonsense suggestions).
 */
function closestMatch(query, candidates) {
  if (!candidates || !candidates.length) return null;
  var best = null;
  var bestDist = Infinity;
  for (var i = 0; i < candidates.length; i++) {
    var d = levenshtein(query, candidates[i]);
    if (d < bestDist) {
      bestDist = d;
      best = candidates[i];
    }
  }
  return bestDist <= 3 ? best : null;
}

module.exports = {
  parseStrict: parseStrict,
  levenshtein: levenshtein,
  closestMatch: closestMatch,
  UsageError: UsageError
};
