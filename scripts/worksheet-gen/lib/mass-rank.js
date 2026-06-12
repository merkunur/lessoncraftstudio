/**
 * Real-world mass intuition for heavier/lighter types (K-038).
 * Rank = heavier-than ordering within a theme; pairs must differ by ≥2 ranks
 * so the comparison is intuitively obvious to a 4-6-year-old.
 * Hand-curated 2026-06-13.
 */
'use strict';

const MASS_RANK = {
  animals: ['elephant', 'hippo', 'moose', 'camel', 'horse', 'cow', 'lion', 'tiger', 'panda', 'pig', 'sheep', 'dog', 'fox', 'cat', 'rabbit', 'duck', 'bird', 'mouse'],
  vehicles: ['airplane', 'train', 'truck', 'bus', 'tractor', 'car', 'boat', 'motorcycle', 'scooter', 'bicycle'],
  fruits: ['watermelon', 'pumpkin', 'pineapple', 'coconut', 'mango', 'grapefruit', 'apple', 'orange', 'pear', 'banana', 'lemon', 'plum', 'strawberry', 'cherry', 'blueberry'],
};

module.exports = { MASS_RANK };
