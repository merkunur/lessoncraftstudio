/**
 * exercise-answer-templates.ts — Sub-Phase 2.1.2 per-exercise answer-key guidance.
 *
 * Resolves a composed-exercise entry (appName + exerciseMode + customizationParameters)
 * into a per-locale answer-key prose triplet:
 *   - format:  what correct answers look like (range, set, type)
 *   - example: an illustrative example answer
 *   - marking: how to mark a kid's response correct
 *
 * The 29 §14.10 apps roll concrete problems at deck-generation time; package.yaml
 * specifies only the exercise configuration, so this module CANNOT enumerate
 * concrete problem-by-problem answers. It produces FORMAT-level guidance — the
 * load-bearing artifact for non-native-speaker teachers per materials-catalog.json:
 * §includeExerciseAnswers spec.
 *
 * Templates are keyed by `${appName}|${exerciseMode}`. Registry currently covers
 * the 10 combos used in the 3 C5 free-tier packages (count-objects-1-to-10 +
 * identify-letter-sounds-vowels + identify-living-vs-nonliving). New apps surface
 * as a NULL return → renderExercise falls back to metadata-only.
 *
 * Per-locale Tier 1+2 (en/de/es/nl) authored. Tier 3+4 fall back to en gloss per
 * §17.5 NSR-flag posture (filed in project_k3_phrasing_native_speaker_review.md).
 */

export interface AnswerKeyGuidance {
  format: string;   // describes the correct-answer shape
  example: string;  // illustrative example
  marking: string;  // how to mark correct
}

type Params = Record<string, unknown>;

type Template = (params: Params, locale: string) => AnswerKeyGuidance;

function pickLocale<T>(map: Record<string, T>, locale: string): T {
  return map[locale] || map.en;
}

function num(params: Params, key: string, fallback: number): number {
  const v = params[key];
  return typeof v === 'number' ? v : fallback;
}

function str(params: Params, key: string, fallback = ''): string {
  const v = params[key];
  return typeof v === 'string' ? v : fallback;
}

const TEMPLATES: Record<string, Template> = {
  'find-and-count|unified': (p, locale) => {
    const rows = num(p, 'gridRows', 4);
    const cols = num(p, 'gridCols', 4);
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `Grid of ${rows}×${cols} cells with mixed ${theme} images. The kid counts a target item type per row and writes the count. Answers are whole numbers in range 0–${cols}.`,
          example: `A row with 3 of the target item and 2 distractors → answer is 3.`,
          marking: `Mark correct when the written count matches the actual count of the highlighted item type.`,
        },
        de: {
          format: `Raster mit ${rows}×${cols} Zellen, gemischte ${theme}-Bilder. Das Kind zählt pro Zeile einen bestimmten Gegenstand und schreibt die Anzahl. Antworten sind ganze Zahlen im Bereich 0–${cols}.`,
          example: `Eine Zeile mit 3 Zielobjekten und 2 Ablenkern → Antwort ist 3.`,
          marking: `Richtig markieren, wenn die geschriebene Zahl mit der tatsächlichen Anzahl der hervorgehobenen Objekte übereinstimmt.`,
        },
        es: {
          format: `Cuadrícula de ${rows}×${cols} celdas con imágenes mezcladas de ${theme}. El niño cuenta un tipo de objeto por fila y escribe la cantidad. Respuestas: números enteros entre 0 y ${cols}.`,
          example: `Una fila con 3 objetos objetivo y 2 distractores → respuesta = 3.`,
          marking: `Marcar correcto cuando el número escrito coincide con la cantidad real de los objetos resaltados.`,
        },
        nl: {
          format: `Raster van ${rows}×${cols} cellen met gemengde ${theme}-afbeeldingen. Het kind telt per rij een soort object en schrijft het aantal op. Antwoorden: gehele getallen tussen 0 en ${cols}.`,
          example: `Een rij met 3 doelobjecten en 2 afleiders → antwoord = 3.`,
          marking: `Goed rekenen wanneer het geschreven getal overeenkomt met het werkelijke aantal van de gemarkeerde objecten.`,
        },
      },
      locale
    );
  },

  'chart-count|unified': (_p, locale) =>
    pickLocale(
      {
        en: {
          format: `A tally panel shows N items per category. The kid counts each category and fills a bar chart (one cell per item) and writes the total. Answers are whole numbers per category.`,
          example: `Category "cats" with 4 displayed items → kid fills 4 chart cells and writes 4.`,
          marking: `Mark correct when both the bar-height and the written total match the displayed count per category.`,
        },
        de: {
          format: `Ein Zähl-Feld zeigt N Objekte pro Kategorie. Das Kind zählt pro Kategorie, füllt das Balkendiagramm (eine Zelle pro Objekt) und schreibt die Gesamtzahl. Antworten sind ganze Zahlen pro Kategorie.`,
          example: `Kategorie „Katzen" mit 4 Bildern → Kind füllt 4 Diagrammzellen und schreibt 4.`,
          marking: `Richtig, wenn Balkenhöhe und geschriebene Gesamtzahl mit der gezeigten Anzahl pro Kategorie übereinstimmen.`,
        },
        es: {
          format: `Un panel de conteo muestra N objetos por categoría. El niño cuenta cada categoría, rellena el gráfico de barras (una celda por objeto) y escribe el total. Respuestas: números enteros por categoría.`,
          example: `Categoría "gatos" con 4 imágenes → el niño rellena 4 celdas y escribe 4.`,
          marking: `Correcto cuando la altura de la barra y el total escrito coinciden con la cantidad mostrada por categoría.`,
        },
        nl: {
          format: `Een telpaneel toont N objecten per categorie. Het kind telt per categorie, vult de staafgrafiek in (één cel per object) en schrijft het totaal. Antwoorden: gehele getallen per categorie.`,
          example: `Categorie "katten" met 4 afbeeldingen → kind vult 4 cellen en schrijft 4.`,
          marking: `Goed wanneer zowel de staafhoogte als het geschreven totaal overeenkomen met het werkelijke aantal per categorie.`,
        },
      },
      locale
    ),

  'addition|image-image': (p, locale) => {
    const minOp = num(p, 'minOperand', 1);
    const maxOp = num(p, 'maxOperand', 5);
    const count = num(p, 'problemCount', 6);
    const theme = str(p, 'themeSelect', 'animals');
    const sumMin = minOp + minOp;
    const sumMax = maxOp + maxOp;
    return pickLocale(
      {
        en: {
          format: `${count} addition equations. Each shows two groups of ${theme} images (operands ${minOp}–${maxOp}). The kid counts each group and writes the sum. Answers are whole numbers in range ${sumMin}–${sumMax}.`,
          example: `3 cats + 4 cats = 7. The kid writes 7 in the answer slot.`,
          marking: `Mark correct when the written sum equals the total count of both groups.`,
        },
        de: {
          format: `${count} Additionsaufgaben. Jede zeigt zwei Gruppen von ${theme}-Bildern (Summanden ${minOp}–${maxOp}). Das Kind zählt beide Gruppen und schreibt die Summe. Antworten sind ganze Zahlen im Bereich ${sumMin}–${sumMax}.`,
          example: `3 Katzen + 4 Katzen = 7. Das Kind schreibt 7 in das Antwortfeld.`,
          marking: `Richtig, wenn die geschriebene Summe gleich der Gesamtzahl beider Gruppen ist.`,
        },
        es: {
          format: `${count} sumas. Cada una muestra dos grupos de imágenes de ${theme} (sumandos ${minOp}–${maxOp}). El niño cuenta ambos grupos y escribe la suma. Respuestas: números enteros entre ${sumMin} y ${sumMax}.`,
          example: `3 gatos + 4 gatos = 7. El niño escribe 7 en la casilla.`,
          marking: `Correcto cuando la suma escrita equivale al total de ambos grupos.`,
        },
        nl: {
          format: `${count} optellingen. Elk toont twee groepen ${theme}-afbeeldingen (termen ${minOp}–${maxOp}). Het kind telt beide groepen en schrijft de som. Antwoorden: gehele getallen tussen ${sumMin} en ${sumMax}.`,
          example: `3 katten + 4 katten = 7. Het kind schrijft 7 in het vak.`,
          marking: `Goed wanneer de geschreven som gelijk is aan het totaal van beide groepen.`,
        },
      },
      locale
    );
  },

  'more-less|image-image': (p, locale) => {
    const count = num(p, 'problemCount', 5);
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `${count} comparisons. Each problem shows two groups of ${theme} images. The kid circles the group with MORE items (or LESS, depending on prompt). Answer is a left-or-right choice per problem.`,
          example: `Group A: 4 cats; Group B: 2 cats. Prompt "more" → kid circles Group A.`,
          marking: `Mark correct when the circled group is the one with the larger (or smaller, if "less") count.`,
        },
        de: {
          format: `${count} Vergleiche. Jede Aufgabe zeigt zwei Gruppen von ${theme}-Bildern. Das Kind kreist die Gruppe mit MEHR (oder WENIGER) ein. Antwort: links/rechts pro Aufgabe.`,
          example: `Gruppe A: 4 Katzen; Gruppe B: 2 Katzen. Aufgabe „mehr" → Kind kreist Gruppe A ein.`,
          marking: `Richtig, wenn die eingekreiste Gruppe die mit der größeren (oder kleineren bei „weniger") Anzahl ist.`,
        },
        es: {
          format: `${count} comparaciones. Cada problema muestra dos grupos de imágenes de ${theme}. El niño rodea el grupo con MÁS (o MENOS) elementos. Respuesta: izquierda/derecha por problema.`,
          example: `Grupo A: 4 gatos; Grupo B: 2 gatos. Indicación "más" → el niño rodea el Grupo A.`,
          marking: `Correcto cuando el grupo rodeado tiene la cantidad mayor (o menor en caso de "menos").`,
        },
        nl: {
          format: `${count} vergelijkingen. Elk probleem toont twee groepen ${theme}-afbeeldingen. Het kind omcirkelt de groep met MEER (of MINDER). Antwoord: links/rechts per probleem.`,
          example: `Groep A: 4 katten; Groep B: 2 katten. Vraag "meer" → kind omcirkelt Groep A.`,
          marking: `Goed wanneer de omcirkelde groep degene met het grotere (of kleinere bij "minder") aantal is.`,
        },
      },
      locale
    );
  },

  'alphabet-train|unified': (p, locale) => {
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `An alphabet sequence (a series of wagons) with some letters missing. The kid writes the missing letter in each blank slot. Answers are single letters from the alphabet; ${theme}-themed images decorate each wagon as visual context.`,
          example: `Sequence A _ C → answer is B.`,
          marking: `Mark correct when the written letter is the correct alphabetic successor/predecessor of the visible neighbors.`,
        },
        de: {
          format: `Eine Alphabet-Reihe (Waggons) mit fehlenden Buchstaben. Das Kind schreibt den fehlenden Buchstaben in jedes leere Feld. Antworten: einzelne Buchstaben des Alphabets; ${theme}-Bilder dekorieren jeden Waggon.`,
          example: `Reihe A _ C → Antwort ist B.`,
          marking: `Richtig, wenn der geschriebene Buchstabe der korrekte alphabetische Nachfolger/Vorgänger der sichtbaren Nachbarn ist.`,
        },
        es: {
          format: `Una secuencia de alfabeto (vagones) con letras faltantes. El niño escribe la letra que falta en cada espacio. Respuestas: letras individuales del alfabeto; imágenes de ${theme} decoran cada vagón.`,
          example: `Secuencia A _ C → respuesta = B.`,
          marking: `Correcto cuando la letra escrita es el sucesor/predecesor alfabético correcto de las letras visibles vecinas.`,
        },
        nl: {
          format: `Een alfabet-reeks (wagons) met ontbrekende letters. Het kind schrijft de ontbrekende letter in elk leeg vak. Antwoorden: enkele letters van het alfabet; ${theme}-afbeeldingen versieren elke wagon.`,
          example: `Reeks A _ C → antwoord = B.`,
          marking: `Goed wanneer de geschreven letter de juiste alfabetische opvolger/voorganger is van de zichtbare buurletters.`,
        },
      },
      locale
    );
  },

  'matching|imgname': (p, locale) => {
    const count = num(p, 'count', 5);
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `${count} pairs. Left column: ${theme} images. Right column: the same items as written words (in the deck's target language). The kid draws lines connecting each image to its matching word.`,
          example: `Image of a cat ↔ word "cat" (or "Katze" / "gato" / etc. depending on locale).`,
          marking: `Mark correct when each line connects an image to its matching word in the target locale (per the IMAGE_VOCABULARY entry).`,
        },
        de: {
          format: `${count} Paare. Linke Spalte: ${theme}-Bilder. Rechte Spalte: dieselben Objekte als Wörter (in der Zielsprache des Decks). Das Kind zieht Linien zwischen Bild und passendem Wort.`,
          example: `Bild einer Katze ↔ Wort „Katze" (oder „cat" / „gato" je nach Sprache).`,
          marking: `Richtig, wenn jede Linie ein Bild mit dem passenden Wort der Zielsprache verbindet.`,
        },
        es: {
          format: `${count} parejas. Columna izquierda: imágenes de ${theme}. Columna derecha: las mismas cosas escritas como palabras (en el idioma destino). El niño dibuja líneas entre cada imagen y su palabra.`,
          example: `Imagen de un gato ↔ palabra "gato" (o "cat" / "Katze" según el idioma).`,
          marking: `Correcto cuando cada línea conecta una imagen con su palabra en el idioma destino.`,
        },
        nl: {
          format: `${count} paren. Linker kolom: ${theme}-afbeeldingen. Rechter kolom: dezelfde dingen als woorden (in de doeltaal van het deck). Het kind trekt lijnen tussen elke afbeelding en het bijbehorende woord.`,
          example: `Afbeelding van een kat ↔ woord "kat" (of "cat" / "Katze" afhankelijk van de taal).`,
          marking: `Goed wanneer elke lijn een afbeelding verbindt met het bijbehorende woord in de doeltaal.`,
        },
      },
      locale
    );
  },

  'matching|letter': (p, locale) => {
    const count = num(p, 'count', 5);
    const theme = str(p, 'themeSelect', 'foods');
    return pickLocale(
      {
        en: {
          format: `${count} pairs. Left column: ${theme} images. Right column: single letters. The kid draws lines from each image to the letter that starts (or matches) the image's name in the target locale.`,
          example: `Image of an apple ↔ letter "A".`,
          marking: `Mark correct when each line connects an image to the starting letter of its localized word.`,
        },
        de: {
          format: `${count} Paare. Linke Spalte: ${theme}-Bilder. Rechte Spalte: einzelne Buchstaben. Das Kind zieht Linien vom Bild zum Anfangsbuchstaben (oder passenden Buchstaben) seines Wortes in der Zielsprache.`,
          example: `Bild eines Apfels ↔ Buchstabe „A".`,
          marking: `Richtig, wenn jede Linie ein Bild mit dem Anfangsbuchstaben seines Wortes in der Zielsprache verbindet.`,
        },
        es: {
          format: `${count} parejas. Columna izquierda: imágenes de ${theme}. Columna derecha: letras individuales. El niño dibuja líneas desde cada imagen a la letra inicial (o letra correspondiente) de su palabra en el idioma destino.`,
          example: `Imagen de una manzana ↔ letra "M" (manzana) o "A" (apple), según idioma.`,
          marking: `Correcto cuando cada línea conecta una imagen con la letra inicial de su palabra en el idioma destino.`,
        },
        nl: {
          format: `${count} paren. Linker kolom: ${theme}-afbeeldingen. Rechter kolom: enkele letters. Het kind trekt lijnen van elke afbeelding naar de beginletter (of passende letter) van het woord in de doeltaal.`,
          example: `Afbeelding van een appel ↔ letter "A".`,
          marking: `Goed wanneer elke lijn een afbeelding verbindt met de beginletter van het bijbehorende woord in de doeltaal.`,
        },
      },
      locale
    );
  },

  'word-guess|clue-density': (p, locale) => {
    const count = num(p, 'puzzleCount', 5);
    const difficulty = str(p, 'difficulty', 'easy');
    const letterCase = str(p, 'letterCase', 'lowercase');
    return pickLocale(
      {
        en: {
          format: `${count} word puzzles (difficulty: ${difficulty}). Each shows a partially-revealed word with image clues. The kid writes the missing letters to complete the word. Letter case: ${letterCase}.`,
          example: `Word "cat" with clue image and "_ a _" shown → kid writes "c" and "t" in the blanks.`,
          marking: `Mark correct when the completed word matches the target vocab entry (case-${letterCase}; case-insensitive grading recommended).`,
        },
        de: {
          format: `${count} Wort-Rätsel (Schwierigkeit: ${difficulty}). Jedes zeigt ein teilweise sichtbares Wort mit Bildhinweisen. Das Kind schreibt die fehlenden Buchstaben. Buchstabenfall: ${letterCase}.`,
          example: `Wort „Katze" mit Hinweisbild und „_ a _ z e" → Kind schreibt „K" und „t" in die Lücken.`,
          marking: `Richtig, wenn das vervollständigte Wort dem Zielvokabular entspricht (Schreibweise ${letterCase}; Groß-/Kleinschreibung kann ignoriert werden).`,
        },
        es: {
          format: `${count} acertijos de palabras (dificultad: ${difficulty}). Cada uno muestra una palabra parcialmente revelada con pistas visuales. El niño escribe las letras faltantes. Caso: ${letterCase}.`,
          example: `Palabra "gato" con imagen-pista y "_ a _ o" → el niño escribe "g" y "t".`,
          marking: `Correcto cuando la palabra completada coincide con el vocabulario objetivo (caso ${letterCase}; calificación insensible a mayúsculas/minúsculas recomendada).`,
        },
        nl: {
          format: `${count} woordpuzzels (moeilijkheid: ${difficulty}). Elk toont een gedeeltelijk onthuld woord met afbeelding-hints. Het kind schrijft de ontbrekende letters. Lettergeval: ${letterCase}.`,
          example: `Woord "kat" met hint-afbeelding en "_ a _" → kind schrijft "k" en "t".`,
          marking: `Goed wanneer het voltooide woord overeenkomt met de doelwoordenschat (geval ${letterCase}; hoofdletterongevoelig beoordelen aanbevolen).`,
        },
      },
      locale
    );
  },

  'picture-sort|theme': (p, locale) => {
    const left = str(p, 'leftCategoryThemeSelect', 'animals');
    const right = str(p, 'rightCategoryThemeSelect', 'vehicles');
    return pickLocale(
      {
        en: {
          format: `Two category boxes — Left: ${left}; Right: ${right}. The kid sorts displayed images into the correct box. Answer per image is left-or-right.`,
          example: `Image of a dog → left box (${left}). Image of a car → right box (${right}).`,
          marking: `Mark correct when each image is placed in the box matching its theme. Mixed boxes = incorrect.`,
        },
        de: {
          format: `Zwei Kategorie-Boxen — Links: ${left}; Rechts: ${right}. Das Kind sortiert die gezeigten Bilder in die richtige Box. Antwort pro Bild: links oder rechts.`,
          example: `Bild eines Hundes → linke Box (${left}). Bild eines Autos → rechte Box (${right}).`,
          marking: `Richtig, wenn jedes Bild in der Box ist, die seinem Thema entspricht. Vermischte Boxen = falsch.`,
        },
        es: {
          format: `Dos cajas de categoría — Izquierda: ${left}; Derecha: ${right}. El niño clasifica las imágenes en la caja correcta. Respuesta por imagen: izquierda o derecha.`,
          example: `Imagen de un perro → caja izquierda (${left}). Imagen de un coche → caja derecha (${right}).`,
          marking: `Correcto cuando cada imagen está en la caja que corresponde a su tema. Cajas mezcladas = incorrecto.`,
        },
        nl: {
          format: `Twee categoriedozen — Links: ${left}; Rechts: ${right}. Het kind sorteert de getoonde afbeeldingen in de juiste doos. Antwoord per afbeelding: links of rechts.`,
          example: `Afbeelding van een hond → linker doos (${left}). Afbeelding van een auto → rechter doos (${right}).`,
          marking: `Goed wanneer elke afbeelding in de doos zit die bij het thema past. Gemengde dozen = fout.`,
        },
      },
      locale
    );
  },

  'odd-one-out|unified': (p, locale) => {
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `Each row shows 4 images: 3 from the ${theme} theme and 1 unrelated. The kid circles the image that does NOT belong. Answer per row is a single image-position (1 of 4).`,
          example: `Row: cat, dog, cow, car → kid circles "car".`,
          marking: `Mark correct when the circled image is the off-theme one.`,
        },
        de: {
          format: `Jede Zeile zeigt 4 Bilder: 3 aus dem Thema ${theme} und 1 unzusammenhängendes. Das Kind kreist das Bild ein, das NICHT dazugehört. Antwort pro Zeile: eine Bildposition (1 von 4).`,
          example: `Zeile: Katze, Hund, Kuh, Auto → Kind kreist „Auto" ein.`,
          marking: `Richtig, wenn das eingekreiste Bild das themenfremde ist.`,
        },
        es: {
          format: `Cada fila muestra 4 imágenes: 3 del tema ${theme} y 1 no relacionada. El niño rodea la imagen que NO pertenece. Respuesta por fila: una posición (1 de 4).`,
          example: `Fila: gato, perro, vaca, coche → el niño rodea "coche".`,
          marking: `Correcto cuando la imagen rodeada es la que no pertenece al tema.`,
        },
        nl: {
          format: `Elke rij toont 4 afbeeldingen: 3 uit het thema ${theme} en 1 niet-gerelateerde. Het kind omcirkelt de afbeelding die NIET hoort. Antwoord per rij: één positie (1 van 4).`,
          example: `Rij: kat, hond, koe, auto → kind omcirkelt "auto".`,
          marking: `Goed wanneer de omcirkelde afbeelding de niet-thematische is.`,
        },
      },
      locale
    );
  },
};

export function resolveExerciseAnswerKey(
  appName: string,
  exerciseMode: string | undefined,
  params: Params | undefined,
  locale: string
): AnswerKeyGuidance | null {
  const mode = exerciseMode || 'unified';
  const key = `${appName}|${mode}`;
  const tpl = TEMPLATES[key];
  if (!tpl) return null;
  return tpl(params || {}, locale);
}
