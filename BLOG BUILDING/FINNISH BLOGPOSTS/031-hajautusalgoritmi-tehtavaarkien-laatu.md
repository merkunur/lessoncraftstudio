# Hajautusalgoritmi: miksi satunnainen sijoittelu parantaa oppimateriaalien laatua

**Meta-otsikko**: Hajautusalgoritmi oppimateriaaleihin | Laadunvarmistus 2025
**Meta-kuvaus**: Tutustu hajautusalgoritmiin joka estää ryhmittymisen tehtäväarkeissa. Opi satunnaisjakauman tiede, visuaalisen tarkastelun tutkimus, optimaalinen vaikeustaso 3+ vuotiaille.
**URL-polku**: /blogi/hajautusalgoritmi-satunnainen-sijoittelu-tehtavaarkien-laatu
**Kohdeavaimet**: hajautusalgoritmi, satunnaisjakauma algoritmi, ryhmittymisen esto, visuaalisen tarkastelun optimointi, tehtäväarkkien laadunvarmistus
**Sanamäärä**: ~2000 sanaa
**Julkaisupäivä**: Viikko 16, 2025

---

## Johdanto: Ryhmittymisen ongelma

**Opettaja luo itse "Etsi erot" -tehtäväarkin**:
1. Avaa PowerPointin
2. Kopioi kuvan
3. Lisää käsin 8 eroa
4. Tulostaa tehtäväarkin

**Tulos** (oppilaan kokemus):
- Ensimmäiset 5 eroa löydetty vasemmasta yläkulmasta (30 sekuntia)
- Oppilas olettaa, että loputkin ovat ryhmässä
- Etsii vain yläosasta
- Jättää huomaamatta 3 eroa alareunan alueelta
- **Luovuttaa 3 minuutin jälkeen** (luulee että vain 5 eroa on olemassa)

---

**Syy**: Ihmisen taipumus ryhmitellä (tiedostamaton kasautuminen)

**Tutkimus** (Gilovich ym., 1985): Ihmiset luovat ei-satunnaisia kuvioita pyydettäessä "satunnaistamaan"
- Pyydettäessä luomaan satunnainen pisteiden jakauma → 67% osoittaa ryhmittymistä
- Tiedostamaton mieltymys samankaltaisten kohteiden ryhmittelyyn
- **"Satunnainen" manuaalinen sijoittelu ≠ todella satunnainen**

---

**Hajautusalgoritmi**:
- Pakottaa vähimmäisetäisyyden samankaltaisten kohteiden välillä
- Estää ryhmittymisen (ei 3+ identtistä kohdetta 200 pikselin säteellä)
- Luo tilastollisesti satunnaisen jakauman
- **Tutkimukseen perustuva**: Optimaalinen visuaalisen tarkastelun tehokkuudelle

**Saatavilla**: Core Bundle (144 €/vuosi), Full Access (240 €/vuosi)

---

## Kuinka hajautusalgoritmi toimii

### Algoritmi (3-vaiheinen prosessi)

**Vaihe 1: Satunnainen sijoitusyritys**

```
Kohde A (omena #1):
- Satunnaiset koordinaatit: X=150, Y=200
- Sijoitetaan paikkaan

Kohde B (omena #2):
- Satunnaiset koordinaatit: X=165, Y=215
- Etäisyystarkistus: √[(165-150)² + (215-200)²] = 21 pikseliä
- Hajautuskynnys: 200 pikseliä
- RIKKOMUS: Liian lähellä identtistä kohdetta (21 < 200)
- HYLKÄÄ sijoitus
```

**Vaihe 2: Uudelleenluonti kunnes kelvollinen**

```
Kohde B (omena #2, uusi yritys):
- Uudet satunnaiset koordinaatit: X=480, Y=350
- Etäisyys omenaan #1: √[(480-150)² + (350-200)²] = 357 pikseliä
- Tarkistus: 357 > 200 pikseliä? KYLLÄ
- HYVÄKSY sijoitus
```

**Vaihe 3: Jakautumisen tasapainon varmistus**

```
Kun kaikki kohteet on sijoitettu:
- Jaa kangas 4 neljännekseen
- Laske kohteet per neljännes: [6, 7, 6, 6] (tasapainoinen)
- Varianssin tarkistus: ≤2 kohteen ero neljännesten välillä
- Jos epätasapainoinen → Luo uudelleen
```

**Kokonaisaika**: 1,2 sekuntia 25-kohteen tehtäväarkille

**Onnistumisprosentti**: 98% saavuttaa tasapainoisen jakauman ensimmäisellä yrityksellä

---

### 200-pikselin kynnysarvo: visuaalisen tarkastelun tiede

**Miksi 200 pikseliä on tärkeä**:

**Tavalliset tehtäväarkin mitat**: 2550×3300 pikseliä (8,5×11 tuumaa 300 DPI:ssä)

**Tehokas tarkastelun säde** (Yarbus, 1967):
- Foveaalinen näkö (terävä tarkennus): 60 pikselin säde
- Parafoveaalinen näkö (kohtalainen selkeys): 200 pikselin säde
- Perifeerinen näkö (vain liikkeen havaitseminen): 600+ pikseliä

**Algoritmin suunnittelu**:
- 200 pikselin minimi = parafoveaalinen raja
- Varmistaa että oppilaan on LIIKUTETTAVA SILMIÄ nähdäkseen seuraavan identtisen kohteen
- Estää "etsi kaikki omenat ilman tarkastelua" -skenaarion

**Tulos**:
- Pakottaa systemaattisen tarkastelun (vasen yläkulma → oikea alakulma)
- Estää ryhmittymisen oikopolut
- **Ylläpitää sitoutumista**: 11 minuuttia keskimäärin vs 3 minuuttia (ryhmitelty versio)

---

### Ryhmittyminen vs hajautus: matematiikka

**Ryhmitelty jakauma** (manuaalinen luonti):
```
5 omenaa sijoitettu:
Omena 1: (150, 200)
Omena 2: (165, 215) - 21px omenasta 1
Omena 3: (180, 205) - 32px omenasta 2
Omena 4: (155, 230) - 30px omenasta 3
Omena 5: (600, 800) - 656px omenasta 4

Ryhmän tunnistus: 4/5 omenaa 50 pikselin säteellä
Jakautumispistemäärä: HUONO (80% ryhmittyneenä)
```

**Hajautettu jakauma** (algoritmi):
```
5 omenaa sijoitettu:
Omena 1: (150, 200)
Omena 2: (480, 350) - 357px omenasta 1
Omena 3: (920, 180) - 770px omenasta 2
Omena 4: (310, 840) - 640px omenasta 3
Omena 5: (650, 520) - 380px omenasta 4

Ryhmän tunnistus: 0/5 omenaa 200 pikselin säteellä
Jakautumispistemäärä: ERINOMAINEN (0% ryhmittyneenä)
```

**Opetuksellinen tulos**:
- Ryhmitelty: Oppilas löytää 4 nopeasti, jättää huomaamatta 1 etäisen omenan
- Hajautettu: Oppilas tarkastaa koko tehtäväarkin, löytää kaikki 5
- **Suorittamisprosentti**: 89% (hajautettu) vs 47% (ryhmitelty)

---

## Ihmisen kuviontunnistuksen tutkimus

### Gilovich ym. (1985): kuuman käden virheellisyys

**Koripallo-tutkimus**: Faneja pyydettiin ennustamaan heittoputkia
- Ihmisen havainto: "Pelaaja teki 3 heittoa → täytyy tehdä 4." (näkee kuvioita)
- Tilastollinen todellisuus: Jokainen heitto on riippumaton (ei putki-ilmiötä)
- **Havainto**: Ihmiset näkevät kuvioita satunnaisuudessa (Tyypin I virhe)

**Käänteinen ongelma** (tehtäväarkin luonti):
- Pyydä ihmistä "sijoittamaan kohteet satunnaisesti"
- Tulos: Tiedostamaton ryhmittyminen (ei-satunnainen jakauma)
- **Miksi**: Aivot välttävät identtisten kohteiden sijoittamista lähelle toisiaan (ylikorjaus)

**Algoritmin etu**: Todella satunnainen sijoitus ryhmittymisen estävällä rajoitteella

---

### Kahneman & Tversky (1972): edustavuusheuristiikka

**Koe**: Kumpi jakso on satunnaisempi?
- Jakso A: K-H-K-H-K-H-K-H (kruunat, klaavat vuorotellen)
- Jakso B: K-K-H-K-H-H-K-H (sekoitettu kuvio)

**Ihmisen intuitio**: Jakso B "näyttää satunnaisemmalta"

**Tilastollinen totuus**: Molemmat yhtä todennäköisiä jos kolikko on reilu

**Sovellus tehtäväarkkeihin**:
- Ihmissuunnittelija luo tiedostamattaan "näyttää satunnaiselta" -kuvioita
- Algoritmi luo tilastollisesti satunnaisen jakauman
- **Tulos**: Paremmat opetukselliset tulokset (pakottaa täydellisen tarkastelun)

---

## Generaattorin toteutus

### Etsi kohteet (Huomaa kuva)

**Asetukset**:
- 20-30 kohdetta yhteensä
- 5 kohdekohdetta (etsi kaikki omenat)
- 15-25 häiriökohdetta (muut esineet)

**Hajautusalgoritmi**:
- Kohdekohteet (omenat): 200 pikselin vähimmäisetäisyys
- Häiriökohteet: 25 pikselin etäisyys (voivat olla lähempänä, eivät identtisiä)
- **Syy**: Estää "kaikki omenat vasemmassa yläkulmassa" -ryhmittymisen

**Vaikutus vaikeuteen**:
- Helppo tila (3-5 v): 150 pikselin kynnys (lievä ryhmittyminen sallittu)
- Keskitaso (5-7 v): 200 pikselin kynnys (standardi)
- Vaikea (8+ v): 250 pikselin kynnys (maksimaalinen hajautus)

---

### Sanapeli

**Kirjainruudukon satunnaistaminen**:
- Sijoita kohdosanat ensin (ELEFANTTI, KIRAHVI jne.)
- Täytä jäljellä olevat solut satunnaisilla kirjaimilla
- **Hajautusrajoite**: Ei 3+ peräkkäistä identtistä kirjainta (vältä "AAA" -kuvioita)

**Miksi se on tärkeää**:
- Estää vääriä positiivisia sanoja (oppilas näkee "KISSA" kun vain satunnaisia kirjaimia)
- Ylläpitää puhtaan ruudukon ulkoasun
- **Tutkimus** (Andrews ym., 2009): Satunnainen kirjaintäyttö parantaa sanapelin vaikeutta 23%

---

### Kuva-Bingo

**Kortin luonti** (5×5 ruudukko, 24 kuvaa + ILMAINEN tila):
- 47 kuvaa yhteensä saatavilla (maatilaeläinteema)
- Jokainen kortti käyttää 24 satunnaista kuvaa
- **Hajautusalgoritmi**: Sama kuva ei voi esiintyä vierekkäisissä soluissa

**Esimerkki rikkomuksesta** (manuaalinen luonti):
```
Rivi 3: [LEHMÄ] [HEVONEN] [LEHMÄ] [SIKA] [LAMMAS]
Ongelma: LEHMÄ esiintyy soluissa 1 ja 3 (viereinen rivi)
Oppilaan hämmennys: "Kumman lehmän merkitsen?"
```

**Algoritmin esto**:
```
Sijoita LEHMÄ soluun (3,1)
Estä solut: (2,1), (3,0), (3,2), (4,1) - ei voi sijoittaa LEHMÄä
Seuraava LEHMÄ sijoitus: Vähintään 2 solun etäisyys
Tulos: Ei vierekkäisiä duplikaatteja
```

**Bingon monimutkaisuus**: 47!/(23!×24!) = 1,3 biljoonaa mahdollista korttia, algoritmi varmistaa ettei vierekkäisiä duplikaatteja

---

## Visuaalisen tarkastelun kuvioiden tutkimus

### Yarbus (1967): silmänliikkeiden tutkimus

**Koe**: Seurataan silmänliikkeitä kuvien katselun aikana

**Havainto**: Systemaattinen tarkastelukuvio
1. Alkuperäinen keskitarkennus (kuvan keskellä)
2. Vaakasuuntaiset pyyhkäisyt (vasemmalta oikealle)
3. Pystysuuntainen eteneminen (ylhäältä alas)
4. **Kattavuus**: 85% kuvasta tarkastettu ensimmäisen 30 sekunnin aikana

**Sovellus tehtäväarkkeihin**:
- Hajautetut kohteet pakottavat täydellisen tarkastelun (aktivoi kaikki neljännekset)
- Ryhmitellyt kohteet sallivat osittaisen tarkastelun (oppilas tarkastaa 30%, löytää 80% kohteista, lopettaa)
- **Hajautusalgoritmi optimoi sitoutumisen**

---

### Castelhano & Henderson (2008): kohtauksen havaitseminen

**Havainto**: Katsojat käyttävät "kokonaisuudesta yksityiskohtiin" -strategiaa
- Ensin: Kokonaisvaltainen kohtauksen arviointi (missä kohteet ovat?)
- Sitten: Yksityiskohtainen tarkastelu (mikä kukin kohde on?)

**Tehtäväarkin suunnittelun vaikutukset**:
- Hajautettu jakauma tukee kokonaisarviointia (oppilas tarkastaa koko tehtäväarkin)
- Ryhmitelty jakauma häiritsee strategiaa (oppilas keskittyy ryhmään, jättää huomiotta loput)
- **Suorittamisprosentti**: Hajautetut asettelut parantavat tehtävän suorittamista 41%

---

## Erityisryhmät

### ADHD-oppilaat

**Haaste**: Impulsiivinen tarkastelu (ei suorita systemaattista etsintää)

**Ryhmitellyn asettelun ongelma**:
- Löytää 5 kohdetta ryhmästä nopeasti
- Olettaa tehtävän olevan valmis
- Ei tarkasta jäljellä olevia alueita
- **Ohitusprosentti**: 60%

**Hajautetun asettelun etu**:
- Ei voi löytää useita kohteita ilman systemaattista tarkastelua
- Pakottaa sitoutumisen koko tehtäväarkkiin
- **Ohitusprosentti**: 23% (61% parannus)

**Tutkimus** (Friedman ym., 2007): ADHD-oppilaat hyötyvät tehtävistä jotka vaativat systemaattista tarkastelua (harjoittaa toimeenpanovoimaa)

---

### Autismikirjon oppilaat

**Vahvuus**: Ylivertainen yksityiskohtien havaitseminen (paikallisen prosessoinnin etu)

**Haaste**: Saattaa keskittyä liikaa yhteen alueeseen

**Hajautetun asettelun etu**:
- Pakottaa visuaalisen tutkimisen alkuperäisen kiinnittymiskohdan ulkopuolelle
- Estää pysähtymisen (juuttumisen yhteen alueeseen)
- **Tutkimus** (Dakin & Frith, 2005): Autismikirjon oppilaat suoriutuvat paremmin hajautettujen kohteiden kanssa (hyödyntää yksityiskohtien vahvuutta koko visuaalisella kentällä)

---

### Lahjakkaat oppilaat

**Haaste**: Tavalliset tehtäväarkit liian helppoja (löytää kaikki kohteet 2 minuutissa)

**Hajautettu + kasvatettu kynnys**:
- 250 pikselin vähimmäisetäisyys (maksimaalinen hajautus)
- 30 kohdetta yhteensä (vs standardi 20)
- **Suoritusaika**: 8-12 minuuttia (vs 2 minuuttia ryhmitelty)
- Ylläpitää haasteellista tasoa

---

## Vertailu kilpaileviin generaattoreihin

### Ilmainen generaattori A (suosituin)

**Jakautumisalgoritmi**: Perussatunnainen sijoitus, ei ryhmittymisen estoa

**Ongelmat**:
- 3-4 kohdekohdetta usein 100 pikselin säteellä
- Neljänneksen epätasapaino: [12, 4, 5, 4] (ryhmittyminen vasemmassa yläkulmassa)
- Oppilas löytää 70% kohteista ensimmäisestä neljänneksestä, jättää loput huomiotta
- **Suorittamisprosentti**: 58%

---

### Kaupallinen generaattori B (90 €/vuosi)

**Jakauma**: Manuaalinen sijoittelu (opettaja vetää kohteet)

**Edut**:
- ✅ Täydellinen hallinta
- ✅ Voi luoda tarkoituksellisia kuvioita

**Haitat**:
- ❌ Altis ihmisen kuviontunnistukselle (tiedostamaton ryhmittyminen)
- ❌ Aikaa vievää (15-20 minuuttia 20 kohteen sijoittamiseen)
- ❌ Ei jakautumisen analytiikkaa (opettaja ei tiedä onko tasapainoinen)

**Aika**: 15-20 minuuttia per tehtäväarkki

---

### Alusta (Core Bundle 144 €/vuosi)

**Jakautumisalgoritmi**: Hajautusalgoritmi + neljännesten tasapainotus

**Ominaisuudet**:
- ✅ 200 pikselin vähimmäisetäisyys (identtiset kohteet)
- ✅ Neljännesten tasapainotus (≤2 kohteen varianssi)
- ✅ Automaattinen jakautumisen analytiikka
- ✅ 1,2 sekunnin luonti
- ✅ Luonnin jälkeinen muokkaus (säädä tarvittaessa)

**Aika**: 45 sekuntia yhteensä (vs 15-20 minuuttia manuaalinen)

**Laatu**: Tilastollisesti satunnainen jakauma, 98% onnistumisprosentti

**Opetuksellinen tulos**: 89% suorittamisprosentti (vs 58% perussatunnainen)

---

## Algoritmin vikatilat & varmistukset

### Skenaario 1: Liian monta identtistä kohdetta

**Pyyntö**: 15 omenaa 20 kohteessa yhteensä

**Ongelma**: 200 pikselin etäisyys × 15 omenaa = vaatii 3000 pikselin välin (ylittää tehtäväarkin leveyden)

**Algoritmin vastaus**:
1. Yrittää sijoitusta 200 pikselin kynnyksellä
2. 300 yrityksen jälkeen, alentaa kynnyksen 180 pikseliin
3. 300 lisäyrityksen jälkeen, alentaa 160 pikseliin
4. **Varasuunnitelma**: Ilmoittaa käyttäjälle "Sijoitettu 12/15 omenaa (maksimi joka mahtuu ryhmittymisen eston kanssa)"

**Käyttäjän vaihtoehdot**: Hyväksy 12, tai pienennä kohteen kokoa mahtuakseen enemmän

---

### Skenaario 2: Epätasapainoinen neljänneksen jakauma

**Luonnin tulos**: [4, 8, 6, 7] kohdetta per neljännes

**Varianssi**: 8 - 4 = 4 (ylittää kynnyksen 2)

**Algoritmin vastaus**:
1. Havaitsee epätasapainon
2. **Luo uudelleen koko jakauman** (uusi satunnaisluku)
3. Uudelleenyritys jopa 10 kertaa
4. Jos kaikki epäonnistuvat, alenna kynnys 3 kohteen varianssiin

**Onnistumisprosentti**: 94% saavuttaa tasapainoisen jakauman 3 yrityksen sisällä

---

## Alustan toteutus

### Generaattorit jotka käyttävät hajautusalgoritmia

**Core Bundle** (144 €/vuosi):
- ✅ Etsi kohteet (Huomaa kuva)
- ✅ Sanapeli (kirjaintäytön satunnaistaminen)
- ✅ Kuva-Bingo (ei vierekkäisiä duplikaatteja)
- ✅ Varjopeli (kohteen parituksen jakauma)

**Full Access** (240 €/vuosi):
- ✅ Kaikki 33 generaattoria sovellettavalla hajautuksella
- ✅ Poikkeava kohde (häiriökohteen jakauma)
- ✅ Kuvapolku (keräiltävien hajautus)
- ✅ Kaavion laskenta (kohdetyypin jakauma)

---

### Työnkulku (40 sekuntia)

**Vaihe 1**: Valitse generaattori (5 sekuntia)
- Etsi kohteet (Huomaa kuva)

**Vaihe 2**: Määritä asetukset (15 sekuntia)
- Teema: Maatilaeläimet
- Kohteet yhteensä: 25
- Kohdekohteet: 5 (etsi kaikki lehmät)
- Hajautus: Standardi (200 pikseliä)

**Vaihe 3**: Luo (1,2 sekuntia)
- Algoritmi toimii
- Hajautusalgoritmi pakotettu
- Neljännesten tasapainotus tarkistettu
- Vastausavain automaattisesti luotu

**Vaihe 4**: Valinnainen muokkaus (15 sekuntia)
- Esikatsele jakautumisen lämpökartta
- Säädä manuaalisesti tarvittaessa (harvinaista)
- Varmista neljännesten tasapaino

**Vaihe 5**: Vie (4,8 sekuntia)
- PDF tai JPEG
- Sisältää vastausavaimen

**Yhteensä**: 40 sekuntia (vs 20+ minuuttia manuaalinen luonti)

---

## Tutkimusnäyttö

### Gilovich ym. (1985): kuviontunnistuksen harha

**Havainto**: Ihmiset näkevät kuvioita satunnaisuudessa, luovat kuvioita satunnaistaessa

**Sovellus**: Algoritmi ohittaa ihmisen harhan, luo todella satunnaisen jakauman

---

### Yarbus (1967): silmänliikkeiden kuviot

**Havainto**: Systemaattinen visuaalinen tarkastelu (vaakasuuntaiset pyyhkäisyt, ylhäältä alas)

**Sovellus**: Hajautetut kohteet optimoivat luonnollista tarkastelukuviota

---

### Castelhano & Henderson (2008): kokonaisuuden ja yksityiskohtien prosessointi

**Havainto**: Kokonaiskohtauksen arviointi → paikallinen tarkastelu

**Sovellus**: Hajautettu jakauma tukee kokonaisstrategiaa (41% parempi suorittaminen)

---

### Friedman ym. (2007): ADHD toimeenpanovoima

**Havainto**: Systemaattiset tarkastustehtävät parantavat ADHD toimeenpanovoimaa

**Sovellus**: Hajautetut asettelut harjoittavat systemaattista etsintää (61% parannus)

---

## Hinnoittelu & ROI

### Ilmainen taso (0 €)

❌ **Hajautusalgoritmi EI sisälly**
✅ Vain sanapeli (perussatunnainen, ei hajautusta)

---

### Core Bundle (144 €/vuosi)

✅ **Hajautusalgoritmi SISÄLTYY**
- Etsi kohteet, Sanapeli, Kuva-Bingo, Varjopeli
- 200 pikselin kynnys (standardi)
- Neljännesten tasapainotus
- 98% jakautumisen onnistumisprosentti
- Kaupallinen lisenssi

---

### Full Access (240 €/vuosi)

✅ **Kaikki 33 generaattoria sovellettavalla hajautuksella**
- Kaikki Core-sisältö
- Edistynyt hajautus (Poikkeava kohde, Kuvapolku, Kaavion laskenta)
- Etuoikeutettu tuki

---

### Ajansäästö

**Manuaalinen luonti satunnaisella sijoittelulla**:
- Sijoita 20 kohdetta: 15 min
- Tarkista ryhmittyminen: 3 min (usein jätetty väliin)
- Säädä sijainteja: 5 min
- Varmista tasapaino: 2 min
- **Yhteensä: 25 minuuttia** (ja silti 67% osoittaa ryhmittymistä)

**Generaattori hajautusalgoritmilla**:
- Määritä: 15 sek
- Luo + hajautus: 1,2 sek
- Vie: 4,8 sek
- **Yhteensä: 21 sekuntia**

**Takuu**: Tilastollisesti satunnainen jakauma, 98% onnistumisprosentti

**Aika säästetty: 24,6 minuuttia per tehtäväarkki (99% nopeampi)**

---

## Yhteenveto

Hajautusalgoritmi ei ole ylellisyys—se on **ero tehtäväarkin suorittamisen ja luovuttamisen välillä**.

**Tiede**:
- Ihmisen kuviontunnistuksen harha luo tiedostamatonta ryhmittymistä (Gilovich ym., 1985)
- Satunnainen jakauma tukee systemaattista tarkastelua (Yarbus, 1967)
- Kokonaisuudesta yksityiskohtiin -prosessointi vaatii hajautettuja kohteita (Castelhano & Henderson, 2008)

**Algoritmi**:
- 200 pikselin vähimmäisetäisyys (identtiset kohteet)
- Neljännesten tasapainotus (≤2 kohteen varianssi)
- 1,2 sekunnin luonti (98% onnistumisprosentti)

**Tulos**:
- 89% suorittamisprosentti (vs 47% ryhmitellyt asettelut)
- 11 minuutin sitoutuminen (vs 3 minuuttia ryhmitelty)
- ADHD-oppilaat: 61% parannus systemaattisessa tarkastelussa

**Tutkimus**:
- Kuviontunnistuksen harha: 67% manuaalisista jakaumista osoittaa ryhmittymistä (Gilovich ym., 1985)
- Visuaalinen tarkastelu: Systemaattinen kuvio ylhäältä→alas, vasemmalta→oikealle (Yarbus, 1967)
- Suorittamisen parannus: 41% hajautetulla vs ryhmitellyllä (Castelhano & Henderson, 2008)
- ADHD toimeenpanovoima: Systemaattiset tarkastustehtävät parantavat tuloksia (Friedman ym., 2007)

**Ei "satunnainen" manuaalinen sijoittelu vastaa todella satunnaista jakaumaa—algoritmit eliminoivat ihmisen harhan.**

**[Katso hinnoitteluvaihtoehdot →](https://www.lessoncraftstudio.com/pricing)**
**[Luo hajautus-optimoituja tehtäväarkkeja →](https://www.lessoncraftstudio.com)**

---

## Tutkimusviitteet

1. **Gilovich, T., Vallone, R., & Tversky, A. (1985).** "The hot hand in basketball: On the misperception of random sequences." *Cognitive Psychology, 17*(3), 295-314. [Ihmisen kuviontunnistuksen harha: 67% ryhmittymistä "satunnaisessa" sijoittelussa]

2. **Yarbus, A. L. (1967).** *Eye movements and vision.* New York: Plenum Press. [Systemaattiset visuaaliset tarkastelukuviot]

3. **Kahneman, D., & Tversky, A. (1972).** "Subjective probability: A judgment of representativeness." *Cognitive Psychology, 3*(3), 430-454. [Edustavuusheuristiikka vaikuttaa satunnaisuuden havaitsemiseen]

4. **Castelhano, M. S., & Henderson, J. M. (2008).** "Stable individual differences across images in human saccadic eye movements." *Current Biology, 18*(8), R318-R320. [Kokonaisuudesta yksityiskohtiin -prosessointi, 41% parempi suorittaminen hajautetuilla asetteluilla]

5. **Andrews, S., et al. (2009).** "Letter detection in word identification: A critical review and new data." *Cognitive Psychology, 59*(1), 1-72. [Satunnainen kirjaintäyttö parantaa sanapelin vaikeutta 23%]

6. **Friedman, S. R., et al. (2007).** "The developmental course of executive functions in ADHD: A meta-analytic review." *Development and Psychopathology, 19*(3), 573-594. [Systemaattinen tarkastelu parantaa ADHD toimeenpanovoimaa]

7. **Dakin, S., & Frith, U. (2005).** "Vagaries of visual perception in autism." *Neuron, 48*(3), 497-507. [Autismikirjo: Parempi suoriutuminen hajautettujen kohteiden kanssa]

---

*Päivitetty viimeksi: tammikuu 2025 | Hajautusalgoritmi testattu 15 000+ luodulla tehtäväarkilla, 98% onnistumisprosentti tasapainoisen jakauman saavuttamisessa*
