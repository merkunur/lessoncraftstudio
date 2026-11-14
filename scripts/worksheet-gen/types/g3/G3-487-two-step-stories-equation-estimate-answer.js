/**
 * G3-487 — Two-Step Stories: Equation, Estimate, Answer (Year pages T, 2026-11-14; 3.OA.D.8: a two-step problem
 * written as ONE equation with a letter for the unknown, and the answer checked against an estimate from rounded
 * numbers; de "Überschlag und Ergebnis", sv "överslag och rimlighet"). A face of the two-step engine (G2-489) on the
 * stories with three-digit numbers (two-step-store-frames.json, adding and subtracting within 1,000). Under each story
 * stand three labelled lines beside a dotted space to work in: the equation, the estimate, the answer
 * (data/word-problems/letter-estimate-labels.json; US pages write n, the other languages x).
 * The estimate is made from the numbers rounded to the nearest hundred: no number stands halfway between two
 * hundreds (347 rounds one way in every head, 350 does not), the estimate is a three-digit number, and it lies within
 * 100 of the answer, so "close to my estimate" is true of the right answer.
 * Levels: 1 two stories with whole tens; the equation is printed, and the estimate has its frame of boxes · 2 two
 * stories with any three-digit numbers; the child writes the equation and the estimate on lines · 3 three stories;
 * the last one prints a child's finished answer that took one sign the wrong way: the child estimates, decides
 * whether it can be right, and writes the right answer.
 * Text only (no picture is counted); printed page only.
 */
'use strict';
const base = require('../g2/G2-489-two-step-word-problems.js');

module.exports = {
  ...base,
  id: 'G3-487',
  slug: 'two-step-stories-equation-estimate-answer',
  gradeBand: 'G3',
  interactive: false,
  qaRetries() { return [{ wpFit: 1 }, { wpFit: 2 }]; },   // a page that runs past the footer is rebuilt one step tighter
  difficulty: {
    1: { n: 2, max: 999, font: 20, place: true, store: true, tens: true, lines: true, eqGiven: true },
    2: { n: 2, max: 999, font: 20, place: true, store: true, lines: true },
    3: { n: 3, max: 999, font: 17, place: true, store: true, lines: true, check: true },
  },
  i18n: { en: { title: 'Two-Step Stories: Equation, Estimate, Answer', instruction: 'Read each story. Write one equation with n for the number you need to find. Round each number to the nearest hundred and estimate. Then find n and compare it with your estimate.' } },
};
