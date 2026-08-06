const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'en');

const shortAnswer = "Yes. The tool offers a free trial with full features — no signup, no credit card required. You can create, preview, and download as many worksheets as you want. Free trial downloads include a watermark. Purchase a commercial license to remove the watermark and unlock selling rights.";

const expansions = {
  'alphabet-train.ts': "Yes. The Alphabet Train Generator offers a complete free trial with every feature unlocked — both creation modes, all five font styles, the full image library with 104 themed collections, and all export formats. No signup, no credit card, no time limit. Create, preview, and download as many alphabet worksheets as you want to evaluate quality and explore configurations. Free trial downloads include a small watermark to identify them as evaluation copies. When you are ready to sell your worksheets commercially on Etsy, Amazon KDP, Gumroad, or any other marketplace, purchase a commercial license to remove the watermark and gain full selling rights with no per-sale royalties or attribution requirements.",
  'math-worksheet.ts': "Yes. The Math Worksheet Generator offers a complete free trial with every feature unlocked — all four operations, configurable number ranges, the full theme library, automatic answer key generation, and all export formats including 300 DPI PDF. No signup, no credit card, no usage limits. Create, preview, and download as many math drill worksheets as you want to evaluate output quality and test different operation combinations. Free trial downloads include a small watermark to identify them as evaluation copies. When you are ready to sell your worksheets commercially on Etsy, Amazon KDP, Gumroad, or any other marketplace, purchase a commercial license to remove the watermark and gain full selling rights with no per-sale royalties or attribution requirements.",
  'prepositions.ts': "Yes. The Preposition Worksheet Generator offers a complete free trial with every feature unlocked — both exercise modes, all preposition options, the full image library with 104 themed collections, scene composition tools, and all export formats including 300 DPI PDF. No signup, no credit card, no usage limits. Create, preview, and download as many preposition worksheets as you want to evaluate layout quality and test different spatial relationship configurations. Free trial downloads include a small watermark to identify them as evaluation copies. When you are ready to sell your ESL worksheets commercially on Etsy, Amazon KDP, Gumroad, or any other marketplace, purchase a commercial license to remove the watermark and gain full selling rights with no per-sale royalties or attribution requirements.",
  'word-guess.ts': "Yes. The Word Guess Puzzle Generator offers a complete free trial with every feature unlocked — all content sources, all blanking modes, the full image library with 104 themed collections, answer key generation, and all export formats including 300 DPI PDF. No signup, no credit card, no usage limits. Create, preview, and download as many word guess puzzles as you want to evaluate quality and test different difficulty configurations. Free trial downloads include a small watermark to identify them as evaluation copies. When you are ready to sell your puzzles commercially on Etsy, Amazon KDP, Gumroad, or any other marketplace, purchase a commercial license to remove the watermark and gain full selling rights with no per-sale royalties or attribution requirements.",
};

for (const [filename, newAnswer] of Object.entries(expansions)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(shortAnswer)) {
    content = content.replace(shortAnswer, newAnswer);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('EXPANDED:', filename);
  } else {
    console.error('NOT FOUND:', filename);
  }
}
