const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const BS = String.fromCharCode(92); // backslash char

function updateFile(dir, title, desc, keywords, heading) {
  const fp = path.join(base, dir, 'fi.ts');
  let content = fs.readFileSync(fp, 'utf8');
  const usesEscapes = content.includes(BS + 'u00');

  function encode(s) {
    if (!usesEscapes) return s;
    let r = '';
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c > 127) {
        r += BS + 'u' + c.toString(16).padStart(4, '0');
      } else {
        r += s[i];
      }
    }
    return r;
  }

  const t = encode(title);
  const d = encode(desc);
  const k = encode(keywords);
  const h = encode(heading);

  content = content.replace(/^(  title: ').*(',)\r?$/m, '$1' + t + '$2');
  content = content.replace(/^(  description: ').*(',)\r?$/m, '$1' + d + '$2');
  content = content.replace(/^(  keywords: ').*(',)\r?$/m, '$1' + k + '$2');
  content = content.replace(/^(  heading: ').*(',)\r?$/m, '$1' + h + '$2');

  fs.writeFileSync(fp, content, 'utf8');
  console.log('Updated: ' + dir + '/fi.ts (' + (usesEscapes ? 'escaped' : 'unicode') + ')');
}

// 41. summer (unicode file)
updateFile('summer',
  'Kes\u00e4teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu kes\u00e4teht\u00e4viin lapsille: ranta, auringonpaiste, j\u00e4\u00e4tel\u00f6 ja uinti. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'kes\u00e4teht\u00e4v\u00e4t lapsille, kes\u00e4 ty\u00f6lehdet tulostettava, ranta teht\u00e4v\u00e4t esikoulu, kes\u00e4 v\u00e4rityssivut, aurinko ty\u00f6lehdet lapsille, kes\u00e4 palapelit, j\u00e4\u00e4tel\u00f6 teht\u00e4v\u00e4t esikoulu, kes\u00e4 sanahaku lapsille, uinti ty\u00f6lehdet, kes\u00e4el\u00e4inten laskeminen',
  'Kes\u00e4aiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 42. superheroes (escape file)
updateFile('superheroes',
  'Supersankariteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu supersankariteht\u00e4viin lapsille: supervoimat, viitat, maskit ja sankarit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'supersankariteht\u00e4v\u00e4t lapsille, supersankari ty\u00f6lehdet tulostettava, supervoima teht\u00e4v\u00e4t esikoulu, supersankari v\u00e4rityssivut, viitta ty\u00f6lehdet lapsille, supersankari palapelit, maski teht\u00e4v\u00e4t esikoulu, supersankari sanahaku lapsille, sankari ty\u00f6lehdet, supersankarien laskeminen',
  'Supersankariaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 43. toys (escape file)
updateFile('toys',
  'Leluteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu leluteht\u00e4viin lapsille: nuket, autot, rakennuspalikat ja lautapelit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'leluteht\u00e4v\u00e4t lapsille, lelu ty\u00f6lehdet tulostettava, nukke teht\u00e4v\u00e4t esikoulu, lelu v\u00e4rityssivut, auto ty\u00f6lehdet lapsille, lelu palapelit, palikka teht\u00e4v\u00e4t esikoulu, lelu sanahaku lapsille, lautapeli ty\u00f6lehdet, lelujen laskeminen',
  'Leluaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 44. transportation (escape file)
updateFile('transportation',
  'Kulkuneuvoteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu kulkuneuvoteht\u00e4viin lapsille: autot, junat, lentokoneet ja laivat. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'kulkuneuvoteht\u00e4v\u00e4t lapsille, kulkuneuvo ty\u00f6lehdet tulostettava, auto teht\u00e4v\u00e4t esikoulu, kulkuneuvo v\u00e4rityssivut, juna ty\u00f6lehdet lapsille, kulkuneuvo palapelit, lentokone teht\u00e4v\u00e4t esikoulu, kulkuneuvo sanahaku lapsille, laiva ty\u00f6lehdet, kulkuneuvojen laskeminen',
  'Kulkuneuvoaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 45. travel (escape file)
updateFile('travel',
  'Matkailuteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu matkailuteht\u00e4viin lapsille: maailmankartat, matkalaukut, maamerkit ja kulttuurit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'matkailuteht\u00e4v\u00e4t lapsille, matkailu ty\u00f6lehdet tulostettava, maailmankartta teht\u00e4v\u00e4t esikoulu, matkailu v\u00e4rityssivut, matkalaukku ty\u00f6lehdet lapsille, matkailu palapelit, maamerkki teht\u00e4v\u00e4t esikoulu, matkailu sanahaku lapsille, kulttuuri ty\u00f6lehdet, maiden laskeminen',
  'Matkailuaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 46. vegetables (escape file)
updateFile('vegetables',
  'Vihannesteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu vihannesteht\u00e4viin lapsille: porkkana, tomaatti, kurkku ja peruna. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'vihannesteht\u00e4v\u00e4t lapsille, vihannes ty\u00f6lehdet tulostettava, porkkana teht\u00e4v\u00e4t esikoulu, vihannes v\u00e4rityssivut, tomaatti ty\u00f6lehdet lapsille, vihannes palapelit, kurkku teht\u00e4v\u00e4t esikoulu, vihannes sanahaku lapsille, peruna ty\u00f6lehdet, vihannesten laskeminen',
  'Vihannesaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 47. weather (escape file)
updateFile('weather',
  'S\u00e4\u00e4teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu s\u00e4\u00e4teht\u00e4viin lapsille: aurinko, sade, pilvet ja tuuli. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia ty\u00f6lehti\u00e4.',
  's\u00e4\u00e4teht\u00e4v\u00e4t lapsille, s\u00e4\u00e4 ty\u00f6lehdet tulostettava, aurinko teht\u00e4v\u00e4t esikoulu, s\u00e4\u00e4 v\u00e4rityssivut, sade ty\u00f6lehdet lapsille, s\u00e4\u00e4 palapelit, pilvi teht\u00e4v\u00e4t esikoulu, s\u00e4\u00e4 sanahaku lapsille, tuuli ty\u00f6lehdet, s\u00e4\u00e4ilmi\u00f6iden laskeminen',
  'S\u00e4\u00e4aiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 48. winter (unicode file)
updateFile('winter',
  'Talviteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu talviteht\u00e4viin lapsille: lumi, j\u00e4\u00e4, luistelu ja lumileikit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia ty\u00f6lehti\u00e4.',
  'talviteht\u00e4v\u00e4t lapsille, talvi ty\u00f6lehdet tulostettava, lumi teht\u00e4v\u00e4t esikoulu, talvi v\u00e4rityssivut, j\u00e4\u00e4 ty\u00f6lehdet lapsille, talvi palapelit, luistelu teht\u00e4v\u00e4t esikoulu, talvi sanahaku lapsille, lumiukko ty\u00f6lehdet, talviel\u00e4inten laskeminen',
  'Talviaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 49. xmas (unicode file)
updateFile('xmas',
  'Jouluteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu jouluteht\u00e4viin lapsille: joulupukki, kuusi, lahjat ja tontut. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'jouluteht\u00e4v\u00e4t lapsille, joulu ty\u00f6lehdet tulostettava, joulupukki teht\u00e4v\u00e4t esikoulu, joulu v\u00e4rityssivut, kuusi ty\u00f6lehdet lapsille, joulu palapelit, tonttu teht\u00e4v\u00e4t esikoulu, joulu sanahaku lapsille, lahja ty\u00f6lehdet, joulukoristeiden laskeminen',
  'Jouluaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 50. zoo (escape file)
updateFile('zoo',
  'El\u00e4intarhateht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu el\u00e4intarhateht\u00e4viin lapsille: leijonat, norsut, kirahvit ja apinat. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'el\u00e4intarhateht\u00e4v\u00e4t lapsille, el\u00e4intarha ty\u00f6lehdet tulostettava, leijona teht\u00e4v\u00e4t esikoulu, el\u00e4intarha v\u00e4rityssivut, norsu ty\u00f6lehdet lapsille, el\u00e4intarha palapelit, kirahvi teht\u00e4v\u00e4t esikoulu, el\u00e4intarha sanahaku lapsille, apina ty\u00f6lehdet, el\u00e4intarhan el\u00e4inten laskeminen',
  'El\u00e4intarha-aiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

console.log('All 10 themes updated!');
