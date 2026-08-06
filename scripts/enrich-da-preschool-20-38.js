#!/usr/bin/env node
/**
 * SEO Part 221: DA Preschool Grade Enrichment — Themes 20-38
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 19 DA theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    snippetAnswer: `Frugt-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger \u00e6bler, bananer og jordb\u00e6r til t\u00e6lling, sortering og farvel\u00e6gning, der styrker finmotorik og tidlig talgenkendelse. Frugters sanserige egenskaber driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Frugttemaet er s\u00e6rligt kraftfuldt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige m\u00f8der frugt ved hvert m\u00e5ltid og mellemmad \u2014 det er et af de mest genkendelige og personligt meningsfulde temaer overhovedet. B\u00f8rn i denne alder opbygger en-til-en-korrespondance og begynder at sortere efter egenskaber som farve og st\u00f8rrelse. Frugter tilbyder en ideel kategoriseringsramme med klare dimensioner: r\u00f8de \u00e6bler vs. gule bananer, store melon vs. sm\u00e5 jordb\u00e6r. At t\u00e6lle frugt p\u00e5 et bord g\u00f8r matematik konkret og sanselig. Sporing af ord som \u00e6ble og p\u00e6re udvikler blyantsgreb. F\u00e6lles M\u00e5ls fokus p\u00e5 l\u00e6ring gennem konkrete oplevelser underst\u00f8ttes, n\u00e5r frugt-arbejdsark parres med \u00e6gte frugtsnacks.`,
    developmentalMilestones: [
      { milestone: `Kategorisering efter egenskaber (3\u20134-\u00e5rige begynder at sortere genstande efter farve, st\u00f8rrelse eller form)`, howWeAddress: `Sorteringsaktiviteter, hvor b\u00f8rn grupperer frugter efter farve, st\u00f8rrelse eller type, styrker logisk t\u00e6nkning med velkendte genstande` },
      { milestone: `T\u00e6lling af sm\u00e5 m\u00e6ngder (f\u00f8rskoleb\u00f8rn opbygger en-til-en-korrespondance til 10)`, howWeAddress: `T\u00e6lleaktiviteter med frugter p\u00e5 et bord eller i en kurv forbinder matematik med m\u00e5ltidserfaringer` },
      { milestone: `Sensorisk begrebsdannelse (b\u00f8rn l\u00e6rer at beskrive genstande med ord for farve, smag og tekstur)`, howWeAddress: `Matchnings- og navngivningsaktiviteter, der forbinder frugtbilleder med farveord og st\u00f8rrelsesbegreber, udvider ordforr\u00e5det` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, begr\u00e6ns til tre velkendte frugter (\u00e6ble, banan, jordb\u00e6r), brug \u00e6gte frugt som supplement til arbejdsarket, og fokus\u00e9r p\u00e5 \u00e9n f\u00e6rdighed ad gangen. For avancerede f\u00f8rskoleb\u00f8rn udvid med eksotiske frugter, tilf\u00f8j bogstavsporing af frugtnavne og lad b\u00f8rnene sortere efter to egenskaber samtidig.`,
    parentTakeaway: `Frugt er den letteste l\u00e6ringsmulighed derhjemme. Lad barnet hj\u00e6lpe med at t\u00e6lle \u00e6bler ved indk\u00f8b, sortere frugter efter farve i frugtsk\u00e5len, og navngive frugter ved mellemmaden. At sk\u00e6re frugt sammen og tale om farver, fr\u00f8 og former g\u00f8r k\u00f8kkenet til et klasselokale. Pakning af frugt i madpakken med barnets hj\u00e6lp kombinerer t\u00e6lling, navngivning og sund kost.`,
    classroomIntegration: `Frugttemaet integreres i f\u00f8rskolens m\u00e5ltidsrutiner: ved mellemmaden navngives og t\u00e6lles frugter, i samlingen introduceres ugens frugt med billeder og smags\u00f8velse, ved l\u00e6ringsstationer arbejdes med sorterings- og t\u00e6lleark, og i kunsthj\u00f8rnet trykkes frugtm\u00f8nstre med halve \u00e6bler. Denne multisensoriske tilgang opfylder F\u00e6lles M\u00e5ls m\u00e5l for sundhed, natur og sanseoplevelser.`,
    assessmentRubric: [
      { skill: `Frugtsortering`, emerging: `sorterer frugter i to grupper med voksenst\u00f8tte (f.eks. r\u00f8de/gule)`, proficient: `sorterer selvst\u00e6ndigt frugter efter farve, st\u00f8rrelse eller type`, advanced: `sorterer efter to egenskaber samtidig og forklarer sine sorteringskriterier` },
      { skill: `T\u00e6lling med frugter`, emerging: `t\u00e6ller 1\u20135 frugter med pegen og voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 frugter og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere \u00e6bler end bananer)` },
      { skill: `Frugtgenkendelse og ordforr\u00e5d`, emerging: `navngiver 3\u20134 velkendte frugter med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 6\u20138 frugter og beskriver deres farve`, advanced: `navngiver 10+ frugter og bruger beskrivende ord som s\u00f8d, sur, bl\u00f8d, h\u00e5rd` },
    ],
  },

  furniture: {
    snippetAnswer: `M\u00f8bel-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger stole, borde og senge til matchning, sortering og farvel\u00e6gning, der styrker rumlig forst\u00e5else og kategorisering. Hjemmets velkendte genstande g\u00f8r l\u00e6ringen konkret. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `M\u00f8beltemaet er s\u00e6rligt relevant for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige tilbringer det meste af deres tid omgivet af m\u00f8bler derhjemme og i b\u00f8rnehaven \u2014 stolen de sidder p\u00e5, sengen de sover i, bordet de spiser ved. Denne daglige fortrolighed g\u00f8r m\u00f8bler til et ideelt sorteringstema: b\u00f8rn kan kategorisere efter rum (k\u00f8kken vs. sovevarelse), funktion (sidde p\u00e5 vs. sove i) og st\u00f8rrelse (stor sofa vs. lille skammel). M\u00f8belmatchning introducerer rumlige begreber som p\u00e5/under/ved siden af. Farvel\u00e6gning af m\u00f8bler med rette linjer og vinkler tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og hverdagsforst\u00e5else underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Rumlig forst\u00e5else (3\u20134-\u00e5rige l\u00e6rer begreber som p\u00e5, under, ved siden af, bagved)`, howWeAddress: `Matchningsaktiviteter med m\u00f8bler og rumlige pr\u00e6positioner (katten p\u00e5 stolen, bolden under bordet) g\u00f8r abstrakte begreber konkrete` },
      { milestone: `Kategorisering efter funktion (f\u00f8rskoleb\u00f8rn begynder at forst\u00e5, at genstande har forskellige form\u00e5l)`, howWeAddress: `Sorteringsaktiviteter, der grupperer m\u00f8bler efter rum eller funktion, opbygger logisk t\u00e6nkning med hverdagsgenstande` },
      { milestone: `Formgenkendelse (rette linjer, firkanter og rektangler i m\u00f8bler)`, howWeAddress: `Farvel\u00e6gnings- og matchningsark med m\u00f8bler, der fremh\u00e6ver geometriske former, introducerer tidlig formforst\u00e5else` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med de mest velkendte m\u00f8bler (stol, bord, seng), brug miniaturem\u00f8bler fra dukkehus som supplement, og fokus\u00e9r p\u00e5 \u00e9n rumlig pr\u00e6position ad gangen. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r rum-sortering (k\u00f8kken vs. stue), tilf\u00f8j bogstavsporing af m\u00f8belnavne og udfordre dem med at designe et v\u00e6relse.`,
    parentTakeaway: `M\u00f8bler er overalt i hjemmet, og det g\u00f8r dem til den mest tilg\u00e6ngelige l\u00e6ringsmulighed. Leg "hvad sidder du p\u00e5?" og "hvad sover du i?" for at \u00f8ve kategorier. Brug dukkehusm\u00f8bler til at \u00f8ve rumlige begreber: "S\u00e6t bjornen p\u00e5 stolen, under bordet." T\u00e6l stolene i stuen og sammenlign med k\u00f8kkenet. Hvert rum i hjemmet er en l\u00e6ringsstation.`,
    classroomIntegration: `M\u00f8beltemaet integreres naturligt i f\u00f8rskolens rum: i samlingen tales om m\u00f8blerne i lokalet og deres funktion, ved l\u00e6ringsstationer arbejdes med sorterings- og matchningsark, i dukkekrogen indrettes rum med miniaturem\u00f8bler, og p\u00e5 ture observeres m\u00f8bler i forskellige sammenh\u00e6nge. F\u00e6lles M\u00e5ls m\u00e5l for rumlig forst\u00e5else og hverdagsviden underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Rumlige begreber (m\u00f8belkontekst)`, emerging: `forst\u00e5r p\u00e5/under med konkrete eksempler og voksenst\u00f8tte`, proficient: `bruger selvst\u00e6ndigt 3\u20134 rumlige pr\u00e6positioner korrekt (p\u00e5, under, ved, bagved)`, advanced: `kombinerer flere rumlige begreber og f\u00f8lger flertrinsinstruktioner med m\u00f8bler` },
      { skill: `M\u00f8belkategorisering`, emerging: `sorterer 2\u20133 m\u00f8bler i to grupper med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt m\u00f8bler efter rum eller funktion`, advanced: `sorterer efter to kriterier og forklarer sine valg mundtligt` },
      { skill: `Formgenkendelse i m\u00f8bler`, emerging: `identificerer \u00e9n form (firkant/rektangel) i m\u00f8bler med st\u00f8tte`, proficient: `finder selvst\u00e6ndigt 2\u20133 former i m\u00f8belbilleder`, advanced: `navngiver former og finder dem i b\u00e5de m\u00f8bler og andre genstande` },
    ],
  },

  garden: {
    snippetAnswer: `Have-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger blomster, insekter og haveredskaber til t\u00e6lling, matchning og farvel\u00e6gning. Havens sansem\u00e6ttede verden fascinerer sm\u00e5 b\u00f8rn og driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Havetemaet er ideelt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige elsker at grave i jord, plante fr\u00f8 og observere, hvordan planter vokser \u2014 haven er et naturligt laboratorium for sanseoplevelser og undren. Denne hands-on fascination giver en st\u00e6rk bro mellem arbejdsark og virkelighed. T\u00e6lling af blomster, sommerfugle og marieh\u00f8ns i en havescene giver konkret matematik. Matchning af fr\u00f8 med planter introducerer \u00e5rsag-virkning-t\u00e6nkning. Farvel\u00e6gning af blomster med brede kronblade tr\u00e6ner finmotorik. Sortering af haveredskaber opbygger kategorisering. F\u00e6lles M\u00e5ls m\u00e5l for natur, sanseoplevelser og naturfagl\u00e6ring m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `Naturlig nysgerrighed og observation (3\u20134-\u00e5rige begynder at bemoorke v\u00e6kst og forandring)`, howWeAddress: `Fr\u00f8-til-plante-sekvensering og matchningsaktiviteter introducerer livscyklusforst\u00e5else p\u00e5 det mest basale niveau` },
      { milestone: `T\u00e6lling med naturlige genstande (opbygning af m\u00e6ngdeforst\u00e5else)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med blomster, bier og sommerfugle i havescener g\u00f8r matematik sansem\u00e6ttet` },
      { milestone: `Finmotorisk kontrol (overgang til mere kontrolleret farvel\u00e6gning)`, howWeAddress: `Farvel\u00e6gningssider med blomster, der har tydelige kronblade og blade, giver klare konturer til motorisk tr\u00e6ning` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 f\u00e5 velkendte haveelementer (blomst, sommerfugl, vandkande), brug rigtige fr\u00f8 og jord som supplement, og hold aktiviteterne sansem\u00e6ttede. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j sekvensering af v\u00e6kstfaser, introduc\u00e9r bogstavsporing af haveord og lad dem tegne deres egen dr\u00f8mmehave.`,
    parentTakeaway: `Haven er naturens klasselokale. Giv barnet et lille havehj\u00f8rne eller en potteplante at passe, og t\u00e6l fr\u00f8 sammen, f\u00f8r de plantes. Observer blomster i parken og t\u00e6l kronblade. Lad barnet vande og m\u00e5le plantens v\u00e6kst. Disse virkelige haveoplevelser forst\u00e6rker arbejdsarkenes l\u00e6ring og giver barnet en f\u00f8lelse af ansvar og undren.`,
    classroomIntegration: `Havetemaet f\u00f8lger \u00e5rstiderne: om for\u00e5ret plantes fr\u00f8 i b\u00f8rnehavens bed, om sommeren observeres v\u00e6kst og insekter, om efter\u00e5ret h\u00f8stes. I samlingen introduceres ugens plante, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, og i sansebakken graves med jord og fr\u00f8. F\u00e6lles M\u00e5ls m\u00e5l for natur, milj\u00f8 og sanseoplevelser underst\u00f8ttes gennem hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `T\u00e6lling i havescener`, emerging: `t\u00e6ller 1\u20135 blomster/insekter med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 i en havescene og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere sommerfugle end bier)` },
      { skill: `V\u00e6kstsekvensering`, emerging: `ordner 2 trin (fr\u00f8, blomst) med voksenst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3 v\u00e6kstfaser i korrekt r\u00e6kkef\u00f8lge`, advanced: `ordner 4\u20135 v\u00e6kstfaser og forklarer, hvad der sker i hvert trin` },
      { skill: `Havegenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 haveelementer med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 blomster, insekter og redskaber`, advanced: `navngiver 8+ elementer og bruger beskrivende ord om dem` },
    ],
  },

  halloween: {
    snippetAnswer: `Halloween-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger venlige gr\u00e6skar, flagermus og sp\u00f8gelser til t\u00e6lling, matchning og farvel\u00e6gning. Den festlige stemning og udkl\u00e6dningsgl\u00e6de driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Halloweentemaet har en s\u00e6rlig tiltr\u00e6kningskraft for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige elsker udkl\u00e6dning, og halloween giver dem lov til at udforske fantasi og rolleleg i en festlig ramme. De farverige gr\u00e6skar, fjollede sp\u00f8gelser og s\u00f8de flagermus f\u00e6nger opm\u00e6rksomheden uden at skr\u00e6mme. T\u00e6lling af gr\u00e6skar og slik giver naturlige matematik\u00f8velser, matchning af halloweenfigurer med deres skygger styrker visuel skelneevne, og farvel\u00e6gning af gr\u00e6skaransigter tr\u00e6ner finmotorik. Kostumeelementet stimulerer kreativitet og selvudfoldelse. F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, fantasi og social leg underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `Fantasileg og rolletagning (3\u20134-\u00e5rige udvikler evnen til at p\u00e5tage sig roller)`, howWeAddress: `Halloweenaktiviteter med kostumer og figurer stimulerer rollespil og kreativ t\u00e6nkning gennem strukturerede arbejdsark` },
      { milestone: `Visuel skelneevne (b\u00f8rn l\u00e6rer at skelne mellem lignende former)`, howWeAddress: `Skyggematchning med halloweensilhuetter og find-forskellen-aktiviteter styrker observation og visuel analyse` },
      { milestone: `T\u00e6lling i festlige kontekster (t\u00e6lling f\u00e5r personlig betydning)`, howWeAddress: `T\u00e6lleaktiviteter med gr\u00e6skar, slik og flagermus g\u00f8r matematik til en del af den festlige oplevelse` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, brug kun venlige figurer (smilende gr\u00e6skar, s\u00f8de sp\u00f8gelser), hold scenerne enkle med f\u00e5 elementer, og lad barnet farvel\u00e6gge frit. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j mere detaljerede scener, introduc\u00e9r m\u00f8nstergenkendelse i halloweendekorationer og lad dem designe deres eget gr\u00e6skaransigt.`,
    parentTakeaway: `Halloween er en gylden l\u00e6ringsmulighed. Lad barnet hj\u00e6lpe med at t\u00e6lle slik, sortere halloweendekorationer efter farve og udskr\u00e6re et gr\u00e6skar sammen. At v\u00e6lge kostume og tale om det tr\u00e6ner b\u00e5de ordforr\u00e5d og beslutningstagning. Gr\u00e6skarfr\u00f8 kan t\u00e6lles og sorteres efter st\u00f8rrelse \u2014 k\u00f8kkenet bliver til en l\u00e6ringsstation.`,
    classroomIntegration: `Halloweentemaet bruges i en efter\u00e5rstemauge: i samlingen l\u00e6ses halloweenhistorier og synges sange, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i kunsthj\u00f8rnet dekoreres gr\u00e6skar og laves flagermus, og i rollelegen prr\u00f8ves kostumer. F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, fantasi og sociale f\u00e6rdigheder opfyldes gennem den festlige temauge.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med halloweengenstande`, emerging: `t\u00e6ller 1\u20135 gr\u00e6skar/flagermus med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 halloweengenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle "hvor mange tilsammen"-opgaver` },
      { skill: `Skyggematchning (halloweensilhuetter)`, emerging: `matcher 2\u20133 silhuetter med voksenst\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 5\u20136 halloweensilhuetter korrekt`, advanced: `matcher komplekse silhuetter og forklarer, hvilke tr\u00e6k der afsl\u00f8rer figuren` },
      { skill: `Kreativ udfoldelse (halloweenfarvel\u00e6gning)`, emerging: `farvel\u00e6gger med f\u00e5 farver og grove str\u00f8g`, proficient: `farvel\u00e6gger inden for konturerne med varierede farver`, advanced: `tilf\u00f8jer egne kreative detaljer og m\u00f8nstre til halloweenfigurerne` },
    ],
  },

  holidays: {
    snippetAnswer: `Ferie-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger festlige motiver som gaver, tr\u00e6er og stjerner til t\u00e6lling, matchning og farvel\u00e6gning. Den emotionelle forbindelse til h\u00f8jtider driver st\u00e6rk motivation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `H\u00f8jtidstemaet rammer f\u00f8rskoleb\u00f8rn lige i hjertet, fordi tre- og fire\u00e5rige oplever h\u00f8jtider som \u00e5rets mest magiske begivenheder \u2014 juletroaeer, gaver, lysestager og familiefejringer skaber dyb f\u00f8lelsesm\u00e6ssig resonans. Denne personlige forbindelse g\u00f8r h\u00f8jtidsarbejdsark til de mest motiverende overhovedet. T\u00e6lling af gaver, lys og kugler giver naturlig matematik med f\u00f8lelsesm\u00e6ssig v\u00e6gt. Matchning af h\u00f8jtidssymboler opbygger kulturel bevidsthed. Farvel\u00e6gning af dekorationer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for kulturel identitet, traditioner og f\u00e6llesskab underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Kulturel og social bevidsthed (3\u20134-\u00e5rige begynder at forst\u00e5 traditioner og fejringer)`, howWeAddress: `H\u00f8jtidsaktiviteter, der inddrager danske traditioner som julefrokost, lucia og kalender, styrker kulturel identitet` },
      { milestone: `T\u00e6lling med personlig betydning (tal f\u00e5r f\u00f8lelsesm\u00e6ssig v\u00e6gt)`, howWeAddress: `T\u00e6lleaktiviteter med gaver, lys og kalenderlukker g\u00f8r matematik personligt meningsfuld` },
      { milestone: `Sekvensering (f\u00f8rskoleb\u00f8rn l\u00e6rer tidslige begreber som f\u00f8r/efter)`, howWeAddress: `Adventskalender-aktiviteter og h\u00f8jtidsforberedelser introducerer tidsr\u00e6kkef\u00f8lge og nedt\u00e6lling` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 de mest velkendte h\u00f8jtidselementer (juletroae, gave, stjerne), hold scenerne enkle, og brug fysiske dekorationer som supplement. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r t\u00e6lling af kalenderdage, matchning af h\u00f8jtider med \u00e5rstider og bogstavsporing af h\u00f8jtidsord.`,
    parentTakeaway: `H\u00f8jtider er l\u00e6ringens guldminer. Lad barnet hj\u00e6lpe med at t\u00e6lle kugler p\u00e5 juletroaeet, sortere julepynt efter farve og \u00e5bne kalenderlukker. Bag sammen og t\u00e6l ingredienser. Skriv barnets navn p\u00e5 gavesedler. Hver tradition er en l\u00e6ringsmulighed \u2014 og den f\u00f8lelsesm\u00e6ssige forbindelse g\u00f8r, at l\u00e6ringen sidder fast.`,
    classroomIntegration: `H\u00f8jtidstemaet f\u00f8lger \u00e5rets kalender: i december arbejdes med jul og advent, i februar med fastelavn, i marts med p\u00e5ske. I samlingen tales om traditioner, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, og i kunsthj\u00f8rnet laves h\u00f8jtidsdekorationer. F\u00e6lles M\u00e5ls m\u00e5l for kulturel identitet og sociale f\u00e6rdigheder underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med h\u00f8jtidsgenstande`, emerging: `t\u00e6ller 1\u20135 gaver/kugler med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 h\u00f8jtidsgenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle additionsopgaver med h\u00f8jtidstema` },
      { skill: `H\u00f8jtidstraditioner (kulturel viden)`, emerging: `genkender 1\u20132 h\u00f8jtider med voksenst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 3\u20134 h\u00f8jtider og deres kendetegn`, advanced: `fort\u00e6ller om traditioner og sammenligner h\u00f8jtider` },
      { skill: `Kreativ dekoration (h\u00f8jtidsfarvel\u00e6gning)`, emerging: `farvel\u00e6gger h\u00f8jtidsmotiver med grove str\u00f8g`, proficient: `farvel\u00e6gger inden for konturerne med passende h\u00f8jtidsfarver`, advanced: `tilf\u00f8jer egne detaljer og designer m\u00f8nstre p\u00e5 dekorationer` },
    ],
  },

  household: {
    snippetAnswer: `Husholdning-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger dagligdags genstande som kopper, tallerkener og n\u00f8gler til sortering, matchning og t\u00e6lling. Hjemmets velkendte ting g\u00f8r l\u00e6ringen tryg og meningsfuld. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Husholdningstemaet er unikt velegnet til f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er intenst optaget af at imitere voksnes daglige g\u00f8rem\u00e5l \u2014 de vil hj\u00e6lpe med opvasken, r\u00f8re i gryden og ordne sko. Denne naturlige trang til at deltage g\u00f8r husholdningsgenstande til de mest genkendelige l\u00e6ringsmaterialer. Sortering af bestik, matchning af kopper med underkopper og t\u00e6lling af tallerkener giver konkret matematik i en hjemlig kontekst. B\u00f8rn l\u00e6rer kategorisering naturligt, n\u00e5r de sorterer husholdningsgenstande efter funktion eller rum. F\u00e6lles M\u00e5ls m\u00e5l for selvhj\u00e6lpsf\u00e6rdigheder og personlig udvikling underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Imitationsleg (3\u20134-\u00e5rige kopierer voksnes husholdningsrutiner)`, howWeAddress: `Matchnings- og sorteringsaktiviteter med husholdningsgenstande bygger p\u00e5 barnets naturlige \u00f8nske om at deltage i voksenlivet` },
      { milestone: `Kategorisering efter funktion (b\u00f8rn l\u00e6rer, at genstande har specifikke form\u00e5l)`, howWeAddress: `Sorteringsaktiviteter, der grupperer k\u00f8kkenredskaber, badevaerelsesting og sovev\u00e6relsesgenstande, styrker logisk t\u00e6nkning` },
      { milestone: `En-til-en-korrespondance (matchning af parrede genstande)`, howWeAddress: `Matchning af kop til underkop, sko til sko og gaffel til tallerken opbygger m\u00e6ngdeforst\u00e5else` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med tre velkendte genstande (kop, ske, tallerken), brug rigtige husholdningsgenstande som supplement, og fokus\u00e9r p\u00e5 simpel matchning. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j sortering efter rum, introduc\u00e9r bogstavsporing af husord og lad dem planl\u00e6gge en borddaokning med korrekt antal.`,
    parentTakeaway: `Hjemmet er det ultimative klasselokale for f\u00f8rskoleb\u00f8rn. Lad barnet hj\u00e6lpe med at sortere bestik i skuffen, t\u00e6lle tallerkener til borddaokning og matche ens sokker fra vasket\u00f8jet. At s\u00e6tte bordet er en \u00e6gte matematik\u00f8velse: \u00e9n tallerken til far, \u00e9n til mor, \u00e9n til mig. Disse daglige rutiner er de mest effektive l\u00e6ringsmomenter.`,
    classroomIntegration: `Husholdningstemaet integreres i f\u00f8rskolens legehj\u00f8rner: i legek\u00f8kkenet \u00f8ves borddaokning og madlavning, i rollelegen vaskes op og ryddes op, ved l\u00e6ringsstationer arbejdes med sorterings- og t\u00e6lleark, og i samlingen tales om hjemmets rutiner. F\u00e6lles M\u00e5ls m\u00e5l for selvhj\u00e6lpsf\u00e6rdigheder og social forst\u00e5else underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Husholdningskategorisering`, emerging: `sorterer 2\u20133 genstande i to grupper med voksenst\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt genstande efter rum eller funktion`, advanced: `sorterer efter to kriterier og forklarer, hvorfor genstanden h\u00f8rer til` },
      { skill: `En-til-en matchning (borddaokning)`, emerging: `matcher 2\u20133 par med st\u00f8tte (kop til underkop)`, proficient: `matcher selvst\u00e6ndigt 5\u20136 par korrekt og t\u00e6ller, om der er nok til alle`, advanced: `planl\u00e6gger borddaokning til et givent antal og finder manglende genstande` },
      { skill: `T\u00e6lling af husholdningsgenstande`, emerging: `t\u00e6ller 1\u20135 genstande med pegen og st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere kopper end tallerkener)` },
    ],
  },

  insects: {
    snippetAnswer: `Insekt-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger marieh\u00f8ns, sommerfugle og bier til t\u00e6lling, matchning og farvel\u00e6gning. Sm\u00e5 krybs fascination driver st\u00e6rkt engagement hos f\u00f8rskoleb\u00f8rn. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Insekttemaet er s\u00e6rligt fangstende for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige har en naturlig fascination af sm\u00e5 kryb \u2014 de stopper op for at betragte myrer p\u00e5 fortovet, f\u00f8lger sommerfugle med \u00f8jnene og jubler over marieh\u00f8ns. Denne medf\u00f8dte nysgerrighed er en kraftfuld l\u00e6ringsmotor. T\u00e6lling af prikker p\u00e5 en marieh\u00f8ne giver personlig matematik, matchning af insekter med deres levesteder opbygger naturforst\u00e5else, og farvel\u00e6gning af sommerfuglens symmetriske vinger introducerer m\u00f8nsterbegreber. Insekter giver ogs\u00e5 anledning til at t\u00e6lle ben (seks!) og sammenligne med edderkopper (otte). F\u00e6lles M\u00e5ls m\u00e5l for naturfagl\u00e6ring og nysgerrighed underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Naturlig observation (3\u20134-\u00e5rige l\u00e6rer at bemoorke sm\u00e5 detaljer i naturen)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med insekter i naturscener sk\u00e6rper observationsevner og opm\u00e6rksomhed p\u00e5 detaljer` },
      { milestone: `T\u00e6lling af sm\u00e5 m\u00e6ngder (prikker, ben, vinger)`, howWeAddress: `T\u00e6lleaktiviteter med marieh\u00f8nsprikker og insektben g\u00f8r matematik konkret og visuelt tydelig` },
      { milestone: `Symmetriforst\u00e5else (f\u00f8rskoleb\u00f8rn begynder at bemoorke spejling)`, howWeAddress: `Farvel\u00e6gning af sommerfugle, hvor begge vinger skal matche, introducerer symmetri p\u00e5 det mest visuelle niveau` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte insekter (marieh\u00f8ne, sommerfugl, bi), brug store illustrationer, og lad barnet t\u00e6lle f\u00e5 prikker. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r flere insektarter, tilf\u00f8j sammenligning af benantal (insekt vs. edderkop) og lad dem tegne symmetriske m\u00f8nstre p\u00e5 sommerfuglevinger.`,
    parentTakeaway: `Insekter er overalt, og det g\u00f8r dem til den mest tilg\u00e6ngelige naturoplevelse. G\u00e5 p\u00e5 insektjagt i haven og t\u00e6l, hvad I finder. Observer en marieh\u00f8ne i et glas og t\u00e6l dens prikker. F\u00f8lg en bi fra blomst til blomst. Disse \u00f8jeblikke af undren og t\u00e6lling er de mest v\u00e6rdifulde l\u00e6ringsoplevelser for sm\u00e5 b\u00f8rn.`,
    classroomIntegration: `Insekttemaet fungerer bedst om for\u00e5ret og sommeren: p\u00e5 naturture ledes efter insekter i haven og p\u00e5 legepladsen, i samlingen tales om ugens insekt, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og farvel\u00e6gningsark, og i sanserummet udforskes insektmodeller med lupper. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, sanseoplevelser og nysgerrighed opfyldes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling af insektdetaljer (prikker, ben)`, emerging: `t\u00e6ller 1\u20134 prikker/ben med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 8 detaljer og matcher med korrekt tal`, advanced: `t\u00e6ller pr\u00e6cist og sammenligner (marieh\u00f8nen har 6 ben, edderkoppen har 8)` },
      { skill: `Insektgenkendelse`, emerging: `navngiver 2\u20133 insekter med voksenst\u00f8tte (marieh\u00f8ne, sommerfugl)`, proficient: `navngiver selvst\u00e6ndigt 4\u20135 insekter og beskriver, hvor de bor`, advanced: `navngiver 6+ insekter og fort\u00e6ller om deres egenskaber` },
      { skill: `Symmetri (sommerfuglevinger)`, emerging: `genkender, at vingerne ligner hinanden, med voksenst\u00f8tte`, proficient: `farvel\u00e6gger begge vinger ens og forklarer matchet`, advanced: `skaber egne symmetriske m\u00f8nstre og anvender symmetri i andre sammenh\u00e6nge` },
    ],
  },

  jobs: {
    snippetAnswer: `Erhverv-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger brandmaend, laeger og bagere til matchning, sortering og farvel\u00e6gning. B\u00f8rnenes rollelege med erhverv driver st\u00e6rkt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Erhvervstemaet rammer f\u00f8rskoleb\u00f8rn pr\u00e6cist, fordi tre- og fire\u00e5rige er midt i den mest intensive periode for rolleleg \u2014 de leger brandmaend, l\u00e6ger, k\u00f8kkenkok og politibetjent dag efter dag. Denne dybe identifikation med voksnes erhverv giver en st\u00e6rk motivationsramme for l\u00e6ring. Matchning af erhverv med v\u00e6rkt\u00f8j (brandmand-slange, l\u00e6ge-stetoskop) opbygger logisk t\u00e6nkning. T\u00e6lling af v\u00e6rkt\u00f8j og udstyr giver konkret matematik. Farvel\u00e6gning af uniformer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for social forst\u00e5else og samfundsviden underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Rolleleg og identitetsudvikling (3\u20134-\u00e5rige udforsker voksenroller gennem leg)`, howWeAddress: `Erhvervsaktiviteter, der matcher personer med v\u00e6rkt\u00f8j og arbejdsplads, underst\u00f8tter og udvider rollelegserfaringer` },
      { milestone: `Logisk matchning (forbinde relaterede genstande)`, howWeAddress: `Matchning af erhverv med v\u00e6rkt\u00f8j og uniform opbygger \u00e5rsag-virkning-t\u00e6nkning og kategorisering` },
      { milestone: `Social bevidsthed (forst\u00e5else af, at mennesker har forskellige roller i samfundet)`, howWeAddress: `Sorteringsaktiviteter med hj\u00e6lpere i lokalsamfundet (brandmand, l\u00e6ge, l\u00e6rer) styrker samfundsforst\u00e5else` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte erhverv (brandmand, l\u00e6ge, l\u00e6rer), brug udkl\u00e6dningst\u00f8j som supplement, og match \u00e9t v\u00e6rkt\u00f8j til hvert erhverv. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere erhverv, introduc\u00e9r bogstavsporing af erhvervsnavne og lad dem fort\u00e6lle, hvad de vil v\u00e6re, n\u00e5r de bliver store.`,
    parentTakeaway: `N\u00e5r barnet leger brandmand eller l\u00e6ge, er det l\u00e6ring i praksis. Udnyt erhvervsinteressen derhjemme: peg p\u00e5 hj\u00e6lpere i hverdagen (postbuddet, buschauf\u00f8ren, kassemedarbejderen), tal om, hvad de g\u00f8r, og leg rollelege med barnets udkl\u00e6dningskiste. Sp\u00f8rg: "Hvad bruger en bageri?" \u2014 disse samtaler bygger ordforr\u00e5d og social forst\u00e5else.`,
    classroomIntegration: `Erhvervstemaet integreres i f\u00f8rskolens rollelege: i samlingen introduceres ugens erhverv med billeder og rekvisitter, i rollelegen indrettes l\u00e6geklinik, brandstation eller bageri, ved l\u00e6ringsstationer arbejdes med matchnings- og sorteringsark, og g\u00e6stehj\u00e6lpere inviteres til at fort\u00e6lle om deres arbejde. F\u00e6lles M\u00e5ls m\u00e5l for social forst\u00e5else og samfundskendskab underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Erhverv-v\u00e6rkt\u00f8j matchning`, emerging: `matcher 1\u20132 erhverv med v\u00e6rkt\u00f8j med voksenst\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 4\u20135 erhverv med korrekt v\u00e6rkt\u00f8j`, advanced: `matcher 6+ erhverv og forklarer forbindelsen mellem erhverv og v\u00e6rkt\u00f8j` },
      { skill: `Erhvervsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 erhverv med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 erhverv og beskriver, hvad de g\u00f8r`, advanced: `navngiver 8+ erhverv og fort\u00e6ller om deres arbejdsplads og v\u00e6rkt\u00f8j` },
      { skill: `Rolleleg (erhvervskontekst)`, emerging: `imiterer \u00e9t erhverv i kort leg med voksenst\u00f8tte`, proficient: `leger selvst\u00e6ndigt 2\u20133 erhvervsroller med passende rekvisitter`, advanced: `kombinerer flere erhvervsroller i komplekse rollelege og inviterer andre b\u00f8rn` },
    ],
  },

  music: {
    snippetAnswer: `Musik-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger instrumenter, noder og rytmer til matchning, t\u00e6lling og farvel\u00e6gning. Musikgl\u00e6den er universel for sm\u00e5 b\u00f8rn og driver dybt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Musiktemaet har en s\u00e6rlig kraft for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige reagerer p\u00e5 musik med hele kroppen \u2014 de danser, klapper og synger spontant. Denne instinktive musikalitet giver en kraftfuld ramme for l\u00e6ring. Matchning af instrumenter med deres lyde opbygger auditiv skelneevne. T\u00e6lling af trommestik, tangenter og strenge giver konkret matematik. Farvel\u00e6gning af instrumenter med mange detaljer tr\u00e6ner finmotorik. Rytmiske m\u00f8nstre (klap-klap-stampe) introducerer sekvenst\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for musisk udfoldelse, kreativitet og kropslig bev\u00e6gelse underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `Rytmisk bevidsthed (3\u20134-\u00e5rige begynder at f\u00f8lge enkle rytmer)`, howWeAddress: `M\u00f8nsterarbejdsark med rytmiske sekvenser (klap-klap-stampe) introducerer m\u00f8nstergenkendelse gennem musikmotiver` },
      { milestone: `Auditiv skelneevne (b\u00f8rn l\u00e6rer at skelne forskellige lyde fra hinanden)`, howWeAddress: `Matchningsaktiviteter, der forbinder instrumentbilleder med lydtyper, styrker auditiv opm\u00e6rksomhed` },
      { milestone: `Finmotorisk kontrol (h\u00e5ndtering af instrumenter og farvel\u00e6gning)`, howWeAddress: `Farvel\u00e6gning af instrumenter med mange detaljer (tangenter, strenge, ventiler) giver pr\u00e6cisionstr\u00e6ning` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre enkle instrumenter (tromme, rasleoaeg, xylofon), brug rigtige instrumenter som supplement, og hold rytmerne til to-element-m\u00f8nstre. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r flere instrumenter, tilf\u00f8j tre-element-rytmer og lad dem designe deres eget instrument.`,
    parentTakeaway: `Musik er en daglig l\u00e6ringsmulighed. Syng sammen i bilen, klap rytmer f\u00f8r sengetid og lav hjemmelavede instrumenter af gryder og tr\u00e6skeer. Lyt til forskellige musikstykker og sp\u00f8rg: "Er det hurtigt eller langsomt?" At danse til musik tr\u00e6ner b\u00e5de rytme, kropsbevidsthed og gl\u00e6de \u2014 den perfekte kombination for f\u00f8rskolel\u00e6ring.`,
    classroomIntegration: `Musiktemaet gennemsyrer f\u00f8rskolens hverdag: i samlingen synges morgensange og klippes rytmer, ved musiktid udforskes instrumenter og lydeksperimenter, ved l\u00e6ringsstationer arbejdes med matchnings- og m\u00f8nsterark, og i bev\u00e6gelseslegen danses til forskellige musikstilarter. F\u00e6lles M\u00e5ls m\u00e5l for musisk udfoldelse og kropslig bev\u00e6gelse er musiktemats kerne.`,
    assessmentRubric: [
      { skill: `Instrumentgenkendelse`, emerging: `navngiver 2\u20133 instrumenter med voksenst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 instrumenter og beskriver deres lyd`, advanced: `navngiver 8+ instrumenter, kategoriserer dem og fort\u00e6ller, hvordan de spilles` },
      { skill: `Rytmisk m\u00f8nstergenkendelse`, emerging: `gentager et simpelt AB-m\u00f8nster med st\u00f8tte`, proficient: `f\u00f8lger og forts\u00e6tter AB- og ABC-m\u00f8nstre selvst\u00e6ndigt`, advanced: `skaber egne rytmem\u00f8nstre og forklarer sekvensen` },
      { skill: `Musikalsk udfoldelse (farvel\u00e6gning og kreativitet)`, emerging: `farvel\u00e6gger instrumenter med grove str\u00f8g`, proficient: `farvel\u00e6gger inden for konturerne med passende farver`, advanced: `tilf\u00f8jer kreative detaljer og designer egne instrumenter` },
    ],
  },

  nature: {
    snippetAnswer: `Natur-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger tr\u00e6er, blomster, sten og vandl\u00f8b til t\u00e6lling, matchning og farvel\u00e6gning. Naturens mangfoldighed giver uendelige l\u00e6ringsmuligheder. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Naturtemaet er et af de mest fundamentale for dansk f\u00f8rskolekultur, fordi tre- og fire\u00e5rige i Danmark tilbringer store dele af deres b\u00f8rnehavetid udend\u00f8rs \u2014 mange er i skovb\u00f8rnehaver eller har daglige naturture. Denne dybe fortrolighed med naturen g\u00f8r naturarbejdsark s\u00e6rligt meningsfulde, fordi barnet genkender elementer fra sine egne oplevelser. T\u00e6lling af blade, sten og kogler giver matematik forankret i virkeligheden. Matchning af dyr med levesteder opbygger \u00f8kologisk t\u00e6nkning. Sortering af naturmaterialer efter egenskaber styrker kategorisering. F\u00e6lles M\u00e5ls m\u00e5l for natur, udeliv og naturfagl\u00e6ring er naturtemaets kerne.`,
    developmentalMilestones: [
      { milestone: `Naturmaterialegenkendelse (3\u20134-\u00e5rige l\u00e6rer at identificere og navngive elementer i naturen)`, howWeAddress: `Matchnings- og sorteringsaktiviteter med naturmaterialer forbinder arbejdsarkenes billeder med virkelige oplevelser fra skovture` },
      { milestone: `\u00c5rstidsforst\u00e5else (f\u00f8rskoleb\u00f8rn begynder at bemoorke forandringer i naturen)`, howWeAddress: `\u00c5rstidsbaserede matchningsaktiviteter (gr\u00f8nne blade om sommeren, gule om efter\u00e5ret) introducerer tidscyklisk t\u00e6nkning` },
      { milestone: `Sensorisk udforskning (b\u00f8rn l\u00e6rer at bruge alle sanser til observation)`, howWeAddress: `Farvel\u00e6gnings- og findaktiviteter, der parres med naturfund (bl\u00f8d mos, ru bark), g\u00f8r l\u00e6ringen multisensorisk` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 de mest velkendte naturvaelementer (tr\u00e6, blomst, sten), brug rigtige naturmaterialer som supplement, og hold scenerne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j \u00e5rstidscykler, introduc\u00e9r enkel \u00f8kologisk sortering (levende/ikke-levende) og lad dem tegne deres egen naturscene.`,
    parentTakeaway: `Naturen er det bedste klasselokale. Tag barnet med ud og saml blade, sten og pinde. T\u00e6l fundene derhjemme, sorter dem efter farve og st\u00f8rrelse, og lav kunstvoaerker af dem. Observer fugle, insekter og skyer. Lad barnet fort\u00e6lle om, hvad det ser og h\u00f8rer \u2014 sproget vokser i naturen. Hverdag med naturoplevelser er den mest v\u00e6rdifulde gave til en f\u00f8rskoleelev.`,
    classroomIntegration: `Naturtemaet er uadskilleligt fra dansk f\u00f8rskolekultur: daglige naturture giver f\u00f8rsteh\u00e5ndsmaterialer, i samlingen tales om vejr og \u00e5rstid, ved l\u00e6ringsstationer arbejdes med natur-t\u00e6lle- og sorteringsark, og i sanserummet udforskes naturmaterialer. \u00c5rshjulet giver naturlige anledninger til at genbes\u00f8ge temaet i nye sammenh\u00e6nge. F\u00e6lles M\u00e5ls m\u00e5l for natur og udeliv er grundlag for hele f\u00f8rskolens p\u00e6dagogik.`,
    assessmentRubric: [
      { skill: `Naturmaterialegenkendelse`, emerging: `navngiver 2\u20133 naturmaterialer med st\u00f8tte (blad, sten, pind)`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 materialer og sorterer dem efter egenskab`, advanced: `navngiver 8+ materialer, forklarer deres oprindelse og sorterer efter flere egenskaber` },
      { skill: `\u00c5rstidsforst\u00e5else`, emerging: `genkender \u00e9n \u00e5rstid (f.eks. vinter = sne) med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt alle fire \u00e5rstider og deres kendetegn`, advanced: `fort\u00e6ller om naturens forandringer gennem \u00e5ret og forudsiger, hvad der sker n\u00e6ste \u00e5rstid` },
      { skill: `T\u00e6lling i naturscener`, emerging: `t\u00e6ller 1\u20135 naturgenstande med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 i en naturscene`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere blade end sten)` },
    ],
  },

  numbers: {
    snippetAnswer: `Tal-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) introducerer cifrene 1\u201310 gennem sporing, t\u00e6lling og matchning med farverige billeder. F\u00f8rste m\u00f8de med tal som symboler opbygger matematisk fundament. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Taltemaet er det mest fundamentale for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige befinder sig i overgangen fra at t\u00e6lle med \u00e9n-til-\u00e9n pegen til at forst\u00e5, at et talsymbol repr\u00e6senterer en m\u00e6ngde. Denne kognitive milepol \u2014 at forbinde symbolet "3" med tre genstande \u2014 er fundamentet for al fremtidig matematik. Talarbejdsark designet til f\u00f8rskolen bruger store, tydelige cifre med tilh\u00f8rende billeder, s\u00e5 barnet visuelt ser forbindelsen. Sporing af talformer udvikler finmotorik og muskelhukommelse. T\u00e6lling af konkrete genstande og cirklen om det rigtige tal styrker m\u00e6ngdeforst\u00e5elsen. F\u00e6lles M\u00e5ls m\u00e5l for tidlig matematisk forst\u00e5else opfyldes direkte.`,
    developmentalMilestones: [
      { milestone: `Talgenkendelse (3\u20134-\u00e5rige begynder at genkende cifre som symboler for m\u00e6ngder)`, howWeAddress: `Tal-billede-matchning, hvor hvert ciffer pr\u00e6senteres med tilsvarende antal genstande, g\u00f8r forbindelsen tydelig` },
      { milestone: `En-til-en-korrespondance (f\u00f8rskoleb\u00f8rn mestrer at pege og t\u00e6lle \u00e9n genstand ad gangen)`, howWeAddress: `T\u00e6lleaktiviteter med tydelige genstande og t\u00e6lleprikker g\u00f8r den abstrakte f\u00e6rdighed konkret` },
      { milestone: `Talformssporing (overgang fra fri tegning til kontrolleret talskrivning)`, howWeAddress: `Prikkede sporingsark med store cifre og startpile guider h\u00e5nden og opbygger motorisk hukommelse for talformer` },
      { milestone: `M\u00e6ngdesammenligning (f\u00f8rskoleb\u00f8rn begynder at forst\u00e5 mere/f\u00e6rre)`, howWeAddress: `Sammenligningsaktiviteter, hvor barnet cirkler den st\u00f8rste eller mindste gruppe, bygger m\u00e6ngdeforst\u00e5else` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med tallene 1\u20135, brug fysiske t\u00e6llere (klodser, b\u00e6rer) som supplement, og fokus\u00e9r p\u00e5 \u00e9t tal ad gangen. For avancerede f\u00f8rskoleb\u00f8rn udvid til 10\u201320, tilf\u00f8j enkel sammenligning (st\u00f8rre end/mindre end) og lad dem skrive tal selvst\u00e6ndigt fra hukommelsen.`,
    parentTakeaway: `Tal er overalt i barnets hverdag. T\u00e6l trappetrin, n\u00e5r I g\u00e5r op, t\u00e6l \u00e6bler i sk\u00e5len, peg p\u00e5 husnumre p\u00e5 ture. Vis barnet, at tallet "3" p\u00e5 d\u00f8ren betyder det samme som tre fingre. Brug brettspil med terninger til naturlig t\u00e6lle\u00f8velse. De mest effektive tal\u00f8velser er de, der sker i hverdagen \u2014 ikke som lektier, men som samtaler.`,
    classroomIntegration: `Taltemaet l\u00f8ber som en grundpille gennem hele f\u00f8rskole\u00e5ret: i samlingen t\u00e6lles b\u00f8rn, dage og vejr, ved l\u00e6ringsstationer arbejdes med sporings- og t\u00e6lleark, i legen bruges t\u00e6rninger og brettspil, og i hverdagen t\u00e6lles alt fra sko til mellemmadsbidder. Taltemaet er ikke en isoleret uge men en daglig praksis, der opfylder F\u00e6lles M\u00e5ls m\u00e5l for matematisk bevidsthed.`,
    assessmentRubric: [
      { skill: `Talgenkendelse (cifre)`, emerging: `genkender 2\u20133 cifre med voksenst\u00f8tte`, proficient: `genkender selvst\u00e6ndigt cifrene 1\u201310 og navngiver dem`, advanced: `genkender cifre op til 20 og forbinder dem med korrekte m\u00e6ngder` },
      { skill: `T\u00e6lling med en-til-en-korrespondance`, emerging: `t\u00e6ller 1\u20135 genstande med pegen og st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 med sikker en-til-en-pegen`, advanced: `t\u00e6ller over 10 og v\u00e6lger korrekt tal uden at pege` },
      { skill: `Talformssporing`, emerging: `sporer 2\u20133 cifre genkendeligt p\u00e5 prikkede linjer`, proficient: `sporer cifrene 1\u201310 tydeligt med korrekt str\u00f8gretning`, advanced: `skriver flere cifre selvst\u00e6ndigt uden model` },
    ],
  },

  ocean: {
    snippetAnswer: `Hav-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger fisk, hvaler og havstjerner til t\u00e6lling, matchning og farvel\u00e6gning. Havets mystik fascinerer sm\u00e5 b\u00f8rn og driver dyb nysgerrighed. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Havtemaet har en s\u00e6rlig magi for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er fascinerede af den undervandsverden, de kan ane men ikke se \u2014 farverige fisk, store hvaler og mystiske bl\u00e6ksprutter vekker en dyb undren. Danmark er omgivet af hav, s\u00e5 mange b\u00f8rn har f\u00f8rsteh\u00e5ndsoplevelser med strand, b\u00f8lger og muslingeskaller. T\u00e6lling af fisk og havdyr i undervandsscener giver visuelt fengslende matematik. Matchning af dyr med deres levesteder opbygger naturfaglig t\u00e6nkning. Farvel\u00e6gning af detaljerede havv\u00e6sener tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for naturfag og sanseoplevelser underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `St\u00f8rrelsesforst\u00e5else (3\u20134-\u00e5rige l\u00e6rer at sammenligne stor/lille)`, howWeAddress: `Sorteringsaktiviteter med havdyr efter st\u00f8rrelse (lille fisk, stor hval) g\u00f8r st\u00f8rrelsesbegreber konkrete og visuelle` },
      { milestone: `T\u00e6lling i scenekontekst (opbygning af m\u00e6ngdeforst\u00e5else med mange genstande)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med fisk, s\u00f8stjerner og muslingeskaller i undervandsscener` },
      { milestone: `Farvegenkendelse og -navngivning (havdyrs mange farver)`, howWeAddress: `Farvel\u00e6gningsaktiviteter med farverige koralrev og fisk styrker farvevokabular og kreativt udtryk` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte havdyr (fisk, hval, s\u00f8stjerne), brug store illustrationer, og hold scenerne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere havdyr, introduc\u00e9r st\u00f8rrelsessammenligning p\u00e5 tv\u00e6rs af arter og lad dem tegne deres eget undervandslandskab.`,
    parentTakeaway: `Havet er et uudt\u00f8mmeligt l\u00e6ringstema. P\u00e5 strandture samles muslingeskaller og t\u00e6lles, sorteres efter st\u00f8rrelse og farve. Derhjemme l\u00e6ses havb\u00f8ger og tales om, hvilke dyr der bor i havet. Et akvarium eller en akvariebog giver uendelige samtaleemner. Lad barnet tegne sin egen havbund med fisk og planter \u2014 kreativitet og naturfag smelter sammen.`,
    classroomIntegration: `Havtemaet fungerer s\u00e6rligt godt om sommeren: p\u00e5 strandture samles skaller og observeres dyr i tidevandspytter, i samlingen introduceres ugens havdyr, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og farvel\u00e6gningsark, og i sansebakken udforskes vand, sand og skaller. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, sanseoplevelser og nysgerrighed opfyldes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling af havdyr`, emerging: `t\u00e6ller 1\u20135 fisk/dyr med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 havdyr i en scene`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere fisk end bl\u00e6ksprutter)` },
      { skill: `St\u00f8rrelsessortering (havdyr)`, emerging: `sorterer 2\u20133 dyr i stor/lille med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt 4\u20135 havdyr fra mindst til st\u00f8rst`, advanced: `sorterer efter st\u00f8rrelse og \u00e9n yderligere egenskab og forklarer sine valg` },
      { skill: `Havdyrsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 havdyr med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 havdyr og beskriver dem`, advanced: `navngiver 8+ havdyr og fort\u00e6ller om deres levesteder` },
    ],
  },

  pets: {
    snippetAnswer: `K\u00e6ledyr-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger hunde, katte og kaniner til t\u00e6lling, matchning og farvel\u00e6gning. Den dybe k\u00e6rlighed til k\u00e6ledyr driver st\u00e6rkt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `K\u00e6ledyrstemaet er et af de mest personligt motiverende for f\u00f8rskoleb\u00f8rn, fordi mange tre- og fire\u00e5rige har et k\u00e6ledyr derhjemme eller dr\u00f8mmer om at f\u00e5 et. Den dybe f\u00f8lelsesm\u00e6ssige forbindelse til hunde, katte og kaniner giver en kraftfuld motor for l\u00e6ring. T\u00e6lling af k\u00e6ledyr og deres tilbeh\u00f8r (madsk\u00e5le, bolde, senge) giver konkret matematik med personlig betydning. Matchning af k\u00e6ledyr med pleje (foder, b\u00f8rste, gatur) opbygger ansvarsforst\u00e5else. Farvel\u00e6gning af yndlingsdyr styrker finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for empati, ansvar og natur underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Empati og ansvarsf\u00f8lelse (3\u20134-\u00e5rige begynder at forst\u00e5, at levende v\u00e6sner har behov)`, howWeAddress: `Matchningsaktiviteter, der forbinder k\u00e6ledyr med deres behov (mad, vand, motion), opbygger tidlig ansvarsforst\u00e5else` },
      { milestone: `Kategorisering (b\u00f8rn l\u00e6rer at gruppere dyr efter egenskaber)`, howWeAddress: `Sorteringsaktiviteter med k\u00e6ledyr (pels/fjer, stor/lille, inde/ude) styrker logisk t\u00e6nkning` },
      { milestone: `F\u00f8lelsesm\u00e6ssig tilknytning til l\u00e6ringsmateriale (personlig motivation)`, howWeAddress: `Arbejdsark med b\u00f8rnenes yndlingsdyr udnytter den f\u00f8lelsesm\u00e6ssige forbindelse til dybt engagement` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 de mest velkendte k\u00e6ledyr (hund, kat, kanin), brug t\u00f8jdyr som supplement, og hold aktiviteterne korte og k\u00e6rlige. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j mere uvanlige k\u00e6ledyr (fisk, hamster, skildpadde), introduc\u00e9r bogstavsporing af dyrenavne og lad dem planl\u00e6gge pasning af et fiktivt k\u00e6ledyr.`,
    parentTakeaway: `Hvis familien har et k\u00e6ledyr, er det en daglig l\u00e6ringsmulighed. Lad barnet hj\u00e6lpe med fodring og t\u00e6lle foderstykker, b\u00f8rste dyret og tale om pels og farver. Har I ikke k\u00e6ledyr, bes\u00f8g en dyrebutik eller bondeg\u00e5rd. Billedb\u00f8ger om k\u00e6ledyr giver ordforr\u00e5d og empatitroaning. Sp\u00f8rg: "Hvad har hunden brug for?" \u2014 det bygger ansvarsf\u00f8lelse.`,
    classroomIntegration: `K\u00e6ledyrstemaet integreres i f\u00f8rskolens legehj\u00f8rner: i samlingen fort\u00e6ller b\u00f8rnene om deres k\u00e6ledyr, i rollelegen drives dyreklinik og dyrebutik, ved l\u00e6ringsstationer arbejdes med matchnings- og t\u00e6lleark, og et eventuelt klassek\u00e6ledyr giver f\u00f8rsteh\u00e5ndserfaring med ansvar. F\u00e6lles M\u00e5ls m\u00e5l for empati, natur og social udvikling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `K\u00e6ledyrsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 k\u00e6ledyr med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 k\u00e6ledyr og beskriver deres egenskaber`, advanced: `navngiver 8+ k\u00e6ledyr og fort\u00e6ller om deres behov og pleje` },
      { skill: `K\u00e6ledyr-behov matchning`, emerging: `matcher 1\u20132 k\u00e6ledyr med deres basale behov med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 4\u20135 k\u00e6ledyr med korrekt foder og tilbeh\u00f8r`, advanced: `matcher alle k\u00e6ledyr og forklarer, hvorfor hvert dyr har specifikke behov` },
      { skill: `T\u00e6lling med k\u00e6ledyrsmotiver`, emerging: `t\u00e6ller 1\u20135 k\u00e6ledyr med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere katte end hunde)` },
    ],
  },

  pirates: {
    snippetAnswer: `Pirat-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger skattekister, skibe og papeg\u00f8jer til t\u00e6lling, matchning og farvel\u00e6gning. Pirateventyrets sp\u00e6nding driver dybt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Pirattemaet appellerer dybt til f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige elsker eventyr og forestillingen om at finde skjulte skatte. Denne fantasi giver en st\u00e6rk ramme for l\u00e6ring, fordi piratscenarier naturligt indeholder t\u00e6lling (guldm\u00f8nter i en kiste), matchning (pirat med udstyr), sekvensering (f\u00f8lg skattekortet) og farvel\u00e6gning (skibe og pirater). Pirattemaet introducerer ogs\u00e5 rumlige begreber (kortet viser vejen) og m\u00e6ngdeforst\u00e5else (mange/f\u00e5 guldm\u00f8nter). F\u00e6lles M\u00e5ls m\u00e5l for fantasi, kreativitet og social leg underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `Fantasileg og fort\u00e6lling (3\u20134-\u00e5rige udvikler evnen til at skabe og f\u00f8lge narrativer)`, howWeAddress: `Piratscenarier med skattejagt og eventyr stimulerer fort\u00e6lleevne og kreativ t\u00e6nkning` },
      { milestone: `T\u00e6lling med motivation (guldm\u00f8nter giver st\u00e6rk l\u00e6relyst)`, howWeAddress: `T\u00e6lleaktiviteter med guldm\u00f8nter, juveler og skattekister g\u00f8r matematik til et eventyr` },
      { milestone: `Rumlig orientering (f\u00f8rskoleb\u00f8rn begynder at forst\u00e5 enkle kort og retninger)`, howWeAddress: `Enkle skattekortaktiviteter introducerer rumlig t\u00e6nkning og retningsbegreber (op, ned, til h\u00f8jre)` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 simple piratscener (skib, skat, papeg\u00f8je), hold skattekortene til to eller tre trin, og brug fysiske guldm\u00f8nter som supplement. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j mere komplekse skattekort, introduc\u00e9r bogstavsporing af piratord og lad dem designe deres egen piratflag.`,
    parentTakeaway: `Piratfascinationen kan bruges til l\u00e6ring overalt. Lav en skattejagt i hjemmet med ledetroaade, t\u00e6l plastikm\u00f8nter i en skattekiste, og tegn et skattekort sammen. L\u00e6s piratb\u00f8ger og lad barnet fort\u00e6lle, hvad der sker n\u00e6ste gang. At bygge et piratskib af pappapkasser tr\u00e6ner b\u00e5de kreativitet og rumlig t\u00e6nkning.`,
    classroomIntegration: `Pirattemaet fungerer fantastisk som projektuge: i samlingen fort\u00e6lles pirathistorier, i bevoegelslegen ledes skattejagter p\u00e5 legepladsen, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, og i kunsthj\u00f8rnet bygges skibe og laves piratflag. F\u00e6lles M\u00e5ls m\u00e5l for fantasi, social leg, matematik og sproglig udvikling integreres i \u00e9n temauge.`,
    assessmentRubric: [
      { skill: `T\u00e6lling af piratskat`, emerging: `t\u00e6ller 1\u20135 guldm\u00f8nter med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 skattegenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle "hvor mange tilsammen"-opgaver` },
      { skill: `Skattekortorientering`, emerging: `f\u00f8lger et enkelt to-trins skattekort med st\u00f8tte`, proficient: `f\u00f8lger selvst\u00e6ndigt et tre-trins skattekort`, advanced: `f\u00f8lger fire-trins kort og skaber selv enkle kort til andre` },
      { skill: `Kreativ udfoldelse (piratfarvel\u00e6gning)`, emerging: `farvel\u00e6gger piratmotiver med f\u00e5 farver`, proficient: `farvel\u00e6gger inden for konturerne med varierede farver`, advanced: `tilf\u00f8jer egne kreative detaljer og fort\u00e6ller historien om sin pirat` },
    ],
  },

  robots: {
    snippetAnswer: `Robot-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger venlige robotter med firkantede kroppe og runde hoveder til formgenkendelse, t\u00e6lling og farvel\u00e6gning. Teknologifascinationen driver dybt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Robottemaet er unikt velegnet til f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige fascineres af robotternes simple former \u2014 firkantede kroppe, runde hoveder, rektangul\u00e6re arme \u2014 der g\u00f8r dem til de perfekte redskaber for formgenkendelse. Robotbilleder er i virkeligheden geometri i forklodning. T\u00e6lling af knapper, lys og antennedele giver naturlige matematik\u00f8velser. Matchning af robotdele med former (cirkel-hoved, firkant-krop) opbygger visuel analyse. Farvel\u00e6gning af robotter med klare konturer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, nysgerrighed og tidlig teknologiforst\u00e5else underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Formgenkendelse (3\u20134-\u00e5rige l\u00e6rer at identificere og navngive grundl\u00e6ggende former)`, howWeAddress: `Robotfigurer sammensat af geometriske former g\u00f8r formgenkendelse til en legende aktivitet` },
      { milestone: `T\u00e6lling af detaljer (sm\u00e5 elementer som knapper og lys)`, howWeAddress: `T\u00e6lleaktiviteter med robotknapper, antenner og hjul giver visuelt tydelig matematik` },
      { milestone: `Kreativ konstruktion (f\u00f8rskoleb\u00f8rn begynder at bygge figurer af former)`, howWeAddress: `Byg-en-robot-aktiviteter, hvor b\u00f8rn sammens\u00e6tter geometriske former til robotter, styrker rumlig t\u00e6nkning` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 simple robotter med f\u00e5 former (cirkel, firkant), brug fysiske formklodser som supplement, og lad barnet bygge sin robot med to eller tre dele. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere formtyper (trekant, rektangel), introduc\u00e9r symmetri i robotdesign og lad dem tegne deres egen robot.`,
    parentTakeaway: `Robotter er det perfekte formtema derhjemme. Byg robotter af papkasser og toilet-rullepapirrr\u00f8r \u2014 tal om formerne: "Kroppen er en firkant, hovedet er en cirkel." Brug formklodser til at lave robotfigurer. Peg p\u00e5 former i hverdagen: "D\u00f8ren er et rektangel, ligesom robottens arm." At forbinde former med kendte genstande g\u00f8r geometri sjovt og konkret.`,
    classroomIntegration: `Robottemaet integreres i f\u00f8rskolens formundervisning: i samlingen introduceres former gennem robotbilleder, ved l\u00e6ringsstationer arbejdes med form- og t\u00e6lleark, i kunsthj\u00f8rnet bygges robotter af genbrugsmaterialer, og i byggehj\u00f8rnet konstrueres robotter af klodser. F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, matematik og teknologiforst\u00e5else underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Formgenkendelse i robotter`, emerging: `identificerer 1\u20132 former (cirkel, firkant) med voksenst\u00f8tte`, proficient: `identificerer selvst\u00e6ndigt 3\u20134 former i robotbilleder`, advanced: `navngiver alle grundformer og finder dem i b\u00e5de robotter og andre kontekster` },
      { skill: `T\u00e6lling af robotdetaljer`, emerging: `t\u00e6ller 1\u20134 knapper/lys med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 robotdetaljer og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner detaljer p\u00e5 tv\u00e6rs af robotter` },
      { skill: `Kreativ robotkonstruktion`, emerging: `sammens\u00e6tter 2\u20133 former til en enkel robot med st\u00f8tte`, proficient: `bygger selvst\u00e6ndigt en robot af 4\u20135 former`, advanced: `designer komplekse robotter med mange detaljer og forklarer sit design` },
    ],
  },

  school: {
    snippetAnswer: `Skole-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger skoletasker, b\u00f8ger og farvekridt til matchning, t\u00e6lling og farvel\u00e6gning. Forberedelse til skolens verden g\u00f8r temaet s\u00e6rligt meningsfuldt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Skoletemaet har en s\u00e6rlig relevans for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige i stigende grad er bevidste om, at der findes en "stor skole", der venter forude. Denne nysgerrighed og spenaeding g\u00f8r skoleartikler til sp\u00e6ndende l\u00e6ringsmaterialer. T\u00e6lling af farvekridt, b\u00f8ger og blyanter giver naturlige matematik\u00f8velser. Matchning af skolesager med aktiviteter (blyant til skrivning, saks til klipning) opbygger funktionel forst\u00e5else. Farvel\u00e6gning af skolemotiver tr\u00e6ner finmotorik. Sortering af skoleting efter type og farve styrker kategorisering. F\u00e6lles M\u00e5ls m\u00e5l for skoleparathed og personlig udvikling underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Skoleparathed (3\u20134-\u00e5rige bygger de f\u00e6rdigheder, der forbereder dem til formel l\u00e6ring)`, howWeAddress: `Skoleaktiviteter, der \u00f8ver at sidde, lytte og f\u00f8lge instruktioner, opbygger adf\u00e6rdsm\u00e6ssig parathed` },
      { milestone: `Genstandsgenkendelse og funktion (b\u00f8rn l\u00e6rer, at v\u00e6rkt\u00f8j har specifikke form\u00e5l)`, howWeAddress: `Matchning af skoleartikler med deres funktion (blyant skriver, viskel\u00e6der sletter) styrker logisk t\u00e6nkning` },
      { milestone: `Selvst\u00e6ndighed (f\u00f8rskoleb\u00f8rn \u00f8ver at organisere og klare ting selv)`, howWeAddress: `Sorteringsaktiviteter med skolesager i et pennalh\u00e6fte eller en skoletaske tr\u00e6ner organisering og selvhj\u00e6lp` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med tre velkendte skolesager (blyant, bog, farvekridt), brug rigtige skoleting som supplement, og fokus\u00e9r p\u00e5 simpel matchning. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere skoleartikler, introduc\u00e9r bogstavsporing af skoleord og lad dem "pakke" en skoletaske med korrekt indhold.`,
    parentTakeaway: `At forberede barnet p\u00e5 skolen beh\u00f8ver ikke at v\u00e6re formelt. Lad barnet v\u00e6lge sin egen skoletaske og organisere indholdet, \u00f8v at tegne og farvel\u00e6gge ved bordet, og l\u00e6s b\u00f8ger om at starte i skole. T\u00e6l farvekridt i etuiet og sorter dem efter farve. De vigtigste skoleforberedelser er at \u00f8ve at lytte, vente p\u00e5 tur og klare ting selv \u2014 det tr\u00e6nes bedst i hverdagens rutiner.`,
    classroomIntegration: `Skoletemaet bruges s\u00e6rligt i det sidste f\u00f8rskole\u00e5r: i samlingen tales om, hvad der sker i skolen, ved l\u00e6ringsstationer \u00f8ves med skoleinspirerede arbejdsark, i rollelegen drives "skole" med b\u00f8ger og tavle, og bes\u00f8g p\u00e5 den n\u00e6rliggende skole giver virkeligheds forankring. F\u00e6lles M\u00e5ls m\u00e5l for skoleparathed og overgang til b\u00f8rnehaveklassen er temaets kerne.`,
    assessmentRubric: [
      { skill: `Skoleartikel-genkendelse`, emerging: `navngiver 2\u20133 skolesager med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 skoleartikler og deres funktion`, advanced: `navngiver 8+ artikler og forklarer, hvorn\u00e5r man bruger dem` },
      { skill: `T\u00e6lling af skolesager`, emerging: `t\u00e6ller 1\u20135 farvekridt/blyanter med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 skolesager og matcher med tal`, advanced: `t\u00e6ller over 10 og sorterer skolesager efter type og antal` },
      { skill: `Organisering og selvhj\u00e6lp`, emerging: `l\u00e6gger 2\u20133 ting i skoletasken med st\u00f8tte`, proficient: `organiserer selvst\u00e6ndigt 5\u20136 skolesager p\u00e5 deres plads`, advanced: `pakker en fuld skoletaske og forklarer, hvorfor hver ting er med` },
    ],
  },

  seasons: {
    snippetAnswer: `\u00c5rstid-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger for\u00e5rsblomster, sommersol, efter\u00e5rsblade og vintersne til sortering, matchning og farvel\u00e6gning. \u00c5rstidernes skift g\u00f8r temaet levende og genkendeligt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `\u00c5rstidstemaet er s\u00e6rligt velegnet til f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever \u00e5rstidernes skift med alle sanser \u2014 for\u00e5rets f\u00f8rste blomster, sommerens varme, after\u00e5rets faldende blade og vinterens sne. I Danmark er \u00e5rstiderne markante og giver tydelige visuelle forandringer, som b\u00f8rn kan observere dagligt. Sortering af genstande efter \u00e5rstid opbygger kategorisering og tidscyklisk t\u00e6nkning. Matchning af t\u00f8j med vejr styrker logisk t\u00e6nkning. Farvel\u00e6gning af \u00e5rstidsmotiver tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for natur, \u00e5rstidsforst\u00e5else og sanseoplevelser underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Tidscyklisk t\u00e6nkning (3\u20134-\u00e5rige begynder at forst\u00e5, at \u00e5rstider gentager sig)`, howWeAddress: `\u00c5rstidssekvensering, der viser de fire \u00e5rstider i r\u00e6kkef\u00f8lge, introducerer cyklisk t\u00e6nkning p\u00e5 det mest basale niveau` },
      { milestone: `Sensorisk observation (b\u00f8rn l\u00e6rer at bemoorke forandringer i omgivelserne)`, howWeAddress: `Matchning af \u00e5rstidselementer med naturscener styrker observationsevne og naturforst\u00e5else` },
      { milestone: `T\u00f8j-vejr forbindelse (f\u00f8rskoleb\u00f8rn l\u00e6rer at v\u00e6lge t\u00f8j efter vejret)`, howWeAddress: `Sorteringsaktiviteter, der forbinder \u00e5rstider med passende t\u00f8j, opbygger praktisk hverdagsviden` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 to kontrast\u00e5rstider (sommer/vinter), brug billeder fra barnets egne oplevelser, og hold sorteringerne enkle. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r alle fire \u00e5rstider, tilf\u00f8j sekvensering og cyklisk t\u00e6nkning og lad dem tegne deres yndlings\u00e5rstid.`,
    parentTakeaway: `\u00c5rstiderne er naturens l\u00e6replan. Peg p\u00e5 forandringer i naturen p\u00e5 ture: "Bladene er r\u00f8de nu \u2014 det er efter\u00e5r!" Lad barnet v\u00e6lge t\u00f8j ud fra vejret. Saml blade om after\u00e5ret, byg snem\u00e6nd om vinteren, plant fr\u00f8 om for\u00e5ret og leg med vand om sommeren. Hvert \u00e5rstidsskift er en ny l\u00e6ringsmulighed.`,
    classroomIntegration: `\u00c5rstidstemaet er f\u00f8rskolens naturlige \u00e5rshjul: hvert \u00e5rstidsskift markeres med samlingsaktiviteter, naturture og tematiske arbejdsark. Vinduet dekoreres med \u00e5rstidsmotiver, naturbordets indhold skifter med \u00e5rstiden, og b\u00f8rnene dokumenterer forandringer med tegninger og fotos. F\u00e6lles M\u00e5ls m\u00e5l for natur, tid og sanseoplevelser opfyldes kontinuerligt.`,
    assessmentRubric: [
      { skill: `\u00c5rstidsgenkendelse`, emerging: `genkender \u00e9n \u00e5rstid med voksenst\u00f8tte (sommer = sol)`, proficient: `navngiver selvst\u00e6ndigt alle fire \u00e5rstider og \u00e9t kendetegn for hver`, advanced: `beskriver alle \u00e5rstider detaljeret og fort\u00e6ller om overgangene` },
      { skill: `T\u00f8j-vejr sortering`, emerging: `matcher t\u00f8j til \u00e9n \u00e5rstid med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt t\u00f8j til alle fire \u00e5rstider`, advanced: `forklarer hvorfor bestemt t\u00f8j passer til bestemt vejr og h\u00e5ndterer overgangsscenarier` },
      { skill: `\u00c5rstidssekvensering`, emerging: `ordner to \u00e5rstider med st\u00f8tte`, proficient: `ordner alle fire \u00e5rstider i korrekt r\u00e6kkef\u00f8lge`, advanced: `forst\u00e5r cyklisk gentagelse og kan fort\u00e6lle, hvad der kommer efter vinter` },
    ],
  },

  shapes: {
    snippetAnswer: `Form-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) introducerer cirkler, firkanter og trekanter gennem matchning, sporing og farvel\u00e6gning. Former er fundamentet for al geometri og visuel analyse. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Formtemaet er et af de mest fundamentale for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er midt i processen med at l\u00e6re at identificere og navngive grundl\u00e6ggende former \u2014 en kognitiv milepol, der underst\u00f8tter al fremtidig geometri, bogstavgenkendelse og visuel analyse. Former er overalt i barnets hverdag: den runde bold, den firkantede vinduedsrude, det trekantede hustag. Sporingsaktiviteter med former udvikler finmotorik og formbevidsthed. Matchning af former i hverdagsgenstande kobler abstrakt geometri med konkret virkelighed. Farvel\u00e6gning af formmosaikker tr\u00e6ner h\u00e5ndkontrol. F\u00e6lles M\u00e5ls m\u00e5l for matematisk opm\u00e6rksomhed og rumlig forst\u00e5else opfyldes.`,
    developmentalMilestones: [
      { milestone: `Formgenkendelse og navngivning (3\u20134-\u00e5rige l\u00e6rer at identificere cirkel, firkant og trekant)`, howWeAddress: `Matchningsaktiviteter, der parrer former med hverdagsgenstande (bold = cirkel), g\u00f8r formgenkendelse konkret og meningsfuld` },
      { milestone: `Formsporing (overgang fra fri tegning til kontrolleret formgivning)`, howWeAddress: `Sporingsark med prikkede former og startpile guider h\u00e5nden og opbygger motorisk hukommelse for formkonturer` },
      { milestone: `Formsortering (b\u00f8rn l\u00e6rer at gruppere efter formtype)`, howWeAddress: `Sorteringsaktiviteter, der grupperer genstande efter deres grundform, styrker b\u00e5de formforst\u00e5else og kategorisering` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med to former (cirkel og firkant), brug formklodser som fysisk supplement, og fokus\u00e9r p\u00e5 \u00e9n form pr. session. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r flere former (oval, rektangel, stjerne), tilf\u00f8j formkombinationer (byg et hus af former) og lad dem finde former i omgivelserne.`,
    parentTakeaway: `Former er overalt \u2014 peg p\u00e5 dem! Vinduesruden er en firkant, tallerkenen er en cirkel, hustaget er en trekant. Leg "formjagt" p\u00e5 ture og t\u00e6l, hvor mange cirkler I kan finde. Brug formklodser og lad barnet bygge figurer. At tegne former med kridt p\u00e5 fortovet er b\u00e5de motorik\u00f8velse og geometri. G\u00f8r former til en daglig samtale, ikke en lektie.`,
    classroomIntegration: `Formtemaet gennemsyrer f\u00f8rskolens matematikundervisning: i samlingen synges formsange og ledes formjagt, ved l\u00e6ringsstationer arbejdes med sporings- og matchningsark, i kunsthj\u00f8rnet laves formmosaikker og -tryk, og i hverdagen peges p\u00e5 former i m\u00f8bler, vinduer og leget\u00f8j. F\u00e6lles M\u00e5ls m\u00e5l for matematisk bevidsthed og rumlig forst\u00e5else er formtemaets kerne.`,
    assessmentRubric: [
      { skill: `Formgenkendelse`, emerging: `genkender 1\u20132 former med voksenst\u00f8tte (cirkel, firkant)`, proficient: `genkender og navngiver selvst\u00e6ndigt 3\u20134 grundformer`, advanced: `genkender 5+ former inkl. oval og rektangel, finder dem i hverdagsgenstande` },
      { skill: `Formsporing`, emerging: `sporer \u00e9n form genkendeligt p\u00e5 prikkede linjer`, proficient: `sporer 3\u20134 former tydeligt med korrekt str\u00f8gretning`, advanced: `tegner former selvst\u00e6ndigt uden model og kombinerer dem til figurer` },
      { skill: `Formsortering`, emerging: `sorterer genstande i to formgrupper med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt i tre eller flere formgrupper`, advanced: `sorterer efter form og st\u00f8rrelse samtidig og forklarer sine kriterier` },
    ],
  },

  space: {
    snippetAnswer: `Rum-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger raketter, stjerner og planeter til t\u00e6lling, matchning og farvel\u00e6gning. Rummets mystik og drama fascinerer sm\u00e5 b\u00f8rn intenst. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Rumtemaet har en s\u00e6rlig magi for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige ser op p\u00e5 m\u00e5nen og stjernerne med \u00e6gte undren \u2014 den nat\u00e6mmel, der f\u00f8les uendelig, vekker en nysgerrighed, som er perfekt til l\u00e6ring. Rumbilleder tilbyder dramatisk visuel appel med lyse farver mod m\u00f8rk baggrund. T\u00e6lling af stjerner i stjernebilleder giver matematik i en eventyrlig kontekst. Matchning af astronauter med udstyr opbygger logisk t\u00e6nkning. Formgenkendelse i rumscener (cirkel = planet, trekant = raketfinne) styrker geometriforst\u00e5else. Farvel\u00e6gning af rumfart\u00f8jer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for nysgerrighed og naturfagl\u00e6ring underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Formgenkendelse i kontekst (3\u20134-\u00e5rige l\u00e6rer at finde former i billeder)`, howWeAddress: `Rumbilleder med tydelige former (runde planeter, trekantede raketfinner) g\u00f8r formgenkendelse visuelt sp\u00e6ndende` },
      { milestone: `T\u00e6lling i visuelt rige scener (opbygning af visuel s\u00f8gef\u00e6rdighed)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med stjerner, planeter og m\u00e5ner i natteligt rumscener tr\u00e6ner b\u00e5de t\u00e6lling og visuel opm\u00e6rksomhed` },
      { milestone: `St\u00f8rrelsesforst\u00e5else (sammenligning af stor planet vs. lille stjerne)`, howWeAddress: `Sorteringsaktiviteter med himmellegemer efter st\u00f8rrelse introducerer st\u00f8rrelsesrelationer i en fascinerende kontekst` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte elementer (raket, stjerne, m\u00e5ne), brug selvlysende stjerner som fysisk supplement, og hold scenerne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j planeter og astronautudstyr, introduc\u00e9r formnavne i rumkontekst og lad dem bygge raketter af klodser.`,
    parentTakeaway: `Rummet er overalt \u2014 man skal bare se op. Peg p\u00e5 m\u00e5nen og stjernerne om aftenen og t\u00e6l dem sammen. S\u00e6t selvlysende stjerner p\u00e5 loftet i barnets v\u00e6relse. Byg raketter af papruller og papkasser. L\u00e6s rumb\u00f8ger og se korte videoer om rumfart. Barnets naturlige undren over universet er den st\u00e6rkeste l\u00e6ringsmotor.`,
    classroomIntegration: `Rumtemaet fungerer som en fanagende temauge: i samlingen introduceres rummet med billeder og film, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og formgenkendelsesark, i kunsthj\u00f8rnet bygges raketter og males natteligt rum, og i bev\u00e6gelseslegen simuleres raketopskydning og rumvandring. F\u00e6lles M\u00e5ls m\u00e5l for nysgerrighed, naturfag og kreativitet integreres.`,
    assessmentRubric: [
      { skill: `T\u00e6lling i rumscener`, emerging: `t\u00e6ller 1\u20135 stjerner med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 himmellegemer i en scene`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere stjerner end planeter)` },
      { skill: `Formgenkendelse i rumbilleder`, emerging: `identificerer \u00e9n form (cirkel = planet) med st\u00f8tte`, proficient: `identificerer selvst\u00e6ndigt 3\u20134 former i rumbilleder`, advanced: `navngiver alle former og forklarer, hvilke rumgenstande der har den form` },
      { skill: `Rumgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 rumgenstande med st\u00f8tte (raket, stjerne)`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 rumgenstande og beskriver dem`, advanced: `navngiver 8+ genstande og fort\u00e6ller om, hvad astronauter g\u00f8r i rummet` },
    ],
  },
};

// Build the insertion text for each theme
function buildInsertionText(data) {
  const lines = [];
  lines.push('');
  lines.push(`      snippetAnswer: '${esc(data.snippetAnswer)}',`);
  lines.push(`      uniqueGradeAngle: '${esc(data.uniqueGradeAngle)}',`);

  // developmentalMilestones
  lines.push('      developmentalMilestones: [');
  for (const m of data.developmentalMilestones) {
    lines.push(`        { milestone: '${esc(m.milestone)}', howWeAddress: '${esc(m.howWeAddress)}' },`);
  }
  lines.push('      ],');

  lines.push(`      differentiationNotes: '${esc(data.differentiationNotes)}',`);
  lines.push(`      parentTakeaway: '${esc(data.parentTakeaway)}',`);
  lines.push(`      classroomIntegration: '${esc(data.classroomIntegration)}',`);

  // assessmentRubric
  lines.push('      assessmentRubric: [');
  for (const r of data.assessmentRubric) {
    lines.push(`        { skill: '${esc(r.skill)}', emerging: '${esc(r.emerging)}', proficient: '${esc(r.proficient)}', advanced: '${esc(r.advanced)}' },`);
  }
  lines.push('      ],');

  return lines.join('\n');
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// Process each theme
let successCount = 0;
let errorCount = 0;
const themes = Object.keys(enrichments);

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme, 'da.ts');
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already enriched
  if (content.includes("snippetAnswer:") && content.indexOf("snippetAnswer:") < content.indexOf("'kindergarten'")) {
    // Need to check if snippetAnswer is in the preschool block
    const preschoolIdx = content.indexOf("'preschool'");
    const kindergartenIdx = content.indexOf("'kindergarten'");
    const snippetIdx = content.indexOf("snippetAnswer:");
    if (snippetIdx > preschoolIdx && snippetIdx < kindergartenIdx) {
      console.log(`SKIP (already enriched): ${theme}/da.ts`);
      continue;
    }
  }

  // Find the insertion point: end of faq array in preschool block
  // Pattern: the faq closing "],\n    }," before 'kindergarten'
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  const preschoolBlock = content.substring(preschoolIdx, kindergartenIdx);

  // Find the last "],\n" in the preschool block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(preschoolBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = preschoolIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
