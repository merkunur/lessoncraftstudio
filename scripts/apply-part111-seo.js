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

// 11. cooking
updateFile('cooking',
  'Ruoanlaittoteht\u00e4v\u00e4t ja Pulmia Lapsille | LessonCraftStudio',
  'Tutustu ruoanlaittoteht\u00e4viin lapsille: reseptit, keitti\u00f6v\u00e4lineet, mittaaminen ja j\u00e4rjestys. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'ruoanlaittoteht\u00e4v\u00e4t lapsille, keitti\u00f6 ty\u00f6lehdet tulostettava, resepti teht\u00e4v\u00e4t esikoulu, mittaaminen ty\u00f6lehdet lapsille, ruoanlaitto v\u00e4rityssivut, keitti\u00f6v\u00e4lineet teht\u00e4v\u00e4t, ruoanlaitto matematiikka, kokkaus teht\u00e4v\u00e4t lapsille, ruoka-aineet sanahaku, ruoanlaitto palapelit',
  'Kokkaus- ja Keitti\u00f6teht\u00e4v\u00e4t Lapsille'
);

// 12. dinosaurs
updateFile('dinosaurs',
  'Dinosaurusteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu dinosaurusteht\u00e4viin lapsille: T-Rex, Triceratops, Stegosaurus ja muut. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'dinosaurusteht\u00e4v\u00e4t lapsille, dinosaurus ty\u00f6lehdet tulostettava, T-Rex teht\u00e4v\u00e4t esikoulu, dinosaurus v\u00e4rityssivut, Triceratops ty\u00f6lehdet lapsille, dinosaurus palapelit, dinosaurusten laskeminen, dinosaurus sanahaku, Stegosaurus teht\u00e4v\u00e4t, dinosaurus matematiikka lapsille',
  'Dinosaurusaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 13. easter
updateFile('easter',
  'P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu p\u00e4\u00e4si\u00e4isteht\u00e4viin lapsille: munajahdit, kev\u00e4tpuput, tiput ja pastelliv\u00e4rit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'p\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t lapsille, p\u00e4\u00e4si\u00e4inen ty\u00f6lehdet tulostettava, munajahti teht\u00e4v\u00e4t esikoulu, p\u00e4\u00e4si\u00e4ismuna v\u00e4rityssivut, kev\u00e4t ty\u00f6lehdet lapsille, p\u00e4\u00e4si\u00e4inen palapelit, p\u00e4\u00e4si\u00e4ispupu teht\u00e4v\u00e4t, tipujen laskeminen esikoulu, p\u00e4\u00e4si\u00e4inen sanahaku, p\u00e4\u00e4si\u00e4iskoristelu teht\u00e4v\u00e4t',
  'P\u00e4\u00e4si\u00e4isaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 14. emotions
updateFile('emotions',
  'Tunneteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu tunneteht\u00e4viin lapsille: tunteiden tunnistaminen, ilmeet, empatia ja itses\u00e4\u00e4tely. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'tunneteht\u00e4v\u00e4t lapsille, tunteet ty\u00f6lehdet tulostettava, tunteiden tunnistaminen teht\u00e4v\u00e4t, ilmeet teht\u00e4v\u00e4t esikoulu, tunnekasvatus ty\u00f6lehdet, empatia teht\u00e4v\u00e4t lapsille, tunnetaidot esikoulu, tunteet v\u00e4rityssivut, itses\u00e4\u00e4tely teht\u00e4v\u00e4t, tunteet palapelit lapsille',
  'Tunnekasvatus \u2014 Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 15. fairy-tales (Unicode file)
updateFile('fairy-tales',
  'Satuteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu satuteht\u00e4viin lapsille: linnat, lohik\u00e4\u00e4rmeet, prinsessat ja lumotut mets\u00e4t. Lukemista, matematiikkaa ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'satuteht\u00e4v\u00e4t lapsille, satu ty\u00f6lehdet tulostettava, lohik\u00e4\u00e4rme teht\u00e4v\u00e4t esikoulu, prinsessa ty\u00f6lehdet lapsille, satu v\u00e4rityssivut, linnan palapelit, satuhahmot teht\u00e4v\u00e4t, satu sanahaku lapsille, taikuus ty\u00f6lehdet, satumets\u00e4 teht\u00e4v\u00e4t esikoulu',
  'Satuaiheiset Teht\u00e4v\u00e4t ja Pulmia Lapsille'
);

// 16. farm
updateFile('farm',
  'Maatilateht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu maatilateht\u00e4viin lapsille: lehm\u00e4t, kanat, traktorit ja ladot. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia ty\u00f6lehti\u00e4.',
  'maatilateht\u00e4v\u00e4t lapsille, maatila ty\u00f6lehdet tulostettava, maatilael\u00e4imet teht\u00e4v\u00e4t esikoulu, traktori ty\u00f6lehdet lapsille, maatila v\u00e4rityssivut, lehm\u00e4 teht\u00e4v\u00e4t esikoulu, maatila palapelit, kana ty\u00f6lehdet lapsille, maatilael\u00e4inten laskeminen, maatila sanahaku',
  'Maatila-aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 17. flowers (Unicode file)
updateFile('flowers',
  'Kukkateht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu kukkateht\u00e4viin lapsille: ruusut, auringonkukat, tulppaanit ja p\u00e4iv\u00e4nkakkarat. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  'kukkateht\u00e4v\u00e4t lapsille, kukka ty\u00f6lehdet tulostettava, auringonkukka teht\u00e4v\u00e4t esikoulu, kukka v\u00e4rityssivut, ruusu ty\u00f6lehdet lapsille, kukka palapelit, kasvin elinkaari teht\u00e4v\u00e4t, kukka sanahaku lapsille, tulppaani ty\u00f6lehdet, kukkien laskeminen esikoulu',
  'Kukka-aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 18. food
updateFile('food',
  'Ruokateht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu ruokateht\u00e4viin lapsille: hedelm\u00e4t, vihannekset, ruokaryhm\u00e4t ja ravitsemus. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'ruokateht\u00e4v\u00e4t lapsille, ruoka ty\u00f6lehdet tulostettava, ruokaryhm\u00e4t teht\u00e4v\u00e4t esikoulu, ravitsemus ty\u00f6lehdet lapsille, hedelm\u00e4t teht\u00e4v\u00e4t, terveellinen ruoka ty\u00f6lehdet, ruoka v\u00e4rityssivut, ruoka palapelit lapsille, ruoka sanahaku, vihannekset teht\u00e4v\u00e4t esikoulu',
  'Ruoka-aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 19. forest
updateFile('forest',
  'Mets\u00e4teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu mets\u00e4teht\u00e4viin lapsille: puulajit, mets\u00e4nel\u00e4imet, ekosysteemit ja luontopolut. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  'mets\u00e4teht\u00e4v\u00e4t lapsille, mets\u00e4 ty\u00f6lehdet tulostettava, puulajit teht\u00e4v\u00e4t esikoulu, mets\u00e4nel\u00e4imet ty\u00f6lehdet, mets\u00e4 v\u00e4rityssivut, mets\u00e4ekosysteemi teht\u00e4v\u00e4t lapsille, mets\u00e4 palapelit, luontopolku teht\u00e4v\u00e4t, mets\u00e4n el\u00e4inten laskeminen, mets\u00e4 sanahaku lapsille',
  'Mets\u00e4aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

// 20. fruits
updateFile('fruits',
  'Hedelm\u00e4teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  'Tutustu hedelm\u00e4teht\u00e4viin lapsille: omenat, banaanit, marjat ja appelsiinit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia ty\u00f6lehti\u00e4.',
  'hedelm\u00e4teht\u00e4v\u00e4t lapsille, hedelm\u00e4 ty\u00f6lehdet tulostettava, omena teht\u00e4v\u00e4t esikoulu, hedelm\u00e4 v\u00e4rityssivut, banaani ty\u00f6lehdet lapsille, hedelm\u00e4 palapelit, marjat teht\u00e4v\u00e4t esikoulu, hedelmien laskeminen, hedelm\u00e4 sanahaku lapsille, appelsiini ty\u00f6lehdet',
  'Hedelm\u00e4aiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille'
);

console.log('All 10 themes updated!');
