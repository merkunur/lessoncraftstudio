/**
 * key-number.js — a number DRAWN on an answer key (2026-11-02, Sorting / Same & Different makers): the same teal disc as a
 * key badge (runtime.js KEY_RULES), but a drawn sample (data-lcs-key-sample), not a badge — a key badges exactly the
 * items its screen pairs (screen-from-marks key parity), so the bins of a sort and the numbered side of a pair page show
 * their numbers this way. The parent must be position:relative (or gets it from `onBox`).
 */
'use strict';
const keyNumber = (n) => `<span data-lcs-key-sample="1" style="position:absolute;top:6px;right:6px;min-width:32px;height:32px;padding:0 7px;box-sizing:border-box;border-radius:16px;background:#146B5E;color:#FFFFFF;font:700 19px/32px 'Baloo 2',cursive;text-align:center;z-index:1">${n}</span>`;
module.exports = { keyNumber };
