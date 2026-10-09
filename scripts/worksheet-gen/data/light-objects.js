/**
 * light-objects.js — Measurement Level Set (2026-10-09): what may sit on a balance pan, and how much it really weighs.
 * A balance page asks "how many grams does the object weigh?": the object must be a light thing a child can hold, and the
 * answer a weight it really could have (an apple 150-300 g — never an elephant at 350 g). Ranges in grams, rounded to
 * the 50 g the weight box can make; every picture read on a contact sheet (2026-10-09): the grapefruit, coconut, avocado and papaya are drawn cut in half and the cake and pie as a slice (their ranges are the piece drawn); dropped: kiwi (a half), plum (reads as an apple), bun (drawn as a loaf). A new page puts on the pan only
 * an object whose range holds the weights' sum.
 */
'use strict';
module.exports = {
  fruits: { apple: [150, 250], banana: [100, 250], orange: [150, 250], pear: [150, 250], lemon: [50, 150], mango: [200, 500], grapefruit: [150, 300],
    pineapple: [700, 1000], coconut: [300, 500], avocado: [50, 150], peach: [100, 250], pomegranate: [200, 400], papaya: [300, 600] },
  vegetables: { potato: [100, 300], carrot: [50, 150], onion: [100, 250], tomato: [100, 250], cucumber: [200, 400], eggplant: [200, 450], broccoli: [300, 600],
    cabbage: [500, 1000], cauliflower: [500, 1000], corn: [200, 400], beetroot: [100, 250], turnip: [150, 350], leek: [200, 400], squash: [400, 1000] },
  toys: { ball: [100, 450], doll: [150, 500], car: [50, 200], train: [100, 400], robot: [200, 600], dinosaur: [100, 400], truck: [150, 500] },
  'kitchen tools': { mug: [250, 400], cup: [150, 300], bowl: [200, 500], plate: [300, 600], saucepan: [500, 1000], pan: [500, 1000], teapot: [400, 900],
    jug: [300, 700], kettle: [600, 1000], whisk: [50, 150], ladle: [100, 200], spatula: [50, 150], grater: [100, 300], colander: [200, 500], glass: [150, 350] },
  classroom: { book: [200, 700], notebook: [100, 300], calculator: [100, 250], stapler: [150, 350], scissors: [50, 100], lunchbox: [200, 500], backpack: [400, 1000],
    glue: [50, 150], tape: [50, 150], globe: [500, 1000], clock: [300, 800], tablet: [300, 700] },
  bakery: { baguette: [200, 300], cake: [100, 200], muffin: [50, 150], croissant: [50, 100], cupcake: [50, 100], pie: [100, 250],
    bagel: [100, 150], doughnut: [50, 100], brownie: [50, 100], waffle: [50, 150], pretzel: [50, 150] },
  clothing: { shoe: [200, 500], boots: [600, 1000], hat: [100, 200], cap: [50, 150], glove: [50, 50], sweater: [300, 600], jacket: [600, 1000], jeans: [400, 700],
    't-shirt': [100, 250], scarf: [100, 250], mitten: [50, 50], dress: [200, 500] },
};
