/**
 * The value of each coin of a locale's set (data/money/currencies.js) in WORDS, the way a K-1 money page says it
 * (Money maker, "Which coin is it?" levels 2-3, 2026-11-01). Hand-authored per locale, never assembled from a number
 * word + a unit: the agreement differs (fi partitive "viisi senttiä", sv/da/no singular "en krona" / "en krone",
 * es/it/fr "un peso" / "un centesimo" / "un centime"). Native-checked by one reviewer before the maker ships.
 */
'use strict';

const COIN_WORDS = {
  // en-US: children recognise US coins by NAME (CCSS 2.MD.C.8 "pennies, nickels, dimes, quarters"; reviewer 2026-11-01)
  en: { 1: 'penny', 5: 'nickel', 10: 'dime', 25: 'quarter' },
  de: { 1: 'ein Cent', 2: 'zwei Cent', 5: 'fünf Cent', 10: 'zehn Cent', 20: 'zwanzig Cent', 50: 'fünfzig Cent' },
  fr: { 1: 'un centime', 2: 'deux centimes', 5: 'cinq centimes', 10: 'dix centimes', 20: 'vingt centimes', 50: 'cinquante centimes' },
  es: { 1: 'un peso', 2: 'dos pesos', 5: 'cinco pesos', 10: 'diez pesos' },
  it: { 1: 'un centesimo', 2: 'due centesimi', 5: 'cinque centesimi', 10: 'dieci centesimi', 20: 'venti centesimi', 50: 'cinquanta centesimi' },
  pt: { 5: 'cinco centavos', 10: 'dez centavos', 25: 'vinte e cinco centavos', 50: 'cinquenta centavos' },
  nl: { 5: 'vijf cent', 10: 'tien cent', 20: 'twintig cent', 50: 'vijftig cent' },
  fi: { 5: 'viisi senttiä', 10: 'kymmenen senttiä', 20: 'kaksikymmentä senttiä', 50: 'viisikymmentä senttiä' },
  sv: { 1: 'en krona', 2: 'två kronor', 5: 'fem kronor', 10: 'tio kronor' },
  da: { 1: 'en krone', 2: 'to kroner', 5: 'fem kroner', 10: 'ti kroner', 20: 'tyve kroner' },
  no: { 1: 'en krone', 5: 'fem kroner', 10: 'ti kroner', 20: 'tjue kroner' },
};

module.exports = { COIN_WORDS };
