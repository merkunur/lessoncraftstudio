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

// 31. ocean (escape file)
updateFile('ocean',
  'Valtameriteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu valtameriteht\u00e4viin lapsille: meriel\u00e4imet, korallit, aallot ja vedenalainen el\u00e4m\u00e4. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'valtameritehtävät lapsille, meri työlehdet tulostettava, merieläimet tehtävät esikoulu, valtameri värityssivut, vedenalainen työlehdet lapsille, valtameri palapelit, koralliriutta tehtävät, meri sanahaku lapsille, aalto työlehdet, merieläinten laskeminen esikoulu',
  'Valtameri- ja Meriaiheiset Tehtävät Lapsille'
);

// 32. pets (escape file)
updateFile('pets',
  'Lemmikkitehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu lemmikkitehtäviin lapsille: koirat, kissat, kanit ja hamsterit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'lemmikkitehtävät lapsille, lemmikki työlehdet tulostettava, koira tehtävät esikoulu, lemmikki värityssivut, kissa työlehdet lapsille, lemmikki palapelit, kani tehtävät esikoulu, lemmikki sanahaku lapsille, hamsterin hoito työlehdet, lemmikkien laskeminen',
  'Lemmikkiaiheiset Tehtävät ja Työlehdet Lapsille'
);

// 33. pirates (escape file)
updateFile('pirates',
  'Merirosvotehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu merirosvotehtäviin lapsille: aarrekartat, laivat, papukaijat ja meriseikkailut. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'merirosvotehtävät lapsille, merirosvo työlehdet tulostettava, aarrekartta tehtävät esikoulu, merirosvo värityssivut, laiva työlehdet lapsille, merirosvo palapelit, aarre tehtävät esikoulu, merirosvo sanahaku lapsille, meriseikkailu työlehdet, merirosvojen laskeminen',
  'Merirosvoaiheiset Tehtävät ja Pulmia Lapsille'
);

// 34. robots (unicode file)
updateFile('robots',
  'Robottitehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu robottitehtäviin lapsille: koneet, tekniikka, ohjelmointi ja muodot. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'robottitehtävät lapsille, robotti työlehdet tulostettava, kone tehtävät esikoulu, robotti värityssivut, tekniikka työlehdet lapsille, robotti palapelit, ohjelmointi tehtävät esikoulu, robotti sanahaku lapsille, muodot työlehdet robotti, robottien laskeminen',
  'Robottiaiheiset Tehtävät ja Pulmia Lapsille'
);

// 35. school (escape file)
updateFile('school',
  'Koulutehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu koulutehtäviin lapsille: luokkahuone, koulutarvikkeet, oppitunnit ja kouluarki. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'koulutehtävät lapsille, koulu työlehdet tulostettava, luokkahuone tehtävät esikoulu, koulu värityssivut, koulutarvikkeet työlehdet lapsille, koulu palapelit, oppitunti tehtävät esikoulu, koulu sanahaku lapsille, kouluarki työlehdet, kouluesineiden laskeminen',
  'Kouluaiheiset Tehtävät ja Työlehdet Lapsille'
);

// 36. seasons (unicode file)
updateFile('seasons',
  'Vuodenaikatehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu vuodenaikatehtäviin lapsille: kevät, kesä, syksy ja talvi. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'vuodenaikatehtävät lapsille, vuodenaika työlehdet tulostettava, kevät tehtävät esikoulu, vuodenaika värityssivut, kesä työlehdet lapsille, vuodenaika palapelit, syksy tehtävät esikoulu, vuodenaika sanahaku lapsille, talvi työlehdet, vuodenaikojen laskeminen',
  'Vuodenaikojen Tehtävät ja Työlehdet Lapsille'
);

// 37. shapes (unicode file)
updateFile('shapes',
  'Muototehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu muototehtäviin lapsille: ympyrät, neliöt, kolmiot ja suorakulmiot. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'muototehtävät lapsille, muoto työlehdet tulostettava, ympyrä tehtävät esikoulu, muoto värityssivut, neliö työlehdet lapsille, muoto palapelit, kolmio tehtävät esikoulu, muoto sanahaku lapsille, suorakulmio työlehdet, muotojen laskeminen',
  'Geometriset Muodot \u2014 Tehtävät ja Pulmia Lapsille'
);

// 38. space (unicode file)
updateFile('space',
  'Avaruustehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu avaruustehtäviin lapsille: planeetat, tähdet, raketit ja aurinkokunta. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'avaruustehtävät lapsille, avaruus työlehdet tulostettava, planeetta tehtävät esikoulu, avaruus värityssivut, raketti työlehdet lapsille, avaruus palapelit, aurinkokunta tehtävät esikoulu, avaruus sanahaku lapsille, tähti työlehdet, planeettojen laskeminen',
  'Avaruusaiheiset Tehtävät ja Pulmia Lapsille'
);

// 39. sports (escape file)
updateFile('sports',
  'Urheilutehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu urheilutehtäviin lapsille: jalkapallo, koripallo, uinti ja yleisurheilu. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'urheilutehtävät lapsille, urheilu työlehdet tulostettava, jalkapallo tehtävät esikoulu, urheilu värityssivut, koripallo työlehdet lapsille, urheilu palapelit, uinti tehtävät esikoulu, urheilu sanahaku lapsille, yleisurheilu työlehdet, urheilulajien laskeminen',
  'Urheiluaiheiset Tehtävät ja Työlehdet Lapsille'
);

// 40. spring (unicode file)
updateFile('spring',
  'Kevättehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  'Tutustu kevättehtäviin lapsille: kukat, perhoset, sade ja uusi kasvu. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'kevättehtävät lapsille, kevät työlehdet tulostettava, kukka tehtävät esikoulu, kevät värityssivut, perhonen työlehdet lapsille, kevät palapelit, sade tehtävät esikoulu, kevät sanahaku lapsille, uusi kasvu työlehdet, kevään eläinten laskeminen',
  'Kevätaiheiset Tehtävät ja Pulmia Lapsille'
);

console.log('All 10 themes updated!');
