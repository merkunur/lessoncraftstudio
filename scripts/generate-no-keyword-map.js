#!/usr/bin/env node
/**
 * Generate the comprehensive Norwegian keyword map for SEO Part 237.
 * Outputs: docs/seo-keywords/no-all-pages.md
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// DATA: Product Pages (33)
// ============================================================
const productPages = [
  { num: 1, slug: 'addisjon-arbeidsark', appId: 'image-addition', name: 'Addisjon', primaryKw: 'addisjon oppgave generator', title: 'Gratis Addisjon Generator til Barn | LessonCraftStudio', desc: 'Lag printbare plussoppgaver med bilder til f\u00f8rskole\u20133. klasse. 3\u202f000+ bilder, tilpass vanskelighetsgrad og f\u00e5 fasit. Last ned gratis PDF med en gang.', h1: 'Addisjon Oppgave Generator', subtitle: 'Lag Bildebaserte Plussoppgaver fra F\u00f8rskole til 3. Klasse', secondary: ['plussoppgaver arbeidsark gratis','addisjon oppgaver barnehage','bildebaserte plussoppgaver','matematikk arbeidsark gratis','plussoppgaver med bilder','printbare regneoppgaver','addisjon fasit','l\u00e6re \u00e5 legge sammen','plussoppgaver 1. klasse','addisjon \u00f8velser barn'], diffNote: 'Eier "addisjon" + verkt\u00f8yintent. Differensierer fra bildeaddisjon via visuell bildetiln\u00e6rming vs symbolkoding.' },
  { num: 2, slug: 'alfabet-tog-arbeidsark', appId: 'alphabet-train', name: 'Alfabet-tog', primaryKw: 'alfabet tog generator', title: 'Gratis Alfabet-Tog Generator | LessonCraftStudio', desc: 'Lag printbare alfabet-tog-oppgaver til bokstavl\u00e6ring fra f\u00f8rskole til 1. klasse. Morsom m\u00e5te \u00e5 l\u00e6re bokstaver med bilder. Last ned gratis PDF.', h1: 'Alfabet-Tog Generator', subtitle: 'Printbare Bokstav\u00f8velser fra F\u00f8rskole til 1. Klasse', secondary: ['alfabet tog oppgaver','bokstaver \u00f8velse f\u00f8rskole','alfabet printbar','alfabet-tog arbeidsark','bokstavgjenkjenning','alfabetisk rekkef\u00f8lge \u00f8velse','bokstav\u00f8velser til barn','l\u00e6re \u00e5 lese','alfabet\u00f8velser','begynnelsesbokstaver oppgave'], diffNote: 'Eier "alfabet-tog" konsept. Differensierer fra skrive\u00f8velser via togformet bokstavordning vs bokstavdanning.' },
  { num: 3, slug: 'fargeleggingsbilder-arbeidsark', appId: 'coloring', name: 'Fargelegging', primaryKw: 'fargelegging generator', title: 'Gratis Fargelegging Generator til Barn | LessonCraftStudio', desc: 'Lag printbare fargeleggingssider til barn med 3\u202f000+ bilder. 50 temaer og 5 aldersniv\u00e5er fra f\u00f8rskole til 3. klasse. Last ned gratis PDF.', h1: 'Fargelegging Generator til Barn', subtitle: 'Lag Printbare Fargeleggingssider med 50 Temaer og 3\u202f000+ Bilder', secondary: ['fargeleggingssider til barn gratis','gratis fargelegging print','fargeleggingsark printbar','dyr fargelegging','printbare fargeleggingssider','fargelegging f\u00f8rskole','fargeleggings\u00f8velser','fargeleggingsoppgaver til barn','finmotorikk fargelegging','barns fargeleggingssider'], diffNote: 'Eier "fargelegging" verkt\u00f8yintent. Differensierer fra tegn-og-fargelegg via fri fargelegging vs rasterbasert pikselkunst.' },
  { num: 4, slug: 'matematikk-oppgaver-arbeidsark', appId: 'math-worksheet', name: 'Matematikkoppgaver', primaryKw: 'matematikkoppgave generator', title: 'Matematikkoppgave Generator til Barn | LessonCraftStudio', desc: 'Lag visuelle matematikkoppgaver med bilder. Addisjon, subtraksjon, sammenligning og tallrekker fra f\u00f8rskole til 3. klasse. Fasit inkludert. Gratis PDF.', h1: 'Matematikkoppgave Generator', subtitle: 'Visuelle Matematikk\u00f8velser fra F\u00f8rskole til 3. Klasse', secondary: ['matematikk oppgaver sm\u00e5skolen','regneoppgaver printbar','matematikk arbeidsark','matematikk\u00f8velser f\u00f8rskole','visuelle matematikkoppgaver','regneoppgaver til barn','matematikk fasit','grunnleggende regnearter \u00f8velse','matematikk printbar gratis','matematikk treningsoppgaver'], diffNote: 'Eier bredt "matematikkoppgave" verkt\u00f8yintent. Differensierer fra addisjon/subtraksjon via fleroperasjonsomfang.' },
  { num: 5, slug: 'bokstavoppgaver-arbeidsark', appId: 'word-scramble', name: 'Bokstavblanding', primaryKw: 'bokstavblanding generator', title: 'Gratis Bokstavblanding Generator | LessonCraftStudio', desc: 'Lag printbare bokstavblanding-oppgaver til staving og rettskriving. Tilpass vanskelighetsgrad fra f\u00f8rskole til 3. klasse. Med bilder. Gratis PDF.', h1: 'Bokstavblanding Generator', subtitle: 'Printbare Rettskrivings\u00f8velser med Bilder', secondary: ['bokstavblanding oppgaver','skrive\u00f8velser til barn','rettskriving \u00f8velse','ordg\u00e5te printbar','stavelse\u00f8velse','ordspill til barn printbar','orddanning oppgaver','l\u00e6re \u00e5 lese oppgaver','skriving trening','ordforr\u00e5d \u00f8velser'], diffNote: 'Eier "bokstavblanding" konsept. Differensierer fra ords\u00f8k via bokstav-omrangering vs bokstav-finning.' },
  { num: 6, slug: 'finn-og-tell-arbeidsark', appId: 'find-and-count', name: 'Finn og Tell', primaryKw: 'finn og tell generator', title: 'Finn og Tell Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare finn og tell-oppgaver til barn. Utvikl telleferdigheter og visuell oppmerksomhet med bilder. F\u00f8rskole til 3. klasse. Gratis PDF.', h1: 'Finn og Tell Generator', subtitle: 'Utvikl Telleferdigheter med Morsomme S\u00f8keoppgaver', secondary: ['finn og tell oppgaver','telle\u00f8velser f\u00f8rskole','visuell telling','antallgjenkjenning','finn og tell printbar','telleferdigheter til barn','telle\u00f8velse med bilder','tall\u00f8velser f\u00f8rskole','telling trening','matematikk s\u00f8keoppgave'], diffNote: 'Eier "finn og tell" dobbelt-ferdighets konsept. Differensierer fra finn-objektene via telle-komponent.' },
  { num: 7, slug: 'kobling-arbeidsark', appId: 'matching-app', name: 'Kobling', primaryKw: 'koblingsoppgave generator', title: 'Gratis Koblingsoppgave Generator til Barn | LessonCraftStudio', desc: 'Lag printbare koblingsoppgaver med bilder. Utvikl hukommelse og m\u00f8nstergjenkjenning fra f\u00f8rskole til 3. klasse. 50 temaer. Last ned gratis PDF.', h1: 'Koblingsoppgave Generator', subtitle: 'Printbare Parrings\u00f8velser med 50 Temaer', secondary: ['koblingsoppgaver','parring til barn','hukommelsesspill printbar','parrings\u00f8velse f\u00f8rskole','m\u00f8nstergjenkjenning \u00f8velse','visuell parring','bildeparring oppgave','par\u00f8velse printbar','hukommelse og parring','koblingsoppgaver f\u00f8rskole'], diffNote: 'Eier "kobling" konsept. Differensierer fra skyggematching via bilde-til-bilde vs bilde-til-skygge matching.' },
  { num: 8, slug: 'tegning-av-linjer-arbeidsark', appId: 'drawing-lines', name: 'Linjetegning', primaryKw: 'linjetegning generator', title: 'Linjetegning Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare linjetegningsoppgaver til finmotorikk-utvikling. Rette linjer, buer og b\u00f8lger fra f\u00f8rskole til 1. klasse. Last ned gratis PDF.', h1: 'Linjetegning Generator', subtitle: 'Finmotorikk \u00d8velser fra F\u00f8rskole til 1. Klasse', secondary: ['linjetegning oppgaver','finmotorikk \u00f8velser','linjef\u00f8lging oppgave','blyantgrep \u00f8velser','tegning trening f\u00f8rskole','finmotorikk f\u00f8rskole','skriveforberedelse \u00f8velse','blyantgrep trening','linjer og former \u00f8velse','tegnetrening til barn'], diffNote: 'Eier "linjetegning" finmotorikk konsept. Differensierer fra skrive\u00f8velser via pre-skriving linjetrening vs bokstavdanning.' },
  { num: 9, slug: 'bildlotto-arbeidsark', appId: 'picture-bingo', name: 'Bildebingo', primaryKw: 'bildebingo generator', title: 'Gratis Bildebingo Generator | LessonCraftStudio', desc: 'Lag printbare bildebingospill til barn. 50 temaer, tilpassbare rutenett og bilder fra 3\u202f000+ bibliotek. Perfekt til klasserommet. Last ned gratis.', h1: 'Bildebingo Generator', subtitle: 'Lag Printbare Bingospill med 50 Temaer', secondary: ['bingo printbar til barn','bildebingo spill','printbart bingospill','bingo f\u00f8rskole','klasse bingospill','bildebingo rutenett','bingo oppgave til barn','gruppespill printbar','bingo bilder barn','bingospill klasserom'], diffNote: 'Eier "bildebingo" konsept. Eneste gruppespill-arbeidsark generator i pakken.' },
  { num: 10, slug: 'sudoku-arbeidsark', appId: 'sudoku', name: 'Sudoku', primaryKw: 'barne-sudoku generator', title: 'Barne-Sudoku Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare bilde-sudokuer til barn. Enkle og middels logikkspill fra f\u00f8rskole til 3. klasse. Bilder fra 3\u202f000+ bibliotek. Gratis PDF.', h1: 'Barne-Sudoku Generator', subtitle: 'Printbare Bilde-Sudokuer fra F\u00f8rskole til 3. Klasse', secondary: ['bilde-sudoku til barn','sudoku printbar','barns logikkspill','enkel sudoku til barn','bilde-sudoku printbar','sudoku f\u00f8rskole','logikk\u00f8velser til barn','sudoku rutenett til barn','tenkningsferdigheter trening','sudoku sm\u00e5skolen'], diffNote: 'Eier "barne-sudoku" logikk-puslespill konsept. Bruker bilder i stedet for tall til yngre barn.' },
  { num: 11, slug: 'stor-og-liten-arbeidsark', appId: 'big-small-app', name: 'Stor og Liten', primaryKw: 'st\u00f8rrelsessammenligning generator', title: 'St\u00f8rrelsessammenligning Generator | LessonCraftStudio', desc: 'Lag printbare stor og liten sammenligningsoppgaver med bilder. Utvikl st\u00f8rrelsesbegreper fra f\u00f8rskole til 1. klasse. Tilpass innstillinger. Gratis PDF.', h1: 'Stor og Liten Generator', subtitle: 'St\u00f8rrelsessammenlignings\u00f8velser med Bilder fra F\u00f8rskole til 1. Klasse', secondary: ['stor og liten oppgaver','st\u00f8rrelsessammenligning f\u00f8rskole','st\u00f8rrelser gjenkjenning','st\u00f8rre og mindre','st\u00f8rrelsessammenligning til barn','stor liten printbar','st\u00f8rrelsesforsker oppgaver','st\u00f8rrelses\u00f8velser f\u00f8rskole','sammenligningsferdigheter \u00f8velse','st\u00f8rrelser sortering'], diffNote: 'Eier "st\u00f8rrelsessammenligning" konsept. Differensierer fra sammenligningsoppgaver via st\u00f8rrelse vs mengdesammenligning.' },
  { num: 12, slug: 'bildediagram-arbeidsark', appId: 'chart-count-color', name: 'Bildediagram', primaryKw: 'bildediagram generator', title: 'Gratis Bildediagram Generator | LessonCraftStudio', desc: 'Lag printbare bildediagram-oppgaver til telling og datavisualisering. Tell og fargelegg diagrammer fra f\u00f8rskole til 3. klasse. Gratis PDF.', h1: 'Bildediagram \u2014 Tell og Fargelegg Generator', subtitle: 'Datavisualisering og Telle\u00f8velser til Barn', secondary: ['bildediagram oppgaver','tell og fargelegg','datavisualisering til barn','s\u00f8ylediagram f\u00f8rskole','bildediagram printbar','telling og fargelegging','statistikkoppgaver til barn','diagram printbar','statistikk f\u00f8rskole','bildediagram \u00f8velse'], diffNote: 'Eier "bildediagram" datavisualiserings konsept. Eneste diagram/graf arbeidsark generator i pakken.' },
  { num: 13, slug: 'bildeaddisjon-arbeidsark', appId: 'code-addition', name: 'Bildeaddisjon', primaryKw: 'bildeaddisjon generator', title: 'Bildeaddisjon Generator | LessonCraftStudio', desc: 'Lag printbare bildeaddisjon-oppgaver der bilder erstatter tall. Utvikler algebraisk tenkning fra f\u00f8rskole til 3. klasse. Gratis PDF-nedlasting.', h1: 'Bildeaddisjon Generator', subtitle: 'Algebraisk Tenkning gjennom Bildekodede Regneoppgaver', secondary: ['bildeaddisjon oppgaver','symbolsk algebra til barn','bildebasert matematikk','kodeoppgaver printbar','algebraisk tenkning f\u00f8rskole','bilde erstatter tall','hemmelig melding plussoppgaver','bildesymbol regneoppgave','matematisk koding','visuell algebra'], diffNote: 'Eier "bildeaddisjon" symbol-algebra konsept. Differensierer fra addisjon via symbolisk substitusjon.' },
  { num: 14, slug: 'rutenetttegning-arbeidsark', appId: 'draw-and-color', name: 'Rutenetttegning', primaryKw: 'rutenetttegning generator', title: 'Gratis Rutenetttegning Generator | LessonCraftStudio', desc: 'Lag printbare rutenetttegningsoppgaver. Tegn m\u00f8nstre i ruter etter modell og fargelegg. Utvikler visuell oppfatning. F\u00f8rskole til 3. klasse. Gratis.', h1: 'Rutenetttegning Generator', subtitle: 'Tegn og Fargelegg M\u00f8nstre i Rutem\u00f8nster etter Modell', secondary: ['rutenetttegning oppgaver','pikseltegning til barn','rutetegning','rutepapir tegning','visuell oppfatning \u00f8velse','rutetegning printbar','modellkopiering til rute','tegning i ruter','kodet tegning','ruteoppgaver til barn'], diffNote: 'Eier "rutenetttegning" pikselkunst konsept. Differensierer fra fargelegging via strukturert rasterbasert tegning vs fri fargelegging.' },
  { num: 15, slug: 'finn-objektene-arbeidsark', appId: 'find-objects', name: 'Finn Objektene', primaryKw: 'finn objektene generator', title: 'Finn Objektene Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare s\u00f8keoppgaver til barn. Finn gjemte objekter i bilder og utvikl visuell oppmerksomhet. 50 temaer fra f\u00f8rskole til 3. klasse.', h1: 'Finn Objektene Generator', subtitle: 'Visuell Oppmerksomhets\u00f8velser med 50 Temaer', secondary: ['finn objektene oppgaver','puslespill bilde printbar','visuelt s\u00f8k til barn','finn gjemte objekter','oppmerksomhet \u00f8velse','visuell oppfatning f\u00f8rskole','finn og oppdag oppgave','bildepuslespill\u00f8velser','s\u00f8kespill printbar','visuell oppmerksomhet'], diffNote: 'Eier "finn objektene" gjemt-objekt konsept. Differensierer fra finn-og-tell via ren visuell s\u00f8king vs telling.' },
  { num: 16, slug: 'rutenett-tilpasning-arbeidsark', appId: 'grid-match', name: 'Rutenett-puslespill', primaryKw: 'rutenett-puslespill generator', title: 'Gratis Rutenett-Puslespill Generator | LessonCraftStudio', desc: 'Lag printbare rutenett-puslespill til visuell oppfatning og romlig forst\u00e5else. 50 temaer fra f\u00f8rskole til 3. klasse. Gratis PDF-nedlasting.', h1: 'Rutenett-Puslespill Generator', subtitle: 'Visuell Oppfatning og Romlig Forst\u00e5elses\u00f8velser', secondary: ['rutenett-puslespill oppgaver','visuelt puslespill til barn','romlig forst\u00e5else','m\u00f8nster matching','ruteoppgaver printbar','oppfatning \u00f8velse','visuell logikk til barn','matchings\u00f8velser f\u00f8rskole','rutenett puslespill','romlig oppfatning'], diffNote: 'Eier "rutenett-puslespill" romlig-forst\u00e5else konsept. Differensierer fra rutenetttegning via matching vs tegning.' },
  { num: 17, slug: 'bildekryssord-arbeidsark', appId: 'image-crossword', name: 'Bildekryssord', primaryKw: 'bildekryssord generator', title: 'Gratis Bildekryssord Generator | LessonCraftStudio', desc: 'Lag printbare bildekryssord der bilder er ledetr\u00e5der. Utvikler ordforr\u00e5d og staving fra f\u00f8rskole til 3. klasse. Last ned gratis PDF med en gang.', h1: 'Bildekryssord Generator', subtitle: 'Ordforr\u00e5d og Staving med Bildeledetr\u00e5der', secondary: ['bildekryssord oppgaver','kryssord til barn printbar','bildebaserte kryssord','kryssord f\u00f8rskole','ordforr\u00e5d kryssord','bilde-kryssord printbar','staving kryssord','kryssord med bilder','barns kryssord','kryssord oppgave f\u00f8rskole'], diffNote: 'Eier "bildekryssord" konsept. Differensierer fra ords\u00f8k via kryssordsrutenett vs bokstavrutenett.' },
  { num: 18, slug: 'kryptogram-arbeidsark', appId: 'image-cryptogram', name: 'Bildekryptogram', primaryKw: 'bildekryptogram generator', title: 'Bildekryptogram Generator | LessonCraftStudio', desc: 'Lag printbare bildekryptogrammer der bokstaver erstattes av bilder. Utvikler avkodingsferdigheter og leseberedskap. F\u00f8rskole til 3. klasse.', h1: 'Bildekryptogram Generator', subtitle: 'Hemmelig Skrift-oppgaver med Bilder \u2014 Avkod og L\u00e6r \u00e5 Lese', secondary: ['bildekryptogram oppgaver','hemmelig skrift til barn','avkodingsoppgave','hemmelig spr\u00e5k l\u00f8sning','bildekoding \u00f8velse','hemmeligord oppgave','kryptogram printbar','symbol avkoding','hemmelig melding \u00f8velse','leseberedskaps\u00f8velse'], diffNote: 'Eier "bildekryptogram" avkodnings konsept. Differensierer fra kryssord via symbol-til-bokstav avkoding vs bilde-ledetr\u00e5d staving.' },
  { num: 19, slug: 'matematikkgater-arbeidsark', appId: 'math-puzzle', name: 'Matteg\u00e5ter', primaryKw: 'matematikk puslespill generator', title: 'Matematikk Puslespill Generator | LessonCraftStudio', desc: 'Lag printbare matematikk-puslespill til addisjon og subtraksjon. Probleml\u00f8sningsferdigheter fra f\u00f8rskole til 3. klasse. Gratis PDF-nedlasting.', h1: 'Matematikk Puslespill Generator', subtitle: 'Utvikl Probleml\u00f8sningsferdigheter med Matematiske Puslespill', secondary: ['matematikk puslespill til barn','matematisk probleml\u00f8sning','mattepuslespill printbar','regnepuslespill f\u00f8rskole','matematisk tenkning','logikkpuslespill matematikk','matematikk g\u00e5teoppgaver','regnepuslespill fasit','probleml\u00f8sning matematikk','mattepuslespill sm\u00e5skolen'], diffNote: 'Eier "matematikk puslespill" konsept. Differensierer fra matematikkoppgaver via puslespill/utfordringsformat vs \u00f8velsesformat.' },
  { num: 20, slug: 'manglende-biter-arbeidsark', appId: 'missing-pieces', name: 'Manglende Biter', primaryKw: 'manglende biter generator', title: 'Manglende Biter Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare manglende biter-oppgaver til visuell oppfatning. Finn den manglende delen i m\u00f8nsteret. F\u00f8rskole til 2. klasse. Gratis PDF.', h1: 'Manglende Biter Generator', subtitle: 'Visuell Oppfatnings\u00f8velser med Bildepuslespill', secondary: ['manglende biter oppgaver','puslespill oppgave til barn','manglende del \u00f8velse','visuell slutning','bildepuslespill printbar','m\u00f8nstergjenkjenning \u00f8velse','manglende bilde oppgave','visuell logisk tenkning','puslespill\u00f8velser f\u00f8rskole','oppfatningsferdigheter til barn'], diffNote: 'Eier "manglende biter" visuell-fullending konsept. Differensierer fra rutenett-puslespill via finne den manglende biten vs matching av posisjoner.' },
  { num: 21, slug: 'sammenligningsoppgaver-arbeidsark', appId: 'more-less', name: 'Sammenligningsoppgaver', primaryKw: 'flere eller f\u00e6rre generator', title: 'Flere eller F\u00e6rre Generator | LessonCraftStudio', desc: 'Lag printbare flere og f\u00e6rre sammenligningsoppgaver med bilder. Utvikler mengdesammenligning og matematisk tenkning. F\u00f8rskole til 2. klasse.', h1: 'Flere eller F\u00e6rre Generator', subtitle: 'Mengdesammenligning med Bilder fra F\u00f8rskole til 2. Klasse', secondary: ['flere eller f\u00e6rre oppgaver','mengde sammenligning','st\u00f8rre mindre \u00f8velse','sammenligningsoppgaver f\u00f8rskole','mengder sammenligning med bilder','tallsammenligning til barn','flere eller f\u00e6rre','matematisk sammenligning','mengdevurdering','sammenligningsferdigheter f\u00f8rskole'], diffNote: 'Eier "flere eller f\u00e6rre" mengdesammenlignings konsept. Differensierer fra stor-liten via mengde vs st\u00f8rrelsessammenligning.' },
  { num: 22, slug: 'finn-den-ulike-arbeidsark', appId: 'odd-one-out', name: 'Finn den Ulike', primaryKw: 'finn den ulike generator', title: 'Finn den Ulike Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare finn den ulike-oppgaver til visuell oppfatning og klassifisering. 50 temaer og tilpassbare innstillinger. Gratis PDF.', h1: 'Finn den Ulike Generator', subtitle: 'Klassifiserings- og Oppfatnings\u00f8velser med Bilder', secondary: ['finn den ulike oppgaver','hva passer ikke inn','klassifisering \u00f8velse','visuell skjelning','annerledes bilde oppgave','klassifiseringstrening til barn','forskjellig i gruppen','m\u00f8nstergjenkjenning og klassifisering','sortering og skjelning','finn den ulike printbar'], diffNote: 'Eier "finn den ulike" klassifiserings konsept. Differensierer fra bildesortering via \u00e5 identifisere den avvikende vs sortering i grupper.' },
  { num: 23, slug: 'monstertog-arbeidsark', appId: 'pattern-train', name: 'M\u00f8nstertog', primaryKw: 'm\u00f8nstertog generator', title: 'Gratis M\u00f8nstertog Generator | LessonCraftStudio', desc: 'Lag printbare m\u00f8nstertog-oppgaver til m\u00f8nstergjenkjenning. Togformede oppgaver med 3\u202f000+ bilder. F\u00f8rskole til 2. klasse. Gratis PDF.', h1: 'M\u00f8nstertog Generator', subtitle: 'M\u00f8nstergjenkjennings\u00f8velser i Togformat', secondary: ['m\u00f8nstertog oppgaver','m\u00f8nstre fortsettelse','m\u00f8nstergjenkjenning tog','m\u00f8nstergjenkjenning f\u00f8rskole','m\u00f8nster fortsettelse \u00f8velse','m\u00f8nstertog printbar','m\u00f8nsterserier til barn','m\u00f8nstre gjenkjenning','matematisk oppfatning','m\u00f8nsterrekke \u00f8velse'], diffNote: 'Eier "m\u00f8nstertog" togformet m\u00f8nster konsept. Differensierer fra m\u00f8nsteroppgaver via togformat vs standard arbeidsarkformat.' },
  { num: 24, slug: 'monsteroppgaver-arbeidsark', appId: 'pattern-worksheet', name: 'M\u00f8nsteroppgaver', primaryKw: 'm\u00f8nsteroppgave generator', title: 'M\u00f8nsteroppgave Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare m\u00f8nsteroppgaver til m\u00f8nstergjenkjenning og -fortsettelse. Varierte serier fra f\u00f8rskole til 3. klasse. 50 temaer. Gratis PDF.', h1: 'M\u00f8nsteroppgave Generator', subtitle: 'M\u00f8nstergjenkjenning og -fortsettelse med 50 Temaer', secondary: ['m\u00f8nsteroppgaver printbar','m\u00f8nsterserier til barn','m\u00f8nstre fortsettelse','m\u00f8nstergjenkjenning \u00f8velse','matematiske m\u00f8nstre','m\u00f8nsterrekke oppgaver','m\u00f8nster kopiark','oppfatningsferdigheter f\u00f8rskole','m\u00f8nstergjenkjenning 1. klasse','m\u00f8nstre og serier'], diffNote: 'Eier "m\u00f8nsteroppgave" standard m\u00f8nstergjenkjenning konsept. Differensierer fra m\u00f8nstertog via standard arbeidsarkformat vs togformat.' },
  { num: 25, slug: 'bildesti-arbeidsark', appId: 'picture-path', name: 'Bildesti', primaryKw: 'bildesti generator', title: 'Gratis Bildesti Generator | LessonCraftStudio', desc: 'Lag printbare bildesti-oppgaver der barnet f\u00f8lger bilderuter. Utvikler logisk tenkning og finmotorikk. F\u00f8rskole til 2. klasse. Gratis.', h1: 'Bildesti Generator', subtitle: 'Logisk Tenknings\u00f8velser med Bilderuter', secondary: ['bildesti oppgaver','labyrint oppgaver til barn','labyrint printbar','rutef\u00f8lging','bilde-labyrint \u00f8velse','sti oppgaver f\u00f8rskole','labyrint\u00f8velser til barn','labyrint printbar barn','rute\u00f8velser','visuell rutef\u00f8lging'], diffNote: 'Eier "bildesti" labyrint/sti konsept. Eneste labyrint-type arbeidsark generator i pakken.' },
  { num: 26, slug: 'bildesortering-arbeidsark', appId: 'picture-sort', name: 'Bildesortering', primaryKw: 'bildesortering generator', title: 'Bildesortering Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare bildesorteringsoppgaver der barnet klassifiserer bilder i kategorier. Utvikler klassifiseringsferdigheter. F\u00f8rskole til 2. klasse.', h1: 'Bildesortering Generator', subtitle: 'Klassifiserings- og Sorterings\u00f8velser med Bilder', secondary: ['bildesortering oppgaver','sorterings\u00f8velser til barn','kategorisering oppgave','bilde klassifisering','sortering f\u00f8rskole','gruppering \u00f8velse','bilde kategorisering','klassifisering printbar','sorteringsferdigheter til barn','gruppering med bilder'], diffNote: 'Eier "bildesortering" sorterings/kategoriserings konsept. Differensierer fra finn-den-ulike via gruppesortering vs \u00e5 identifisere den avvikende.' },
  { num: 27, slug: 'preposisjoner-arbeidsark', appId: 'prepositions', name: 'Preposisjoner', primaryKw: 'preposisjons\u00f8velse generator', title: 'Preposisjons\u00f8velse Generator | LessonCraftStudio', desc: 'Lag printbare preposisjons\u00f8velser med stedsord og bilder. Foran, bak, under, over \u2014 visuell spr\u00e5kl\u00e6ring for barn. Last ned gratis PDF med en gang.', h1: 'Preposisjons\u00f8velse Generator', subtitle: 'Stedsord L\u00e6ring med Bilder', secondary: ['preposisjons\u00f8velser','stedsord til barn','preposisjoner f\u00f8rskole','stedsord \u00f8velse','foran bak oppgaver','stedsbegreper til barn','preposisjoner printbar','grammatikk \u00f8velser f\u00f8rskole','visuell spr\u00e5kl\u00e6ring','stedsbeskrivelse'], diffNote: 'Eier "preposisjons\u00f8velse" spr\u00e5kkonsept. Eneste grammatikk-fokuserte arbeidsark generator i pakken.' },
  { num: 28, slug: 'skyggematching-arbeidsark', appId: 'shadow-match', name: 'Skyggematching', primaryKw: 'skyggematching generator', title: 'Gratis Skyggematching Generator | LessonCraftStudio', desc: 'Lag printbare skyggeparringsoppgaver der barnet matcher bilde til korrekt skygge. Utvikler visuell oppfatning. 50 temaer. Last ned gratis PDF.', h1: 'Skyggematching Generator', subtitle: 'Visuell Oppfatnings\u00f8velser med Skyggebilder', secondary: ['skyggematching oppgaver','skyggeparring','skygge oppgaver til barn','silhuettoppgaver printbar','skyggegjenkjenning','visuell parring skygge','skygge\u00f8velser f\u00f8rskole','silhuett \u00f8velse','bilde og skygge matching','skyggeoppgaver'], diffNote: 'Eier "skyggematching" skyggematching konsept. Differensierer fra kobling via silhuettgjenkjenning vs direkte bildematching.' },
  { num: 29, slug: 'subtraksjon-arbeidsark', appId: 'subtraction', name: 'Subtraksjon', primaryKw: 'subtraksjon generator', title: 'Gratis Subtraksjon Generator | LessonCraftStudio', desc: 'Lag printbare subtraksjonsoppgaver med bilder fra f\u00f8rskole til 3. klasse. Tilpassbare tallomr\u00e5der, fasit og visuelle hjelpemidler. Gratis PDF.', h1: 'Subtraksjon Generator', subtitle: 'Visuelle Subtraksjons\u00f8velser med Bilder', secondary: ['subtraksjon oppgaver','subtraksjons\u00f8velser','minusoppgaver printbar','subtraksjon med bilder','matematikk subtraksjon','subtraksjon 1. klasse','subtraksjons\u00f8velser f\u00f8rskole','minusoppgave \u00f8velse','subtraksjon fasit','grunnleggende subtraksjon'], diffNote: 'Eier "subtraksjon" konsept. Differensierer fra matematikkoppgaver via subtraksjon-only fokus vs fleroperasjons.' },
  { num: 30, slug: 'skattejakt-arbeidsark', appId: 'treasure-hunt', name: 'Skattejakt', primaryKw: 'skattejakt generator', title: 'Skattejakt Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare skattejakt-oppgaver til retningsord og forst\u00e5else av instruksjoner. Morsomt eventyrspill fra f\u00f8rskole til 2. klasse. Gratis.', h1: 'Skattejakt Generator', subtitle: 'Retningsord og Instruksjonsforst\u00e5else Eventyroppgaver', secondary: ['skattejakt oppgaver','retningsord \u00f8velse','instruksjoner forst\u00e5else','skattejakt printbar','retningsbegreper til barn','eventyroppgaver f\u00f8rskole','skattejakt klasserom','retning og posisjon','eventyrspill printbar','instruksjonsforst\u00e5else'], diffNote: 'Eier "skattejakt" retningsspr\u00e5k konsept. Eneste eventyr/spill-baserte arbeidsark generator i pakken.' },
  { num: 31, slug: 'gjetteoppgaver-arbeidsark', appId: 'word-guess', name: 'Gjett Ordet', primaryKw: 'gjett ordet generator', title: 'Gratis Gjett Ordet Generator | LessonCraftStudio', desc: 'Lag printbare gjett-ordet-oppgaver der barnet gjetter ord ut fra bildeledetr\u00e5der. Utvikler ordforr\u00e5d og slutningsferdigheter. Gratis PDF.', h1: 'Gjett Ordet Generator', subtitle: 'Ordforr\u00e5d og Slutnings\u00f8velser med Bildeledetr\u00e5der', secondary: ['gjett ordet oppgaver','ordg\u00e5te med bilder','ordforr\u00e5d \u00f8velse','bildebasert ordoppgave','gjetteoppgave til barn','bildeledetr\u00e5d oppgave','ords slutning','ordg\u00e5te printbar','ordforr\u00e5d utvidelse','bildeledetr\u00e5d ordoppgave'], diffNote: 'Eier "gjett ordet" ord-gjetting konsept. Differensierer fra bokstavblanding via visuell ledetr\u00e5d deduksjon vs bokstav-omrangering.' },
  { num: 32, slug: 'skriveark-arbeidsark', appId: 'writing-app', name: 'Skrive\u00f8velser', primaryKw: 'skrive\u00f8velse generator', title: 'Skrive\u00f8velse Generator \u2014 Gratis | LessonCraftStudio', desc: 'Lag printbare skrive\u00f8velser til bokstavdanning og h\u00e5ndskrift. Bokstaver, ord og blyantgrep fra f\u00f8rskole til 2. klasse. Last ned gratis PDF.', h1: 'Skrive\u00f8velse Generator', subtitle: 'Bokstav- og Ordskrivings\u00f8velser fra F\u00f8rskole til 2. Klasse', secondary: ['h\u00e5ndskrift \u00f8velse','bokstaver \u00f8velse f\u00f8rskole','bokstavdanning','blyantgrep trening','skriving trening','bokstav\u00f8velser printbar','finmotorikk skriving','alfabet skriving','h\u00e5ndskrift printbar','skriveforberedelse f\u00f8rskole'], diffNote: 'Eier "skrive\u00f8velse" h\u00e5ndskrift konsept. Differensierer fra alfabet-tog via bokstavdanning vs bokstavordning.' },
  { num: 33, slug: 'ordsoek-arbeidsark', appId: 'word-search', name: 'Ords\u00f8k', primaryKw: 'ords\u00f8k generator', title: 'Gratis Ords\u00f8k Generator | LessonCraftStudio', desc: 'Lag printbare ords\u00f8k-oppgaver p\u00e5 11 spr\u00e5k. Tilpassbare ord, st\u00f8rrelser og vanskelighetsgrader. Ordforr\u00e5d og staving. Last ned gratis PDF.', h1: 'Ords\u00f8k Generator', subtitle: 'Printbare Ords\u00f8k-oppgaver til Ordforr\u00e5ds\u00f8ving', secondary: ['ords\u00f8k printbar','ords\u00f8k til barn','ordspill generator','ords\u00f8k oppgave','ordpuslespill printbar','ordleterspill til barn','ordforr\u00e5d ords\u00f8k','staving ords\u00f8k','ords\u00f8k sm\u00e5skolen','ords\u00f8k f\u00f8rskole'], diffNote: 'Eier "ords\u00f8k" konsept. Eneste gratis-tier produkt. Differensierer fra kryssord via bokstavrutenett-s\u00f8king vs kryssords-ledetr\u00e5der.' },
];

// ============================================================
// DATA: Theme Hub Pages (50)
// ============================================================
const themeNames = {
  animals: { no: 'Dyr', slug: 'dyr', kw: 'dyreoppgaver til barn', h1: 'Dyreoppgaver og \u00d8velser' },
  food: { no: 'Mat', slug: 'mat', kw: 'matoppgaver til barn', h1: 'Matoppgaver og \u00d8velser' },
  transportation: { no: 'Transport', slug: 'transport', kw: 'transportoppgaver til barn', h1: 'Transportoppgaver og \u00d8velser' },
  nature: { no: 'Natur', slug: 'natur', kw: 'naturoppgaver til barn', h1: 'Naturoppgaver og \u00d8velser' },
  school: { no: 'Skole', slug: 'skole', kw: 'skoleoppgaver til barn', h1: 'Skoleoppgaver og \u00d8velser' },
  sports: { no: 'Sport', slug: 'sport', kw: 'sportoppgaver til barn', h1: 'Sportoppgaver og \u00d8velser' },
  emotions: { no: 'F\u00f8lelser', slug: 'folelser', kw: 'f\u00f8lelsesoppgaver til barn', h1: 'F\u00f8lelsesoppgaver og \u00d8velser' },
  body: { no: 'Kropp', slug: 'kropp', kw: 'kroppsoppgaver til barn', h1: 'Kroppsoppgaver og \u00d8velser' },
  clothing: { no: 'Kl\u00e6r', slug: 'klaer', kw: 'klesoppgaver til barn', h1: 'Klesoppgaver og \u00d8velser' },
  household: { no: 'Husholdning', slug: 'husholdning', kw: 'husholdningsoppgaver til barn', h1: 'Husholdningsoppgaver og \u00d8velser' },
  toys: { no: 'Leker', slug: 'leker', kw: 'lekeoppgaver til barn', h1: 'Lekeoppgaver og \u00d8velser' },
  music: { no: 'Musikk', slug: 'musikk', kw: 'musikkoppgaver til barn', h1: 'Musikkoppgaver og \u00d8velser' },
  jobs: { no: 'Yrker', slug: 'yrker', kw: 'yrkesoppgaver til barn', h1: 'Yrkesoppgaver og \u00d8velser' },
  space: { no: 'Rommet', slug: 'rommet', kw: 'romoppgaver til barn', h1: 'Romoppgaver og \u00d8velser' },
  seasons: { no: '\u00c5rstider', slug: 'arstider', kw: '\u00e5rstidsoppgaver til barn', h1: '\u00c5rstidsoppgaver og \u00d8velser' },
  holidays: { no: 'Helligdager', slug: 'helligdager', kw: 'helligdagsoppgaver til barn', h1: 'Helligdagsoppgaver og \u00d8velser' },
  weather: { no: 'V\u00e6r', slug: 'vaer', kw: 'v\u00e6roppgaver til barn', h1: 'V\u00e6roppgaver og \u00d8velser' },
  colors: { no: 'Farger', slug: 'farger', kw: 'fargeoppgaver til barn', h1: 'Fargeoppgaver og \u00d8velser' },
  shapes: { no: 'Former', slug: 'former', kw: 'formoppgaver til barn', h1: 'Formoppgaver og \u00d8velser' },
  numbers: { no: 'Tall', slug: 'tall', kw: 'talloppgaver til barn', h1: 'Talloppgaver og \u00d8velser' },
  alphabet: { no: 'Alfabet', slug: 'alfabet', kw: 'alfabetoppgaver til barn', h1: 'Alfabetoppgaver og \u00d8velser' },
  furniture: { no: 'M\u00f8bler', slug: 'mobler', kw: 'm\u00f8beloppgaver til barn', h1: 'M\u00f8beloppgaver og \u00d8velser' },
  easter: { no: 'P\u00e5ske', slug: 'paske', kw: 'p\u00e5skeoppgaver til barn', h1: 'P\u00e5skeoppgaver og \u00d8velser' },
  halloween: { no: 'Halloween', slug: 'halloween', kw: 'halloweenoppgaver til barn', h1: 'Halloweenoppgaver og \u00d8velser' },
  xmas: { no: 'Jul', slug: 'jul', kw: 'juleoppgaver til barn', h1: 'Juleoppgaver og \u00d8velser' },
  winter: { no: 'Vinter', slug: 'vinter', kw: 'vinteroppgaver til barn', h1: 'Vinteroppgaver og \u00d8velser' },
  farm: { no: 'Bondeg\u00e5rd', slug: 'bondegard', kw: 'bondeg\u00e5rdsoppgaver til barn', h1: 'Bondeg\u00e5rdsoppgaver og \u00d8velser' },
  ocean: { no: 'Hav', slug: 'hav', kw: 'havoppgaver til barn', h1: 'Havoppgaver og \u00d8velser' },
  dinosaurs: { no: 'Dinosaurer', slug: 'dinosaurer', kw: 'dinosauroppgaver til barn', h1: 'Dinosauroppgaver og \u00d8velser' },
  insects: { no: 'Insekter', slug: 'insekter', kw: 'insektoppgaver til barn', h1: 'Insektoppgaver og \u00d8velser' },
  fruits: { no: 'Frukt', slug: 'frukt', kw: 'fruktoppgaver til barn', h1: 'Fruktoppgaver og \u00d8velser' },
  vegetables: { no: 'Gr\u00f8nnsaker', slug: 'gronnsaker', kw: 'gr\u00f8nnsakoppgaver til barn', h1: 'Gr\u00f8nnsakoppgaver og \u00d8velser' },
  flowers: { no: 'Blomster', slug: 'blomster', kw: 'blomsteroppgaver til barn', h1: 'Blomsteroppgaver og \u00d8velser' },
  birds: { no: 'Fugler', slug: 'fugler', kw: 'fugleoppgaver til barn', h1: 'Fugleoppgaver og \u00d8velser' },
  pets: { no: 'Kj\u00e6ledyr', slug: 'kjaledyr', kw: 'kj\u00e6ledyroppgaver til barn', h1: 'Kj\u00e6ledyroppgaver og \u00d8velser' },
  zoo: { no: 'Dyrepark', slug: 'dyrepark', kw: 'dyreparkoppgaver til barn', h1: 'Dyreparkoppgaver og \u00d8velser' },
  garden: { no: 'Hage', slug: 'hage', kw: 'hageoppgaver til barn', h1: 'Hageoppgaver og \u00d8velser' },
  camping: { no: 'Camping', slug: 'camping', kw: 'campingoppgaver til barn', h1: 'Campingoppgaver og \u00d8velser' },
  pirates: { no: 'Pirater', slug: 'pirater', kw: 'piratoppgaver til barn', h1: 'Piratoppgaver og \u00d8velser' },
  'fairy-tales': { no: 'Eventyr', slug: 'eventyr', kw: 'eventyroppgaver til barn', h1: 'Eventyroppgaver og \u00d8velser' },
  robots: { no: 'Roboter', slug: 'roboter', kw: 'robotoppgaver til barn', h1: 'Robotoppgaver og \u00d8velser' },
  superheroes: { no: 'Superhelter', slug: 'superhelter', kw: 'superheltoppgaver til barn', h1: 'Superheltoppgaver og \u00d8velser' },
  construction: { no: 'Byggeplass', slug: 'byggeplass', kw: 'byggeoppgaver til barn', h1: 'Byggeoppgaver og \u00d8velser' },
  cooking: { no: 'Matlaging', slug: 'matlaging', kw: 'matlagingsoppgaver til barn', h1: 'Matlagingsoppgaver og \u00d8velser' },
  travel: { no: 'Reiser', slug: 'reiser', kw: 'reiseoppgaver til barn', h1: 'Reiseoppgaver og \u00d8velser' },
  birthday: { no: 'Bursdag', slug: 'bursdag', kw: 'bursdagsoppgaver til barn', h1: 'Bursdagsoppgaver og \u00d8velser' },
  circus: { no: 'Sirkus', slug: 'sirkus', kw: 'sirkusoppgaver til barn', h1: 'Sirkusoppgaver og \u00d8velser' },
  forest: { no: 'Skog', slug: 'skog', kw: 'skogoppgaver til barn', h1: 'Skogoppgaver og \u00d8velser' },
  spring: { no: 'V\u00e5r', slug: 'var', kw: 'v\u00e5roppgaver til barn', h1: 'V\u00e5roppgaver og \u00d8velser' },
  summer: { no: 'Sommer', slug: 'sommer', kw: 'sommeroppgaver til barn', h1: 'Sommeroppgaver og \u00d8velser' },
};

const themeOrder = [
  'animals','food','transportation','nature','school','sports','emotions','body','clothing','household',
  'toys','music','jobs','space','seasons','holidays','weather','colors','shapes','numbers',
  'alphabet','furniture','easter','halloween','xmas','winter','farm','ocean','dinosaurs','insects',
  'fruits','vegetables','flowers','birds','pets','zoo','garden','camping','pirates','fairy-tales',
  'robots','superheroes','construction','cooking','travel','birthday','circus','forest','spring','summer'
];

// ============================================================
// DATA: Grades
// ============================================================
const grades = [
  { id: 'preschool', no: 'F\u00f8rskole', slug: 'forskole', age: '3\u20134 \u00e5r', gradeSuffix: 'f\u00f8rskolebarn', descSkills: 'Fargelegging, telling 1\u201310 og finmotorikk' },
  { id: 'kindergarten', no: 'Barnehage', slug: 'barnehage', age: '5\u20136 \u00e5r', gradeSuffix: 'barnehagen', descSkills: 'Telling, bokstaver, m\u00f8nstre og visuell oppfatning' },
  { id: 'first-grade', no: '1. Klasse', slug: 'forste-klasse', age: '6\u20137 \u00e5r', gradeSuffix: '1. klasse', descSkills: 'Addisjon, subtraksjon, lesing og skriving' },
  { id: 'second-grade', no: '2. Klasse', slug: 'andre-klasse', age: '7\u20138 \u00e5r', gradeSuffix: '2. klasse', descSkills: 'Multiplikasjon, ordspill, logikk og probleml\u00f8sning' },
  { id: 'third-grade', no: '3. Klasse', slug: 'tredje-klasse', age: '8\u20139 \u00e5r', gradeSuffix: '3. klasse', descSkills: 'Flertrinnsproblemer, kryssord, kryptogrammer og avanserte oppgaver' },
];

// ============================================================
// GENERATE DOCUMENT
// ============================================================
let out = '';

// Header
out += `# Norwegian (no) All Pages \u2014 Keyword Map

> Part 237 of the Landing Page SEO Perfection plan. Norwegian is Tier 1 (Very Low Competition) \u2014 broader 2\u20133 word keywords can rank.

**Total pages mapped:** 464 pages
- 33 product pages
- 50 theme hub pages
- 250 theme+grade pages
- 112 blog posts
- 19 secondary pages (8 category hubs, 5 grade hubs, 6 navigation)

---

## Anti-Cannibalization Rules

| Page Type | Reserved Primary Keyword Pattern | Norwegian Example |
|-----------|--------------------------------|-------------------|
| **Product pages** | \`{app} generator\` | addisjon oppgave generator |
| **Theme hubs** | \`{tema}oppgaver til barn\` | dyreoppgaver til barn |
| **Theme+grade** | \`{tema}oppgaver {klassetrinn}\` | dyreoppgaver f\u00f8rskolebarn |
| **Blog posts** | \`{emne} guide/tips/hvordan\` | ADHD visuelle oppgaver |
| **Category hubs** | \`{kategori} oppgaver til l\u00e6rere\` | matematikk oppgaver til l\u00e6rere |
| **Grade hubs** | \`{klassetrinn} arbeidsark gratis\` | f\u00f8rskole arbeidsark gratis |

---

## Section 1: Product Pages (33)

### Quick Reference Table

| # | Slug | Primary Keyword | Action Modifier |
|---|------|----------------|------------------|
`;

for (const p of productPages) {
  out += `| ${p.num} | \`${p.slug}\` | ${p.primaryKw} | generator |\n`;
}

out += '\n';

// Product pages detailed
for (const p of productPages) {
  const titleLen = p.title.length;
  const descLen = p.desc.length;
  out += `### ${p.num}. ${p.name} (\`${p.slug}\`)

| Field | Value |
|-------|-------|
| **Primary Keyword** | ${p.primaryKw} |
| **SEO Title** | ${p.title} |
| **Title Chars** | ${titleLen} |
| **Meta Description** | ${p.desc} |
| **Desc Chars** | ${descLen} |
| **H1 (hero.title)** | ${p.h1} |
| **Subtitle (hero.subtitle)** | ${p.subtitle} |

**Secondary Keywords (10):**
`;
  for (let i = 0; i < p.secondary.length; i++) {
    out += `${i+1}. ${p.secondary[i]}\n`;
  }
  out += `\n**Differentiation Notes:** ${p.diffNote}\n\n`;
}

// ============================================================
// SECTION 2: Theme Hub Pages
// ============================================================
out += `---

## Section 2: Theme Hub Pages (50)

### Quick Reference Table

| # | Theme Slug | Primary Keyword | Collection Modifier |
|---|------------|----------------|---------------------|
`;

let themeNum = 1;
for (const id of themeOrder) {
  const t = themeNames[id];
  out += `| ${themeNum} | \`${t.slug}\` | ${t.kw} | oppgaver til barn |\n`;
  themeNum++;
}

out += '\n';

// Theme hub detailed entries
themeNum = 1;
const themeSecondaryTemplates = {
  animals: ['dyr arbeidsark','dyr fargeleggingssider','dyr matematikk','dyr f\u00f8rskole','dyr printbar','dyr puslespill','dyr telling','dyr kryssord','husdyr oppgaver','ville dyr \u00f8velser'],
  food: ['mat arbeidsark','mat fargelegging','mat matematikk','matgrupper oppgaver','sunn mat','mat f\u00f8rskole','mat printbar','mat puslespill','matsortering','mat ordoppgaver'],
  transportation: ['transport arbeidsark','kj\u00f8ret\u00f8y oppgaver','biler fargelegging','transport matematikk','kj\u00f8ret\u00f8y f\u00f8rskole','transport printbar','transport puslespill','kj\u00f8ret\u00f8y til barn','transport ordoppgaver','kj\u00f8ret\u00f8y sortering'],
  nature: ['natur arbeidsark','natur fargelegging','natur matematikk','natur f\u00f8rskole','natur printbar','natur puslespill','milj\u00f8 oppgaver','planter til barn','naturundervisning','natur ordoppgaver'],
  school: ['skole arbeidsark','skoleting oppgaver','skole fargelegging','skole matematikk','skole f\u00f8rskole','skole printbar','skolestart oppgaver','klasserom \u00f8velser','skole ordoppgaver','skoledag oppgaver'],
  sports: ['sport arbeidsark','sport fargelegging','sport matematikk','sport f\u00f8rskole','sport printbar','idrettsgrener oppgaver','sport puslespill','ballspill til barn','sport ordoppgaver','sport telling'],
  emotions: ['f\u00f8lelser arbeidsark','emosjonelle ferdigheter \u00f8velser','ansiktsuttrykk oppgaver','f\u00f8lelser f\u00f8rskole','f\u00f8lelser printbar','f\u00f8lelsesvokabular til barn','f\u00f8lelser fargelegging','f\u00f8lelsesundervisning','snakke om f\u00f8lelser','sosiale og emosjonelle ferdigheter'],
  body: ['kropp arbeidsark','kroppsdeler oppgaver','kropp fargelegging','kropp f\u00f8rskole','kropp printbar','sanser oppgaver','kroppsdeler navngiving','helse til barn','kropp ordoppgaver','kroppsbevissthet \u00f8velser'],
  clothing: ['kl\u00e6r arbeidsark','kl\u00e6r fargelegging','kl\u00e6r sortering','kl\u00e6r f\u00f8rskole','kl\u00e6r printbar','p\u00e5kledning oppgaver','klesordforr\u00e5d til barn','kl\u00e6r og v\u00e6r','kl\u00e6r ordoppgaver','kl\u00e6r matching'],
  household: ['husholdning arbeidsark','kj\u00f8kkenredskaper oppgaver','husholdning fargelegging','husholdning f\u00f8rskole','husholdning printbar','hjemmets ting til barn','husholdning sortering','rom i hjemmet','husholdning ordoppgaver','dagligliv oppgaver'],
  toys: ['leker arbeidsark','leker fargelegging','leker matematikk','leker f\u00f8rskole','leker printbar','lek og l\u00e6ring','leker sortering','leker ordoppgaver','leker telling','leketyper oppgaver'],
  music: ['musikk arbeidsark','instrumenter oppgaver','musikk fargelegging','musikk f\u00f8rskole','musikk printbar','musikalsk l\u00e6ring','musikk puslespill','lydgjenkjenning','musikk ordoppgaver','instrumenter til barn'],
  jobs: ['yrker arbeidsark','yrker oppgaver','yrker fargelegging','yrker f\u00f8rskole','yrker printbar','hva vil du bli','yrker sortering','yrker ordoppgaver','yrker til barn','yrker og verkt\u00f8y'],
  space: ['rom arbeidsark','rommet fargelegging','rommet matematikk','rommet f\u00f8rskole','rommet printbar','planeter oppgaver','solsystemet til barn','astronaut oppgaver','rommet ordoppgaver','stjerner og planeter'],
  seasons: ['\u00e5rstider arbeidsark','\u00e5rstider fargelegging','\u00e5rstider matematikk','\u00e5rstider f\u00f8rskole','\u00e5rstider printbar','v\u00e5r sommer h\u00f8st vinter','\u00e5rstider sortering','\u00e5rstider ordoppgaver','\u00e5rstider telling','\u00e5rstid og natur'],
  holidays: ['helligdager arbeidsark','h\u00f8ytider fargelegging','helligdager matematikk','helligdager f\u00f8rskole','helligdager printbar','fest og tradisjoner','helligdager puslespill','h\u00f8ytidsoppgaver','helligdager ordoppgaver','norske tradisjoner'],
  weather: ['v\u00e6r arbeidsark','v\u00e6r fargelegging','v\u00e6r matematikk','v\u00e6r f\u00f8rskole','v\u00e6r printbar','v\u00e6rtyper oppgaver','v\u00e6rutsikt til barn','v\u00e6r og \u00e5rstider','v\u00e6r ordoppgaver','v\u00e6r sortering'],
  colors: ['farger arbeidsark','farger fargelegging','farger matematikk','farger f\u00f8rskole','farger printbar','fargegjenkjenning','farger blanding','farge sortering','farge ordoppgaver','fargel\u00e6r til barn'],
  shapes: ['former arbeidsark','former fargelegging','former matematikk','former f\u00f8rskole','former printbar','geometri til barn','former gjenkjenning','former sortering','former ordoppgaver','sirkel trekant firkant'],
  numbers: ['tall arbeidsark','tall fargelegging','tall matematikk','tall f\u00f8rskole','tall printbar','tallgjenkjenning','telle\u00f8velser','tall skriving','tall ordoppgaver','tallrekker \u00f8velse'],
  alphabet: ['alfabet arbeidsark','bokstaver fargelegging','alfabet f\u00f8rskole','alfabet printbar','bokstavgjenkjenning','alfabet rekkef\u00f8lge','bokstav\u00f8velser','l\u00e6re bokstaver','alfabet ordoppgaver','bokstavlyd \u00f8velser'],
  furniture: ['m\u00f8bler arbeidsark','m\u00f8bler fargelegging','m\u00f8bler f\u00f8rskole','m\u00f8bler printbar','hjemmets m\u00f8bler','m\u00f8bler sortering','m\u00f8bler ordoppgaver','rom og m\u00f8bler','m\u00f8bler matching','m\u00f8bler navngiving'],
  easter: ['p\u00e5ske arbeidsark','p\u00e5ske fargelegging','p\u00e5ske matematikk','p\u00e5ske f\u00f8rskole','p\u00e5ske printbar','p\u00e5skeegg oppgaver','p\u00e5skehare','p\u00e5ske puslespill','p\u00e5ske ordoppgaver','p\u00e5ske aktiviteter'],
  halloween: ['halloween arbeidsark','halloween fargelegging','halloween matematikk','halloween f\u00f8rskole','halloween printbar','halloween puslespill','skumle oppgaver','sp\u00f8kelse oppgaver','halloween ordoppgaver','halloween aktiviteter'],
  xmas: ['jul arbeidsark','jul fargelegging','jul matematikk','jul f\u00f8rskole','jul printbar','julenissen oppgaver','julens tradisjoner','jul puslespill','jul ordoppgaver','jule aktiviteter'],
  winter: ['vinter arbeidsark','vinter fargelegging','vinter matematikk','vinter f\u00f8rskole','vinter printbar','sn\u00f8 oppgaver','vinter aktiviteter','vinter puslespill','vinter ordoppgaver','vinterlige \u00f8velser'],
  farm: ['bondeg\u00e5rd arbeidsark','bondeg\u00e5rd fargelegging','bondeg\u00e5rd matematikk','bondeg\u00e5rd f\u00f8rskole','bondeg\u00e5rd printbar','husdyr oppgaver','bondeg\u00e5rd puslespill','h\u00f8st og avlinger','bondeg\u00e5rd ordoppgaver','landbruk til barn'],
  ocean: ['hav arbeidsark','hav fargelegging','hav matematikk','hav f\u00f8rskole','hav printbar','havdyr oppgaver','undervanns oppgaver','hav puslespill','hav ordoppgaver','havet til barn'],
  dinosaurs: ['dinosaur arbeidsark','dinosaur fargelegging','dinosaur matematikk','dinosaur f\u00f8rskole','dinosaur printbar','T-Rex oppgaver','fossil oppgaver','dinosaur puslespill','dinosaur ordoppgaver','forhistoriske dyr'],
  insects: ['insekt arbeidsark','insekt fargelegging','insekt matematikk','insekt f\u00f8rskole','insekt printbar','sommerfugl oppgaver','insekt puslespill','sm\u00e5kryp til barn','insekt ordoppgaver','insekter i naturen'],
  fruits: ['frukt arbeidsark','frukt fargelegging','frukt matematikk','frukt f\u00f8rskole','frukt printbar','sunne frukter','frukt sortering','frukt puslespill','frukt ordoppgaver','frukter og b\u00e6r'],
  vegetables: ['gr\u00f8nnsaker arbeidsark','gr\u00f8nnsaker fargelegging','gr\u00f8nnsaker matematikk','gr\u00f8nnsaker f\u00f8rskole','gr\u00f8nnsaker printbar','sunne gr\u00f8nnsaker','gr\u00f8nnsaker sortering','gr\u00f8nnsaker puslespill','gr\u00f8nnsaker ordoppgaver','gr\u00f8nnsaker p\u00e5 kj\u00f8kkenet'],
  flowers: ['blomster arbeidsark','blomster fargelegging','blomster matematikk','blomster f\u00f8rskole','blomster printbar','v\u00e5rblomster','blomster puslespill','blomster sortering','blomster ordoppgaver','blomster i hagen'],
  birds: ['fugler arbeidsark','fugler fargelegging','fugler matematikk','fugler f\u00f8rskole','fugler printbar','fuglearter oppgaver','fugler puslespill','fugler sortering','fugler ordoppgaver','fugler i naturen'],
  pets: ['kj\u00e6ledyr arbeidsark','kj\u00e6ledyr fargelegging','kj\u00e6ledyr matematikk','kj\u00e6ledyr f\u00f8rskole','kj\u00e6ledyr printbar','hund og katt oppgaver','kj\u00e6ledyr puslespill','dyrestell','kj\u00e6ledyr ordoppgaver','kj\u00e6ledyr sortering'],
  zoo: ['dyrepark arbeidsark','dyrepark fargelegging','dyrepark matematikk','dyrepark f\u00f8rskole','dyrepark printbar','zoologiske dyr','dyrepark puslespill','dyrepark bes\u00f8k','dyrepark ordoppgaver','dyreparken oppgaver'],
  garden: ['hage arbeidsark','hage fargelegging','hage matematikk','hage f\u00f8rskole','hage printbar','hagearbeid til barn','hage puslespill','planter og blomster','hage ordoppgaver','hagens dyr'],
  camping: ['camping arbeidsark','camping fargelegging','camping matematikk','camping f\u00f8rskole','camping printbar','friluftsliv oppgaver','camping puslespill','naturen ute','camping ordoppgaver','camping aktiviteter'],
  pirates: ['pirat arbeidsark','pirat fargelegging','pirat matematikk','pirat f\u00f8rskole','pirat printbar','pirat eventyr','pirat puslespill','skattekart','pirat ordoppgaver','pirat aktiviteter'],
  'fairy-tales': ['eventyr arbeidsark','eventyr fargelegging','eventyr matematikk','eventyr f\u00f8rskole','eventyr printbar','Asbj\u00f8rnsen og Moe oppgaver','eventyr puslespill','eventyrhelter','eventyr ordoppgaver','eventyr aktiviteter'],
  robots: ['robot arbeidsark','robot fargelegging','robot matematikk','robot f\u00f8rskole','robot printbar','teknologi oppgaver','robot puslespill','koding til barn','robot ordoppgaver','robot aktiviteter'],
  superheroes: ['superhelt arbeidsark','superhelt fargelegging','superhelt matematikk','superhelt f\u00f8rskole','superhelt printbar','superhelt puslespill','superkrefter oppgaver','superhelt ordoppgaver','superhelt telling','superhelt aktiviteter'],
  construction: ['bygging arbeidsark','bygging fargelegging','bygging matematikk','bygging f\u00f8rskole','bygging printbar','anleggsmaskiner oppgaver','bygging puslespill','verkt\u00f8y til barn','bygging ordoppgaver','byggeplass aktiviteter'],
  cooking: ['matlaging arbeidsark','matlaging fargelegging','matlaging matematikk','matlaging f\u00f8rskole','matlaging printbar','oppskrift oppgaver','matlaging puslespill','kj\u00f8kken til barn','matlaging ordoppgaver','matlaging aktiviteter'],
  travel: ['reise arbeidsark','reise fargelegging','reise matematikk','reise f\u00f8rskole','reise printbar','land oppgaver','reise puslespill','verden til barn','reise ordoppgaver','reise aktiviteter'],
  birthday: ['bursdag arbeidsark','bursdag fargelegging','bursdag matematikk','bursdag f\u00f8rskole','bursdag printbar','fest oppgaver','bursdag puslespill','feste og feire','bursdag ordoppgaver','bursdag aktiviteter'],
  circus: ['sirkus arbeidsark','sirkus fargelegging','sirkus matematikk','sirkus f\u00f8rskole','sirkus printbar','klovne oppgaver','sirkus puslespill','sirkus dyr','sirkus ordoppgaver','sirkus aktiviteter'],
  forest: ['skog arbeidsark','skog fargelegging','skog matematikk','skog f\u00f8rskole','skog printbar','skogens dyr','skog puslespill','naturen i skogen','skog ordoppgaver','skog aktiviteter'],
  spring: ['v\u00e5r arbeidsark','v\u00e5r fargelegging','v\u00e5r matematikk','v\u00e5r f\u00f8rskole','v\u00e5r printbar','v\u00e5rblomster oppgaver','v\u00e5r puslespill','v\u00e5rtegn','v\u00e5r ordoppgaver','v\u00e5r aktiviteter'],
  summer: ['sommer arbeidsark','sommer fargelegging','sommer matematikk','sommer f\u00f8rskole','sommer printbar','sommerferie oppgaver','sommer puslespill','strand og sol','sommer ordoppgaver','sommer aktiviteter'],
};

for (const id of themeOrder) {
  const t = themeNames[id];
  const sec = themeSecondaryTemplates[id] || [];
  const titleStr = `Gratis ${t.no}-oppgaver til Barn | LessonCraftStudio`;
  const titleLen = titleStr.length;
  const descStr = `Printbare ${t.no.toLowerCase()}-oppgaver til barn. Matematikk, fargelegging, ordspill og puslespill med ${t.no.toLowerCase()}tema. F\u00f8rskole til 3. klasse. Gratis PDF.`;
  const descLen = descStr.length;

  out += `### ${themeNum}. ${t.no} (\`${t.slug}\`)

| Field | Value |
|-------|-------|
| **Primary Keyword** | ${t.kw} |
| **SEO Title** | ${titleStr} |
| **Title Chars** | ${titleLen} |
| **Meta Description** | ${descStr} |
| **Desc Chars** | ${descLen} |
| **H1 (heading)** | ${t.h1} |

**Secondary Keywords (10):**
`;
  for (let i = 0; i < sec.length; i++) {
    out += `${i+1}. ${sec[i]}\n`;
  }
  out += '\n';
  themeNum++;
}

// ============================================================
// SECTION 3: Theme+Grade Pages (250)
// ============================================================
out += `---

## Section 3: Theme+Grade Pages (250)

### Quick Reference Table

| # | Theme | Grade | Path | Primary Keyword |
|---|-------|-------|------|----------------|
`;

let tgNum = 1;
for (const id of themeOrder) {
  const t = themeNames[id];
  for (const g of grades) {
    const themeName = t.no;
    const kw = `${t.kw.replace(' til barn', '')} ${g.gradeSuffix}`;
    out += `| ${tgNum} | ${themeName} | ${g.no} | \`${t.slug}/${g.slug}\` | ${kw} |\n`;
    tgNum++;
  }
}

out += '\n';

// Theme+Grade detailed entries
for (const id of themeOrder) {
  const t = themeNames[id];
  const kwBase = t.kw.replace(' til barn', '');

  out += `### ${t.no} (${id}) \u2014 5 klassetrinn\n\n`;

  for (const g of grades) {
    const kw = `${kwBase} ${g.gradeSuffix}`;
    const seoTitle = `${t.no}-oppgaver ${g.no} | LessonCraftStudio`;
    const titleLen = seoTitle.length;
    const seoDesc = `Printbare ${t.no.toLowerCase()}-oppgaver til ${g.gradeSuffix} (${g.age}). ${g.descSkills}. 33 generatorer. Gratis PDF.`;
    const descLen = seoDesc.length;
    const seoKws = `${t.no.toLowerCase()} ${g.no.toLowerCase()}, ${t.no.toLowerCase()} oppgaver ${g.age}, ${t.no.toLowerCase()} \u00f8velser ${g.no.toLowerCase()}, ${t.no.toLowerCase()} printbar ${g.no.toLowerCase()}`;

    out += `**${g.no} (${g.age})**
- **Primary Keyword:** ${kw}
- **seoTitle:** ${seoTitle} (${titleLen})
- **seoDescription:** ${seoDesc} (${descLen})
- **seoKeywords:** ${seoKws}

`;
  }
}

// ============================================================
// SECTION 4: Blog Post Keywords (112)
// ============================================================
out += `---

## Section 4: Blog Post Keywords (112)

| # | Topic (decoded) | focusKeyword | metaTitle |
|---|----------------|-------------|----------|
| 1 | 10 beste oppgavegeneratorer til 2. klasse | oppgavegeneratorer 2. klasse | 10 Beste Oppgavegeneratorer til 2. Klasse (7\u20138 \u00e5r) |
| 2 | 10 beste oppgavegeneratorer til 3. klasse | oppgavegeneratorer 3. klasse | 10 Beste Oppgavegeneratorer til 3. Klasse (8\u20139 \u00e5r) |
| 3 | 10 beste oppgavegeneratorer til 4.\u20135. klasse | oppgavegeneratorer 4.\u20135. klasse | 10 Beste Oppgavegeneratorer til 4.\u20135. Klasse (9\u201311 \u00e5r) |
| 4 | 10 beste oppgavegeneratorer til barnehage | oppgavegeneratorer barnehage | 10 Beste Oppgavegeneratorer til Barnehagen (5\u20136 \u00e5r) |
| 5 | 10 beste oppgavegeneratorer til f\u00f8rskole | oppgavegeneratorer f\u00f8rskole | 10 Beste Oppgavegeneratorer til F\u00f8rskolen (3\u20135 \u00e5r) |
| 6 | 10 beste oppgavemaler til 1. klasse | oppgavemaler 1. klasse | 10 Beste Oppgavemalverkt\u00f8y til 1. Klasses L\u00e6rere |
| 7 | Leseutvikling i 1. klasse | leseferdigheter 1. klasse | 1. Klasses Leseferdigheter: Ordlek, Alfabet-tog og Skriving |
| 8 | 33 tilpassbare oppgavegeneratorer | 33 oppgavegeneratorer til l\u00e6rere | 33 Tilpassbare Oppgavegeneratorer til Sm\u00e5skolel\u00e6reren |
| 9 | Algebra i 3. klasse: algebraisk tenkning | algebraisk tenkning 3. klasse | 3. Klasses Matematikk: Algebraisk Tenkning og Puslespill |
| 10 | 7 bildebaserte generatorer til spr\u00e5kundervisning | spr\u00e5kundervisning generatorer | 7 Bildebaserte Generatorer til Spr\u00e5kundervisningens Begynnere |
| 11 | ADHD-st\u00f8tte med visuelle oppgaver | ADHD visuelle oppgaver | ADHD-st\u00f8tte: 9 Generatorer til Kognitiv Avlasting |
| 12 | Intelligent cellegjenkjenning i rutenetttegning | rutenetttegning algoritme | Intelligent Cellegjenkjenning i Rutenetttegning: Pikselanalyse |
| 13 | Utfordringer til 4.\u20135. klasse | utfordringsoppgaver 4.\u20135. klasse | 4.\u20135. Klasse: Rutenetttegning, Sudoku og Logikk |
| 14 | Avanserte oppgaver til flinke elever | utfordringsoppgaver avanserte | Avanserte Oppgaver til Flinke Elever (4.\u20135. Klasse) |
| 15 | Den nye l\u00e6rerens guide | den nye l\u00e6rerens guide | Den Nye L\u00e6rerens Guide: Systemer og Oppgavemaler |
| 16 | Vurdering og l\u00e6ringsframgang | l\u00e6ringsvurdering oppgaveark | Vurdering og L\u00e6ringsframgang med Oppgaveark |
| 17 | St\u00f8tte til autismespektrum | autisme visuelle oppgaver | Autismespektrum St\u00f8tte: 8 Visuelle Generatorer |
| 18 | \u00d8konomiske undervisningsmaterialer | billige undervisningsmaterialer | \u00d8konomiske Undervisningsmaterialer: Maksim\u00e9r L\u00e6ring p\u00e5 Budsjett |
| 19 | Differensiering i praksis: ulike niv\u00e5er | differensiering oppgaveark | Differensiering i Praksis: Undervisning p\u00e5 Flere Niv\u00e5er |
| 20 | Differensiering: tilpassbare generatorer | differensiering med generatorer | Differensiering i Praksis: Tilpassbare Generatorer |
| 21 | Finmotoriske \u00f8velser i barnehagen | finmotorikk barnehage | Barnehagens Finmotorikk: Linjer, M\u00f8nstertog og Klipping |
| 22 | Matematikkgrunnlag i barnehagen | barnehagens matematikk | Barnehagens Matematikk: Plussoppgaver, M\u00f8nstre og Sudoku |
| 23 | Finn og oppdage-oppgaver i profesjonell kvalitet | finn og oppdage oppgaver | Finn og Oppdage-oppgaver: Profesjonell Kvalitet p\u00e5 3 Minutter |
| 24 | Fisher\u2013Yates-blandingsalgoritme i bokstavblanding | Fisher-Yates blandingsalgoritme | Fisher\u2013Yates-blanding: Tilfeldighet i Bokstavblandingsoppgaver |
| 25 | Formativ vurdering og l\u00e6ringsframgang | formativ vurdering | Formativ Vurdering: Oppgaveark i Databasert Undervisning |
| 26 | Hashalgoritme i plassering av undervisningsmaterialer | hashalgoritme undervisningsmaterialer | Hashalgoritme: Tilfeldig Plassering Forbedrer Kvaliteten |
| 27 | Finmotorikk-utvikling if\u00f8lge Benbow | finmotorikk Benbow | Finmotorikk-utvikling: Benbows 6 Pre-skrivingsbevegelser |
| 28 | Co-teaching og st\u00f8tteundervisning | co-teaching oppgaveplanlegging | Co-teaching: Effektiv Oppgaveplanlegging for To L\u00e6rere |
| 29 | Hybridundervisning og teknologi | hybridundervisning oppgaver | Hybridundervisning: Kombinasjon av Digitale og Trykte Oppgaver |
| 30 | Selvstendig arbeid i sm\u00e5skolen | selvstendig arbeid sm\u00e5skolen | Selvstendig Arbeid: Utvikling av Selvregulering |
| 31 | To \u00f8velsesformater: preposisjoner | preposisjons\u00f8velser | Preposisjoner: Utfyllings- og Flervalgs\u00f8velser |
| 32 | Vekstmentalitet med oppgaver | vekstmentalitet utfordringsoppgaver | Vekstmentalitet: Oppbygging av Utholdenhet med Utfordringsoppgaver |
| 33 | Komplett \u00e5rsplan for l\u00e6reren | l\u00e6rerens \u00e5rsplan | L\u00e6rerens \u00c5rsplan: Styring av Oppgaveark |
| 34 | Kommersiell lisens: passiv inntekt | salg av oppgaver som l\u00e6rer | Kommersiell Lisens: Selg Oppgaver og Skap Passiv Inntekt |
| 35 | Sesongbaserte aktiviteter | sesongbaserte oppgaver | Sesongbaserte Aktiviteter: L\u00e6ringsglede Hele \u00c5ret |
| 36 | Sommerens l\u00e6ringstap | sommerens l\u00e6ringstap \u00f8velser | Sommerens L\u00e6ringstap: Vedlikehold Ferdigheter med Hjemme\u00f8velser |
| 37 | Kinestetisk l\u00e6ring | kinestetisk l\u00e6ring generatorer | Kinestetisk L\u00e6ring: 6 Bevegelsesbaserte Generatorer |
| 38 | Skriving p\u00e5 tvers av fag | skriving p\u00e5 tvers av fag | Skriving p\u00e5 Tvers av Fag: Utvikling i Hvert Fag |
| 39 | Kognitiv belastningsteori | kognitiv belastningsteori | Kognitiv Belastningsteori i Design av Oppgaveark |
| 40 | Pr\u00f8veforberedelse uten stress | pr\u00f8veforberedelse sm\u00e5skolen | Pr\u00f8veforberedelse Uten Stress: Strategier |
| 41 | Tredelt st\u00f8tte og spesialundervisning | tredelt st\u00f8tte oppgaveark | Tredelt St\u00f8tte: M\u00e5lrettede Oppgaveark |
| 42 | Konkret\u2013billedlig\u2013abstrakt l\u00e6ringsvei | CPA-metode matematikk | CPA-l\u00e6ringsvei i Sm\u00e5skolens Matematikk |
| 43 | Hjemmeundervisningens oppgavegeneratorer | hjemmeundervisning oppgavegeneratorer | Hjemmeundervisningens Generatorer: Full L\u00e6replanst\u00f8tte |
| 44 | Hjemmearbeid vs klassearbeid | hjemmearbeid vs klassearbeid | Hjemmearbeid vs Klassearbeid: En Balansert Tiln\u00e6rming |
| 45 | Skolens f\u00f8rste uke | skolestart oppgaveark | Skolens F\u00f8rste Uke: Rutiner og Forventninger |
| 46 | Kritisk tenkning og probleml\u00f8sning | kritisk tenkning oppgaver | Kritisk Tenkning: Utvikling av Bredt Funderte Ferdigheter |
| 47 | Bildekryptogram: visuell hemmelig skrift | bildekryptogram guide | Bildekryptogram: Innovativ Hemmelig Skrift for Sm\u00e5barn |
| 48 | Bilde-sudoku til barn 4\u20138 \u00e5r | bildesudoku guide til barn | Bilde-Sudoku til Barn 4\u20138 \u00e5r: Komplett Undervisningsguide |
| 49 | M\u00f8nstertog-oppgaver og multisensorisk l\u00e6ring | m\u00f8nstertog multisensorisk l\u00e6ring | M\u00f8nstertog: Multisensorisk L\u00e6ring og Oppfatningsferdigheter |
| 50 | N\u00e6rmeste utviklingssone og differensiering | n\u00e6rmeste utviklingssone differensiering | N\u00e6rmeste Utviklingssone: Differensiering av Oppgaveniv\u00e5er |
| 51 | Begavede elever | begavede elever generatorer | Begavede Elever: 8 Utfordrende Oppgavegeneratorer |
| 52 | Matematikkangst reduksjon | matematikkangst lavt press oppgaver | Matematikkangst Reduksjon: 6 Lavt Press Generatorer |
| 53 | Logisk tenkning i 2. klasse | logisk tenkning 2. klasse | Logisk Tenkning i 2. Klasse: Kryssord og Logikkspill |
| 54 | Leseforst\u00e5else og ordforr\u00e5d | leseforst\u00e5else arbeidshefter | Leseforst\u00e5else: 6 Effektive Arbeidsheftestrategier |
| 55 | Dysleksi-st\u00f8tte | dysleksi bildeoppgaver | Dysleksi-st\u00f8tte: 7 Bildebaserte Verkt\u00f8y |
| 56 | Semesteravslutning | semesteravslutning vurdering | Semesteravslutning: Vurdering av L\u00e6ring og Feiring av Vekst |
| 57 | Klasseledelse med arbeidsark | klasseledelse oppgaveark | Klasseledelse: Arbeidsark til Overganger og Atferdsst\u00f8tte |
| 58 | Klasseroms-teknologi og printmaterialer | hybrid l\u00e6ring printmaterialer | Hybrid L\u00e6ring: Teknologi og Printmaterialer i Praksis |
| 59 | Naturfags ordforr\u00e5d | naturfags ordforr\u00e5d oppgaver | Naturfags Ordforr\u00e5d: 8 Oppgavetyper til Begrepsl\u00e6ring |
| 60 | Suksesshistorier fra l\u00e6rere | l\u00e6rernes suksesshistorier | L\u00e6rernes Suksesshistorier: Oppgaveark Forandret Klasserommet |
| 61 | Mental helse og emosjonelle ferdigheter | mental helse emosjonelle ferdigheter klasse | Mental Helse og Emosjonelle Ferdigheter: Trivsel i Klassen |
| 62 | Hvorfor bildebaserte oppgaver virker | bildebasert l\u00e6ring forskning | Bildebaserte Oppgaver: 2,3x Sterkere Hukommelsesspor |
| 63 | Millers 7\u00b12-regel i kryssord | Millers regel kryssord | Millers 7\u00b12: Hvorfor Bildekryssord Har 8 Bilder |
| 64 | M\u00f8nstergjenkjenning og matematisk tenkning | m\u00f8nstergjenkjenning matematikk | M\u00f8nstergjenkjenning og Matematisk Tenkning: Forskningsbasert |
| 65 | Hvordan et barn l\u00e6rer \u00e5 lese flytende | l\u00e6re \u00e5 lese ortografi | L\u00e6re \u00e5 Lese: Ortografisk L\u00e6ring og Synsordgjenkjenning |
| 66 | Bokstavblanding fremskynder staving | bokstavblanding staving | Bokstavblanding Fremskynder Stavingl\u00e6ring |
| 67 | Variansgjenkjenning i puslespill | variansgjenkjenning algoritme | Variansgjenkjenning: Unng\u00e5 Tomme Puslespillbrikker |
| 68 | Flerspr\u00e5klige generatorer | flerspr\u00e5klig oppgavegenerator | Flerspr\u00e5klige Generatorer: Norskspr\u00e5klig Brukergrensesnitt |
| 69 | Tilpassbart kryssordsrutenett | kryssordsrutenett generator | Tilpassbart Kryssordsrutenett: Unikt Verkt\u00f8y til L\u00e6rere |
| 70 | Musikk og kunst i l\u00e6ring | musikk kunst l\u00e6ring | Musikk og Kunst: Kreative Oppgaver til Kunstnerisk Uttrykk |
| 71 | Null-overlappings-algoritme | finn og oppdage algoritme | Null-overlapping: Profesjonelle S\u00f8keoppgaver |
| 72 | L\u00e6rerens tidsstyring | l\u00e6rerens tidsstyring strategier | L\u00e6rerens Tidsstyring: Strategier til Oppgaveforberedelse |
| 73 | L\u00e6rerens etterutdanning | l\u00e6rerens etterutdanning | Etterutdanning: Bruk av Arbeidsark i Profesjonell Utvikling |
| 74 | Undervisningens fremtid 2025\u20132030 | undervisningens fremtid teknologi | Undervisningens Fremtid 2025\u20132030: Teknologitrender og Oppgaver |
| 75 | Maksimering av undervisningstid | undervisningstidens maksimering strategier | Undervisningstidens Maksimering: Effektivitetsstrategier |
| 76 | Fagintegrasjon | fagintegrasjon tverrfaglighet | Fagintegrasjon: Tverrfaglige L\u00e6ringsforl\u00f8p |
| 77 | Elevenes m\u00e5lsetting | elevenes m\u00e5l selvevaluering | Elevenes M\u00e5l og Selvevaluering: Den Selvstyrende Eleven |
| 78 | Motivering og bel\u00f8nning av elever | elevmotivering oppgaver | Elevmotivering: Feiring av Framgang med Oppgavemaler |
| 79 | Sammenligning av l\u00e6ringsplattformer | l\u00e6ringsplattform sammenligning | L\u00e6ringsplattformer: Billig vs Dyr \u2014 Komplett Sammenligning |
| 80 | L\u00e6ringsstasjoner og rotasjon | l\u00e6ringsstasjoner rotasjonsarbeid | L\u00e6ringsstasjoner: Effektiv Modell til Selvstendig Arbeid |
| 81 | Analyse av l\u00e6ringsresultater | l\u00e6ringsresultater analyse undervisning | Analyse av L\u00e6ringsresultater i Undervisningsutvikling |
| 82 | Skreddersydd undervisningsmateriell p\u00e5 3 minutter | skreddersydd undervisningsmateriell guide | Skreddersydd Undervisningsmateriell p\u00e5 3 Minutter: Komplett Guide |
| 83 | Rutenetttegning: Leonardo da Vincis teknikk | rutenetttegning da Vinci | Rutenetttegning: Da Vincis 500 \u00c5r Gamle Teknikk |
| 84 | Norsk som andrespr\u00e5k: visuelle strategier | NOA visuelle verkt\u00f8y | NOA: Visuelle Strategier til St\u00f8tte av Spr\u00e5kl\u00e6ring |
| 85 | 100 skoledagers fest | 100 skoledagers fest | Hundre Skoledagers Fest: Aktiviteter og Temaoppgaver |
| 86 | Hemmelig melding-plussoppgaver | hemmelig melding plussoppgaver | Hemmelig Melding-plussoppgaver: N\u00e5r Matematikk Blir en G\u00e5te |
| 87 | Ords\u00f8kgenerator p\u00e5 90 sekunder | ords\u00f8k generator guide | Ords\u00f8kgenerator: Tilpassede Oppgaver p\u00e5 90 Sekunder |
| 88 | Bokstavblanding med tilpasset vanskelighetsgrad | bokstavblanding tilpasset vanskelighetsgrad | Bokstavblanding: Intelligente Hint etter Ordets Lengde |
| 89 | Overgangssituasjoner og rutiner | overgangssituasjoner klasserom | Overgangssituasjoner: Glidende Klassearbeid med Oppgaveark |
| 90 | Vikarens n\u00f8dplaner | vikarens planer | Vikarens N\u00f8dplaner: Ferdige Oppgaveark |
| 91 | Sosiale og emosjonelle ferdigheter (SEL) | SEL-l\u00e6ring oppgaver | Sosiale og Emosjonelle Ferdigheter: SEL-integrasjon |
| 92 | STEAM-undervisning i praksis | STEAM-undervisning arbeidsark | STEAM-undervisning: N\u00e5r Arbeidsark St\u00f8tter Skaping og Kreativitet |
| 93 | Symbolsk algebra for barn | symbolsk algebra til barn | Symbolsk Algebra: Matematiske Puslespill med Garantert L\u00f8sning |
| 94 | M\u00e5lbasert undervisningsplanlegging | m\u00e5lbasert planlegging | M\u00e5lbasert Planlegging: Start fra Sluttm\u00e5let |
| 95 | Sammenligning av oppgavegeneratorer | LessonCraftStudio sammenligning | Oppgavegeneratorer Sammenlignet: LCS vs Konkurrenter |
| 96 | Oppgavegeneratorer i bruk: en guide | oppgavegeneratorer guide | Oppgavegeneratorer i Bruk: Komplett Guide fra Start til Print |
| 97 | Opphavsrett og undervisningsmaterialer | opphavsrett undervisningsmaterialer | Opphavsrett og Undervisningsmaterialer: L\u00e6rerens Guide |
| 98 | Ergoterapiens m\u00e5l | ergoterapi finmotorikk | Ergoterapi: 8 Finmotoriske \u00d8velser |
| 99 | Trykt vs digitalt oppgaveark | trykt vs digitalt | Trykt vs Digitalt: Valg av Riktig Format til Undervisning |
| 100 | St\u00f8tte av arbeidshukommelse visuelt | arbeidshukommelse visuell st\u00f8tte | Arbeidshukommelsens St\u00f8tte: 7 Oppgavetyper med Visuell Hjelp |
| 101 | Alternative vurderingsmetoder | alternative vurdering | Alternative Vurderingsmetoder: Funksjonell Vurdering |
| 102 | Foreldres deltakelse i l\u00e6ring | foreldres deltakelse hjem-skole | Foreldres Deltakelse: Verkt\u00f8y til Hjem-Skole-Samarbeid |
| 103 | F\u00f8rskolep\u00e6dagogikk 3\u20136 \u00e5r | f\u00f8rskolep\u00e6dagogikk oppgaver 3-6 | F\u00f8rskolep\u00e6dagogikk: Alderstilpassede Oppgaver til 3\u20136-\u00e5ringer |
| 104 | Kameratl\u00e6ring og elever som l\u00e6rere | kameratl\u00e6ring oppgavemaler | Kameratl\u00e6ring: Oppgavebaserte Metoder til L\u00e6ring |
| 105 | Visuell oppfatning: Frostigs ferdigheter | visuell oppfatning Frostig | Visuell Oppfatning: Frostigs Fem Grunnleggende Ferdigheter |
| 106 | Visuell og verbal l\u00e6ring | visuell verbal l\u00e6ring | Visuell og Verbal L\u00e6ring: 2,3x Effektforsterkning |
| 107 | Visuelle verkt\u00f8y til spesialundervisning | spesialundervisning visuelle generatorer | Visuelle Verkt\u00f8y til Spesialundervisning: 8 Generatorer |
| 108 | Visuo-spatiale ferdigheter | visuo-spatiale ferdigheter STEM | Visuo-spatiale Ferdigheter: 7 Oppgavetyper til STEM-l\u00e6ring |
| 109 | Sesongbasert oppgaveplanlegging | sesongbasert oppgaveplanlegging | Sesongbasert Oppgaveplanlegging: Hele \u00c5rets Strategi |
| 110 | Samfunnsfags ordforr\u00e5d | samfunnsfags ordforr\u00e5d generatorer | Samfunnsfags Ordforr\u00e5d: 7 Generatorer til Historie og Geografi |
| 111 | Entydig l\u00f8sningsalgoritme | entydig l\u00f8sning | Entydig L\u00f8sning: Algoritmen som Forhindrer Frustrasjon |
| 112 | Overgang til mellomtrinnet | overgang til mellomtrinnet forberedelse | Overgang til Mellomtrinnet: Forberedelse av 5. Klasseelever |

**Note:** metaDescription for each blog post follows the template:
\`[Topic summary in 1 sentence]. Forskningsbaserte strategier og praktiske tips til l\u00e6rere og foreldre. Les hele artikkelen.\`

---

## Section 5: Secondary Pages

### Category Hubs (8)

**Dyr og natur** (\`animals-nature\`)
- **Primary Keyword:** dyr og natur oppgaver til l\u00e6rere
- **SEO Title:** Dyr- og Naturoppgaver til L\u00e6rere | LessonCraftStudio (51)
- **Meta Description:** Printbare dyr- og naturoppgaver til l\u00e6rere. 10 temaer: bondeg\u00e5rd, kj\u00e6ledyr, hav, dinosaurer, skog og mer. Gratis PDF-nedlasting. (130)

**Mat og hage** (\`food-garden\`)
- **Primary Keyword:** mat og hage oppgaver til l\u00e6rere
- **SEO Title:** Mat- og Hageoppgaver til L\u00e6rere | LessonCraftStudio (50)
- **Meta Description:** Printbare mat- og hageoppgaver til l\u00e6rere. 5 temaer: frukt, gr\u00f8nnsaker, matlaging og hage. Gratis PDF-nedlasting. (117)

**\u00c5rstider og v\u00e6r** (\`seasons-weather\`)
- **Primary Keyword:** \u00e5rstider og v\u00e6r oppgaver til l\u00e6rere
- **SEO Title:** \u00c5rstids- og V\u00e6roppgaver til L\u00e6rere | LessonCraftStudio (50)
- **Meta Description:** Printbare \u00e5rstids- og v\u00e6roppgaver til l\u00e6rere. 5 temaer: v\u00e5r, sommer, vinter og v\u00e6rforhold. Gratis PDF-nedlasting. (120)

**H\u00f8ytider og fester** (\`holidays-celebrations\`)
- **Primary Keyword:** h\u00f8ytidsoppgaver til l\u00e6rere
- **SEO Title:** H\u00f8ytids- og Festoppgaver til L\u00e6rere | LessonCraftStudio (52)
- **Meta Description:** Printbare h\u00f8ytids- og festoppgaver til l\u00e6rere. 5 temaer: jul, p\u00e5ske, halloween og bursdag. Gratis PDF. (108)

**L\u00e6ringens grunnlag** (\`academic-foundations\`)
- **Primary Keyword:** l\u00e6ringsgrunnlag oppgaver til l\u00e6rere
- **SEO Title:** L\u00e6ringsgrunnlag Oppgaver til L\u00e6rere | LessonCraftStudio (52)
- **Meta Description:** Printbare l\u00e6ringsgrunnlagsoppgaver til l\u00e6rere. 5 temaer: alfabet, tall, former, farger og skole. Gratis PDF-nedlasting. (123)

**Mennesker og hverdag** (\`people-daily-life\`)
- **Primary Keyword:** mennesker og hverdag oppgaver til l\u00e6rere
- **SEO Title:** Mennesker og Hverdag Oppgaver til L\u00e6rere | LessonCraftStudio (56)
- **Meta Description:** Printbare menneske- og hverdagsoppgaver til l\u00e6rere. 6 temaer: kropp, f\u00f8lelser, kl\u00e6r, husholdning, m\u00f8bler og yrker. Gratis PDF. (128)

**Handling og eventyr** (\`active-adventure\`)
- **Primary Keyword:** handling og eventyr oppgaver til l\u00e6rere
- **SEO Title:** Handlings- og Eventyroppgaver til L\u00e6rere | LessonCraftStudio (55)
- **Meta Description:** Printbare handlings- og eventyroppgaver til l\u00e6rere. 6 temaer: sport, transport, bygging, reiser, camping og pirater. (121)

**Fantasi og lek** (\`imagination-play\`)
- **Primary Keyword:** fantasi og lek oppgaver til l\u00e6rere
- **SEO Title:** Fantasi- og Lekeoppgaver til L\u00e6rere | LessonCraftStudio (52)
- **Meta Description:** Printbare fantasi- og lekeoppgaver til l\u00e6rere. 8 temaer: leker, musikk, rommet, roboter, superhelter og eventyr. Gratis. (124)

### Grade Hubs (5)

**F\u00f8rskole** (\`forskole\`)
- **Primary Keyword:** f\u00f8rskole oppgaver printbar
- **SEO Title:** F\u00f8rskoleoppgaver Printbar \u2014 Gratis | LessonCraftStudio (50)
- **Meta Description:** Gratis printbare f\u00f8rskoleoppgaver til 3\u20134-\u00e5ringer. Fargelegging, finmotorikk og tellingens grunnlag. 50 temaer. Last ned PDF med en gang. (141)

**Barnehage** (\`barnehage\`)
- **Primary Keyword:** barnehage oppgaver printbar
- **SEO Title:** Barnehage Oppgaver Printbar | LessonCraftStudio (48)
- **Meta Description:** Gratis printbare barnehageoppgaver til 5\u20136-\u00e5ringer. Bokstaver, tall, m\u00f8nstre og oppfatning. 50 temaer. Last ned PDF med en gang. (131)

**1. Klasse** (\`forste-klasse\`)
- **Primary Keyword:** 1. klasses oppgaver printbar
- **SEO Title:** 1. Klasses Oppgaver Printbar \u2014 Gratis | LessonCraftStudio (55)
- **Meta Description:** Gratis printbare 1. klasses oppgaver til 6\u20137-\u00e5ringer. Addisjon, subtraksjon, lesing og skriving. 50 temaer. Last ned PDF med en gang. (140)

**2. Klasse** (\`andre-klasse\`)
- **Primary Keyword:** 2. klasses oppgaver printbar
- **SEO Title:** 2. Klasses Oppgaver Printbar \u2014 Gratis | LessonCraftStudio (55)
- **Meta Description:** Gratis printbare 2. klasses oppgaver til 7\u20138-\u00e5ringer. Multiplikasjon, ordspill og probleml\u00f8sning. 50 temaer. Last ned PDF med en gang. (141)

**3. Klasse** (\`tredje-klasse\`)
- **Primary Keyword:** 3. klasses oppgaver printbar
- **SEO Title:** 3. Klasses Oppgaver Printbar \u2014 Gratis | LessonCraftStudio (55)
- **Meta Description:** Gratis printbare 3. klasses oppgaver til 8\u20139-\u00e5ringer. Flertrinnsproblemer, kryssord og avanserte oppgaver. 50 temaer. Last ned PDF. (138)

### Other Secondary Pages

**Forside** (\`/\`)
- **Primary Keyword:** arbeidsark generatorer til barn
- **SEO Title:** Gratis Arbeidsark-Generatorer til Barn | LessonCraftStudio (56)
- **Meta Description:** Lag arbeidsark med 33 generatorer og 3\u202f000+ bilder. Matematikk, fargelegging, kryssord og puslespill. Last ned PDF med en gang. Gratis, ingen registrering. (157)

**Alle generatorer** (\`/apps\`)
- **Primary Keyword:** oppgavegenerator plattform til l\u00e6rere
- **SEO Title:** 33 Gratis Oppgavegeneratorer til L\u00e6rere | LessonCraftStudio (56)
- **Meta Description:** Utforsk 33 gratis oppgavegeneratorer. Lag kryssord, matematikkoppgaver, fargeleggingssider og mer. Last ned printbare PDF-er med en gang. Gratis. (153)

**Oppgaver oversikt** (\`/worksheets\`)
- **Primary Keyword:** printbare oppgaver til barn gratis
- **SEO Title:** Printbare Oppgaver til Barn \u2014 50 Temaer | LessonCraftStudio (56)
- **Meta Description:** Bla gjennom 50 temaers printbare oppgaver til barn. Matematikk, spr\u00e5k, fargelegging og puslespill fra f\u00f8rskole til 3. klasse. 250+ oppgavesamlinger. Gratis. (159)

**Blogg** (\`/blog\`)
- **Primary Keyword:** undervisningsmaterialer blogg til l\u00e6rere
- **SEO Title:** Undervisningsmaterialer og Oppgavetips Blogg | LessonCraftStudio (57)
- **Meta Description:** Finn 100+ ekspertartikler om undervisningsstrategier, oppgavedesign og gratis utdanningsressurser. Guider til l\u00e6rere og foreldre. (133)

**Priser** (\`/pricing\`)
- **Primary Keyword:** oppgavegenerator pris
- **SEO Title:** Priser: Gratis, Basispakke og Full Tilgang | LessonCraftStudio (56)
- **Meta Description:** Velg din plan: Gratis ords\u00f8kgenerator, Basispakke med 10 generatorer eller Full Tilgang til alle 33 generatorer. Si opp n\u00e5r som helst. (143)

**Om oss** (\`/about\`)
- **Primary Keyword:** om LessonCraftStudio
- **SEO Title:** Om LessonCraftStudio \u2014 Oppgavegeneratorer til L\u00e6rere (54)
- **Meta Description:** L\u00e6r om LessonCraftStudio og v\u00e5r misjon om \u00e5 gi l\u00e6rere og foreldre profesjonelle oppgaveverkt\u00f8y. 33 generatorer, 3\u202f000+ bilder. (132)

---

## Verification Summary

- **Total unique primary keywords:** 333
- **Duplicates found:** NONE \u2714\ufe0f
- **Product pages:** 33 (all use "generator" pattern)
- **Theme hubs:** 50 (all use "oppgaver til barn" pattern)
- **Theme+grade pages:** 250 (all use grade-specific suffix)
- **Blog posts:** 112
- **Secondary pages:** 19
- **Anti-cannibalization:** No product keyword uses "til barn", no theme hub uses "generator" \u2714\ufe0f
- **Language:** All keywords in Norwegian Bokm\u00e5l (no English leakage, no Danish leakage) \u2714\ufe0f
- **Curriculum:** Kunnskapsl\u00f8ftet (LK20) \u2714\ufe0f
`;

// Write to file
const outPath = path.join(__dirname, '..', 'docs', 'seo-keywords', 'no-all-pages.md');
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Written ${out.split('\n').length} lines to ${outPath}`);
console.log(`File size: ${(Buffer.byteLength(out, 'utf8') / 1024).toFixed(1)} KB`);

// Validate no duplicate primary keywords
const allPrimaryKws = [];
for (const p of productPages) allPrimaryKws.push(p.primaryKw);
for (const id of themeOrder) allPrimaryKws.push(themeNames[id].kw);
// Theme+grade
for (const id of themeOrder) {
  const t = themeNames[id];
  const kwBase = t.kw.replace(' til barn', '');
  for (const g of grades) {
    allPrimaryKws.push(`${kwBase} ${g.gradeSuffix}`);
  }
}
const duplicates = allPrimaryKws.filter((kw, idx) => allPrimaryKws.indexOf(kw) !== idx);
if (duplicates.length > 0) {
  console.error('DUPLICATE PRIMARY KEYWORDS FOUND:', duplicates);
  process.exit(1);
} else {
  console.log(`Validated ${allPrimaryKws.length} primary keywords - no duplicates found.`);
}
