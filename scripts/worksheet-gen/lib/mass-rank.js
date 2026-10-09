/**
 * Real-world mass intuition for heavier/lighter types (K-038).
 * Rank = heavier-than ordering within a theme; pairs must differ by ≥2 ranks
 * so the comparison is intuitively obvious to a 4-6-year-old.
 * Hand-curated 2026-06-13.
 */
'use strict';

const MASS_RANK = {
  animals: ['elephant', 'hippo', 'moose', 'camel', 'horse', 'cow', 'lion', 'tiger', 'panda', 'pig', 'sheep', 'dog', 'fox', 'cat', 'rabbit', 'duck', 'bird', 'mouse'],
  // 2026-10-09: 'boat' removed — its picture is a fishing boat, heavier than the car it was ranked below
  vehicles: ['airplane', 'train', 'truck', 'bus', 'tractor', 'car', 'motorcycle', 'scooter', 'bicycle'],
  // 2026-10-09 (Measurement Level Set): four more themes, every picture read on a contact sheet. Only animals a child
  // knows and whose pictures are unmistakable (dropped: zoo 'bear' — drawn as a teddy; 'chimpanzee' — reads as the
  // gorilla; farm 'chick' — reads as the duck); any two 3 ranks apart differ at least about twice in weight.
  'zoo animals': ['elephant', 'rhinoceros', 'hippopotamus', 'giraffe', 'bison', 'camel', 'tiger', 'lion', 'gorilla', 'panda', 'kangaroo', 'wolf', 'koala', 'monkey', 'fox', 'meerkat', 'bat'],
  'farm animals': ['bull', 'cow', 'horse', 'donkey', 'pig', 'sheep', 'goat', 'dog', 'turkey', 'goose', 'cat', 'rabbit', 'duck', 'chicken', 'bee'],
  'ocean life': ['whale', 'orca', 'shark', 'manatee', 'dolphin', 'seal', 'octopus', 'crab', 'starfish', 'clownfish', 'shrimp'],
  'forest creatures': ['deer', 'wolf', 'beaver', 'fox', 'rabbit', 'squirrel', 'chipmunk', 'mouse', 'ant'],
  fruits: ['watermelon', 'pumpkin', 'pineapple', 'coconut', 'mango', 'grapefruit', 'apple', 'orange', 'pear', 'banana', 'lemon', 'plum', 'strawberry', 'cherry', 'blueberry'],
};

// NEW pages (Measurement Level Set review 2026-10-09) leave these out — near-equal weights that a rank list puts 3
// apart (a cow outweighs a moose; a pig and a lion overlap; mango / grapefruit / apple / orange / pear / banana all weigh
// 120-350 g, so only the apple stays; the plum's picture reads as an apple). The published pages contain none of these
// pairs (checked on all 33 live pages) and keep their draws.
const NEW_PAGE_EXCLUDE = { animals: ['moose', 'pig'], fruits: ['mango', 'grapefruit', 'orange', 'pear', 'banana', 'plum'] };

module.exports = { MASS_RANK, NEW_PAGE_EXCLUDE };
