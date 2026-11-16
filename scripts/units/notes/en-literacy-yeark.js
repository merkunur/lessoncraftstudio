'use strict';
/**
 * Teacher notes, English, literacy: the Kindergarten unit Reading to Learn: Fact Texts (Daily Teaching System,
 * Part 12.3, third run, 2026-11-15). Five NEW teaching points: four on the pages of types/_shared/fact-text-k.js and (2026-11-16) one on types/_shared/two-texts-k.js: a
 * fact text of four short sentences in big print that the teacher reads aloud, with answers that are pictures.
 * Each note was written from the pages the lesson hands out, in American English, and read by one American
 * kindergarten teacher-reviewer with a description of the pages (2026-11-15); every finding is in the text below.
 * The four notes of the unit Reading Stories (K-650 to K-653) were added by
 * place-ready-l.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:fact-text-key-details': {
      title: 'Find the Facts',
      objective: 'Children listen to a short fact text, read along, and, with support, ask and answer questions about its key details, answering with a picture.',
      note: {
        mistake: 'Children answer from what they already know and not from the text: asked where an owl sleeps, a child circles the bed "because you sleep in a bed," although the text says in a tree. Others circle the picture they like best, or the first one in the row.',
        words: 'Read the text aloud twice while children point under each word. Say: "A fact text tells us true things. Today every answer is in the text." Read one question at a time. Then reread the text one sentence at a time and say, "Thumbs up when you hear the answer." Then: "Put your finger on that sentence." Only then do children circle or draw. On the page with two questions to draw, the last box asks for a question of the child\'s own: give a starter, "Ask me something about owls. Start with What or Where," and write the question down for a child who cannot yet. Then read the text again together: does it answer the question? If not, say, "That is a great question to find out more about."',
        watch: 'Ask a child, "How do you know?" A child who points to the sentence has used the text; a child who says "I just know" needs the sentence read again. On the drawing pages, a drawing counts when the child can tell you what it is and which sentence it comes from; the drawing does not have to be good. The on-screen activity shows a two-sentence fact, and the child taps its key detail. Children read it on their own, so use it with a small group or sit beside children who cannot yet read it.',
      },
    },
    'K:fact-text-main-topic': {
      title: 'What Is It All About?',
      objective: 'Children say what a whole fact text is about (its main topic) and tell one or two things the text says about it.',
      note: {
        mistake: 'Children pick a detail as the topic: for the text about cows they circle the milk, because milk is in two of the four sentences. Asked for a detail, they tell something they know that the text never says.',
        words: 'Say: "The topic is what the WHOLE text is about." Point to a detail picture in the first row (on the cow page, the milk) and ask, "Is every sentence about this?" Read the sentences one by one and have children show a thumb up or down for each. "Is every sentence about cows? Then cows is the topic." For the details: "Tell me one thing the text says about cows. And one more." Have children say each detail in a whole sentence before they circle or draw it.',
        watch: 'In the first row, a child who circles a detail picture does not yet see that the topic is what every sentence is about. On the drawing pages, ask the child to tell you the two details and check that both are in the text. On the hardest page, children may copy a word from the text or sound it out; accept invented spelling. The on-screen activity asks what a short text read aloud is all about (its topic): a good warm-up before the page.',
      },
    },
    'K:pictures-and-text': {
      title: 'Pictures That Teach',
      objective: 'Children match each sentence of a fact text to the picture that goes with it and tell what the picture shows.',
      note: {
        mistake: 'Children draw a line to the nearest picture, or match by one word they catch: "leaves" in a sentence about a nest pulls them to the picture of a tree. On the page with a missing picture they draw the animal or thing of the text again, not what the sentence without a picture tells about.',
        words: 'Read the first sentence aloud and ask, "Which picture shows this? Tell me what you see in it." Say: "Every picture goes with one sentence. If two pictures seem to fit, listen to the other sentences first: each picture is used one time." Have children trace the line with a finger before they draw it. For the empty box: "Which sentence has no picture yet? Draw what THAT sentence tells about."',
        watch: 'Look for two lines that end at one picture: the child matched by a single word. Read the other sentences to the child again and have the child use each picture once. On the easiest page there are three sentences, on the others four. Ask each child about one line, "What part of this sentence does the picture show you?": the standard is about telling how a picture and the words go together, not only about drawing the line. The on-screen activity reads one part of a story aloud and asks which picture shows it. It uses stories, not fact texts: use it as a warm-up or at a center, and afterward ask, "How did the picture help you?"',
      },
    },
    'K:first-then': {
      title: 'First, Then',
      objective: 'Children tell what comes first and what comes next in a fact text that tells a change.',
      note: {
        mistake: 'Children put the two things in the order they like or in the order of the pictures on the strip, not in the order of the text. On the drawing pages they draw the first two things the text names and not the two the question asks about.',
        words: 'Read the text aloud, then the question in the box: it tells which change the page is about. Say: "What was there FIRST? What did it turn into, or what came NEXT?" Have children answer in one sentence with both words: "First it is a caterpillar, then it is a butterfly." On the cut-and-glue page say: "Three pictures, two boxes. One picture is not part of the answer; it is left over."',
        watch: 'Before the glue comes out, have each child lay the two pictures in the boxes and tell you the sentence with first and then. A child who reverses them should hear the text once more and listen for the words that tell the change, like "turns into," "grows into," or "then." On the hardest page, children may copy the two words from the text or sound them out; accept invented spelling. The on-screen activity shows one fact and asks which fact comes next or happens because of it: use it after the page, and ask, "How do these two facts go together?"',
      },
    },
    'K:two-texts-one-topic': {
      title: 'Two Texts, One Topic',
      objective: 'With help, children tell what two short fact texts on one topic both say and what only one of them says.',
      note: {
        mistake: 'Children sort by what they know, not by what the texts say: a cat may play with a ball too, so the ball goes in the middle, although only the text about dogs tells about a ball. Many children wear boots in the snow, but only the rainy-day text tells about boots. Others glue a card under the first text that names it and never check the second text. Most cards can be placed from what children already know, so a correct page does not prove they compared the texts. The proof is pointing to the sentence in each text.',
        words: 'Read the first text aloud, then the second, while children point under the words. Say: "Both texts are about pets" (or trees, the weather, the sky, farm animals). "Some things are in both texts. Some are in only one." Hold up one picture card and name it with the word of the text ("leaves," "rain boots," "yarn," "a mail truck"): "Listen for it." Read both texts again, and children raise a hand each time they hear the word. "Did you hear it in the first text? In the second? In both?" Only then do they glue the card. The picture of each text is at the top of its box, and the middle box shows both pictures.',
        watch: 'Ask about one card in the middle: "Show me where each text says it." A child who can point to both sentences has compared the texts. On the cut-and-glue page, two pictures go in each box. On the drawing pages, anything a text tells about counts, and a quick sketch is fine; on the draw-and-write page invented spelling is fine too. A drawing of the cat or the dog only copies the picture at the top: ask for something the text says about it. The on-screen activity compares two stories, not fact texts: use it as a warm-up or at a center, and tell children they do the same thing here with facts.',
      },
    },
    'K:story-who-where': {
      title: 'Who Is in the Story, and Where?',
      objective: 'Children tell who a story is about, where it happens, and one big thing that happens in it.',
      note: {
        mistake: 'Children name every animal in the pictures instead of the one the story is about. For "where" they point to a thing ("the hat") and not to a place. For "what happened" they tell only the ending.',
        words: 'Read the story aloud twice: first straight through, then panel by panel while children touch each number. Teach three words with a gesture each: characters (point to yourself: who), setting (spread your arms: where), events (clap once: what happens). Ask: "Who is the story about? Where does it happen? What is one big thing that happens?" On Level 1 children circle a picture for each question. On Level 2 they draw the character, the place, and one thing that happens in three boxes. On Level 3 they draw in smaller boxes and write a word on the big row next to each drawing; writing the sounds they hear is fine ("lak" for lake). On screen, Dot\'s Story Spine asks for the start, the trouble, and the fix of a little story.',
        watch: 'A drawing is right when you can tell what it shows, or the child can tell you. Ask: "Who is this? Where is she?" If a child draws a helper (Frog for Duck), ask: "Whose hat is it? Who is the story about?" When the title names two animals (Bear and the Bee), or two animals do the work together (Rabbit and Hen), either one or both is right. On Level 1 the third row shows one pair of pictures from this story and two pairs from other stories.',
      },
    },
    'K:retell-beginning-middle-end': {
      title: 'Retell the Story: Beginning, Middle, End',
      objective: 'Children retell a story they have heard in order: what happens at the beginning, in the middle, and at the end.',
      note: {
        mistake: 'Children start with the part they liked best, or they tell only the end. Some name things ("a duck, a hat") instead of telling what happened.',
        words: 'Read the story aloud twice. Hold up three fingers and retell a story the class knows: "First ... Then ... At the end ..." On Level 1 children look at three pairs of pictures from the story and write 1, 2, and 3 to put them in order; then they tell the story to a partner with the pictures. On Level 2 they draw the beginning, the middle, and the end. On Level 3 they tell the story and finish three sentences that begin First, Then, and At the end, on big rows; a child may tell you the words to write, or write the sounds he or she hears. The telling matters more than the drawing: every child tells the story aloud once. On screen, Wake Up, Pip! lets children retell a story in order to a sleepy friend.',
        watch: 'A retelling is right when the three parts are in order and the end is there. Small details may be left out. The story has four panels and the page asks for three parts, so two panels may go together; on Levels 2 and 3 a beginning drawn from the first or second panel is right. This page prints the panels without numbers. If a child skips the middle, point to the second or third panel and ask: "What happened here?"',
      },
    },
    'K:story-questions': {
      title: 'Ask and Answer Questions About a Story',
      objective: 'Children answer who, where, what, and how questions about a story they have heard, and ask a question of their own.',
      note: {
        mistake: 'Children answer with something they know about the animal, not with what the story says. They mix up who and where. When asked for a question, they tell something instead ("The duck has a hat").',
        words: 'Read the story aloud twice. Read each question aloud and have children point to the panel that tells the answer before they circle a picture. On Level 1 the questions begin with Who and Where. On Level 2 they begin with What and How; a How question asks for a feeling, and children circle a face. On Level 3 children answer two questions and ask one of their own: they draw what they want to know, or they tell you the question and you write it in the box. Say: "A question asks something we want to know. It often starts with who, what, where, when, why, or how." On screen, Fable\'s Picture Stories gives more questions about three-picture stories.',
        watch: 'An answer is right when the story says it. Ask: "Which picture of the story shows that?" For a child\'s own question, accept any real question about the story, even one the story does not answer ("Why did Frog help?"). If the child tells a fact, say: "Turn it into a question. Start with who or what."',
      },
    },
    'K:pictures-and-words': {
      title: 'The Pictures and the Words',
      objective: 'Children match each part of a story they hear to the picture that shows it.',
      note: {
        mistake: 'Children draw a line to the picture straight across from the sentence. They match by one thing they see (any picture with the cat) and not by what happens in the sentence.',
        words: 'This page prints the sentences of a story on the left and its pictures on the right, mixed up. Read sentence 1 aloud, have children put a finger on its dot, and ask: "Which picture shows this part? What do you see in it?" Then children draw the line. Say: "The pictures show what the words tell." On Level 1 there are three sentences (the first and the last of the story and one from the middle), on Level 2 all four. On Level 3 one picture is missing: children draw it in the empty box, then draw the line to it. Afterward, read the story again and let children point to each picture as its part is read. On screen, in Otto\'s Picture Book, children tap the picture that shows the part Otto reads.',
        watch: 'No picture stands straight across from its sentence, so a child who draws straight lines has not matched. Many pairs share an animal or a thing (the hat, Rabbit, the honey), so one picture is not enough. Ask: "Do you hear both things in this sentence?" On Level 3 the drawing is right when it shows who and what the sentence tells.',
      },
    },
  },
};
