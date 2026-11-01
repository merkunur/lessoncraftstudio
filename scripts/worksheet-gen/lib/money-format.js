/**
 * money-format.js — how each of our 11 locales WRITES an amount of money (ENGINES [money-Q1], the Money maker
 * 2026-11-01). The first templates that write money with a decimal (Count notes and coins, the shop price tags) print
 * it through this table only — the format is data, never code. Amounts are integers in the locale's SMALLEST counting
 * unit (cents / centavos for the cent currencies, whole units for the whole-unit sets: data/money/currencies.js).
 *
 *   sym     the currency sign as a school page writes it
 *   pre     the sign before the number ($17.36, R$ 17,36, € 17,36) or after (17,36 €, 17 kr)
 *   gap     the space between sign and number ('' or a no-break space)
 *   sep     the decimal separator (cent currencies only)
 *   cents   true: amounts are in hundredths (written with sep and two digits); false: whole units only
 *
 * Native-signed table (one reviewer, 2026-11-01): en-US $17.36 · es-MX $85 (whole pesos) · pt-BR R$ 17,36 ·
 * de/fr/it/fi 17,36 € · nl € 17,36 · sv 85 kr · da 85 kr. · no 85 kr.
 */
'use strict';
const NB = ' ';

const FORMAT = {
  en: { sym: '$', pre: true, gap: '', sep: '.', cents: true },
  es: { sym: '$', pre: true, gap: '', sep: '.', cents: false },
  pt: { sym: 'R$', pre: true, gap: NB, sep: ',', cents: true },
  de: { sym: '€', pre: false, gap: NB, sep: ',', cents: true },
  fr: { sym: '€', pre: false, gap: NB, sep: ',', cents: true },
  it: { sym: '€', pre: false, gap: NB, sep: ',', cents: true },
  nl: { sym: '€', pre: true, gap: NB, sep: ',', cents: true },
  fi: { sym: '€', pre: false, gap: NB, sep: ',', cents: true },
  sv: { sym: 'kr', pre: false, gap: NB, sep: ',', cents: false },
  da: { sym: 'kr.', pre: false, gap: NB, sep: ',', cents: false },
  no: { sym: 'kr', pre: false, gap: NB, sep: ',', cents: false },
};

const fmtOf = (locale) => { const f = FORMAT[String(locale || 'en').slice(0, 2)]; if (!f) throw new Error('money-format: no format for ' + locale); return f; };

/** the number part of an amount (smallest units) as the locale writes it: 1736 → "17.36" / "17,36"; whole sets → "85" */
function amountNumber(amount, locale) {
  const f = fmtOf(locale);
  if (!Number.isInteger(amount) || amount < 0) throw new Error('money-format: amount ' + amount + ' is not a whole number of units');
  if (!f.cents) return String(amount);
  return Math.floor(amount / 100) + f.sep + String(amount % 100).padStart(2, '0');
}

/** the whole written amount: "$17.36", "R$ 17,36", "17,36 €", "€ 17,36", "85 kr" */
function formatMoney(amount, locale) {
  const f = fmtOf(locale), n = amountNumber(amount, locale);
  return f.pre ? f.sym + f.gap + n : n + f.gap + f.sym;
}

module.exports = { FORMAT, formatMoney, amountNumber, fmtOf };
