import { registerThemeContent } from '../registry';
import type { EnrichedThemeContent } from '../types';

const content: EnrichedThemeContent = {
  // -- SEO fields --
  name: 'Pets',
  title: 'Free Pets Worksheets for Kids | LessonCraftStudio',
  description: 'Create printable pets-themed worksheets for kids. Dogs, cats, fish and hamsters. Math, reading, puzzles and coloring for preschool to 3rd grade.',
  keywords: 'pets worksheets, pets activities for kids, pets math worksheets, pets coloring pages, printable pets worksheets, dogs and cats worksheets',
  heading: 'Free Pets Worksheets for Kids',

  // -- Rich narrative content --
  intro: 'Pets hold a special place in the hearts of young children, and that deep personal connection makes them one of the most effective themes for early learning worksheets. Unlike wild animals or zoo creatures that children may only see in pictures, pets are part of everyday life. A child who feeds a dog each morning, watches a cat curl up on the couch, or taps gently on the side of a fish tank already has a rich emotional vocabulary tied to these companions. When that same child encounters a worksheet featuring a puppy, a kitten, or a goldfish, the learning experience feels immediately personal and meaningful. Our pets-themed worksheets harness this natural bond to teach math, literacy, visual reasoning, and creative expression across preschool through third grade. Children practice addition by counting groups of hamsters, build spelling skills by unscrambling the letters in rabbit, and develop logical thinking by tracing a picture path that leads a lost kitten back home. Coloring pages featuring dogs with floppy ears and cats chasing yarn balls refine fine motor control while rewarding creativity. Beyond academic skills, pets worksheets nurture empathy and responsibility. Activities that depict feeding schedules, grooming routines, and veterinary check-ups introduce children to the concept of caring for another living being. This social-emotional dimension sets pets apart from purely academic themes and gives teachers a natural springboard for discussions about kindness, commitment, and daily routines. Research in early childhood education shows that children who feel emotionally connected to worksheet content demonstrate longer attention spans, greater willingness to attempt difficult problems, and stronger memory retention. Pets provide that connection effortlessly because nearly every child either has a pet, wants a pet, or knows someone who does. Whether your students are comparing the sizes of a Great Dane and a Chihuahua, searching for pet vocabulary in a word grid, or designing a pattern train of alternating fish and turtles, every activity on these pages builds foundational skills wrapped in the warmth and familiarity of beloved household companions.',

  educationalOverview: 'Pets-themed worksheets deliver strong pedagogical outcomes because they leverage personal relevance, the single most powerful driver of intrinsic motivation in young learners. When a child recognizes their own pet or a pet they dream of owning on a worksheet, the task transforms from an obligation into an invitation. This emotional entry point lowers cognitive resistance and encourages sustained effort on challenging problems. From a curricular standpoint, pets map naturally to life science standards that cover basic needs of living things, including food, water, shelter, and care. Math activities featuring pets reinforce counting, comparison, addition, and pattern recognition using images children find inherently rewarding. Literacy tasks built around pet vocabulary introduce high-frequency words like cat, dog, fish, and bird alongside richer terms like veterinarian, leash, aquarium, and habitat. Social-emotional learning is woven throughout: worksheets that ask children to describe how they care for a pet, or to draw a picture of a pet feeling happy versus sad, develop empathy and emotional literacy in age-appropriate ways. Fine motor skills benefit from coloring detailed illustrations of fluffy rabbits and scaly fish, while cognitive skills grow through shadow matching, size sorting, and sequential pattern activities. For educators, the pets theme offers a unique advantage over broader animal themes because it narrows the scope to creatures children interact with directly, making every worksheet feel personally relevant rather than abstractly educational.',

  parentGuide: 'Pets worksheets are a wonderful choice for home learning because they connect directly to your child\'s daily life. If your family has a pet, use worksheets as an extension of real routines: after completing a counting activity featuring dogs, ask your child to count how many treats the family dog gets each day. Coloring pages become conversation starters about what makes your pet happy, what it eats, and how to keep it healthy. For families without pets, a trip to a local pet store or animal shelter can bring worksheets to life and spark excitement for the next learning session. Consider letting your child choose which pet animal appears on their worksheets, giving them ownership and boosting motivation. You can also tie worksheets to veterinarian visits, explaining that just like children visit the doctor, pets visit the vet. For reluctant learners, pair a challenging word scramble with an easier coloring page as a reward sequence. Keep sessions between ten and twenty minutes for younger children, always ending on a positive note. Extend learning by reading a picture book about a pet after the worksheet, or by having your child draw their dream pet and label its features, reinforcing both creativity and vocabulary in a single joyful activity.',

  // -- Curated apps --
  curatedAppIds: [
    'coloring', 'draw-and-color', 'find-and-count', 'shadow-match',
    'big-small-app', 'image-addition',
    'word-scramble', 'word-search',
    'picture-path', 'pattern-train',
  ],
  appCategories: [
    { category: 'math', appIds: ['image-addition'] },
    { category: 'literacy', appIds: ['word-scramble', 'word-search'] },
    { category: 'visual', appIds: ['coloring', 'draw-and-color', 'find-and-count', 'shadow-match', 'big-small-app'] },
    { category: 'puzzles', appIds: ['picture-path', 'pattern-train'] },
  ],

  // -- Educational sections --
  teachingTips: [
    { title: 'Build a Classroom Pet Care Chart', description: 'Create a large weekly chart listing pet care tasks such as feeding, brushing, and exercising. Assign each student a pretend pet and have them check off daily responsibilities. This connects worksheet learning about pet routines to hands-on practice with scheduling and accountability, reinforcing both social-emotional skills and early data literacy.', audience: 'teacher' },
    { title: 'Use Family Pet Stories as Writing Prompts', description: 'Ask your child to tell you a short story about their pet or a pet they wish they had. Write down key words together, then find those words in a pet-themed word search or word scramble worksheet. This bridges oral language to print literacy and gives the worksheet personal meaning that boosts engagement and recall.', audience: 'parent' },
    { title: 'Compare Pets with a Venn Diagram', description: 'After completing a set of pet worksheets, guide children in filling out a Venn diagram comparing two pets, such as a cat and a fish. Discuss what each pet needs, how they move, and where they sleep. This activity develops critical thinking and classification skills while reinforcing vocabulary from the worksheets in a collaborative, discussion-rich format.', audience: 'both' },
  ],
  activities: [
    {
      title: 'My Pet Care Weekly Schedule',
      description: 'Give each child a blank weekly calendar grid and a set of pet care task cards: feed, walk, brush, play, clean cage, and refill water. Children select a pet and arrange the task cards across the days of the week to create a realistic care schedule. Discuss which tasks happen daily versus weekly, reinforcing concepts of time, sequencing, and responsibility.',
      materials: ['blank weekly calendar printout', 'pet care task cards', 'scissors', 'glue stick'],
      duration: '20-25 minutes',
      skillAreas: ['cognitive', 'social'],
    },
    {
      title: 'Design an Adoption Poster',
      description: 'Children create a poster for a pet that needs a new home. They draw or color the pet, write its name, list three facts about it, and include a sentence explaining why someone should adopt it. This activity integrates art, writing, and persuasive communication while building empathy and awareness about animal welfare in an age-appropriate way.',
      materials: ['blank poster paper or A4 sheet', 'crayons or colored pencils', 'pencil'],
      duration: '25-30 minutes',
      skillAreas: ['creative', 'literacy', 'social'],
    },
    {
      title: 'Pet Food Math Market',
      description: 'Set up a pretend pet store with labeled bags of pet food showing prices from one to ten. Children receive play money and a shopping list specifying how many bags of each type their pet needs. They calculate totals using addition, make change with subtraction, and record their purchases on a worksheet. This hands-on activity reinforces arithmetic in a real-world context that children find exciting and meaningful.',
      materials: ['labeled pet food bags or cards with prices', 'play money', 'shopping list worksheet', 'pencil'],
      duration: '20-25 minutes',
      skillAreas: ['math', 'social'],
    },
  ],
  curriculumAlignment: [
    {
      standard: 'K.CC.B.5',
      framework: 'Common Core',
      description: 'Count to answer how many, up to 20 objects in various arrangements',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'K.RF.3',
      framework: 'Common Core',
      description: 'Know and apply grade-level phonics and word analysis skills',
      relatedAppIds: ['word-scramble', 'word-search'],
    },
  ],

  // -- Grade-specific content --
  gradeContent: {
    'preschool': {
      intro: 'For preschoolers aged three and four, pets are among the first living beings they form genuine relationships with, and this emotional bond makes pet-themed worksheets uniquely powerful at this developmental stage. Young children who help pour kibble into a bowl or gently stroke a cat already understand at an intuitive level that pets have needs, and worksheets that depict these familiar routines feel like a natural extension of daily life rather than an abstract school task. Preschool pet worksheets feature large, friendly illustrations of dogs, cats, fish, hamsters, and rabbits with thick outlines ideal for developing pencil grip through coloring. Counting activities use small sets of two to five pets, reinforcing one-to-one correspondence without overwhelming limited working memory. Tracing exercises spell out simple pet names like cat and dog, building letter formation skills through meaningful words the child already knows and loves. Shadow matching activities pair a pet with its silhouette, developing visual discrimination and spatial reasoning. Size comparison worksheets showing a big dog next to a small puppy introduce early mathematical concepts of more, less, bigger, and smaller in a context that makes intuitive sense. Teachers and parents should keep sessions to eight to twelve minutes and follow up with hands-on play, such as pretending to feed stuffed animals or visiting a neighbor\'s pet, to reinforce learning through multiple sensory channels.',
      objectives: [
        { skill: 'Count sets of 1 to 5 objects reliably', area: 'math' },
        { skill: 'Trace and recognize initial letters of common pet names', area: 'literacy' },
        { skill: 'Match objects to their silhouettes', area: 'cognitive' },
      ],
      developmentalNotes: 'At ages three to four, children are forming attachments beyond their immediate family, and pets often serve as early practice for caregiving behavior. Fine motor control is still developing from whole-arm to wrist-based movement, so pet coloring pages with thick outlines provide appropriate challenge. Cognitively, preschoolers are beginning to categorize the world, and sorting pets by size, color, or type supports this emerging skill.',
      teachingTips: [
        'Place stuffed pet animals on the table during worksheet time so children can hold and manipulate a physical pet while completing counting or matching tasks on paper.',
        'Let children name the pets on their worksheets after real pets they know, creating an immediate personal connection that increases engagement and willingness to persevere.',
      ],
      faq: [
        { question: 'Are pet worksheets suitable for three-year-olds who cannot read yet?', answer: 'Absolutely. Preschool pet worksheets rely on visual tasks like coloring, tracing, matching, and counting pictures rather than reading text. The familiar images of dogs, cats, and fish provide context clues that help children understand what to do even without written instructions.' },
        { question: 'How do pet worksheets differ from general animal worksheets for preschoolers?', answer: 'Pet worksheets focus on household companions that children interact with personally, such as dogs, cats, hamsters, and fish. This personal connection increases emotional engagement and makes learning feel more relevant compared to worksheets featuring unfamiliar wild animals.' },
        { question: 'What fine motor skills do preschool pet worksheets develop?', answer: 'Coloring pet illustrations builds pencil grip and wrist control. Tracing pet names like cat and dog practices letter formation. Drawing lines to match pets with their food or homes strengthens hand-eye coordination. All of these skills lay the foundation for handwriting readiness in kindergarten.' },
      ],
    },
    'kindergarten': {
      intro: 'Kindergarteners bring a more sophisticated understanding of pets to their worksheets, often able to describe their own pet\'s habits, preferences, and personality traits in detail. Five- and six-year-olds can count to twenty and beyond, write simple words independently, and follow multi-step directions, which opens up a wider range of pet-themed activities. Addition worksheets at this level might show six goldfish in a bowl and ask children to add three more, requiring them to count on from a given number. Word scramble puzzles feature pet vocabulary like puppy, kitten, bunny, and turtle, building phonemic awareness and spelling confidence simultaneously. Find-and-count activities scatter multiple pet types across a busy scene, asking children to tally each kind and record the numbers, combining counting, visual scanning, and early data skills. Shadow matching becomes more challenging with similar-looking breeds, developing finer visual discrimination. Big-and-small comparison worksheets introduce measurement language such as taller, shorter, heavier, and lighter using pet illustrations that children recognize from their own homes. The pets theme is especially effective at this age because kindergarteners are developing a sense of responsibility, and worksheets that reference pet care routines like walking, feeding, and grooming reinforce both academic content and character development. Teachers can rotate through different pet types across the week to maintain novelty while consistently reinforcing the same core math and literacy skills.',
      objectives: [
        { skill: 'Add and subtract within 10 using visual counters', area: 'math' },
        { skill: 'Decode and spell simple CVC pet vocabulary words', area: 'literacy' },
        { skill: 'Sort and classify pets by observable attributes', area: 'cognitive' },
      ],
      developmentalNotes: 'Kindergarteners are developing the working memory capacity to hold multiple pieces of information simultaneously, such as counting one type of pet in a busy scene while ignoring others. Their growing vocabulary allows them to use descriptive words like fluffy, spotted, and striped when discussing pets, enriching both oral language and written responses on worksheets.',
      teachingTips: [
        'After completing a pet counting worksheet, have children create their own by drawing different numbers of pets and writing number sentences underneath.',
        'Use pet worksheets as a springboard for a class discussion about responsible pet ownership, connecting academic skills to social-emotional learning goals.',
      ],
      faq: [
        { question: 'What math concepts do kindergarten pet worksheets reinforce?', answer: 'They cover counting to twenty, addition and subtraction within ten using pet images as visual counters, comparing quantities with more and fewer, and sorting pets by attributes like size or type. All activities align with Common Core kindergarten math standards.' },
        { question: 'Can kindergarteners handle pet-themed word scrambles?', answer: 'Yes, when the words are three to five letters and feature familiar pet names like cat, dog, fish, and bird. Word scrambles at this level build phonemic awareness by requiring children to identify and sequence individual letter sounds within words they already know orally.' },
        { question: 'How do pet worksheets support social-emotional learning in kindergarten?', answer: 'Worksheets that depict pet care routines teach responsibility and empathy. When children discuss what a pet needs to stay healthy and happy, they practice perspective-taking and develop an understanding of caring for others, skills that transfer directly to classroom behavior and peer relationships.' },
      ],
    },
    'first-grade': {
      intro: 'First graders are ready for pet worksheets that push beyond basic counting and tracing into multi-step problem solving, independent reading, and creative thinking. Six- and seven-year-olds can add and subtract within twenty fluently, read and write simple sentences, and apply logical reasoning to unfamiliar situations, making them ideal candidates for more complex pet-themed challenges. Math worksheets at this level present word problems such as Maria has eight fish and gives three to her friend, how many does she have now, requiring children to extract numbers from sentences, choose the correct operation, and calculate the answer. Word search puzzles feature longer pet-related vocabulary like hamster, aquarium, veterinarian, and leash, building spelling stamina and expanding academic vocabulary. Pattern train activities challenge children to identify and extend sequences of alternating pet images, developing the algebraic thinking that underpins later math success. Picture path puzzles require strategic planning as children navigate a grid to reunite a lost pet with its owner, strengthening spatial reasoning and executive function. First grade is also when children begin writing short paragraphs, and pet topics provide irresistible prompts such as describing their favorite pet, explaining how to care for a hamster, or writing a story about a dog\'s adventure. The combination of personally meaningful content and increasing academic rigor makes pet worksheets a staple resource for first-grade classrooms and homework packets, maintaining the enthusiasm that fuels genuine learning.',
      objectives: [
        { skill: 'Solve addition and subtraction word problems within 20', area: 'math' },
        { skill: 'Read and write simple sentences about pets independently', area: 'literacy' },
        { skill: 'Plan and execute multi-step puzzle strategies', area: 'cognitive' },
      ],
      developmentalNotes: 'First graders can sustain focused independent work for fifteen to twenty minutes, making them capable of completing a full worksheet page without adult guidance. Their reading skills allow them to decode instructions and word problem text on their own, and their growing empathy means that pet-themed content naturally prompts thoughtful discussion about responsibility, kindness, and the needs of living things.',
      teachingTips: [
        'Assign a pet research mini-project where each student picks a pet, completes a series of worksheets to gather facts about its diet, habitat, and care needs, and presents findings to the class.',
        'Use word search and word scramble puzzles as vocabulary warm-ups before reading a nonfiction passage about a specific pet, priming children with key terms they will encounter in the text.',
      ],
      faq: [
        { question: 'What reading level are first-grade pet worksheets?', answer: 'They use simple sentences with common sight words and decodable pet vocabulary. Word problems and instructions are typically one to two sentences long, and word search puzzles include words of four to ten letters. Children who can read independently at a basic level will be able to complete these worksheets without adult help.' },
        { question: 'How do pet worksheets connect to first-grade science standards?', answer: 'They support life science standards on the basic needs of living things by prompting children to think about what pets require to survive and thrive: food, water, shelter, exercise, and veterinary care. Worksheets comparing different pets also introduce concepts of variation and adaptation at an introductory level.' },
        { question: 'Are first-grade pet worksheets rigorous enough for advanced learners?', answer: 'Yes. Multi-step word problems, extended pattern sequences, strategic picture path puzzles, and longer vocabulary in word searches provide genuine challenge. Teachers can increase difficulty further by asking children to write their own word problems about pets or create original word scrambles for classmates to solve.' },
      ],
    },
    'second-grade': {
      intro: 'Second graders are ready for pet worksheets that challenge them with authentic responsibility mathematics, extended reading about animal care, and structured opinion writing that draws on personal experience. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, grasp introductory multiplication concepts through repeated addition, and read multi-paragraph texts fluently, making them ideal candidates for worksheets that mirror the real decisions pet owners face every day. Math activities at this level present scenarios like a puppy eats three cups of food each day, how many cups does it need for one week, introducing multiplication thinking through repeated addition in a context children find genuinely meaningful. Weight tracking problems ask students to chart a growing kitten\'s weight over eight weeks and calculate how much it gained, reinforcing subtraction within one hundred and data representation skills. Feeding schedule worksheets require calculating total food portions across multiple meals and multiple days, building multi-step problem-solving fluency. Reading passages extend beyond basic pet facts into comprehensive care guides covering nutrition, exercise requirements, grooming routines, and veterinary checkups for specific breeds, demanding that students identify main ideas, locate supporting details, and make inferences about responsible pet ownership. Vocabulary expands to include terms like nutrition, vaccination, grooming, and temperament, words that carry real-world weight and build academic language skills. Writing activities challenge students to compose organized opinion paragraphs about topics like which pet makes the best first pet for a family, requiring a clear claim supported by at least two reasons and a concluding statement. Pet care responsibility charts introduce data literacy as students create and interpret tables showing daily, weekly, and monthly care tasks. The meaningful personal connection that children feel toward pets ensures sustained motivation even as the academic demands increase substantially beyond first-grade expectations.',
      objectives: [
        { skill: 'Use repeated addition and two-digit arithmetic to solve pet care math problems', area: 'math' },
        { skill: 'Write organized opinion paragraphs about pets with supporting reasons', area: 'literacy' },
        { skill: 'Create and interpret data tables tracking pet care responsibilities over time', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the executive function skills needed to plan multi-step solutions and organize their writing with a clear beginning, middle, and end. Their capacity for empathy and perspective-taking has matured, allowing them to engage deeply with pet care content that requires considering the needs of another living being.',
      teachingTips: [
        'Assign a week-long pet care simulation where students use worksheets to plan feeding schedules, track expenses, and log daily care tasks for a pretend pet, building practical math skills alongside responsibility and empathy.',
        'Encourage students to interview a family member or friend who owns a pet and use their findings to complete comparison worksheets, connecting worksheet learning to real-world primary source research.',
      ],
      faq: [
        { question: 'How do second-grade pet worksheets develop responsibility skills alongside academics?', answer: 'Worksheets simulate real pet ownership decisions by asking students to calculate weekly food costs, plan daily care schedules, and track a pet\'s growth over time. This practical context teaches multi-step math and data literacy while reinforcing the concept that caring for a living creature requires consistent effort and planning.' },
        { question: 'What writing skills do second-grade pet worksheets develop?', answer: 'Students write structured opinion paragraphs arguing for their favorite pet with supporting reasons, compose informational paragraphs explaining how to care for a specific animal, and edit their own work for clarity and organization. These activities align with second-grade writing standards on opinion and informational text.' },
        { question: 'How do pet worksheets introduce multiplication concepts to second graders?', answer: 'Repeated addition problems like three treats per day for seven days naturally model the multiplication concept without requiring formal multiplication knowledge. Students see that adding three seven times equals twenty-one, building intuitive understanding that will formalize into multiplication fluency in third grade.' },
      ],
    },
    'third-grade': {
      intro: 'Third graders are ready for pet worksheets that combine multiplication and division with persuasive multi-paragraph writing and multi-source research to explore pet ownership at an analytical depth matching the ambitions of eight- and nine-year-olds. Students can multiply and divide within one hundred, construct organized essays with thesis statements, and evaluate information critically from multiple texts. Multiplication and division drive pet ownership math, with problems like if a dog eats four cups of food each day, how many cups does it need for a full week, and if you buy eighty-four treats and divide them equally among seven days, how many can you give each day. Cost analysis becomes genuinely challenging as students calculate weekly and monthly expenses for food, grooming, and veterinary visits, then compare total costs across three pet options using data tables. Reading passages extend to chapter-length texts exploring veterinary science, breed-specific care requirements, and the ethical considerations of pet adoption versus purchasing from breeders. These texts demand that students identify author perspective, evaluate supporting evidence, and synthesize information from multiple sources. Persuasive writing reaches a new level as students compose multi-paragraph essays arguing for or against pet ownership policies, structuring their arguments with a clear thesis, body paragraphs containing supporting reasons with evidence, and a reinforcing conclusion. Comparison charts grow more complex as students evaluate pets across five or more categories including initial cost, monthly maintenance, space requirements, and time commitment. Fraction concepts appear through feeding measurements and scheduling, such as determining what fraction of a family budget goes toward pet care. The integration of multiplicative financial reasoning, critical reading of multiple sources, and structured persuasive writing ensures that third-grade pet worksheets provide a rigorous academic experience while maintaining the personal connection that makes pets such a powerful motivational theme.',
      objectives: [
        { skill: 'Solve multi-step multiplication and division problems in pet care contexts', area: 'math' },
        { skill: 'Write persuasive multi-paragraph essays about pet-related topics', area: 'literacy' },
        { skill: 'Evaluate information from multiple sources to make reasoned decisions about pet care', area: 'cognitive' },
      ],
      developmentalNotes: 'Eight- and nine-year-olds are deeply invested in questions of responsibility and fairness, making pet care an ideal context for persuasive writing. Their growing capacity for sustained logical argument allows them to marshal evidence across multiple paragraphs when defending a position.',
      teachingTips: [
        'Create a pet budget project where students use multiplication to calculate weekly and monthly food costs, compare expenses across three different pets using data tables, and write a recommendation report with a clear thesis and supporting evidence.',
        'Set up a classroom debate format where students use evidence from their worksheets to argue which pet is best suited for a specific living situation, practicing oral argumentation alongside written analysis.',
      ],
      faq: [
        { question: 'How do pet worksheets challenge third graders beyond second-grade level?', answer: 'Third-grade pet worksheets require multiplication and division for cost calculations, multi-paragraph persuasive writing with evidence, analysis across multiple data sources, and abstract reasoning about long-term responsibility and consequences.' },
        { question: 'What real-world math do pet worksheets teach third graders?', answer: 'Students calculate feeding schedules using multiplication, divide supplies equally among multiple pets, compute weekly and monthly costs, compare prices using subtraction and multiplication, and create budgets that require sustained multi-step problem solving.' },
        { question: 'How do pet worksheets develop third-grade persuasive writing?', answer: 'Students write opinion essays with clear thesis statements, support arguments with evidence from multiple sources, organize ideas into introduction, body, and conclusion paragraphs, and use transitional phrases to connect their reasoning logically.' },
      ],
    },
  },

  // -- FAQ --
  faq: [
    { question: 'What types of pet worksheets can I create?', answer: 'You can generate a wide variety of pet-themed worksheets including addition with groups of dogs and cats, word scrambles using pet vocabulary, word searches filled with pet-related terms, coloring pages featuring puppies and kittens, shadow matching with pet silhouettes, size comparison activities, picture path puzzles, and pattern sequence trains using alternating pet images.' },
    { question: 'Are the pet worksheets free to use?', answer: 'Yes, LessonCraftStudio lets you create and download pet-themed worksheets at no cost. Choose your preferred worksheet type, select the pets theme, adjust settings like difficulty and number of problems, and generate a printable PDF ready for your classroom or kitchen table.' },
    { question: 'What age groups are pet worksheets suitable for?', answer: 'Pet worksheets are designed for children ages three through nine, spanning preschool, kindergarten, first grade, second grade, and third grade. Younger children enjoy coloring and simple counting activities, while older students tackle word problems, vocabulary puzzles, and multi-step logic challenges, all featuring familiar household pets.' },
    { question: 'Which pets appear on the worksheets?', answer: 'The worksheets feature a range of common household pets including dogs, cats, fish, hamsters, rabbits, turtles, and birds. This variety ensures children encounter diverse pet types across different worksheets, keeping the content fresh while maintaining the personal connection that makes the pets theme so effective for learning.' },
    { question: 'How do I print or download the pet worksheets?', answer: 'After customizing your worksheet settings, click the generate button to produce a print-ready PDF. Download the file to your computer or use your browser\'s print function directly. All worksheets are formatted for both standard letter and A4 paper sizes, making them easy to print at home or at school without formatting issues.' },
    { question: 'How do pet worksheets support social-emotional learning?', answer: 'Pet worksheets naturally introduce concepts of empathy, responsibility, and caregiving. Activities that depict feeding schedules, grooming routines, and veterinary visits teach children that living creatures depend on consistent care. Discussions prompted by these worksheets help children develop perspective-taking skills and emotional vocabulary that transfer to their relationships with peers and family members.' },
    { question: 'Can I use pet worksheets for a classroom pet unit?', answer: 'Absolutely. The range of worksheet types lets you build a full one-week or multi-week unit around pets. Start with coloring and vocabulary introduction, move into counting and math activities, then culminate with word problems and creative projects like adoption posters. Rotate through different pet types to maintain student interest while reinforcing consistent academic objectives.' },
    { question: 'How do pet worksheets help children compare different animals?', answer: 'Size comparison worksheets ask children to identify which pet is bigger or smaller, building early measurement concepts. Shadow matching requires distinguishing between similar-looking pets based on shape details. Sorting activities group pets by attributes like number of legs, body covering, or where they live, developing classification and critical thinking skills.' },
    { question: 'Are pet worksheets safe and age-appropriate for all children?', answer: 'Yes. All pet illustrations are friendly, colorful, and designed to be welcoming for young learners. The worksheets focus on positive aspects of pet ownership such as care, play, and companionship. No content depicts anything that could frighten or upset children, making these worksheets suitable for all classroom and home environments.' },
    { question: 'How can I extend pet worksheet learning at home?', answer: 'Connect worksheets to real-life experiences: count your pet\'s toys, measure your dog\'s water bowl, or sort pet food by type. Visit a pet store and have your child identify animals they colored on their worksheets. Read picture books about pets after completing a worksheet, or have your child teach a sibling what they learned. These extensions deepen understanding and show children that worksheet skills apply to the real world.' },
  ],

  // -- Cross-linking --
  relatedThemes: ['animals', 'farm', 'zoo', 'birds', 'insects', 'ocean'],
  relatedBlogCategories: [],
};

registerThemeContent('pets', 'en', content);
