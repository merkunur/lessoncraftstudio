/**
 * Screen-reader question-row templates, per locale.
 *
 * The `en` block is the SOURCE PATTERN SET, not display copy: it is what the 29 apps baked into
 * every non-German deck page, so `rewrite-deck-html-sr-rows.js` parses live rows against it to
 * recover the values before re-rendering them in the deck's own language. Editing an `en`
 * string here breaks that parse — it must stay byte-identical to what the apps emit.
 *
 * `de` is absent on purpose. German decks were published with German rows already (the keys
 * existed for `en` and `de` only), so there is nothing to translate there.
 *
 * ONE RULE GOVERNS ALL OF THESE, and it is why they were authored rather than translated:
 * every placeholder except the numeric ones arrives as a BARE NOMINATIVE noun that cannot be
 * inflected — `{item}`, `{word}`, `{pluralA}`, `{pluralB}`, `{leftValue}`, `{label}`,
 * `{pieceShape}`, `{shape}`. A frame that forces agreement on it is wrong on most pages.
 *
 * The German source shows the trap it walked into: `die Position der {item}` assumes a feminine
 * noun. Every locale below avoids it, each in its own way — Romance and Germanic locales put
 * the noun after a colon or in an apposition so no article or adjective has to agree, and
 * Finnish does the same so no case is governed.
 */
'use strict';

/* ------------------------------------------------------- source patterns (en) */
var en = {
  srWorksheetQuestions: 'Worksheet questions',
  /* These three exist in NO translations file — the apps only ever had the hardcoded English
   * literal, so nine locales were never even a fallback away from correct. Captured from the
   * live pages rather than from a translations file. */
  srExerciseWordGuess: 'Question {n}: Spell the word for the picture shown. Some letters are already filled in.',
  srExerciseWordScramble: 'Question {n}: Unscramble the letters {letters} to spell the word for the picture shown.',
  srExerciseAlphabetTrain: 'Question {n}: Drag the correct letter into wagon {n}.',
  srExerciseMathWorksheet: 'Question {n}: Find what each picture equals using these equations: {equations}.',
  srExerciseAddition: 'Question {n}: {a} plus {b} equals blank.',
  srExerciseAdditionFindAddend: 'Question {n}: blank plus {b} equals {sum}.',
  srExerciseBigSmallFindBig: 'Question {n}: Circle the biggest one.',
  srExerciseBigSmallFindMed: 'Question {n}: Circle the medium-sized one.',
  srExerciseBigSmallFindSmall: 'Question {n}: Circle the smallest one.',
  srExerciseBigSmallOrderAsc: 'Question {n}: Number the {N} pictures from smallest (1) to biggest.',
  srExerciseBigSmallOrderDesc: 'Question {n}: Number the {N} pictures from biggest (1) to smallest.',
  srExerciseChartCount: 'Question {n}: Count the {word} in the picture and shade the column to show how many you counted.',
  srExerciseCodeAddition: 'Question {n}: Add the picture values together and write the total.',
  srExerciseCodeAdditionWordReveal: 'Question {n}: Add the picture values, then write the letter that matches the total.',
  srExerciseFindAndCountCircle: 'Question {n}: Circle every {word} in the picture.',
  srExerciseFindAndCountCount: 'Question {n}: Count every {word} in the picture and write the total.',
  srExerciseFindAndCountCross: 'Question {n}: Cross out every {word} in the picture.',
  srExerciseFindAndCountSquare: 'Question {n}: Draw a square around every {word} in the picture.',
  srExerciseGridMatch: 'Question {n}: Drag the {label} tile into its matching grid cell.',
  srExerciseMatching: 'Question {n}: Match {leftValue} on the left to its matching item on the right.',
  srExerciseMathPuzzle: 'Question {n}: {operationText} blank.',
  srExerciseMissingPieces: 'Question {n}: Drag the missing {pieceShape} piece into the empty space at position {n}.',
  srExerciseMoreLessCheckCross: 'Question {n}: Count the {pluralA} on the left and the {pluralB} on the right. Write each count.',
  srExerciseMoreLessComparison: 'Question {n}: Compare the groups of {pluralA} and {pluralB}. Pick the correct sign: greater than, less than, or equal to.',
  srExerciseOddOneOut: "Question {n}: Find the picture that doesn't belong with the others.",
  srExercisePatternTrain: 'Question {n}: Drag the correct image into wagon {n} to complete the pattern.',
  srExercisePatternWorksheetBlank: 'Question {n}: Fill in the blank to complete the pattern.',
  srExercisePatternWorksheetOptions: 'Question {n}: Choose the picture that completes the pattern.',
  srExercisePrepositionsChoice: 'Question {n}: Choose the preposition that describes the position of the {item} relative to the {shape}.',
  srExercisePrepositionsFillIn: 'Question {n}: Write the preposition that describes the position of the {item} relative to the {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Question {n}: Match the top half of the {item} to its bottom half.',
  srExerciseShadowMatchMakeItWholeVertical: 'Question {n}: Match the left half of the {item} to its right half.',
  srExerciseShadowMatchShadow: 'Question {n}: Match the {item} to its shadow.',
  srExerciseSubtraction: 'Question {n}: {operandA} minus {operandB} equals blank.',
  srExerciseSubtractionFindSubtrahend: 'Question {n}: {operandA} minus blank equals {result}.',
};

/* ------------------------------------------------------------------- Dutch */
var nl = {
  srExerciseMathWorksheet: 'Vraag {n}: zoek uit hoeveel elke afbeelding waard is met behulp van deze vergelijkingen: {equations}.',
  srExerciseWordGuess: 'Vraag {n}: spel het woord bij de afbeelding. Sommige letters zijn al ingevuld.',
  srExerciseWordScramble: 'Vraag {n}: vorm met deze letters het woord bij de afbeelding: {letters}.',
  srExerciseAlphabetTrain: 'Vraag {n}: sleep de juiste letter naar wagon {n}.',
  srWorksheetQuestions: 'Vragen op het blad',
  srExerciseAddition: 'Vraag {n}: {a} plus {b} is gelijk aan leeg vakje.',
  srExerciseAdditionFindAddend: 'Vraag {n}: leeg vakje plus {b} is gelijk aan {sum}.',
  srExerciseBigSmallFindBig: 'Vraag {n}: de grootste omcirkelen.',
  srExerciseBigSmallFindMed: 'Vraag {n}: de middelgrote omcirkelen.',
  srExerciseBigSmallFindSmall: 'Vraag {n}: de kleinste omcirkelen.',
  srExerciseBigSmallOrderAsc: 'Vraag {n}: de {N} afbeeldingen nummeren van de kleinste (1) tot de grootste.',
  srExerciseBigSmallOrderDesc: 'Vraag {n}: de {N} afbeeldingen nummeren van de grootste (1) tot de kleinste.',
  srExerciseChartCount: 'Vraag {n}: tellen op de afbeelding: {word}. Daarna de kolom inkleuren die het aantal aangeeft.',
  srExerciseCodeAddition: 'Vraag {n}: de waarden van de afbeeldingen optellen en het totaal opschrijven.',
  srExerciseCodeAdditionWordReveal: 'Vraag {n}: de waarden van de afbeeldingen optellen en daarna de letter opschrijven die bij het totaal hoort.',
  srExerciseFindAndCountCircle: 'Vraag {n}: overal op de afbeelding omcirkelen: {word}.',
  srExerciseFindAndCountCount: 'Vraag {n}: overal op de afbeelding tellen en het totaal opschrijven: {word}.',
  srExerciseFindAndCountCross: 'Vraag {n}: overal op de afbeelding doorstrepen: {word}.',
  srExerciseFindAndCountSquare: 'Vraag {n}: overal op de afbeelding in een vierkant zetten: {word}.',
  srExerciseGridMatch: 'Vraag {n}: het tegeltje met {label} naar het bijbehorende vakje in het rooster slepen.',
  srExerciseMatching: 'Vraag {n}: links {leftValue} verbinden met de bijbehorende afbeelding rechts.',
  srExerciseMathPuzzle: 'Vraag {n}: {operationText} is gelijk aan leeg vakje.',
  srExerciseMissingPieces: 'Vraag {n}: het ontbrekende stuk in de vorm van {pieceShape} naar de lege plek op positie {n} slepen.',
  srExerciseMoreLessCheckCross: 'Vraag {n}: links {pluralA} tellen en rechts {pluralB} tellen. Beide aantallen opschrijven.',
  srExerciseMoreLessComparison: 'Vraag {n}: de twee groepen vergelijken, {pluralA} en {pluralB}, en het juiste teken kiezen: groter dan, kleiner dan of gelijk aan.',
  srExerciseOddOneOut: 'Vraag {n}: de afbeelding zoeken die niet bij de andere past.',
  srExercisePatternTrain: 'Vraag {n}: de juiste afbeelding naar wagon {n} slepen om het patroon compleet te maken.',
  srExercisePatternWorksheetBlank: 'Vraag {n}: de lege plek invullen om het patroon compleet te maken.',
  srExercisePatternWorksheetOptions: 'Vraag {n}: de afbeelding kiezen die het patroon compleet maakt.',
  srExercisePrepositionsChoice: 'Vraag {n}: het juiste voorzetsel kiezen voor de positie van {item} ten opzichte van {shape}.',
  srExercisePrepositionsFillIn: 'Vraag {n}: het juiste voorzetsel opschrijven voor de positie van {item} ten opzichte van {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Vraag {n}: de bovenste helft verbinden met de onderste helft: {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Vraag {n}: de linkerhelft verbinden met de rechterhelft: {item}.',
  srExerciseShadowMatchShadow: 'Vraag {n}: verbinden met de bijbehorende schaduw: {item}.',
  srExerciseSubtraction: 'Vraag {n}: {operandA} min {operandB} is gelijk aan leeg vakje.',
  srExerciseSubtractionFindSubtrahend: 'Vraag {n}: {operandA} min leeg vakje is gelijk aan {result}.',
};

/* ------------------------------------------------------------------ French */
/* No placeholder ever follows de/du/de la — the elision hazard (d'ovale, d'étoile) is avoided
 * outright. Size adjectives agree with the fixed feminine `image`, never with an inserted noun. */
var fr = {
  srExerciseMathWorksheet: "Question {n} : Trouve la valeur de chaque image à l'aide de ces équations : {equations}.",
  srExerciseWordGuess: "Question {n} : écris le mot correspondant à l'image. Certaines lettres sont déjà inscrites.",
  srExerciseWordScramble: "Question {n} : remets les lettres dans l'ordre pour écrire le mot correspondant à l'image : {letters}.",
  srExerciseAlphabetTrain: 'Question {n} : glisse la bonne lettre dans le wagon {n}.',
  srWorksheetQuestions: 'Questions de la fiche',
  srExerciseAddition: 'Question {n} : {a} plus {b} égale case vide.',
  srExerciseAdditionFindAddend: 'Question {n} : case vide plus {b} égale {sum}.',
  srExerciseBigSmallFindBig: "Question {n} : Entoure l'image la plus grande.",
  srExerciseBigSmallFindMed: "Question {n} : Entoure l'image de taille moyenne.",
  srExerciseBigSmallFindSmall: "Question {n} : Entoure l'image la plus petite.",
  srExerciseBigSmallOrderAsc: 'Question {n} : Numérote les {N} images de la plus petite (1) à la plus grande.',
  srExerciseBigSmallOrderDesc: 'Question {n} : Numérote les {N} images de la plus grande (1) à la plus petite.',
  srExerciseChartCount: "Question {n} : Compte les {word} sur l'image, puis colorie la colonne pour indiquer le nombre trouvé.",
  srExerciseCodeAddition: 'Question {n} : Additionne les valeurs des images et écris le total.',
  srExerciseCodeAdditionWordReveal: 'Question {n} : Additionne les valeurs des images, puis écris la lettre qui correspond au total.',
  srExerciseFindAndCountCircle: "Question {n} : Entoure chaque {word} sur l'image.",
  srExerciseFindAndCountCount: "Question {n} : Compte chaque {word} sur l'image et écris le total.",
  srExerciseFindAndCountCross: "Question {n} : Barre chaque {word} sur l'image.",
  srExerciseFindAndCountSquare: "Question {n} : Trace un carré autour de chaque {word} sur l'image.",
  srExerciseGridMatch: 'Question {n} : Fais glisser la tuile {label} dans la cellule correspondante de la grille.',
  srExerciseMatching: "Question {n} : Relie {leftValue}, à gauche, à l'élément correspondant à droite.",
  srExerciseMathPuzzle: 'Question {n} : {operationText} égale case vide.',
  srExerciseMissingPieces: 'Question {n} : Fais glisser la pièce manquante dans l\'espace vide, à la position {n}. Forme de la pièce : {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Question {n} : Compte les {pluralA} à gauche et les {pluralB} à droite. Écris chaque total.',
  srExerciseMoreLessComparison: 'Question {n} : Compare les deux groupes : {pluralA} et {pluralB}. Choisis le bon signe : supérieur à, inférieur à ou égal à.',
  srExerciseOddOneOut: "Question {n} : Trouve l'image qui ne va pas avec les autres.",
  srExercisePatternTrain: 'Question {n} : Fais glisser la bonne image dans le wagon {n} pour compléter la suite.',
  srExercisePatternWorksheetBlank: 'Question {n} : Remplis la case vide pour compléter la suite.',
  srExercisePatternWorksheetOptions: "Question {n} : Choisis l'image qui complète la suite.",
  srExercisePrepositionsChoice: 'Question {n} : Choisis la préposition qui situe l\'objet par rapport au repère. Objet : {item}. Repère : {shape}.',
  srExercisePrepositionsFillIn: 'Question {n} : Écris la préposition qui situe l\'objet par rapport au repère. Objet : {item}. Repère : {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Question {n} : Relie la moitié du haut à la moitié du bas. Image : {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Question {n} : Relie la moitié de gauche à la moitié de droite. Image : {item}.',
  srExerciseShadowMatchShadow: "Question {n} : Relie l'image à son ombre. Image : {item}.",
  srExerciseSubtraction: 'Question {n} : {operandA} moins {operandB} égale case vide.',
  srExerciseSubtractionFindSubtrahend: 'Question {n} : {operandA} moins case vide égale {result}.',
};

/* ----------------------------------------------------------------- Spanish */
var es = {
  srExerciseMathWorksheet: 'Pregunta {n}: Averigua cuánto vale cada imagen usando estas ecuaciones: {equations}.',
  srExerciseWordGuess: 'Pregunta {n}: Escribe la palabra de la imagen. Algunas letras ya están puestas.',
  srExerciseWordScramble: 'Pregunta {n}: Ordena las letras para escribir la palabra de la imagen: {letters}.',
  srExerciseAlphabetTrain: 'Pregunta {n}: Arrastra la letra correcta al vagón {n}.',
  srWorksheetQuestions: 'Preguntas de la ficha',
  srExerciseAddition: 'Pregunta {n}: {a} más {b} es igual a espacio en blanco.',
  srExerciseAdditionFindAddend: 'Pregunta {n}: espacio en blanco más {b} es igual a {sum}.',
  srExerciseBigSmallFindBig: 'Pregunta {n}: Rodea con un círculo la imagen más grande.',
  srExerciseBigSmallFindMed: 'Pregunta {n}: Rodea con un círculo la imagen mediana.',
  srExerciseBigSmallFindSmall: 'Pregunta {n}: Rodea con un círculo la imagen más pequeña.',
  srExerciseBigSmallOrderAsc: 'Pregunta {n}: Numera las {N} imágenes de la más pequeña (1) a la más grande.',
  srExerciseBigSmallOrderDesc: 'Pregunta {n}: Numera las {N} imágenes de la más grande (1) a la más pequeña.',
  srExerciseChartCount: 'Pregunta {n}: Cuenta en el dibujo: {word}. Colorea la columna para indicar el total.',
  srExerciseCodeAddition: 'Pregunta {n}: Suma los valores de las imágenes y escribe el total.',
  srExerciseCodeAdditionWordReveal: 'Pregunta {n}: Suma los valores de las imágenes y escribe la letra que corresponde al total.',
  srExerciseFindAndCountCircle: 'Pregunta {n}: Busca en el dibujo y rodea con un círculo: {word}.',
  srExerciseFindAndCountCount: 'Pregunta {n}: Cuenta en el dibujo: {word}. Escribe el total.',
  srExerciseFindAndCountCross: 'Pregunta {n}: Busca en el dibujo y tacha: {word}.',
  srExerciseFindAndCountSquare: 'Pregunta {n}: Busca en el dibujo y encierra en un cuadrado: {word}.',
  srExerciseGridMatch: 'Pregunta {n}: Arrastra la pieza {label} hasta su casilla en la cuadrícula.',
  srExerciseMatching: 'Pregunta {n}: Une esta imagen de la izquierda con su pareja de la derecha: {leftValue}.',
  srExerciseMathPuzzle: 'Pregunta {n}: {operationText} espacio en blanco.',
  srExerciseMissingPieces: 'Pregunta {n}: Arrastra la pieza que falta hasta el hueco de la posición {n}. Forma: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Pregunta {n}: Cuenta a la izquierda: {pluralA}. Cuenta a la derecha: {pluralB}. Escribe cada cantidad.',
  srExerciseMoreLessComparison: 'Pregunta {n}: Compara los dos grupos: {pluralA} y {pluralB}. Elige el signo correcto: mayor que, menor que o igual a.',
  srExerciseOddOneOut: 'Pregunta {n}: Encuentra la imagen que no encaja con las demás.',
  srExercisePatternTrain: 'Pregunta {n}: Arrastra la imagen correcta al vagón {n} para completar el patrón.',
  srExercisePatternWorksheetBlank: 'Pregunta {n}: Rellena el hueco para completar el patrón.',
  srExercisePatternWorksheetOptions: 'Pregunta {n}: Elige la imagen que completa el patrón.',
  srExercisePrepositionsChoice: 'Pregunta {n}: Elige la preposición que describe esta posición: {item} respecto a {shape}.',
  srExercisePrepositionsFillIn: 'Pregunta {n}: Escribe la preposición que describe esta posición: {item} respecto a {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Pregunta {n}: Une la mitad de arriba con la mitad de abajo. Imagen: {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Pregunta {n}: Une la mitad de la izquierda con la mitad de la derecha. Imagen: {item}.',
  srExerciseShadowMatchShadow: 'Pregunta {n}: Une esta imagen con su sombra: {item}.',
  srExerciseSubtraction: 'Pregunta {n}: {operandA} menos {operandB} es igual a espacio en blanco.',
  srExerciseSubtractionFindSubtrahend: 'Pregunta {n}: {operandA} menos espacio en blanco es igual a {result}.',
};

/* ----------------------------------------------------------------- Italian */
/* Article allomorphy (il/lo/la/l') and preposition fusion (di+il→del) are both unknowable at
 * runtime, so every inserted noun sits after a colon or in a comma apposition. */
var it = {
  srExerciseMathWorksheet: 'Domanda {n}: scopri quanto vale ogni immagine usando queste equazioni: {equations}.',
  srExerciseWordGuess: "Domanda {n}: scrivi la parola dell'immagine. Alcune lettere sono già inserite.",
  srExerciseWordScramble: "Domanda {n}: rimetti in ordine le lettere per scrivere la parola dell'immagine: {letters}.",
  srExerciseAlphabetTrain: 'Domanda {n}: trascina la lettera giusta nel vagone {n}.',
  srWorksheetQuestions: 'Domande della scheda',
  srExerciseAddition: 'Domanda {n}: {a} più {b} uguale spazio vuoto.',
  srExerciseAdditionFindAddend: 'Domanda {n}: spazio vuoto più {b} uguale {sum}.',
  srExerciseBigSmallFindBig: "Domanda {n}: cerchia l'immagine più grande.",
  srExerciseBigSmallFindMed: "Domanda {n}: cerchia l'immagine di grandezza media.",
  srExerciseBigSmallFindSmall: "Domanda {n}: cerchia l'immagine più piccola.",
  srExerciseBigSmallOrderAsc: 'Domanda {n}: numera le {N} immagini dalla più piccola (1) alla più grande.',
  srExerciseBigSmallOrderDesc: 'Domanda {n}: numera le {N} immagini dalla più grande (1) alla più piccola.',
  srExerciseChartCount: "Domanda {n}: conta nell'immagine gli elementi di questo tipo, {word}, e colora la colonna per indicare quanti ne hai contati.",
  srExerciseCodeAddition: 'Domanda {n}: somma i valori delle figure e scrivi il totale.',
  srExerciseCodeAdditionWordReveal: 'Domanda {n}: somma i valori delle figure, poi scrivi la lettera corrispondente al totale.',
  srExerciseFindAndCountCircle: "Domanda {n}: nell'immagine cerchia ogni elemento di questo tipo: {word}.",
  srExerciseFindAndCountCount: "Domanda {n}: conta nell'immagine tutti gli elementi di questo tipo, {word}, e scrivi il totale.",
  srExerciseFindAndCountCross: "Domanda {n}: nell'immagine barra ogni elemento di questo tipo: {word}.",
  srExerciseFindAndCountSquare: "Domanda {n}: nell'immagine disegna un quadrato attorno a ogni elemento di questo tipo: {word}.",
  srExerciseGridMatch: "Domanda {n}: trascina la tessera con l'etichetta {label} nella cella corrispondente della griglia.",
  srExerciseMatching: "Domanda {n}: collega l'elemento a sinistra, {leftValue}, con quello corrispondente a destra.",
  srExerciseMathPuzzle: 'Domanda {n}: {operationText} spazio vuoto.',
  srExerciseMissingPieces: 'Domanda {n}: trascina nello spazio vuoto in posizione {n} il pezzo mancante di questa forma: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Domanda {n}: conta gli elementi a sinistra, {pluralA}, e quelli a destra, {pluralB}. Scrivi le due quantità.',
  srExerciseMoreLessComparison: 'Domanda {n}: confronta i due gruppi, {pluralA} e {pluralB}. Scegli il segno corretto: maggiore di, minore di o uguale a.',
  srExerciseOddOneOut: "Domanda {n}: trova l'immagine che non va insieme alle altre.",
  srExercisePatternTrain: "Domanda {n}: trascina l'immagine giusta nel vagone {n} per completare la sequenza.",
  srExercisePatternWorksheetBlank: 'Domanda {n}: completa la sequenza riempiendo lo spazio vuoto.',
  srExercisePatternWorksheetOptions: "Domanda {n}: scegli l'immagine che completa la sequenza.",
  srExercisePrepositionsChoice: 'Domanda {n}: scegli la preposizione che descrive questa posizione: {item} rispetto a {shape}.',
  srExercisePrepositionsFillIn: 'Domanda {n}: scrivi la preposizione che descrive questa posizione: {item} rispetto a {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Domanda {n}: collega la metà superiore alla metà inferiore di questa figura: {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Domanda {n}: collega la metà sinistra alla metà destra di questa figura: {item}.',
  srExerciseShadowMatchShadow: "Domanda {n}: collega alla sua ombra questa figura: {item}.",
  srExerciseSubtraction: 'Domanda {n}: {operandA} meno {operandB} uguale spazio vuoto.',
  srExerciseSubtractionFindSubtrahend: 'Domanda {n}: {operandA} meno spazio vuoto uguale {result}.',
};

/* ----------------------------------------------- Portuguese (Brazilian) */
var pt = {
  srExerciseMathWorksheet: 'Questão {n}: Descubra quanto vale cada imagem usando estas equações: {equations}.',
  srExerciseWordGuess: 'Questão {n}: Escreva a palavra da imagem. Algumas letras já estão preenchidas.',
  srExerciseWordScramble: 'Questão {n}: Coloque as letras na ordem certa para escrever a palavra da imagem: {letters}.',
  srExerciseAlphabetTrain: 'Questão {n}: Arraste a letra correta para o vagão {n}.',
  srWorksheetQuestions: 'Questões da atividade',
  srExerciseAddition: 'Questão {n}: {a} mais {b} é igual a lacuna.',
  srExerciseAdditionFindAddend: 'Questão {n}: lacuna mais {b} é igual a {sum}.',
  srExerciseBigSmallFindBig: 'Questão {n}: Circule a figura maior.',
  srExerciseBigSmallFindMed: 'Questão {n}: Circule a figura de tamanho médio.',
  srExerciseBigSmallFindSmall: 'Questão {n}: Circule a figura menor.',
  srExerciseBigSmallOrderAsc: 'Questão {n}: Numere as {N} figuras da menor (1) até a maior.',
  srExerciseBigSmallOrderDesc: 'Questão {n}: Numere as {N} figuras da maior (1) até a menor.',
  srExerciseChartCount: 'Questão {n}: Conte na imagem e pinte a coluna com a quantidade contada. Contagem de: {word}.',
  srExerciseCodeAddition: 'Questão {n}: Some os valores das figuras e escreva o total.',
  srExerciseCodeAdditionWordReveal: 'Questão {n}: Some os valores das figuras e escreva a letra correspondente ao total.',
  srExerciseFindAndCountCircle: 'Questão {n}: Circule na imagem todas as figuras deste tipo: {word}.',
  srExerciseFindAndCountCount: 'Questão {n}: Conte na imagem e escreva o total das figuras deste tipo: {word}.',
  srExerciseFindAndCountCross: 'Questão {n}: Marque com um X na imagem todas as figuras deste tipo: {word}.',
  srExerciseFindAndCountSquare: 'Questão {n}: Desenhe um quadrado ao redor de todas as figuras deste tipo na imagem: {word}.',
  srExerciseGridMatch: 'Questão {n}: Arraste a peça {label} para a célula correspondente da grade.',
  srExerciseMatching: 'Questão {n}: Ligue o item da esquerda ao seu par da direita. Item: {leftValue}.',
  srExerciseMathPuzzle: 'Questão {n}: {operationText} lacuna.',
  srExerciseMissingPieces: 'Questão {n}: Arraste para o espaço vazio na posição {n} a peça que falta, com este formato: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Questão {n}: Conte os dois grupos e escreva cada quantidade. À esquerda: {pluralA}. À direita: {pluralB}.',
  srExerciseMoreLessComparison: 'Questão {n}: Compare os dois grupos — à esquerda: {pluralA}; à direita: {pluralB} — e escolha o sinal correto: maior que, menor que ou igual a.',
  srExerciseOddOneOut: 'Questão {n}: Encontre a figura que não combina com as outras.',
  srExercisePatternTrain: 'Questão {n}: Arraste a figura correta para o vagão {n} e complete o padrão.',
  srExercisePatternWorksheetBlank: 'Questão {n}: Preencha a lacuna para completar o padrão.',
  srExercisePatternWorksheetOptions: 'Questão {n}: Escolha a figura que completa o padrão.',
  srExercisePrepositionsChoice: 'Questão {n}: Posição de {item} em relação a {shape}: escolha a preposição correta.',
  srExercisePrepositionsFillIn: 'Questão {n}: Posição de {item} em relação a {shape}: escreva a preposição correta.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Questão {n}: Ligue a metade de cima à metade de baixo desta figura: {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Questão {n}: Ligue a metade da esquerda à metade da direita desta figura: {item}.',
  srExerciseShadowMatchShadow: 'Questão {n}: Ligue à sua sombra esta figura: {item}.',
  srExerciseSubtraction: 'Questão {n}: {operandA} menos {operandB} é igual a lacuna.',
  srExerciseSubtractionFindSubtrahend: 'Questão {n}: {operandA} menos lacuna é igual a {result}.',
};

/* ----------------------------------------------------------------- Swedish */
var sv = {
  srExerciseMathWorksheet: 'Uppgift {n}: Ta reda på vad varje bild är värd med hjälp av dessa ekvationer: {equations}.',
  srExerciseWordGuess: 'Uppgift {n}: Skriv ordet som bilden visar. Några bokstäver är redan ifyllda.',
  srExerciseWordScramble: 'Uppgift {n}: Lägg bokstäverna i rätt ordning så att de bildar ordet som bilden visar: {letters}.',
  srExerciseAlphabetTrain: 'Uppgift {n}: Dra rätt bokstav till vagn {n}.',
  srWorksheetQuestions: 'Arbetsbladets uppgifter',
  srExerciseAddition: 'Uppgift {n}: {a} plus {b} är lika med tom ruta.',
  srExerciseAdditionFindAddend: 'Uppgift {n}: tom ruta plus {b} är lika med {sum}.',
  srExerciseBigSmallFindBig: 'Uppgift {n}: Ringa in bilden som är störst.',
  srExerciseBigSmallFindMed: 'Uppgift {n}: Ringa in bilden som är mellanstor.',
  srExerciseBigSmallFindSmall: 'Uppgift {n}: Ringa in bilden som är minst.',
  srExerciseBigSmallOrderAsc: 'Uppgift {n}: Numrera de {N} bilderna från minst (1) till störst.',
  srExerciseBigSmallOrderDesc: 'Uppgift {n}: Numrera de {N} bilderna från störst (1) till minst.',
  srExerciseChartCount: 'Uppgift {n}: Räkna allt i bilden som visar: {word}, och färglägg stapeln som visar antalet.',
  srExerciseCodeAddition: 'Uppgift {n}: Addera bildernas värden och skriv summan.',
  srExerciseCodeAdditionWordReveal: 'Uppgift {n}: Addera bildernas värden och skriv sedan bokstaven som hör till summan.',
  srExerciseFindAndCountCircle: 'Uppgift {n}: Ringa in allt i bilden som visar: {word}.',
  srExerciseFindAndCountCount: 'Uppgift {n}: Räkna allt i bilden som visar: {word}, och skriv antalet.',
  srExerciseFindAndCountCross: 'Uppgift {n}: Stryk över allt i bilden som visar: {word}.',
  srExerciseFindAndCountSquare: 'Uppgift {n}: Rita en fyrkant runt allt i bilden som visar: {word}.',
  srExerciseGridMatch: 'Uppgift {n}: Dra brickan märkt {label} till rätt ruta i rutnätet.',
  srExerciseMatching: 'Uppgift {n}: Para ihop rätt bild till höger med det som står till vänster: {leftValue}.',
  srExerciseMathPuzzle: 'Uppgift {n}: {operationText} tom ruta.',
  srExerciseMissingPieces: 'Uppgift {n}: Dra den bit som saknas till den tomma platsen på position {n}. Bitens form: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Uppgift {n}: Räkna till vänster: {pluralA}. Räkna till höger: {pluralB}. Skriv båda antalen.',
  srExerciseMoreLessComparison: 'Uppgift {n}: Jämför de två grupperna: {pluralA} och {pluralB}. Välj rätt tecken: större än, mindre än eller lika med.',
  srExerciseOddOneOut: 'Uppgift {n}: Hitta bilden som inte hör ihop med de andra.',
  srExercisePatternTrain: 'Uppgift {n}: Dra rätt bild till vagn {n} så att mönstret blir helt.',
  srExercisePatternWorksheetBlank: 'Uppgift {n}: Fyll i den tomma rutan så att mönstret blir helt.',
  srExercisePatternWorksheetOptions: 'Uppgift {n}: Välj bilden som gör mönstret helt.',
  srExercisePrepositionsChoice: 'Uppgift {n}: Välj den preposition som beskriver läget. Föremål: {item}. Form: {shape}.',
  srExercisePrepositionsFillIn: 'Uppgift {n}: Skriv den preposition som beskriver läget. Föremål: {item}. Form: {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Uppgift {n}: Para ihop övre och nedre halvan av samma bild: {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Uppgift {n}: Para ihop vänstra och högra halvan av samma bild: {item}.',
  srExerciseShadowMatchShadow: 'Uppgift {n}: Para ihop bilden med sin skugga. Bilden visar: {item}.',
  srExerciseSubtraction: 'Uppgift {n}: {operandA} minus {operandB} är lika med tom ruta.',
  srExerciseSubtractionFindSubtrahend: 'Uppgift {n}: {operandA} minus tom ruta är lika med {result}.',
};

/* ------------------------------------------------------------------ Danish */
/* Anaphora is anchored to a KNOWN-gender word — `billedet` (neuter), `halvdel` (common) —
 * never to the inserted noun, so `det`/`den` are always right. */
var da = {
  srExerciseMathWorksheet: 'Spørgsmål {n}: Find ud af, hvad hvert billede er værd, ved hjælp af disse ligninger: {equations}.',
  srExerciseWordGuess: 'Spørgsmål {n}: Stav ordet, der passer til billedet. Nogle bogstaver er allerede sat ind.',
  srExerciseWordScramble: 'Spørgsmål {n}: Sæt bogstaverne i den rigtige rækkefølge, så de danner ordet, der passer til billedet: {letters}.',
  srExerciseAlphabetTrain: 'Spørgsmål {n}: Træk det rigtige bogstav ind i vogn {n}.',
  srWorksheetQuestions: 'Spørgsmål til arket',
  srExerciseAddition: 'Spørgsmål {n}: {a} plus {b} er lig med tomt felt.',
  srExerciseAdditionFindAddend: 'Spørgsmål {n}: Tomt felt plus {b} er lig med {sum}.',
  srExerciseBigSmallFindBig: 'Spørgsmål {n}: Sæt ring om den største.',
  srExerciseBigSmallFindMed: 'Spørgsmål {n}: Sæt ring om den mellemstore.',
  srExerciseBigSmallFindSmall: 'Spørgsmål {n}: Sæt ring om den mindste.',
  srExerciseBigSmallOrderAsc: 'Spørgsmål {n}: Nummerér de {N} billeder fra det mindste (1) til det største.',
  srExerciseBigSmallOrderDesc: 'Spørgsmål {n}: Nummerér de {N} billeder fra det største (1) til det mindste.',
  srExerciseChartCount: 'Spørgsmål {n}: Tæl alle på billedet af denne slags: {word}. Farv søjlen, så den viser antallet.',
  srExerciseCodeAddition: 'Spørgsmål {n}: Læg billedernes værdier sammen, og skriv resultatet.',
  srExerciseCodeAdditionWordReveal: 'Spørgsmål {n}: Læg billedernes værdier sammen, og skriv derefter det bogstav, der passer til resultatet.',
  srExerciseFindAndCountCircle: 'Spørgsmål {n}: Find alle på billedet af denne slags: {word}. Sæt ring om dem.',
  srExerciseFindAndCountCount: 'Spørgsmål {n}: Find alle på billedet af denne slags: {word}. Tæl dem, og skriv antallet.',
  srExerciseFindAndCountCross: 'Spørgsmål {n}: Find alle på billedet af denne slags: {word}. Streg dem ud.',
  srExerciseFindAndCountSquare: 'Spørgsmål {n}: Find alle på billedet af denne slags: {word}. Tegn en firkant om dem.',
  srExerciseGridMatch: 'Spørgsmål {n}: Træk brikken med {label} over i det felt i gitteret, der passer.',
  srExerciseMatching: 'Spørgsmål {n}: Forbind {leftValue} til venstre med det, der passer til højre.',
  srExerciseMathPuzzle: 'Spørgsmål {n}: {operationText} tomt felt.',
  srExerciseMissingPieces: 'Spørgsmål {n}: Træk den manglende brik over i det tomme felt på plads {n}. Brikkens form: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Spørgsmål {n}: Tæl til venstre: {pluralA}. Tæl til højre: {pluralB}. Skriv begge antal.',
  srExerciseMoreLessComparison: 'Spørgsmål {n}: Sammenlign de to grupper: {pluralA} og {pluralB}. Vælg det rigtige tegn: større end, mindre end eller lig med.',
  srExerciseOddOneOut: 'Spørgsmål {n}: Find det billede, der ikke passer sammen med de andre.',
  srExercisePatternTrain: 'Spørgsmål {n}: Træk det rigtige billede over i vogn {n}, så mønsteret bliver færdigt.',
  srExercisePatternWorksheetBlank: 'Spørgsmål {n}: Udfyld det tomme felt, så mønsteret bliver færdigt.',
  srExercisePatternWorksheetOptions: 'Spørgsmål {n}: Vælg det billede, der gør mønsteret færdigt.',
  srExercisePrepositionsChoice: 'Spørgsmål {n}: Vælg det forholdsord, der beskriver placeringen. Genstand: {item}. Form: {shape}.',
  srExercisePrepositionsFillIn: 'Spørgsmål {n}: Skriv det forholdsord, der beskriver placeringen. Genstand: {item}. Form: {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Spørgsmål {n}: Billedet: {item}. Forbind den øverste halvdel med den nederste.',
  srExerciseShadowMatchMakeItWholeVertical: 'Spørgsmål {n}: Billedet: {item}. Forbind den venstre halvdel med den højre.',
  srExerciseShadowMatchShadow: 'Spørgsmål {n}: Billedet: {item}. Forbind det med dets skygge.',
  srExerciseSubtraction: 'Spørgsmål {n}: {operandA} minus {operandB} er lig med tomt felt.',
  srExerciseSubtractionFindSubtrahend: 'Spørgsmål {n}: {operandA} minus tomt felt er lig med {result}.',
};

/* ----------------------------------------------------------------- Finnish */
/* The hardest locale and the reason the brief exists: an uninflectable nominative noun cannot
 * sit in a case-governed slot, so every one of them follows a colon. */
var fi = {
  srExerciseMathWorksheet: 'Tehtävä {n}: Päättele kunkin kuvan arvo näistä yhtälöistä: {equations}.',
  srExerciseWordGuess: 'Tehtävä {n}: Kirjoita kuvaan sopiva sana. Osa kirjaimista on jo valmiina.',
  srExerciseWordScramble: 'Tehtävä {n}: Järjestä kirjaimet niin, että niistä muodostuu kuvaan sopiva sana: {letters}.',
  srExerciseAlphabetTrain: 'Tehtävä {n}: Vedä oikea kirjain vaunuun {n}.',
  srWorksheetQuestions: 'Tehtäväsivun tehtävät',
  srExerciseAddition: 'Lasku {n}: {a} plus {b} on yhtä kuin tyhjä ruutu.',
  srExerciseAdditionFindAddend: 'Lasku {n}: Tyhjä ruutu plus {b} on yhtä kuin {sum}.',
  srExerciseBigSmallFindBig: 'Tehtävä {n}: Ympyröi suurin kuva.',
  srExerciseBigSmallFindMed: 'Tehtävä {n}: Ympyröi keskikokoinen kuva.',
  srExerciseBigSmallFindSmall: 'Tehtävä {n}: Ympyröi pienin kuva.',
  srExerciseBigSmallOrderAsc: 'Tehtävä {n}: Numeroi {N} kuvaa pienimmästä (1) suurimpaan.',
  srExerciseBigSmallOrderDesc: 'Tehtävä {n}: Numeroi {N} kuvaa suurimmasta (1) pienimpään.',
  srExerciseChartCount: 'Tehtävä {n}: Laske, montako niitä on kuvassa, ja väritä pylväästä yhtä monta ruutua. Laskettava kuva: {word}.',
  srExerciseCodeAddition: 'Lasku {n}: Laske kuvien arvot yhteen ja kirjoita summa.',
  srExerciseCodeAdditionWordReveal: 'Lasku {n}: Laske kuvien arvot yhteen ja kirjoita sitten kirjain, joka vastaa summaa.',
  srExerciseFindAndCountCircle: 'Tehtävä {n}: Ympyröi kuvasta kaikki nämä: {word}.',
  srExerciseFindAndCountCount: 'Tehtävä {n}: Laske, montako niitä on kuvassa, ja kirjoita lukumäärä. Etsittävä kuva: {word}.',
  srExerciseFindAndCountCross: 'Tehtävä {n}: Yliviivaa kuvasta kaikki nämä: {word}.',
  srExerciseFindAndCountSquare: 'Tehtävä {n}: Piirrä kuvaan neliö kaikkien näiden ympärille: {word}.',
  srExerciseGridMatch: 'Tehtävä {n}: Vedä laatta ruudukossa oikeaan ruutuun. Laatta: {label}.',
  srExerciseMatching: 'Tehtävä {n}: Yhdistä vasemmalla oleva kuva oikealla olevaan pariinsa. Vasemmalla: {leftValue}.',
  srExerciseMathPuzzle: 'Lasku {n}: {operationText} tyhjä ruutu.',
  srExerciseMissingPieces: 'Tehtävä {n}: Vedä puuttuva pala tyhjään kohtaan numero {n}. Palan muoto: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Tehtävä {n}: Laske kummankin ryhmän kuvat ja kirjoita molemmat lukumäärät. Ryhmien kuvat: {pluralA} ja {pluralB}.',
  srExerciseMoreLessComparison: 'Tehtävä {n}: Vertaa ryhmiä ja valitse oikea merkki: suurempi kuin, pienempi kuin tai yhtä suuri kuin. Ryhmien kuvat: {pluralA} ja {pluralB}.',
  srExerciseOddOneOut: 'Tehtävä {n}: Etsi kuva, joka ei kuulu joukkoon.',
  srExercisePatternTrain: 'Tehtävä {n}: Täydennä jono vetämällä oikea kuva vaunuun numero {n}.',
  srExercisePatternWorksheetBlank: 'Tehtävä {n}: Täytä tyhjä kohta, niin jono täydentyy.',
  srExercisePatternWorksheetOptions: 'Tehtävä {n}: Valitse kuva, joka täydentää jonon.',
  srExercisePrepositionsChoice: 'Tehtävä {n}: Valitse paikkaa kuvaava sana, joka kertoo, missä ensimmäinen kuva on toiseen nähden. Kuvat: {item} ja {shape}.',
  srExercisePrepositionsFillIn: 'Tehtävä {n}: Kirjoita paikkaa kuvaava sana, joka kertoo, missä ensimmäinen kuva on toiseen nähden. Kuvat: {item} ja {shape}.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Tehtävä {n}: Yhdistä kuvan ylä- ja alapuolikas. Kuva: {item}.',
  srExerciseShadowMatchMakeItWholeVertical: 'Tehtävä {n}: Yhdistä kuvan vasen ja oikea puolikas. Kuva: {item}.',
  srExerciseShadowMatchShadow: 'Tehtävä {n}: Yhdistä kuva ja sen varjo. Kuva: {item}.',
  srExerciseSubtraction: 'Lasku {n}: {operandA} miinus {operandB} on yhtä kuin tyhjä ruutu.',
  srExerciseSubtractionFindSubtrahend: 'Lasku {n}: {operandA} miinus tyhjä ruutu on yhtä kuin {result}.',
};

/* -------------------------------------------------------- Norwegian (bokmål) */
/* Deliberately not a Swedish calque — `regnestykke` for a maths item, `vogn` not `vagn`, and
 * the demonstrative always attaches to `bildet`/`biten`, never to the inserted noun. */
var no = {
  srExerciseMathWorksheet: 'Spørsmål {n}: Finn ut hva hvert bilde er verdt ved hjelp av disse likningene: {equations}.',
  srExerciseWordGuess: 'Spørsmål {n}: Skriv ordet som passer til bildet. Noen bokstaver er allerede fylt inn.',
  srExerciseWordScramble: 'Spørsmål {n}: Sett bokstavene i riktig rekkefølge så de danner ordet som passer til bildet: {letters}.',
  srExerciseAlphabetTrain: 'Spørsmål {n}: Dra riktig bokstav inn i vogn {n}.',
  srWorksheetQuestions: 'Spørsmål på arket',
  srExerciseAddition: 'Regnestykke {n}: {a} pluss {b} er lik tom rute.',
  srExerciseAdditionFindAddend: 'Regnestykke {n}: tom rute pluss {b} er lik {sum}.',
  srExerciseBigSmallFindBig: 'Spørsmål {n}: Sett ring rundt det største bildet.',
  srExerciseBigSmallFindMed: 'Spørsmål {n}: Sett ring rundt det mellomstore bildet.',
  srExerciseBigSmallFindSmall: 'Spørsmål {n}: Sett ring rundt det minste bildet.',
  srExerciseBigSmallOrderAsc: 'Spørsmål {n}: Nummerer de {N} bildene fra minst (1) til størst.',
  srExerciseBigSmallOrderDesc: 'Spørsmål {n}: Nummerer de {N} bildene fra størst (1) til minst.',
  srExerciseChartCount: 'Spørsmål {n}: Tell hvor mange det er av dette på bildet: {word}. Fargelegg søylen som viser antallet.',
  srExerciseCodeAddition: 'Regnestykke {n}: Legg sammen verdiene til bildene og skriv summen.',
  srExerciseCodeAdditionWordReveal: 'Regnestykke {n}: Legg sammen verdiene til bildene, og skriv bokstaven som passer til summen.',
  srExerciseFindAndCountCircle: 'Spørsmål {n}: Finn dette på bildet: {word}. Sett ring rundt alle.',
  srExerciseFindAndCountCount: 'Spørsmål {n}: Finn dette på bildet: {word}. Tell hvor mange det er, og skriv antallet.',
  srExerciseFindAndCountCross: 'Spørsmål {n}: Finn dette på bildet: {word}. Kryss ut alle.',
  srExerciseFindAndCountSquare: 'Spørsmål {n}: Finn dette på bildet: {word}. Tegn firkanter rundt alle.',
  srExerciseGridMatch: 'Spørsmål {n}: Dra brikken merket {label} til riktig rute i rutenettet.',
  srExerciseMatching: 'Spørsmål {n}: Til venstre står dette: {leftValue}. Trekk strek til det som hører sammen med det, til høyre.',
  srExerciseMathPuzzle: 'Regnestykke {n}: {operationText} er lik tom rute.',
  srExerciseMissingPieces: 'Spørsmål {n}: Dra den manglende biten inn i det tomme feltet på plass {n}. Biten har denne formen: {pieceShape}.',
  srExerciseMoreLessCheckCross: 'Spørsmål {n}: Tell til venstre: {pluralA}. Tell til høyre: {pluralB}. Skriv begge antallene.',
  srExerciseMoreLessComparison: 'Spørsmål {n}: Sammenlign de to gruppene: {pluralA} og {pluralB}. Velg riktig tegn: større enn, mindre enn eller lik.',
  srExerciseOddOneOut: 'Spørsmål {n}: Finn bildet som ikke passer sammen med de andre.',
  srExercisePatternTrain: 'Spørsmål {n}: Dra riktig bilde inn i vogn {n} for å fullføre mønsteret.',
  srExercisePatternWorksheetBlank: 'Spørsmål {n}: Fyll inn i det tomme feltet for å fullføre mønsteret.',
  srExercisePatternWorksheetOptions: 'Spørsmål {n}: Velg bildet som fullfører mønsteret.',
  srExercisePrepositionsChoice: 'Spørsmål {n}: Se på disse to: {item} og {shape}. Velg preposisjonen som beskriver hvor det første er plassert i forhold til det andre.',
  srExercisePrepositionsFillIn: 'Spørsmål {n}: Se på disse to: {item} og {shape}. Skriv preposisjonen som beskriver hvor det første er plassert i forhold til det andre.',
  srExerciseShadowMatchMakeItWholeHorizontal: 'Spørsmål {n}: Dette bildet er delt i to: {item}. Trekk strek fra øverste halvdel til nederste halvdel.',
  srExerciseShadowMatchMakeItWholeVertical: 'Spørsmål {n}: Dette bildet er delt i to: {item}. Trekk strek fra venstre halvdel til høyre halvdel.',
  srExerciseShadowMatchShadow: 'Spørsmål {n}: Finn skyggen som hører til dette bildet: {item}. Trekk strek mellom dem.',
  srExerciseSubtraction: 'Regnestykke {n}: {operandA} minus {operandB} er lik tom rute.',
  srExerciseSubtractionFindSubtrahend: 'Regnestykke {n}: {operandA} minus tom rute er lik {result}.',
};

/* ------------------------------------------------------------ shape words */
/**
 * `{pieceShape}` is the one captured value that is NOT already in the deck's language — it is a
 * fixed English token the generator writes ("square", "circle"; measured across the catalogue,
 * only those two actually occur). Without this map a translated sentence would end in an
 * English word.
 *
 * Bare nominative singular, no article: in every locale's template the shape follows a colon or
 * a bare preposition. Where an orientation adjective is attached it agrees WITHIN the phrase —
 * and per §A.13.58 that was resolved per locale, never cross-applied: nl `ovaal` is neuter so
 * `breed ovaal` but `brede rechthoek`; da/no `rektangel` is neuter so `bredt rektangel` while
 * `oval` is common so `bred oval`; sv has both as en-words.
 *
 * The en row exists so the table is complete and so a lookup miss is distinguishable from a
 * locale gap.
 */
var SHAPES = {
  en: { square: 'square', circle: 'circle', triangle: 'triangle', star: 'star', heart: 'heart', hexagon: 'hexagon', cube: 'cube', cylinder: 'cylinder' },
  nl: { square: 'vierkant', circle: 'cirkel', triangle: 'driehoek', star: 'ster', heart: 'hart', hexagon: 'zeshoek', cube: 'kubus', cylinder: 'cilinder' },
  fr: { square: 'carré', circle: 'cercle', triangle: 'triangle', star: 'étoile', heart: 'cœur', hexagon: 'hexagone', cube: 'cube', cylinder: 'cylindre' },
  es: { square: 'cuadrado', circle: 'círculo', triangle: 'triángulo', star: 'estrella', heart: 'corazón', hexagon: 'hexágono', cube: 'cubo', cylinder: 'cilindro' },
  it: { square: 'quadrato', circle: 'cerchio', triangle: 'triangolo', star: 'stella', heart: 'cuore', hexagon: 'esagono', cube: 'cubo', cylinder: 'cilindro' },
  pt: { square: 'quadrado', circle: 'círculo', triangle: 'triângulo', star: 'estrela', heart: 'coração', hexagon: 'hexágono', cube: 'cubo', cylinder: 'cilindro' },
  sv: { square: 'kvadrat', circle: 'cirkel', triangle: 'triangel', star: 'stjärna', heart: 'hjärta', hexagon: 'sexhörning', cube: 'kub', cylinder: 'cylinder' },
  da: { square: 'kvadrat', circle: 'cirkel', triangle: 'trekant', star: 'stjerne', heart: 'hjerte', hexagon: 'sekskant', cube: 'terning', cylinder: 'cylinder' },
  no: { square: 'kvadrat', circle: 'sirkel', triangle: 'trekant', star: 'stjerne', heart: 'hjerte', hexagon: 'sekskant', cube: 'terning', cylinder: 'sylinder' },
  fi: { square: 'neliö', circle: 'ympyrä', triangle: 'kolmio', star: 'tähti', heart: 'sydän', hexagon: 'kuusikulmio', cube: 'kuutio', cylinder: 'lieriö' },
};

/* --------------------------------------------------------- arithmetic words */
/**
 * The locale's words for `plus`, `minus` and `equals`, DERIVED from its own addition and
 * subtraction rows rather than declared again.
 *
 *   'Lasku {n}: {a} plus {b} on yhtä kuin tyhjä ruutu.'   -> plus ' plus ', equals ' on yhtä kuin '
 *   'Lasku {n}: {operandA} miinus {operandB} on yhtä ...' -> minus ' miinus '
 *
 * math-worksheet's row embeds whole equations — "Moose plus Rabbit equals 5" — so those three
 * words have to be translated INSIDE the value, not just around it. Deriving them from the
 * sibling rows means a page cannot end up saying "plus" in one line and the locale's word in
 * the next, and it means nobody had to author the same three words twice.
 */
function arithmeticWords(locale) {
  var t = module.exports[locale];
  if (!t || !t.srExerciseAddition || !t.srExerciseSubtraction) return null;
  var add = t.srExerciseAddition.match(/\{a\}(.+?)\{b\}/);
  var sub = t.srExerciseSubtraction.match(/\{operandA\}(.+?)\{operandB\}/);
  /* The equals phrase is taken from the FIND-ADDEND row, where it sits between two
   * placeholders and is therefore exactly delimited. Reading it from the plain addition row
   * meant trimming off "the empty box", whose length differs per locale — two words in Dutch
   * and Swedish, three in Spanish, one in Portuguese — and the first attempt duly produced
   * " is gelijk aan leeg " instead of " is gelijk aan ". */
  var eq = (t.srExerciseAdditionFindAddend || '').match(/\{b\}(.+?)\{sum\}/);
  if (!add || !sub || !eq) return null;
  return { plus: add[1], minus: sub[1], equals: eq[1] };
}

/** The locale's word for an English shape token, or null — a miss leaves the row untouched. */
function shapeWord(englishToken, locale) {
  var table = SHAPES[locale];
  if (!table) return null;
  return table[String(englishToken).toLowerCase()] || null;
}

module.exports = {
  en: en, nl: nl, fr: fr, es: es, it: it, pt: pt, sv: sv, da: da, no: no, fi: fi,
  shapeWord: shapeWord,
  arithmeticWords: arithmeticWords,
};
