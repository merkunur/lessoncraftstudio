const fs = require('fs');
const path = require('path').join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts');

// Norwegian (no) and Finnish (fi) slugs for all 112 blog posts
const slugMap = {
  // === CATEGORY 1: Product-Specific Seller Guides (33) ===
  'sell-addition-worksheets-etsy-guide': { no: 'selg-addisjons-arbeidsark-etsy-guide', fi: 'myy-yhteenlasku-tyoarkit-etsy-opas' },
  'sell-subtraction-worksheets-online': { no: 'selg-subtraksjons-arbeidsark-nettbutikk', fi: 'myy-vahennyslasku-tyoarkit-verkossa' },
  'code-addition-puzzles-sell-etsy': { no: 'kode-addisjons-puslespill-selg-etsy', fi: 'koodi-yhteenlasku-palapelit-myy-etsy' },
  'math-worksheet-bundles-that-sell': { no: 'matte-arbeidsark-pakker-som-selger', fi: 'matematiikka-tyoarkki-paketit-jotka-myyvat' },
  'math-puzzle-books-amazon-kdp': { no: 'mattepuslespillboeker-amazon-kdp', fi: 'matemaattinen-pulmatehtavakirja-amazon-kdp' },
  'chart-count-worksheets-business': { no: 'diagram-telle-arbeidsark-bedrift', fi: 'kaavio-lasku-tyoarkit-liiketoiminta' },
  'word-search-printables-profit': { no: 'ordsok-utskrifter-fortjeneste', fi: 'sananhaku-tulosteet-tuotto' },
  'crossword-books-kdp-niche': { no: 'kryssordboeker-kdp-nisje', fi: 'ristikko-kirjat-kdp-niche' },
  'cryptogram-worksheets-sell': { no: 'kryptogram-arbeidsark-selg', fi: 'salakirjoitus-tyoarkit-myy' },
  'word-scramble-printables-business': { no: 'bokstavblanding-utskrifter-bedrift', fi: 'sanasekoitus-tulosteet-liiketoiminta' },
  'word-guess-game-worksheets-sell': { no: 'ordgjettespill-arbeidsark-selg', fi: 'sana-arvaus-peli-tyoarkit-myy' },
  'handwriting-worksheets-etsy-niche': { no: 'handskrift-arbeidsark-etsy-nisje', fi: 'kaunokirjoitus-tyoarkit-etsy-niche' },
  'matching-worksheets-toddler-market': { no: 'kobling-arbeidsark-smaabarnsmarked', fi: 'yhdistamis-tyoarkit-taaperomarkkina' },
  'tracing-worksheets-fine-motor-sell': { no: 'sporings-arbeidsark-finmotorikk-selg', fi: 'jaljennos-tyoarkit-hienomotoriikka-myy' },
  'hidden-object-worksheets-business': { no: 'skjulte-gjenstander-arbeidsark-bedrift', fi: 'piilokuvat-tyoarkit-liiketoiminta' },
  'grid-matching-puzzles-sell': { no: 'rutenett-koblingspuslespill-selg', fi: 'ruudukko-yhdistamis-palapelit-myy' },
  'find-and-count-printables-profit': { no: 'finn-og-tell-utskrifter-fortjeneste', fi: 'etsi-ja-laske-tulosteet-tuotto' },
  'missing-pieces-puzzles-kdp': { no: 'manglende-brikker-puslespill-kdp', fi: 'puuttuvat-palat-palapelit-kdp' },
  'shadow-matching-worksheets-sell': { no: 'skyggekobling-arbeidsark-selg', fi: 'varjoyhdistamis-tyoarkit-myy' },
  'picture-maze-worksheets-business': { no: 'bildelabyrint-arbeidsark-bedrift', fi: 'kuva-sokkelo-tyoarkit-liiketoiminta' },
  'sorting-worksheets-preschool-sell': { no: 'sorterings-arbeidsark-barnehage-selg', fi: 'lajittelu-tyoarkit-esikoulu-myy' },
  'preposition-worksheets-esl-market': { no: 'preposisjoner-arbeidsark-norskkurs-marked', fi: 'prepositiot-tyoarkit-s2-markkina' },
  'coloring-pages-business-2026': { no: 'fargeleggingssider-bedrift-2026', fi: 'varityssivut-liiketoiminta-2026' },
  'draw-and-color-worksheets-sell': { no: 'tegn-og-fargelegg-arbeidsark-selg', fi: 'piirra-ja-varita-tyoarkit-myy' },
  'alphabet-worksheets-best-sellers': { no: 'alfabet-arbeidsark-bestselgere', fi: 'aakkoset-tyoarkit-myydyimmat' },
  'bingo-cards-printable-business': { no: 'bingokort-utskrifter-bedrift', fi: 'bingokortit-tulosteet-liiketoiminta' },
  'pattern-worksheets-sell-online': { no: 'monster-arbeidsark-selg-nettbutikk', fi: 'kuvio-tyoarkit-myy-verkossa' },
  'pattern-train-worksheets-niche': { no: 'monstertog-arbeidsark-nisje', fi: 'kuviojuna-tyoarkit-niche' },
  'treasure-hunt-printables-sell': { no: 'skattejakt-utskrifter-selg', fi: 'aarteenetsinta-tulosteet-myy' },
  'picture-sudoku-books-kdp': { no: 'bildesudoku-boeker-kdp', fi: 'kuvasudoku-kirjat-kdp' },
  'size-comparison-worksheets-sell': { no: 'storrelsessammenligning-arbeidsark-selg', fi: 'kokovertailu-tyoarkit-myy' },
  'more-less-worksheets-sell': { no: 'mer-mindre-arbeidsark-selg', fi: 'enemman-vahemman-tyoarkit-myy' },
  'odd-one-out-worksheets-sell': { no: 'finn-den-ulike-arbeidsark-selg', fi: 'etsi-erilainen-tyoarkit-myy' },

  // === CATEGORY 2: Platform & Business Strategy (30) ===
  'etsy-printable-shop-first-month': { no: 'etsy-printable-butikk-foerste-maaned', fi: 'etsy-tulosteet-kauppa-ensimmainen-kuukausi' },
  'etsy-seo-printable-sellers-2026': { no: 'etsy-seo-printable-selgere-2026', fi: 'etsy-seo-tulosteet-myyjat-2026' },
  'etsy-listing-optimization-worksheets': { no: 'etsy-annonse-optimalisering-arbeidsark', fi: 'etsy-ilmoitus-optimointi-tyoarkit' },
  'kdp-activity-book-formatting-guide': { no: 'kdp-aktivitetsbok-formatering-guide', fi: 'kdp-aktiviteettikirja-muotoilu-opas' },
  'kdp-vs-etsy-which-earns-more': { no: 'kdp-eller-etsy-hva-tjener-mest', fi: 'kdp-vai-etsy-kumpi-tuottaa-enemman' },
  'printable-business-income-realistic': { no: 'printable-bedrift-inntekt-realistisk', fi: 'tulosteet-liiketoiminta-tulot-realistinen' },
  'how-many-listings-etsy-success': { no: 'hvor-mange-annonser-etsy-suksess', fi: 'montako-ilmoitusta-etsy-menestys' },
  'etsy-printable-pricing-strategy': { no: 'etsy-printable-prisstrategi', fi: 'etsy-tulosteet-hinnoittelustrategia' },
  'pinterest-traffic-printable-shop': { no: 'pinterest-trafikk-printable-butikk', fi: 'pinterest-liikenne-tulosteet-kauppa' },
  'seasonal-printable-calendar-sellers': { no: 'sesongkalender-printable-selgere', fi: 'kausikalenteri-tulosteet-myyjat' },
  'printable-bundle-strategy-etsy': { no: 'printable-pakke-strategi-etsy', fi: 'tulosteet-paketti-strategia-etsy' },
  'passive-income-printables-truth': { no: 'passiv-inntekt-printables-sannhet', fi: 'passiivinen-tulo-tulosteet-totuus' },
  'printable-business-no-design-skills': { no: 'printable-bedrift-uten-designkunnskaper', fi: 'tulosteet-liiketoiminta-ilman-suunnittelutaitoja' },
  'worksheet-quality-vs-quantity-etsy': { no: 'arbeidsark-kvalitet-kvantitet-etsy', fi: 'tyoarkit-laatu-maara-etsy' },
  'best-printable-niches-low-competition': { no: 'beste-printable-nisjer-lav-konkurranse', fi: 'parhaat-tulosteet-nichet-matala-kilpailu' },
  'etsy-reviews-printable-products': { no: 'etsy-anmeldelser-printable-produkter', fi: 'etsy-arvostelut-tulosteet-tuotteet' },
  'multilingual-printables-advantage': { no: 'flerspraklige-printables-fordel', fi: 'monikieliset-tulosteet-etu' },
  'commercial-license-printables-explained': { no: 'kommersiell-lisens-printables-forklart', fi: 'kaupallinen-lisenssi-tulosteet-selitetty' },
  'printable-shop-branding-tips': { no: 'printable-butikk-merkevare-tips', fi: 'tulosteet-kauppa-brandays-vinkit' },
  'email-list-printable-business': { no: 'e-postliste-printable-bedrift', fi: 'sahkopostilista-tulosteet-liiketoiminta' },
  'etsy-ads-printables-worth-it': { no: 'etsy-annonser-printables-verdt-det', fi: 'etsy-mainokset-tulosteet-kannattaako' },
  'tpt-vs-etsy-worksheets-comparison': { no: 'tpt-eller-etsy-arbeidsark-sammenligning', fi: 'tpt-vai-etsy-tyoarkit-vertailu' },
  'printable-business-mistakes-avoid': { no: 'printable-bedrift-feil-unngaa', fi: 'tulosteet-liiketoiminta-virheet-valta' },
  'scale-printable-business-automation': { no: 'skaler-printable-bedrift-automatisering', fi: 'skaalaa-tulosteet-liiketoiminta-automaatio' },
  'printable-mockup-photos-sell-more': { no: 'printable-mockup-bilder-selg-mer', fi: 'tulosteet-mockup-kuvat-myy-enemman' },
  'gumroad-vs-etsy-digital-products': { no: 'gumroad-eller-etsy-digitale-produkter', fi: 'gumroad-vai-etsy-digitaaliset-tuotteet' },
  'print-on-demand-vs-digital-download': { no: 'print-on-demand-eller-digital-nedlasting', fi: 'tilauspaino-vai-digitaalinen-lataus' },
  'customer-service-digital-products': { no: 'kundeservice-digitale-produkter', fi: 'asiakaspalvelu-digitaaliset-tuotteet' },
  'social-media-printable-sellers': { no: 'sosiale-medier-printable-selgere', fi: 'sosiaalinen-media-tulosteet-myyjat' },
  'copyright-printable-sellers-basics': { no: 'opphavsrett-printable-selgere-grunnleggende', fi: 'tekijanoikeus-tulosteet-myyjat-perusteet' },

  // === CATEGORY 3: Niche & Seasonal Content (30) ===
  'best-printables-sell-christmas': { no: 'beste-printables-selge-jul', fi: 'parhaat-tulosteet-myy-joulu' },
  'halloween-printables-sell-october': { no: 'halloween-printables-selge-oktober', fi: 'halloween-tulosteet-myy-lokakuu' },
  'back-to-school-printable-rush': { no: 'skolestart-printables-rush', fi: 'koulunaloitus-tulosteet-sesonki' },
  'valentines-day-printables-sell': { no: 'valentinsdag-printables-selge', fi: 'ystavanpaiva-tulosteet-myy' },
  'easter-printables-business-spring': { no: 'paaske-printables-bedrift-vaar', fi: 'paasiais-tulosteet-liiketoiminta-kevat' },
  'summer-activity-printables-sell': { no: 'sommer-aktiviteter-printables-selge', fi: 'kesa-aktiviteetti-tulosteet-myy' },
  'preschool-printables-best-sellers': { no: 'barnehage-printables-bestselgere', fi: 'esikoulu-tulosteet-myydyimmat' },
  'kindergarten-worksheets-market': { no: 'barnehage-arbeidsark-marked', fi: 'paivakoti-tyoarkit-markkina' },
  'homeschool-printables-growing-market': { no: 'hjemmeundervisning-printables-voksende-marked', fi: 'kotiopetus-tulosteet-kasvava-markkina' },
  'esl-worksheets-global-market': { no: 'norskkurs-arbeidsark-globalt-marked', fi: 's2-tyoarkit-globaali-markkina' },
  'special-education-printables-sell': { no: 'spesialundervisning-printables-selge', fi: 'erityisopetus-tulosteet-myy' },
  'printable-games-birthday-parties': { no: 'utskrivbare-spill-bursdagsfester', fi: 'tulostettavat-pelit-syntymapaivajuhlat' },
  'educational-printables-new-parents': { no: 'pedagogiske-printables-nye-foreldre', fi: 'opetukselliset-tulosteet-uudet-vanhemmat' },
  'toddler-activity-printables-sell': { no: 'smaabarns-aktiviteter-printables-selge', fi: 'taapero-aktiviteetti-tulosteet-myy' },
  'math-fact-fluency-printables-sell': { no: 'hoderegning-printables-selge', fi: 'paalasku-tulosteet-myy' },
  'sight-words-worksheets-business': { no: 'ordbilder-arbeidsark-bedrift', fi: 'kokonaiset-sanat-tyoarkit-liiketoiminta' },
  'fine-motor-activities-printables': { no: 'finmotorikk-aktiviteter-printables', fi: 'hienomotoriikka-aktiviteetit-tulosteet' },
  'brain-break-printables-teachers': { no: 'hjernepause-printables-laerere', fi: 'aivotauko-tulosteet-opettajat' },
  'travel-activity-printables-sell': { no: 'reise-aktiviteter-printables-selge', fi: 'matka-aktiviteetti-tulosteet-myy' },
  'animal-themed-printables-sell': { no: 'dyre-tema-printables-selge', fi: 'elainaihe-tulosteet-myy' },
  'space-themed-worksheets-business': { no: 'romfart-tema-arbeidsark-bedrift', fi: 'avaruusaihe-tyoarkit-liiketoiminta' },
  'printables-sell-mothers-day-fathers-day': { no: 'printables-selge-morsdag-farsdag', fi: 'tulosteet-myy-aitienpaiva-isanpaiva' },
  'thanksgiving-printables-sell-november': { no: 'takkefest-printables-selge-november', fi: 'kiitospaiva-tulosteet-myy-marraskuu' },
  'new-year-printables-january': { no: 'nyttaar-printables-januar', fi: 'uusivuosi-tulosteet-tammikuu' },
  'spring-printables-sell-march-april': { no: 'vaar-printables-selge-mars-april', fi: 'kevat-tulosteet-myy-maalis-huhtikuu' },
  'winter-printables-sell-december-january': { no: 'vinter-printables-selge-desember-januar', fi: 'talvi-tulosteet-myy-joulu-tammikuu' },
  'dinosaur-printables-sell-evergreen': { no: 'dinosaur-printables-selge-evergreen', fi: 'dinosaurus-tulosteet-myy-ikivihrea' },
  'farm-animal-printables-sell': { no: 'bondegaardsdyr-printables-selge', fi: 'maatila-elain-tulosteet-myy' },
  'ocean-themed-printables-sell': { no: 'hav-tema-printables-selge', fi: 'meri-aihe-tulosteet-myy' },
  'food-themed-worksheets-sell': { no: 'mat-tema-arbeidsark-selge', fi: 'ruoka-aihe-tyoarkit-myy' },

  // === CATEGORY 4: How-To Tutorials (19) ===
  'create-worksheet-bundle-35-minutes': { no: 'lag-arbeidsark-pakke-35-minutter', fi: 'luo-tyoarkki-paketti-35-minuuttia' },
  'format-worksheets-etsy-listing': { no: 'formater-arbeidsark-etsy-annonse', fi: 'muotoile-tyoarkit-etsy-ilmoitus' },
  'create-activity-book-kdp-start-finish': { no: 'lag-aktivitetsbok-kdp-start-slutt', fi: 'luo-aktiviteettikirja-kdp-alusta-loppuun' },
  'worksheet-design-tips-sell-more': { no: 'arbeidsark-design-tips-selg-mer', fi: 'tyoarkit-suunnittelu-vinkit-myy-enemman' },
  'answer-key-importance-printable-sales': { no: 'fasit-viktighet-printable-salg', fi: 'vastausavain-merkitys-tulosteet-myynti' },
  'use-themed-images-sell-worksheets': { no: 'bruk-temabilder-selg-arbeidsark', fi: 'kayta-teemakuvia-myy-tyoarkit' },
  'batch-create-worksheets-efficiently': { no: 'lag-arbeidsark-i-partier-effektivt', fi: 'luo-tyoarkit-erina-tehokkaasti' },
  'worksheet-difficulty-levels-product-tiers': { no: 'arbeidsark-vanskelighetsgrader-produktnivaaer', fi: 'tyoarkit-vaikeustasot-tuoteportaat' },
  'printable-file-formats-pdf-jpeg-guide': { no: 'printable-filformater-pdf-jpeg-guide', fi: 'tulosteet-tiedostomuodot-pdf-jpeg-opas' },
  'create-cohesive-printable-brand': { no: 'lag-sammenhengende-printable-merkevare', fi: 'luo-yhtenainen-tulosteet-brandi' },
  'repurpose-worksheets-multiple-products': { no: 'gjenbruk-arbeidsark-flere-produkter', fi: 'uudelleenkayta-tyoarkit-useita-tuotteita' },
  'worksheet-generator-vs-canva-comparison': { no: 'arbeidsark-generator-eller-canva-sammenligning', fi: 'tyoarkit-generaattori-vai-canva-vertailu' },
  'free-printable-samples-lead-magnet': { no: 'gratis-printable-proever-lead-magnet', fi: 'ilmaiset-tulosteet-naytteet-lead-magnet' },
  'best-paper-sizes-printable-products': { no: 'beste-papirstoerrelser-printable-produkter', fi: 'parhaat-paperikoot-tulosteet-tuotteet' },
  'create-printable-curriculum-packs': { no: 'lag-pensum-pakker-printables', fi: 'luo-opetussuunnitelma-paketit-tulosteet' },
  '11-languages-sell-globally': { no: '11-spraak-selg-globalt', fi: '11-kielta-myy-globaalisti' },
  'etsy-keyword-research-printables': { no: 'etsy-soekeord-forskning-printables', fi: 'etsy-avainsana-tutkimus-tulosteet' },
  'printable-product-photography-mockups': { no: 'printable-produktfotografering-mockups', fi: 'tulosteet-tuotekuvaus-mockupit' },
  'update-old-printable-listings-boost-sales': { no: 'oppdater-gamle-printable-annonser-oek-salg', fi: 'paivita-vanhat-tulosteet-ilmoitukset-kasvata-myyntia' },
};

let content = fs.readFileSync(path, 'utf8');

let count = 0;
for (const [blogId, slugs] of Object.entries(slugMap)) {
  // Match the line with this blogId and add no/fi before the closing } }
  const escaped = blogId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    "(\\{ blogId: '" + escaped + "', slugs: \\{[^}]+)(\\} \\})",
    'g'
  );
  const before = content;
  content = content.replace(regex, function(match, prefix, suffix) {
    return prefix + ", no: '" + slugs.no + "', fi: '" + slugs.fi + "' " + suffix;
  });
  if (content !== before) count++;
}

fs.writeFileSync(path, content, 'utf8');
console.log('Updated ' + count + ' entries out of ' + Object.keys(slugMap).length + ' expected');

// Verify no duplicates within no and fi
const lines = content.split('\n');
const noSlugs = new Set();
const fiSlugs = new Set();
const dupes = [];
for (const line of lines) {
  const noMatch = line.match(/no: '([^']+)'/);
  const fiMatch = line.match(/fi: '([^']+)'/);
  if (noMatch) {
    if (noSlugs.has(noMatch[1])) dupes.push('Duplicate no: ' + noMatch[1]);
    noSlugs.add(noMatch[1]);
  }
  if (fiMatch) {
    if (fiSlugs.has(fiMatch[1])) dupes.push('Duplicate fi: ' + fiMatch[1]);
    fiSlugs.add(fiMatch[1]);
  }
}
if (dupes.length > 0) {
  console.log('DUPLICATES FOUND:');
  dupes.forEach(function(d) { console.log('  ' + d); });
} else {
  console.log('No duplicates found - all slugs unique within each locale');
}
console.log('Total no slugs: ' + noSlugs.size + ', fi slugs: ' + fiSlugs.size);
