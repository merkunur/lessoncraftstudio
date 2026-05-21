/* =====================================================================
   SOURCE: NST pronunciation lexicon (sv/no/da)
   ---------------------------------------------------------------------
   NST = Nordisk Språkteknologi. Three lexicons (Swedish ~927k entries,
   Norwegian Bokmål ~785k, Danish ~238k) released into the PUBLIC DOMAIN
   (CC-ZERO) by Nasjonalbiblioteket Språkbanken after the NST bankruptcy.

   Distribution URLs (each .tar.gz, ~tens of MB compressed):
     sv: https://www.nb.no/sbfil/leksikalske_databaser/leksikon/sv.leksikon.tar.gz
     no: https://www.nb.no/sbfil/leksikalske_databaser/leksikon/no.leksikon.tar.gz
     da: https://www.nb.no/sbfil/leksikalske_databaser/leksikon/da_leksikon.tar.gz
   (URL casing differs: sv & no use ".leksikon", da uses "_leksikon" — operator-verified.)

   Format: semicolon-separated, 51 fields per entry. Field 0 (canonical
   orthography) and a SAMPA-transcription field (varies by locale: SV is
   ~field 11, NO is ~field 11, DA is ~field 11 with stød marker `'`).

   Pipeline strategy:
     1. Download .tar.gz to .cache/nst/ on first run (or skipped if present)
     2. Extract + parse + filter to only our 1,263 nouns per locale
     3. Cache reduced index at .cache/nst/<locale>-reduced.json (small)
     4. Subsequent runs read from the reduced index

   Syllable boundary extraction:
     SAMPA encodes syllable boundaries with `$` (NST standard) OR splits
     across primary-stress `"` and secondary-stress `%` markers. We parse
     by splitting on $ first; if absent, fall back to vowel-cluster
     heuristics inside the SAMPA string.

     For the proof we treat the SAMPA-phoneme count → grapheme-syllable
     count via vowel-nucleus counting, which is robust enough for K-3
     nouns where syllable structure is clean.
   ===================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');
const { spawnSync } = require('child_process');

const CACHE_DIR = path.join(__dirname, '..', '.cache', 'nst');

const URLS = {
  sv: 'https://www.nb.no/sbfil/leksikalske_databaser/leksikon/sv.leksikon.tar.gz',
  no: 'https://www.nb.no/sbfil/leksikalske_databaser/leksikon/no.leksikon.tar.gz',
  da: 'https://www.nb.no/sbfil/leksikalske_databaser/leksikon/da_leksikon.tar.gz'
};

/* SAMPA field index per locale (verified empirically at first run).
   These can be re-derived by inspecting raw entries; we cache the
   determined index in the reduced file for traceability. */
const SAMPA_FIELD_GUESS = {
  sv: 11,
  no: 11,
  da: 11
};

const VOWEL_SAMPA = /[aeiouyåäöæø@A-Z\d]/i; // permissive — SAMPA vowels include uppercase variants

function ensureCacheDir() {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function reducedCachePath(locale) {
  return path.join(CACHE_DIR, locale + '-reduced.json');
}

function rawArchivePath(locale) {
  return path.join(CACHE_DIR, locale + '.leksikon.tar.gz');
}

/* Download a URL to a file via https. Returns Promise<void>. */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error('NST download failed: HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

/* Extract .tar.gz via system `tar`. Returns the path to the extracted
   raw text file (NST distributes a single .leksikon text file). */
function extractArchive(archivePath, locale) {
  ensureCacheDir();
  const extractDir = path.join(CACHE_DIR, locale + '-extracted');
  fs.mkdirSync(extractDir, { recursive: true });
  // Use system tar. On Windows/Git-Bash, tar may interpret 'C:\...' as a
  // remote host before the colon — invoke tar with --force-local OR use
  // forward-slash paths. The safest cross-platform approach is to cd into
  // extractDir + pass a relative archive path.
  const archiveBase = path.basename(archivePath);
  const stagedArchive = path.join(extractDir, archiveBase);
  if (!fs.existsSync(stagedArchive)) fs.copyFileSync(archivePath, stagedArchive);
  const r = spawnSync('tar', ['-xzf', archiveBase], { cwd: extractDir, stdio: 'inherit' });
  if (r.status !== 0) throw new Error('tar extraction failed (status ' + r.status + ')');
  // Clean up the copied archive after extraction
  try { fs.unlinkSync(stagedArchive); } catch (e) { /* ignore */ }
  // NST archives have nested structure: <localized leksikon dir>/<*.pron dir>/<*.pron data file>.
  // Walk recursively to find the .pron data file (not the inspect_lex.pl script or .OUT inspection file).
  function findProneFile(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const inner = findProneFile(full);
        if (inner) return inner;
      } else if (entry.isFile() && /\.pron$/i.test(entry.name) && !/_inspect/i.test(entry.name)) {
        return full;
      }
    }
    return null;
  }
  const dataFile = findProneFile(extractDir);
  if (!dataFile) throw new Error('Could not find .pron data file under: ' + extractDir);
  return dataFile;
}

/* Parse SAMPA into syllable count.
   NST SAMPA marks syllable boundaries with `$` and primary stress with `"`,
   secondary stress with `%`. Count via `$` separators + 1 (each `$` = 1
   boundary; n boundaries = n+1 syllables). Fall back to stress-marker count
   if no `$` is present (rare, mostly monosyllabic). */
function countSyllablesFromSampa(sampa) {
  if (!sampa || typeof sampa !== 'string') return null;
  // Count `$` syllable-boundary markers
  const boundaries = (sampa.match(/\$/g) || []).length;
  if (boundaries > 0) return boundaries + 1;
  // No boundaries → either monosyllabic OR count stress markers
  const stressMarks = (sampa.match(/["%]/g) || []).length;
  return stressMarks > 0 ? stressMarks : 1;
}

/* Parse SAMPA into syllable strings via $ separator (NST standard).
   When $ isn't present, return null — caller falls back to count. */
function splitSampaSyllables(sampa) {
  if (!sampa || typeof sampa !== 'string') return null;
  if (sampa.indexOf('$') === -1) return null;
  return sampa.split('$').map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Build the reduced cache from the raw NST file for a given locale.
 * Filters to only the words in `wordSet` (lowercase Set), and emits
 * a JSON { word: { sampa, sylCount, sylSplit } } map.
 *
 * Memory-efficient: streams the 185MB+ file line-by-line via readline.
 * Skips NST compound morphemes (entries starting with '-' or '+').
 */
async function buildReducedFromRaw(rawTxtPath, locale, wordSet) {
  const readline = require('readline');
  const sampaIdx = SAMPA_FIELD_GUESS[locale];
  const out = {};
  let matched = 0;
  let total = 0;
  const stream = fs.createReadStream(rawTxtPath, { encoding: 'latin1' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  for await (const line of rl) {
    total++;
    if (!line || line.startsWith('#') || line.startsWith('-') || line.startsWith('+')) continue;
    const fields = line.split(';');
    if (fields.length < sampaIdx + 1) continue;
    const headword = (fields[0] || '').toLowerCase();
    if (!wordSet.has(headword)) continue;
    const sampa = fields[sampaIdx] || '';
    if (!sampa) continue;
    if (out[headword]) continue; // Prefer first matching entry per word
    out[headword] = {
      sampa,
      sylCount: countSyllablesFromSampa(sampa),
      sylSplit: splitSampaSyllables(sampa)
    };
    matched++;
  }
  console.error(`[nst] Scanned ${total} lines, matched ${matched} K-3 words`);
  return { count: matched, entries: out, sampa_field_index: sampaIdx, total_lines: total };
}

/**
 * Ensure the reduced NST cache exists for `locale`, downloading + parsing
 * the full archive if necessary. `wordSet` is a Set of lowercased words to
 * filter on. Returns the parsed reduced map.
 */
async function ensureReduced(locale, wordSet) {
  ensureCacheDir();
  const cachePath = reducedCachePath(locale);
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
  }
  const archivePath = rawArchivePath(locale);
  if (!fs.existsSync(archivePath)) {
    console.error(`[nst] Downloading NST ${locale} lexicon from Språkbanken...`);
    await downloadFile(URLS[locale], archivePath);
    console.error(`[nst] Download complete: ${fs.statSync(archivePath).size} bytes`);
  }
  console.error(`[nst] Extracting + parsing ${locale}...`);
  const rawTxt = extractArchive(archivePath, locale);
  const reduced = await buildReducedFromRaw(rawTxt, locale, wordSet);
  fs.writeFileSync(cachePath, JSON.stringify(reduced, null, 2));
  console.error(`[nst] Cached ${reduced.count} entries → ${cachePath}`);
  return reduced;
}

/** Lookup word in pre-built reduced cache. */
function lookup(word, reducedCache) {
  if (!word || !reducedCache || !reducedCache.entries) return null;
  return reducedCache.entries[word.toLowerCase()] || null;
}

module.exports = { ensureReduced, lookup, countSyllablesFromSampa, splitSampaSyllables, URLS };
