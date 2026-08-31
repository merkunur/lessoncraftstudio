/**
 * Short reading passages + multiple-choice questions for G2-254.
 * GENUINELY NATIVE by construction: each locale's ensemble authors ORIGINAL
 * passages (never translations of these) at the fan — different stories,
 * natural rhythm, the locale's own name stock. Register: G1-G2 reading
 * level, 3-6 sentences, warm and concrete, zero cultural lock-in required.
 * Question shapes: 2 literal recall + 1 simple inference.
 * Index by difficulty: [0]=short (d1) · [1]=medium (d2) · [2]=longer (d3).
 */
'use strict';

const READING_PASSAGES = {
  en: [
    {
      id: 'milo-cat',
      title: 'Milo the Cat',
      text: 'Milo is a little gray cat. He likes to sleep in a warm basket by the window. In the morning, Milo drinks his milk and plays with a red ball.',
      questions: [
        { q: 'What kind of animal is Milo?', choices: ['a dog', 'a cat', 'a bird'], correct: 1 },
        { q: 'What color is Milo’s ball?', choices: ['red', 'blue', 'green'], correct: 0 },
        { q: 'Where does Milo like to sleep?', choices: ['on a chair', 'in a box', 'in a basket'], correct: 2 },
      ],
    },
    {
      id: 'the-garden',
      title: 'The Garden',
      text: 'Emma and her grandpa have a small garden. They grow carrots, peas, and big orange pumpkins. Every evening, Emma waters the plants with her little green can. One day, a rabbit came and ate two carrots! Now Emma checks the garden every morning.',
      questions: [
        { q: 'Who has a garden with Emma?', choices: ['her grandpa', 'her teacher', 'her brother'], correct: 0 },
        { q: 'What ate two carrots?', choices: ['a bird', 'a rabbit', 'a dog'], correct: 1 },
        { q: 'When does Emma water the plants?', choices: ['in the morning', 'at lunchtime', 'in the evening'], correct: 2 },
      ],
    },
    {
      id: 'lost-mitten',
      title: 'The Lost Mitten',
      text: 'On a cold winter day, Ben walked to school in the snow. On the way, he lost one blue mitten, and his hand got very cold. A girl named Mia found the mitten near the school gate. She gave it back to Ben at lunchtime. Ben smiled and said thank you. Now Ben keeps his mittens safe in his coat pockets.',
      questions: [
        { q: 'What did Ben lose in the snow?', choices: ['a hat', 'a mitten', 'a scarf'], correct: 1 },
        { q: 'Who found it near the gate?', choices: ['Mia', 'his teacher', 'his mom'], correct: 0 },
        { q: 'Why does Ben keep his mittens in his pockets now?', choices: ['because they are wet', 'to give them to Mia', 'so he will not lose them'], correct: 2 },
      ],
    },
  ],
};

module.exports = { READING_PASSAGES };
