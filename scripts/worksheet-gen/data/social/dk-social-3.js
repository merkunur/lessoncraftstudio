/**
 * data/social/dk-social-3.js — the bank of the Batch S3 Grade 3 social studies pages (G3-612 .. G3-629; factory
 * types/_shared/dk-social-3.js, drawings dk-social-3-art.js, the US maps data/social/dk-social-3-geo.js; Daily Teaching
 * System Stage D-5, 2026-11-25). English (American) only.
 *
 * Every closed item carries its ONE right answer here; the gate (qa/verify-dk-social-3.js) re-derives each from its own
 * tables and never trusts these words. Sentences a child reads are about 15 words or fewer. Real places come from real
 * data (the maps module); sample towns and sample states are invented and say so. `data/` is gitignored: this file
 * needs `git add -f`.
 */
'use strict';

module.exports = {
  /* ---------------------------------------------------------------- G3-612 civic virtues at school */
  /** the five civic virtues and what each means (the word box). No situation shares a word with any of these. */
  VIRTUES: [
    { id: 'honesty', word: 'honesty', means: 'telling the truth' },
    { id: 'respect', word: 'respect', means: 'treating people well when their ways are different from yours' },
    { id: 'responsibility', word: 'responsibility', means: 'doing a job you agreed to do' },
    { id: 'fairness', word: 'fairness', means: 'giving everyone the same chance' },
    { id: 'courage', word: 'courage', means: 'doing what is right even when you feel afraid' },
  ],
  /** school situations: each calls for ONE virtue. `also` = a virtue a child could still defend for it (the gate keeps its
   *  own list): level 1 never offers an `also` virtue; levels 2-3 offer all five, "Use each word one time.", and the page's
   *  situations must have exactly one way to give each its own virtue. */
  SITUATIONS: [
    { id: 'spill', virtue: 'honesty', also: ['courage', 'responsibility'], text: 'The teacher wants to know who spilled the water. You knocked over the cup.' },
    { id: 'race', virtue: 'honesty', also: ['courage', 'fairness'], text: 'After a race, your coach asks if you started too soon. You did.' },
    { id: 'prize', virtue: 'honesty', also: ['fairness', 'respect'], text: 'Your classmates think the poster is your work, but a friend drew it.' },
    { id: 'language', virtue: 'respect', also: [], text: 'A new student says hello to you with words that you do not know yet.' },
    { id: 'lunch', virtue: 'respect', also: [], text: 'At your table, a girl opens a lunch you have never seen before.' },
    { id: 'idea', virtue: 'respect', also: ['fairness'], text: 'In your group, a boy shares an idea quite unlike your own.' },
    { id: 'plant', virtue: 'responsibility', also: [], text: 'This week, your chore is to water a plant by the window.' },
    { id: 'markers', virtue: 'responsibility', also: ['honesty'], text: 'Your group needs markers, and you promised to bring them on Monday morning.' },
    { id: 'fish', virtue: 'responsibility', also: ['honesty'], text: 'Today, you said you would feed your class fish. Recess starts in a minute.' },
    { id: 'computer', virtue: 'fairness', also: [], text: 'Three kids in your group all need a turn on one computer.' },
    { id: 'crackers', virtue: 'fairness', also: [], text: 'Your table has ten crackers, and you and four friends would like some.' },
    { id: 'ball', virtue: 'fairness', also: [], text: 'At recess, five children want to play with a new red ball from the gym.' },
    { id: 'bus', virtue: 'courage', also: ['respect'], text: 'Older kids tease a little boy on the bus. Your heart beats fast.' },
    { id: 'snack', virtue: 'courage', also: ['fairness', 'respect'], text: 'A fifth grader grabs a classmate\'s snack. Your hands start to shake.' },
    { id: 'alone', virtue: 'courage', also: ['respect', 'fairness'], text: 'You hear some girls say a new girl cannot sit with them. Your stomach gets tight.' },
  ],


  /* ---------------------------------------------------------------- G3-613 the Constitution and our class constitution */
  CONSTITUTION_WORDS: 'We the People of the United States',
  CONSTITUTION_SAYS: [
    'These are the first words of the U.S. Constitution.',
    'It was signed on September 17, 1787.',
    'It is the plan for our national government.',
    'The words mean that the people make the government.',
  ],
  /** the three freedoms of the Bill of Rights on the page, each with the picture that shows it */
  FREEDOMS: [
    { id: 'speech', word: 'freedom of speech', means: 'People may say what they think.' },
    { id: 'religion', word: 'freedom of religion', means: 'People may worship in their own way, or not at all.' },
    { id: 'press', word: 'freedom of the press', means: 'Newspapers may report the news.' },
  ],
  BILL_OF_RIGHTS: 'The Bill of Rights protects our freedoms, such as:',

  /* ---------------------------------------------------------------- G3-614 how people change laws */
  /** three true stories (the crosswalk is a sample town's) and what each column of the chart wants, by the text's words */
  CHANGES: [
    { id: 'vote', title: 'Women win the vote', real: true,
      text: ['For more than 70 years, women and men worked for women\'s right to vote.', 'They gave speeches, wrote letters and marched.', 'In 1920, the 19th Amendment was added to the Constitution.', 'It protects women\'s right to vote.'],
      who: 'women and men', did: 'gave speeches, wrote letters and marched', changed: 'women won the right to vote' },
    { id: 'ada', title: 'A law for people with disabilities', real: true,
      text: ['People with disabilities spoke out for equal rights.', 'They wrote to Congress and marched.', 'In 1990, the Americans with Disabilities Act became law.', 'It requires ramps, wide doors and fair hiring.'],
      who: 'people with disabilities', did: 'spoke out, wrote to Congress and marched', changed: 'a law requires ramps, wide doors and fair hiring' },
    { id: 'crosswalk', title: 'A crosswalk in a sample town', real: false,
      text: ['Neighbors in a sample town wanted a crosswalk near the park.', 'They gathered signatures from people who agreed.', 'They spoke at a city council meeting.', 'The council voted yes, and a crosswalk was painted.'],
      who: 'neighbors', did: 'gathered signatures and spoke at a city council meeting', changed: 'a crosswalk was painted near the park' },
  ],

  /* ---------------------------------------------------------------- G3-615 how far is it? a map scale */
  /** the five places of the sample town map (each drawn as a symbol with a dot to measure from) */
  SCALE_PLACES: [
    { id: 'school', word: 'school' }, { id: 'park', word: 'park' }, { id: 'library', word: 'library' },
    { id: 'fire', word: 'fire station' }, { id: 'lake', word: 'lake' },
  ],
  /** the questions comparing the town map with the state map: the map that answers each */
  SCALE_COMPARE: [
    { id: 'streets', text: 'Which map shows the streets?', map: 'town' },
    { id: 'cities', text: 'Which map shows more cities?', map: 'state' },
    { id: 'land', text: 'Which map shows more land?', map: 'state' },
    { id: 'buildings', text: 'Which map shows the library?', map: 'town' },
  ],
  /** the sample state's cities (invented names) */
  STATE_CITIES: ['Granite City', 'Lakeport', 'Fairview', 'Elm Falls', 'Pinehurst'],

  /* ---------------------------------------------------------------- G3-616 a grid map of our community (a record page) */
  GRID_CHECKLIST: ['our school', 'two streets', 'a park or playground', 'a store', 'a house', 'a place to eat'],
  GRID_KEY_L1: [{ id: 'school', word: 'school' }, { id: 'house', word: 'house' }, { id: 'park', word: 'park' }, { id: 'store', word: 'store' }, { id: 'eat', word: 'a place to eat' }],

  /* ---------------------------------------------------------------- G3-617 where people live and why */
  /** what each kind of place is called on the page (the teacher reads the real place from the maps module) */
  LIVE_KINDS: {
    atlantic: { word: 'a city on the Atlantic coast', people: 'many' },
    lakes: { word: 'a city on the Great Lakes', people: 'many' },
    desert: { word: 'a western desert', people: 'few' },
    mountains: { word: 'the Rocky Mountains', people: 'few' },
  },
  LIVE_REASONS: ['water', 'flat land', 'ports', 'cold', 'dry'],

  /* ---------------------------------------------------------------- G3-618 towns grow near resources */
  /** the three town sites of the sample state: what each offers (`poor` = the site no town should start at) */
  TOWN_SITES: [
    { id: 'river', where: 'by the river and the farmland', offers: ['water', 'soil'], poor: false },
    { id: 'dry', where: 'in the dry, rocky land', offers: [], poor: true },
    { id: 'harbor', where: 'by the harbor', offers: ['harbor'], poor: false },
  ],
  /** the resources the page names (level 1 circles one of three) */
  TOWN_RESOURCES: [
    { id: 'water', word: 'river water' },
    { id: 'soil', word: 'rich soil for farms' },
    { id: 'harbor', word: 'a harbor for ships' },
    { id: 'trees', word: 'trees for wood' },
    { id: 'minerals', word: 'minerals from the mine' },
  ],

  /* ---------------------------------------------------------------- G3-619 three levels of government */
  /** every card names exactly ONE level (a leader by role, never a person; a service named so its level is plain) */
  LEVEL_CARDS: [
    { id: 'mayor', word: 'the mayor', level: 'local', kind: 'leader' },
    { id: 'council', word: 'the city council', level: 'local', kind: 'leader' },
    { id: 'governor', word: 'the governor', level: 'state', kind: 'leader' },
    { id: 'legislature', word: 'the state legislature', level: 'state', kind: 'leader' },
    { id: 'president', word: 'the president', level: 'national', kind: 'leader' },
    { id: 'congress', word: 'Congress', level: 'national', kind: 'leader' },
    { id: 'park', word: 'a city park', level: 'local', kind: 'service' },
    { id: 'fire', word: 'the fire department', level: 'local', kind: 'service' },
    { id: 'trash', word: 'trash pickup', level: 'local', kind: 'service' },
    { id: 'highway', word: 'a state highway', level: 'state', kind: 'service' },
    { id: 'license', word: 'a driver\'s license', level: 'state', kind: 'service' },
    { id: 'mail', word: 'the mail', level: 'national', kind: 'service' },
    { id: 'natpark', word: 'a national park', level: 'national', kind: 'service' },
    { id: 'money', word: 'coins and paper money', level: 'national', kind: 'service' },
  ],
  LEVELS: [{ id: 'local', word: 'Local' }, { id: 'state', word: 'State' }, { id: 'national', word: 'National' }],

  /* ---------------------------------------------------------------- G3-620 three branches */
  BRANCHES: [{ id: 'legislative', word: 'Legislative' }, { id: 'executive', word: 'Executive' }, { id: 'judicial', word: 'Judicial' }],
  BRANCH_CARDS: [
    { id: 'congress', word: 'Congress', branch: 'legislative', set: 'national' },
    { id: 'president', word: 'the president', branch: 'executive', set: 'national' },
    { id: 'supreme', word: 'the Supreme Court', branch: 'judicial', set: 'national' },
    { id: 'makes', word: 'makes the laws', branch: 'legislative', set: 'job' },
    { id: 'carries', word: 'carries out laws', branch: 'executive', set: 'job' },
    { id: 'decides', word: 'decides what laws mean', branch: 'judicial', set: 'job' },
    { id: 'statelaw', word: 'the state legislature', branch: 'legislative', set: 'state' },
    { id: 'governor', word: 'the governor', branch: 'executive', set: 'state' },
    { id: 'statecourt', word: 'the state courts', branch: 'judicial', set: 'state' },
  ],

  /* ---------------------------------------------------------------- G3-621 where taxes go */
  /** fix round 1: level 1's services print NO level word (the child must know the level, not copy it); each is paid by
   *  the taxes of exactly one level (never the mail: stamps pay for it).
   *  Review round 2: no service shares a word with a building label ("our town", "our state", "our country"), the word
   *  box or the captions (the soldiers "keep us safe"); the driver's license left the pool (a fee pays for it, as stamps
   *  pay for the mail). The state keeps ONE service: the highway patrol (a second state card must be paid by state taxes,
   *  print no level word and share no word with another card; none found was clean on all three: snowplows and highway
   *  repairs share "highway", "interstate" prints "state" inside it, and towns plow roads too). */
  TAX_SERVICES: [
    { id: 'firetruck', word: 'a fire truck', level: 'local' },
    { id: 'books', word: 'new books for the library', level: 'local' },
    { id: 'trash', word: 'trash pickup', level: 'local' },
    { id: 'patrol', word: 'highway patrol cars', level: 'state' },
    { id: 'soldiers', word: 'soldiers who keep us safe', level: 'national' },
    { id: 'astronauts', word: 'astronauts exploring space', level: 'national' },
  ],

  /* ---------------------------------------------------------------- G3-622 ways to decide */
  /** three ways of deciding, a short text each, and what each row of the chart wants (by the text's words) */
  DECIDE_WAYS: [
    { id: 'class', title: 'A class vote', text: ['In a class vote, the students decide.', 'Each student votes one time.', 'The choice with the most votes wins.'],
      who: 'the students', how: 'the choice with the most votes wins', say: 'votes one time' },
    { id: 'council', title: 'A town council meeting', text: ['At a town council meeting, people may speak about a problem.', 'Then the council members vote.'],
      who: 'the council members', how: 'the council members vote', say: 'speaks at the meeting' },
    { id: 'election', title: 'An election', text: ['In an election, citizens 18 and older vote for leaders.', 'They may vote for a mayor or a governor.', 'Each voter votes one time.', 'The person with the most votes wins.'],
      who: 'citizens 18 and older', how: 'the person with the most votes wins', say: 'votes one time' },
  ],
  DECIDE_ROWS: [{ id: 'who', word: 'Who decides?' }, { id: 'how', word: 'How do they decide?' }, { id: 'say', word: 'How do people have a say?' }],

  /* ---------------------------------------------------------------- G3-623 solving a community problem */
  PROBLEM_TEXT: ['In a sample town, a busy street runs between the homes and the park.', 'There is no crosswalk, and cars go fast.', 'Children want a safe way to cross.'],
  SOLUTIONS: [
    { id: 'light', word: 'a crosswalk with a light', cost: 'costs the most to build', benefit: 'stops cars whenever people need to cross, all day and night' },
    { id: 'guard', word: 'a crossing guard', cost: 'the town pays a worker each day', benefit: 'helps children cross before and after school' },
    { id: 'sign', word: 'a sign that says SLOW', cost: 'costs the least', benefit: 'warns drivers to slow down' },
  ],
  /** who carries out a plan the city council agrees to (level 3) */
  CARRY_OUT: [{ id: 'workers', word: 'city workers', right: true }, { id: 'governor', word: 'the governor', right: false }, { id: 'court', word: 'the Supreme Court', right: false }],

  /* ---------------------------------------------------------------- G3-624 primary and secondary sources */
  SOURCE_DEFS: { primary: 'made at the time by someone who was there', secondary: 'made later by someone who studied the past' },
  SOURCES: [
    { id: 'diary', word: 'a diary', about: 'a girl wrote about her school in 1900', kind: 'primary' },
    { id: 'photo', word: 'a photograph', about: 'taken outside the new school on the day it opened in 1871', kind: 'primary' },
    { id: 'letter', word: 'a letter', about: 'a soldier wrote to his family during a war', kind: 'primary' },
    { id: 'map', word: 'a map', about: 'drawn in 1870 to show the new streets of the town', kind: 'primary' },
    { id: 'newspaper', word: 'a newspaper', about: 'printed on the day the town\'s bridge opened', kind: 'primary' },
    { id: 'textbook', word: 'a textbook page', about: 'printed in 2019 to explain how people lived long ago', kind: 'secondary' },
    { id: 'encyclopedia', word: 'an encyclopedia article', about: 'written in 1955 about the town\'s history', kind: 'secondary' },
    { id: 'museum', word: 'a museum sign', about: 'made in 2021 to tell visitors about the first school', kind: 'secondary' },
  ],
  /** level 3: the source that best tells what school was like in 1900 (the diary) */
  SOURCE_SCHOOL_1900: 'diary',

  /* ---------------------------------------------------------------- G3-625 a double timeline */
  /** the design's seven events; the "within five years" pairs follow from these dates (the gate names them itself) */
  TIMELINE_EVENTS: [
    { id: 'school', line: 'town', year: 1870, word: 'The town\'s first school opens.' },
    { id: 'station', line: 'town', year: 1885, word: 'A train station is built in town.' },
    { id: 'library', line: 'town', year: 1920, word: 'The town library opens.' },
    { id: 'road', line: 'town', year: 1930, word: 'The town\'s first paved road is built.' },
    { id: 'railroad', line: 'us', year: 1869, word: 'The first railroad across the country is finished.' },
    { id: 'flight', line: 'us', year: 1903, word: 'The Wright brothers make the first powered airplane flight.' },
    { id: 'vote', line: 'us', year: 1920, word: 'Women win the right to vote.' },
  ],
  TIMELINE_LEVEL1: ['school', 'library', 'railroad', 'vote'],
  TIMELINE_FROM: 1860, TIMELINE_TO: 1940,

  /* ---------------------------------------------------------------- G3-626 life then and now (a record page) */
  THEN_ROWS: [
    { id: 'travel', word: 'Getting around', text: ['Most people walked or rode in wagons pulled by horses.', 'In towns, streetcars and trains carried people.', 'Few people had cars.'] },
    { id: 'light', word: 'Lighting at home', text: ['Most homes had no electric lights.', 'Families used oil lamps and candles.', 'Some homes had gas lamps.'] },
    { id: 'messages', word: 'Sending messages', text: ['People wrote letters.', 'Few homes had a telephone.', 'The telegraph carried urgent news fast.'] },
    { id: 'school', word: 'School', text: ['Many children went to a one-room school.', 'Children of all ages learned in one room with one teacher.'] },
  ],

  /* ---------------------------------------------------------------- G3-627 resources and jobs */
  RESOURCE_DEFS: { natural: 'things found in nature', human: 'people and what they do on the job', capital: 'things people made that help make goods' },
  RESOURCES: [
    { id: 'wheat', word: 'wheat grown on a farm', kind: 'natural' },
    { id: 'water', word: 'the water for the dough', kind: 'natural' },
    { id: 'salt', word: 'salt', kind: 'natural' },
    { id: 'skill', word: 'the skill of the baker', kind: 'human' },
    { id: 'cashier', word: "a cashier's work", kind: 'human' },
    { id: 'oven', word: 'an oven', kind: 'capital' },
    { id: 'mixer', word: 'the mixer', kind: 'capital' },
    { id: 'van', word: 'a van that delivers bread', kind: 'capital' },
    { id: 'building', word: 'the bakery building', kind: 'capital' },
  ],

  /* ---------------------------------------------------------------- G3-628 causes and effects in a town's history */
  /** sample towns (invented): five events, each cause and its effect said in the text */
  CAUSE_TOWNS: [
    { id: 'maple', town: 'Maple Falls', years: { railroad: 1880, flood: 1902, opened: 1925, closed: 1975 } },
    { id: 'cedar', town: 'Cedar Creek', years: { railroad: 1872, flood: 1911, opened: 1931, closed: 1982 } },
    { id: 'willow', town: 'Willow Bend', years: { railroad: 1886, flood: 1908, opened: 1922, closed: 1968 } },
  ],
  CAUSES: [
    { id: 'railroad', cause: 'The railroad came.', effect: 'Farmers shipped crops to cities.', story: 'In {year}, the railroad came to {town}. Farmers could now ship their crops to cities.' },
    { id: 'flood', cause: 'The river flooded.', effect: 'Houses were built on the hill.', story: 'In {year}, the river flooded the low streets. After that, people built new houses on the hill.' },
    { id: 'opened', cause: 'A factory opened.', effect: 'Many families moved in.', story: 'In {year}, a shoe factory opened. Many families moved to town to work there.' },
    { id: 'closed', cause: 'The factory closed.', effect: 'Many families moved away.', story: 'In {year}, the factory closed. Many families moved away to find new jobs.' },
  ],
  CAUSE_START: '{town} began as a small farm town by a river.',
  /** two causes a child could argue over on a page of two (a railroad can bring new families too; a flood can drive
   *  families away): never both on level 1 */
  CAUSE_CONFUSABLE: [['railroad', 'opened'], ['flood', 'closed']],

  /* ---------------------------------------------------------------- G3-629 deciding together (a record page) */
  DECIDE_EXAMPLES: ['How should we use indoor recess?', 'Where should we put a reading corner?'],
};
