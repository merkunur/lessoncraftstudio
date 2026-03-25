export interface AudienceSegment {
  persona: string;
  description: string;
}

export function getCategoryAudience(
  categoryId: string,
  locale: string
): AudienceSegment[] {
  return audiences[categoryId]?.[locale] || audiences[categoryId]?.en || [];
}

const audiences: Record<string, Record<string, AudienceSegment[]>> = {
  math: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Create themed math worksheet listings that parents search for year-round. Addition, subtraction, and number comparison worksheets are evergreen best-sellers on Etsy, especially when bundled by theme or grade level.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Build complete math activity books with professionally formatted worksheets and answer keys. KDP math workbooks for preschool through second grade consistently rank in education categories with minimal ongoing effort.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Offer differentiated math resources that teachers can use across ability levels. TPT buyers value worksheets with themed visuals that make repetitive math practice engaging for young learners.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Generate unlimited practice worksheets tailored to your child\'s current level. Themed images keep kids motivated through repetitive math drills, and answer keys let parents check work quickly.',
      },
    ],
  },
  literacy: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'List word search, crossword, and handwriting worksheets that homeschool parents and teachers actively search for. Literacy printables have strong seasonal demand around back-to-school and holiday themes.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Publish word activity books combining multiple puzzle types into cohesive learning packages. Alphabet, vocabulary, and spelling workbooks perform well in the KDP education niche across multiple age groups.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Create vocabulary-building resources with themed word lists that align with classroom units. TPT teachers look for printable literacy centers and independent practice activities they can use immediately.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Build custom spelling and vocabulary practice around topics your child loves. Multi-language support lets bilingual families create worksheets in their home language alongside English practice.',
      },
    ],
  },
  visual: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Coloring pages and drawing activities are among the highest-volume printable categories on Etsy. Themed collections for holidays, animals, and seasons generate repeat purchases from satisfied customers.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Coloring books remain one of the most profitable KDP categories with low competition in niche themes. Create targeted coloring books around specific interests like dinosaurs, ocean animals, or vehicles.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Visual activities serve as engaging rewards, early finisher tasks, and fine motor practice. Teachers value coloring and drawing worksheets that connect to curriculum themes and seasonal topics.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Use coloring and drawing activities as creative breaks between academic subjects. Themed visual worksheets help develop fine motor skills while keeping young children engaged and focused.',
      },
    ],
  },
  matching: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Matching and sorting worksheets appeal to parents of toddlers and preschoolers, a demographic that actively buys educational printables. Themed matching sets create natural product bundles for higher order values.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Matching activity books for toddlers and preschoolers are an underserved KDP niche with growing demand. Combine matching, sorting, and memory worksheets into comprehensive visual learning workbooks.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Matching activities are essential for early childhood classrooms as learning centers and assessment tools. Teachers need themed matching worksheets that progress in difficulty across the school year.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Matching and sorting activities build critical thinking skills in young children through hands-on practice. Adjustable difficulty levels let you grow with your child from simple pairs to complex categorization.',
      },
    ],
  },
  puzzle: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Puzzle worksheets like sudoku, mazes, and logic challenges attract both parents and teachers. These printables have strong gift-giving potential and work well as themed activity packs for parties and events.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Puzzle books are a proven KDP category with dedicated buyer audiences. Picture sudoku, maze books, and mixed puzzle collections for children fill a gap between adult puzzle books and basic worksheets.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Logic puzzles and brain teasers serve as enrichment activities, early finisher tasks, and substitute plans. TPT teachers search for themed puzzle packs that align with their current classroom units.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Puzzles develop logical thinking, spatial reasoning, and problem-solving skills through engaging play. Multiple difficulty levels ensure appropriate challenge as your child develops cognitive abilities.',
      },
    ],
  },
  search: {
    en: [
      {
        persona: 'Etsy Sellers',
        description: 'Search-and-find worksheets are perennial best-sellers, especially hidden object pages and themed scavenger hunts. These printables generate strong reviews because children genuinely enjoy completing them.',
      },
      {
        persona: 'Amazon KDP Publishers',
        description: 'Hidden object and search activity books have dedicated fan bases on Amazon. Themed search books for specific interests create targeted products that rank well in niche education subcategories.',
      },
      {
        persona: 'Teachers Pay Teachers Sellers',
        description: 'Search activities work as vocabulary reinforcement, observation skill builders, and quiet independent work. Teachers value find-and-count and hidden object worksheets tied to seasonal and thematic units.',
      },
      {
        persona: 'Homeschool Educators & Parents',
        description: 'Search-and-find activities sharpen observation skills, build vocabulary, and provide screen-free entertainment. Themed treasure hunts and hidden object worksheets turn learning into an exciting game for children.',
      },
    ],
  },
};
