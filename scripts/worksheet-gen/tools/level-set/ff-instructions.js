/**
 * ff-instructions.js — PRINTED instructions of the Fact Families Level Set levels whose page differs from the face's
 * published one (Level Set 2026-10-07). Level 3 blanks a different number in each fact (the result, the second or the
 * first), so "complete the facts" no longer fits; every locale's published G1-222 line ("Write the missing number in
 * each fact", native-authored) does and is reused — EXCEPT sv and da, whose G1-222 line says the number is missing "in
 * the middle" (true only for G1-222's own published page: native review 2026-10-07). G1-222 level 3 also moves the gap
 * to the first number, so sv/da get their own line there and sv/da/no a level title without "the middle".
 */
'use strict';
const fs = require('fs'); const path = require('path');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const missing = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'i18n', `strings.${l}.json`), 'utf8'))['G1-222'].instruction]));
missing.sv = 'Använd de tre talen på taket. Skriv talet som saknas i varje uppgift.';
missing.da = 'Brug de tre tal på taget. Skriv det tal, der mangler, i hvert regnestykke.';
module.exports = {
  ...Object.fromEntries(['G1-209', 'G1-219', 'G1-220', 'G1-221', 'G3-369'].map((id) => [id, { 3: missing }])),
  'G1-222': { 3: {
    sv: { title: 'Räknefamiljer: talet som saknas', instruction: missing.sv },
    da: { title: 'Talfamilier: find det tal, der mangler', instruction: missing.da },
    no: { title: 'Regnefamilier: tallet som mangler', instruction: 'Bruk de tre tallene på taket. Skriv tallet som mangler i hvert regnestykke.' },
  } },
};
