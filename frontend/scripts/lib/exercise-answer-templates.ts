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
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * GROUND-TRUTH DISCIPLINE (added Sub-Phase 2.4 — 25th §A.13.6 firing closure):
 *
 * Every template entry MUST cite the source REFERENCE APPS/<app>.html line range
 * it was verified against in the comment immediately preceding the entry.
 * Adding a new template entry without source-citation verification is a defect.
 *
 * When the source app's rendering logic changes, the template must re-verify:
 * grep for the cited line range; if shifted, re-audit the rendering behavior;
 * update template prose + citation line range.
 *
 * Templates describe what the kid ACTUALLY sees and does, NOT what a generic
 * worksheet of that exercise-type "usually" looks like. The 29 §14.10 apps have
 * idiosyncratic UI conventions (symbol-choice buttons vs circle-with-pencil;
 * choice-tap vs draw-line; legend-blank counting vs per-row counting) that must
 * be sourced from the app code, not assumed.
 *
 * Audit history:
 *   - 2026-05-11 initial authoring (Sub-Phase 2.1.2): assumption-based
 *   - 2026-05-11 ground-truth audit (Sub-Phase 2.4): 4 templates rewritten to
 *     match actual app behavior per find-and-count + more-less + word-guess +
 *     odd-one-out reference-source inspection
 * ─────────────────────────────────────────────────────────────────────────────
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
  /**
   * Verified against: REFERENCE APPS/find-and-count.html lines 4549-4566 + 4961-4970.
   * Mode dispatch: exerciseMode='unified'. Letter-spotting is a UI checkbox toggle
   *   (line 1391) that sets data.isBeginningLetterMode (line 2976) — NOT a package
   *   customizationParameters field. The C5 packages don't trigger letter-spotting;
   *   they use themeSelect=animals/fruits which renders object-counting only.
   * Kid interaction: kid scans the whole grid for each target category in the
   *   legend, counts occurrences of that category across the entire grid, and
   *   writes the total in the legend's answer blank for that category. NOT per-row.
   *   The legend lists each target image type with its own answer blank.
   * Audited 2026-05-11 against actual app source.
   */
  'find-and-count|unified': (p, locale) => {
    const rows = num(p, 'gridRows', 4);
    const cols = num(p, 'gridCols', 4);
    const total = rows * cols;
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `One ${rows}×${cols} grid (${total} cells) filled with a mix of ${theme} images. Below the grid, a small legend lists 2–4 target image types — one row per target with a blank for the count. The kid scans the whole grid for each legend target, counts how many times that image appears across all ${total} cells, and writes the total in the legend's answer blank. Answers are whole numbers in range 0–${total}.`,
          example: `Legend shows "cat" with a blank. Kid finds every cat in the ${rows}×${cols} grid (say 4 cats among the mixed ${theme}), and writes "4" in the legend blank for cat. Same for each remaining legend target.`,
          marking: `Mark each legend blank correct when the written count equals the actual number of that image type in the grid. Per-legend-row scoring; partial credit possible (e.g. 3 of 4 legend counts correct).`,
        },
        de: {
          format: `Ein ${rows}×${cols}-Raster (${total} Zellen) mit gemischten ${theme}-Bildern. Unter dem Raster listet eine kleine Legende 2–4 Zielbildtypen auf — pro Ziel eine Zeile mit einem Antwortfeld. Das Kind sucht für jedes Legendenziel das gesamte Raster ab, zählt alle Vorkommen dieses Bildes in allen ${total} Zellen und trägt die Gesamtzahl in das Antwortfeld der Legende ein. Antworten sind ganze Zahlen im Bereich 0–${total}.`,
          example: `Legende zeigt „Katze" mit Antwortfeld. Das Kind findet jede Katze im ${rows}×${cols}-Raster (z. B. 4 Katzen unter den gemischten ${theme}-Bildern) und schreibt „4" in das Antwortfeld für Katze. Gleiches für jedes weitere Legendenziel.`,
          marking: `Jedes Legenden-Antwortfeld richtig markieren, wenn die geschriebene Zahl der tatsächlichen Anzahl dieses Bildtyps im Raster entspricht. Pro-Zeilen-Bewertung; Teilpunkte möglich (z. B. 3 von 4 Legendenzahlen korrekt).`,
        },
        es: {
          format: `Una cuadrícula de ${rows}×${cols} (${total} celdas) con imágenes mezcladas de ${theme}. Debajo de la cuadrícula, una pequeña leyenda lista 2–4 tipos de imagen objetivo — una fila por objetivo con un espacio para la cantidad. El niño busca cada objetivo de la leyenda en toda la cuadrícula, cuenta cuántas veces aparece esa imagen entre las ${total} celdas, y escribe el total en el espacio de la leyenda. Respuestas: números enteros entre 0 y ${total}.`,
          example: `La leyenda muestra "gato" con un espacio. El niño encuentra cada gato en la cuadrícula de ${rows}×${cols} (por ejemplo, 4 gatos entre las imágenes mezcladas de ${theme}) y escribe "4" en el espacio para gato. Igual para cada objetivo restante de la leyenda.`,
          marking: `Marcar correcto cada espacio de la leyenda cuando el número escrito coincide con la cantidad real de ese tipo de imagen en la cuadrícula. Calificación por fila; crédito parcial posible (por ejemplo, 3 de 4 cantidades correctas).`,
        },
        nl: {
          format: `Eén raster van ${rows}×${cols} (${total} cellen) gevuld met een mix van ${theme}-afbeeldingen. Onder het raster staat een kleine legenda met 2–4 doelbeeldtypes — één rij per doel met een vakje voor het aantal. Het kind doorzoekt het hele raster voor elk legendadoel, telt hoe vaak die afbeelding voorkomt in alle ${total} cellen, en schrijft het totaal in het legenda-vakje. Antwoorden: gehele getallen tussen 0 en ${total}.`,
          example: `Legenda toont "kat" met een vakje. Kind vindt elke kat in het ${rows}×${cols}-raster (bijv. 4 katten in de gemengde ${theme}-afbeeldingen) en schrijft "4" in het vakje voor kat. Idem voor elk volgend legendadoel.`,
          marking: `Markeer elk legenda-vakje goed wanneer het geschreven getal overeenkomt met het werkelijke aantal van dat beeldtype in het raster. Per-rij beoordeling; deelpunten mogelijk (bijv. 3 van 4 tellingen goed).`,
        },
      },
      locale
    );
  },

  /**
   * Verified against: REFERENCE APPS/chart-count.html lines 2121-2202 + 2916-2996.
   * Mode dispatch: exerciseMode='unified' is a single well-defined mode (no branching).
   * Kid interaction: tally panel shows N items per category visually grouped;
   *   kid counts each category, fills the bar chart cell-by-cell (one cell per item,
   *   bottom-up per line 2992-2996), and writes the per-category numerical total
   *   in the blank next to each bar. Visual feedback: filled cells turn gold;
   *   green/red on check.
   * Audited 2026-05-11 against actual app source.
   */
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

  /**
   * Verified against: REFERENCE APPS/addition.html lines 3123 + 3517 (mode dispatch).
   * Mode dispatch: exerciseMode='image-image' renders both operands as image groups
   *   (operandA images + "+" sign + operandB images + "=" sign + answer blank).
   * Kid interaction: counts both image groups, writes sum in answer blank.
   * Audited 2026-05-11 against actual app source.
   */
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

  /**
   * Verified against: REFERENCE APPS/more-less.html lines 2991, 3482, 4047-4061.
   * Mode dispatch: exerciseMode='image-image' (comparisonMode='image-to-image' in
   *   customizationParameters) renders two image groups side-by-side with a
   *   three-symbol choice box (>, <, =) between them.
   * Kid interaction: kid TAPS one of three symbol buttons (>, <, =) between the
   *   groups — NOT circles. The symbols are selectable UI buttons that compare the
   *   left count against the right count. Answer per problem is which of {>,<,=}
   *   the kid selected.
   * Audited 2026-05-11 against actual app source.
   */
  'more-less|image-image': (p, locale) => {
    const count = num(p, 'problemCount', 5);
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `${count} comparisons. Each problem shows two groups of ${theme} images side-by-side with a three-symbol choice box between them: >, <, = (greater than / less than / equal). The kid taps the symbol that correctly compares the left count to the right count. Answer per problem is one of three: >, <, or =.`,
          example: `Left group: 4 cats. Right group: 2 cats. Kid taps ">" (4 is greater than 2). If both groups had 3, kid taps "=".`,
          marking: `Mark each problem correct when the tapped symbol correctly compares the visible counts (left vs right). Strictly trichotomous: there is exactly one correct answer per problem.`,
        },
        de: {
          format: `${count} Vergleiche. Jede Aufgabe zeigt zwei Gruppen von ${theme}-Bildern nebeneinander mit einem Auswahlfeld mit drei Symbolen dazwischen: >, <, = (größer als / kleiner als / gleich). Das Kind tippt das Symbol an, das die linke Anzahl korrekt mit der rechten vergleicht. Antwort pro Aufgabe: eines der drei Symbole >, < oder =.`,
          example: `Linke Gruppe: 4 Katzen. Rechte Gruppe: 2 Katzen. Kind tippt „>" (4 ist größer als 2). Bei je 3 Bildern beidseitig tippt das Kind „=".`,
          marking: `Jede Aufgabe richtig markieren, wenn das angetippte Symbol die sichtbaren Anzahlen (links vs. rechts) korrekt vergleicht. Streng trichotomisch: pro Aufgabe gibt es genau eine richtige Antwort.`,
        },
        es: {
          format: `${count} comparaciones. Cada problema muestra dos grupos de imágenes de ${theme} uno al lado del otro con un cuadro de tres símbolos entre ellos: >, <, = (mayor que / menor que / igual). El niño toca el símbolo que compara correctamente la cantidad de la izquierda con la de la derecha. Respuesta por problema: uno de los tres símbolos: >, < o =.`,
          example: `Grupo izquierdo: 4 gatos. Grupo derecho: 2 gatos. El niño toca ">" (4 es mayor que 2). Si ambos grupos tuvieran 3, el niño toca "=".`,
          marking: `Marcar correcto cada problema cuando el símbolo tocado compara correctamente las cantidades visibles (izquierda vs. derecha). Estrictamente tricotómico: hay exactamente una respuesta correcta por problema.`,
        },
        nl: {
          format: `${count} vergelijkingen. Elk probleem toont twee groepen ${theme}-afbeeldingen naast elkaar met een driesymbool-keuzevak ertussen: >, <, = (groter dan / kleiner dan / gelijk). Het kind tikt op het symbool dat het aantal links correct vergelijkt met het aantal rechts. Antwoord per probleem: één van de drie symbolen: >, < of =.`,
          example: `Linker groep: 4 katten. Rechter groep: 2 katten. Kind tikt ">" (4 is groter dan 2). Als beide groepen 3 zouden hebben, tikt het kind "=".`,
          marking: `Goed wanneer het getikte symbool de zichtbare aantallen (links vs. rechts) correct vergelijkt. Strikt trichotoom: er is precies één goed antwoord per probleem.`,
        },
      },
      locale
    );
  },

  /**
   * Verified against: REFERENCE APPS/alphabet-train.html lines 2604, 2689, 1206.
   * Mode dispatch: exerciseMode='unified' renders an 11-wagon train with clue
   *   wagons (pre-filled with letters + theme images) and empty wagons (drop
   *   targets for missing letters). themeSelect controls wagon DECORATION
   *   imagery only — non-essential to the exercise; the kid focuses on letters.
   * Kid interaction: kid writes missing letters into empty wagons. Answers are
   *   single uppercase or lowercase letters from the alphabet (letterCase param
   *   may control case, defaults lowercase).
   * Audited 2026-05-11 against actual app source.
   */
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

  /**
   * Verified against: REFERENCE APPS/matching.html lines 2759, 2989.
   * Mode dispatch: mode='imgname' renders both columns as image+name pairs
   *   (image with word label underneath on BOTH sides). The kid matches by
   *   meaning, using either visual or lexical cues.
   * Kid interaction: kid draws lines connecting each left image+name to its
   *   matching right image+name pair (1-to-1 across the columns).
   * Audited 2026-05-11 against actual app source.
   */
  'matching|imgname': (p, locale) => {
    const count = num(p, 'count', 5);
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `${count} pairs. Both columns show ${theme} images with the target-language word label underneath. The left and right columns contain the SAME items but in shuffled order. The kid draws lines connecting each left image+name to the matching right image+name (1-to-1 matching).`,
          example: `Left side image of a cat (labeled "cat") ↔ Right side image of a cat (also labeled "cat" — same item, different position in the column).`,
          marking: `Mark correct when each line connects a left item to the matching right item (same vocab key on both sides per IMAGE_VOCABULARY).`,
        },
        de: {
          format: `${count} Paare. Beide Spalten zeigen ${theme}-Bilder mit dem Wort in der Zielsprache darunter. Linke und rechte Spalte enthalten DIE GLEICHEN Objekte, jedoch in unterschiedlicher Reihenfolge. Das Kind zieht Linien, die jedes Bild+Wort links mit dem passenden Bild+Wort rechts verbinden (1-zu-1-Zuordnung).`,
          example: `Links: Katzenbild („Katze") ↔ Rechts: Katzenbild („Katze" — gleiches Objekt, andere Position).`,
          marking: `Richtig, wenn jede Linie ein linkes Objekt mit dem identischen rechten Objekt verbindet (gleicher Vokabelschlüssel beidseitig per IMAGE_VOCABULARY).`,
        },
        es: {
          format: `${count} parejas. Ambas columnas muestran imágenes de ${theme} con la palabra en el idioma destino debajo. Las columnas izquierda y derecha contienen LOS MISMOS objetos pero en orden diferente. El niño dibuja líneas conectando cada imagen+palabra izquierda con la imagen+palabra derecha correspondiente (emparejamiento 1 a 1).`,
          example: `Lado izquierdo: imagen de gato (rotulada "gato") ↔ Lado derecho: imagen de gato (también rotulada "gato" — mismo objeto, distinta posición).`,
          marking: `Correcto cuando cada línea conecta un objeto izquierdo con su objeto derecho idéntico (misma clave de vocabulario por IMAGE_VOCABULARY).`,
        },
        nl: {
          format: `${count} paren. Beide kolommen tonen ${theme}-afbeeldingen met het woord in de doeltaal eronder. Linker en rechter kolom bevatten DEZELFDE objecten maar in andere volgorde. Het kind trekt lijnen om elke linker afbeelding+woord te koppelen aan de bijbehorende rechter afbeelding+woord (1-op-1 koppeling).`,
          example: `Links: afbeelding van een kat (gelabeld "kat") ↔ Rechts: afbeelding van een kat (ook gelabeld "kat" — zelfde object, andere positie).`,
          marking: `Goed wanneer elke lijn een linker object verbindt met het identieke rechter object (dezelfde vocabulair-sleutel aan beide kanten per IMAGE_VOCABULARY).`,
        },
      },
      locale
    );
  },

  /**
   * Verified against: REFERENCE APPS/matching.html lines 2743, 2534.
   * Mode dispatch: mode='letter' renders left column as images, right column as
   *   SINGLE UPPERCASE LETTERS (uses .charAt(0).toUpperCase() on each word's
   *   target-locale name).
   * Kid interaction: kid draws lines from each image to the starting letter of
   *   its localized word.
   * Audited 2026-05-11 against actual app source.
   */
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

  /**
   * Verified against: REFERENCE APPS/word-guess.html lines 2569, 2657, 4654-4655.
   * Mode dispatch: exerciseMode='clue-density' is the puzzle SHAPE; the real
   *   content driver is the `difficulty` param (0/2/4/6), which sets the
   *   letter-reveal RATIO per puzzle. difficulty=0 reveals no letters (kid writes
   *   whole word); 2=easy reveals ~1 letter per 2-letter chunk; 4=normal reveals
   *   ~1 per 4-letter chunk; 6=tough reveals ~1 per 6-letter chunk.
   * Kid interaction: kid sees an image clue + a word with some letters revealed
   *   and the rest as blanks; kid writes the missing letters into the blanks.
   * Audited 2026-05-11 against actual app source.
   */
  'word-guess|clue-density': (p, locale) => {
    const count = num(p, 'puzzleCount', 5);
    const difficulty = str(p, 'difficulty', 'easy');
    const letterCase = str(p, 'letterCase', 'lowercase');
    const ratioPhrase = difficulty === 'easy' ? '~1 letter revealed per 2 letters of the word'
      : difficulty === 'normal' ? '~1 letter revealed per 4 letters of the word'
      : difficulty === 'tough' || difficulty === 'hard' ? '~1 letter revealed per 6 letters of the word'
      : `at the ${difficulty} reveal ratio`;
    return pickLocale(
      {
        en: {
          format: `${count} word-completion puzzles. Each puzzle shows an image clue + the target word with some letters revealed and the rest as blanks (${ratioPhrase}, set by the difficulty=${difficulty} parameter). The kid writes the missing letters into the blanks to complete the word. Letter case: ${letterCase}.`,
          example: `Image of a cat + "_ a _" displayed → kid writes "c" and "t" to complete "cat". With difficulty=easy on a 5-letter word like "horse" → "h _ r _ e" with kid filling "o" and "s".`,
          marking: `Mark each puzzle correct when the completed word matches the target IMAGE_VOCABULARY entry for the image's vocab key. Use ${letterCase}-form for comparison; case-insensitive grading recommended for K-3.`,
        },
        de: {
          format: `${count} Wort-Vervollständigungsrätsel. Jedes Rätsel zeigt ein Bildhinweis + das Zielwort mit einigen sichtbaren Buchstaben und dem Rest als Lücken (Anteil über den Parameter difficulty=${difficulty} gesteuert). Das Kind trägt die fehlenden Buchstaben in die Lücken ein. Buchstabenfall: ${letterCase}.`,
          example: `Bild einer Katze + „_ a _ z e" → Kind schreibt „K" und „t", um „Katze" zu vervollständigen. Bei difficulty=easy auf einem 5-Buchstaben-Wort wie „Pferd" → „P _ e _ d" mit „f" und „r" zum Eintragen.`,
          marking: `Jedes Rätsel richtig markieren, wenn das vervollständigte Wort dem Ziel-IMAGE_VOCABULARY-Eintrag entspricht (${letterCase}-Form; Groß-/Kleinschreibung für K-3 vernachlässigbar).`,
        },
        es: {
          format: `${count} acertijos de completar palabras. Cada acertijo muestra una imagen-pista + la palabra objetivo con algunas letras reveladas y el resto en blanco (la proporción depende del parámetro difficulty=${difficulty}). El niño escribe las letras faltantes en los espacios para completar la palabra. Caso: ${letterCase}.`,
          example: `Imagen de un gato + "_ a _ o" mostrado → el niño escribe "g" y "t" para completar "gato". Con difficulty=easy en una palabra de 5 letras como "perro" → "p _ r _ o" con "e" y "r" para rellenar.`,
          marking: `Marcar correcto cada acertijo cuando la palabra completada coincide con la entrada IMAGE_VOCABULARY destino (caso ${letterCase}; calificación insensible a mayúsculas/minúsculas recomendada para K-3).`,
        },
        nl: {
          format: `${count} woordvervolledigings-puzzels. Elke puzzel toont een afbeelding-hint + het doelwoord met enkele letters zichtbaar en de rest als blanco's (de verhouding wordt gestuurd door de difficulty=${difficulty} parameter). Het kind schrijft de ontbrekende letters in de blanco's. Lettergeval: ${letterCase}.`,
          example: `Afbeelding van een kat + "_ a _" → kind schrijft "k" en "t" om "kat" te voltooien. Bij difficulty=easy op een woord van 5 letters zoals "paard" → "p _ a _ d" met "a" en "r" in te vullen.`,
          marking: `Goed rekenen wanneer het voltooide woord overeenkomt met de doel-IMAGE_VOCABULARY-vermelding (geval ${letterCase}; hoofdletterongevoelig beoordelen aanbevolen voor K-3).`,
        },
      },
      locale
    );
  },

  /**
   * Verified against: REFERENCE APPS/picture-sort.html lines 2050-2051, 2142-2149.
   * Mode dispatch: exerciseMode='theme' renders two labeled boxes (left/right)
   *   each populated with theme-specific images from leftCategoryThemeSelect +
   *   rightCategoryThemeSelect. Theme labels auto-populate from dropdown text.
   * Kid interaction: kid sorts each displayed image (drag or tap) into the
   *   correct theme box per its theme membership.
   * Audited 2026-05-11 against actual app source.
   */
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

  /**
   * Verified against: REFERENCE APPS/odd-one-out.html lines 1305-1308, 2793, 2917-2934.
   * Mode dispatch: exerciseMode='unified' with similar-mode (the default; "identical"
   *   mode is unused here). Each row shows 4 image choices: 3 from the configured
   *   themeSelect theme + 1 from a DIFFERENT PAIRED THEME (rolled at deck-generation;
   *   not "unrelated generically").
   * Kid interaction: kid CHOICE-TAPS (selects one of four image buttons) — NOT
   *   draws a circle. The selected image is the kid's answer for that row.
   * Audited 2026-05-11 against actual app source.
   */
  'odd-one-out|unified': (p, locale) => {
    const theme = str(p, 'themeSelect', 'animals');
    return pickLocale(
      {
        en: {
          format: `Each row shows 4 image choices arranged horizontally. THREE images come from the configured ${theme} theme; ONE image comes from a different paired theme that the app rolls at deck-generation (e.g., foods or vehicles). The kid taps the image that does NOT belong with the others — choice-tap interaction, not circle-drawing. Answer per row is one of four image positions.`,
          example: `Row of 4 images: cat, dog, cow, apple → kid taps "apple" (the one from a non-${theme} theme — here foods). The "odd" image is a specific real image from another theme, not a generic distractor.`,
          marking: `Mark each row correct when the tapped image is the one from the non-${theme} paired theme. The app marks the row visually (selected button highlighted; correct/incorrect feedback on Check).`,
        },
        de: {
          format: `Jede Zeile zeigt 4 Bildauswahl-Optionen horizontal angeordnet. DREI Bilder stammen aus dem konfigurierten Thema ${theme}; EIN Bild stammt aus einem anderen, gepaarten Thema, das die App zur Deck-Generierungszeit auswählt (z. B. Lebensmittel oder Fahrzeuge). Das Kind tippt auf das Bild, das NICHT zu den anderen passt — Auswahl-Tipp-Interaktion, kein Einkreisen. Antwort pro Zeile: eine von vier Bildpositionen.`,
          example: `Zeile mit 4 Bildern: Katze, Hund, Kuh, Apfel → Kind tippt „Apfel" an (das aus dem Nicht-${theme}-Thema, hier Lebensmittel). Das „andere" Bild ist ein konkretes Bild aus einem anderen Thema, kein allgemeiner Ablenker.`,
          marking: `Jede Zeile richtig markieren, wenn das angetippte Bild aus dem Nicht-${theme}-gepaarten-Thema stammt. Die App markiert die Auswahl visuell (ausgewählter Button hervorgehoben; Richtig/Falsch-Rückmeldung beim Überprüfen).`,
        },
        es: {
          format: `Cada fila muestra 4 imágenes para elegir, dispuestas horizontalmente. TRES imágenes provienen del tema configurado ${theme}; UNA imagen proviene de un tema emparejado diferente que la aplicación elige en el momento de generar el deck (p. ej., alimentos o vehículos). El niño toca la imagen que NO pertenece — interacción de toque-selección, no rodear. Respuesta por fila: una de cuatro posiciones de imagen.`,
          example: `Fila de 4 imágenes: gato, perro, vaca, manzana → el niño toca "manzana" (la del tema no-${theme}, aquí alimentos). La imagen "distinta" es una imagen concreta de otro tema, no un distractor genérico.`,
          marking: `Marcar correcto cada fila cuando la imagen tocada sea la del tema emparejado no-${theme}. La aplicación marca la selección visualmente (botón seleccionado resaltado; retroalimentación correcto/incorrecto al verificar).`,
        },
        nl: {
          format: `Elke rij toont 4 afbeeldingskeuzes horizontaal naast elkaar. DRIE afbeeldingen komen uit het ingestelde thema ${theme}; ÉÉN afbeelding komt uit een ander gekoppeld thema dat de app bij deck-generatie selecteert (bijv. voedsel of voertuigen). Het kind tikt de afbeelding aan die NIET past — tik-selectie-interactie, geen omcirkelen. Antwoord per rij: één van vier afbeeldingsposities.`,
          example: `Rij van 4 afbeeldingen: kat, hond, koe, appel → kind tikt "appel" (uit het niet-${theme}-thema, hier voedsel). De "andere" afbeelding is een concrete afbeelding uit een ander thema, geen generieke afleider.`,
          marking: `Goed wanneer de getikte afbeelding uit het niet-${theme}-gekoppelde thema komt. De app markeert de selectie visueel (geselecteerde knop opgelicht; goed/fout-feedback bij Controleren).`,
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
