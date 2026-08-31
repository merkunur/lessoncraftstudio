/**
 * Basic color words ×11 locales for the color-by-code family (K-241 legend).
 * The WORD is the load-bearing signal (survives B&W printing; the literacy
 * tie-in); the swatch is redundant support. Lowercase everywhere except
 * where the locale's school convention capitalizes inside a legend — the
 * native ensembles confirm each column at the fan (de adjective lowercase
 * "rot" confirmed-by-convention; en kept lowercase list style).
 */
'use strict';

const COLOR_WORDS = {
  en: { red: 'red', blue: 'blue', yellow: 'yellow', green: 'green' },
  de: { red: 'rot', blue: 'blau', yellow: 'gelb', green: 'grün' },
  fr: { red: 'rouge', blue: 'bleu', yellow: 'jaune', green: 'vert' },
  es: { red: 'rojo', blue: 'azul', yellow: 'amarillo', green: 'verde' },
  pt: { red: 'vermelho', blue: 'azul', yellow: 'amarelo', green: 'verde' },
  it: { red: 'rosso', blue: 'blu', yellow: 'giallo', green: 'verde' },
  nl: { red: 'rood', blue: 'blauw', yellow: 'geel', green: 'groen' },
  sv: { red: 'röd', blue: 'blå', yellow: 'gul', green: 'grön' },
  da: { red: 'rød', blue: 'blå', yellow: 'gul', green: 'grøn' },
  no: { red: 'rød', blue: 'blå', yellow: 'gul', green: 'grønn' },
  fi: { red: 'punainen', blue: 'sininen', yellow: 'keltainen', green: 'vihreä' },
};

module.exports = { COLOR_WORDS };
