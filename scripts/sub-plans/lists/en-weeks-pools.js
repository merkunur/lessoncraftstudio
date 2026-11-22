/**
 * The worksheet types the English week days (Part 5.4) are chosen from: per grade, per kind of block,
 * 'point type [minutes] [hard] [from<week>]' separated by ';'. Read by lists/build-en-weeks.js.
 *
 * `hard` = the type's harder page is the page for everyone (Part 5.2 rule 1); a number = the minutes the page takes
 * where it is not the kind's usual; `to<n>` = not after week n; `from<n>` = not before week n even where the plans allow it (a page whose numbers
 * or words belong to a later lesson of the same point); `once` = the type gives one page in the grade (its other pages
 * print another title than the type's, e.g. "G or J?" for "M or N?").
 *
 * Chosen from scripts/sub-plans/candidates.js and the pages themselves: pages a class does at their seats after one
 * example, with directions short enough to read aloud. A point that already has a guest teacher script comes first;
 * a new point stands here where a kind needs variety or the plans' progress needs it. Types with several published
 * pages come before types with one (a page is handed out once per grade).
 */
'use strict';
module.exports = {
  K: {
    morning: 'K:pre-writing-strokes K-246; K:pre-writing-strokes K-247; K:pre-writing-strokes K-385; K:pre-writing-strokes K-386; K:pre-writing-strokes K-421; K:pre-writing-strokes K-422;'
      + 'K:numeral-formation K-237; K:count-forward-missing K-632 from25; K:count-forward-missing K-019; K:days-of-week K-337; K:position-words K-065; K:position-words K-066; K:position-words K-067; K:same-different-visual K-044 from5; K:scene-search K-059 from3; K:same-different-visual K-062 to4',
    reading: 'K:letter-identification K-229; K:shadow-closure K-069 to6; K:shadow-closure K-057 to6; K:family K-370 from5; K:human-body K-344 from8; K:human-body K-354 from8; K:word-sentence-tracing K-239; K:word-sentence-tracing K-289; K:word-picture-match K-225; K:singular-plural K-302; K:articles K-306;'
      + 'K:story-sequencing K-379; K:naming-and-action-words K-658; K:capital-letter K-660; K:period-or-question-mark K-656; K:place-words K-548',
    phonics: 'K:rhyme K-352; K:rhyme K-232; K:count-syllables K-234 once; K:count-syllables K-233 once; K:beginning-sounds K-228; K:beginning-sounds K-328 once; K:sound-position K-227 once;'
      + 'K:cvc-build K-224; K:cvc-build K-231; K:digraphs-k K-378 once',
    writing: 'K:pre-writing-strokes K-419 to12; K:pre-writing-strokes K-420 to12; K:pre-writing-strokes K-424 to12; K:pre-writing-strokes K-431 to12; K:letter-formation K-238; K:word-sentence-tracing K-284; K:word-sentence-tracing K-291;'
      + 'K:all-about-me-personal K-345; K:all-about-me-personal K-342; K:family K-375; K:singular-plural K-287',
    math: 'K:position-words K-064; K:scene-search K-371; K:scene-search K-070; K:draw-shapes K-372; K:compare-size-extremes K-035; K:compare-size-extremes K-037; K:order-by-size K-034; K:order-by-size K-036; K:count-how-many K-640 from12; K:count-how-many K-027 from12; K:count-how-many K-002;'
      + 'K:compare-groups K-606 from12; K:compare-groups K-009; K:subitize K-018; K:conservation K-445; K:one-more-one-less K-443; K:combine-groups K-028; K:take-away K-451; K:tally-marks K-015; K:tally-marks K-025;'
      + 'K:number-bonds-k K-243; K:number-bonds-k K-274; K:teen-numbers K-448; K:teen-numbers K-637; K:shape-naming K-368',
    numbers: 'K:position-words K-066; K:position-words K-067; K:order-by-size K-036; K:draw-shapes K-372; K:scene-search K-059 to8; K:count-out-n K-011; K:subitize K-017; K:conservation K-445; K:numeral-formation K-467; K:count-how-many K-027 from12; K:compare-groups K-606 from12; K:before-after-back K-022; K:before-after-back K-021; K:before-after-back K-023;'
      + 'K:count-forward-missing K-020; K:dot-to-dot-sequence K-296; K:dot-to-dot-sequence K-285; K:dot-to-dot-sequence K-295; K:count-on K-444',
    logic: 'K:patterns K-048; K:patterns K-049; K:patterns K-050; K:patterns K-053; K:mazes K-405; K:mazes K-406; K:mazes K-407; K:same-different-visual K-058; K:same-different-visual K-080; K:same-different-visual K-062;'
      + 'K:spot-the-difference K-399; K:spot-the-difference K-400; K:shadow-closure K-057; K:shadow-closure K-069',
    closing: 'K:feelings K-331; K:feelings K-334; K:feelings K-333; K:seasons K-207; K:seasons K-338; K:living-nonliving K-201; K:fruit-vegetable K-202; K:animal-groups-homes K-204; K:animal-groups-homes K-209;'
      + 'K:animal-babies K-205; K:day-night K-208; K:transport-flying K-206; K:transport-flying K-210; K:healthy-food K-203; K:natural-made K-214',
  },
  1: {
    morning: 'K:count-forward-missing K-632; K:number-bonds-k K-243; K:number-bonds-k K-274; 1:missing-number-equations G1-218; 1:missing-number-equations G1-215; 1:fluency-within-20 G1-214; 1:fluency-within-20 G1-208; 1:fluency-within-20 G1-216; 1:fluency-within-20 G1-217;'
      + '1:number-of-the-day G1-243; 1:number-of-the-day G1-256; 1:number-of-the-day G1-257; 1:skip-counting G1-123; 1:skip-counting G1-125; 1:one-ten-more-less G1-131; 1:one-ten-more-less G1-132; 1:days-months-seasons G1-321; 1:alphabetical-order G1-262; 1:alphabetical-order G1-263',
    reading: 'K:word-picture-match K-225 to3; 1:word-families-syllable-reading G1-332; 1:word-families-syllable-reading G1-333; 1:digraphs G1-393; 1:digraphs G1-588; 1:read-and-follow G1-242; 1:read-and-follow G1-338; 1:read-and-follow G1-341;'
      + '1:cloze G1-350; 1:cloze G1-368; 1:story-sequencing G1-402; 1:story-sequencing G1-400; 1:story-key-details G1-579; 1:characters-setting-events G1-580; 1:retell-and-lesson G1-581; 1:info-text-key-details G1-575; 1:main-topic-key-details G1-576',
    phonics: '1:rhyming G1-309; 1:rhyming G1-343; 1:rhyming G1-345; 1:phoneme-boxes G1-312; 1:digraphs G1-380; 1:digraphs G1-392; 1:blends-start G1-493; 1:long-or-short-vowel G1-495;'
      + '1:word-classes G1-293; 1:word-classes G1-300; 1:opposites G1-307; 1:opposites G1-337; 1:shades-of-meaning G1-396; 1:synonyms G1-395; 1:syllables-split G1-325; 1:syllables-split G1-305; K:count-syllables K-234 once; K:beginning-sounds K-328 once',
    writing: '1:spell-picture-words G1-258; 1:spell-picture-words G1-301; 1:spell-picture-words G1-304; 1:unscramble-sentence G1-282; 1:unscramble-sentence G1-283; 1:unscramble-sentence G1-249;'
      + '1:pronouns G1-352; 1:pronouns G1-372; 1:question-words G1-374; 1:joining-words G1-594; 1:verb-tense G1-595; 1:capitals-names-days-months G1-593; 1:true-story-plan-and-draft G1-616 25; K:word-sentence-tracing G1-430 to6; K:all-about-me-personal K-345 to8',
    math: '1:add-within-10-models G1-110; 1:add-within-10-models G1-102; 1:subtract-cross-out G1-104; 1:fact-families G1-209; 1:fact-families G1-220; 1:fluency-within-20 G1-439; 1:fluency-within-20 G1-561; 1:doubles-halves G1-286; 1:doubles-halves G1-288;'
      + '1:add-three-addends G1-445; 1:number-walls G1-246; 1:number-walls G1-267; 1:tens-and-ones G1-563; 1:tens-and-ones G1-564; 1:mental-math-to-100 G1-446; 1:mental-math-to-100 G1-558; 1:time-read G1-148; 1:time-read G1-477;'
      + '1:coins G1-229; 1:coins G1-232; 1:shape-attributes G1-382; 1:measure-length-units G1-139; 1:bar-graphs G1-144; 1:bar-graphs G1-147; 1:true-false-equations G1-443',
    problems: '1:word-problems G1-213; 1:word-problems G1-238; 1:word-problems G1-239; 1:word-problems G1-240; 1:word-problems G1-241; 1:word-problems G1-567; 1:add-three-addends G1-570',
    numbers: '1:count-on-back-hops G1-116; 1:count-on-back-hops G1-117; 1:count-on-back-hops G1-118; 1:count-on-back-hops G1-119; 1:hundreds-chart G1-310; 1:hundreds-chart G1-130; 1:hundreds-chart G1-347; 1:skip-counting G1-278; 1:skip-counting G1-280;'
      + '1:number-line-placement G1-274; 1:number-line-placement G1-276; 1:number-words G1-223; 1:number-words G1-227; 1:odd-even-pairs G1-351; 1:ordinal-numbers G1-317; K:teen-numbers K-448; K:dot-to-dot-sequence K-285',
    logic: '1:mazes G1-420; 1:mazes G1-421; 1:mazes G1-424; 1:mazes G1-425; K:patterns K-049; K:patterns K-053; K:mazes K-405; K:mazes K-406; K:mazes K-411; K:spot-the-difference K-399; K:spot-the-difference K-400;'
      + '1:map-key G1-528; K:grid-copy K-299; K:grid-copy K-300; K:grid-copy K-502',
    closing: 'K:feelings K-331; K:feelings K-334; 1:story-sequencing G1-401; 1:find-the-differences G1-415; 1:animal-classes-coverings G1-201; 1:animal-classes-coverings G1-205; 1:habitats-needs G1-202; 1:habitats-needs G1-206;'
      + '1:sink-float G1-204; 1:food-groups G1-207; 1:family-generations G1-385; 1:family-generations G1-386',
  },
  2: {
    morning: '1:fluency-within-20 G1-216; 1:fluency-within-20 G1-217; 1:number-of-the-day G1-257; 1:number-of-the-day G1-256; 2:skip-count-5-10-100 G2-304; 2:skip-count-5-10-100 G2-314; 2:hundred-more-less G2-226; 2:calendar G2-277; 2:calendar G2-298; 2:calendar G2-297;'
      + '2:odd-even G2-351; 2:odd-even G2-218; 2:skip-count-3-4 G2-207; 2:skip-count-3-4 G2-208; 1:one-ten-more-less G1-132; 1:alphabetical-order G1-263; 1:alphabetical-order G1-264; 2:add-sub-within-100-practice G2-313',
    reading: '1:read-and-follow G1-339; 1:read-and-follow G1-341; 1:cloze G1-350; 1:story-key-details G1-579; 1:characters-setting-events G1-580; 1:retell-and-lesson G1-581; 1:info-text-key-details G1-575; 1:main-topic-key-details G1-576;'
      + '2:read-and-answer G2-269; 2:read-and-answer G2-270; 2:read-and-answer G2-271; 2:read-and-answer G2-272; 2:read-and-answer G2-273; 2:read-and-answer G2-254; 2:cloze-context G2-350;'
      + '2:character-challenge G2-526; 2:character-challenge G2-527; 2:fable-lesson G2-528; 2:fable-lesson G2-529; 2:diagram-and-text G2-521; 2:steps-in-order G2-522; 2:two-versions-of-a-tale G2-580',
    phonics: '2:digraphs G2-372; 2:vowel-teams-long-a-e-o G2-531; 2:short-or-long-vowel G2-530; 2:word-classes G2-275; 2:word-classes G2-286; 2:bossy-r-ar-or G2-533; 2:er-ir-ur G2-534; 2:compound-words G2-330; 2:root-words G2-375;'
      + '2:suffixes-ful-less-ly G2-536; 2:synonyms G2-358; 2:synonyms G2-373; 2:words-in-real-life G2-549; 2:adjective-or-adverb G2-551; 1:opposites G1-337; 1:shades-of-meaning G1-396',
    writing: '2:sentence-boundaries G2-281; 2:sentence-boundaries G2-282; 2:sentence-boundaries G2-307; 2:verb-forms G2-334; 2:verb-forms G2-336; 2:verb-forms G2-337; 2:pronouns G2-353; 2:pronouns G2-354; 2:question-words G2-357;'
      + '2:describe-a-picture G2-278; 2:describe-a-picture G2-299; 2:true-story-plan-draft G2-571; 2:true-story-plan-draft G2-572; 2:friendly-letter G2-561; 2:draft-an-opinion G2-559; 2:plan-informative-piece G2-565; 1:joining-words G1-594; 1:unscramble-sentence G1-283; 1:verb-tense G1-595; 1:capitals-names-days-months G1-593',
    math: '1:fact-families G1-220; 1:number-walls G1-246; 1:number-walls G1-289; 1:mental-math-to-100 G1-446; 1:mental-math-to-100 G1-558; 2:bundle-ten-ones G2-404; 2:expanded-form-digit-value G2-401; 2:number-line-not-from-zero G2-305; 2:number-line-not-from-zero G2-395;'
      + '2:hundreds-chart-moves G2-321; 2:hundreds-chart-moves G2-323; 2:column-method G2-251; 2:column-method G2-256; 2:column-method G2-257; 2:subtract-with-blocks G2-513; 2:time-5-min-quarter G2-249; 2:shopping-money G2-289; 2:shopping-money G2-290;'
      + '2:bar-graphs G2-237; 2:bar-graphs G2-239; 2:line-plots G2-240; 2:arrays G2-211; 2:equal-shares-shapes G2-228; 2:equal-shares-shapes G2-229; 2:fraction-of-a-set G2-233; 2:symmetry-line G2-248',
    problems: '1:word-problems G1-567; 1:word-problems G1-568; 1:word-problems G1-569; 1:word-problems G1-571; 1:word-problems G1-572; 2:two-step-word-problems G2-506; 2:two-step-word-problems G2-510; 2:two-step-word-problems G2-511',
    numbers: '1:hundreds-chart G1-310; 1:hundreds-chart G1-347; 1:number-line-placement G1-277; 1:skip-counting G1-279; 1:skip-counting G1-281; 1:number-words G1-224; 1:coins G1-229; 1:true-false-equations G1-443; 1:check-answers G1-447; 1:bar-model G1-448',
    science: '1:animal-classes-coverings G1-201; 1:animal-classes-coverings G1-205; 1:habitats-needs G1-202; 1:habitats-needs G1-206; 1:food-groups G1-207; 1:sink-float G1-204; 2:plant-parts G2-363; 2:habitats-adaptations G2-381; 2:life-cycles G2-365; 2:life-cycles G2-366',
    social: '1:map-key G1-379; 1:map-key G2-505; 2:cardinal-directions G2-369; 2:cardinal-directions G2-371; 2:continents G2-370; 1:family-generations G1-385; 1:family-generations G1-386; 2:family-relationships G2-362; 2:road-signs G2-361',
    logic: '1:mazes G1-420; 1:mazes G1-424; 1:mazes G1-425; 2:find-differences G2-388; 2:find-differences G2-389; K:grid-copy K-299; K:grid-copy K-300; K:grid-copy K-502; 1:map-key G1-528; 2:grid-coordinates G2-279',
    closing: 'K:feelings K-334; K:feelings K-331; 1:story-sequencing G1-401; 1:find-the-differences G1-415; 2:symmetry-complete G1-432; 1:days-months-seasons G1-321; 1:time-read G1-148; 1:time-read G1-149; 1:time-read G1-477; 2:time-5-min-quarter G2-250; 2:time-5-min-quarter G2-249; 2:symmetry-line G2-247; 2:symmetry-line G2-248; 1:mazes G1-421; 1:mazes G1-424; 1:mazes G1-425; 2:grid-coordinates G2-302; 2:grid-coordinates G2-308; K:grid-copy K-502',
  },
  3: {
    morning: '2:add-sub-within-100-practice G2-313; 2:skip-count-3-4 G2-207; 2:skip-count-3-4 G2-208; 2:odd-even G2-218; 2:odd-even G2-351; 2:hundred-more-less G2-226; 2:number-line-not-from-zero G2-305; 2:number-line-not-from-zero G2-395;'
      + '3:rounding G3-387; 3:rounding G3-388; 3:rounding G3-390; 3:arithmetic-patterns G3-327; 3:arithmetic-patterns G3-329; 3:times-tables G3-364; 3:times-tables G3-365; 3:times-tables G3-366; 3:times-tables G3-367; 3:times-tables G3-368; 3:input-output G3-328; 2:calendar G2-298',
    reading: '2:read-and-answer G2-269 20 hard; 2:read-and-answer G2-270 20 hard; 2:read-and-answer G2-271 20 hard; 2:read-and-answer G2-272 20 hard; 2:read-and-answer G2-273 20 hard; 2:read-and-answer G2-254 20 hard;'
      + '3:story-evidence G3-502; 3:story-evidence G3-503; 3:central-message G3-504; 3:central-message G3-505; 3:answer-with-evidence G3-494; 3:answer-with-evidence G3-495; 3:main-idea-key-details G3-496; 3:main-idea-key-details G3-497;'
      + '3:events-cause-effect G3-500; 3:events-cause-effect G3-501; 2:fable-lesson G2-528; 2:character-challenge G2-526',
    phonics: '3:closed-open-syllables G3-512; 3:closed-open-syllables G3-513; 3:suffixes-able-ment-ness-ful-less G3-516; 3:suffixes-able-ment-ness-ful-less G3-517; 3:context-clues G3-540; 3:context-clues G3-541; 3:parts-of-speech G3-530; 3:parts-of-speech G3-531;'
      + '3:plural-nouns G3-532; 3:plural-nouns G3-533; 3:past-tense-verbs G3-534; 3:past-tense-verbs G3-535; 3:possessive-nouns G3-526; 3:possessive-nouns G3-527; 2:compound-words G2-330; 2:suffixes-ful-less-ly G2-536; 2:words-in-real-life G2-549',
    writing: '3:opinion-and-reasons G3-548; 3:opinion-and-reasons G3-549; 3:linking-words G3-550; 3:linking-words G3-551; 3:joining-words G3-520; 3:joining-words G3-521; 3:plan-a-story G3-564; 3:plan-a-story G3-565; 3:dialogue-and-description G3-566; 3:dialogue-and-description G3-567;'
      + '3:time-words-in-stories G3-568; 3:time-words-in-stories G3-569; 2:describe-a-picture G2-278; 2:verb-forms G2-334; 2:verb-forms G2-336; 2:sentence-boundaries G2-307; 2:friendly-letter G2-561',
    math: '2:column-method G2-256; 2:column-method G2-257; 2:arrays G2-211; 2:shopping-money G2-289; 2:shopping-money G2-294; 3:column-regrouping G3-357; 3:column-regrouping G3-362; 3:column-regrouping G3-363; 3:mult-equal-groups G3-301; 3:mult-equal-groups G3-302;'
      + '3:times-tables G3-407; 3:times-tables G3-482; 3:division-sharing G3-309; 3:mult-div-relationship G3-312; 3:mult-div-relationship G3-369; 3:time-to-minute G3-354; 2:mass-grams G2-252; 2:mass-grams G2-261; 3:area-model G3-488; 3:area-model G3-489; 3:perimeter G3-490;'
      + '3:fraction-unit-build G3-316; 3:equivalent-fractions G3-318; 3:equivalent-fractions G3-322; 3:compare-fractions G3-319; 3:right-angles G3-341; 3:scaled-graphs G3-332; 3:scaled-graphs G3-333',
    problems: '3:muldiv-word-problems G3-370; 3:muldiv-word-problems G3-373; 3:muldiv-word-problems G3-374; 3:muldiv-word-problems G3-375; 2:two-step-word-problems G2-506; 2:two-step-word-problems G2-510; 2:two-step-word-problems G2-511',
    numbers: '2:hundreds-chart-moves G2-321; 2:hundreds-chart-moves G2-323; 2:skip-count-5-10-100 G2-304; 2:expanded-form-digit-value G2-401; 2:bundle-ten-ones G2-404; 2:bar-graphs G2-239; 2:line-plots G2-240; 2:equal-shares-shapes G2-229; 2:fraction-of-a-set G2-233; 3:rounding G3-323',
    science: '2:plant-parts G2-363; 2:habitats-adaptations G2-381; 2:life-cycles G2-365; 2:life-cycles G2-366; 2:sink-float G2-382; 2:sink-float G2-383; 2:moon-phases G2-367; 2:day-and-night G2-368; 1:animal-classes-coverings G1-201; 1:animal-classes-coverings G1-205; 1:habitats-needs G1-202; 1:food-groups G1-207',
    social: '2:cardinal-directions G2-369; 2:cardinal-directions G2-371; 2:continents G2-370; 3:continents-oceans G3-396; 2:family-relationships G2-362; 2:road-signs G2-361; 1:map-key G2-505; 1:map-key G1-379',
    logic: '2:find-differences G2-389; 2:grid-coordinates G2-279; 2:grid-coordinates G2-302; 2:grid-coordinates G2-308; 1:mazes G1-424; 1:mazes G1-425; K:grid-copy K-502; K:grid-copy K-300; K:grid-copy K-299; 1:find-the-differences G1-412; 2:hundreds-chart-moves G2-322; 1:mazes G1-420; 1:mazes G1-421; 2:find-differences G2-388; 1:find-the-differences G1-415; 2:grid-coordinates G2-303; 2:symmetry-line G2-247; 2:symmetry-line G2-248; 2:symmetry-complete G1-432',
    closing: '2:find-differences G2-388; 2:symmetry-complete G1-432; 2:symmetry-line G2-248; 2:symmetry-line G2-247; 1:mazes G1-420; 1:mazes G1-421; 1:mazes G1-424; 1:mazes G1-425; 2:grid-coordinates G2-303; 2:grid-coordinates G2-279; 2:calendar G2-277; 2:calendar G2-297; 2:time-5-min-quarter G2-250; 2:time-5-min-quarter G2-249; 1:find-the-differences G1-415; K:grid-copy K-300;'
      + '3:time-to-minute G3-354; 3:thermometer G3-345; 3:elapsed-duration G3-344; 3:rounding G3-391',
  },
};
