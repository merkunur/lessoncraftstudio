import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen etsi ja laske -tehtävä verkossa',
    secondaryKeywords: [
      'etsi ja laske ilmaiseksi verkossa',
      'hakutehtävägeneraattori ilman rekisteröitymistä',
      'kokeile etsi ja laske ilmaiseksi',
      'tulostettava etsi ja laske ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'hakutehtävä',
    ],
    titleTag: 'Ilmainen etsi ja laske -tehtävä verkossa',
    metaDescription: 'Tee etsi ja laske -tehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Etsi ja laske -generaattori',
    tagline: 'Kaksoistilan hakutehtava-generaattori Piilotetut esineet -tilalla (hajautettu kuvaruudukko jopa 4 kohdeesineella) ja Kirjainhaku-tilalla (kielikohtainen aakkosto suomen AaOe-kirjaimilla), nelja sekoitettavaa tehtyvatyyppia (ymparoi, nelio, rasti, laske), lokalisoidut kuvanimietunnisteet 11 kielella ja saadettava ruudukontiheys 5x5-10x10',
    description: 'Tee ammattimaisia haku- ja laskemistehtavia kahdella aktiviteettitilalla. Piilotetut esineet levittaa kuvia saadettavaan ruudukkoon (5-10 rivia x 5-10 saraketta, oletus 6x6) jopa 4 kohdeesineella yksittaisilla tehtyvatyypeilla — ymparoi, nelio, rasti tai laske. Kirjainhaku nayttaa kielikohtaisen aakkoston suomen A-O mukaan lukien A ja O (29 kirjainta) ja generoi hakukohtauksia valitulla kirjaimella alkavilla kuvilla. Kieliriippuvainen: kuvanimietunnisteet renderoidaan valitulla kielella kuvasanastojaarjestelman kautta — "Kissa" suomeksi, "Cat" englanniksi, "Katze" saksaksi. Kaksoistyoalue-jarjestelma generoi vastausavaimet punaisilla visuaalisilla merkinnoilla. Automaattisesti generoitu otsikko sinisella reunuksella (#2196F3). Selaa 104 kokoelmaa. Vie nelja tiedostoa 300 DPI:lla. Ilmainen kokeilu vesileimalla.',
  },

  tutorial: {
    title: 'Nain teet hakutehtavia 8 vaiheessa',
    steps: [
      { title: 'Avaa etsi ja laske -generaattori', description: 'Klikkaa "Kokeile ilmaiseksi nyt". Sovellus autogeneroi tayden hakutehtavan sivun latautuessa elainteemalla, 4 satunnaisella kuvalla ja satunnaisilla tehtyvatyypeilla 6x6-ruudukossa — valitoen esikatselu. Ei tilia tarvita.' },
      { title: 'Aseta sivun asettelu', description: 'Valitse sivukoko: Oletus (800x1000), Letter, A4, Nelio (1200x1200) tai mukautettu. Valitse tausta- ja kehystemat itsenaisilla lapinakyvyyden liukusaatimilla.' },
      { title: 'Valitse aktiviteettitila', description: 'Piilotetut esineet (oletus) — klassiset hakukohtaukset hajautetuilla kuvilla. Kirjainhaku — aktivoi kielikohtaisen aakkoston (suomi 29 kirjainta mukaan lukien A ja O) ja generoi kohtauksia valitulla kirjaimella alkavilla kuvilla.' },
      { title: 'Maarita ruudukontiheys vaikeuden hallintaan', description: 'Aseta rivit (5-10) ja sarakkeet (5-10) — oletus 6x6 (36 solua). 5x5 (25 solua) — helpompi suuremmilla kuvilla. 10x10 (100 solua) — tiheae, haastavia kohtauksia.' },
      { title: 'Valitse kohdekuvat ja osoita tehtyvatyyppit', description: 'Piilotetut esineet -tilassa valitse enintaen 4 kohdetta. Osoita tehtyvatyyppi per kuva: ymparoi, nelio, rasti tai laske. Sekoita kaikki nelja yhdelle tehtavalle. Kirjainhaussa klikkaa kirjain aakkostoruudukosta — mukaan lukien suomen A ja O.' },
      { title: 'Generoi hakutehtava', description: 'Klikkaa Generoi. Hajautettu kuvaruudukko tayttyy kohdekohteilla (1-5 esiintymaa kutakin) harhautusten joukossa. Tyylitelty otsikko sinisella reunuksella (#2196F3), keltaisella sisaekorostuksella ja lokalisoidulla otsikolla nakyy.' },
      { title: 'Tarkista automaattisesti generoitu vastausavain', description: 'Klikkaa Vastausavain-valilehteae. Punaiset visuaaliset merkinnaeae: ympaerat ymparoi-kohteille, nelioeanelio-kohteille, rastit rasti-kohteille, maeaeraenaytot laske-kohteille.' },
      { title: 'Lataa kaikki nelja tiedostoa', description: 'Vaihda harmaasavy. Lataa tehtava-JPEG, tehtava-PDF, vastausavain-JPEG, vastausavain-PDF 300 DPI:lla. Vaihda teemoja, saada ruudukkoa, muuta tehtyvatyyppeja ja generoi uudelleen nopeaan vaihteluun.' },
    ],
  },

  whatYouCanCreate: [
    { title: 'Teemakohtaiset hakuaktiviteettipaketit sekoitetuilla tehtyvatyypeilla', description: 'Luo hakutehtavapaketteja 104 kuvakokoelmasta. Sekoita kaikki nelja tehtyvatyyppia per paketti. Pakkaa 15-20 tehtavaa automaattisilla vastausavaimilla. Satunnainen jakelu tekee jokaisesta generoinnista ainutlaatuisen.' },
    { title: 'A-O Kirjainhaku-foniiikkapaketit kielikohtaisilla aakkostoilla', description: 'Luo taydelliset aakkostoihakupaketit — yksi tehtava per kirjain. Suomen paketit sisaltavat 29 kirjainta A:lla ja O:lla. Kielikohtaiset aakkostot korostuskirjaimilla tuottavat kielikohtaisia foniikkapaketteja, joita vain-englantilaiset tyokalut eivat voi tuottaa.' },
    { title: 'KDP hakuaktiviteetti-tyokirjat progressiivisella vaikeudella', description: 'Kokoa 50-80 tehtavaa painettaviksi tyokirjoiksi. Rakenteen vaikeuden mukaan: varhaiset luvut 5x5 kahdella kohteella, keskitason 7x7 kolmella kohteella, edistyneet 10x10 kaikilla 4 kohteella ja sekoitetuilla tehtyvatyypeilla.' },
    { title: 'Monikieliset hakukokoelmat globaaleille markkinoille', description: 'Hyodynna kieliriippuvaisia kuvanimietunnisteita hakutehtavien luomiseen kaikilla 11 kielella. Samat kuvat tuottavat erilaisen merkintaeaen. "Kissa" suomeksi, "Cat" englanniksi, "Katze" saksaksi.' },
    { title: 'Havainnointi- ja laskemisaktiviteettipaketit', description: 'Rakenna myyntivalmiita hakutehtavia nimi/paivamaara-kentilla ja vastausavaimilla. Laske-tehtyvatyyppi yhdistaa visuaalisen haun numeeriseen harjoitteluun.' },
    { title: 'Moniformaattiset haku- ja loytaemispaketit', description: 'Yhdista hakutehtavat piilotetut esineet -palapeleihin, sanahakuun, ristikkoon ja aarteenetsintaeaen koordinoiduilla teemoilla. Moniformaattipakettit oikeuttavat premium-hinnoittelun.' },
  ],

  businessIdeas: [
    { title: 'Teemakohtainen hakuaktiviteetti-kauppa Etsyssa', description: 'Avaa Etsy-kauppa hakuaktiviteettipaketeilla 104 kuvakokoelmalla. Nelja tehtyvatyyppia jokaisesta teemasta nelikertaistavat tehtavavalikoiman.', platform: 'Etsy' },
    { title: 'Amazon KDP hakuaktiviteetti-tyokirjasarja', description: 'Kokoa 50-80 tehtavaa temaattisiksi tyokirjoiksi. Rakenteen vaikeuden mukaan: "Helppoja hakuharjoituksia" 5x5:lla, "Laske ja loyda seikkailuja" laske-tehtyvatyypilla, "Edistyneitae hakutehtaviae" 10x10:lla, "A-O Kirjainhaku" foniikalla. Lokalisoidut versiot mahdollisia.', platform: 'Amazon KDP' },
    { title: 'Gumroad hakuaktiviteettipaketit', description: 'Lataa hakuaktiviteettipaketteja Gumroadiin nimi/paivamaara-kentilla ja automaattisilla vastausavaimilla. Nelja tehtyvatyyppia tuottavat tasoitettuja versioita. Kirjainhaku palvelee foniikka- ja aakkostotietoisuusmarkkinaa.', platform: 'Gumroad' },
    { title: 'Pinterest hakutehtava-liikennetsuppilo', description: 'Hakutehtavat varikkailla hajautetuilla kuvaruudukoilla ja sinisella otsikolla luovat valittomasti tunnistettavaa sisaltoa.', platform: 'Pinterest' },
    { title: 'Gumroad taysi hakuaktiviteetti-tyokalupaketti', description: 'Pakkaa hakutehtavat kaikista 104 teemasta, molemmista aktiviteettitiloista ja kaikista neljasta tehtyvatyypista. Sisallyta 300+ tehtavaa vastausavaimilla — 600+ tiedostoa.', platform: 'Gumroad' },
    { title: 'Monikielinen hakutuotelinja kansainvalisille markkinoille', description: 'Etsi ja laske -generaattori on kieliriippuvainen — kuvatunnisteet, Kirjainhaku-alkukirjaimet ja otsikkoteksti muuttuvat kaikki. Luo aitoja lokalisoituja hakutehtavia.', platform: 'Etsy / Amazon KDP' },
  ],

  proTips: [
    { title: 'Sekoita kaikki nelja tehtyvatyyppia jokaiselle tehtavalle', description: 'Tehtavat ymparoi-, nelio-, rasti- ja laske-tyypeilla tarjoavat nelja erillistae kognitiivista haastetta. Osoita eri tehtyvatyyppi kullekin 4 kohdekohteelle.' },
    { title: 'Kayta ruudukontiheytta paesiaellisena vaikeuden hallintana', description: '5x5 (25 solua) — helppo. 7x7 (49 solua) — tasapainoinen. 10x10 (100 solua) — aidosti haastava. Luo progressiivisia vaikeuspaketteja merkityilla osioilla.' },
    { title: 'Hyodynna Kirjainhakua foniikkatuotteisiin', description: 'Kirjainhaku suomen AO:lla (29 kirjainta), saksan AOU:lla, espanjan N:lla ja pohjoismaisilla AOA:lla tuottaa kielikohtaisia foniikkapaketteja, joita vain-englantilaiset tyokalut eivat voi tuottaa.' },
    { title: 'Hyodynna kieliriippuvaisia tunnisteita lokalisoituihin tuotelinjoihin', description: 'Kuvanimietunnisteet muuttuvat kielen mukaan — "Kissa" (fi), "Cat" (en), "Katze" (de), "Chat" (fr). Identtiset teemat tuottavat aidosti erilaisia tuotteita. Luo erilliset listaukset per kieli.' },
    { title: 'Sisallyta vastausavaimet jokaiseen listauksen esikatseluun', description: 'Automaattisesti generoitu vastausavain punaisilla ympaera-, nelio-, rasti- ja laskemismerkinnoeilla on vahvin erottautumistekijasi.' },
    { title: 'Kayta laske-tehtyvatyyppiaematematiikkaan laheisiin tuotteisiin', description: 'Laske-tehtyvatyyppi muuttaa hakuharjoituksen laskemis- ja havainnointiharjoitukseksi. Kayttajat hakevat ja kirjoittavat kokonaismaeaeraen. Sijoitu seka "visuaalinen haku" - etta "laskeminen" -kategorioihin.' },
    { title: 'Kayta harmaasavya budjettiystaevaellisiin tuotteisiin', description: 'Vaihda harmaasavy musteystaevaellisiin tehtaviin. Luo kaksoismuotoisia paketteja seka vari- etta harmaasavyversioilla.' },
  ],

  faq: [
    { question: 'Onko ilmainen kokeilu saatavilla?', answer: 'Kylla. Kaikki ominaisuudet — molemmat aktiviteettitilat, kaikki nelja tehtyvatyyppia, kielikohtaiset aakkostot AO:lla, saadettava ruudukontiheys, automaattisesti generoitu vastausavain, lokalisoidut kuvatunnisteet 11 kielella, kaikki 104 teemallista kuvakokoelmaa, mukautettu kuvien lataus, tausta- ja kehysteemat, nimi/paivamaara-kentat, harmaasavykytkin ja kaikki latausmuodot. Ei rekisteroitymista, ei luottokorttia. Vesileima latauksissa.' },
    { question: 'Mitka ovat kaksi aktiviteettitilaa?', answer: 'Piilotetut esineet (oletus) — hajautetut kuvat saadettavassa ruudukossa (5-10 x 5-10) jopa 4 kohdeesineella ja tehtyvatyypeilla. Kirjainhaku — aktivoi kielikohtaisen aakkoston (suomi 29 kirjainta AO:lla) ja generoi kohtauksia valitulla kirjaimella alkavilla kuvilla.' },
    { question: 'Mitka ovat nelja tehtyvatyyppia?', answer: 'Ymparoi (piirra ympyra), nelio (aseta nelio ympaerille), rasti (vedae yli), laske (kirjoita maara). Sekoita kaikki nelja yhdelle tehtavalle — ymparoi kaikki kissat, rasti kaikki koirat, laske kaikki linnut, nelio kaikki kalat.' },
    { question: 'Miten Kirjainhaku toimii eri kielilla?', answer: 'Kielikohtainen aakkosto per kieli. Suomi A-O (29 kirjainta mukaan lukien A ja O). Saksa A-Z + AOU (29). Espanja A-Z + N (27). Ruotsi/suomi A-O (29). Ruudukko renderoidaan 7 sarakkeessa. Kissa alkaa "K":lla suomeksi mutta "C":lla englanniksi.' },
    { question: 'Miten lokalisoidut kuvanimietunnisteet toimivat?', answer: 'Kuvanimietunnisteet renderoidaan kuvasanastojaarjestelman kautta. "Kissa" (fi), "Cat" (en), "Katze" (de), "Chat" (fr), "Gato" (es). Kirjainhaussa alkukirjaimet muuttuvat.' },
    { question: 'Onko etsi ja laske kieliriippuvainen?', answer: 'Kylla. Toisin kuin taysin visuaaliset tyokalut, Etsi ja laske renderoi kuvanimietunnisteet valitulla kielella suoraan tehtavalle, ja Kirjainhaku kayttaa kielikohtaisia alkukirjaimia ja aakkostoja. Kielen vaihtaminen tuottaa aidosti erilaisia tehtavia.' },
    { question: 'Mitka sivukoot ja vientimuodot ovat saatavilla?', answer: 'Oletus (800x1000), Letter, A4, Nelio (1200x1200) ja mukautetut mitat. JPEG tai PDF 300 DPI:lla. Vaihda harmaasavy. Nelja tiedostoa per generointi.' },
    { question: 'Voinko myyda hakutehtavia kaupallisesti?', answer: 'Kylla. Kaupallisella lisenssilla taydet oikeudet myydaeadigitaalisina latauksina Etsyssa, painettuina tyokirjoina Amazon KDP:ssa, resursseina Gumroadissa tai minka tahansa muun kanavan kautta.' },
    { question: 'Mika on palautuskaytantonne?', answer: 'Kokeile ennen ostoa ilmaisella kokeilujaksollamme — kaikki ominaisuudet kaytettavissa. Koska ilmainen kokeilu antaa tayden paasynae, emme tarjoa palautuksia.' },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'etsi-ja-laske-tehtavat', anchorText: 'Etsi ja laske -aktiviteetit — Taydet tuotetiedot' },
    { pageType: 'tool', slug: 'piilotetut-esineet-tyokalu', anchorText: 'Piilotetut esineet -generaattori' },
    { pageType: 'tool', slug: 'kuvaristikko-tyokalu', anchorText: 'Ristikkopalapeli-generaattori' },
    { pageType: 'tool', slug: 'aarteenetsinta-tyokalu', anchorText: 'Aarteenetsintae-generaattori' },
    { pageType: 'tool', slug: 'sanahaku-tyokalu', anchorText: 'Sanahaku-generaattori' },
    { pageType: 'tool', slug: 'kuvareitti-tyokalu', anchorText: 'Kuvareitti-labyrintti-generaattori' },
    { pageType: 'tool', slug: 'yhdistamistehtava-tyokalu', anchorText: 'Yhdistamistehtava-generaattori' },
    { pageType: 'tool', slug: 'varitys-tyokalu', anchorText: 'Varitys-generaattori' },
    {
      pageType: 'app',
      slug: 'etsi-ja-laske-tyoarkit',
      anchorText: 'Ready to sell what you make? Get the commercial license.',
    },
  ],

  visuals: {
    heroImages: { primary: '/samples/finnish/find%20and%20count/minä-näen-1.webp', primaryAlt: 'Etsi ja laske -hakutehtava hajautetuilla kuvilla saadettavassa ruudukossa sinisella otsikkoreunuksella ja neljalla tehtyvatyypin ohjeella ymparoi nelio rasti ja laske' },
    sampleGallery: [
      { src: '/samples/finnish/find%20and%20count/minä-näen-1.webp', alt: 'Etsi ja laske -hakutehtava vaaka-tilassa leveanmmalla ruudukkoasettelulla ja hajautetuilla teemakuvilla harhautusesineiden joukossa', caption: 'Piilotetut esineet -tila — klassinen haku ymparoi-, nelio-, rasti- ja laske-tehtyvatyypeilla hajautetulla kuvaruudukolla' },
      { src: '/samples/finnish/find%20and%20count/minä-näen-2.webp', alt: 'Etsi ja laske -vastausavain punaisilla ympaera-, nelio- ja rastimerkinnoeilla oikeiden kohdekuvien paella ja maeaeraenayttoeilla', caption: 'Automaattisesti generoitu vastausavain — punaiset merkinnaeaemerkitsevat ympaerat, nelioeae, rastit ja laskemissummat kullekin kohdekohteelle' },
    ],
    youtubeId: '0cOPi7eajLs',
    videoTitle: 'Nain teet Etsi ja laske -hakutehtavia Piilotetut esineet -tilalla, Kirjainhalla ja neljalla tehtyvatyypilla — vaiheittainen opas',
  },
};

export default content;
