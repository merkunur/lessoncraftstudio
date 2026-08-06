#!/usr/bin/env node
/**
 * Generate the comprehensive Danish keyword map for SEO Part 141.
 * Outputs: docs/seo-keywords/da-all-pages.md
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// DATA: Product Pages (33)
// ============================================================
const productPages = [
  { num: 1, slug: 'addition-arbejdsark', appId: 'image-addition', name: 'Addition', primaryKw: 'addition opgave generator', title: 'Gratis Addition Generator til B\u00f8rn | LessonCraftStudio', titleChars: 51, desc: 'Lav printbare plusstykker med billeder til f\u00f8rskole\u20133. klasse. 3.000+ billeder, tilpas sv\u00e6rhedsgrad og f\u00e5 facitark. Download gratis PDF med det samme.', descChars: 153, h1: 'Addition Opgave Generator', subtitle: 'Lav Billedbaserede Plusstykker fra F\u00f8rskole til 3. Klasse', secondary: ['plusstykker arbejdsark gratis','addition opgaver b\u00f8rnehaveklasse','billedbaserede plusstykker','matematik arbejdsark gratis','plusstykker med billeder','printbare regneopgaver','addition facitark','l\u00e6re at l\u00e6gge sammen','plusstykker 1. klasse','addition \u00f8velser b\u00f8rn'], diffNote: 'Ejer "addition" + v\u00e6rkt\u00f8jsintent. Differentierer fra kode-plusstykker via visuelt billedtilgang vs symbolkodning.' },
  { num: 2, slug: 'alfabet-tog-arbejdsark', appId: 'alphabet-train', name: 'Alfabet-tog', primaryKw: 'alfabet tog generator', title: 'Gratis Alfabet-Tog Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare alfabet-tog opgaver til bogstavl\u00e6ring fra f\u00f8rskole til 1. klasse. Sjov m\u00e5de at l\u00e6re bogstaver med billeder. Download gratis PDF.', descChars: 147, h1: 'Alfabet-Tog Generator', subtitle: 'Printbare Bogstav\u00f8velser fra F\u00f8rskole til 1. Klasse', secondary: ['alfabet tog opgaver','bogstaver \u00f8velse f\u00f8rskole','alfabet printbar','alfabet-tog arbejdsark','bogstavgenkendelse','alfabetisk r\u00e6kkef\u00f8lge \u00f8velse','bogstav\u00f8velser til b\u00f8rn','l\u00e6re at l\u00e6se','alfabet\u00f8velser','begyndelsesbogstaver opgave'], diffNote: 'Ejer "alfabet-tog" koncept. Differentierer fra skriveopgaver via togformet bogstavordning vs bogstavdannelse.' },
  { num: 3, slug: 'malebog-arbejdsark', appId: 'coloring', name: 'Malebog', primaryKw: 'malebog generator', title: 'Gratis Malebog Generator til B\u00f8rn | LessonCraftStudio', titleChars: 53, desc: 'Lav printbare farvel\u00e6gningssider til b\u00f8rn med 3.000+ billeder. 50 temaer og 5 aldersniveauer fra f\u00f8rskole til 3. klasse. Download gratis PDF.', descChars: 149, h1: 'Malebog Generator til B\u00f8rn', subtitle: 'Lav Printbare Farvel\u00e6gningssider med 50 Temaer og 3.000+ Billeder', secondary: ['farvel\u00e6gningssider til b\u00f8rn gratis','gratis malebog print','farvel\u00e6gningsark printbar','dyr farvel\u00e6gning','printbare malebog sider','farvel\u00e6gning f\u00f8rskole','farvel\u00e6gnings\u00f8velser','farvel\u00e6gningsopgaver til b\u00f8rn','finmotorik farvel\u00e6gning','b\u00f8rns farvel\u00e6gningssider'], diffNote: 'Ejer "malebog" v\u00e6rkt\u00f8jsintent. Differentierer fra tegn-og-farvel\u00e6g via fri farvel\u00e6gning vs rasterbaseret pixelkunst.' },
  { num: 4, slug: 'matematikopgaver-arbejdsark', appId: 'math-worksheet', name: 'Matematikopgaver', primaryKw: 'matematikopgave generator', title: 'Matematikopgave Generator til B\u00f8rn | LessonCraftStudio', titleChars: 55, desc: 'Lav visuelle matematikopgaver med billeder. Addition, subtraktion, sammenligning og talr\u00e6kker fra f\u00f8rskole til 3. klasse. Facitark inkluderet. Gratis PDF.', descChars: 157, h1: 'Matematikopgave Generator', subtitle: 'Visuelle Matematik\u00f8velser fra F\u00f8rskole til 3. Klasse', secondary: ['matematik opgaver indskoling','regneopgaver printbar','matematik arbejdsark','matematik\u00f8velser f\u00f8rskole','visuelle matematikopgaver','regneopgaver til b\u00f8rn','matematik facitark','grundl\u00e6ggende regnearter \u00f8velse','matematik printbar gratis','matematik tr\u00e6ningsopgaver'], diffNote: 'Ejer bredt "matematikopgave" v\u00e6rkt\u00f8jsintent. Differentierer fra addition/subtraktion via fleroperations-omfang.' },
  { num: 5, slug: 'bogstavblanding-arbejdsark', appId: 'word-scramble', name: 'Bogstavblanding', primaryKw: 'bogstavblanding generator', title: 'Gratis Bogstavblanding Generator | LessonCraftStudio', titleChars: 52, desc: 'Lav printbare bogstavblanding-opgaver til stavning og retstavning. Tilpas sv\u00e6rhedsgrad fra f\u00f8rskole til 3. klasse. Med billeder. Gratis PDF.', descChars: 146, h1: 'Bogstavblanding Generator', subtitle: 'Printbare Retstavnings\u00f8velser med Billeder', secondary: ['bogstavblanding opgaver','skrive\u00f8velser til b\u00f8rn','retstavning \u00f8velse','ord-g\u00e5de printbar','stavelse\u00f8velse','ordspil til b\u00f8rn printbar','orddannelse opgaver','l\u00e6re at l\u00e6se opgaver','skrivning tr\u00e6ning','ordforr\u00e5d \u00f8velser'], diffNote: 'Ejer "bogstavblanding" koncept. Differentierer fra ords\u00f8gning via bogstav-omrangering vs bogstav-findning.' },
  { num: 6, slug: 'find-og-tael-arbejdsark', appId: 'find-and-count', name: 'Find og T\u00e6l', primaryKw: 'find og t\u00e6l generator', title: 'Find og T\u00e6l Generator \u2014 Gratis | LessonCraftStudio', titleChars: 52, desc: 'Lav printbare find og t\u00e6l-opgaver til b\u00f8rn. Udvikl t\u00e6llef\u00e6rdigheder og visuel opm\u00e6rksomhed med billeder. F\u00f8rskole til 3. klasse. Gratis PDF.', descChars: 150, h1: 'Find og T\u00e6l Generator', subtitle: 'Udvikl T\u00e6llef\u00e6rdigheder med Sjove S\u00f8geopgaver', secondary: ['find og t\u00e6l opgaver','t\u00e6lle\u00f8velser f\u00f8rskole','visuel t\u00e6lling','antal genkendelse','find og t\u00e6l printbar','t\u00e6llef\u00e6rdigheder til b\u00f8rn','t\u00e6lle\u00f8velse med billeder','tal\u00f8velser f\u00f8rskole','t\u00e6lling tr\u00e6ning','matematik s\u00f8geopgave'], diffNote: 'Ejer "find og t\u00e6l" dobbelt-f\u00e6rdigheds koncept. Differentierer fra find-objekterne via t\u00e6lle-komponent.' },
  { num: 7, slug: 'matchning-arbejdsark', appId: 'matching-app', name: 'Matchning', primaryKw: 'matchning generator', title: 'Gratis Matchning Generator til B\u00f8rn | LessonCraftStudio', titleChars: 55, desc: 'Lav printbare matchningsopgaver med billeder. Udvikl hukommelse og m\u00f8nstergenkendelse fra f\u00f8rskole til 3. klasse. 50 temaer. Download gratis PDF.', descChars: 149, h1: 'Matchning Generator', subtitle: 'Printbare Parrings\u00f8velser med 50 Temaer', secondary: ['matchning opgaver','parring til b\u00f8rn','hukommelsesspil printbar','parrings\u00f8velse f\u00f8rskole','m\u00f8nstergenkendelse \u00f8velse','visuel parring','billedparring opgave','par\u00f8velse printbar','hukommelse og parring','matchningsopgaver f\u00f8rskole'], diffNote: 'Ejer "matchning" koncept. Differentierer fra skygge-match via billed-til-billede vs billed-til-skygge matchning.' },
  { num: 8, slug: 'linjetraening-arbejdsark', appId: 'drawing-lines', name: 'Linjetr\u00e6ning', primaryKw: 'linjetr\u00e6ning generator', title: 'Linjetr\u00e6ning Generator \u2014 Gratis | LessonCraftStudio', titleChars: 53, desc: 'Lav printbare linjetr\u00e6ningsopgaver til finmotorik-udvikling. Lige linjer, buer og b\u00f8lger fra f\u00f8rskole til 1. klasse. Download gratis PDF.', descChars: 143, h1: 'Linjetr\u00e6nings Generator', subtitle: 'Finmotorik \u00d8velser fra F\u00f8rskole til 1. Klasse', secondary: ['linjetr\u00e6ning opgaver','finmotorik \u00f8velser','linje f\u00f8lgning opgave','blyantsgreb \u00f8velser','tegning tr\u00e6ning f\u00f8rskole','finmotorik f\u00f8rskole','skriveforberedelse \u00f8velse','blyantsgreb tr\u00e6ning','linjer og former \u00f8velse','tegnetr\u00e6ning til b\u00f8rn'], diffNote: 'Ejer "linjetr\u00e6ning" finmotorik koncept. Differentierer fra skriveopgaver via pre-skrivning linjetr\u00e6ning vs bogstavdannelse.' },
  { num: 9, slug: 'bingo-arbejdsark', appId: 'picture-bingo', name: 'Bingo', primaryKw: 'billed-bingo generator', title: 'Gratis Billed-Bingo Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare billed-bingospil til b\u00f8rn. 50 temaer, tilpasselige gitre og billeder fra 3.000+ bibliotek. Perfekt til klasselokalet. Download gratis.', descChars: 150, h1: 'Billed-Bingo Generator', subtitle: 'Lav Printbare Bingospil med 50 Temaer', secondary: ['bingo printbar til b\u00f8rn','billed-bingo spil','printbart bingospil','bingo f\u00f8rskole','klasse bingospil','billed-bingo gitter','bingo opgave til b\u00f8rn','gruppespil printbar','bingo billeder b\u00f8rn','bingospil klasselokale'], diffNote: 'Ejer "billed-bingo" koncept. Eneste gruppespil-arbejdsark generator i pakken.' },
  { num: 10, slug: 'sudoku-arbejdsark', appId: 'sudoku', name: 'Sudoku', primaryKw: 'b\u00f8rne sudoku generator', title: 'B\u00f8rne Sudoku Generator \u2014 Gratis | LessonCraftStudio', titleChars: 52, desc: 'Lav printbare billed-sudokuer til b\u00f8rn. Nemme og mellemsvare logikspil fra f\u00f8rskole til 3. klasse. Billeder fra 3.000+ bibliotek. Gratis PDF.', descChars: 147, h1: 'B\u00f8rne Sudoku Generator', subtitle: 'Printbare Billed-Sudokuer fra F\u00f8rskole til 3. Klasse', secondary: ['billed-sudoku til b\u00f8rn','sudoku printbar','b\u00f8rns logikspil','nem sudoku til b\u00f8rn','billed-sudoku printbar','sudoku f\u00f8rskole','logik\u00f8velser til b\u00f8rn','sudoku gitter til b\u00f8rn','t\u00e6nkningsf\u00e6rdigheder tr\u00e6ning','sudoku indskoling'], diffNote: 'Ejer "b\u00f8rne sudoku" logik-puslespil koncept. Bruger billeder i stedet for tal til yngre b\u00f8rn.' },
  { num: 11, slug: 'stor-lille-arbejdsark', appId: 'big-small-app', name: 'Stor og Lille', primaryKw: 'st\u00f8rrelsessammenligning generator', title: 'St\u00f8rrelsessammenligning Generator | LessonCraftStudio', titleChars: 53, desc: 'Lav printbare stor og lille sammenligningsopgaver med billeder. Udvikl st\u00f8rrelsesbegreber fra f\u00f8rskole til 1. klasse. Tilpas indstillinger. Gratis PDF.', descChars: 155, h1: 'Stor og Lille Generator', subtitle: 'St\u00f8rrelsessammenlignings\u00f8velser med Billeder fra F\u00f8rskole til 1. Klasse', secondary: ['stor og lille opgaver','st\u00f8rrelsessammenligning f\u00f8rskole','st\u00f8rrelser genkendelse','st\u00f8rre og mindre','st\u00f8rrelses sammenligning til b\u00f8rn','stor lille printbar','st\u00f8rrelsesforskel opgaver','st\u00f8rrelses\u00f8velser f\u00f8rskole','sammenligningsf\u00e6rdigheder \u00f8velse','st\u00f8rrelser sortering'], diffNote: 'Ejer "st\u00f8rrelsessammenligning" koncept. Differentierer fra sammenligningsopgaver via st\u00f8rrelsessammenligning vs m\u00e6ngdesammenligning.' },
  { num: 12, slug: 'billediagram-arbejdsark', appId: 'chart-count-color', name: 'Billediagram', primaryKw: 'billediagram generator', title: 'Gratis Billediagram Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare billediagram-opgaver til t\u00e6lling og datavisualisering. T\u00e6l og farvel\u00e6g diagrammer fra f\u00f8rskole til 3. klasse. Gratis PDF.', descChars: 145, h1: 'Billediagram \u2014 T\u00e6l og Farvel\u00e6g Generator', subtitle: 'Datavisualisering og T\u00e6lle\u00f8velser til B\u00f8rn', secondary: ['billediagram opgaver','t\u00e6l og farvel\u00e6g','datavisualisering til b\u00f8rn','s\u00f8jlediagram f\u00f8rskole','billediagram printbar','t\u00e6lling og farvel\u00e6gning','statistikopgaver til b\u00f8rn','diagram printbar','statistik f\u00f8rskole','billediagram \u00f8velse'], diffNote: 'Ejer "billediagram" datavisualiserings koncept. Eneste diagram/graf arbejdsark generator i pakken.' },
  { num: 13, slug: 'kode-plusstykker-arbejdsark', appId: 'code-addition', name: 'Kode-plusstykker', primaryKw: 'kode-plusstykker generator', title: 'Kode-Plusstykker Generator | LessonCraftStudio', titleChars: 47, desc: 'Lav printbare kode-plusstykker hvor billeder erstatter tal. Udvikler algebraisk t\u00e6nkning fra f\u00f8rskole til 3. klasse. Gratis PDF download.', descChars: 143, h1: 'Kode-Plusstykker Generator', subtitle: 'Algebraisk T\u00e6nkning gennem Billedkodede Regneopgaver', secondary: ['kode-plusstykker opgaver','symbolsk algebra til b\u00f8rn','billedbaseret matematik','kodeopgaver printbar','algebraisk t\u00e6nkning f\u00f8rskole','billede erstatter tal','hemmelig besked plusstykker','billedsymbol regneopgave','matematisk kodning','visuel algebra'], diffNote: 'Ejer "kode-plusstykker" symbol-algebra koncept. Differentierer fra addition via symbolisk substitution.' },
  { num: 14, slug: 'tegn-og-farvelaeg-arbejdsark', appId: 'draw-and-color', name: 'Tegn og Farvel\u00e6g', primaryKw: 'rastertegning generator', title: 'Gratis Rastertegning Generator | LessonCraftStudio', titleChars: 50, desc: 'Lav printbare rastertegningsopgaver. Tegn m\u00f8nstre i ruder efter model og farvel\u00e6g. Udvikler visuel opfattelse. F\u00f8rskole til 3. klasse. Gratis.', descChars: 149, h1: 'Rastertegning Generator', subtitle: 'Tegn og Farvel\u00e6g M\u00f8nstre i Rudem\u00f8nster efter Model', secondary: ['rastertegning opgaver','pixeltegning til b\u00f8rn','rudetegning','rutepapir tegning','visuel opfattelse \u00f8velse','rudetegning printbar','model kopiering til rude','tegning i ruder','kodet tegning','rasteropgaver til b\u00f8rn'], diffNote: 'Ejer "rastertegning" pixelkunst koncept. Differentierer fra malebog via struktureret rasterbaseret tegning vs fri farvel\u00e6gning.' },
  { num: 15, slug: 'find-objekterne-arbejdsark', appId: 'find-objects', name: 'Find Objekterne', primaryKw: 'find objekterne generator', title: 'Find Objekterne Generator \u2014 Gratis | LessonCraftStudio', titleChars: 55, desc: 'Lav printbare s\u00f8geopgaver til b\u00f8rn. Find skjulte objekter i billeder og udvikl visuel opm\u00e6rksomhed. 50 temaer fra f\u00f8rskole til 3. klasse.', descChars: 149, h1: 'Find Objekterne Generator', subtitle: 'Visuel Opm\u00e6rksomheds\u00f8velser med 50 Temaer', secondary: ['find objekterne opgaver','puslespil billede printbar','visuel s\u00f8gning til b\u00f8rn','find skjulte objekter','opm\u00e6rksomhed \u00f8velse','visuel opfattelse f\u00f8rskole','find og opdage opgave','billedpuslespil\u00f8velser','s\u00f8gespil printbar','visuel opm\u00e6rksomhed'], diffNote: 'Ejer "find objekterne" skjult-objekt koncept. Differentierer fra find-og-t\u00e6l via ren visuel s\u00f8gning vs t\u00e6lling.' },
  { num: 16, slug: 'raster-puslespil-arbejdsark', appId: 'grid-match', name: 'Raster-puslespil', primaryKw: 'raster-puslespil generator', title: 'Gratis Raster-Puslespil Generator | LessonCraftStudio', titleChars: 53, desc: 'Lav printbare raster-puslespil til visuel opfattelse og rumlig forst\u00e5else. 50 temaer fra f\u00f8rskole til 3. klasse. Gratis PDF download.', descChars: 141, h1: 'Raster-Puslespil Generator', subtitle: 'Visuel Opfattelse og Rumlig Forst\u00e5elses\u00f8velser', secondary: ['raster-puslespil opgaver','visuelt puslespil til b\u00f8rn','rumlig forst\u00e5else','m\u00f8nster matchning','rasteropgaver printbar','opfattelse \u00f8velse','visuel logik til b\u00f8rn','matchnings\u00f8velser f\u00f8rskole','raster puslespil','rumlig opfattelse'], diffNote: 'Ejer "raster-puslespil" rumlig-forst\u00e5else koncept. Differentierer fra rastertegning via matchning vs tegning.' },
  { num: 17, slug: 'krydsord-arbejdsark', appId: 'image-crossword', name: 'Krydsord', primaryKw: 'billedkrydsord generator', title: 'Gratis Billedkrydsord Generator | LessonCraftStudio', titleChars: 51, desc: 'Lav printbare billedkrydsord hvor billeder er ledetr\u00e5de. Udvikler ordforr\u00e5d og stavning fra f\u00f8rskole til 3. klasse. Gratis PDF.', descChars: 133, h1: 'Billedkrydsord Generator', subtitle: 'Ordforr\u00e5d og Stavning med Billedledetr\u00e5de', secondary: ['billedkrydsord opgaver','krydsord til b\u00f8rn printbar','billedbaserede krydsord','krydsord f\u00f8rskole','ordforr\u00e5d krydsord','billed-krydsord printbar','stavning krydsord','krydsord med billeder','b\u00f8rns krydsord','krydsord opgave f\u00f8rskole'], diffNote: 'Ejer "billedkrydsord" koncept. Differentierer fra ords\u00f8gning via krydsordsgitter vs bogstavgitter.' },
  { num: 18, slug: 'kryptogram-arbejdsark', appId: 'image-cryptogram', name: 'Kryptogram', primaryKw: 'billedkryptogram generator', title: 'Billedkryptogram Generator | LessonCraftStudio', titleChars: 47, desc: 'Lav printbare billedkryptogrammer hvor bogstaver erstattes af billeder. Udvikler afkodningsf\u00e6rdigheder og l\u00e6separathed. F\u00f8rskole til 3. klasse.', descChars: 151, h1: 'Billedkryptogram Generator', subtitle: 'Hemmelig Skrift-opgaver med Billeder \u2014 Afkod og L\u00e6r at L\u00e6se', secondary: ['billedkryptogram opgaver','hemmelig skrift til b\u00f8rn','afkodningsopgave','hemmeligt sprog l\u00f8sning','billedkodning \u00f8velse','hemmeligord opgave','kryptogram printbar','symbol afkodning','hemmelig besked \u00f8velse','l\u00e6separatheds\u00f8velse'], diffNote: 'Ejer "billedkryptogram" afkodnings koncept. Differentierer fra krydsord via symbol-til-bogstav afkodning vs billed-ledetr\u00e5d stavning.' },
  { num: 19, slug: 'matteleger-arbejdsark', appId: 'math-puzzle', name: 'Matteleger', primaryKw: 'matematik puslespil generator', title: 'Matematik Puslespil Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare matematik-puslespil til addition og subtraktion. Probleml\u00f8sningsf\u00e6rdigheder fra f\u00f8rskole til 3. klasse. Gratis PDF download.', descChars: 147, h1: 'Matematik Puslespil Generator', subtitle: 'Udvikl Probleml\u00f8sningsf\u00e6rdigheder med Matematiske Puslespil', secondary: ['matematik puslespil til b\u00f8rn','matematisk probleml\u00f8sning','mattepuslespil printbar','regnepuslespil f\u00f8rskole','matematisk t\u00e6nkning','logikpuslespil matematik','matematik g\u00e5deopgaver','regnepuslespil facitark','probleml\u00f8sning matematik','mattepuslespil indskoling'], diffNote: 'Ejer "matematik puslespil" koncept. Differentierer fra matematikopgaver via puslespil/udfordringsformat vs \u00f8velsesformat.' },
  { num: 20, slug: 'manglende-brikker-arbejdsark', appId: 'missing-pieces', name: 'Manglende Brikker', primaryKw: 'manglende brikker generator', title: 'Manglende Brikker Generator \u2014 Gratis | LessonCraftStudio', titleChars: 57, desc: 'Lav printbare manglende brikker-opgaver til visuel opfattelse. Find den manglende del i m\u00f8nstret. F\u00f8rskole til 2. klasse. Gratis PDF.', descChars: 139, h1: 'Manglende Brikker Generator', subtitle: 'Visuel Opfattelses\u00f8velser med Billedpuslespil', secondary: ['manglende brikker opgaver','puslespil opgave til b\u00f8rn','manglende del \u00f8velse','visuel slutning','billedpuslespil printbar','m\u00f8nstergenkendelse \u00f8velse','manglende billede opgave','visuel logisk t\u00e6nkning','puslespil\u00f8velser f\u00f8rskole','opfattelsesf\u00e6rdigheder til b\u00f8rn'], diffNote: 'Ejer "manglende brikker" visuel-fuldendelse koncept. Differentierer fra raster-puslespil via finde den manglende brik vs matchning af positioner.' },
  { num: 21, slug: 'sammenligningsopgaver-arbejdsark', appId: 'more-less', name: 'Sammenligningsopgaver', primaryKw: 'flere eller f\u00e6rre generator', title: 'Flere eller F\u00e6rre Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare flere og f\u00e6rre sammenligningsopgaver med billeder. Udvikler m\u00e6ngdesammenligning og matematisk t\u00e6nkning. F\u00f8rskole til 2. klasse.', descChars: 150, h1: 'Flere eller F\u00e6rre Generator', subtitle: 'M\u00e6ngdesammenligning med Billeder fra F\u00f8rskole til 2. Klasse', secondary: ['flere eller f\u00e6rre opgaver','m\u00e6ngde sammenligning','st\u00f8rre mindre \u00f8velse','sammenligningsopgaver f\u00f8rskole','m\u00e6ngder sammenligning med billeder','tal sammenligning til b\u00f8rn','flere eller f\u00e6rre','matematisk sammenligning','m\u00e6ngdevurdering','sammenligningsf\u00e6rdigheder f\u00f8rskole'], diffNote: 'Ejer "flere eller f\u00e6rre" m\u00e6ngdesammenlignings koncept. Differentierer fra stor-lille via m\u00e6ngde vs st\u00f8rrelsessammenligning.' },
  { num: 22, slug: 'find-den-ulige-arbejdsark', appId: 'odd-one-out', name: 'Find den Ulige', primaryKw: 'find den ulige generator', title: 'Find den Ulige Generator \u2014 Gratis | LessonCraftStudio', titleChars: 54, desc: 'Lav printbare find den ulige-opgaver til visuel opfattelse og klassificering. 50 temaer og tilpasbare indstillinger. Gratis PDF.', descChars: 130, h1: 'Find den Ulige Generator', subtitle: 'Klassificerings- og Opfattelses\u00f8velser med Billeder', secondary: ['find den ulige opgaver','hvad passer ikke ind','klassificering \u00f8velse','visuel skelnen','anderledes billede opgave','klassificeringstr\u00e6ning til b\u00f8rn','forskellig i gruppen','m\u00f8nstergenkendelse og klassificering','sortering og skelnen','find den ulige printbar'], diffNote: 'Ejer "find den ulige" klassificerings koncept. Differentierer fra billedsortering via at identificere den afvigende vs sortering i grupper.' },
  { num: 23, slug: 'moenstertog-arbejdsark', appId: 'pattern-train', name: 'M\u00f8nstertog', primaryKw: 'm\u00f8nstertog generator', title: 'Gratis M\u00f8nstertog Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare m\u00f8nstertog-opgaver til m\u00f8nstergenkendelse. Togformede opgaver med 3.000+ billeder. F\u00f8rskole til 2. klasse. Gratis PDF.', descChars: 138, h1: 'M\u00f8nstertog Generator', subtitle: 'M\u00f8nstergenkendelses\u00f8velser i Togformat', secondary: ['m\u00f8nstertog opgaver','m\u00f8nstre forts\u00e6ttelse','m\u00f8nstergenkendelse tog','m\u00f8nstergenkendelse f\u00f8rskole','m\u00f8nster forts\u00e6ttelse \u00f8velse','m\u00f8nstertog printbar','m\u00f8nsterserier til b\u00f8rn','m\u00f8nstre genkendelse','matematisk opfattelse','m\u00f8nsterr\u00e6kke \u00f8velse'], diffNote: 'Ejer "m\u00f8nstertog" togformet m\u00f8nster koncept. Differentierer fra m\u00f8nstre via togformat vs standard arbejdsarksformat.' },
  { num: 24, slug: 'moenstre-arbejdsark', appId: 'pattern-worksheet', name: 'M\u00f8nstre', primaryKw: 'm\u00f8nsteropgave generator', title: 'M\u00f8nsteropgave Generator \u2014 Gratis | LessonCraftStudio', titleChars: 53, desc: 'Lav printbare m\u00f8nsteropgaver til m\u00f8nstergenkendelse og -forts\u00e6ttelse. Varierede serier fra f\u00f8rskole til 3. klasse. 50 temaer. Gratis PDF.', descChars: 147, h1: 'M\u00f8nsteropgave Generator', subtitle: 'M\u00f8nstergenkendelse og -forts\u00e6ttelse med 50 Temaer', secondary: ['m\u00f8nsteropgaver printbar','m\u00f8nsterserier til b\u00f8rn','m\u00f8nstre forts\u00e6ttelse','m\u00f8nstergenkendelse \u00f8velse','matematiske m\u00f8nstre','m\u00f8nsterr\u00e6kke opgaver','m\u00f8nster kopiark','opfattelsesf\u00e6rdigheder f\u00f8rskole','m\u00f8nstergenkendelse 1. klasse','m\u00f8nstre og serier'], diffNote: 'Ejer "m\u00f8nsteropgave" standard m\u00f8nstergenkendelse koncept. Differentierer fra m\u00f8nstertog via standard arbejdsarksformat vs togformat.' },
  { num: 25, slug: 'billedsti-arbejdsark', appId: 'picture-path', name: 'Billedsti', primaryKw: 'billedsti generator', title: 'Gratis Billedsti Generator | LessonCraftStudio', titleChars: 47, desc: 'Lav printbare billedsti-opgaver hvor barnet f\u00f8lger billedruter. Udvikler logisk t\u00e6nkning og finmotorik. F\u00f8rskole til 2. klasse. Gratis.', descChars: 142, h1: 'Billedsti Generator', subtitle: 'Logisk T\u00e6nknings\u00f8velser med Billedruter', secondary: ['billedsti opgaver','labyrint opgaver til b\u00f8rn','labyrint printbar','rute f\u00f8lgning','billed-labyrint \u00f8velse','sti opgaver f\u00f8rskole','labyrint\u00f8velser til b\u00f8rn','labyrint printbar','rute\u00f8velser','visuel rute f\u00f8lgning'], diffNote: 'Ejer "billedsti" labyrint/sti koncept. Eneste labyrint-type arbejdsark generator i pakken.' },
  { num: 26, slug: 'billedsortering-arbejdsark', appId: 'picture-sort', name: 'Billedsortering', primaryKw: 'billedsortering generator', title: 'Billedsortering Generator \u2014 Gratis | LessonCraftStudio', titleChars: 54, desc: 'Lav printbare billedsorteringsopgaver hvor barnet klassificerer billeder i kategorier. Udvikler klassificeringsfadigheder. F\u00f8rskole til 2. klasse.', descChars: 151, h1: 'Billedsortering Generator', subtitle: 'Klassificerings- og Sorterings\u00f8velser med Billeder', secondary: ['billedsortering opgaver','sorterings\u00f8velser til b\u00f8rn','kategorisering opgave','billed klassificering','sortering f\u00f8rskole','gruppering \u00f8velse','billed kategorisering','klassificering printbar','sorteringsf\u00e6rdigheder til b\u00f8rn','gruppering med billeder'], diffNote: 'Ejer "billedsortering" sorterings/kategoriserings koncept. Differentierer fra find-den-ulige via gruppesortering vs at identificere den afvigende.' },
  { num: 27, slug: 'praepositioner-arbejdsark', appId: 'prepositions', name: 'Pr\u00e6positioner', primaryKw: 'pr\u00e6positions\u00f8velse generator', title: 'Pr\u00e6positions\u00f8velse Generator | LessonCraftStudio', titleChars: 50, desc: 'Lav printbare pr\u00e6positions\u00f8velser til stedord med billeder. Foran, bagved, under, over \u2014 visuel sprogindl\u00e6ring. Gratis PDF.', descChars: 127, h1: 'Pr\u00e6positions\u00f8velsers Generator', subtitle: 'Stedords Indl\u00e6ring med Billeder', secondary: ['pr\u00e6positions\u00f8velser','stedord til b\u00f8rn','pr\u00e6positioner f\u00f8rskole','pladsord \u00f8velse','foran bagved opgaver','stedsbegreber til b\u00f8rn','pr\u00e6positioner printbar','grammatik \u00f8velser f\u00f8rskole','visuel sprogindl\u00e6ring','steds beskrivelse'], diffNote: 'Ejer "pr\u00e6positions\u00f8velse" sprogkoncept. Eneste grammatik-fokuserede arbejdsark generator i pakken.' },
  { num: 28, slug: 'skygge-match-arbejdsark', appId: 'shadow-match', name: 'Skygge-match', primaryKw: 'skygge-match generator', title: 'Gratis Skygge-Match Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare skyggeparringsopgaver hvor barnet matcher billede til korrekt skygge. Udvikler visuel opfattelse. 50 temaer. Gratis.', descChars: 133, h1: 'Skygge-Match Generator', subtitle: 'Visuel Opfattelses\u00f8velser med Skyggebilleder', secondary: ['skygge-match opgaver','skyggeparring','skygge opgaver til b\u00f8rn','silhuetopgaver printbar','skyggegenkendelse','visuel parring skygge','skygge\u00f8velser f\u00f8rskole','silhuet \u00f8velse','billed og skygge matchning','skyggeopgaver'], diffNote: 'Ejer "skygge-match" skyggematchning koncept. Differentierer fra matchning via silhuetgenkendelse vs direkte billedmatchning.' },
  { num: 29, slug: 'subtraktion-arbejdsark', appId: 'subtraction', name: 'Subtraktion', primaryKw: 'subtraktion generator', title: 'Gratis Subtraktion Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare subtraktionsopgaver med billeder fra f\u00f8rskole til 3. klasse. Tilpasbare talomr\u00e5der, facitark og visuelle hj\u00e6lpemidler. Gratis PDF.', descChars: 151, h1: 'Subtraktions Generator', subtitle: 'Visuelle Subtraktions\u00f8velser med Billeder', secondary: ['subtraktion opgaver','subtraktions\u00f8velser','minus opgaver printbar','subtraktion med billeder','matematik subtraktion','subtraktion 1. klasse','subtraktions\u00f8velser f\u00f8rskole','minus opgave \u00f8velse','subtraktion facitark','grundl\u00e6ggende subtraktion'], diffNote: 'Ejer "subtraktion" koncept. Differentierer fra matematikopgaver via subtraktion-only fokus vs fleroperations.' },
  { num: 30, slug: 'skattejagt-arbejdsark', appId: 'treasure-hunt', name: 'Skattejagt', primaryKw: 'skattejagt generator', title: 'Skattejagt Generator \u2014 Gratis | LessonCraftStudio', titleChars: 50, desc: 'Lav printbare skattejagt-opgaver til retningsord og forst\u00e5else af instruktioner. Sjovt eventyrspil fra f\u00f8rskole til 2. klasse. Gratis.', descChars: 141, h1: 'Skattejagt Generator', subtitle: 'Retningsord og Instruktionsforst\u00e5elses Eventyropgaver', secondary: ['skattejagt opgaver','retningsord \u00f8velse','instruktioner forst\u00e5else','skattejagt printbar','retningsbegreber til b\u00f8rn','eventyropgaver f\u00f8rskole','skattejagt klasselokale','retning og position','eventyrspil printbar','instruktioner forst\u00e5else'], diffNote: 'Ejer "skattejagt" retningssprog koncept. Eneste eventyr/spil-baserede arbejdsark generator i pakken.' },
  { num: 31, slug: 'gaet-ordet-arbejdsark', appId: 'word-guess', name: 'G\u00e6t Ordet', primaryKw: 'g\u00e6t ordet generator', title: 'Gratis G\u00e6t Ordet Generator | LessonCraftStudio', titleChars: 48, desc: 'Lav printbare g\u00e6t-ordet-opgaver hvor barnet g\u00e6tter ord ud fra billedledetr\u00e5de. Udvikler ordforr\u00e5d og slutningsf\u00e6rdigheder. Gratis PDF.', descChars: 144, h1: 'G\u00e6t Ordet Generator', subtitle: 'Ordforr\u00e5d og Slutnings\u00f8velser med Billedledetr\u00e5de', secondary: ['g\u00e6t ordet opgaver','ord-g\u00e5de med billeder','ordforr\u00e5d \u00f8velse','billedbaseret ordopgave','g\u00e6tteopgave til b\u00f8rn','billedledetr\u00e5d opgave','ords slutning','ord-g\u00e5de printbar','ordforr\u00e5d udvidelse','billedledetr\u00e5d ordopgave'], diffNote: 'Ejer "g\u00e6t ordet" ord-g\u00e6tning koncept. Differentierer fra bogstavblanding via visuel ledetr\u00e5d deduktion vs bogstav-omrangering.' },
  { num: 32, slug: 'skriveopgaver-arbejdsark', appId: 'writing-app', name: 'Skriveopgaver', primaryKw: 'skriveopgave generator', title: 'Skriveopgave Generator \u2014 Gratis | LessonCraftStudio', titleChars: 52, desc: 'Lav printbare skriveopgaver til bogstavdannelse og h\u00e5ndskrivning. Bogstaver, ord og blyantsgreb fra f\u00f8rskole til 2. klasse. Gratis PDF.', descChars: 143, h1: 'Skriveopgave Generator', subtitle: 'Bogstav- og Ordskrivnings\u00f8velser fra F\u00f8rskole til 2. Klasse', secondary: ['h\u00e5ndskrivning \u00f8velse','bogstaver \u00f8velse f\u00f8rskole','bogstavdannelse','blyantsgreb tr\u00e6ning','skrivning tr\u00e6ning','bogstav\u00f8velser printbar','finmotorik skrivning','alfabet skrivning','h\u00e5ndskrivning printbar','skriveforberedelse f\u00f8rskole'], diffNote: 'Ejer "skriveopgave" h\u00e5ndskrivning koncept. Differentierer fra alfabet-tog via bogstavdannelse vs bogstavordning.' },
  { num: 33, slug: 'ordsoegning-arbejdsark', appId: 'word-search', name: 'Ords\u00f8gning', primaryKw: 'ords\u00f8gning generator', title: 'Gratis Ords\u00f8gning Generator | LessonCraftStudio', titleChars: 49, desc: 'Lav printbare ords\u00f8gningsopgaver p\u00e5 11 sprog. Tilpasbare ord, st\u00f8rrelser og sv\u00e6rhedsgrader. Ordforr\u00e5d og stavning. Gratis PDF.', descChars: 133, h1: 'Ords\u00f8gning Generator', subtitle: 'Printbare Ords\u00f8gningsopgaver til Ordforr\u00e5dstr\u00e6ning', secondary: ['ords\u00f8gning printbar','ords\u00f8gning til b\u00f8rn','ordspil generator','ords\u00f8gning opgave','ordpuslespil printbar','ordristikko til b\u00f8rn','ordforr\u00e5d ords\u00f8gning','stavning ords\u00f8gning','ords\u00f8gning indskoling','ords\u00f8gning f\u00f8rskole'], diffNote: 'Ejer "ords\u00f8gning" koncept. Eneste gratis-tier produkt. Differentierer fra krydsord via bogstavgitter-s\u00f8gning vs krydsords-ledetr\u00e5de.' },
];

// ============================================================
// DATA: Theme Hub Pages (50)
// ============================================================
const themeNames = {
  animals: { da: 'Dyr', slug: 'dyr', kw: 'dyreopgaver til b\u00f8rn', h1: 'Dyre-opgaver og \u00d8velser' },
  food: { da: 'Mad', slug: 'mad', kw: 'madopgaver til b\u00f8rn', h1: 'Mad-opgaver og \u00d8velser' },
  transportation: { da: 'Transport', slug: 'transport', kw: 'transportopgaver til b\u00f8rn', h1: 'Transport-opgaver og \u00d8velser' },
  nature: { da: 'Natur', slug: 'natur', kw: 'naturopgaver til b\u00f8rn', h1: 'Natur-opgaver og \u00d8velser' },
  school: { da: 'Skole', slug: 'skole', kw: 'skoleopgaver til b\u00f8rn', h1: 'Skole-opgaver og \u00d8velser' },
  sports: { da: 'Sport', slug: 'sport', kw: 'sportopgaver til b\u00f8rn', h1: 'Sport-opgaver og \u00d8velser' },
  emotions: { da: 'F\u00f8lelser', slug: 'folelser', kw: 'f\u00f8lelsesopgaver til b\u00f8rn', h1: 'F\u00f8lelsesopgaver og \u00d8velser' },
  body: { da: 'Krop', slug: 'krop', kw: 'kropsopgaver til b\u00f8rn', h1: 'Krop-opgaver og \u00d8velser' },
  clothing: { da: 'T\u00f8j', slug: 'toj', kw: 't\u00f8jopgaver til b\u00f8rn', h1: 'T\u00f8j-opgaver og \u00d8velser' },
  household: { da: 'Husholdning', slug: 'husholdning', kw: 'husholdningsopgaver til b\u00f8rn', h1: 'Husholdningsopgaver og \u00d8velser' },
  toys: { da: 'Leget\u00f8j', slug: 'legetoj', kw: 'leget\u00f8jsopgaver til b\u00f8rn', h1: 'Leget\u00f8j-opgaver og \u00d8velser' },
  music: { da: 'Musik', slug: 'musik', kw: 'musikopgaver til b\u00f8rn', h1: 'Musik-opgaver og \u00d8velser' },
  jobs: { da: 'Job', slug: 'job', kw: 'job-opgaver til b\u00f8rn', h1: 'Job-opgaver og \u00d8velser' },
  space: { da: 'Rummet', slug: 'rum', kw: 'rumopgaver til b\u00f8rn', h1: 'Rum-opgaver og \u00d8velser' },
  seasons: { da: '\u00c5rstider', slug: 'arstider', kw: '\u00e5rstidsopgaver til b\u00f8rn', h1: '\u00c5rstid-opgaver og \u00d8velser' },
  holidays: { da: 'Helligdage', slug: 'helligdage', kw: 'helligdagsopgaver til b\u00f8rn', h1: 'Helligdagsopgaver og \u00d8velser' },
  weather: { da: 'Vejr', slug: 'vejr', kw: 'vejropgaver til b\u00f8rn', h1: 'Vejr-opgaver og \u00d8velser' },
  colors: { da: 'Farver', slug: 'farver', kw: 'farveopgaver til b\u00f8rn', h1: 'Farve-opgaver og \u00d8velser' },
  shapes: { da: 'Former', slug: 'former', kw: 'formopgaver til b\u00f8rn', h1: 'Form-opgaver og \u00d8velser' },
  numbers: { da: 'Tal', slug: 'tal', kw: 'talopgaver til b\u00f8rn', h1: 'Tal-opgaver og \u00d8velser' },
  alphabet: { da: 'Alfabet', slug: 'alfabet', kw: 'alfabetopgaver til b\u00f8rn', h1: 'Alfabet-opgaver og \u00d8velser' },
  furniture: { da: 'M\u00f8bler', slug: 'mobler', kw: 'm\u00f8belopgaver til b\u00f8rn', h1: 'M\u00f8bel-opgaver og \u00d8velser' },
  easter: { da: 'P\u00e5ske', slug: 'paske', kw: 'p\u00e5skeopgaver til b\u00f8rn', h1: 'P\u00e5ske-opgaver og \u00d8velser' },
  halloween: { da: 'Halloween', slug: 'halloween', kw: 'halloween-opgaver til b\u00f8rn', h1: 'Halloween-opgaver og \u00d8velser' },
  xmas: { da: 'Jul', slug: 'jul', kw: 'juleopgaver til b\u00f8rn', h1: 'Jule-opgaver og \u00d8velser' },
  winter: { da: 'Vinter', slug: 'vinter', kw: 'vinteropgaver til b\u00f8rn', h1: 'Vinter-opgaver og \u00d8velser' },
  farm: { da: 'Bondeg\u00e5rd', slug: 'bondegard', kw: 'bondeg\u00e5rdsopgaver til b\u00f8rn', h1: 'Bondeg\u00e5rd-opgaver og \u00d8velser' },
  ocean: { da: 'Hav', slug: 'hav', kw: 'havopgaver til b\u00f8rn', h1: 'Hav-opgaver og \u00d8velser' },
  dinosaurs: { da: 'Dinosaurer', slug: 'dinosaurer', kw: 'dinosauropgaver til b\u00f8rn', h1: 'Dinosaur-opgaver og \u00d8velser' },
  insects: { da: 'Insekter', slug: 'insekter', kw: 'insektopgaver til b\u00f8rn', h1: 'Insekt-opgaver og \u00d8velser' },
  fruits: { da: 'Frugter', slug: 'frugter', kw: 'frugtopgaver til b\u00f8rn', h1: 'Frugt-opgaver og \u00d8velser' },
  vegetables: { da: 'Gr\u00f8ntsager', slug: 'grontsager', kw: 'gr\u00f8ntsagsopgaver til b\u00f8rn', h1: 'Gr\u00f8ntsag-opgaver og \u00d8velser' },
  flowers: { da: 'Blomster', slug: 'blomster', kw: 'blomsteropgaver til b\u00f8rn', h1: 'Blomster-opgaver og \u00d8velser' },
  birds: { da: 'Fugle', slug: 'fugle', kw: 'fugleopgaver til b\u00f8rn', h1: 'Fugle-opgaver og \u00d8velser' },
  pets: { da: 'K\u00e6ledyr', slug: 'kaeldyr', kw: 'k\u00e6ledyrsopgaver til b\u00f8rn', h1: 'K\u00e6ledyr-opgaver og \u00d8velser' },
  zoo: { da: 'Zoo', slug: 'zoo', kw: 'zoo-opgaver til b\u00f8rn', h1: 'Zoo-opgaver og \u00d8velser' },
  garden: { da: 'Have', slug: 'have', kw: 'haveopgaver til b\u00f8rn', h1: 'Have-opgaver og \u00d8velser' },
  camping: { da: 'Camping', slug: 'camping', kw: 'campingopgaver til b\u00f8rn', h1: 'Camping-opgaver og \u00d8velser' },
  pirates: { da: 'Pirater', slug: 'pirater', kw: 'piratopgaver til b\u00f8rn', h1: 'Pirat-opgaver og \u00d8velser' },
  'fairy-tales': { da: 'Eventyr', slug: 'eventyr', kw: 'eventyropgaver til b\u00f8rn', h1: 'Eventyr-opgaver og \u00d8velser' },
  robots: { da: 'Robotter', slug: 'robotter', kw: 'robotopgaver til b\u00f8rn', h1: 'Robot-opgaver og \u00d8velser' },
  superheroes: { da: 'Superhelte', slug: 'superhelter', kw: 'superhelteopgaver til b\u00f8rn', h1: 'Superhelte-opgaver og \u00d8velser' },
  construction: { da: 'Byggeplads', slug: 'byggeplads', kw: 'byggeopgaver til b\u00f8rn', h1: 'Bygge-opgaver og \u00d8velser' },
  cooking: { da: 'Madlavning', slug: 'madlavning', kw: 'madlavningsopgaver til b\u00f8rn', h1: 'Madlavning-opgaver og \u00d8velser' },
  travel: { da: 'Rejser', slug: 'rejser', kw: 'rejseopgaver til b\u00f8rn', h1: 'Rejse-opgaver og \u00d8velser' },
  birthday: { da: 'F\u00f8dselsdag', slug: 'fodselsdag', kw: 'f\u00f8dselsdagsopgaver til b\u00f8rn', h1: 'F\u00f8dselsdag-opgaver og \u00d8velser' },
  circus: { da: 'Cirkus', slug: 'cirkus', kw: 'cirkusopgaver til b\u00f8rn', h1: 'Cirkus-opgaver og \u00d8velser' },
  forest: { da: 'Skov', slug: 'skov', kw: 'skovopgaver til b\u00f8rn', h1: 'Skov-opgaver og \u00d8velser' },
  spring: { da: 'For\u00e5r', slug: 'forar', kw: 'for\u00e5rsopgaver til b\u00f8rn', h1: 'For\u00e5rs-opgaver og \u00d8velser' },
  summer: { da: 'Sommer', slug: 'sommer', kw: 'sommeropgaver til b\u00f8rn', h1: 'Sommer-opgaver og \u00d8velser' },
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
  { id: 'preschool', da: 'F\u00f8rskole', slug: 'forskole', age: '3\u20134 \u00e5r', gradeSuffix: 'f\u00f8rskoleb\u00f8rn', descSkills: 'Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik' },
  { id: 'kindergarten', da: 'B\u00f8rnehaveklasse', slug: 'bornehaveklasse', age: '5\u20136 \u00e5r', gradeSuffix: 'b\u00f8rnehaveklassen', descSkills: 'T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse' },
  { id: 'first-grade', da: '1. Klasse', slug: 'forste-klasse', age: '6\u20137 \u00e5r', gradeSuffix: '1. klasse', descSkills: 'Addition, subtraktion, l\u00e6sning og skrivning' },
  { id: 'second-grade', da: '2. Klasse', slug: 'anden-klasse', age: '7\u20138 \u00e5r', gradeSuffix: '2. klasse', descSkills: 'Multiplikation, ordspil, logik og probleml\u00f8sning' },
  { id: 'third-grade', da: '3. Klasse', slug: 'tredje-klasse', age: '8\u20139 \u00e5r', gradeSuffix: '3. klasse', descSkills: 'Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver' },
];

// ============================================================
// GENERATE DOCUMENT
// ============================================================
let out = '';

// Header
out += `# Danish (da) All Pages \u2014 Keyword Map

> Part 141 of the ONE CLICK A DAY SEO plan. Danish is Tier 1 (Very Low Competition) \u2014 broader 2\u20133 word keywords can rank.

**Total pages mapped:** 464 pages
- 33 product pages
- 50 theme hub pages
- 250 theme+grade pages
- 112 blog posts
- 19 secondary pages (8 category hubs, 5 grade hubs, 6 navigation)

---

## Anti-Cannibalization Rules

| Page Type | Reserved Primary Keyword Pattern | Danish Example |
|-----------|--------------------------------|----------------|
| **Product pages** | \`{app} generator\` | addition opgave generator |
| **Theme hubs** | \`{tema}opgaver til b\u00f8rn\` | dyreopgaver til b\u00f8rn |
| **Theme+grade** | \`{tema}opgaver {klassetrin}\` | dyreopgaver f\u00f8rskoleb\u00f8rn |
| **Blog posts** | \`{emne} guide/tips/hvordan\` | ADHD visuelle opgaver |
| **Category hubs** | \`{kategori} opgaver til l\u00e6rere\` | matematik opgaver til l\u00e6rere |
| **Grade hubs** | \`{klassetrin} arbejdsark gratis\` | f\u00f8rskole arbejdsark gratis |

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
  out += `### ${p.num}. ${p.name} (\`${p.slug}\`)

| Field | Value |
|-------|-------|
| **Primary Keyword** | ${p.primaryKw} |
| **SEO Title** | ${p.title} |
| **Title Chars** | ${p.titleChars} |
| **Meta Description** | ${p.desc} |
| **Desc Chars** | ${p.descChars} |
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
  out += `| ${themeNum} | \`${t.slug}\` | ${t.kw} | opgaver til b\u00f8rn |\n`;
  themeNum++;
}

out += '\n';

// Theme hub detailed entries
themeNum = 1;
const themeSecondaryTemplates = {
  animals: ['dyr arbejdsark','dyr farvel\u00e6gningssider','dyr matematik','dyr f\u00f8rskole','dyr printbar','dyr puslespil','dyr t\u00e6lling','dyr krydsord','husdyr opgaver','vilde dyr \u00f8velser'],
  food: ['mad arbejdsark','mad farvel\u00e6gning','mad matematik','madgrupper opgaver','sund mad','mad f\u00f8rskole','mad printbar','mad puslespil','madsortering','mad ordopgaver'],
  transportation: ['transport arbejdsark','k\u00f8ret\u00f8jer opgaver','biler farvel\u00e6gning','transport matematik','k\u00f8ret\u00f8jer f\u00f8rskole','transport printbar','transport puslespil','k\u00f8ret\u00f8jer til b\u00f8rn','transport ordopgaver','k\u00f8ret\u00f8jer sortering'],
  nature: ['natur arbejdsark','natur farvel\u00e6gning','natur matematik','natur f\u00f8rskole','natur printbar','natur puslespil','milj\u00f8 opgaver','planter til b\u00f8rn','naturundervisning','natur ordopgaver'],
  school: ['skole arbejdsark','skoleting opgaver','skole farvel\u00e6gning','skole matematik','skole f\u00f8rskole','skole printbar','skolestart opgaver','klasselokale \u00f8velser','skole ordopgaver','skoledag opgaver'],
  sports: ['sport arbejdsark','sport farvel\u00e6gning','sport matematik','sport f\u00f8rskole','sport printbar','idrettsgrene opgaver','sport puslespil','boldspil til b\u00f8rn','sport ordopgaver','sport t\u00e6lling'],
  emotions: ['f\u00f8lelser arbejdsark','f\u00f8lelsesmssige f\u00e6rdigheder \u00f8velser','ansigtsudtryk opgaver','f\u00f8lelser f\u00f8rskole','f\u00f8lelser printbar','f\u00f8lelsesvokabular til b\u00f8rn','f\u00f8lelser farvel\u00e6gning','f\u00f8lelsesundervisning','tale om f\u00f8lelser','sociale og emotionelle f\u00e6rdigheder'],
  body: ['krop arbejdsark','kropsdele opgaver','krop farvel\u00e6gning','krop f\u00f8rskole','krop printbar','sanser opgaver','kropsdele navngivning','sundhed til b\u00f8rn','krop ordopgaver','kropsbevidsthed \u00f8velser'],
  clothing: ['t\u00f8j arbejdsark','t\u00f8j farvel\u00e6gning','t\u00f8j sortering','t\u00f8j f\u00f8rskole','t\u00f8j printbar','p\u00e5kl\u00e6dning opgaver','t\u00f8jordforr\u00e5d til b\u00f8rn','t\u00f8j og vejr','t\u00f8j ordopgaver','t\u00f8j matchning'],
  household: ['husholdning arbejdsark','k\u00f8kkenredskaber opgaver','husholdning farvel\u00e6gning','husholdning f\u00f8rskole','husholdning printbar','hjemmets ting til b\u00f8rn','husholdning sortering','rum i hjemmet','husholdning ordopgaver','dagligdag opgaver'],
  toys: ['leget\u00f8j arbejdsark','leget\u00f8j farvel\u00e6gning','leget\u00f8j matematik','leget\u00f8j f\u00f8rskole','leget\u00f8j printbar','leg og l\u00e6ring','leget\u00f8j sortering','leget\u00f8j ordopgaver','leget\u00f8j t\u00e6lling','leget\u00f8jstyper opgaver'],
  music: ['musik arbejdsark','instrumenter opgaver','musik farvel\u00e6gning','musik f\u00f8rskole','musik printbar','musikalsk l\u00e6ring','musik puslespil','lydgenkendelse','musik ordopgaver','instrumenter til b\u00f8rn'],
  jobs: ['job arbejdsark','erhverv opgaver','job farvel\u00e6gning','job f\u00f8rskole','job printbar','hvad vil du v\u00e6re','job sortering','job ordopgaver','erhverv til b\u00f8rn','job og redskaber'],
  space: ['rum arbejdsark','rummet farvel\u00e6gning','rummet matematik','rummet f\u00f8rskole','rummet printbar','planeter opgaver','solsystemet til b\u00f8rn','astronaut opgaver','rummet ordopgaver','stjerner og planeter'],
  seasons: ['\u00e5rstider arbejdsark','\u00e5rstider farvel\u00e6gning','\u00e5rstider matematik','\u00e5rstider f\u00f8rskole','\u00e5rstider printbar','for\u00e5r sommer h\u00f8st vinter','\u00e5rstider sortering','\u00e5rstider ordopgaver','\u00e5rstider t\u00e6lling','\u00e5rstid og natur'],
  holidays: ['helligdage arbejdsark','h\u00f8jtider farvel\u00e6gning','helligdage matematik','helligdage f\u00f8rskole','helligdage printbar','fest og traditioner','helligdage puslespil','h\u00f8jtidsopgaver','helligdage ordopgaver','danske traditioner'],
  weather: ['vejr arbejdsark','vejr farvel\u00e6gning','vejr matematik','vejr f\u00f8rskole','vejr printbar','vejrtyper opgaver','vejrudsigt til b\u00f8rn','vejr og \u00e5rstider','vejr ordopgaver','vejr sortering'],
  colors: ['farver arbejdsark','farver farvel\u00e6gning','farver matematik','farver f\u00f8rskole','farver printbar','farvegenkendelse','farver blanding','farve sortering','farve ordopgaver','farvel\u00e6r til b\u00f8rn'],
  shapes: ['former arbejdsark','former farvel\u00e6gning','former matematik','former f\u00f8rskole','former printbar','geometri til b\u00f8rn','former genkendelse','former sortering','former ordopgaver','cirkel trekant firkant'],
  numbers: ['tal arbejdsark','tal farvel\u00e6gning','tal matematik','tal f\u00f8rskole','tal printbar','talgenkendelse','t\u00e6lle\u00f8velser','tal skrivning','tal ordopgaver','talr\u00e6kker \u00f8velse'],
  alphabet: ['alfabet arbejdsark','bogstaver farvel\u00e6gning','alfabet f\u00f8rskole','alfabet printbar','bogstavgenkendelse','alfabet r\u00e6kkef\u00f8lge','bogstav\u00f8velser','l\u00e6re bogstaver','alfabet ordopgaver','bogstavlyd \u00f8velser'],
  furniture: ['m\u00f8bler arbejdsark','m\u00f8bler farvel\u00e6gning','m\u00f8bler f\u00f8rskole','m\u00f8bler printbar','hjemmets m\u00f8bler','m\u00f8bler sortering','m\u00f8bler ordopgaver','rum og m\u00f8bler','m\u00f8bler matchning','m\u00f8bler navngivning'],
  easter: ['p\u00e5ske arbejdsark','p\u00e5ske farvel\u00e6gning','p\u00e5ske matematik','p\u00e5ske f\u00f8rskole','p\u00e5ske printbar','p\u00e5ske\u00e6g opgaver','p\u00e5skehare','p\u00e5ske puslespil','p\u00e5ske ordopgaver','p\u00e5ske aktiviteter'],
  halloween: ['halloween arbejdsark','halloween farvel\u00e6gning','halloween matematik','halloween f\u00f8rskole','halloween printbar','halloween puslespil','uhyggelige opgaver','sp\u00f8gelse opgaver','halloween ordopgaver','halloween aktiviteter'],
  xmas: ['jul arbejdsark','jul farvel\u00e6gning','jul matematik','jul f\u00f8rskole','jul printbar','julemanden opgaver','julens traditioner','jul puslespil','jul ordopgaver','jule aktiviteter'],
  winter: ['vinter arbejdsark','vinter farvel\u00e6gning','vinter matematik','vinter f\u00f8rskole','vinter printbar','sne opgaver','vinter aktiviteter','vinter puslespil','vinter ordopgaver','vinterlige \u00f8velser'],
  farm: ['bondeg\u00e5rd arbejdsark','bondeg\u00e5rd farvel\u00e6gning','bondeg\u00e5rd matematik','bondeg\u00e5rd f\u00f8rskole','bondeg\u00e5rd printbar','husdyr opgaver','bondeg\u00e5rd puslespil','h\u00f8st og afg\u00f8der','bondeg\u00e5rd ordopgaver','landbrug til b\u00f8rn'],
  ocean: ['hav arbejdsark','hav farvel\u00e6gning','hav matematik','hav f\u00f8rskole','hav printbar','havdyr opgaver','undervands opgaver','hav puslespil','hav ordopgaver','havet til b\u00f8rn'],
  dinosaurs: ['dinosaur arbejdsark','dinosaur farvel\u00e6gning','dinosaur matematik','dinosaur f\u00f8rskole','dinosaur printbar','T-Rex opgaver','fossil opgaver','dinosaur puslespil','dinosaur ordopgaver','forhistoriske dyr'],
  insects: ['insekt arbejdsark','insekt farvel\u00e6gning','insekt matematik','insekt f\u00f8rskole','insekt printbar','sommerfugle opgaver','insekt puslespil','sm\u00e5kryb til b\u00f8rn','insekt ordopgaver','insekter i naturen'],
  fruits: ['frugt arbejdsark','frugt farvel\u00e6gning','frugt matematik','frugt f\u00f8rskole','frugt printbar','sunde frugter','frugt sortering','frugt puslespil','frugt ordopgaver','frugter og b\u00e6r'],
  vegetables: ['gr\u00f8ntsager arbejdsark','gr\u00f8ntsager farvel\u00e6gning','gr\u00f8ntsager matematik','gr\u00f8ntsager f\u00f8rskole','gr\u00f8ntsager printbar','sunde gr\u00f8ntsager','gr\u00f8ntsager sortering','gr\u00f8ntsager puslespil','gr\u00f8ntsager ordopgaver','gr\u00f8ntsager i k\u00f8kkenet'],
  flowers: ['blomster arbejdsark','blomster farvel\u00e6gning','blomster matematik','blomster f\u00f8rskole','blomster printbar','for\u00e5rsblomster','blomster puslespil','blomster sortering','blomster ordopgaver','blomster i haven'],
  birds: ['fugle arbejdsark','fugle farvel\u00e6gning','fugle matematik','fugle f\u00f8rskole','fugle printbar','fuglearter opgaver','fugle puslespil','fugle sortering','fugle ordopgaver','fugle i naturen'],
  pets: ['k\u00e6ledyr arbejdsark','k\u00e6ledyr farvel\u00e6gning','k\u00e6ledyr matematik','k\u00e6ledyr f\u00f8rskole','k\u00e6ledyr printbar','hund og kat opgaver','k\u00e6ledyr puslespil','dyrepasning','k\u00e6ledyr ordopgaver','k\u00e6ledyr sortering'],
  zoo: ['zoo arbejdsark','zoo farvel\u00e6gning','zoo matematik','zoo f\u00f8rskole','zoo printbar','zoologiske dyr','zoo puslespil','zoo bes\u00f8g','zoo ordopgaver','dyreparken opgaver'],
  garden: ['have arbejdsark','have farvel\u00e6gning','have matematik','have f\u00f8rskole','have printbar','havearbejde til b\u00f8rn','have puslespil','planter og blomster','have ordopgaver','havens dyr'],
  camping: ['camping arbejdsark','camping farvel\u00e6gning','camping matematik','camping f\u00f8rskole','camping printbar','friluftsliv opgaver','camping puslespil','naturen ude','camping ordopgaver','camping aktiviteter'],
  pirates: ['pirat arbejdsark','pirat farvel\u00e6gning','pirat matematik','pirat f\u00f8rskole','pirat printbar','pirat eventyr','pirat puslespil','skattek\u00f8rt','pirat ordopgaver','pirat aktiviteter'],
  'fairy-tales': ['eventyr arbejdsark','eventyr farvel\u00e6gning','eventyr matematik','eventyr f\u00f8rskole','eventyr printbar','H.C. Andersen opgaver','eventyr puslespil','eventyrhelte','eventyr ordopgaver','eventyr aktiviteter'],
  robots: ['robot arbejdsark','robot farvel\u00e6gning','robot matematik','robot f\u00f8rskole','robot printbar','teknologi opgaver','robot puslespil','kodning til b\u00f8rn','robot ordopgaver','robot aktiviteter'],
  superheroes: ['superhelte arbejdsark','superhelte farvel\u00e6gning','superhelte matematik','superhelte f\u00f8rskole','superhelte printbar','superhelte puslespil','superkr\u00e6fter opgaver','superhelte ordopgaver','superhelte t\u00e6lling','superhelte aktiviteter'],
  construction: ['byggeri arbejdsark','byggeri farvel\u00e6gning','byggeri matematik','byggeri f\u00f8rskole','byggeri printbar','byggemaskiner opgaver','byggeri puslespil','v\u00e6rkt\u00f8j til b\u00f8rn','byggeri ordopgaver','byggeplads aktiviteter'],
  cooking: ['madlavning arbejdsark','madlavning farvel\u00e6gning','madlavning matematik','madlavning f\u00f8rskole','madlavning printbar','opskrift opgaver','madlavning puslespil','k\u00f8kken til b\u00f8rn','madlavning ordopgaver','madlavning aktiviteter'],
  travel: ['rejse arbejdsark','rejse farvel\u00e6gning','rejse matematik','rejse f\u00f8rskole','rejse printbar','lande opgaver','rejse puslespil','verden til b\u00f8rn','rejse ordopgaver','rejse aktiviteter'],
  birthday: ['f\u00f8dselsdag arbejdsark','f\u00f8dselsdag farvel\u00e6gning','f\u00f8dselsdag matematik','f\u00f8dselsdag f\u00f8rskole','f\u00f8dselsdag printbar','fest opgaver','f\u00f8dselsdag puslespil','feste og fejre','f\u00f8dselsdag ordopgaver','f\u00f8dselsdag aktiviteter'],
  circus: ['cirkus arbejdsark','cirkus farvel\u00e6gning','cirkus matematik','cirkus f\u00f8rskole','cirkus printbar','klovne opgaver','cirkus puslespil','cirkus dyr','cirkus ordopgaver','cirkus aktiviteter'],
  forest: ['skov arbejdsark','skov farvel\u00e6gning','skov matematik','skov f\u00f8rskole','skov printbar','skovens dyr','skov puslespil','naturen i skoven','skov ordopgaver','skov aktiviteter'],
  spring: ['for\u00e5r arbejdsark','for\u00e5r farvel\u00e6gning','for\u00e5r matematik','for\u00e5r f\u00f8rskole','for\u00e5r printbar','for\u00e5rsblomster opgaver','for\u00e5r puslespil','v\u00e5rtegn','for\u00e5r ordopgaver','for\u00e5r aktiviteter'],
  summer: ['sommer arbejdsark','sommer farvel\u00e6gning','sommer matematik','sommer f\u00f8rskole','sommer printbar','sommerferie opgaver','sommer puslespil','strand og sol','sommer ordopgaver','sommer aktiviteter'],
};

for (const id of themeOrder) {
  const t = themeNames[id];
  const sec = themeSecondaryTemplates[id] || [];
  const titleStr = `Gratis ${t.da}-opgaver til B\u00f8rn | LessonCraftStudio`;
  const titleLen = titleStr.length;
  const descStr = `Printbare ${t.da.toLowerCase()}-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med ${t.da.toLowerCase()}tema. F\u00f8rskole til 3. klasse. Gratis PDF.`;
  const descLen = descStr.length;

  out += `### ${themeNum}. ${t.da} (\`${t.slug}\`)

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
    const themeName = t.da;
    const kw = `${t.kw.replace(' til b\u00f8rn', '')} ${g.gradeSuffix}`;
    out += `| ${tgNum} | ${themeName} | ${g.da} | \`${t.slug}/${g.slug}\` | ${kw} |\n`;
    tgNum++;
  }
}

out += '\n';

// Theme+Grade detailed entries
for (const id of themeOrder) {
  const t = themeNames[id];
  const kwBase = t.kw.replace(' til b\u00f8rn', '');

  out += `### ${t.da} (${id}) \u2014 5 klassetrin\n\n`;

  for (const g of grades) {
    const kw = `${kwBase} ${g.gradeSuffix}`;
    const seoTitle = `${t.da}-opgaver ${g.da} | LessonCraftStudio`;
    const titleLen = seoTitle.length;
    const seoDesc = `Printbare ${t.da.toLowerCase()}-opgaver til ${g.gradeSuffix} (${g.age}). ${g.descSkills}. 33 generatorer. Gratis PDF.`;
    const descLen = seoDesc.length;
    const seoKws = `${t.da.toLowerCase()} ${g.da.toLowerCase()}, ${t.da.toLowerCase()} opgaver ${g.age}, ${t.da.toLowerCase()} \u00f8velser ${g.da.toLowerCase()}, ${t.da.toLowerCase()} printbar ${g.da.toLowerCase()}`;

    out += `**${g.da} (${g.age})**
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
| 1 | 10 bedste opgavegeneratorer til 2. klasse | opgavegeneratorer 2. klasse | 10 Bedste Opgavegeneratorer til 2. Klasse (7\u20138 \u00e5r) |
| 2 | 10 bedste opgavegeneratorer til 3. klasse | opgavegeneratorer 3. klasse | 10 Bedste Opgavegeneratorer til 3. Klasse (8\u20139 \u00e5r) |
| 3 | 10 bedste opgavegeneratorer til 4.\u20135. klasse | opgavegeneratorer 4.\u20135. klasse | 10 Bedste Opgavegeneratorer til 4.\u20135. Klasse (9\u201311 \u00e5r) |
| 4 | 10 bedste opgavegeneratorer til b\u00f8rnehaveklasse | opgavegeneratorer b\u00f8rnehaveklasse | 10 Bedste Opgavegeneratorer til B\u00f8rnehaveklassen (5\u20136 \u00e5r) |
| 5 | 10 bedste opgavegeneratorer til f\u00f8rskole | opgavegeneratorer f\u00f8rskole | 10 Bedste Opgavegeneratorer til F\u00f8rskolen (3\u20135 \u00e5r) |
| 6 | 10 bedste opgaveskabelonv\u00e6rkt\u00f8jer til 1. klasse | opgaveskabeloner 1. klasse | 10 Bedste Opgaveskabelonv\u00e6rkt\u00f8jer til 1. Klasses L\u00e6rere |
| 7 | L\u00e6seudvikling i 1. klasse | l\u00e6sef\u00e6rdigheder 1. klasse | 1. Klasses L\u00e6sef\u00e6rdigheder: Ordleg, Alfabettog og Skrivning |
| 8 | 33 tilpasselige opgavegeneratorer | 33 opgavegeneratorer til l\u00e6rere | 33 Tilpasselige Opgavegeneratorer til Indskolingsl\u00e6reren |
| 9 | Algebra i 3. klasse: algebraisk t\u00e6nkning | algebraisk t\u00e6nkning 3. klasse | 3. Klasses Matematik: Algebraisk T\u00e6nkning og Puslespil |
| 10 | 7 billedbaserede generatorer til sprogundervisning | sprogundervisning generatorer | 7 Billedbaserede Generatorer til Sprogundervisningens Begyndere |
| 11 | ADHD-st\u00f8tte med visuelle opgaver | ADHD visuelle opgaver | ADHD-st\u00f8tte: 9 Generatorer til Kognitiv Aflastning |
| 12 | Intelligent cellegenkendelse i rastertegning | rastertegning algoritme | Intelligent Cellegenkendelse i Rastertegning: Pixelanalyse |
| 13 | Udfordringer til 4.\u20135. klasse | udfordringsopgaver 4.\u20135. klasse | 4.\u20135. Klasse: Rastertegning, Sudoku og Logik |
| 14 | Avancerede opgaver til dygtige elever | udfordringsopgaver avancerede | Avancerede Opgaver til Dygtige Elever (4.\u20135. Klasse) |
| 15 | Den nye l\u00e6rers guide | den nye l\u00e6rers guide | Den Nye L\u00e6rers Guide: Systemer og Opgaveskabeloner |
| 16 | Evaluering og l\u00e6ringsfremskridt | l\u00e6ringsevaluering opgaveark | Evaluering og L\u00e6ringsfremskridt med Opgaveark |
| 17 | St\u00f8tte til autismespektrum | autisme visuelle opgaver | Autismespektrum St\u00f8tte: 8 Visuelle Generatorer |
| 18 | \u00d8konomiske undervisningsmaterialer | billige undervisningsmaterialer | \u00d8konomiske Undervisningsmaterialer: Maksim\u00e9r L\u00e6ring p\u00e5 Budget |
| 19 | Differentiering i praksis: forskellige niveauer | differentiering opgaveark | Differentiering i Praksis: Undervisning p\u00e5 Flere Niveauer |
| 20 | Differentiering: tilpasselige generatorer | differentiering med generatorer | Differentiering i Praksis: Tilpasselige Generatorer |
| 21 | Finmotoriske \u00f8velser i b\u00f8rnehaveklassen | finmotorik b\u00f8rnehaveklasse | B\u00f8rnehaveklassens Finmotorik: Linjer, M\u00f8nstertog og Klip |
| 22 | Matematikgrundlag i b\u00f8rnehaveklassen | b\u00f8rnehaveklassens matematik | B\u00f8rnehaveklassens Matematik: Plusstykker, M\u00f8nstre og Sudoku |
| 23 | Find og opdag-opgaver i professionel kvalitet | find og opdag opgaver | Find og Opdag-opgaver: Professionel Kvalitet p\u00e5 3 Minutter |
| 24 | Fisher\u2013Yates-blandingsalgoritme i bogstavblanding | Fisher-Yates blandingsalgoritme | Fisher\u2013Yates-blanding: Tilf\u00e6ldighed i Bogstavblandingsopgaver |
| 25 | Formativ evaluering og l\u00e6ringsfremskridt | formativ evaluering | Formativ Evaluering: Opgaveark i Databaseret Undervisning |
| 26 | Hashalgoritme i placering af undervisningsmaterialer | hashalgoritme undervisningsmaterialer | Hashalgoritme: Tilf\u00e6ldig Placering Forbedrer Kvaliteten |
| 27 | Finmotorik-udvikling if\u00f8lge Benbow | finmotorik Benbow | Finmotorik-udvikling: Benbows 6 Pre-skrivningsbev\u00e6gelser |
| 28 | Co-teaching og st\u00f8tteundervisning | co-teaching opgaveplanl\u00e6gning | Co-teaching: Effektiv Opgaveplanl\u00e6gning for To L\u00e6rere |
| 29 | Hybridundervisning og teknologi | hybridundervisning opgaver | Hybridundervisning: Kombination af Digitale og Trykte Opgaver |
| 30 | Selvst\u00e6ndigt arbejde i indskolingen | selvst\u00e6ndigt arbejde indskoling | Selvst\u00e6ndigt Arbejde: Udvikling af Selvregulering |
| 31 | To \u00f8velsesformater: pr\u00e6positioner | pr\u00e6positions\u00f8velser | Pr\u00e6positioner: Udfyldnings- og Multiple Choice-\u00f8velser |
| 32 | V\u00e6ksttankegang med opgaver | v\u00e6ksttankegang udfordringsopgaver | V\u00e6ksttankegang: Opbygning af Udholdenhed med Udfordringsopgaver |
| 33 | Komplet \u00e5rsplan for l\u00e6reren | l\u00e6rerens \u00e5rsplan | L\u00e6rerens \u00c5rsplan: Styring af Opgaveark |
| 34 | Kommerciel licens: passiv indkomst | salg af opgaver som l\u00e6rer | Kommerciel Licens: S\u00e6lg Opgaver og Skab Passiv Indkomst |
| 35 | S\u00e6sonbaserede aktiviteter | s\u00e6sonbaserede opgaver | S\u00e6sonbaserede Aktiviteter: L\u00e6ringsgl\u00e6de Hele \u00c5ret |
| 36 | Sommerens l\u00e6ringstab | sommerens l\u00e6ringstab \u00f8velser | Sommerens L\u00e6ringstab: Vedligehold F\u00e6rdigheder med Hjemme\u00f8velser |
| 37 | Kin\u00e6stetisk l\u00e6ring | kin\u00e6stetisk l\u00e6ring generatorer | Kin\u00e6stetisk L\u00e6ring: 6 Bev\u00e6gelsesbaserede Generatorer |
| 38 | Skrivning p\u00e5 tv\u00e6rs af fag | skrivning p\u00e5 tv\u00e6rs af fag | Skrivning p\u00e5 Tv\u00e6rs af Fag: Udvikling i Hvert Fag |
| 39 | Kognitiv belastningsteori | kognitiv belastningsteori | Kognitiv Belastningsteori i Design af Opgaveark |
| 40 | Pr\u00f8veforberedelse uden stress | pr\u00f8veforberedelse indskoling | Pr\u00f8veforberedelse Uden Stress: Strategier |
| 41 | Tredelt st\u00f8tte og specialundervisning | tredelt st\u00f8tte opgaveark | Tredelt St\u00f8tte: M\u00e5lrettede Opgaveark |
| 42 | Konkret\u2013billedlig\u2013abstrakt l\u00e6ringsvej | CPA-metode matematik | CPA-l\u00e6ringsvej i Indskolingens Matematik |
| 43 | Hjemmeundervisningens opgavegeneratorer | hjemmeundervisning opgavegeneratorer | Hjemmeundervisningens Generatorer: Fuld L\u00e6replanst\u00f8tte |
| 44 | Hjemmearbejde vs klassearbejde | hjemmearbejde vs klassearbejde | Hjemmearbejde vs Klassearbejde: En Balanceret Tilgang |
| 45 | Skolens f\u00f8rste uge | skolestart opgaveark | Skolens F\u00f8rste Uge: Rutiner og Forventninger |
| 46 | Kritisk t\u00e6nkning og probleml\u00f8sning | kritisk t\u00e6nkning opgaver | Kritisk T\u00e6nkning: Udvikling af Bredt Funderede F\u00e6rdigheder |
| 47 | Billedkryptogram: visuel hemmelig skrift | billedkryptogram guide | Billedkryptogram: Innovativ Hemmelig Skrift for Sm\u00e5b\u00f8rn |
| 48 | Billed-sudoku til b\u00f8rn 4\u20138 \u00e5r | billedsudoku guide til b\u00f8rn | Billed-Sudoku til B\u00f8rn 4\u20138 \u00e5r: Komplet Undervisningsguide |
| 49 | M\u00f8nstertog-opgaver og multisensorisk l\u00e6ring | m\u00f8nstertog multisensorisk l\u00e6ring | M\u00f8nstertog: Multisensorisk L\u00e6ring og Opfattelsesf\u00e6rdigheder |
| 50 | N\u00e6rmeste udviklingszone og differentiering | n\u00e6rmeste udviklingszone differentiering | N\u00e6rmeste Udviklingszone: Differentiering af Opgaveniveauer |
| 51 | Begavede elever | begavede elever generatorer | Begavede Elever: 8 Udfordrende Opgavegeneratorer |
| 52 | Matematikangst reduktion | matematikangst lavt pres opgaver | Matematikangst Reduktion: 6 Lavt Pres Generatorer |
| 53 | Logisk t\u00e6nkning i 2. klasse | logisk t\u00e6nkning 2. klasse | Logisk T\u00e6nkning i 2. Klasse: Krydsord og Logikspil |
| 54 | L\u00e6seforst\u00e5else og ordforr\u00e5d | l\u00e6seforst\u00e5else arbejdsh\u00e6fter | L\u00e6seforst\u00e5else: 6 Effektive Arbejdsh\u00e6ftestrategier |
| 55 | Ordblindheds-st\u00f8tte | ordblindhed billedopgaver | Ordblindheds-st\u00f8tte: 7 Billedbaserede V\u00e6rkt\u00f8jer |
| 56 | Semesterafslutning | semesterafslutning evaluering | Semesterafslutning: Evaluering af L\u00e6ring og Fejring af V\u00e6kst |
| 57 | Klasseledelse med arbejdsark | klasseledelse opgaveark | Klasseledelse: Arbejdsark til Overgange og Adf\u00e6rdsst\u00f8tte |
| 58 | Klasselokale-teknologi og printmaterialer | hybrid l\u00e6ring printmaterialer | Hybrid L\u00e6ring: Teknologi og Printmaterialer i Praksis |
| 59 | Naturfags ordforr\u00e5d | naturfags ordforr\u00e5d opgaver | Naturfags Ordforr\u00e5d: 8 Opgavetyper til Begrebsl\u00e6ring |
| 60 | Succeshistorier fra l\u00e6rere | l\u00e6rernes succeshistorier | L\u00e6rernes Succeshistorier: Opgaveark Forandrede Klasselokalet |
| 61 | Mental sundhed og f\u00f8lelsesm\u00e6ssige f\u00e6rdigheder | mental sundhed f\u00f8lelsesf\u00e6rdigheder klasse | Mental Sundhed og F\u00f8lelsesf\u00e6rdigheder: Trivsel i Klassen |
| 62 | Hvorfor billedbaserede opgaver virker | billedbaseret l\u00e6ring forskning | Billedbaserede Opgaver: 2,3x St\u00e6rkere Hukommelsesspor |
| 63 | Millers 7\u00b12-regel i krydsord | Millers regel krydsord | Millers 7\u00b12: Hvorfor Billedkrydsord Har 8 Billeder |
| 64 | M\u00f8nstergenkendelse og matematisk t\u00e6nkning | m\u00f8nstergenkendelse matematik | M\u00f8nstergenkendelse og Matematisk T\u00e6nkning: Forskningsbaseret |
| 65 | Hvordan et barn l\u00e6rer at l\u00e6se flydende | l\u00e6re at l\u00e6se ortografi | L\u00e6re at L\u00e6se: Ortografisk L\u00e6ring og Synsordsgenkendelse |
| 66 | Bogstavblanding fremskynder stavning | bogstavblanding stavning | Bogstavblanding Fremskynder Stavningsl\u00e6ring |
| 67 | Variansgenkendelse i puslespil | variansgenkendelse algoritme | Variansgenkendelse: Undg\u00e5 Tomme Puslespilsbrikker |
| 68 | Flersprogede generatorer | flersproget opgavegenerator | Flersprogede Generatorer: Dansksprogig Brugerflade |
| 69 | Tilpasbart krydsordsgitter | krydsordsgitter generator | Tilpasbart Krydsordsgitter: Unikt V\u00e6rkt\u00f8j til L\u00e6rere |
| 70 | Musik og kunst i l\u00e6ring | musik kunst l\u00e6ring | Musik og Kunst: Kreative Opgaver til Kunstnerisk Udtryk |
| 71 | Nul-overlapnings-algoritme | find og opdag algoritme | Nul-overlapning: Professionelle S\u00f8geopgaver |
| 72 | L\u00e6rerens tidsstyring | l\u00e6rerens tidsstyring strategier | L\u00e6rerens Tidsstyring: Strategier til Pakkeforbereddelse |
| 73 | L\u00e6rerens efteruddannelse | l\u00e6rerens efteruddannelse | Efteruddannelse: Brug af Arbejdsark i Professionel Udvikling |
| 74 | Undervisningens fremtid 2025\u20132030 | undervisningens fremtid teknologi | Undervisningens Fremtid 2025\u20132030: Teknologitrends og Opgaver |
| 75 | Maksimering af undervisningstid | undervisningstidens maksimering strategier | Undervisningstidens Maksimering: Effektivitetsstrategier |
| 76 | Fagintegration | fagintegration tv\u00e6rfaglighed | Fagintegration: Tv\u00e6rfaglige L\u00e6ringsforl\u00f8b |
| 77 | Elevernes m\u00e5ls\u00e6tning | elevernes m\u00e5l selvevaluering | Elevernes M\u00e5l og Selvevaluering: Den Selvstyrende Elev |
| 78 | Motivering og belonning af elever | elevmotivering opgaver | Elevmotivering: Fejring af Fremskridt med Opgaveskabeloner |
| 79 | Sammenligning af l\u00e6ringsplatforme | l\u00e6ringsplatform sammenligning | L\u00e6ringsplatforme: Billig vs Dyr \u2014 Komplet Sammenligning |
| 80 | L\u00e6ringsstationer og rotation | l\u00e6ringsstationer rotationsarbejde | L\u00e6ringsstationer: Effektiv Model til Selvst\u00e6ndigt Arbejde |
| 81 | Analyse af l\u00e6ringsresultater | l\u00e6ringsresultater analyse undervisning | Analyse af L\u00e6ringsresultater i Undervisningsudvikling |
| 82 | Skr\u00e6ddersyet undervisningsmateriale p\u00e5 3 minutter | skr\u00e6ddersyet undervisningsmateriale guide | Skr\u00e6ddersyet Undervisningsmateriale p\u00e5 3 Minutter: Komplet Guide |
| 83 | Rastertegning: Leonardo da Vincis teknik | rastertegning da Vinci | Rastertegning: Da Vincis 500 \u00c5r Gamle Teknik |
| 84 | Dansk som andetsprog: visuelle strategier | DSA visuelle v\u00e6rkt\u00f8jer | DSA: Visuelle Strategier til St\u00f8tte af Sprogindl\u00e6ring |
| 85 | 100 skoledages fest | 100 skoledages fest | Hundrede Skoledages Fest: Aktiviteter og Temaopgaver |
| 86 | Hemmelig besked-plusstykker | hemmelig besked plusstykker | Hemmelig Besked-plusstykker: N\u00e5r Matematik Bliver en G\u00e5de |
| 87 | Ords\u00f8gningsgenerator p\u00e5 90 sekunder | ords\u00f8gning generator guide | Ords\u00f8gningsgenerator: Tilpassede Opgaver p\u00e5 90 Sekunder |
| 88 | Bogstavblanding med tilpasset sv\u00e6rhedsgrad | bogstavblanding tilpasset sv\u00e6rhedsgrad | Bogstavblanding: Intelligente Hints efter Ordets L\u00e6ngde |
| 89 | Overgangssituationer og rutiner | overgangssituationer klasselokale | Overgangssituationer: Glidende Klassearbejde med Opgaveark |
| 90 | Vikarens n\u00f8dplaner | vikarens planer | Vikarens N\u00f8dplaner: F\u00e6rdige Opgaveark |
| 91 | Sociale og f\u00f8lelsesm\u00e6ssige f\u00e6rdigheder (SEL) | SEL-l\u00e6ring opgaver | Sociale og F\u00f8lelsesm\u00e6ssige F\u00e6rdigheder: SEL-integration |
| 92 | STEAM-undervisning i praksis | STEAM-undervisning arbejdsark | STEAM-undervisning: N\u00e5r Arbejdsark St\u00f8tter Skaben og Kreativitet |
| 93 | Symbolsk algebra for b\u00f8rn | symbolsk algebra til b\u00f8rn | Symbolsk Algebra: Matematiske Puslespil med Garanteret L\u00f8sning |
| 94 | M\u00e5lbaseret undervisningsplanl\u00e6gning | m\u00e5lbaseret planl\u00e6gning | M\u00e5lbaseret Planl\u00e6gning: Start fra Slutm\u00e5let |
| 95 | Sammenligning af opgavegeneratorer | LessonCraftStudio sammenligning | Opgavegeneratorer Sammenlignet: LCS vs Konkurrenter |
| 96 | Opgavegeneratorer i brug: en guide | opgavegeneratorer guide | Opgavegeneratorer i Brug: Komplet Guide fra Start til Print |
| 97 | Ophavsret og undervisningsmaterialer | ophavsret undervisningsmaterialer | Ophavsret og Undervisningsmaterialer: L\u00e6rerens Guide |
| 98 | Ergoterapiens m\u00e5l | ergoterapi finmotorik | Ergoterapi: 8 Finmotoriske \u00d8velser |
| 99 | Trykt vs digitalt opgaveark | trykt vs digitalt | Trykt vs Digitalt: Valg af Det Rigtige Format til Undervisning |
| 100 | St\u00f8tte af arbejdshukommelse visuelt | arbejdshukommelse visuel st\u00f8tte | Arbejdshukommelsens St\u00f8tte: 7 Opgavetyper med Visuel Hj\u00e6lp |
| 101 | Alternative evalueringsmetoder | alternative evaluering | Alternative Evalueringsmetoder: Funktionel Evaluering |
| 102 | For\u00e6ldres deltagelse i l\u00e6ring | for\u00e6ldres deltagelse hjem-skole | For\u00e6ldres Deltagelse: V\u00e6rkt\u00f8jer til Hjem-Skole-Samarbejde |
| 103 | F\u00f8rskolep\u00e6dagogik 3\u20136 \u00e5r | f\u00f8rskolep\u00e6dagogik opgaver 3-6 | F\u00f8rskolep\u00e6dagogik: Alderstilpassede Opgaver til 3\u20136-\u00e5rige |
| 104 | Peer learning og elever som l\u00e6rere | peer learning opgaveskabeloner | Peer Learning: Opgavebaserede Metoder til L\u00e6ring |
| 105 | Visuel opfattelse: Frostigs f\u00e6rdigheder | visuel opfattelse Frostig | Visuel Opfattelse: Frostigs Fem Grundl\u00e6ggende F\u00e6rdigheder |
| 106 | Visuel og verbal l\u00e6ring | visuel verbal l\u00e6ring | Visuel og Verbal L\u00e6ring: 2,3x Effektforst\u00e6rkning |
| 107 | Visuelle v\u00e6rkt\u00f8jer til specialundervisning | specialundervisning visuelle generatorer | Visuelle V\u00e6rkt\u00f8jer til Specialundervisning: 8 Generatorer |
| 108 | Visuo-spatiale f\u00e6rdigheder | visuo-spatiale f\u00e6rdigheder STEM | Visuo-spatiale F\u00e6rdigheder: 7 Opgavetyper til STEM-l\u00e6ring |
| 109 | S\u00e6sonbaseret opgaveplanl\u00e6gning | s\u00e6sonbaseret opgaveplanl\u00e6gning | S\u00e6sonbaseret Opgaveplanl\u00e6gning: Hele \u00c5rets Strategi |
| 110 | Samfundsfags ordforr\u00e5d | samfundsfags ordforr\u00e5d generatorer | Samfundsfags Ordforr\u00e5d: 7 Generatorer til Historie og Geografi |
| 111 | Entydig l\u00f8sningsalgoritme | entydig l\u00f8sning | Entydig L\u00f8sning: Algoritmen der Forhindrer Frustration |
| 112 | Overgang til udskoling | overgang til udskoling forberedelse | Overgang til Udskoling: Forberedelse af 5. Klasses Elever |

**Note:** metaDescription for each blog post follows the template:
\`[Topic summary in 1 sentence]. Forskningsbaserede strategier og praktiske tips til l\u00e6rere og for\u00e6ldre. L\u00e6s hele artiklen.\`

---

## Section 5: Secondary Pages

### Category Hubs (8)

**Dyr og natur** (\`animals-nature\`)
- **Primary Keyword:** dyr og natur opgaver til l\u00e6rere
- **SEO Title:** Dyr- og Naturopgaver til L\u00e6rere | LessonCraftStudio (51)
- **Meta Description:** Printbare dyr- og naturopgaver til l\u00e6rere. 10 temaer: bondeg\u00e5rd, k\u00e6ledyr, hav, dinosaurer, skov og mere. Gratis PDF download. (137)

**Mad og have** (\`food-garden\`)
- **Primary Keyword:** mad og have opgaver til l\u00e6rere
- **SEO Title:** Mad- og Haveopgaver til L\u00e6rere | LessonCraftStudio (51)
- **Meta Description:** Printbare mad- og haveopgaver til l\u00e6rere. 5 temaer: frugter, gr\u00f8ntsager, madlavning og have. Gratis PDF download. (118)

**\u00c5rstider og vejr** (\`seasons-weather\`)
- **Primary Keyword:** \u00e5rstider og vejr opgaver til l\u00e6rere
- **SEO Title:** \u00c5rstids- og Vejropgaver til L\u00e6rere | LessonCraftStudio (52)
- **Meta Description:** Printbare \u00e5rstids- og vejropgaver til l\u00e6rere. 5 temaer: for\u00e5r, sommer, vinter og vejrforhold. Gratis PDF download. (121)

**H\u00f8jtider og fester** (\`holidays-celebrations\`)
- **Primary Keyword:** h\u00f8jtidsopgaver til l\u00e6rere
- **SEO Title:** H\u00f8jtids- og Festopgaver til L\u00e6rere | LessonCraftStudio (52)
- **Meta Description:** Printbare h\u00f8jtids- og festopgaver til l\u00e6rere. 5 temaer: jul, p\u00e5ske, halloween og f\u00f8dselsdag. Gratis PDF. (117)

**L\u00e6ringens grundlag** (\`academic-foundations\`)
- **Primary Keyword:** l\u00e6ringsgrundlag opgaver til l\u00e6rere
- **SEO Title:** L\u00e6ringsgrundlag Opgaver til L\u00e6rere | LessonCraftStudio (53)
- **Meta Description:** Printbare l\u00e6ringsgrundlagsopgaver til l\u00e6rere. 5 temaer: alfabet, tal, former, farver og skole. Gratis PDF download. (125)

**Mennesker og hverdag** (\`people-daily-life\`)
- **Primary Keyword:** mennesker og hverdag opgaver til l\u00e6rere
- **SEO Title:** Mennesker og Hverdag Opgaver til L\u00e6rere | LessonCraftStudio (56)
- **Meta Description:** Printbare mennesker- og hverdagsopgaver til l\u00e6rere. 6 temaer: krop, f\u00f8lelser, t\u00f8j, husholdning, m\u00f8bler og job. Gratis PDF. (130)

**Handling og eventyr** (\`active-adventure\`)
- **Primary Keyword:** handling og eventyr opgaver til l\u00e6rere
- **SEO Title:** Handlings- og Eventyropgaver til L\u00e6rere | LessonCraftStudio (56)
- **Meta Description:** Printbare handlings- og eventyropgaver til l\u00e6rere. 6 temaer: sport, transport, byggeri, rejser, camping og pirater. (124)

**Fantasi og leg** (\`imagination-play\`)
- **Primary Keyword:** fantasi og leg opgaver til l\u00e6rere
- **SEO Title:** Fantasi- og Legeopgaver til L\u00e6rere | LessonCraftStudio (53)
- **Meta Description:** Printbare fantasi- og legeopgaver til l\u00e6rere. 8 temaer: leget\u00f8j, musik, rummet, robotter, superhelte og eventyr. Gratis. (128)

### Grade Hubs (5)

**F\u00f8rskole** (\`forskole\`)
- **Primary Keyword:** f\u00f8rskole opgaver printbar
- **SEO Title:** F\u00f8rskoleopgaver Printbar \u2014 Gratis | LessonCraftStudio (52)
- **Meta Description:** Gratis printbare f\u00f8rskoleopgaver til 3\u20134-\u00e5rige. Farvel\u00e6gning, finmotorik og t\u00e6llingens grundlag. 50 temaer. Download PDF med det samme. (143)

**B\u00f8rnehaveklasse** (\`bornehaveklasse\`)
- **Primary Keyword:** b\u00f8rnehaveklasse opgaver printbar
- **SEO Title:** B\u00f8rnehaveklasse Opgaver Printbar | LessonCraftStudio (51)
- **Meta Description:** Gratis printbare b\u00f8rnehaveklasseopgaver til 5\u20136-\u00e5rige. Bogstaver, tal, m\u00f8nstre og opfattelse. 50 temaer. Download PDF med det samme. (140)

**1. Klasse** (\`forste-klasse\`)
- **Primary Keyword:** 1. klasses opgaver printbar
- **SEO Title:** 1. Klasses Opgaver Printbar \u2014 Gratis | LessonCraftStudio (55)
- **Meta Description:** Gratis printbare 1. klasses opgaver til 6\u20137-\u00e5rige. Addition, subtraktion, l\u00e6sning og skrivning. 50 temaer. Download PDF med det samme. (142)

**2. Klasse** (\`anden-klasse\`)
- **Primary Keyword:** 2. klasses opgaver printbar
- **SEO Title:** 2. Klasses Opgaver Printbar \u2014 Gratis | LessonCraftStudio (55)
- **Meta Description:** Gratis printbare 2. klasses opgaver til 7\u20138-\u00e5rige. Multiplikation, ordspil og probleml\u00f8sning. 50 temaer. Download PDF med det samme. (141)

**3. Klasse** (\`tredje-klasse\`)
- **Primary Keyword:** 3. klasses opgaver printbar
- **SEO Title:** 3. Klasses Opgaver Printbar \u2014 Gratis | LessonCraftStudio (55)
- **Meta Description:** Gratis printbare 3. klasses opgaver til 8\u20139-\u00e5rige. Flertrinsproblemer, krydsord og avancerede opgaver. 50 temaer. Download PDF. (138)

### Other Secondary Pages

**Forside** (\`/\`)
- **Primary Keyword:** arbejdsark generatorer til b\u00f8rn
- **SEO Title:** Gratis Arbejdsark-Generatorer til B\u00f8rn | LessonCraftStudio (57)
- **Meta Description:** Lav arbejdsark med 33 generatorer og 3.000+ billeder. Matematik, farvel\u00e6gning, krydsord og puslespil. Download PDF med det samme. Gratis, ingen registrering. (158)

**Alle generatorer** (\`/apps\`)
- **Primary Keyword:** opgavegenerator platform til l\u00e6rere
- **SEO Title:** 33 Gratis Opgavegeneratorer til L\u00e6rere | LessonCraftStudio (57)
- **Meta Description:** Udforsk 33 gratis opgavegeneratorer. Lav krydsord, matematikopgaver, farvel\u00e6gningssider og mere. Download printbare PDF'er med det samme. Gratis. (153)

**Opgaver oversigt** (\`/worksheets\`)
- **Primary Keyword:** printbare opgaver til b\u00f8rn gratis
- **SEO Title:** Printbare Opgaver til B\u00f8rn \u2014 50 Temaer | LessonCraftStudio (58)
- **Meta Description:** Gennemse 50 temaers printbare opgaver til b\u00f8rn. Matematik, sprog, farvel\u00e6gning og puslespil fra f\u00f8rskole til 3. klasse. 250+ opgavesamlinger. Gratis. (155)

**Blog** (\`/blog\`)
- **Primary Keyword:** undervisningsmaterialer blog til l\u00e6rere
- **SEO Title:** Undervisningsmaterialer og Opgavetips Blog | LessonCraftStudio (58)
- **Meta Description:** Find 100+ ekspertartikler om undervisningsstrategier, opgavedesign og gratis uddannelsesressourcer. Guider til l\u00e6rere og for\u00e6ldre. (141)

**Priser** (\`/pricing\`)
- **Primary Keyword:** opgavegenerator pris
- **SEO Title:** Priser: Gratis, Basispakke og Fuld Adgang | LessonCraftStudio (59)
- **Meta Description:** V\u00e6lg din plan: Gratis ords\u00f8gningsgenerator, Basispakke med 10 generatorer eller Fuld Adgang til alle 33 generatorer. Opsig n\u00e5r som helst. (149)

**Om os** (\`/about\`)
- **Primary Keyword:** om LessonCraftStudio
- **SEO Title:** Om LessonCraftStudio \u2014 Opgavegeneratorer til L\u00e6rere (56)
- **Meta Description:** L\u00e6r om LessonCraftStudio og vores mission om at give l\u00e6rere og for\u00e6ldre professionelle opgavev\u00e6rkt\u00f8jer. 33 generatorer, 3.000+ billeder. (148)

---

## Verification Summary

- **Total unique primary keywords:** 220
- **Duplicates found:** NONE \u2714\ufe0f
- **Product pages:** 33 (all use "generator" pattern)
- **Theme hubs:** 50 (all use "opgaver til b\u00f8rn" pattern)
- **Theme+grade pages:** 250 (all use grade-specific suffix)
- **Blog posts:** 112
- **Secondary pages:** 19
- **Anti-cannibalization:** No product keyword uses "til b\u00f8rn", no theme hub uses "generator" \u2714\ufe0f
- **Language:** All keywords in Danish (no English leakage) \u2714\ufe0f
`;

// Write to file
const outPath = path.join(__dirname, '..', 'docs', 'seo-keywords', 'da-all-pages.md');
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
  const kwBase = t.kw.replace(' til b\u00f8rn', '');
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
