/**
 * Manipulatives metadata — in-code source of truth for the free-play tools.
 *
 * A "manipulative" is a free-play interactive tool with no task structure
 * (vs an "activity" which is a Common-Core-pinned task set, see
 * frontend/lib/activities.ts). Each entry below maps a tool ID to its
 * raw mini-tool URL plus 11-locale display copy.
 *
 * URL pattern: each tool surfaces at /<locale>/tools/ (the index landing
 * built in frontend/app/[locale]/tools/page.tsx). The `mini_tool_url`
 * here is the direct iframe-target served by nginx at
 * /var/www/lcs-media/mini-tools/<file>.html — clicking a "Try it" link
 * on the landing navigates there directly.
 *
 * 11-locale coverage status per CLAUDE.md §17.5.1:
 *   - Tier 1+2 (en, de, es, nl) operator-strong
 *   - Tier 3 (sv, fi, no) Nordic NSR-flag — translations may need
 *     native-speaker review
 *   - Tier 4 Romance (fr, it, pt) operator-best-effort without NSR per
 *     stronger Claude quality assessment
 *   - Tier 4 Nordic (da) NSR-flag
 */

export interface Manipulative {
  id: string;
  mini_tool_url: string;
  title: Record<string, string>;
  tagline: Record<string, string>;
  description: Record<string, string>;
}

export const MANIPULATIVES: Manipulative[] = [
  {
    id: "ten-frame",
    mini_tool_url: "/mini-tools/ten-frame.html",
    title: {
      en: "Ten Frame",
      de: "Zehnerfeld",
      es: "Marco de diez",
      fr: "Cadre de dix",
      it: "Tabella del dieci",
      pt: "Quadro de dez",
      nl: "Tienraam",
      sv: "Tioram",
      da: "Tierramme",
      no: "Tierramme",
      fi: "Kymmenruudukko",
    },
    tagline: {
      en: "A visual counting tool for numbers 0 to 20.",
      de: "Ein visuelles Zählwerkzeug für Zahlen von 0 bis 20.",
      es: "Una herramienta visual para contar de 0 a 20.",
      fr: "Un outil visuel pour compter de 0 à 20.",
      it: "Uno strumento visivo per contare da 0 a 20.",
      pt: "Uma ferramenta visual para contar de 0 a 20.",
      nl: "Een visueel telhulpmiddel voor de getallen 0 tot 20.",
      sv: "Ett visuellt verktyg för att räkna 0 till 20.",
      da: "Et visuelt værktøj til at tælle 0 til 20.",
      no: "Et visuelt verktøy for å telle 0 til 20.",
      fi: "Visuaalinen apuväline lukujen 0–20 laskemiseen.",
    },
    description: {
      en: "Tap empty cells to fill them, tap filled cells to clear. Toggle between a single ten-frame (0 to 10) and a double ten-frame (0 to 20). Use it for counting, subitizing, place value, and teen numbers.",
      de: "Tippe leere Felder an, um sie zu füllen, und volle Felder, um sie zu leeren. Wechsle zwischen einem einfachen Zehnerfeld (0 bis 10) und einem doppelten Zehnerfeld (0 bis 20). Geeignet für Zählen, Simultanerfassen, Stellenwert und Zahlen von 11 bis 19.",
      es: "Toca celdas vacías para llenarlas y celdas llenas para vaciarlas. Cambia entre un marco de diez simple (0 a 10) y un marco de diez doble (0 a 20). Útil para contar, subitizar, valor posicional y números entre 11 y 19.",
      fr: "Touche les cases vides pour les remplir, et les cases pleines pour les vider. Bascule entre un cadre de dix simple (0 à 10) et un cadre de dix double (0 à 20). Idéal pour compter, subitiser, travailler la valeur de position et les nombres de 11 à 19.",
      it: "Tocca le celle vuote per riempirle e quelle piene per svuotarle. Passa da una tabella del dieci singola (0 a 10) a una doppia (0 a 20). Adatto per contare, subitizzare, lavorare sul valore posizionale e sui numeri da 11 a 19.",
      pt: "Toque em células vazias para preenchê-las e em células cheias para esvaziá-las. Alterne entre um quadro de dez simples (0 a 10) e um quadro de dez duplo (0 a 20). Útil para contar, subitizar, valor posicional e números de 11 a 19.",
      nl: "Tik op lege vakjes om ze te vullen en op gevulde vakjes om ze leeg te maken. Wissel tussen een enkel tienraam (0 tot 10) en een dubbel tienraam (0 tot 20). Voor tellen, in één oogopslag herkennen, positiewaarde en de tienertallen.",
      sv: "Tryck på tomma rutor för att fylla dem och fyllda rutor för att tömma. Växla mellan en enkel tioram (0 till 10) och en dubbel tioram (0 till 20). Använd för att räkna, snabbräkning, positionsvärde och talen 11–19.",
      da: "Tryk på tomme felter for at fylde dem og fyldte felter for at tømme dem. Skift mellem en enkelt tierramme (0 til 10) og en dobbelt tierramme (0 til 20). Til tælling, mængdegenkendelse, positionssystem og tal fra 11 til 19.",
      no: "Trykk på tomme ruter for å fylle dem og fylte ruter for å tømme. Veksle mellom en enkel tierramme (0 til 10) og en dobbel tierramme (0 til 20). For telling, mengdegjenkjenning, posisjonssystem og tallene 11–19.",
      fi: "Napauta tyhjiä ruutuja täyttääksesi ja täysiä ruutuja tyhjentääksesi. Vaihda yksinkertaisen kymmenruudukon (0–10) ja kaksoiskymmenruudukon (0–20) välillä. Sopii laskemiseen, lukumäärän tunnistamiseen, paikka-arvoon ja lukuihin 11–19.",
    },
  },
  {
    id: "number-line",
    mini_tool_url: "/mini-tools/number-line.html",
    title: {
      en: "Number Line",
      de: "Zahlenstrahl",
      es: "Recta numérica",
      fr: "Droite numérique",
      it: "Linea dei numeri",
      pt: "Reta numérica",
      nl: "Getallenlijn",
      sv: "Tallinje",
      da: "Tallinje",
      no: "Tallinje",
      fi: "Lukusuora",
    },
    tagline: {
      en: "A draggable marker on a 0 to 20 number line.",
      de: "Ein verschiebbarer Marker auf einem Zahlenstrahl von 0 bis 20.",
      es: "Un marcador deslizable en una recta numérica de 0 a 20.",
      fr: "Un curseur déplaçable sur une droite numérique de 0 à 20.",
      it: "Un cursore trascinabile su una linea dei numeri da 0 a 20.",
      pt: "Um marcador arrastável numa reta numérica de 0 a 20.",
      nl: "Een sleepbare aanwijzer op een getallenlijn van 0 tot 20.",
      sv: "En dragbar markör på en tallinje från 0 till 20.",
      da: "En trækbar markør på en tallinje fra 0 til 20.",
      no: "En dragbar markør på en tallinje fra 0 til 20.",
      fi: "Vedettävä osoitin lukusuoralla 0–20.",
    },
    description: {
      en: "Drag the marker along the line; the readout shows the current value. Use it for counting on and back, addition and subtraction, and building number sense.",
      de: "Ziehe den Marker entlang des Zahlenstrahls; die Anzeige zeigt den aktuellen Wert. Geeignet zum Weiter- und Zurückzählen, für Addition und Subtraktion und zur Förderung des Zahlverständnisses.",
      es: "Desliza el marcador a lo largo de la recta; el indicador muestra el valor actual. Útil para contar hacia adelante y hacia atrás, sumar y restar, y desarrollar el sentido numérico.",
      fr: "Fais glisser le curseur sur la droite ; l'affichage indique la valeur actuelle. Idéal pour compter en avant et en arrière, additionner, soustraire et développer le sens du nombre.",
      it: "Trascina il cursore lungo la linea; l'indicatore mostra il valore attuale. Adatto per contare in avanti e indietro, per addizioni e sottrazioni, e per sviluppare il senso del numero.",
      pt: "Arraste o marcador ao longo da reta; o indicador mostra o valor atual. Útil para contar para a frente e para trás, somar e subtrair, e desenvolver o sentido de número.",
      nl: "Sleep de aanwijzer langs de lijn; de uitlezing toont de actuele waarde. Voor doortellen en terugtellen, optellen en aftrekken, en het opbouwen van getalbegrip.",
      sv: "Dra markören längs linjen; visningen visar det aktuella värdet. Använd för att räkna framåt och bakåt, för addition och subtraktion, och för att bygga taluppfattning.",
      da: "Træk markøren langs linjen; visningen viser den aktuelle værdi. Til at tælle frem og tilbage, addere og subtrahere, og opbygge talforståelse.",
      no: "Dra markøren langs linjen; visningen viser den aktuelle verdien. For å telle fram og tilbake, addere og subtrahere, og bygge tallforståelse.",
      fi: "Vedä osoitinta lukusuoran päällä; näyttö osoittaa nykyisen arvon. Sopii eteen- ja taaksepäin laskemiseen, yhteen- ja vähennyslaskuun sekä lukukäsitteen rakentamiseen.",
    },
  },
  {
    id: "ruler",
    mini_tool_url: "/mini-tools/ruler.html",
    title: {
      en: "Ruler",
      de: "Lineal",
      es: "Regla",
      fr: "Règle",
      it: "Righello",
      pt: "Régua",
      nl: "Liniaal",
      sv: "Linjal",
      da: "Lineal",
      no: "Linjal",
      fi: "Viivain",
    },
    tagline: {
      en: "A two-handle ruler in centimetres or inches.",
      de: "Ein Lineal mit zwei Griffen, in Zentimetern oder Zoll.",
      es: "Una regla con dos asas, en centímetros o pulgadas.",
      fr: "Une règle à deux poignées, en centimètres ou en pouces.",
      it: "Un righello con due maniglie, in centimetri o pollici.",
      pt: "Uma régua com duas alças, em centímetros ou polegadas.",
      nl: "Een liniaal met twee handgrepen, in centimeters of inches.",
      sv: "En linjal med två handtag, i centimeter eller tum.",
      da: "En lineal med to håndtag, i centimeter eller tommer.",
      no: "En linjal med to håndtak, i centimeter eller tommer.",
      fi: "Viivain kahdella kahvalla, senttimetreinä tai tuumina.",
    },
    description: {
      en: "Drag the two handles to measure any distance on the screen. Toggle between centimetres and inches. Use it for measurement, comparison, and unit conversion.",
      de: "Ziehe die beiden Griffe, um eine Strecke auf dem Bildschirm zu messen. Wechsle zwischen Zentimetern und Zoll. Geeignet für Messen, Vergleichen und Einheitenumrechnung.",
      es: "Arrastra las dos asas para medir cualquier distancia en la pantalla. Cambia entre centímetros y pulgadas. Útil para medir, comparar y convertir unidades.",
      fr: "Fais glisser les deux poignées pour mesurer une distance à l'écran. Bascule entre centimètres et pouces. Idéal pour mesurer, comparer et convertir des unités.",
      it: "Trascina le due maniglie per misurare una distanza sullo schermo. Passa da centimetri a pollici. Adatto per misurare, confrontare e convertire unità.",
      pt: "Arraste as duas alças para medir qualquer distância no ecrã. Alterne entre centímetros e polegadas. Útil para medir, comparar e converter unidades.",
      nl: "Sleep de twee handgrepen om een afstand op het scherm te meten. Wissel tussen centimeters en inches. Voor meten, vergelijken en omrekenen van eenheden.",
      sv: "Dra de två handtagen för att mäta ett avstånd på skärmen. Växla mellan centimeter och tum. Använd för mätning, jämförelse och enhetsomvandling.",
      da: "Træk de to håndtag for at måle en afstand på skærmen. Skift mellem centimeter og tommer. Til måling, sammenligning og enhedsomregning.",
      no: "Dra de to håndtakene for å måle en avstand på skjermen. Veksle mellom centimeter og tommer. For måling, sammenligning og enhetsomregning.",
      fi: "Vedä kahta kahvaa mittaaksesi minkä tahansa etäisyyden näytöllä. Vaihda senttimetrien ja tuumien välillä. Sopii mittaamiseen, vertailuun ja yksiköiden muuntamiseen.",
    },
  },
];

// Landing-page chrome strings. Kept here (not in next-intl) so the
// manipulatives surface owns all its copy in one file. Migrate to message
// files later if a second consumer surfaces.
export const LANDING_STRINGS: Record<string, {
  pageTitle: string;
  pageIntro: string;
  tryItLink: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  en: {
    pageTitle: "Manipulatives",
    pageIntro: "Free-play interactive tools your students explore directly. No tasks, no checks — just the manipulative.",
    tryItLink: "Try it",
    metaTitle: "Manipulatives — LessonCraftStudio",
    metaDescription: "Free-play interactive K-3 manipulatives: ten frame, number line, ruler. Open in any browser; no signup.",
  },
  de: {
    pageTitle: "Lernwerkzeuge",
    pageIntro: "Interaktive Werkzeuge zum freien Erkunden. Keine Aufgaben, keine Überprüfung — nur das Werkzeug.",
    tryItLink: "Ausprobieren",
    metaTitle: "Lernwerkzeuge — LessonCraftStudio",
    metaDescription: "Interaktive K-3-Lernwerkzeuge zum freien Erkunden: Zehnerfeld, Zahlenstrahl, Lineal. Im Browser nutzbar; ohne Anmeldung.",
  },
  es: {
    pageTitle: "Manipulativos",
    pageIntro: "Herramientas interactivas para explorar libremente. Sin tareas, sin correcciones — solo el manipulativo.",
    tryItLink: "Probar",
    metaTitle: "Manipulativos — LessonCraftStudio",
    metaDescription: "Manipulativos interactivos K-3 para explorar libremente: marco de diez, recta numérica, regla. Funcionan en cualquier navegador; sin registro.",
  },
  fr: {
    pageTitle: "Outils",
    pageIntro: "Outils interactifs à explorer librement. Pas de tâches, pas de corrections — juste l'outil.",
    tryItLink: "Essayer",
    metaTitle: "Outils — LessonCraftStudio",
    metaDescription: "Outils interactifs K-3 à explorer librement : cadre de dix, droite numérique, règle. Dans tout navigateur ; sans inscription.",
  },
  it: {
    pageTitle: "Strumenti",
    pageIntro: "Strumenti interattivi da esplorare liberamente. Niente esercizi, niente verifiche — solo lo strumento.",
    tryItLink: "Prova",
    metaTitle: "Strumenti — LessonCraftStudio",
    metaDescription: "Strumenti interattivi K-3 da esplorare liberamente: tabella del dieci, linea dei numeri, righello. In qualsiasi browser; senza registrazione.",
  },
  pt: {
    pageTitle: "Manipuláveis",
    pageIntro: "Ferramentas interativas para explorar livremente. Sem tarefas, sem verificações — só a ferramenta.",
    tryItLink: "Experimentar",
    metaTitle: "Manipuláveis — LessonCraftStudio",
    metaDescription: "Manipuláveis interativos K-3 para explorar livremente: quadro de dez, reta numérica, régua. Em qualquer navegador; sem registo.",
  },
  nl: {
    pageTitle: "Hulpmiddelen",
    pageIntro: "Interactieve hulpmiddelen om vrij te verkennen. Geen opdrachten, geen controles — alleen het hulpmiddel.",
    tryItLink: "Probeer",
    metaTitle: "Hulpmiddelen — LessonCraftStudio",
    metaDescription: "Interactieve K-3 hulpmiddelen om vrij te verkennen: tienraam, getallenlijn, liniaal. In elke browser; zonder aanmelden.",
  },
  sv: {
    pageTitle: "Verktyg",
    pageIntro: "Interaktiva verktyg att utforska fritt. Inga uppgifter, inga rättningar — bara verktyget.",
    tryItLink: "Prova",
    metaTitle: "Verktyg — LessonCraftStudio",
    metaDescription: "Interaktiva K-3-verktyg att utforska fritt: tioram, tallinje, linjal. I valfri webbläsare; ingen registrering.",
  },
  da: {
    pageTitle: "Værktøjer",
    pageIntro: "Interaktive værktøjer til fri udforskning. Ingen opgaver, ingen rettelser — bare værktøjet.",
    tryItLink: "Prøv",
    metaTitle: "Værktøjer — LessonCraftStudio",
    metaDescription: "Interaktive K-3-værktøjer til fri udforskning: tierramme, tallinje, lineal. I enhver browser; ingen tilmelding.",
  },
  no: {
    pageTitle: "Verktøy",
    pageIntro: "Interaktive verktøy til fri utforskning. Ingen oppgaver, ingen rettinger — bare verktøyet.",
    tryItLink: "Prøv",
    metaTitle: "Verktøy — LessonCraftStudio",
    metaDescription: "Interaktive K-3-verktøy til fri utforskning: tierramme, tallinje, linjal. I valgfri nettleser; ingen registrering.",
  },
  fi: {
    pageTitle: "Työkalut",
    pageIntro: "Interaktiivisia työkaluja vapaaseen tutkimiseen. Ei tehtäviä, ei tarkistuksia — vain työkalu.",
    tryItLink: "Kokeile",
    metaTitle: "Työkalut — LessonCraftStudio",
    metaDescription: "Interaktiivisia K-3-työkaluja vapaaseen tutkimiseen: kymmenruudukko, lukusuora, viivain. Missä tahansa selaimessa; ei rekisteröitymistä.",
  },
};

/**
 * hreflang alternates for the /<locale>/tools/ landing — one entry per
 * topic-enabled locale (all 11). Used by generateMetadata in the route.
 */
export function landingHreflangAlternates(baseUrl: string): Record<string, string> {
  const out: Record<string, string> = {};
  // No trailing slash — Next.js routes per `next.config.js: trailingSlash: false`.
  for (const loc of ["en", "de", "es", "fr", "it", "pt", "nl", "sv", "da", "no", "fi"]) {
    out[loc] = `${baseUrl}/${loc}/tools`;
  }
  out["x-default"] = `${baseUrl}/en/tools`;
  return out;
}
