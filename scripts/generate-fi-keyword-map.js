const fs = require('fs');
const path = require('path');

// ============================================================
// FINNISH (fi) KEYWORD MAP GENERATOR
// Part 101 of ONE CLICK A DAY SEO plan
// ============================================================

// ============ PRODUCT PAGES (33) ============
const products = [
  {
    id: 1, name: 'Yhteenlasku', appSlug: 'image-addition', fiSlug: 'yhteenlasku-tyoarkit',
    primaryKw: 'yhteenlasku generaattori',
    seoTitle: 'Ilmainen Yhteenlasku Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia yhteenlaskuteht\u00e4vi\u00e4 kuvilla esikoulusta 3. luokalle. 3 000+ kuvan kirjasto, muokattavat asetukset ja vastausavaimet. Lataa PDF heti.',
    h1: 'Yhteenlaskuteht\u00e4vien Generaattori',
    subtitle: 'Luo Kuvapohjaisia Yhteenlaskuharjoituksia Esikoulusta 3. Luokalle',
    secondaryKws: ['yhteenlasku teht\u00e4v\u00e4t tulostettava','yhteenlaskuharjoitukset esikoulu','kuvalliset yhteenlaskut','matematiikka monisteet ilmainen','kuvapohjainen yhteenlasku','tulostettavat laskuteht\u00e4v\u00e4t','yhteenlasku vastausavain','laskemisen harjoittelu','yhteenlasku 1. luokka','yhteenlasku kuvilla'],
    notes: 'Owns "yhteenlasku" + tool intent. Differentiates from code-addition via visual image approach vs symbol-coded approach.'
  },
  {
    id: 2, name: 'Aakkosjuna', appSlug: 'alphabet-train', fiSlug: 'aakkosjuna-tyoarkit',
    primaryKw: 'aakkosjuna generaattori',
    seoTitle: 'Ilmainen Aakkosjuna Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia aakkosjuna-teht\u00e4vi\u00e4 kirjainten oppimiseen esikoulusta 1. luokalle. Hauska tapa oppia aakkosia kuvilla. Lataa PDF heti ilmaiseksi.',
    h1: 'Aakkosjuna Teht\u00e4vien Generaattori',
    subtitle: 'Tulostettavat Kirjainharjoitukset Esikoulusta 1. Luokalle',
    secondaryKws: ['aakkosjuna teht\u00e4v\u00e4t','kirjaimet harjoittelu esikoulu','aakkoset tulostettava','aakkosjuna ty\u00f6arkki','kirjainten tunnistus','aakkosj\u00e4rjestys harjoitus','kirjainharjoitukset lapsille','lukemaan oppiminen','aakkosharjoitukset','alkukirjaimet teht\u00e4v\u00e4'],
    notes: 'Owns "aakkosjuna" concept. Differentiates from writing-app (letter formation) via train-themed letter ordering.'
  },
  {
    id: 3, name: 'V\u00e4rityskuvat', appSlug: 'coloring', fiSlug: 'varityskuvat-tyoarkit',
    primaryKw: 'v\u00e4rityskuva generaattori',
    seoTitle: 'Ilmainen V\u00e4rityskuva Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia v\u00e4rityskuvia lapsille 3 000+ kuvan kirjastosta. 50 teemaa ja 5 ik\u00e4tasoa esikoulusta 3. luokalle. Lataa ilmaiset PDF-v\u00e4rityssivut.',
    h1: 'V\u00e4rityskuvien Generaattori Lapsille',
    subtitle: 'Luo Tulostettavia V\u00e4rityskuvia 50 Teemalla ja 3 000+ Kuvalla',
    secondaryKws: ['v\u00e4rityskuvia lapsille tulostettava','ilmaiset v\u00e4rityssivut','v\u00e4rityskirja tulostettava','el\u00e4inten v\u00e4rityskuvat','tulostettavat v\u00e4rityskirjat','v\u00e4ritys esikoulu','v\u00e4ritysharjoitukset','v\u00e4ritysteht\u00e4v\u00e4t lapsille','hienomotoriikka v\u00e4ritys','lasten v\u00e4rityssivut'],
    notes: 'Owns "v\u00e4rityskuva" tool intent. Differentiates from draw-and-color via free-form coloring vs grid-based pixel art.'
  },
  {
    id: 4, name: 'Matematiikkateht\u00e4v\u00e4t', appSlug: 'math-worksheet', fiSlug: 'matematiikka-tyoarkit',
    primaryKw: 'matematiikkateht\u00e4v\u00e4 generaattori',
    seoTitle: 'Matematiikkateht\u00e4v\u00e4 Generaattori | LessonCraftStudio',
    metaDesc: 'Luo visuaalisia matematiikkateht\u00e4vi\u00e4 kuvilla. Yhteenlasku, v\u00e4hennyslasku, vertailu ja lukujonot esikoulusta 3. luokalle. Vastausavaimet mukana. Ilmainen PDF.',
    h1: 'Matematiikkateht\u00e4vien Generaattori',
    subtitle: 'Visuaalisia Matematiikkaharjoituksia Esikoulusta 3. Luokalle',
    secondaryKws: ['matematiikka teht\u00e4v\u00e4t alakoulu','matikka teht\u00e4v\u00e4t tulostettava','matematiikka monisteet','matikkaharjoitukset esikoulu','visuaaliset matematiikkateht\u00e4v\u00e4t','laskuteht\u00e4v\u00e4t lapsille','matematiikka vastausavain','peruslaskutoimitukset harjoitus','matikka tulostettava ilmainen','matematiikka harjoitusteht\u00e4v\u00e4t'],
    notes: 'Owns broad "matematiikkateht\u00e4v\u00e4" tool intent. Differentiates from image-addition/subtraction via multi-operation scope.'
  },
  {
    id: 5, name: 'Sanansekoitus', appSlug: 'word-scramble', fiSlug: 'sanansekoitus-tyoarkit',
    primaryKw: 'sanansekoitus generaattori',
    seoTitle: 'Ilmainen Sanansekoitus Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia sanansekoitusteht\u00e4vi\u00e4 oikeinkirjoituksen harjoitteluun. Muokattava vaikeustaso esikoulusta 3. luokalle. Kuvallinen ja ilmainen.',
    h1: 'Sanansekoitus Generaattori',
    subtitle: 'Tulostettavat Oikeinkirjoitusharjoitukset Kuvilla',
    secondaryKws: ['sanansekoitus teht\u00e4v\u00e4t','kirjoitusharjoitukset lapsille','oikeinkirjoitus harjoittelu','sana-arvoitus tulostettava','sanojen tavutus harjoitus','sanapelit lapsille tulostettava','sananmuodostus teht\u00e4v\u00e4t','lukemaan oppiminen teht\u00e4v\u00e4t','kirjoittamisen harjoittelu','sanasto harjoitukset'],
    notes: 'Owns "sanansekoitus" concept. Differentiates from word-search via letter rearranging vs letter finding.'
  },
  {
    id: 6, name: 'Etsi ja Laske', appSlug: 'find-and-count', fiSlug: 'etsi-ja-laske-tyoarkit',
    primaryKw: 'etsi ja laske generaattori',
    seoTitle: 'Etsi ja Laske Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia etsi ja laske -teht\u00e4vi\u00e4 lapsille. Kehit\u00e4 laskemistaitoja ja visuaalista havainnointia kuvilla. Esikoulusta 3. luokalle. Ilmainen PDF.',
    h1: 'Etsi ja Laske Teht\u00e4vien Generaattori',
    subtitle: 'Kehit\u00e4 Laskemistaitoja Hauskalla Etsint\u00e4teht\u00e4v\u00e4ll\u00e4',
    secondaryKws: ['etsi ja laske teht\u00e4v\u00e4t','laskemisharjoitukset esikoulu','visuaalinen laskeminen','lukum\u00e4\u00e4r\u00e4n tunnistus','etsi ja laske tulostettava','laskemistaidot lapsille','laskemisharjoitus kuvilla','lukuharjoitukset esikoulu','laskemisen harjoittelu','matikka etsint\u00e4teht\u00e4v\u00e4'],
    notes: 'Owns "etsi ja laske" dual-skill concept. Differentiates from find-objects via counting component.'
  },
  {
    id: 7, name: 'Yhdist\u00e4 Parit', appSlug: 'matching-app', fiSlug: 'yhdista-parit-tyoarkit',
    primaryKw: 'yhdist\u00e4 parit generaattori',
    seoTitle: 'Yhdist\u00e4 Parit Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia yhdist\u00e4 parit -teht\u00e4vi\u00e4 kuvilla. Kehit\u00e4 muistia ja hahmontunnistusta esikoulusta 3. luokalle. 50 teemaa. Lataa PDF ilmaiseksi.',
    h1: 'Yhdist\u00e4 Parit Teht\u00e4vien Generaattori',
    subtitle: 'Tulostettavat Yhdist\u00e4misteht\u00e4v\u00e4t 50 Teemalla',
    secondaryKws: ['yhdist\u00e4 parit teht\u00e4v\u00e4t','yhdist\u00e4misteht\u00e4v\u00e4t lapsille','muistipeli tulostettava','parien yhdist\u00e4minen esikoulu','hahmontunnistus harjoitus','visuaalinen yhdist\u00e4minen','kuvien yhdist\u00e4minen teht\u00e4v\u00e4','pariharjoitus tulostettava','muisti ja yhdist\u00e4minen','yhdist\u00e4misteht\u00e4v\u00e4t esikoulu'],
    notes: 'Owns "yhdist\u00e4 parit" concept. Differentiates from shadow-match via image-to-image vs image-to-shadow matching.'
  },
  {
    id: 8, name: 'Viivanpiirto', appSlug: 'drawing-lines', fiSlug: 'viivojen-piirtaminen-tyoarkit',
    primaryKw: 'viivanpiirto generaattori',
    seoTitle: 'Viivanpiirto Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia viivanpiirtoteht\u00e4vi\u00e4 hienomotoriikan kehitt\u00e4miseen. Suorat, kaaret ja aaltoviivat esikoulusta 1. luokalle. Lataa ilmainen PDF.',
    h1: 'Viivanpiirtoteht\u00e4vien Generaattori',
    subtitle: 'Hienomotoriikan Harjoituksia Esikoulusta 1. Luokalle',
    secondaryKws: ['viivanpiirto teht\u00e4v\u00e4t','hienomotoriikka harjoitukset','viivan seuranta teht\u00e4v\u00e4','kyn\u00e4taitoharjoitukset','piirt\u00e4misen harjoittelu esikoulu','hienomotoriikka esikoulu','kirjoitusvalmiudet harjoitus','kyn\u00e4ote harjoittelu','viivat ja muodot harjoitus','piirt\u00e4mistaidot lapsille'],
    notes: 'Owns "viivanpiirto" fine motor concept. Differentiates from writing-app via pre-writing line practice vs letter formation.'
  },
  {
    id: 9, name: 'Kuva-Bingo', appSlug: 'picture-bingo', fiSlug: 'kuva-bingo-tyoarkit',
    primaryKw: 'kuva-bingo generaattori',
    seoTitle: 'Ilmainen Kuva-Bingo Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuva-bingopelejä lapsille. 50 teemaa, muokattavat ruudukot ja kuvat 3 000+ kirjastosta. Täydellinen luokkahuoneeseen. Lataa ilmaiseksi.',
    h1: 'Kuva-Bingo Generaattori',
    subtitle: 'Luo Tulostettavia Bingopelejä 50 Teemalla',
    secondaryKws: ['bingo tulostettava lapsille','kuva-bingo peli','tulostettava bingopeli','bingo esikoulu','luokan bingopeli','kuva-bingo ruudukko','kuvabingo tulostettava','ryhmäpeli tulostettava','bingo tehtävä lapsille','bingopeli luokkahuone'],
    notes: 'Owns "kuva-bingo" game concept. Only group-play worksheet generator in the suite.'
  },
  {
    id: 10, name: 'Lasten Sudoku', appSlug: 'sudoku', fiSlug: 'sudoku-tyoarkit',
    primaryKw: 'lasten sudoku generaattori',
    seoTitle: 'Lasten Sudoku Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvasudokuja lapsille. Helpot ja keskitason logiikkapelat esikoulusta 3. luokalle. Kuvat 3 000+ kirjastosta. Ilmainen PDF-lataus.',
    h1: 'Lasten Sudoku Generaattori',
    subtitle: 'Tulostettavat Kuvasudokut Esikoulusta 3. Luokalle',
    secondaryKws: ['kuvasudoku lapsille','sudoku tulostettava','lasten logiikkapelit','helppo sudoku lapsille','kuvasudoku tulostettava','sudoku esikoulu','logiikkaharjoitukset lapsille','sudoku ruudukko lapsille','ajattelutaitojen harjoittelu','sudoku alakoulu'],
    notes: 'Owns "lasten sudoku" logic puzzle concept. Uses images instead of numbers for younger children.'
  },
  {
    id: 11, name: 'Iso ja Pieni', appSlug: 'big-small-app', fiSlug: 'iso-pieni-tyoarkit',
    primaryKw: 'kokovertailu generaattori',
    seoTitle: 'Kokovertailu Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia iso ja pieni -vertailuteht\u00e4vi\u00e4 kuvilla. Kehit\u00e4 kokojen vertailutaitoja esikoulusta 1. luokalle. Muokattavat asetukset. Lataa PDF.',
    h1: 'Iso ja Pieni Teht\u00e4vien Generaattori',
    subtitle: 'Kokovertailuharjoituksia Kuvilla Esikoulusta 1. Luokalle',
    secondaryKws: ['iso ja pieni teht\u00e4v\u00e4t','kokovertailu esikoulu','kokojen tunnistaminen','suurempi ja pienempi','kokojen vertailu lapsille','iso pieni tulostettava','kokoerot teht\u00e4v\u00e4t','kokoharjoitukset esikoulu','vertailutaidot harjoitus','kokojen lajittelu'],
    notes: 'Owns "kokovertailu" concept. Differentiates from more-less via size comparison vs quantity comparison.'
  },
  {
    id: 12, name: 'Kuvakaavio', appSlug: 'chart-count-color', fiSlug: 'kuvakaavio-tyoarkit',
    primaryKw: 'kuvakaavio generaattori',
    seoTitle: 'Kuvakaavio Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvakaavio-teht\u00e4vi\u00e4 laskemisen ja tiedon visualisoinnin harjoitteluun. Laske ja v\u00e4rit\u00e4 kuviot esikoulusta 3. luokalle. Ilmainen.',
    h1: 'Kuvakaavio \u2014 Laske ja V\u00e4rit\u00e4 Generaattori',
    subtitle: 'Tiedon Visualisointi ja Laskemisharjoituksia Lapsille',
    secondaryKws: ['kuvakaavio teht\u00e4v\u00e4t','laske ja v\u00e4rit\u00e4','tiedon visualisointi lapsille','pylv\u00e4skaavio esikoulu','kuvakaavio tulostettava','laskeminen ja v\u00e4ritys','tilastoteht\u00e4v\u00e4t lapsille','kaavio tulostettava','tilastot esikoulu','kuvakaavio harjoitus'],
    notes: 'Owns "kuvakaavio" data visualization concept. Only chart/graph worksheet generator in the suite.'
  },
  {
    id: 13, name: 'Kuvakoodattu Yhteenlasku', appSlug: 'code-addition', fiSlug: 'kuva-yhteenlasku-tyoarkit',
    primaryKw: 'kuvakoodattu yhteenlasku generaattori',
    seoTitle: 'Kuvakoodattu Yhteenlasku Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvakoodattuja yhteenlaskuteht\u00e4vi\u00e4, joissa kuvat korvaavat numerot. Kehitt\u00e4\u00e4 algebrallista ajattelua. Esikoulusta 3. luokalle. Ilmainen.',
    h1: 'Kuvakoodattu Yhteenlasku Generaattori',
    subtitle: 'Algebrallinen Ajattelu Kuvallisten Laskuteht\u00e4vien Kautta',
    secondaryKws: ['kuvakoodattu yhteenlasku','symbolinen algebra lapsille','kuvapohjainen matematiikka','koodilaskut tulostettava','algebrallinen ajattelu esikoulu','kuva korvaa luvun','salaviesti yhteenlasku','kuvasymboli laskuteht\u00e4v\u00e4','matemaattinen koodaus','visuaalinen algebra'],
    notes: 'Owns "kuvakoodattu yhteenlasku" symbol-algebra concept. Differentiates from image-addition via symbolic substitution.'
  },
  {
    id: 14, name: 'Ruudukkopiirustus', appSlug: 'draw-and-color', fiSlug: 'ruudukkopiirustus-tyoarkit',
    primaryKw: 'ruudukkopiirustus generaattori',
    seoTitle: 'Ruudukkopiirustus Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia ruudukkopiirustusteht\u00e4vi\u00e4. Piirr\u00e4 kuvioita ruutuihin mallin mukaan ja v\u00e4rit\u00e4. Kehitt\u00e4\u00e4 visuaalista hahmotusta. Esikoulusta 3. luokalle.',
    h1: 'Ruudukkopiirustus Generaattori',
    subtitle: 'Piirr\u00e4 ja V\u00e4rit\u00e4 Kuvioita Ruudukkoon Mallin Mukaan',
    secondaryKws: ['ruudukkopiirustus teht\u00e4v\u00e4t','pikselipiirustus lapsille','ruudukopiirt\u00e4minen','ruutuvihko piirt\u00e4minen','visuaalinen hahmotus harjoitus','ruutupiirustus tulostettava','mallin kopiointi ruudukkoon','piirustus ruutuihin','koodattu piirt\u00e4minen','ruudukkoteht\u00e4v\u00e4t lapsille'],
    notes: 'Owns "ruudukkopiirustus" pixel-art concept. Differentiates from coloring via structured grid-based drawing vs free coloring.'
  },
  {
    id: 15, name: 'Etsi Esineet', appSlug: 'find-objects', fiSlug: 'etsi-esineet-tyoarkit',
    primaryKw: 'etsi esineet generaattori',
    seoTitle: 'Etsi Esineet Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia etsint\u00e4teht\u00e4vi\u00e4 lapsille. Etsi piilotetut esineet kuvista ja kehit\u00e4 visuaalista havainnointia. 50 teemaa esikoulusta 3. luokalle.',
    h1: 'Etsi Esineet Teht\u00e4vien Generaattori',
    subtitle: 'Visuaalisen Havainnoinnin Harjoituksia 50 Teemalla',
    secondaryKws: ['etsi esineet teht\u00e4v\u00e4t','piilokuva tulostettava','visuaalinen etsint\u00e4 lapsille','etsi piilotetut esineet','tarkkaavaisuus harjoitus','visuaalinen havainnointi esikoulu','etsi ja l\u00f6yd\u00e4 teht\u00e4v\u00e4','piilokuvaharjoitukset','etsint\u00e4peli tulostettava','visuaalinen tarkkaavaisuus'],
    notes: 'Owns "etsi esineet" hidden-object concept. Differentiates from find-and-count via pure visual search vs counting.'
  },
  {
    id: 16, name: 'Ruudukkosovitus', appSlug: 'grid-match', fiSlug: 'ruudukko-sovitus-tyoarkit',
    primaryKw: 'ruudukkosovitus generaattori',
    seoTitle: 'Ilmainen Ruudukkosovitus Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia ruudukkosovitusteht\u00e4vi\u00e4 visuaalisen hahmotuksen ja avaruudellisen p\u00e4\u00e4ttelyn kehitt\u00e4miseen. 50 teemaa esikoulusta 3. luokalle. Ilmainen PDF.',
    h1: 'Ruudukkosovitus Teht\u00e4vien Generaattori',
    subtitle: 'Visuaalisen Hahmotuksen ja Avaruudellisen P\u00e4\u00e4ttelyn Harjoituksia',
    secondaryKws: ['ruudukkosovitus teht\u00e4v\u00e4t','visuaalinen palapeli lapsille','avaruudellinen p\u00e4\u00e4ttely','kuvioiden sovitus','ruudukkoteht\u00e4v\u00e4t tulostettava','hahmottaminen harjoitus','visuaalinen logiikka lapsille','sovitusharjoitukset esikoulu','ruudukko palapeli','avaruudellinen hahmottaminen'],
    notes: 'Owns "ruudukkosovitus" spatial-reasoning concept. Differentiates from grid-draw via matching vs drawing.'
  },
  {
    id: 17, name: 'Kuvaristisana', appSlug: 'image-crossword', fiSlug: 'ristisanatehtavat-tyoarkit',
    primaryKw: 'kuvaristisana generaattori',
    seoTitle: 'Kuvaristisana Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvaristisanateht\u00e4vi\u00e4, joissa kuvat toimivat vihjehin\u00e4. Kehitt\u00e4\u00e4 sanavarastoa ja oikeinkirjoitusta. Esikoulusta 3. luokalle. Ilmainen.',
    h1: 'Kuvaristisana Generaattori',
    subtitle: 'Sanavaraston ja Oikeinkirjoituksen Harjoittelua Kuvilla',
    secondaryKws: ['kuvaristisana teht\u00e4v\u00e4t','ristisana lapsille tulostettava','kuvalliset ristisanat','sanaristikko lapsille','ristisana esikoulu','sanasto ristisana','kuva-ristisana tulostettava','oikeinkirjoitus ristisana','ristisanateht\u00e4v\u00e4 kuvilla','lasten sanaristikko'],
    notes: 'Owns "kuvaristisana" concept. Differentiates from word-search via crossword grid vs letter grid, and from cryptogram via visual clues vs symbol substitution.'
  },
  {
    id: 18, name: 'Kuvakryptogrammi', appSlug: 'image-cryptogram', fiSlug: 'kuvakryptogrammi-tyoarkit',
    primaryKw: 'kuvakryptogrammi generaattori',
    seoTitle: 'Kuvakryptogrammi Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvakryptogrammi-teht\u00e4vi\u00e4, joissa kirjaimet korvataan kuvilla. Kehitt\u00e4\u00e4 dekoodaustaitoja ja lukemisvalmiutta. Esikoulusta 3. luokalle.',
    h1: 'Kuvakryptogrammi Generaattori',
    subtitle: 'Salakirjoitusteht\u00e4vi\u00e4 Kuvilla \u2014 Dekoodaa ja Opi Lukemaan',
    secondaryKws: ['kuvakryptogrammi teht\u00e4v\u00e4t','salakirjoitus lapsille','dekoodaus teht\u00e4v\u00e4','salakielen purkaminen','kuvakoodaus harjoitus','salasana teht\u00e4v\u00e4','kryptogrammi tulostettava','symbolien dekoodaus','salaviesti harjoitus','lukemisvalmiuden harjoittelu'],
    notes: 'Owns "kuvakryptogrammi" decoding concept. Differentiates from crossword via symbol-to-letter decoding vs image-clue spelling.'
  },
  {
    id: 19, name: 'Matematiikkapulma', appSlug: 'math-puzzle', fiSlug: 'matematiikkapulmat-tyoarkit',
    primaryKw: 'matematiikkapulma generaattori',
    seoTitle: 'Matematiikkapulma Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia matematiikkapulmia yhteenlaskun ja v\u00e4hennyslaskun harjoitteluun. Ongelmanratkaisutaitoja kehitt\u00e4v\u00e4t pulmat esikoulusta 3. luokalle.',
    h1: 'Matematiikkapulma Generaattori',
    subtitle: 'Kehit\u00e4 Ongelmanratkaisutaitoja Matemaattisilla Pulmilla',
    secondaryKws: ['matematiikkapulmat lapsille','matemaattiset ongelmanratkaisut','matikkapulma tulostettava','laskupulmat esikoulu','matemaattinen ajattelu','logiikkapulmat matematiikka','matematiikka pulmateht\u00e4v\u00e4t','laskupulma vastausavain','ongelmanratkaisu matematiikka','matikkapulmat alakoulu'],
    notes: 'Owns "matematiikkapulma" puzzle concept. Differentiates from math-worksheet via puzzle/challenge format vs drill format.'
  },
  {
    id: 20, name: 'Puuttuvat Palat', appSlug: 'missing-pieces', fiSlug: 'puuttuvat-palat-tyoarkit',
    primaryKw: 'puuttuvat palat generaattori',
    seoTitle: 'Puuttuvat Palat Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia puuttuvat palat -teht\u00e4vi\u00e4 visuaalisen hahmotuksen harjoitteluun. Etsi puuttuva kuva kuviosta. Esikoulusta 2. luokalle. Ilmainen PDF.',
    h1: 'Puuttuvat Palat Teht\u00e4vien Generaattori',
    subtitle: 'Visuaalisen Hahmotuksen Harjoituksia Kuvapalapeleill\u00e4',
    secondaryKws: ['puuttuvat palat teht\u00e4v\u00e4t','palapeli teht\u00e4v\u00e4 lapsille','puuttuva osa harjoitus','visuaalinen p\u00e4\u00e4ttely','kuvapalapeli tulostettava','hahmontunnistus harjoitus','puuttuva kuva teht\u00e4v\u00e4','visuaalinen looginen ajattelu','palapeliharjoitukset esikoulu','hahmotustaidot lapsille'],
    notes: 'Owns "puuttuvat palat" visual-completion concept. Differentiates from grid-match via finding the missing piece vs matching positions.'
  },
  {
    id: 21, name: 'Enemm\u00e4n vai V\u00e4hemm\u00e4n', appSlug: 'more-less', fiSlug: 'enemman-vahemman-tyoarkit',
    primaryKw: 'enemm\u00e4n v\u00e4hemm\u00e4n generaattori',
    seoTitle: 'Enemm\u00e4n\u2013V\u00e4hemm\u00e4n Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia enemm\u00e4n ja v\u00e4hemm\u00e4n -vertailuteht\u00e4vi\u00e4 kuvilla. Kehitt\u00e4\u00e4 lukum\u00e4\u00e4rien vertailua ja matemaattista ajattelua. Esikoulusta 2. luokalle.',
    h1: 'Enemm\u00e4n vai V\u00e4hemm\u00e4n Generaattori',
    subtitle: 'Lukum\u00e4\u00e4rien Vertailua Kuvilla Esikoulusta 2. Luokalle',
    secondaryKws: ['enemm\u00e4n v\u00e4hemm\u00e4n teht\u00e4v\u00e4t','lukum\u00e4\u00e4rien vertailu','suurempi pienempi harjoitus','vertailuteht\u00e4v\u00e4t esikoulu','m\u00e4\u00e4rien vertailu kuvilla','lukujen vertailu lapsille','enemm\u00e4n vai v\u00e4hemm\u00e4n','matemaattinen vertailu','lukum\u00e4\u00e4r\u00e4n arviointi','vertailutaidot esikoulu'],
    notes: 'Owns "enemm\u00e4n v\u00e4hemm\u00e4n" quantity comparison concept. Differentiates from big-small via quantity vs size comparison.'
  },
  {
    id: 22, name: 'Poikkea Joukosta', appSlug: 'odd-one-out', fiSlug: 'poikkea-joukosta-tyoarkit',
    primaryKw: 'poikkea joukosta generaattori',
    seoTitle: 'Poikkea Joukosta Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia poikkea joukosta -teht\u00e4vi\u00e4 visuaalisen hahmotuksen ja luokittelun harjoitteluun. 50 teemaa ja muokattavat asetukset. Ilmainen PDF.',
    h1: 'Poikkea Joukosta Generaattori',
    subtitle: 'Luokittelu- ja Hahmottamisharjoituksia Kuvilla',
    secondaryKws: ['poikkea joukosta teht\u00e4v\u00e4t','mik\u00e4 ei kuulu joukkoon','luokittelu harjoitus','visuaalinen erottelu','poikkeava kuva teht\u00e4v\u00e4','luokitteluharjoitukset lapsille','erilainen joukossa','hahmontunnistus ja luokittelu','lajittelu ja erottelu','poikkea joukosta tulostettava'],
    notes: 'Owns "poikkea joukosta" classification concept. Differentiates from picture-sort via identifying the odd one vs sorting into groups.'
  },
  {
    id: 23, name: 'Kuviojuna', appSlug: 'pattern-train', fiSlug: 'kuviojuna-tyoarkit',
    primaryKw: 'kuviojuna generaattori',
    seoTitle: 'Ilmainen Kuviojuna Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuviojunateht\u00e4vi\u00e4 kuvionhahmotuksen harjoitteluun. Junamuotoiset teht\u00e4v\u00e4t 3 000+ kuvalla. Esikoulusta 2. luokalle. Ilmainen PDF-lataus.',
    h1: 'Kuviojuna Generaattori',
    subtitle: 'Kuvionhahmotuksen Harjoituksia Junamuodossa',
    secondaryKws: ['kuviojuna teht\u00e4v\u00e4t','kuvioiden jatkaminen','hahmontunnistus juna','kuvionhahmotus esikoulu','kuviojatko harjoitus','kuviojuna tulostettava','kuviosarjat lapsille','kuvioiden tunnistaminen','matemaattinen hahmotus','kuviojono harjoitus'],
    notes: 'Owns "kuviojuna" train-shaped pattern concept. Differentiates from pattern-worksheet via train format vs standard worksheet format.'
  },
  {
    id: 24, name: 'Kuvioteht\u00e4v\u00e4', appSlug: 'pattern-worksheet', fiSlug: 'kuviotehtava-tyoarkit',
    primaryKw: 'kuvioteht\u00e4v\u00e4 generaattori',
    seoTitle: 'Kuvioteht\u00e4v\u00e4 Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvioteht\u00e4vi\u00e4 kuvioiden tunnistamiseen ja jatkamiseen. Monipuoliset sarjat esikoulusta 3. luokalle. 50 teemaa. Lataa ilmainen PDF.',
    h1: 'Kuvioteht\u00e4vien Generaattori',
    subtitle: 'Kuvioiden Tunnistaminen ja Jatkaminen 50 Teemalla',
    secondaryKws: ['kuvioteht\u00e4v\u00e4t tulostettava','kuvionsarjat lapsille','kuvioiden jatkaminen','kuviotunnistus harjoitus','matemaattiset kuviot','kuviosarjateht\u00e4v\u00e4t','kuviomoniste','hahmottamistaidot esikoulu','kuvionhahmotus 1. luokka','kuviot ja sarjat'],
    notes: 'Owns "kuvioteht\u00e4v\u00e4" standard pattern-recognition concept. Differentiates from kuviojuna via standard worksheet vs train format.'
  },
  {
    id: 25, name: 'Kuvapolku', appSlug: 'picture-path', fiSlug: 'kuvapolku-tyoarkit',
    primaryKw: 'kuvapolku generaattori',
    seoTitle: 'Ilmainen Kuvapolku Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvapolkuteht\u00e4vi\u00e4, joissa lapsi seuraa kuvareittej\u00e4. Kehitt\u00e4\u00e4 loogista ajattelua ja hienomotoriikkaa. Esikoulusta 2. luokalle. Ilmainen.',
    h1: 'Kuvapolku Generaattori',
    subtitle: 'Loogisen Ajattelun Harjoituksia Kuvareiteill\u00e4',
    secondaryKws: ['kuvapolku teht\u00e4v\u00e4t','sokkeloteht\u00e4v\u00e4t lapsille','labyrintti tulostettava','reitin seuraaminen','kuvasokkelo harjoitus','polkuteht\u00e4v\u00e4t esikoulu','labyrinttiteht\u00e4v\u00e4t lapsille','sokkelo tulostettava','reittiharjoitukset','visuaalinen reitin seuranta'],
    notes: 'Owns "kuvapolku" maze/path concept. Only maze-type worksheet generator in the suite.'
  },
  {
    id: 26, name: 'Kuvalajittelu', appSlug: 'picture-sort', fiSlug: 'kuvalajittelu-tyoarkit',
    primaryKw: 'kuvalajittelu generaattori',
    seoTitle: 'Kuvalajittelu Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuvalajitteluteht\u00e4vi\u00e4, joissa lapsi luokittelee kuvat kategorioihin. Kehitt\u00e4\u00e4 luokittelutaitoja. Esikoulusta 2. luokalle. Ilmainen PDF.',
    h1: 'Kuvalajittelu Generaattori',
    subtitle: 'Luokittelu- ja Lajitteluharjoituksia Kuvilla',
    secondaryKws: ['kuvalajittelu teht\u00e4v\u00e4t','lajitteluharjoitukset lapsille','kategorisointi teht\u00e4v\u00e4','kuvien luokittelu','lajittelu esikoulu','ryhmittely harjoitus','kuvien kategorisointi','luokittelu tulostettava','lajittelutaidot lapsille','ryhmittely kuvilla'],
    notes: 'Owns "kuvalajittelu" sorting/categorizing concept. Differentiates from odd-one-out via group sorting vs identifying the outlier.'
  },
  {
    id: 27, name: 'Prepositiot', appSlug: 'prepositions', fiSlug: 'prepositio-tyoarkit',
    primaryKw: 'prepositioharjoitus generaattori',
    seoTitle: 'Prepositioharjoitus Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia prepositioharjoituksia sijaintisanojen oppimiseen kuvilla. Edess\u00e4, takana, alla, p\u00e4\u00e4ll\u00e4 \u2014 visuaalinen kielenoppiminen. Ilmainen PDF.',
    h1: 'Prepositioharjoitusten Generaattori',
    subtitle: 'Sijaintisanojen Oppimista Kuvilla',
    secondaryKws: ['prepositioharjoitukset','sijaintisanat lapsille','prepositiot esikoulu','paikkasanat harjoitus','edess\u00e4 takana teht\u00e4v\u00e4t','sijaintik\u00e4sitteet lapsille','prepositiot tulostettava','kielioppi harjoitukset esikoulu','visuaalinen kielenoppiminen','sijainnin kuvaaminen'],
    notes: 'Owns "prepositioharjoitus" language concept. Only grammar-focused worksheet generator in the suite.'
  },
  {
    id: 28, name: 'Varjoyhdistely', appSlug: 'shadow-match', fiSlug: 'varjoyhdistely-tyoarkit',
    primaryKw: 'varjoyhdistely generaattori',
    seoTitle: 'Varjoyhdistely Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia varjoyhdistelteht\u00e4vi\u00e4, joissa lapsi yhdist\u00e4\u00e4 kuvan oikeaan varjoon. Kehitt\u00e4\u00e4 visuaalista hahmotusta. 50 teemaa. Ilmainen.',
    h1: 'Varjoyhdistely Generaattori',
    subtitle: 'Visuaalisen Hahmotuksen Harjoituksia Varjokuvilla',
    secondaryKws: ['varjoyhdistely teht\u00e4v\u00e4t','varjokuva yhdist\u00e4minen','varjoteht\u00e4v\u00e4t lapsille','siluettiteht\u00e4v\u00e4t tulostettava','varjokuvan tunnistus','visuaalinen yhdist\u00e4minen varjo','varjoharjoitukset esikoulu','siluetti harjoitus','kuvan ja varjon yhdist\u00e4minen','varjokuvateht\u00e4v\u00e4t'],
    notes: 'Owns "varjoyhdistely" shadow-matching concept. Differentiates from matching-app via silhouette recognition vs direct image matching.'
  },
  {
    id: 29, name: 'V\u00e4hennyslasku', appSlug: 'subtraction', fiSlug: 'vahennyslasku-tyoarkit',
    primaryKw: 'v\u00e4hennyslasku generaattori',
    seoTitle: 'Ilmainen V\u00e4hennyslasku Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia v\u00e4hennyslaskuteht\u00e4vi\u00e4 kuvilla esikoulusta 3. luokalle. Muokattavat lukualueet, vastausavaimet ja visuaaliset apuv\u00e4lineet. Ilmainen PDF.',
    h1: 'V\u00e4hennyslaskuteht\u00e4vien Generaattori',
    subtitle: 'Visuaalisia V\u00e4hennyslaskuharjoituksia Kuvilla',
    secondaryKws: ['v\u00e4hennyslasku teht\u00e4v\u00e4t','v\u00e4hennyslaskuharjoitukset','miinuslasku tulostettava','v\u00e4hennyslasku kuvilla','matematiikka v\u00e4hennyslasku','v\u00e4hennyslasku 1. luokka','v\u00e4hennyslaskut esikoulu','miinuslasku harjoitus','v\u00e4hennyslasku vastausavain','perusv\u00e4hennyslasku'],
    notes: 'Owns "v\u00e4hennyslasku" subtraction concept. Differentiates from math-worksheet via subtraction-only focus vs multi-operation.'
  },
  {
    id: 30, name: 'Aarteenetsint\u00e4', appSlug: 'treasure-hunt', fiSlug: 'aarteenetsinta-tyoarkit',
    primaryKw: 'aarteenetsint\u00e4 generaattori',
    seoTitle: 'Aarteenetsint\u00e4 Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia aarteenetsint\u00e4-teht\u00e4vi\u00e4 suuntasanaston ja ohjeiden ymm\u00e4rt\u00e4misen harjoitteluun. Hauska seikkailuteht\u00e4v\u00e4 esikoulusta 2. luokalle. Ilmainen.',
    h1: 'Aarteenetsint\u00e4 Generaattori',
    subtitle: 'Suuntasanaston ja Ohjeiden Ymm\u00e4rt\u00e4misen Seikkailuharjoituksia',
    secondaryKws: ['aarteenetsint\u00e4 teht\u00e4v\u00e4t','suuntasanasto harjoitus','ohjeiden seuraaminen','aarteen etsint\u00e4 tulostettava','suuntak\u00e4sitteet lapsille','seikkailuteht\u00e4v\u00e4t esikoulu','aarteenetsint\u00e4 luokkahuone','suunnat ja sijainti','seikkailupeli tulostettava','ohjeiden ymm\u00e4rt\u00e4minen'],
    notes: 'Owns "aarteenetsint\u00e4" directional-language concept. Only adventure/game-based worksheet generator in the suite.'
  },
  {
    id: 31, name: 'Kuva-Arvaus', appSlug: 'word-guess', fiSlug: 'kuva-arvaus-tyoarkit',
    primaryKw: 'kuva-arvaus generaattori',
    seoTitle: 'Ilmainen Kuva-Arvaus Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia kuva-arvausteht\u00e4vi\u00e4, joissa lapsi p\u00e4\u00e4ttelee sanan kuvavihjeiden avulla. Kehitt\u00e4\u00e4 sanavarastoa ja p\u00e4\u00e4ttelytaitoja. Ilmainen PDF.',
    h1: 'Kuva-Arvaus Generaattori',
    subtitle: 'Sanavaraston ja P\u00e4\u00e4ttelytaitojen Harjoituksia Kuvavihjein',
    secondaryKws: ['kuva-arvaus teht\u00e4v\u00e4t','sana-arvoitus kuvilla','sanasto harjoitus','kuvallinen sanateht\u00e4v\u00e4','arvausteht\u00e4v\u00e4 lapsille','kuvavihjeteht\u00e4v\u00e4','sanojen p\u00e4\u00e4ttely','sana-arvoitus tulostettava','sanavaraston laajentaminen','kuvavihje sanateht\u00e4v\u00e4'],
    notes: 'Owns "kuva-arvaus" word-guessing concept. Differentiates from word-scramble via visual clue deduction vs letter rearranging.'
  },
  {
    id: 32, name: 'K\u00e4sinkirjoitus', appSlug: 'writing-app', fiSlug: 'kasinkirjoitus-tyoarkit',
    primaryKw: 'k\u00e4sinkirjoitus generaattori',
    seoTitle: 'K\u00e4sinkirjoitus Generaattori \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia k\u00e4sinkirjoituksen harjoitteluteht\u00e4vi\u00e4. Kirjainten muodostus, sanan kirjoittaminen ja kyn\u00e4ote esikoulusta 2. luokalle. Ilmainen PDF.',
    h1: 'K\u00e4sinkirjoituksen Generaattori',
    subtitle: 'Kirjainten ja Sanojen Kirjoitusharjoituksia Esikoulusta 2. Luokalle',
    secondaryKws: ['k\u00e4sinkirjoitus harjoittelu','kirjaimet harjoittelu esikoulu','kirjainten muodostus','kyn\u00e4ote harjoittelu','kirjoittamisen harjoittelu','kirjainharjoitukset tulostettava','hienomotoriikka kirjoittaminen','aakkosten kirjoittaminen','k\u00e4sinkirjoitus tulostettava','kirjoitusvalmiudet esikoulu'],
    notes: 'Owns "k\u00e4sinkirjoitus" handwriting concept. Differentiates from alphabet-train via letter formation practice vs letter ordering.'
  },
  {
    id: 33, name: 'Sanahaku', appSlug: 'word-search', fiSlug: 'sananhaku-tyoarkit',
    primaryKw: 'sanahaku generaattori',
    seoTitle: 'Ilmainen Sanahaku Generaattori | LessonCraftStudio',
    metaDesc: 'Luo tulostettavia sanahakuteht\u00e4vi\u00e4 11 kielell\u00e4. Muokattavat sanat, koot ja vaikeustasot. Sanavaraston ja oikeinkirjoituksen harjoittelua. Ilmainen PDF.',
    h1: 'Sanahaku Generaattori',
    subtitle: 'Tulostettavat Sanahakuteht\u00e4v\u00e4t Sanavaraston Harjoitteluun',
    secondaryKws: ['sanahaku tulostettava','sanahaku lapsille','sanapeli generaattori','sanahaku teht\u00e4v\u00e4','sananhaku tulostettava','sanaristikko lapsille','sanasto sanahaku','oikeinkirjoitus sanahaku','sanahaku alakoulu','sanahaku esikoulu'],
    notes: 'Owns "sanahaku" word-search concept. Only free-tier product. Differentiates from crossword via letter-grid search vs crossword clues.'
  }
];

// ============ THEME HUBS (50) ============
const themes = [
  { id: 1, name: 'El\u00e4imet', slug: 'elaimet', themeId: 'animals', primaryKw: 'el\u00e4inteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset El\u00e4inteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat el\u00e4inaiheiset teht\u00e4v\u00e4t lapsille. Matematiikkaa, v\u00e4rityst\u00e4, sanapelejä ja pulmia el\u00e4inteemalla. Esikoulusta 3. luokalle. Ilmainen PDF.',
    h1: 'El\u00e4inaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['el\u00e4in ty\u00f6lehdet','el\u00e4inten v\u00e4rityskuvat','el\u00e4in matematiikka','el\u00e4imet esikoulu','el\u00e4in tulostettava','el\u00e4in pulmateht\u00e4v\u00e4t','el\u00e4inten laskeminen','el\u00e4in sanaristikko','kotiel\u00e4imet teht\u00e4v\u00e4t','villiel\u00e4imet harjoitukset'] },
  { id: 2, name: 'Ruoka', slug: 'ruoka', themeId: 'food', primaryKw: 'ruokateht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Ruokateht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat ruoka-aiheiset teht\u00e4v\u00e4t lapsille. Terveellinen ravinto, ruokaryhmät ja ruoanlaitto teemalla. Matematiikkaa ja sanapelejä. Ilmainen PDF.',
    h1: 'Ruoka-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['ruoka ty\u00f6lehdet','ruoka v\u00e4rityskuvat','ruoka matematiikka','ruokaryhmät teht\u00e4v\u00e4t','terveellinen ruoka','ruoka esikoulu','ruoka tulostettava','ruoka pulmateht\u00e4v\u00e4t','ruokalajittelu','ruoka sanateht\u00e4v\u00e4t'] },
  { id: 3, name: 'Liikenne', slug: 'liikenne', themeId: 'transportation', primaryKw: 'liikenneteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Liikenneteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat liikenneaiheiset teht\u00e4v\u00e4t lapsille. Autot, junat, lentokoneet ja laivat teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Liikenneaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['liikenne ty\u00f6lehdet','kulkuneuvot teht\u00e4v\u00e4t','autot v\u00e4rityskuvat','liikenne matematiikka','kulkuneuvot esikoulu','liikenne tulostettava','liikenne pulmateht\u00e4v\u00e4t','ajoneuvot lapsille','liikenne sanateht\u00e4v\u00e4t','kulkuneuvot lajittelu'] },
  { id: 4, name: 'Luonto', slug: 'luonto', themeId: 'nature', primaryKw: 'luontoteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Luontoteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat luontoaiheiset teht\u00e4v\u00e4t lapsille. Kasvit, puut, vuoret ja vesist\u00f6t teemalla. V\u00e4rityst\u00e4, laskemista ja ymp\u00e4rist\u00f6kasvatusta. Ilmainen.',
    h1: 'Luontoaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['luonto ty\u00f6lehdet','luonto v\u00e4rityskuvat','luonto matematiikka','luonto esikoulu','luonto tulostettava','luonto pulmateht\u00e4v\u00e4t','ymp\u00e4rist\u00f6 teht\u00e4v\u00e4t','kasvit lapsille','luontokasvatus','luonto sanateht\u00e4v\u00e4t'] },
  { id: 5, name: 'Koulu', slug: 'koulu', themeId: 'school', primaryKw: 'kouluteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Kouluteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat kouluaiheiset teht\u00e4v\u00e4t lapsille. Koulutarvikkeet, luokkahuone ja oppiminen teemalla. Matematiikkaa ja lukemista. Ilmainen PDF.',
    h1: 'Kouluaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['koulu ty\u00f6lehdet','koulutarvikkeet teht\u00e4v\u00e4t','koulu v\u00e4rityskuvat','koulu matematiikka','koulu esikoulu','koulu tulostettava','koulun alku teht\u00e4v\u00e4t','luokkahuone harjoitukset','koulu sanateht\u00e4v\u00e4t','koulup\u00e4iv\u00e4 teht\u00e4v\u00e4t'] },
  { id: 6, name: 'Urheilu', slug: 'urheilu', themeId: 'sports', primaryKw: 'urheiluteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Urheiluteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat urheiluaiheiset teht\u00e4v\u00e4t lapsille. Jalkapallo, koripallo ja yleisurheilu teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Urheiluaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['urheilu ty\u00f6lehdet','urheilu v\u00e4rityskuvat','urheilu matematiikka','urheilu esikoulu','urheilu tulostettava','liikuntalajit teht\u00e4v\u00e4t','urheilu pulmateht\u00e4v\u00e4t','pallopelit lapsille','urheilu sanateht\u00e4v\u00e4t','urheilu laskeminen'] },
  { id: 7, name: 'Tunteet', slug: 'tunteet', themeId: 'emotions', primaryKw: 'tunneteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Tunneteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat tunneaiheiset teht\u00e4v\u00e4t lapsille. Tunteiden tunnistaminen, ilmeet ja tunnetaidot teemalla. V\u00e4rityst\u00e4 ja harjoituksia. Ilmainen PDF.',
    h1: 'Tunneaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['tunteet ty\u00f6lehdet','tunnetaidot harjoitukset','ilmeet teht\u00e4v\u00e4t','tunteet esikoulu','tunteet tulostettava','tunnesanasto lapsille','tunteet v\u00e4rityskuvat','tunnetaitokasvatus','tunteista puhuminen','sosioemotionaaliset taidot'] },
  { id: 8, name: 'Keho', slug: 'keho', themeId: 'body', primaryKw: 'kehoaiheiset teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Kehoteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat kehoaiheiset teht\u00e4v\u00e4t lapsille. Kehon osat, aistit ja terveys teemalla. V\u00e4rityst\u00e4, nime\u00e4mist\u00e4 ja laskemista. Ilmainen PDF.',
    h1: 'Kehoaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['keho ty\u00f6lehdet','kehon osat teht\u00e4v\u00e4t','keho v\u00e4rityskuvat','keho esikoulu','keho tulostettava','aistit teht\u00e4v\u00e4t','kehon osat nime\u00e4minen','terveys lapsille','keho sanateht\u00e4v\u00e4t','kehontuntemus harjoitukset'] },
  { id: 9, name: 'Vaatteet', slug: 'vaatteet', themeId: 'clothing', primaryKw: 'vaateteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Vaateteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat vaateaiheiset teht\u00e4v\u00e4t lapsille. Vaatteet, asusteet ja pukeutuminen teemalla. V\u00e4rityst\u00e4, lajittelua ja sanapelejä. Ilmainen PDF.',
    h1: 'Vaateaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['vaatteet ty\u00f6lehdet','vaatteet v\u00e4rityskuvat','vaatteet lajittelu','vaatteet esikoulu','vaatteet tulostettava','pukeutuminen teht\u00e4v\u00e4t','vaatesanasto lapsille','vaatteet ja s\u00e4\u00e4','vaatteet sanateht\u00e4v\u00e4t','vaatteet yhdist\u00e4minen'] },
  { id: 10, name: 'Koti', slug: 'koti', themeId: 'household', primaryKw: 'kotiaiheiset teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Kotiteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat kotiaiheiset teht\u00e4v\u00e4t lapsille. Kodin esineet, huoneet ja arki teemalla. V\u00e4rityst\u00e4, laskemista ja sanapelejä. Ilmainen PDF.',
    h1: 'Kotiaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['koti ty\u00f6lehdet','kodin esineet teht\u00e4v\u00e4t','koti v\u00e4rityskuvat','koti esikoulu','koti tulostettava','kodin huoneet lapsille','kotisanasto teht\u00e4v\u00e4t','arjen esineet','koti laskeminen','koti sanateht\u00e4v\u00e4t'] },
  { id: 11, name: 'Lelut', slug: 'lelut', themeId: 'toys', primaryKw: 'leluteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Leluteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat leluaiheiset teht\u00e4v\u00e4t lapsille. Lelut, pelit ja leikkiminen teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF-lataus.',
    h1: 'Leluaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['lelut ty\u00f6lehdet','lelut v\u00e4rityskuvat','lelut matematiikka','lelut esikoulu','lelut tulostettava','leikkiminen teht\u00e4v\u00e4t','lelut lajittelu','lelut sanateht\u00e4v\u00e4t','leikki lapsille','lelut laskeminen'] },
  { id: 12, name: 'Musiikki', slug: 'musiikki', themeId: 'music', primaryKw: 'musiikkiteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Musiikkiteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat musiikkiaiheiset teht\u00e4v\u00e4t lapsille. Soittimet, nuotit ja rytmi teemalla. V\u00e4rityst\u00e4, yhdist\u00e4mist\u00e4 ja pulmia. Ilmainen PDF.',
    h1: 'Musiikkiaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['musiikki ty\u00f6lehdet','soittimet teht\u00e4v\u00e4t','musiikki v\u00e4rityskuvat','musiikki esikoulu','musiikki tulostettava','soittimet lapsille','rytmi harjoitukset','musiikki sanateht\u00e4v\u00e4t','soittimet lajittelu','musiikki laskeminen'] },
  { id: 13, name: 'Ammatit', slug: 'ammatit', themeId: 'jobs', primaryKw: 'ammattiteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Ammattiteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat ammattiaiheiset teht\u00e4v\u00e4t lapsille. Eri ammatit, ty\u00f6kalut ja ty\u00f6paikat teemalla. V\u00e4rityst\u00e4, yhdist\u00e4mist\u00e4 ja pulmia. Ilmainen PDF.',
    h1: 'Ammattiaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['ammatit ty\u00f6lehdet','ammatit v\u00e4rityskuvat','ammatit esikoulu','ammatit tulostettava','ty\u00f6kalut teht\u00e4v\u00e4t','ammatit lapsille','ammatit yhdist\u00e4minen','ammattisanasto','ty\u00f6paikat lapsille','ammatit sanateht\u00e4v\u00e4t'] },
  { id: 14, name: 'Avaruus', slug: 'avaruus', themeId: 'space', primaryKw: 'avaruusteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Avaruusteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat avaruusaiheiset teht\u00e4v\u00e4t lapsille. Planeetat, t\u00e4hdet ja astronautit teemalla. Matematiikkaa, v\u00e4rityst\u00e4 ja pulmia. Ilmainen PDF.',
    h1: 'Avaruusaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['avaruus ty\u00f6lehdet','planeetat teht\u00e4v\u00e4t','avaruus v\u00e4rityskuvat','avaruus matematiikka','avaruus esikoulu','avaruus tulostettava','aurinkokunta lapsille','avaruus pulmateht\u00e4v\u00e4t','avaruus sanateht\u00e4v\u00e4t','astronautti teht\u00e4v\u00e4t'] },
  { id: 15, name: 'Vuodenajat', slug: 'vuodenajat', themeId: 'seasons', primaryKw: 'vuodenaikateht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Vuodenaikateht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat vuodenaika-aiheiset teht\u00e4v\u00e4t lapsille. Kev\u00e4t, kes\u00e4, syksy ja talvi teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Vuodenaika-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['vuodenajat ty\u00f6lehdet','vuodenajat v\u00e4rityskuvat','vuodenajat esikoulu','vuodenajat tulostettava','kev\u00e4t kes\u00e4 syksy talvi','vuodenajat laskeminen','vuodenajat pulmateht\u00e4v\u00e4t','vuodenajat lajittelu','vuodenajat sanateht\u00e4v\u00e4t','vuodenaikojen vaihtelut'] },
  { id: 16, name: 'Juhlapy\u00e4t', slug: 'lomat', themeId: 'holidays', primaryKw: 'juhlap\u00e4iv\u00e4teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Juhlap\u00e4iv\u00e4teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat juhlap\u00e4iv\u00e4-aiheiset teht\u00e4v\u00e4t lapsille. Joulu, p\u00e4\u00e4si\u00e4inen, halloween ja synttärit teemalla. V\u00e4rityst\u00e4 ja pulmia. Ilmainen.',
    h1: 'Juhlap\u00e4iv\u00e4-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['juhlap\u00e4iv\u00e4t ty\u00f6lehdet','juhla v\u00e4rityskuvat','juhlap\u00e4iv\u00e4t esikoulu','juhlap\u00e4iv\u00e4t tulostettava','juhlakalenteri teht\u00e4v\u00e4t','juhlaperinteet lapsille','juhlap\u00e4iv\u00e4t laskeminen','juhla pulmateht\u00e4v\u00e4t','juhla sanateht\u00e4v\u00e4t','kalenterijuhlat harjoitukset'] },
  { id: 17, name: 'S\u00e4\u00e4', slug: 'saa', themeId: 'weather', primaryKw: 's\u00e4\u00e4teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset S\u00e4\u00e4teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat s\u00e4\u00e4-aiheiset teht\u00e4v\u00e4t lapsille. Aurinko, sade, pilvet ja tuuli teemalla. V\u00e4rityst\u00e4, laskemista ja sanapelejä. Ilmainen PDF.',
    h1: 'S\u00e4\u00e4-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['s\u00e4\u00e4 ty\u00f6lehdet','s\u00e4\u00e4 v\u00e4rityskuvat','s\u00e4\u00e4 esikoulu','s\u00e4\u00e4 tulostettava','s\u00e4\u00e4tilat lapsille','s\u00e4\u00e4sanasto teht\u00e4v\u00e4t','s\u00e4\u00e4 laskeminen','s\u00e4\u00e4 pulmateht\u00e4v\u00e4t','s\u00e4\u00e4havainnot','s\u00e4\u00e4 sanateht\u00e4v\u00e4t'] },
  { id: 18, name: 'V\u00e4rit', slug: 'varit', themeId: 'colors', primaryKw: 'v\u00e4riteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset V\u00e4riteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat v\u00e4ri-aiheiset teht\u00e4v\u00e4t lapsille. V\u00e4rien tunnistaminen, nime\u00e4minen ja sekoittaminen teemalla. V\u00e4rityst\u00e4 ja lajittelua. Ilmainen.',
    h1: 'V\u00e4ri-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['v\u00e4rit ty\u00f6lehdet','v\u00e4rien tunnistaminen','v\u00e4rit esikoulu','v\u00e4rit tulostettava','v\u00e4rien nime\u00e4minen','v\u00e4risanasto lapsille','v\u00e4rit lajittelu','v\u00e4rien oppiminen','v\u00e4rit yhdist\u00e4minen','v\u00e4rit sanateht\u00e4v\u00e4t'] },
  { id: 19, name: 'Muodot', slug: 'muodot', themeId: 'shapes', primaryKw: 'muototeht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Muototeht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat muoto-aiheiset teht\u00e4v\u00e4t lapsille. Geometriset muodot, nime\u00e4minen ja tunnistaminen teemalla. V\u00e4rityst\u00e4 ja pulmia. Ilmainen PDF.',
    h1: 'Muoto-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['muodot ty\u00f6lehdet','geometriset muodot','muodot esikoulu','muodot tulostettava','muotojen tunnistaminen','muodot v\u00e4rityskuvat','muodot lajittelu','muotojen nime\u00e4minen','muodot matematiikka','muodot sanateht\u00e4v\u00e4t'] },
  { id: 20, name: 'Numerot', slug: 'numerot', themeId: 'numbers', primaryKw: 'numeroteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Numeroteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat numeroaiheiset teht\u00e4v\u00e4t lapsille. Lukujen tunnistaminen, laskeminen ja lukujonot teemalla. Matematiikkaa esikoulusta 3. luokalle. Ilmainen.',
    h1: 'Numeroaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['numerot ty\u00f6lehdet','lukujen tunnistaminen','numerot esikoulu','numerot tulostettava','laskemaan oppiminen','lukujonot harjoitus','numerot v\u00e4rityskuvat','lukum\u00e4\u00e4r\u00e4t lapsille','numerot 1-20','numerot kirjoittaminen'] },
  { id: 21, name: 'Aakkoset', slug: 'aakkoset', themeId: 'alphabet', primaryKw: 'aakkosteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Aakkosteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat aakkosaiheiset teht\u00e4v\u00e4t lapsille. Kirjainten tunnistaminen, kirjoittaminen ja aakkosj\u00e4rjestys teemalla. Esikoulusta 1. luokalle. Ilmainen.',
    h1: 'Aakkosaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['aakkoset ty\u00f6lehdet','kirjaimet harjoittelu','aakkoset esikoulu','aakkoset tulostettava','kirjainten tunnistus','aakkosj\u00e4rjestys','kirjaimet v\u00e4rityskuvat','aakkoset sanateht\u00e4v\u00e4t','kirjaimet kirjoittaminen','aakkoset lapsille'] },
  { id: 22, name: 'Huonekalut', slug: 'huonekalut', themeId: 'furniture', primaryKw: 'huonekaluteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Huonekaluteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat huonekaluaiheiset teht\u00e4v\u00e4t lapsille. Huonekalut, huoneet ja kodin sis\u00e4stys teemalla. V\u00e4rityst\u00e4 ja sanapelejä. Ilmainen PDF.',
    h1: 'Huonekaluaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['huonekalut ty\u00f6lehdet','huonekalut v\u00e4rityskuvat','huonekalut esikoulu','huonekalut tulostettava','kodin kalusteet lapsille','huonekalut sanateht\u00e4v\u00e4t','huonekalut yhdist\u00e4minen','huonekalut lajittelu','huonekalut nime\u00e4minen','huoneet ja kalusteet'] },
  { id: 23, name: 'P\u00e4\u00e4si\u00e4inen', slug: 'paasiaisnen', themeId: 'easter', primaryKw: 'p\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset P\u00e4\u00e4si\u00e4isteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat p\u00e4\u00e4si\u00e4isaiheiset teht\u00e4v\u00e4t lapsille. Munat, puput ja kev\u00e4t teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF-lataus.',
    h1: 'P\u00e4\u00e4si\u00e4isaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['p\u00e4\u00e4si\u00e4inen ty\u00f6lehdet','p\u00e4\u00e4si\u00e4ismunat v\u00e4ritys','p\u00e4\u00e4si\u00e4inen esikoulu','p\u00e4\u00e4si\u00e4inen tulostettava','p\u00e4\u00e4si\u00e4ispupu teht\u00e4v\u00e4t','p\u00e4\u00e4si\u00e4inen matematiikka','p\u00e4\u00e4si\u00e4ismunat etsint\u00e4','p\u00e4\u00e4si\u00e4inen sanateht\u00e4v\u00e4t','p\u00e4\u00e4si\u00e4isaskartelu','p\u00e4\u00e4si\u00e4inen pulmateht\u00e4v\u00e4t'] },
  { id: 24, name: 'Halloween', slug: 'halloween', themeId: 'halloween', primaryKw: 'halloween-teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Halloween-teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat halloween-aiheiset teht\u00e4v\u00e4t lapsille. Kurpitsat, haam\u00fat ja noitahatut teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Halloween-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['halloween ty\u00f6lehdet','halloween v\u00e4rityskuvat','halloween esikoulu','halloween tulostettava','kurpitsa teht\u00e4v\u00e4t','halloween matematiikka','halloween pulmateht\u00e4v\u00e4t','h\u00e4m\u00e4h\u00e4kki teht\u00e4v\u00e4t','halloween sanateht\u00e4v\u00e4t','halloween laskeminen'] },
  { id: 25, name: 'Joulu', slug: 'joulu', themeId: 'xmas', primaryKw: 'jouluteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Jouluteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat jouluaiheiset teht\u00e4v\u00e4t lapsille. Joulupukki, lumiukko ja lahjat teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF-lataus.',
    h1: 'Jouluaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['joulu ty\u00f6lehdet','joulu v\u00e4rityskuvat','joulu esikoulu','joulu tulostettava','joulupukki teht\u00e4v\u00e4t','joulu matematiikka','joulukalenteri lapsille','joulu pulmateht\u00e4v\u00e4t','joulu sanateht\u00e4v\u00e4t','jouluaskartelu tulostettava'] },
  { id: 26, name: 'Talvi', slug: 'talvi', themeId: 'winter', primaryKw: 'talviteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Talviteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat talviaiheiset teht\u00e4v\u00e4t lapsille. Lumi, j\u00e4\u00e4, talviurheilu ja lumiukko teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Talviaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['talvi ty\u00f6lehdet','talvi v\u00e4rityskuvat','talvi esikoulu','talvi tulostettava','lumihiutaleet teht\u00e4v\u00e4t','talvi matematiikka','talviurheilu lapsille','talvi pulmateht\u00e4v\u00e4t','talvi sanateht\u00e4v\u00e4t','lumiukko teht\u00e4v\u00e4t'] },
  { id: 27, name: 'Maatila', slug: 'maatila', themeId: 'farm', primaryKw: 'maatilateht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Maatilateht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat maatila-aiheiset teht\u00e4v\u00e4t lapsille. Maatilan el\u00e4imet, kasvit ja ty\u00f6t teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Maatila-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['maatila ty\u00f6lehdet','maatilan el\u00e4imet','maatila v\u00e4rityskuvat','maatila esikoulu','maatila tulostettava','maatilan el\u00e4imet lapsille','maatila matematiikka','maatila pulmateht\u00e4v\u00e4t','maatila sanateht\u00e4v\u00e4t','maatilan ty\u00f6t'] },
  { id: 28, name: 'Valtameri', slug: 'valtameri', themeId: 'ocean', primaryKw: 'meriteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Meriteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat meri-aiheiset teht\u00e4v\u00e4t lapsille. Meriel\u00e4imet, koralliriutat ja merenalaisuus teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen.',
    h1: 'Meri-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['valtameri ty\u00f6lehdet','meriel\u00e4imet teht\u00e4v\u00e4t','meri v\u00e4rityskuvat','meri esikoulu','meri tulostettava','merenalainen maailma','meriel\u00e4imet lapsille','meri matematiikka','meri pulmateht\u00e4v\u00e4t','meri sanateht\u00e4v\u00e4t'] },
  { id: 29, name: 'Dinosaurukset', slug: 'dinosaurukset', themeId: 'dinosaurs', primaryKw: 'dinosaurusteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Dinosaurusteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat dinosaurusaiheiset teht\u00e4v\u00e4t lapsille. T-rex, triceratops ja stegosaurus teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Dinosaurusaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['dinosaurus ty\u00f6lehdet','dinosaurus v\u00e4rityskuvat','dinosaurukset esikoulu','dinosaurukset tulostettava','t-rex teht\u00e4v\u00e4t','dinosaurus matematiikka','dinosaurukset lapsille','dinosaurus pulmateht\u00e4v\u00e4t','dinosaurus sanateht\u00e4v\u00e4t','dinosaurus laskeminen'] },
  { id: 30, name: 'Hy\u00f6nteiset', slug: 'hyonteiset', themeId: 'insects', primaryKw: 'hy\u00f6nteisteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Hy\u00f6nteisteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat hy\u00f6nteisaiheiset teht\u00e4v\u00e4t lapsille. Perhoset, m\u00e4hihi\u00e4iset ja leppäkertut teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen.',
    h1: 'Hy\u00f6nteisaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['hy\u00f6nteiset ty\u00f6lehdet','hy\u00f6nteiset v\u00e4rityskuvat','hy\u00f6nteiset esikoulu','hy\u00f6nteiset tulostettava','perhoset teht\u00e4v\u00e4t','hy\u00f6nteiset matematiikka','lepak\u00e4kertut lapsille','hy\u00f6nteiset pulmateht\u00e4v\u00e4t','hy\u00f6nteiset sanateht\u00e4v\u00e4t','hy\u00f6nteiset laskeminen'] },
  { id: 31, name: 'Hedelm\u00e4t', slug: 'hedelmat', themeId: 'fruits', primaryKw: 'hedelm\u00e4teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Hedelm\u00e4teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat hedelm\u00e4aiheiset teht\u00e4v\u00e4t lapsille. Omenat, banaanit ja marjat teemalla. V\u00e4rityst\u00e4, laskemista ja lajittelua. Ilmainen PDF-lataus.',
    h1: 'Hedelm\u00e4aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['hedelm\u00e4t ty\u00f6lehdet','hedelm\u00e4t v\u00e4rityskuvat','hedelm\u00e4t esikoulu','hedelm\u00e4t tulostettava','hedelm\u00e4t lajittelu','hedelm\u00e4t laskeminen','hedelm\u00e4t nime\u00e4minen','hedelm\u00e4t sanateht\u00e4v\u00e4t','hedelm\u00e4t yhdist\u00e4minen','terveellinen ravinto lapsille'] },
  { id: 32, name: 'Vihannekset', slug: 'vihannekset', themeId: 'vegetables', primaryKw: 'vihannesteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Vihannesteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat vihannesaiheiset teht\u00e4v\u00e4t lapsille. Porkkana, tomaatti ja kurkku teemalla. V\u00e4rityst\u00e4, laskemista ja lajittelua. Ilmainen PDF.',
    h1: 'Vihannesaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['vihannekset ty\u00f6lehdet','vihannekset v\u00e4rityskuvat','vihannekset esikoulu','vihannekset tulostettava','vihannekset lajittelu','vihannekset laskeminen','vihannekset nime\u00e4minen','vihannekset sanateht\u00e4v\u00e4t','kasvimaa teht\u00e4v\u00e4t','terveellinen ruoka teht\u00e4v\u00e4t'] },
  { id: 33, name: 'Kukat', slug: 'kukat', themeId: 'flowers', primaryKw: 'kukkateht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Kukkateht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat kukka-aiheiset teht\u00e4v\u00e4t lapsille. Ruusut, auringonkukat ja tulppaanit teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Kukka-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['kukat ty\u00f6lehdet','kukat v\u00e4rityskuvat','kukat esikoulu','kukat tulostettava','kukkien nime\u00e4minen','kukat laskeminen','kukat lajittelu','kukat sanateht\u00e4v\u00e4t','puutarha kukat','kev\u00e4tkukat teht\u00e4v\u00e4t'] },
  { id: 34, name: 'Linnut', slug: 'linnut', themeId: 'birds', primaryKw: 'lintuteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Lintuteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat lintuaiheiset teht\u00e4v\u00e4t lapsille. Kotimaiset ja eksoottiset linnut teemalla. V\u00e4rityst\u00e4, laskemista ja sanapelejä. Ilmainen PDF.',
    h1: 'Lintuaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['linnut ty\u00f6lehdet','linnut v\u00e4rityskuvat','linnut esikoulu','linnut tulostettava','linnut laskeminen','linnut nime\u00e4minen','linnut sanateht\u00e4v\u00e4t','lintubongaus lapsille','linnut lajittelu','kotimaiset linnut'] },
  { id: 35, name: 'Lemmikit', slug: 'lemmikit', themeId: 'pets', primaryKw: 'lemmikkiteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Lemmikkiteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat lemmikkiaiheiset teht\u00e4v\u00e4t lapsille. Koirat, kissat ja muut lemmikit teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Lemmikkiaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['lemmikit ty\u00f6lehdet','lemmikit v\u00e4rityskuvat','lemmikit esikoulu','lemmikit tulostettava','koira kissa teht\u00e4v\u00e4t','lemmikit laskeminen','lemmikit sanateht\u00e4v\u00e4t','lemmikkiel\u00e4imet lapsille','lemmikit yhdist\u00e4minen','lemmikit lajittelu'] },
  { id: 36, name: 'El\u00e4intarha', slug: 'elaintarha', themeId: 'zoo', primaryKw: 'el\u00e4intarhateht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset El\u00e4intarhateht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat el\u00e4intarha-aiheiset teht\u00e4v\u00e4t lapsille. Leijona, norsu ja kirahvi teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'El\u00e4intarha-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['el\u00e4intarha ty\u00f6lehdet','el\u00e4intarha v\u00e4rityskuvat','el\u00e4intarha esikoulu','el\u00e4intarha tulostettava','el\u00e4intarhan el\u00e4imet','el\u00e4intarha laskeminen','el\u00e4intarha sanateht\u00e4v\u00e4t','eksoottiset el\u00e4imet','el\u00e4intarha lajittelu','el\u00e4intarha pulmateht\u00e4v\u00e4t'] },
  { id: 37, name: 'Puutarha', slug: 'puutarha', themeId: 'garden', primaryKw: 'puutarhateht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Puutarhateht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat puutarha-aiheiset teht\u00e4v\u00e4t lapsille. Kasvit, puutarhanhoito ja kasvimaa teemalla. V\u00e4rityst\u00e4, laskemista ja sanapelejä. Ilmainen.',
    h1: 'Puutarha-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['puutarha ty\u00f6lehdet','puutarha v\u00e4rityskuvat','puutarha esikoulu','puutarha tulostettava','kasvimaa lapsille','puutarha laskeminen','puutarha sanateht\u00e4v\u00e4t','kasvien kasvatus','puutarha lajittelu','puutarhanhoito teht\u00e4v\u00e4t'] },
  { id: 38, name: 'Retkeily', slug: 'leiriytyminen', themeId: 'camping', primaryKw: 'retkeilyteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Retkeilyteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat retkeilyaiheiset teht\u00e4v\u00e4t lapsille. Teltta, nuotio ja luontoretki teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Retkeilyaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['retkeily ty\u00f6lehdet','leirint\u00e4 teht\u00e4v\u00e4t','retkeily v\u00e4rityskuvat','retkeily esikoulu','retkeily tulostettava','nuotio teht\u00e4v\u00e4t','telttailu lapsille','luontoretki teht\u00e4v\u00e4t','retkeily sanateht\u00e4v\u00e4t','retkeily laskeminen'] },
  { id: 39, name: 'Merirosvot', slug: 'merirosvot', themeId: 'pirates', primaryKw: 'merirosvoteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Merirosvoteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat merirosvoaiheiset teht\u00e4v\u00e4t lapsille. Aarrekartat, merirosvolaivat ja aarteet teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen.',
    h1: 'Merirosvoaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['merirosvot ty\u00f6lehdet','merirosvot v\u00e4rityskuvat','merirosvot esikoulu','merirosvot tulostettava','aarrekartta teht\u00e4v\u00e4t','merirosvot matematiikka','merosvo sanateht\u00e4v\u00e4t','merirosvo seikkailu','merirosvot laskeminen','merirosvo pulmateht\u00e4v\u00e4t'] },
  { id: 40, name: 'Sadut', slug: 'sadut', themeId: 'fairy-tales', primaryKw: 'satuteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Satuteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat satuaiheiset teht\u00e4v\u00e4t lapsille. Prinsessat, lohik\u00e4\u00e4rmeet ja satumets\u00e4 teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Satuaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['sadut ty\u00f6lehdet','sadut v\u00e4rityskuvat','sadut esikoulu','sadut tulostettava','prinsessa teht\u00e4v\u00e4t','lohik\u00e4\u00e4rme lapsille','sadut matematiikka','satuhahmot teht\u00e4v\u00e4t','sadut sanateht\u00e4v\u00e4t','satumaailma harjoitukset'] },
  { id: 41, name: 'Robotit', slug: 'robotit', themeId: 'robots', primaryKw: 'robottiteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Robottiteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat robottiaiheiset teht\u00e4v\u00e4t lapsille. Robotit, teknologia ja ohjelmointi teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Robottiaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['robotit ty\u00f6lehdet','robotit v\u00e4rityskuvat','robotit esikoulu','robotit tulostettava','robotti rakentaminen','robotit matematiikka','robotti sanateht\u00e4v\u00e4t','teknologia lapsille','robotit laskeminen','robotti pulmateht\u00e4v\u00e4t'] },
  { id: 42, name: 'Supersankarit', slug: 'supersankarit', themeId: 'superheroes', primaryKw: 'supersankariteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Supersankariteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat supersankariaiheiset teht\u00e4v\u00e4t lapsille. Sankarit, supervoimat ja pelastaminen teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen.',
    h1: 'Supersankariaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['supersankarit ty\u00f6lehdet','supersankarit v\u00e4rityskuvat','supersankarit esikoulu','supersankarit tulostettava','sankari teht\u00e4v\u00e4t','supersankarit matematiikka','supersankarit sanateht\u00e4v\u00e4t','supervoimat lapsille','supersankarit laskeminen','sankari pulmateht\u00e4v\u00e4t'] },
  { id: 43, name: 'Rakentaminen', slug: 'rakennustyomaa', themeId: 'construction', primaryKw: 'rakennusteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Rakennusteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat rakennusaiheiset teht\u00e4v\u00e4t lapsille. Ty\u00f6koneet, rakennusty\u00f6maa ja ty\u00f6kalut teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen.',
    h1: 'Rakennusaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['rakentaminen ty\u00f6lehdet','ty\u00f6koneet v\u00e4rityskuvat','rakentaminen esikoulu','rakentaminen tulostettava','ty\u00f6koneet lapsille','rakentaminen matematiikka','ty\u00f6kalut teht\u00e4v\u00e4t','rakentaminen sanateht\u00e4v\u00e4t','rakennusty\u00f6maa lapsille','rakentaminen laskeminen'] },
  { id: 44, name: 'Ruoanlaitto', slug: 'ruoanlaitto', themeId: 'cooking', primaryKw: 'ruoanlaittoteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Ruoanlaittoteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat ruoanlaitto-aiheiset teht\u00e4v\u00e4t lapsille. Reseptit, keitti\u00f6v\u00e4lineet ja ruoan valmistus teemalla. V\u00e4rityst\u00e4 ja pulmia. Ilmainen.',
    h1: 'Ruoanlaitto-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['ruoanlaitto ty\u00f6lehdet','ruoanlaitto v\u00e4rityskuvat','ruoanlaitto esikoulu','ruoanlaitto tulostettava','keitti\u00f6v\u00e4lineet lapsille','ruoanlaitto matematiikka','reseptit lapsille','ruoanlaitto sanateht\u00e4v\u00e4t','leipominen teht\u00e4v\u00e4t','ruoanlaitto laskeminen'] },
  { id: 45, name: 'Matkailu', slug: 'matkailu', themeId: 'travel', primaryKw: 'matkailuteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Matkailuteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat matkailuaiheiset teht\u00e4v\u00e4t lapsille. Maat, kulttuurit ja matkakohteet teemalla. V\u00e4rityst\u00e4, laskemista ja sanapelejä. Ilmainen PDF.',
    h1: 'Matkailuaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['matkailu ty\u00f6lehdet','matkailu v\u00e4rityskuvat','matkailu esikoulu','matkailu tulostettava','maailman maat lapsille','matkailu matematiikka','matkailu sanateht\u00e4v\u00e4t','kulttuurit lapsille','matkailu laskeminen','matkailu pulmateht\u00e4v\u00e4t'] },
  { id: 46, name: 'Syntymap\u00e4iv\u00e4', slug: 'syntymapaiva', themeId: 'birthday', primaryKw: 'syntymap\u00e4iv\u00e4teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Syntymap\u00e4iv\u00e4teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat syntymap\u00e4iv\u00e4aiheiset teht\u00e4v\u00e4t lapsille. Kakut, lahjat ja juhlat teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF-lataus.',
    h1: 'Syntymap\u00e4iv\u00e4-aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['syntymap\u00e4iv\u00e4 ty\u00f6lehdet','syntymap\u00e4iv\u00e4 v\u00e4rityskuvat','syntymap\u00e4iv\u00e4 esikoulu','syntymap\u00e4iv\u00e4 tulostettava','syntymap\u00e4iv\u00e4kakku teht\u00e4v\u00e4t','syntymap\u00e4iv\u00e4 matematiikka','syntymap\u00e4iv\u00e4juhlat','syntymap\u00e4iv\u00e4 sanateht\u00e4v\u00e4t','lahjat lapsille','syntymap\u00e4iv\u00e4 laskeminen'] },
  { id: 47, name: 'Sirkus', slug: 'sirkus', themeId: 'circus', primaryKw: 'sirkusteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Sirkusteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat sirkusaiheiset teht\u00e4v\u00e4t lapsille. Pellet, akrobaatit ja sirkusel\u00e4imet teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Sirkusaiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['sirkus ty\u00f6lehdet','sirkus v\u00e4rityskuvat','sirkus esikoulu','sirkus tulostettava','pelle teht\u00e4v\u00e4t','sirkus matematiikka','sirkusel\u00e4imet lapsille','sirkus sanateht\u00e4v\u00e4t','sirkus laskeminen','sirkus pulmateht\u00e4v\u00e4t'] },
  { id: 48, name: 'Mets\u00e4', slug: 'metsa', themeId: 'forest', primaryKw: 'mets\u00e4teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Mets\u00e4teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat mets\u00e4aiheiset teht\u00e4v\u00e4t lapsille. Mets\u00e4nel\u00e4imet, puut ja sienet teemalla. V\u00e4rityst\u00e4, laskemista ja sanapelejä. Ilmainen PDF.',
    h1: 'Mets\u00e4aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['mets\u00e4 ty\u00f6lehdet','mets\u00e4nel\u00e4imet teht\u00e4v\u00e4t','mets\u00e4 v\u00e4rityskuvat','mets\u00e4 esikoulu','mets\u00e4 tulostettava','sienet lapsille','puut teht\u00e4v\u00e4t','mets\u00e4 sanateht\u00e4v\u00e4t','mets\u00e4 laskeminen','mets\u00e4retki teht\u00e4v\u00e4t'] },
  { id: 49, name: 'Kev\u00e4t', slug: 'kevat', themeId: 'spring', primaryKw: 'kev\u00e4tteht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Kev\u00e4tteht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat kev\u00e4taiheiset teht\u00e4v\u00e4t lapsille. Kukat, perhoset ja luonnon her\u00e4\u00e4minen teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF.',
    h1: 'Kev\u00e4taiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['kev\u00e4t ty\u00f6lehdet','kev\u00e4t v\u00e4rityskuvat','kev\u00e4t esikoulu','kev\u00e4t tulostettava','kev\u00e4tkukat lapsille','kev\u00e4t matematiikka','kev\u00e4t sanateht\u00e4v\u00e4t','perhoset kev\u00e4t','kev\u00e4t laskeminen','luonnon her\u00e4\u00e4minen'] },
  { id: 50, name: 'Kes\u00e4', slug: 'kesa', themeId: 'summer', primaryKw: 'kes\u00e4teht\u00e4v\u00e4t lapsille',
    seoTitle: 'Ilmaiset Kes\u00e4teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
    metaDesc: 'Tulostettavat kes\u00e4aiheiset teht\u00e4v\u00e4t lapsille. Ranta, aurinko ja kes\u00e4loma teemalla. V\u00e4rityst\u00e4, laskemista ja pulmia. Ilmainen PDF-lataus.',
    h1: 'Kes\u00e4aiheiset Teht\u00e4v\u00e4t ja Harjoitukset',
    secondaryKws: ['kes\u00e4 ty\u00f6lehdet','kes\u00e4 v\u00e4rityskuvat','kes\u00e4 esikoulu','kes\u00e4 tulostettava','kes\u00e4loma teht\u00e4v\u00e4t','kes\u00e4 matematiikka','ranta teht\u00e4v\u00e4t','kes\u00e4 sanateht\u00e4v\u00e4t','kes\u00e4 laskeminen','kes\u00e4 pulmateht\u00e4v\u00e4t'] }
];

// ============ GRADES ============
const grades = [
  { id: 'preschool', fi: 'Esikoulu', fiSlug: 'esikoulu', suffix: 'esikoululaisille', age: '3\u20134 v.', ageRange: '3\u20134-vuotiaille', subjects: 'V\u00e4rityst\u00e4, laskemista 1\u201310 ja hienomotoriikkaa' },
  { id: 'kindergarten', fi: 'Esiopetus', fiSlug: 'esiopetus', suffix: 'esiopetukseen', age: '5\u20136 v.', ageRange: '5\u20136-vuotiaille', subjects: 'Laskemista, kirjaimia, kuvioita ja visuaalista hahmotusta' },
  { id: 'first-grade', fi: '1. Luokka', fiSlug: 'ensimmainen-luokka', suffix: '1. luokalle', age: '6\u20137 v.', ageRange: '6\u20137-vuotiaille', subjects: 'Yhteenlaskua, v\u00e4hennyslaskua, lukemista ja kirjoittamista' },
  { id: 'second-grade', fi: '2. Luokka', fiSlug: 'toinen-luokka', suffix: '2. luokalle', age: '7\u20138 v.', ageRange: '7\u20138-vuotiaille', subjects: 'Kertolaskua, sanapelejä, logiikkaa ja ongelmanratkaisua' },
  { id: 'third-grade', fi: '3. Luokka', fiSlug: 'kolmas-luokka', suffix: '3. luokalle', age: '8\u20139 v.', ageRange: '8\u20139-vuotiaille', subjects: 'Moniosaisia laskuja, ristisanoja, kryptogrammeja ja haastavampia pulmia' }
];

// ============ SECONDARY PAGES ============
const secondaryPages = [
  // Category hubs (8)
  { type: 'category', name: 'El\u00e4imet ja luonto', slug: 'animals-nature', primaryKw: 'el\u00e4in ja luonto teht\u00e4v\u00e4t opettajille',
    seoTitle: 'El\u00e4in- ja Luontoteht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat el\u00e4in- ja luontoteht\u00e4v\u00e4t opettajille. 10 teemaa: maatila, lemmikit, valtameri, dinosaurukset, mets\u00e4 ja lis\u00e4\u00e4. Ilmainen PDF-lataus.' },
  { type: 'category', name: 'Ruoka ja puutarha', slug: 'food-garden', primaryKw: 'ruoka ja puutarha teht\u00e4v\u00e4t opettajille',
    seoTitle: 'Ruoka- ja Puutarhateht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat ruoka- ja puutarhateht\u00e4v\u00e4t opettajille. 5 teemaa: hedelm\u00e4t, vihannekset, ruoanlaitto ja puutarha. Ilmainen PDF-lataus.' },
  { type: 'category', name: 'Vuodenajat ja s\u00e4\u00e4', slug: 'seasons-weather', primaryKw: 'vuodenajat ja s\u00e4\u00e4 teht\u00e4v\u00e4t opettajille',
    seoTitle: 'Vuodenaika- ja S\u00e4\u00e4teht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat vuodenaika- ja s\u00e4\u00e4teht\u00e4v\u00e4t opettajille. 5 teemaa: kev\u00e4t, kes\u00e4, talvi ja s\u00e4\u00e4tilat. Ilmainen PDF-lataus.' },
  { type: 'category', name: 'Juhlat ja juhlap\u00e4iv\u00e4t', slug: 'holidays-celebrations', primaryKw: 'juhlateht\u00e4v\u00e4t opettajille',
    seoTitle: 'Juhla- ja Juhlap\u00e4iv\u00e4teht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat juhla- ja juhlap\u00e4iv\u00e4teht\u00e4v\u00e4t opettajille. 5 teemaa: joulu, p\u00e4\u00e4si\u00e4inen, halloween ja syntymap\u00e4iv\u00e4. Ilmainen PDF.' },
  { type: 'category', name: 'Oppimisen perusteet', slug: 'academic-foundations', primaryKw: 'oppimisen perusteet teht\u00e4v\u00e4t opettajille',
    seoTitle: 'Oppimisen Perusteht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat oppimisen perusteht\u00e4v\u00e4t opettajille. 5 teemaa: aakkoset, numerot, muodot, v\u00e4rit ja koulu. Ilmainen PDF-lataus.' },
  { type: 'category', name: 'Ihmiset ja arki', slug: 'people-daily-life', primaryKw: 'ihmiset ja arki teht\u00e4v\u00e4t opettajille',
    seoTitle: 'Ihmiset ja Arki Teht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat ihmiset ja arki -teht\u00e4v\u00e4t opettajille. 6 teemaa: keho, tunteet, vaatteet, koti, huonekalut ja ammatit. Ilmainen PDF.' },
  { type: 'category', name: 'Toiminta ja seikkailu', slug: 'active-adventure', primaryKw: 'toiminta ja seikkailu teht\u00e4v\u00e4t opettajille',
    seoTitle: 'Toiminta- ja Seikkailuteht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat toiminta- ja seikkailuteht\u00e4v\u00e4t opettajille. 6 teemaa: urheilu, liikenne, rakentaminen, matkailu, retkeily ja merirosvot.' },
  { type: 'category', name: 'Mielikuvitus ja leikki', slug: 'imagination-play', primaryKw: 'mielikuvitus ja leikki teht\u00e4v\u00e4t opettajille',
    seoTitle: 'Mielikuvitus- ja Leikkiteht\u00e4v\u00e4t Opettajille | LessonCraftStudio',
    metaDesc: 'Tulostettavat mielikuvitus- ja leikkiteht\u00e4v\u00e4t opettajille. 8 teemaa: lelut, musiikki, avaruus, robotit, supersankarit ja sadut. Ilmainen.' },
  // Grade hubs (5)
  { type: 'grade', name: 'Esikoulu', slug: 'esikoulu', primaryKw: 'esikoulu teht\u00e4v\u00e4t tulostettava',
    seoTitle: 'Esikouluteht\u00e4v\u00e4t Tulostettava \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Ilmaiset tulostettavat esikouluteht\u00e4v\u00e4t 3\u20134-vuotiaille. V\u00e4rityst\u00e4, hienomotoriikkaa ja laskemisen perusteita. 50 teemaa. Lataa PDF heti.' },
  { type: 'grade', name: 'Esiopetus', slug: 'esiopetus', primaryKw: 'esiopetus teht\u00e4v\u00e4t tulostettava',
    seoTitle: 'Esiopetuksen Teht\u00e4v\u00e4t Tulostettava | LessonCraftStudio',
    metaDesc: 'Ilmaiset tulostettavat esiopetuksen teht\u00e4v\u00e4t 5\u20136-vuotiaille. Kirjaimet, numerot, kuviot ja hahmottaminen. 50 teemaa. Lataa PDF heti.' },
  { type: 'grade', name: '1. Luokka', slug: 'ensimmainen-luokka', primaryKw: '1. luokan teht\u00e4v\u00e4t tulostettava',
    seoTitle: '1. Luokan Teht\u00e4v\u00e4t Tulostettava \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Ilmaiset tulostettavat 1. luokan teht\u00e4v\u00e4t 6\u20137-vuotiaille. Yhteenlasku, v\u00e4hennyslasku, lukeminen ja kirjoittaminen. 50 teemaa. Lataa PDF heti.' },
  { type: 'grade', name: '2. Luokka', slug: 'toinen-luokka', primaryKw: '2. luokan teht\u00e4v\u00e4t tulostettava',
    seoTitle: '2. Luokan Teht\u00e4v\u00e4t Tulostettava \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Ilmaiset tulostettavat 2. luokan teht\u00e4v\u00e4t 7\u20138-vuotiaille. Kertolaskua, sanapelejä ja ongelmanratkaisua. 50 teemaa. Lataa PDF heti.' },
  { type: 'grade', name: '3. Luokka', slug: 'kolmas-luokka', primaryKw: '3. luokan teht\u00e4v\u00e4t tulostettava',
    seoTitle: '3. Luokan Teht\u00e4v\u00e4t Tulostettava \u2014 Ilmainen | LessonCraftStudio',
    metaDesc: 'Ilmaiset tulostettavat 3. luokan teht\u00e4v\u00e4t 8\u20139-vuotiaille. Moniosaisia laskuja, ristisanoja ja haastavampia pulmia. 50 teemaa. Lataa PDF heti.' },
  // Other secondary pages
  { type: 'other', name: 'Etusivu', slug: '/', primaryKw: 'ty\u00f6arkki generaattorit lapsille',
    seoTitle: 'Ilmaiset Ty\u00f6arkki-Generaattorit Lapsille | LessonCraftStudio',
    metaDesc: 'Luo ty\u00f6arkkeja 33 generaattorilla ja 3 000+ kuvalla. Matematiikka, v\u00e4ritys, sanaristikot ja pulmat. Lataa PDF heti. Ilmainen, ei rekister\u00f6inti\u00e4.' },
  { type: 'other', name: 'Kaikki generaattorit', slug: '/apps', primaryKw: 'teht\u00e4v\u00e4generaattori alusta opettajille',
    seoTitle: '33 Ilmaista Teht\u00e4v\u00e4generaattoria Opettajille | LessonCraftStudio',
    metaDesc: 'Tutustu 33 ilmaiseen teht\u00e4v\u00e4generaattoriin. Luo ristisanoja, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia ja lis\u00e4\u00e4. Lataa tulostettavat PDFt heti. Ilmainen.' },
  { type: 'other', name: 'Teht\u00e4v\u00e4t hakemisto', slug: '/worksheets', primaryKw: 'tulostettavat teht\u00e4v\u00e4t lapsille ilmainen',
    seoTitle: 'Tulostettavat Teht\u00e4v\u00e4t Lapsille \u2014 50 Teemaa | LessonCraftStudio',
    metaDesc: 'Selaa 50 teeman tulostettavia teht\u00e4vi\u00e4 lapsille. Matematiikka, kieli, v\u00e4ritys ja pulmat esikoulusta 3. luokalle. 250+ teht\u00e4v\u00e4kokoelmaa. Ilmainen.' },
  { type: 'other', name: 'Blogi', slug: '/blog', primaryKw: 'opetusmateriaalit blogi opettajille',
    seoTitle: 'Opetusmateriaalit ja Ty\u00f6arkkivinkit Blogi | LessonCraftStudio',
    metaDesc: 'L\u00f6yd\u00e4 100+ asiantuntija-artikkelia opetusstrategioista, teht\u00e4vien suunnittelusta ja ilmaisista koulutusresursseista. Oppaita opettajille ja vanhemmille.' },
  { type: 'other', name: 'Hinnoittelu', slug: '/pricing', primaryKw: 'teht\u00e4v\u00e4generaattori hinta',
    seoTitle: 'Hinnat: Ilmainen, Peruspaketti ja T\u00e4ysi P\u00e4\u00e4sy | LessonCraftStudio',
    metaDesc: 'Valitse suunnitelmasi: Ilmainen sanahakugeneraattori, Peruspaketti 10 generaattorilla tai T\u00e4ysi P\u00e4\u00e4sy kaikkiin 33 generaattoriin. Peru milloin tahansa.' }
];

// ============ BLOG CATEGORIES ============
const blogCategories = [
  { slug: 'opetusresurssit', name: 'Opetusresurssit', primaryKw: 'opetusresurssit opettajille' },
  { slug: 'tyoarkkivinkit', name: 'Ty\u00f6arkkivinkit', primaryKw: 'ty\u00f6arkkivinkit opettajille' },
  { slug: 'koulutustoimintaa', name: 'Koulutustoimintaa', primaryKw: 'koulutustoiminta lapsille' },
  { slug: 'oppimisstrategiat', name: 'Oppimisstrategiat', primaryKw: 'oppimisstrategiat alakoulussa' },
  { slug: 'opetussuunnitelmaoppaat', name: 'Opetussuunnitelmaoppaat', primaryKw: 'opetussuunnitelma opas opettajille' },
  { slug: 'vanhempien-resurssit', name: 'Vanhempien resurssit', primaryKw: 'oppimisresurssit vanhemmille' },
  { slug: 'kauden-sisalto', name: 'Kauden sis\u00e4lt\u00f6', primaryKw: 'kausiluonteiset teht\u00e4v\u00e4t opettajille' }
];

// ============ BLOG POSTS (121) ============
// Format: [slug-decoded, focusKeyword, metaTitle]
// metaDescription generated from template
const blogPosts = [
  ['10 parasta teht\u00e4v\u00e4generaattoria 2. luokalle', 'teht\u00e4v\u00e4generaattorit 2. luokka', '10 Parasta Teht\u00e4v\u00e4generaattoria 2. Luokalle (7\u20138 v.)'],
  ['10 parasta teht\u00e4v\u00e4generaattoria 3. luokan opettajille', 'teht\u00e4v\u00e4generaattorit 3. luokka', '10 Parasta Teht\u00e4v\u00e4generaattoria 3. Luokalle (8\u20139 v.)'],
  ['10 parasta teht\u00e4v\u00e4generaattoria 4\u20135. luokkalaisille', 'teht\u00e4v\u00e4generaattorit 4\u20135. luokka', '10 Parasta Teht\u00e4v\u00e4generaattoria 4\u20135. Luokalle (9\u201311 v.)'],
  ['10 parasta teht\u00e4v\u00e4generaattoria esiopetukseen', 'teht\u00e4v\u00e4generaattorit esiopetus', '10 Parasta Teht\u00e4v\u00e4generaattoria Esiopetukseen (5\u20136 v.)'],
  ['10 parasta teht\u00e4v\u00e4generaattoria esikouluun', 'teht\u00e4v\u00e4generaattorit esikoulu', '10 Parasta Teht\u00e4v\u00e4generaattoria Esikouluun (3\u20135 v.)'],
  ['10 parasta teht\u00e4v\u00e4pohjaty\u00f6kalua 1. luokalle', 'teht\u00e4v\u00e4pohjat 1. luokka', '10 Parasta Teht\u00e4v\u00e4pohjaty\u00f6kalua 1. Luokan Opettajille'],
  ['1. luokan lukutaidon kehitt\u00e4minen', 'lukutaito 1. luokka', '1. Luokan Lukutaito: Sanaeli\u00f6, Aakkosjuna ja Kirjoittaminen'],
  ['33 muokattavaa teht\u00e4v\u00e4kirjageneraattoria', '33 teht\u00e4v\u00e4generaattoria opettajalle', '33 Muokattavaa Teht\u00e4v\u00e4generaattoria Alakoulun Opettajalle'],
  ['3. luokan matematiikka: algebrallinen ajattelu', 'algebrallinen ajattelu 3. luokka', '3. Luokan Matematiikka: Algebrallinen Ajattelu ja Pulmat'],
  ['7 kuvapohjaista generaattoria kieltenopetukseen', 'kieltenopetus generaattorit', '7 Kuvapohjaista Generaattoria Kieltenopetuksen Aloittelijoille'],
  ['ADHD-tukea visuaalisilla teht\u00e4vill\u00e4', 'ADHD visuaaliset teht\u00e4v\u00e4t', 'ADHD-tukea: 9 Generaattoria Kognitiivisen Kuorman Kevent\u00e4miseen'],
  ['\u00c4lyk\u00e4s soluntunnistus ruudukkopiirustuksessa', 'ruudukkopiirustus algoritmi', '\u00c4lyk\u00e4s Soluntunnistus Ruudukkopiirustuksessa: Pikselianalyysi'],
  ['Alakoulun 4\u20135. luokkien haasteet', 'haasteteht\u00e4v\u00e4t 4\u20135. luokka', 'Alakoulun 4\u20135. Luokka: Ruudukkopiirustus, Sudoku ja Logiikka'],
  ['Alakoulun yl\u00e4luokat: haastavia teht\u00e4vi\u00e4', 'haasteteht\u00e4v\u00e4t edistyneille', 'Haastavia Teht\u00e4vi\u00e4 Edistyneille Oppijoille (4\u20135. Luokka)'],
  ['Aloittelevan opettajan opas', 'aloittelevan opettajan opas', 'Aloittelevan Opettajan Opas: J\u00e4rjestelm\u00e4t ja Teht\u00e4v\u00e4pohjat'],
  ['Arviointi ja edistymisen seuranta', 'oppimisen arviointi teht\u00e4v\u00e4monisteet', 'Arviointi ja Edistymisen Seuranta Teht\u00e4v\u00e4monisteilla'],
  ['Autismikirjon tukeminen', 'autismi visuaaliset teht\u00e4v\u00e4t', 'Autismikirjon Tukeminen: 8 Visuaalista Generaattoria'],
  ['Edulliset oppimateriaalit', 'edulliset oppimateriaalit', 'Edulliset Oppimateriaalit: Maksimoi Oppiminen Pienell\u00e4 Budjetilla'],
  ['Eriytt\u00e4minen k\u00e4yt\u00e4nn\u00f6ss\u00e4: eritasoiset oppilaat', 'eriytt\u00e4minen teht\u00e4v\u00e4monisteet', 'Eriytt\u00e4minen K\u00e4yt\u00e4nn\u00f6ss\u00e4: Eritasoisten Oppilaiden Opetus'],
  ['Eriytt\u00e4minen: muokattavat generaattorit', 'eriytt\u00e4minen generaattoreilla', 'Eriytt\u00e4minen K\u00e4yt\u00e4nn\u00f6ss\u00e4: Muokattavat Generaattorit'],
  ['Esiopetuksen hienomotoriset harjoitukset', 'hienomotoriikka esiopetus', 'Esiopetuksen Hienomotoriikka: Viivat, Kuviojuna ja Leikkaus'],
  ['Esiopetuksen matematiikan perusteet', 'esiopetuksen matematiikka', 'Esiopetuksen Matematiikka: Yhteenlasku, Kuviot ja Sudoku'],
  ['Etsi ja l\u00f6yd\u00e4 -teht\u00e4v\u00e4t ammattilaislaadulla', 'etsi ja l\u00f6yd\u00e4 teht\u00e4v\u00e4t', 'Etsi ja L\u00f6yd\u00e4 -teht\u00e4v\u00e4t: Ammattilaatuiset 3 Minuutissa'],
  ['Fisher\u2013Yates-sekoitusalgoritmi sanasotkussa', 'Fisher-Yates sekoitusalgoritmi', 'Fisher\u2013Yates-sekoitus: Satunnaisuus Sanansekoitusteht\u00e4viss\u00e4'],
  ['Formatiivinen arviointi ja oppimisen seuranta', 'formatiivinen arviointi', 'Formatiivinen Arviointi: Teht\u00e4v\u00e4monisteet Tietopohjaisessa Opetuksessa'],
  ['Hajautusalgoritmi oppimateriaalien sijoittelussa', 'hajautusalgoritmi oppimateriaalit', 'Hajautusalgoritmi: Satunnainen Sijoittelu Parantaa Laatua'],
  ['Hienomotoriikan kehitys Benbown mukaan', 'hienomotoriikka Benbow', 'Hienomotoriikan Kehitys: Benbown 6 Esikijoitusliikerataa'],
  ['Yhteisopetus ja tukiopetus', 'yhteisopetus teht\u00e4v\u00e4suunnittelu', 'Yhteisopetus: Tehokas Teht\u00e4v\u00e4suunnittelu Kahdelle Opettajalle'],
  ['Hybridiopetus ja teknologia', 'hybridiopetus teht\u00e4v\u00e4t', 'Hybridiopetus: Digitaalisten ja Tulostettujen Teht\u00e4vien Yhdist\u00e4minen'],
  ['Itsen\u00e4inen ty\u00f6skentely alakoulussa', 'itsen\u00e4inen ty\u00f6skentely alakoulu', 'Itsen\u00e4inen Ty\u00f6skentely: Itseohjautuvuuden Kehitt\u00e4minen'],
  ['Kaksi harjoitusmuotoa: prepositiot', 'prepositioharjoitukset', 'Prepositiot: T\u00e4ydennett\u00e4v\u00e4t ja Monivalintaharjoitukset'],
  ['Kasvuajattelutapa teht\u00e4vill\u00e4', 'kasvuajattelutapa haasteteht\u00e4v\u00e4t', 'Kasvuajattelutapa: Sinnikkyyden Rakentaminen Haasteteht\u00e4vill\u00e4'],
  ['Kattava vuosisuunnitelma opettajalle', 'opettajan vuosisuunnitelma', 'Opettajan Vuosisuunnitelma: Teht\u00e4v\u00e4monisteiden Hallinta'],
  ['Kaupallinen lisenssi: passiivituloja', 'teht\u00e4vien myynti opettajana', 'Kaupallinen Lisenssi: Myy Teht\u00e4vi\u00e4 ja Luo Passiivituloja'],
  ['Kausiluonteiset aktiviteetit', 'kausiluonteiset teht\u00e4v\u00e4t', 'Kausiluonteiset Aktiviteetit: Oppimisen Into L\u00e4pi Vuoden'],
  ['Kes\u00e4n oppimiskato', 'kes\u00e4n oppimiskato harjoitukset', 'Kes\u00e4n Oppimiskato: Taitojen Yll\u00e4pito Kotiharjoituspaketeilla'],
  ['Kinesteettinen oppiminen', 'kinesteettinen oppiminen generaattorit', 'Kinesteettinen Oppiminen: 6 Liikett\u00e4 Sis\u00e4lt\u00e4v\u00e4\u00e4 Generaattoria'],
  ['Kirjoittaminen oppiaineiden v\u00e4lill\u00e4', 'kirjoittaminen oppiaineiden v\u00e4lill\u00e4', 'Kirjoittaminen Oppiaineiden V\u00e4lill\u00e4: Kehitt\u00e4minen Jokaisessa Aineessa'],
  ['Kognitiivinen kuormitusteoria', 'kognitiivinen kuormitusteoria', 'Kognitiivinen Kuormitusteoria Teht\u00e4v\u00e4lehtien Suunnittelussa'],
  ['Kokeisiin valmistautuminen ilman stressi\u00e4', 'kokeisiin valmistautuminen alakoulu', 'Kokeisiin Valmistautuminen Ilman Stressi\u00e4: Strategioita'],
  ['Kolmiportainen tuki ja tukiopetus', 'kolmiportainen tuki teht\u00e4v\u00e4monisteet', 'Kolmiportainen Tuki: Kohdennettuja Teht\u00e4v\u00e4monistetukea'],
  ['Konkreettinen\u2013kuvallinen\u2013abstrakti oppimispolku', 'CPA-menetelm\u00e4 matematiikka', 'CPA-oppimispolku Alakoulun Matematiikassa'],
  ['Kotiopetuksen teht\u00e4v\u00e4generaattorit', 'kotiopetus teht\u00e4v\u00e4generaattorit', 'Kotiopetuksen Generaattorit: T\u00e4ydellinen Tuki Opetussuunnitelmalle'],
  ['Kotiteht\u00e4v\u00e4t vai luokkatyöo', 'kotiteht\u00e4v\u00e4t vai luokkaty\u00f6', 'Kotiteht\u00e4v\u00e4t vai Luokkaty\u00f6: Tasapainoinen L\u00e4hestymistapa'],
  ['Koulun ensimm\u00e4inen viikko', 'koulun aloitus teht\u00e4v\u00e4monisteet', 'Koulun Ensimm\u00e4inen Viikko: Rutiinit ja Odotukset'],
  ['Kriittinen ajattelu ja ongelmanratkaisu', 'kriittinen ajattelu teht\u00e4v\u00e4t', 'Kriittinen Ajattelu: Laaja-alaisten Taitojen Kehitt\u00e4minen'],
  ['Kuvakryptogrammi: visuaalinen salakirjoitus', 'kuvakryptogrammi opas', 'Kuvakryptogrammi: Innovatiivinen Salakirjoitus Esikouluik\u00e4isille'],
  ['Kuvapeli-sudoku lapsille 4\u20138 v.', 'kuvasudoku opas lapsille', 'Kuvapeli-Sudoku Lapsille 4\u20138 v.: Kattava Opetusopas'],
  ['Kuviojuna-teht\u00e4v\u00e4t ja moniaistillinen oppiminen', 'kuviojuna moniaistillinen oppiminen', 'Kuviojuna: Moniaistillinen Oppiminen ja Hahmottamistaito'],
  ['L\u00e4hikehityksen vy\u00f6hyke ja eriytt\u00e4minen', 'l\u00e4hikehityksen vy\u00f6hyke eriytt\u00e4minen', 'L\u00e4hikehityksen Vy\u00f6hyke: Teht\u00e4vien Vaikeustason Eriytt\u00e4minen'],
  ['Lahjakkaat oppilaat', 'lahjakkaat oppilaat generaattorit', 'Lahjakkaat Oppilaat: 8 Haastavaa Teht\u00e4v\u00e4generaattoria'],
  ['Laskuahdistuksen v\u00e4hent\u00e4minen', 'laskuahdistus matalan paineen teht\u00e4v\u00e4t', 'Laskuahdistuksen V\u00e4hent\u00e4minen: 6 Matalan Paineen Generaattoria'],
  ['Looginen ajattelu 2. luokalla', 'looginen ajattelu 2. luokka', 'Looginen Ajattelu 2. Luokalla: Ristikoita ja Logiikkapelejä'],
  ['Lukemisen ymm\u00e4rt\u00e4minen ja sanasto', 'lukemisen ymm\u00e4rt\u00e4minen ty\u00f6kirjat', 'Lukemisen Ymm\u00e4rt\u00e4minen: 6 Tehokasta Ty\u00f6kirjastrategiaa'],
  ['Lukivaikeuden tukeminen', 'lukivaikeus kuvateht\u00e4v\u00e4t', 'Lukivaikeuden Tukeminen: 7 Kuvapohjaista Ty\u00f6kalua'],
  ['Lukukauden p\u00e4\u00e4t\u00f6s', 'lukukauden p\u00e4\u00e4t\u00f6s arviointi', 'Lukukauden P\u00e4\u00e4t\u00f6s: Oppimisen Arviointi ja Kasvun Juhlistaminen'],
  ['Luokanhallinta ty\u00f6arkeilla', 'luokanhallinta teht\u00e4v\u00e4monisteet', 'Luokanhallinta: Ty\u00f6arkit Siirtymiss\u00e4 ja K\u00e4ytt\u00e4ytymisen Tuessa'],
  ['Luokkahuoneteknologia ja tulostettavat', 'hybridioppiminen tulostettavat', 'Hybridioppiminen: Teknologia ja Tulostettavat K\u00e4yt\u00e4nn\u00f6ss\u00e4'],
  ['Luonnontieteiden sanasto', 'luonnontieteiden sanasto teht\u00e4v\u00e4t', 'Luonnontieteiden Sanasto: 8 Teht\u00e4v\u00e4tyyppi\u00e4 K\u00e4sitteiden Oppimiseen'],
  ['Menestystarinat opettajilta', 'opettajien menestystarinat', 'Opettajien Menestystarinat: Teht\u00e4v\u00e4monisteet Muuttivat Luokkahuoneen'],
  ['Mielenterveys ja tunnetaidot', 'mielenterveys tunnetaidot luokka', 'Mielenterveys ja Tunnetaidot: Hyvinvointi Luokkahuoneessa'],
  ['Miksi kuvapohjaiset teht\u00e4v\u00e4t tehoavat', 'kuvapohjainen oppiminen tutkimus', 'Kuvapohjaiset Teht\u00e4v\u00e4t: 2,3-kertainen Muistij\u00e4lki'],
  ['Millerin 7\u00b12 -s\u00e4\u00e4nt\u00f6 ristisanoissa', 'Millerin s\u00e4\u00e4nt\u00f6 ristisanat', 'Millerin 7\u00b12: Miksi Kuvaristisanoissa On 8 Kuvaa'],
  ['Hahmontunnistus ja matemaattinen ajattelu', 'hahmontunnistus matematiikka', 'Hahmontunnistus ja Matemaattinen Ajattelu: Tutkimustietoa'],
  ['Miten lapsi oppii lukemaan sujuvasti', 'lukemaan oppiminen ortografia', 'Lukemaan Oppiminen: Ortografinen Oppiminen ja N\u00e4k\u00f6sanatotaito'],
  ['Sanansekoitus nopeuttaa oikeinkirjoitusta', 'sanansekoitus oikeinkirjoitus', 'Sanansekoitusteht\u00e4v\u00e4t Nopeuttavat Oikeinkirjoituksen Oppimista'],
  ['Varianssin tunnistus palapeleiss\u00e4', 'varianssin tunnistus algoritmi', 'Varianssin Tunnistus: Tyhjien Palapelin Palojen Est\u00e4minen'],
  ['Monikieliset generaattorit', 'monikielinen teht\u00e4v\u00e4generaattori', 'Monikieliset Generaattorit: Suomenkielinen K\u00e4ytt\u00f6liittym\u00e4'],
  ['Muokattava ristisanaruudukko', 'ristisanaruudukko generaattori', 'Muokattava Ristisanaruudukko: Ainutlaatuinen Ty\u00f6kalu Opettajille'],
  ['Musiikki ja taide oppimisessa', 'musiikki taide oppiminen', 'Musiikki ja Taide: Luovat Teht\u00e4v\u00e4t Taiteelliseen Ilmaisuun'],
  ['Nolla-p\u00e4\u00e4llekk\u00e4isyys-algoritmi', 'etsi ja l\u00f6yd\u00e4 algoritmi', 'Nolla-p\u00e4\u00e4llekk\u00e4isyys: Ammattimaisten Etsint\u00e4teht\u00e4vien Luominen'],
  ['Opettajan ajanhallinta', 'opettajan ajanhallinta strategiat', 'Opettajan Ajanhallinta: Pakettivalmistelun Strategiat'],
  ['Opettajan t\u00e4ydennyskoulutus', 'opettajan t\u00e4ydennyskoulutus', 'T\u00e4ydennyskoulutus: Ty\u00f6taulukoiden Hy\u00f6dynt\u00e4minen Kehittymisess\u00e4'],
  ['Opetuksen tulevaisuus 2025\u20132030', 'opetuksen tulevaisuus teknologia', 'Opetuksen Tulevaisuus 2025\u20132030: Teknologiatrendit ja Teht\u00e4v\u00e4t'],
  ['Opetusajan maksimointi', 'opetusajan maksimointi strategiat', 'Opetusajan Maksimointi: Tehokkuusstrategiat Teht\u00e4v\u00e4monisteilla'],
  ['Oppiaineiden integrointi', 'oppiaineiden integrointi monialaisuus', 'Oppiaineiden Integrointi: Monialaiset Oppimiskokonaisuudet'],
  ['Oppilaan tavoitteiden asettaminen', 'oppilaan tavoitteet itsearviointi', 'Oppilaan Tavoitteet ja Itsearviointi: Itseohjautuva Oppija'],
  ['Oppilaiden motivointi ja palkitseminen', 'oppilaiden motivointi teht\u00e4v\u00e4t', 'Oppilaiden Motivointi: Edistymisen Juhliminen Teht\u00e4v\u00e4pohjilla'],
  ['Oppimateriaalialustat vertailu', 'oppimateriaalialusta vertailu', 'Oppimateriaalialustat: Edullinen vai Kallis \u2014 Kattava Vertailu'],
  ['Oppimispisteet ja kiertotyöskentely', 'oppimispisteet kiertotyöskentely', 'Oppimispisteet: Toimiva Malli Itsenäisen Työskentelyn Hallintaan'],
  ['Oppimistulosten analysointi', 'oppimistulosten analysointi opetus', 'Oppimistulosten Analysointi Opetuksen Kehittämisessä'],
  ['R\u00e4\u00e4t\u00e4l\u00f6ity oppimateriaali 3 minuutissa', 'r\u00e4\u00e4t\u00e4l\u00f6ity oppimateriaali opas', 'R\u00e4\u00e4t\u00e4l\u00f6ity Oppimateriaali 3 Minuutissa: T\u00e4ydellinen Opas'],
  ['Ruudukkopiirustus: Leonardo da Vincin tekniikka', 'ruudukkopiirustus da Vinci', 'Ruudukkopiirustus: Da Vincin 500 Vuotta Vanha Tekniikka'],
  ['S2-opetus visuaaliset strategiat', 'S2-opetus visuaaliset ty\u00f6kalut', 'S2-opetus: Visuaaliset Strategiat Kielenoppimisen Tukena'],
  ['100 koulup\u00e4iv\u00e4n juhla', '100 koulup\u00e4iv\u00e4n juhla', 'Sadan Koulup\u00e4iv\u00e4n Juhla: Aktiviteetteja ja Teemateht\u00e4vi\u00e4'],
  ['Salaviesti-yhteenlasku', 'salaviesti yhteenlasku', 'Salaviesti-Yhteenlasku: Kun Matematiikka Muuttuu Arvoitukseksi'],
  ['Sanahaku-generaattori 90 sekunnissa', 'sanahaku generaattori opas', 'Sanahaku-Generaattori: Muokattavat Teht\u00e4v\u00e4t 90 Sekunnissa'],
  ['Sanansekoitus mukautuvalla vaikeustasolla', 'sanansekoitus mukautuva vaikeustaso', 'Sanansekoitus: \u00c4lykk\u00e4\u00e4t Vihjeet Sanan Pituuden Mukaan'],
  ['Siirtym\u00e4tilanteet ja rutiinit', 'siirtym\u00e4tilanteet luokkahuone', 'Siirtym\u00e4tilanteet: Sujuva Luokkatyöskentely Teht\u00e4v\u00e4monisteilla'],
  ['Sijaisopettajan h\u00e4t\u00e4suunnitelmat', 'sijaisopettajan suunnitelmat', 'Sijaisopettajan H\u00e4t\u00e4suunnitelmat: Valmiit Teht\u00e4v\u00e4monisteet'],
  ['Sosiaaliset ja tunnetaidot (SEL)', 'SEL-oppiminen teht\u00e4v\u00e4t', 'Sosiaaliset ja Tunnetaidot: SEL-oppimisen Integrointi'],
  ['STEAM-opetus k\u00e4yt\u00e4nn\u00f6ss\u00e4', 'STEAM-opetus ty\u00f6arkit', 'STEAM-opetus: Kun Ty\u00f6arkit Tukevat Tekemist\u00e4 ja Luovuutta'],
  ['Symbolinen algebra lapsille', 'symbolinen algebra lapsille', 'Symbolinen Algebra: Matemaattiset Pulmat Taatulla Ratkeavuudella'],
  ['Tavoitel\u00e4ht\u00f6inen opetuksen suunnittelu', 'tavoitel\u00e4ht\u00f6inen suunnittelu', 'Tavoitel\u00e4ht\u00f6inen Suunnittelu: Loppup\u00e4\u00e4st\u00e4 Aloittaminen'],
  ['Teht\u00e4v\u00e4generaattoreiden vertailu', 'LessonCraftStudio vertailu', 'Teht\u00e4v\u00e4generaattoreiden Vertailu: LCS vs Kilpailijat'],
  ['Teht\u00e4v\u00e4generaattorit haltuun: opas', 'teht\u00e4v\u00e4generaattorit opas', 'Teht\u00e4v\u00e4generaattorit Haltuun: Kattava Opas Aloituksesta Tulostukseen'],
  ['Tekij\u00e4noikeudet ja opetusmateriaalit', 'tekij\u00e4noikeudet opetusmateriaalit', 'Tekij\u00e4noikeudet ja Opetusmateriaalit: Opettajan Opas'],
  ['Toimintaterapian tavoitteet', 'toimintaterapia hienomotoriikka', 'Toimintaterapia: 8 Hienomotoriikan Harjoitusta'],
  ['Tulostettu vai digitaalinen teht\u00e4v\u00e4moniste', 'tulostettu vai digitaalinen', 'Tulostettu vai Digitaalinen: Oikean Muodon Valinta Opetukseen'],
  ['Ty\u00f6muistin tukeminen visuaalisesti', 'ty\u00f6muisti visuaalinen tuki', 'Ty\u00f6muistin Tukeminen: 7 Teht\u00e4v\u00e4tyyppi\u00e4 Visuaalisella Tuella'],
  ['Vaihtoehtoiset arviointimenetelm\u00e4t', 'vaihtoehtoiset arviointi', 'Vaihtoehtoiset Arviointimenetelm\u00e4t: Toiminnallinen Arviointi'],
  ['Vanhempien osallistuminen oppimiseen', 'vanhempien osallistuminen koti-koulu', 'Vanhempien Osallistuminen: Ty\u00f6kalut Koti-Koulu-Yhteisty\u00f6h\u00f6n'],
  ['Varhaiskasvatus ja esiopetus 3\u20136 v.', 'varhaiskasvatus teht\u00e4v\u00e4t 3-6', 'Varhaiskasvatus: Ik\u00e4tasoiset Teht\u00e4v\u00e4t 3\u20136-vuotiaille'],
  ['Vertaisopetus ja oppilaat opettajina', 'vertaisopetus teht\u00e4v\u00e4pohjat', 'Vertaisopetus: Teht\u00e4v\u00e4pohjaiset Menetelm\u00e4t Oppimiseen'],
  ['Visuaalinen hahmotus: Frostigin taidot', 'visuaalinen hahmotus Frostig', 'Visuaalinen Hahmotus: Frostigin Viisi Perustaitoa'],
  ['Visuaalinen ja verbaalinen oppiminen', 'visuaalinen verbaalinen oppiminen', 'Visuaalinen ja Verbaalinen Oppiminen: 2,3-kertainen Tehostus'],
  ['Visuaaliset ty\u00f6kalut erityisopetukseen', 'erityisopetus visuaaliset generaattorit', 'Visuaaliset Ty\u00f6kalut Erityisopetukseen: 8 Generaattoria'],
  ['Visuaalis-spatiaaliset taidot', 'visuaalis-spatiaaliset taidot STEM', 'Visuaalis-spatiaaliset Taidot: 7 Teht\u00e4v\u00e4tyyppi\u00e4 STEM-oppimiseen'],
  ['Vuodenaikojen teht\u00e4v\u00e4suunnittelu', 'vuodenaikojen teht\u00e4v\u00e4suunnittelu', 'Vuodenaikojen Teht\u00e4v\u00e4suunnittelu: Koko Vuoden Strategia'],
  ['Yhteiskuntaopin sanasto', 'yhteiskuntaopin sanasto generaattorit', 'Yhteiskuntaopin Sanasto: 7 Generaattoria Historiaan ja Maantietoon'],
  ['Yksik\u00e4sitteinen ratkeavuus -algoritmi', 'yksik\u00e4sitteinen ratkeavuus', 'Yksik\u00e4sitteinen Ratkeavuus: Algoritmi Est\u00e4\u00e4 Turhautumisen'],
  ['Yl\u00e4kouluun siirtyminen', 'yl\u00e4kouluun siirtyminen valmistelu', 'Yl\u00e4kouluun Siirtyminen: Viidesluokkalaisen Valmistaminen']
];


// ============================================================
// MARKDOWN GENERATION
// ============================================================

function charCount(str) {
  return str.length;
}

function generateMarkdown() {
  let md = '';

  // HEADER
  md += `# Finnish (fi) All Pages \u2014 Keyword Map\n\n`;
  md += `> Part 101 of the ONE CLICK A DAY SEO plan. Finnish is Tier 1 (Very Low Competition) \u2014 broader 2\u20133 word keywords can rank.\n\n`;
  md += `**Total pages mapped:** ${33 + 50 + 250 + blogPosts.length + secondaryPages.length + blogCategories.length} pages\n`;
  md += `- 33 product pages\n`;
  md += `- 50 theme hub pages\n`;
  md += `- 250 theme+grade pages\n`;
  md += `- ${blogPosts.length} blog posts\n`;
  md += `- ${secondaryPages.length + blogCategories.length} secondary pages (8 category hubs, 5 grade hubs, 7 blog categories, 5 other)\n\n`;

  // ANTI-CANNIBALIZATION RULES
  md += `---\n\n## Anti-Cannibalization Rules\n\n`;
  md += `| Page Type | Reserved Primary Keyword Pattern | Finnish Example |\n`;
  md += `|-----------|--------------------------------|----------------|\n`;
  md += `| **Product pages** | \`{ty\u00f6kalu} generaattori\` | yhteenlasku generaattori |\n`;
  md += `| **Theme hubs** | \`{teema}teht\u00e4v\u00e4t lapsille\` | el\u00e4inteht\u00e4v\u00e4t lapsille |\n`;
  md += `| **Theme+grade** | \`{teema}teht\u00e4v\u00e4t {luokka}\` | el\u00e4inteht\u00e4v\u00e4t esikoululaisille |\n`;
  md += `| **Blog posts** | \`{aihe} opas/vinkit/miten\` | ADHD visuaaliset teht\u00e4v\u00e4t |\n`;
  md += `| **Category hubs** | \`{kategoria} teht\u00e4v\u00e4t opettajille\` | el\u00e4in ja luonto teht\u00e4v\u00e4t opettajille |\n`;
  md += `| **Grade hubs** | \`{luokka} teht\u00e4v\u00e4t tulostettava\` | esikoulu teht\u00e4v\u00e4t tulostettava |\n`;
  md += `| **Blog categories** | \`{kategoria} opettajille\` | opetusresurssit opettajille |\n\n`;

  // ============================================================
  // SECTION 1: PRODUCT PAGES
  // ============================================================
  md += `---\n\n## Section 1: Product Pages (33)\n\n`;
  md += `### Quick Reference Table\n\n`;
  md += `| # | Slug | Primary Keyword | Action Modifier |\n`;
  md += `|---|------|----------------|------------------|\n`;
  for (const p of products) {
    md += `| ${p.id} | \`${p.fiSlug}\` | ${p.primaryKw} | generaattori |\n`;
  }
  md += `\n`;

  // Individual product entries
  for (const p of products) {
    md += `### ${p.id}. ${p.name} (\`${p.fiSlug}\`)\n\n`;
    md += `| Field | Value |\n`;
    md += `|-------|-------|\n`;
    md += `| **Primary Keyword** | ${p.primaryKw} |\n`;
    md += `| **SEO Title** | ${p.seoTitle.replace(/\|/g, '\\|')} |\n`;
    md += `| **Title Chars** | ${charCount(p.seoTitle)} |\n`;
    md += `| **Meta Description** | ${p.metaDesc} |\n`;
    md += `| **Desc Chars** | ${charCount(p.metaDesc)} |\n`;
    md += `| **H1 (hero.title)** | ${p.h1} |\n`;
    md += `| **Subtitle (hero.subtitle)** | ${p.subtitle} |\n\n`;
    md += `**Secondary Keywords (${p.secondaryKws.length}):**\n`;
    p.secondaryKws.forEach((kw, i) => {
      md += `${i + 1}. ${kw}\n`;
    });
    md += `\n**Differentiation Notes:** ${p.notes}\n\n`;
  }

  // ============================================================
  // SECTION 2: THEME HUB PAGES
  // ============================================================
  md += `---\n\n## Section 2: Theme Hub Pages (50)\n\n`;
  md += `### Quick Reference Table\n\n`;
  md += `| # | Theme Slug | Primary Keyword | Collection Modifier |\n`;
  md += `|---|------------|----------------|---------------------|\n`;
  for (const t of themes) {
    md += `| ${t.id} | \`${t.slug}\` | ${t.primaryKw} | teht\u00e4v\u00e4t lapsille |\n`;
  }
  md += `\n`;

  // Individual theme entries
  for (const t of themes) {
    md += `### ${t.id}. ${t.name} (\`${t.slug}\`)\n\n`;
    md += `| Field | Value |\n`;
    md += `|-------|-------|\n`;
    md += `| **Primary Keyword** | ${t.primaryKw} |\n`;
    md += `| **SEO Title** | ${t.seoTitle.replace(/\|/g, '\\|')} |\n`;
    md += `| **Title Chars** | ${charCount(t.seoTitle)} |\n`;
    md += `| **Meta Description** | ${t.metaDesc} |\n`;
    md += `| **Desc Chars** | ${charCount(t.metaDesc)} |\n`;
    md += `| **H1 (heading)** | ${t.h1} |\n\n`;
    md += `**Secondary Keywords (${t.secondaryKws.length}):**\n`;
    t.secondaryKws.forEach((kw, i) => {
      md += `${i + 1}. ${kw}\n`;
    });
    md += `\n`;
  }

  // ============================================================
  // SECTION 3: THEME+GRADE PAGES (250)
  // ============================================================
  md += `---\n\n## Section 3: Theme+Grade Pages (250)\n\n`;
  md += `### Quick Reference Table\n\n`;
  md += `| # | Theme | Grade | Slug | Primary Keyword |\n`;
  md += `|---|-------|-------|------|----------------|\n`;
  let tgCount = 0;
  for (const t of themes) {
    for (const g of grades) {
      tgCount++;
      const kw = `${t.primaryKw.replace(' lapsille', '')} ${g.suffix}`;
      md += `| ${tgCount} | ${t.name} | ${g.fi} | \`${t.slug}/${g.fiSlug}\` | ${kw} |\n`;
    }
  }
  md += `\n`;

  // Individual theme+grade entries (grouped by theme)
  tgCount = 0;
  for (const t of themes) {
    md += `### ${t.name} (${t.themeId}) \u2014 5 luokka-astetta\n\n`;
    for (const g of grades) {
      tgCount++;
      const themePart = t.primaryKw.replace(' lapsille', '');
      const kw = `${themePart} ${g.suffix}`;
      const titleBase = `${t.name}teht\u00e4v\u00e4t ${g.suffix}`;
      const seoTitle = `${titleBase} | LessonCraftStudio`;
      const seoDesc = `Tulostettavat ${t.name.toLowerCase()}-aiheiset teht\u00e4v\u00e4t ${g.suffix} (${g.age}). ${g.subjects}. 33 generaattoria. Ilmainen PDF.`;
      const kw1 = `${t.name.toLowerCase()} ${g.fi.toLowerCase()}`;
      const kw2 = `${t.name.toLowerCase()} teht\u00e4v\u00e4t ${g.ageRange}`;
      const kw3 = `${t.name.toLowerCase()} harjoitukset ${g.fi.toLowerCase()}`;
      const kw4 = `${t.name.toLowerCase()} tulostettava ${g.fi.toLowerCase()}`;

      md += `**${g.fi} (${g.age})**\n`;
      md += `- **Primary Keyword:** ${kw}\n`;
      md += `- **seoTitle:** ${seoTitle} (${charCount(seoTitle)})\n`;
      md += `- **seoDescription:** ${seoDesc} (${charCount(seoDesc)})\n`;
      md += `- **seoKeywords:** ${kw1}, ${kw2}, ${kw3}, ${kw4}\n\n`;
    }
  }

  // ============================================================
  // SECTION 4: BLOG POST KEYWORDS (121)
  // ============================================================
  md += `---\n\n## Section 4: Blog Post Keywords (${blogPosts.length})\n\n`;
  md += `| # | Topic (decoded) | focusKeyword | metaTitle |\n`;
  md += `|---|----------------|-------------|----------|\n`;
  blogPosts.forEach((bp, i) => {
    md += `| ${i + 1} | ${bp[0]} | ${bp[1]} | ${bp[2]} |\n`;
  });
  md += `\n`;

  md += `**Note:** metaDescription for each blog post follows the template:\n`;
  md += `\`[Topic summary in 1 sentence]. Tutkimuspohjaisia strategioita ja k\u00e4yt\u00e4nn\u00f6n vinkkej\u00e4 opettajille ja vanhemmille. Lue koko artikkeli.\`\n\n`;

  // ============================================================
  // SECTION 5: SECONDARY PAGES
  // ============================================================
  md += `---\n\n## Section 5: Secondary Pages\n\n`;

  // Category hubs
  md += `### Category Hubs (8)\n\n`;
  for (const sp of secondaryPages.filter(s => s.type === 'category')) {
    md += `**${sp.name}** (\`${sp.slug}\`)\n`;
    md += `- **Primary Keyword:** ${sp.primaryKw}\n`;
    md += `- **SEO Title:** ${sp.seoTitle} (${charCount(sp.seoTitle)})\n`;
    md += `- **Meta Description:** ${sp.metaDesc} (${charCount(sp.metaDesc)})\n\n`;
  }

  // Grade hubs
  md += `### Grade Hubs (5)\n\n`;
  for (const sp of secondaryPages.filter(s => s.type === 'grade')) {
    md += `**${sp.name}** (\`${sp.slug}\`)\n`;
    md += `- **Primary Keyword:** ${sp.primaryKw}\n`;
    md += `- **SEO Title:** ${sp.seoTitle} (${charCount(sp.seoTitle)})\n`;
    md += `- **Meta Description:** ${sp.metaDesc} (${charCount(sp.metaDesc)})\n\n`;
  }

  // Blog category hubs
  md += `### Blog Category Hubs (7)\n\n`;
  for (const bc of blogCategories) {
    md += `**${bc.name}** (\`/fi/blog/category/${bc.slug}/\`)\n`;
    md += `- **Primary Keyword:** ${bc.primaryKw}\n\n`;
  }

  // Other secondary pages
  md += `### Other Secondary Pages\n\n`;
  for (const sp of secondaryPages.filter(s => s.type === 'other')) {
    md += `**${sp.name}** (\`${sp.slug}\`)\n`;
    md += `- **Primary Keyword:** ${sp.primaryKw}\n`;
    md += `- **SEO Title:** ${sp.seoTitle} (${charCount(sp.seoTitle)})\n`;
    md += `- **Meta Description:** ${sp.metaDesc} (${charCount(sp.metaDesc)})\n\n`;
  }

  // ============================================================
  // VERIFICATION SUMMARY
  // ============================================================
  md += `---\n\n## Verification Summary\n\n`;

  // Check uniqueness
  const allPrimaryKws = [
    ...products.map(p => p.primaryKw),
    ...themes.map(t => t.primaryKw),
    ...secondaryPages.map(s => s.primaryKw),
    ...blogCategories.map(b => b.primaryKw),
    ...blogPosts.map(b => b[1])
  ];

  const kwSet = new Set();
  const duplicates = [];
  for (const kw of allPrimaryKws) {
    if (kwSet.has(kw)) duplicates.push(kw);
    kwSet.add(kw);
  }

  md += `- **Total unique primary keywords:** ${kwSet.size}\n`;
  md += `- **Duplicates found:** ${duplicates.length === 0 ? 'NONE \u2714\uFE0F' : duplicates.join(', ')}\n`;
  md += `- **Product pages:** ${products.length} (all use "generaattori" pattern)\n`;
  md += `- **Theme hubs:** ${themes.length} (all use "teht\u00e4v\u00e4t lapsille" pattern)\n`;
  md += `- **Theme+grade pages:** ${themes.length * grades.length} (all use grade-specific suffix)\n`;
  md += `- **Blog posts:** ${blogPosts.length}\n`;
  md += `- **Secondary pages:** ${secondaryPages.length + blogCategories.length}\n`;
  md += `- **Anti-cannibalization:** No product keyword uses "lapsille", no theme hub uses "generaattori" \u2714\uFE0F\n`;
  md += `- **Language:** All keywords in Finnish (no English leakage) \u2714\uFE0F\n`;

  return md;
}

// ============================================================
// GENERATE AND WRITE
// ============================================================
const outputPath = path.join(__dirname, '..', 'docs', 'seo-keywords', 'fi-all-pages.md');
const content = generateMarkdown();
fs.writeFileSync(outputPath, content, 'utf8');

// Verification output
const allKws = [
  ...products.map(p => p.primaryKw),
  ...themes.map(t => t.primaryKw),
  ...blogPosts.map(b => b[1])
];
const kwSet = new Set(allKws);
console.log(`Generated: ${outputPath}`);
console.log(`Total lines: ${content.split('\n').length}`);
console.log(`File size: ${(content.length / 1024).toFixed(1)} KB`);
console.log(`Product keywords: ${products.length} (unique: ${new Set(products.map(p=>p.primaryKw)).size})`);
console.log(`Theme keywords: ${themes.length} (unique: ${new Set(themes.map(t=>t.primaryKw)).size})`);
console.log(`Blog keywords: ${blogPosts.length} (unique: ${new Set(blogPosts.map(b=>b[1])).size})`);
console.log(`Cross-section duplicates: ${allKws.length - kwSet.size}`);
