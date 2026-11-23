/**
 * The food-groups list (data/science/food-groups.json) with the foods of TWO food groups retired, for the pages that
 * sort or group foods by food group: G1-207 (Sort by Food Group) and K-510 level 3 (Which One Does Not Belong?).
 *
 * 2026-11-23 D-2 teacher review (US K-3): tomato and cucumber are fruits to a scientist and vegetables on MyPlate; corn
 * on the cob is a MyPlate vegetable and corn is also a grain — each has two right groups, in every language. The shared
 * list is not changed: the Sorting maker K-472 reads it and keeps the draws its teachers saved. Without them the non-US
 * vegetables would be carrot and broccoli only (potato is retired there), under the three a group these pages draw, so
 * two one-group vegetables join: lettuce and celery (opened on the library sheet: a head of lettuce, a celery stalk).
 */
'use strict';

const WHY = {
  tomato: 'a tomato is a fruit to a scientist and a vegetable on MyPlate: two right groups',
  cucumber: 'a cucumber is a fruit to a scientist and a vegetable on MyPlate: two right groups',
  corn: 'corn on the cob is a MyPlate vegetable, and corn is also a grain: two right groups',
};

function oneGroupFoods(food) {
  const items = food.items.map((it) => (it.bin === 'vegetables' && WHY[it.noun]
    ? { ...it, retired: true, retiredWhy: '2026-11-23 D-2 teacher review: ' + WHY[it.noun] } : it));
  items.push({ theme: 'vegetables', noun: 'lettuce', bin: 'vegetables' }, { theme: 'vegetables', noun: 'celery', bin: 'vegetables' });
  return { ...food, items };
}

module.exports = { oneGroupFoods };
