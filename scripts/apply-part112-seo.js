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

// 21. furniture (Unicode file)
updateFile('furniture',
  'Huonekaluteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu huonekaluteht\u00e4viin lapsille: huonej\u00e4rjestelyt, muodot, koot ja avaruudelliset k\u00e4sitteet. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'huonekaluteht\u00e4v\u00e4t lapsille, huonekalu ty\u00f6lehdet tulostettava, huonej\u00e4rjestely teht\u00e4v\u00e4t esikoulu, huonekalut v\u00e4rityssivut, muodot ty\u00f6lehdet lapsille, huonekalu palapelit, avaruudellinen hahmotus teht\u00e4v\u00e4t, huonekalu sanahaku lapsille, koko vertailu ty\u00f6lehdet, huonekalut matematiikka esikoulu',
  'Huonekaluaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 22. garden (escape file)
updateFile('garden',
  'Puutarhateht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu puutarhateht\u00e4viin lapsille: kasvien kasvu, siemenet, kompostointi ja istutus. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'puutarhateht\u00e4v\u00e4t lapsille, puutarha ty\u00f6lehdet tulostettava, kasvien kasvu teht\u00e4v\u00e4t esikoulu, siemen ty\u00f6lehdet lapsille, puutarha v\u00e4rityssivut, istutus teht\u00e4v\u00e4t, puutarha palapelit, kompostointi ty\u00f6lehdet lapsille, puutarha sanahaku, kasvien laskeminen esikoulu',
  'Puutarha-aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 23. halloween (escape file)
updateFile('halloween',
  'Halloween-teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu Halloween-teht\u00e4viin lapsille: kurpitsat, lepakot, h\u00e4m\u00e4h\u00e4kit ja puvut. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'Halloween teht\u00e4v\u00e4t lapsille, Halloween ty\u00f6lehdet tulostettava, kurpitsa teht\u00e4v\u00e4t esikoulu, Halloween v\u00e4rityssivut, lepakko ty\u00f6lehdet lapsille, Halloween palapelit, h\u00e4m\u00e4h\u00e4kki teht\u00e4v\u00e4t, Halloween sanahaku lapsille, naamiaispuku ty\u00f6lehdet, Halloween matematiikka esikoulu',
  'Halloween-aiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 24. holidays (escape file)
updateFile('holidays',
  'Juhlap\u00e4iv\u00e4teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu juhlap\u00e4iv\u00e4teht\u00e4viin lapsille: joulu, p\u00e4\u00e4si\u00e4inen, vappu ja itsen\u00e4isyysp\u00e4iv\u00e4. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'juhlap\u00e4iv\u00e4teht\u00e4v\u00e4t lapsille, juhlap\u00e4iv\u00e4 ty\u00f6lehdet tulostettava, joulu teht\u00e4v\u00e4t esikoulu, juhla v\u00e4rityssivut, vappu ty\u00f6lehdet lapsille, juhlap\u00e4iv\u00e4 palapelit, itsen\u00e4isyysp\u00e4iv\u00e4 teht\u00e4v\u00e4t, juhla sanahaku lapsille, perinteet ty\u00f6lehdet, juhlien laskeminen esikoulu',
  'Juhlap\u00e4iv\u00e4aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 25. household (escape file)
updateFile('household',
  'Kotitalousteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu kotitalousteht\u00e4viin lapsille: huoneet, kodin esineet, p\u00e4iv\u00e4rutiinit ja tilak\u00e4sitteet. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'kotitalousteht\u00e4v\u00e4t lapsille, koti ty\u00f6lehdet tulostettava, huoneet teht\u00e4v\u00e4t esikoulu, kodin esineet ty\u00f6lehdet, kotitalous v\u00e4rityssivut, p\u00e4iv\u00e4rutiini teht\u00e4v\u00e4t lapsille, koti palapelit, prepositiot ty\u00f6lehdet esikoulu, koti sanahaku lapsille, kotiesineiden laskeminen',
  'Koti-aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 26. insects (escape file)
updateFile('insects',
  'Hy\u00f6nteisteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu hy\u00f6nteisteht\u00e4viin lapsille: perhoset, mehil\u00e4iset, lepp\u00e4kertut ja muurahaiset. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'hy\u00f6nteisteht\u00e4v\u00e4t lapsille, hy\u00f6nteinen ty\u00f6lehdet tulostettava, perhonen teht\u00e4v\u00e4t esikoulu, hy\u00f6nteinen v\u00e4rityssivut, mehil\u00e4inen ty\u00f6lehdet lapsille, hy\u00f6nteinen palapelit, lepp\u00e4kerttu teht\u00e4v\u00e4t, hy\u00f6nteinen sanahaku lapsille, muurahainen ty\u00f6lehdet, hy\u00f6nteisten laskeminen esikoulu',
  'Hy\u00f6nteisaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 27. jobs (Unicode file)
updateFile('jobs',
  'Ammattiteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu ammattiteht\u00e4viin lapsille: palomiehet, l\u00e4\u00e4k\u00e4rit, opettajat ja poliisit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'ammattiteht\u00e4v\u00e4t lapsille, ammatti ty\u00f6lehdet tulostettava, yhteis\u00f6n auttajat teht\u00e4v\u00e4t esikoulu, ammatti v\u00e4rityssivut, palomies ty\u00f6lehdet lapsille, ammatti palapelit, l\u00e4\u00e4k\u00e4ri teht\u00e4v\u00e4t esikoulu, ammatti sanahaku lapsille, ty\u00f6kalut ty\u00f6lehdet, ammattien laskeminen',
  'Ammattiaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 28. music (Unicode file)
updateFile('music',
  'Musiikkiteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu musiikkiteht\u00e4viin lapsille: soittimet, rytmikuviot, nuotit ja \u00e4\u00e4nisanasto. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'musiikkiteht\u00e4v\u00e4t lapsille, musiikki ty\u00f6lehdet tulostettava, soittimet teht\u00e4v\u00e4t esikoulu, musiikki v\u00e4rityssivut, rytmi ty\u00f6lehdet lapsille, musiikki palapelit, nuotit teht\u00e4v\u00e4t esikoulu, musiikki sanahaku lapsille, soittimien laskeminen, \u00e4\u00e4nioppi ty\u00f6lehdet',
  'Musiikkiaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 29. nature (escape file)
updateFile('nature',
  'Luontoteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu luontoteht\u00e4viin lapsille: mets\u00e4t, el\u00e4imet, elinymp\u00e4rist\u00f6t ja ekosysteemit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'luontoteht\u00e4v\u00e4t lapsille, luonto ty\u00f6lehdet tulostettava, elinymp\u00e4rist\u00f6 teht\u00e4v\u00e4t esikoulu, ekosysteemi ty\u00f6lehdet lapsille, luonto v\u00e4rityssivut, el\u00e4imet teht\u00e4v\u00e4t, luonto palapelit, luontopolku ty\u00f6lehdet lapsille, luonto sanahaku, luonnon el\u00e4inten laskeminen',
  'Luontoaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 30. numbers (escape file)
updateFile('numbers',
  'Numeroteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu numeroteht\u00e4viin lapsille: laskeminen, yhteenlasku, v\u00e4hennyslasku ja paikkaarvo. Matematiikkaa ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'numeroteht\u00e4v\u00e4t lapsille, numero ty\u00f6lehdet tulostettava, laskeminen teht\u00e4v\u00e4t esikoulu, numero v\u00e4rityssivut, yhteenlasku ty\u00f6lehdet lapsille, numero palapelit, lukutaju teht\u00e4v\u00e4t esikoulu, numero sanahaku lapsille, v\u00e4hennyslasku ty\u00f6lehdet, numeroiden laskeminen',
  'Numeroaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

console.log('All 10 themes updated!');
