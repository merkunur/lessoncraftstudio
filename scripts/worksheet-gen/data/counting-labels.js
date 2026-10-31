/**
 * Short labels printed ON the new Counting maker pages (K-442..K-447, 2026-10-31). Native-reviewed per locale
 * (one reviewer, all 11). en = American English, es = Mexican Spanish, pt = Brazilian Portuguese.
 *   oneMore / oneLess  the badge on a one-more / one-less card (K-443)
 *   same               the question beside the yes/no chips (K-445: are the two groups the same number?)
 *   example            the tag on the worked example card (K-444 level 1)
 * Yes / no chips are ✓ / ✗ — except in Swedish and Finnish schools, where a tick marks a WRONG answer: there they are the
 * words (the convention of types/_shared/geometry-tasks.js, native review 2026-10-08).
 */
'use strict';
module.exports = {
  en: { oneMore: '1 more', oneLess: '1 less', same: 'Same number?', example: 'Example' },
  de: { oneMore: '1 mehr', oneLess: '1 weniger', same: 'Gleich viele?', example: 'Beispiel' },
  fr: { oneMore: '1 de plus', oneLess: '1 de moins', same: 'Autant ?', example: 'Exemple' },
  es: { oneMore: '1 más', oneLess: '1 menos', same: '¿Misma cantidad?', example: 'Ejemplo' },
  pt: { oneMore: '1 a mais', oneLess: '1 a menos', same: 'A mesma quantidade?', example: 'Exemplo' },
  it: { oneMore: '1 in più', oneLess: '1 in meno', same: 'Stessa quantità?', example: 'Esempio' },
  nl: { oneMore: '1 meer', oneLess: '1 minder', same: 'Evenveel?', example: 'Voorbeeld' },
  sv: { oneMore: '1 till', oneLess: '1 färre', same: 'Lika många?', yes: 'ja', no: 'nej', example: 'Exempel' },
  da: { oneMore: '1 mere', oneLess: '1 færre', same: 'Lige mange?', example: 'Eksempel' },
  no: { oneMore: '1 til', oneLess: '1 færre', same: 'Like mange?', example: 'Eksempel' },
  fi: { oneMore: '1 lisää', oneLess: '1 vähemmän', same: 'Yhtä monta?', yes: 'kyllä', no: 'ei', example: 'Esimerkki' },
};
