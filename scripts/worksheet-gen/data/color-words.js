/**
 * Basic color words ×11 locales for the color-by-code family (K-241 legend).
 * The WORD is the load-bearing signal (survives B&W printing; the literacy
 * tie-in); the swatch is redundant support. Lowercase everywhere except
 * where the locale's school convention capitalizes inside a legend — the
 * native ensembles confirm each column at the fan (de adjective lowercase
 * "rot" confirmed-by-convention; en kept lowercase list style).
 */
'use strict';

// nt20-B (2026-09) grew every column from 4 to 8 keys (orange, purple, brown,
// pink). K-241 reads the first four BY NAME, so its published pages are
// byte-identical (proven by tools/b2-baseline.js). The 4 new words per locale
// are audited by the nt20-B native panels at the fan.
const COLOR_WORDS = {
  en: {red: 'red', blue: 'blue', yellow: 'yellow', green: 'green', orange: 'orange', purple: 'purple', brown: 'brown', pink: 'pink'},
  de: {red: 'rot', blue: 'blau', yellow: 'gelb', green: 'grün', orange: 'orange', purple: 'lila', brown: 'braun', pink: 'rosa'},
  fr: {red: 'rouge', blue: 'bleu', yellow: 'jaune', green: 'vert', orange: 'orange', purple: 'violet', brown: 'marron', pink: 'rose'},
  es: {red: 'rojo', blue: 'azul', yellow: 'amarillo', green: 'verde', orange: 'naranja', purple: 'morado', brown: 'marrón', pink: 'rosa'},
  pt: {red: 'vermelho', blue: 'azul', yellow: 'amarelo', green: 'verde', orange: 'laranja', purple: 'roxo', brown: 'marrom', pink: 'rosa'},
  it: {red: 'rosso', blue: 'blu', yellow: 'giallo', green: 'verde', orange: 'arancione', purple: 'viola', brown: 'marrone', pink: 'rosa'},
  nl: {red: 'rood', blue: 'blauw', yellow: 'geel', green: 'groen', orange: 'oranje', purple: 'paars', brown: 'bruin', pink: 'roze'},
  sv: {red: 'röd', blue: 'blå', yellow: 'gul', green: 'grön', orange: 'orange', purple: 'lila', brown: 'brun', pink: 'rosa'},
  da: {red: 'rød', blue: 'blå', yellow: 'gul', green: 'grøn', orange: 'orange', purple: 'lilla', brown: 'brun', pink: 'lyserød'},
  no: {red: 'rød', blue: 'blå', yellow: 'gul', green: 'grønn', orange: 'oransje', purple: 'lilla', brown: 'brun', pink: 'rosa'},
  fi: {red: 'punainen', blue: 'sininen', yellow: 'keltainen', green: 'vihreä', orange: 'oranssi', purple: 'violetti', brown: 'ruskea', pink: 'vaaleanpunainen'},
};

module.exports = { COLOR_WORDS };
