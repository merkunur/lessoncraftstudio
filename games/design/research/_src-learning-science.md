# Learning-science source file — what makes K-3 educational games work, and what children get wrong

**Scope.** Evidence base for brief §4.3 (mechanics of learning) and §7 (quality bar), plus the misconception catalogue that feeds the "Common misconceptions" section of every spec. Ages 5-9. Researched 2026-09-05 from current web sources; every claim carries a URL. Effect sizes are Cohen's d / Hedges' g unless stated.

**How to read.** Each Part 1 section = evidence table → age caveats (5-9) → design rules. Part 2 = per-concept error tables (error → what it looks like → source → what the game should do). "Game response" cells are my inference from the cited remediation, not a tested claim, unless the source itself names the remedy.

**Legend.** ★★★ = multiple meta-analyses / replicated RCTs with children · ★★ = one meta-analysis or several primary studies, partly older learners · ★ = single study, practitioner literature, or contested.

---

## PART 1 — What makes an educational game actually work

### 1. Retrieval practice (the testing effect) in young children ★★★

| Finding | Numbers | Source |
|---|---|---|
| Retrieval practice beats restudy across 217+ studies; effects medium-large | g ≈ 0.50-0.61; largest in secondary, present in primary | Adesope et al. 2017 meta-analysis, summarised at https://www.learningscientists.org/blog/2017/2/9-1 |
| Works in elementary school (fact learning), gains persist at 1 and 5 weeks | 8-12-year-olds recalled more facts 4 days later; replicated at 1 & 5 weeks | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3827082/ ; https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4786565/ |
| **Preschoolers (3-6) only show a testing effect with two ingredients: cued recall (not free recall) AND immediate feedback** | Free recall/no feedback: 43.5% vs 44.5% (no effect). Cued recall, no feedback: 62.1% vs 45.5%. Cued recall + immediate feedback: **89.1% vs 41.8%** | Fazio & Marsh 2019, https://pmc.ncbi.nlm.nih.gov/articles/PMC6110808/ |
| **5-6-year-olds get a long-term benefit only after reaching a high retrieval-success rate through several learning cycles** | Effect present only once practice success was high after multiple initial cycles | Káldi et al. 2025, Child Development, https://srcd.onlinelibrary.wiley.com/doi/full/10.1111/cdev.70018 |
| Expanding retrieval works for preschoolers (2.5-5 yrs) | 1-2-3-7 lag schedule: >2× names recalled vs massed/equal; held at 1 day | https://www.learningscientists.org/blog/2022/2/3-1 |

**Age caveats (5-9).**
- Under ~7, retrieval must be *cued* (picture prompt, partial word, choices) and *fed back immediately*; free recall without feedback produces nothing (Fazio & Marsh).
- Early practice must reach high success; a young child who keeps failing to retrieve gets no testing benefit (Káldi 2025). This is the mechanism behind the brief's "success is certain".
- Benefits grow with age; do not expect secondary-school-sized effects at 5.

**Design rules.**
1. Every item is a *retrieval* event, not a re-presentation: show the cue (picture/number/word) and require the child to produce or select the answer before the answer is shown.
2. Feedback follows each retrieval immediately, and on a miss the correct answer is shown and *re-retrieved* later in the same session (expanding lag: re-ask after 1, then 2, then 3+ intervening items).
3. Front-load success: first 2-3 items of a session are already-mastered or heavily cued so retrieval-success rate starts high, then thin the cues.
4. For the 5-6 band, use recognition/cued formats (tap the matching one, tap the missing part) rather than open production.

### 2. Spacing / distributed practice ★★★

| Finding | Numbers | Source |
|---|---|---|
| Spaced beats massed across 317 experiments / 839 assessments | Optimal gap grows with retention interval | Cepeda et al. 2006, https://www.yorku.ca/ncepeda/publications/CPVWR2006.html |
| Optimal inter-study gap ≈ 10-20% of the retention interval (weeks-scale), ≈ 5% at 1 year | e.g. want it in 1 week → revisit ~1 day later | Cepeda et al. 2008, https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf |
| Holds in real classrooms | Meta-analytic review of applied studies | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12189222/ |
| Within-session expanding spacing helps preschoolers | 1-2-3-7 lags; >2× recall | https://www.learningscientists.org/blog/2022/2/3-1 |
| Caveat: short early spacing gives *early* wins that can wash out by final test | 4-5-year-olds: expanding vs equal converged by end and at 1 week | Leonard et al. 2024, https://pmc.ncbi.nlm.nih.gov/articles/PMC11087082/ |
| Interleaving problem *types* hurts practice performance but doubled next-day test scores | Elementary maths; interleaved vs blocked | Taylor & Rohrer 2010, https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.1598 ; elementary subtraction strategies https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6385790/ |

**What spacing looks like inside a 5-7 minute game.**
- A session has ~15-25 items. Any item the child missed re-enters the queue after 1 intervening item, then 2-3, then 5-7 (expanding). Any item answered correctly first time re-enters once, ≥ 5 items later.
- Do not repeat the same item back-to-back after a correction (that is massed; the retrieval is trivial).
- For 6-9, interleave two or three *related* problem types in the same session once each type has been introduced blocked (e.g. 3 items of add-within-10, then mix add/subtract). Practice accuracy will drop slightly; this is expected and desirable.

**Across sessions.** Games cannot store cross-session state reliably (iframe, no account). Spacing across days is therefore a *catalogue* property: several games target the same objective with different surfaces so that a child returning later re-practises the skill in a different game.

**Design rules.**
1. Specify a re-queue rule for missed items with expanding lags (1 → 2-3 → 5-7 intervening items).
2. Specify one delayed re-check of every missed item near the end of the session ("last look").
3. For 6-9 bands: after the introduction block, interleave; for 5-6 keep one type per session.
4. Never regard a within-session correct answer as "learned"; the finish screen should not say the child has mastered anything.

### 3. Cognitive load theory — worked examples, split attention, redundancy, expertise reversal, seductive details ★★★ (older learners) / ★★ (5-9)

| Effect | Evidence | Source |
|---|---|---|
| Seductive details (interesting but irrelevant text, images, animation, sounds) *reduce* learning | **g = −0.33** across the corpus; worse for transfer | Sundararajan & Adesope 2020, https://link.springer.com/article/10.1007/s10648-020-09522-4 ; "the more, the worse" https://link.springer.com/article/10.1007/s11251-026-09781-8 |
| Split attention: integrating text into the diagram beats separated text + picture | **g = 0.63**, 58 comparisons, n = 2426 | Schroeder & Cenkci 2018, https://link.springer.com/article/10.1007/s10648-018-9435-9 |
| Worked examples beat problem solving for novices; the advantage reverses with expertise (expertise reversal) | d differences 0.45-2.99 between low/high prior knowledge, 26 studies | https://www.sciencedirect.com/science/article/pii/S0959475225000660 ; Kalyuga overview https://link.springer.com/article/10.1007/s11251-009-9102-0 |
| Redundancy: duplicate representations (e.g. identical narration + on-screen text) hurt more experienced learners | Same sources | https://link.springer.com/article/10.1007/s11251-009-9102-0 |
| Immediate verification feedback *hurts* children who already have the correct strategy | Fyfe & Rittle-Johnson 2016 (elementary, equivalence) | https://eric.ed.gov/?id=EJ1086990 |

**Age caveats (5-9).** Most CLT studies use adolescents/adults; the direction is consistent but effect sizes for 5-9 are not established. Working-memory capacity is smallest in this band, so extraneous load bites harder, not softer. Pre-readers cannot use on-screen text at all, so text is pure extraneous load for the 5-6 band.

**Design rules.**
1. **No decorative animation while the child is thinking.** Motion is reserved for (a) showing the mechanism (counters moving into a ten-frame) and (b) feedback after an answer. Background animation, idle characters, particles are seductive details.
2. **Text budget:** 5-6 band — zero instruction text on the play screen; 6-8 — one short sentence, ≤ 8 words in English; 8-9 — ≤ 2 short sentences. Icons and demonstration carry the rest.
3. **Integrate, don't separate:** the number, label or hint appears *on* the object it describes (integrated format), never in a separate panel the child must look across to.
4. **Worked example first, then fade:** the first item of a new mechanic can be shown solving itself (a 2-3 second demonstration) and the second is a "completion" item (part done, child finishes), then full problems. Do not repeat the demonstration for children who are already correct (expertise reversal).
5. One channel per message: a spoken/toned cue *or* a visual one for the same information, not both by routine.

### 4. Feedback — timing and content ★★★

| Finding | Numbers | Source |
|---|---|---|
| In computer-based learning: elaborated feedback (explanation) >> correct-answer >> right/wrong only | **EF 0.49 · KCR 0.32 · KR 0.05**; maths larger than other subjects; *delayed* timing and primary-school samples had smaller effects | Van der Kleij et al. 2015, https://journals.sagepub.com/doi/abs/10.3102/0034654314564881 |
| Feedback overall d ≈ 0.41 but **38% of feedback interventions decreased performance** — those that drew attention to the self rather than the task | 131 experiments, 607 effect sizes | Kluger & DeNisi 1996, https://www.researchgate.net/publication/232458848_The_Effects_of_Feedback_Interventions_on_Performance_A_Historical_Review_a_Meta-Analysis_and_a_Preliminary_Feedback_Intervention_Theory |
| Four feedback levels: task, process, self-regulation, self; praise at the self level is the least effective | Conceptual model (Hattie & Timperley 2007) | summarised in Shute 2008, https://journals.sagepub.com/doi/10.3102/0034654307313795 |
| Formative feedback should be non-evaluative, supportive, timely, specific; timing evidence is mixed — immediate for procedural/low-level tasks, delayed can help transfer | Shute 2008 review | https://journals.sagepub.com/doi/10.3102/0034654307313795 ; PDF https://myweb.fsu.edu/vshute/pdf/shute%202008_b.pdf |
| Immediate verification feedback helps children *without* a correct strategy and hurts children *with* one | N = 108 elementary, equivalence problems | Fyfe & Rittle-Johnson 2016, https://eric.ed.gov/?id=EJ1086990 ; meta-analytic review https://www.researchgate.net/publication/318986554_Feedback_influences_children's_reasoning_about_math_equivalence_A_meta-analytic_review |
| Immediate feedback during retrieval is the ingredient that makes retrieval practice work in preschoolers | 47-point gain | https://pmc.ncbi.nlm.nih.gov/articles/PMC6110808/ |

**Age caveats (5-9).** Immediate, item-level feedback is the right default for this band (procedural tasks, low prior knowledge, the retrieval-practice ingredient). Elaborated feedback must be *visual/enacted* for pre-readers — an explanation they cannot read is KR in disguise. Feedback aimed at the child ("you're so clever / oh dear") is self-level and is where the negative 38% lives.

**Design rules.**
1. Feedback arrives within ~300 ms of the answer, on the item, and *shows* why: re-count the objects with highlighting, slide the pieces to where they belong, animate the ten-frame filling. Never only a tick/cross.
2. Write a distinct response for each anticipated error (Part 2 supplies them). The response names *what to look at*, not that the child was wrong.
3. Correct answers get brief task-level confirmation (the object settles, a one-tone chime, the progress marker advances). No praise at the self level; process praise if any ("you counted each one").
4. After a correct answer that came quickly and confidently, do not re-explain (expertise reversal / Fyfe): confirmation only.

### 5. Extrinsic rewards vs intrinsic motivation; points and badges ★★★ (undermining) / ★★ (gamification in K-3)

| Finding | Numbers | Source |
|---|---|---|
| Expected tangible rewards undermine free-choice intrinsic motivation; engagement-, completion-, performance-contingent rewards all negative; **tangible rewards more damaging for children than college students; verbal rewards less enhancing for children** | d = −0.40 / −0.36 / −0.28; 128 studies | Deci, Koestner & Ryan 1999, https://www.researchgate.net/publication/12712628_A_Meta-Analytic_Review_of_Experiments_Examining_the_Effects_of_Extrinsic_Rewards_on_Intrinsic_Motivation ; education version https://journals.sagepub.com/doi/10.3102/00346543071001001 |
| Overjustification: preschoolers promised a "Good Player Award" for drawing later drew less in free play; unexpected reward did not undermine | 51 preschoolers | Lepper, Greene & Nisbett 1973, https://www.researchgate.net/publication/281453299_Undermining_children's_intrinsic_interest_with_extrinsic_reward_A_test_of_the_overjustification_hypothesis |
| Counterpoint: rewards do not undermine overall; verbal praise increases IM; only expected tangible rewards for mere task engagement undermine | 96 studies | Cameron & Pierce 1994, https://journals.sagepub.com/doi/10.3102/00346543064003363 ; Cameron, Banko & Pierce 2001 https://pubmed.ncbi.nlm.nih.gov/22478353/ |
| Where both camps agree: expected, tangible, engagement-contingent rewards are the harmful case; informational verbal feedback is not | Debate summary | https://web.cortland.edu/andersmd/psy501/intrinsic.pdf |
| Gamification: small-moderate effects on cognitive outcomes, less stable on motivation/behaviour; game fiction and competition-plus-collaboration are the elements that matter | g = 0.49 cognitive, 0.36 motivational, 0.25 behavioural | Sailer & Homner 2020, https://eric.ed.gov/?id=EJ1245270 |
| Gamification fosters *extrinsic* more than intrinsic motivation; badges/points shift focus to the reward | Meta-analyses | https://link.springer.com/article/10.1007/s11423-023-10337-7 ; K-12 motivation meta https://onlinelibrary.wiley.com/doi/10.1002/pits.70056 ; 2008-2023 achievement meta https://bera-journals.onlinelibrary.wiley.com/doi/full/10.1111/bjet.13471 |
| Praise for intelligence → performance goals, less persistence, worse post-failure performance than praise for effort/process | Six studies, 5th graders | Mueller & Dweck 1998, https://pubmed.ncbi.nlm.nih.gov/9686450/ |

**Age caveats (5-9).** Children are *more* susceptible to reward undermining than adults (Deci 1999). Stickers/stars for merely playing are the textbook harmful case. The Cameron/Pierce reading still permits informational feedback and unexpected acknowledgement.

**Design rules.**
1. No points, stars, coins, badges or unlockables for engagement or completion. Progress is shown as *the task completing* (the tower built, the path filled, the picture assembled) — the reward is the state of the world the child made.
2. If a token appears, it must be informational and tied to the learning act (e.g. a ten-frame filling as the child counts), never a separate economy.
3. Praise strings from `GameCore` must be process-level ("you counted every one", "you looked at the tens first"), never person-level ("clever!", "genius!").
4. Any end-of-game celebration is unexpected in form (varies), brief, and not announced in advance ("finish to win a…" is forbidden).

### 6. Timers, speed and competition for 5-9 ★★ (anxiety link) / ★ (timed tests as *cause*) / ★★ (fluency interventions work)

| Finding | Numbers | Source |
|---|---|---|
| Maths anxiety already present in grades 1-2 and predicts lower achievement — specifically for *higher*-working-memory children, whose WM-heavy strategies get disrupted | N = 154, grades 1-2 | Ramirez, Gunderson, Levine & Beilock 2013, https://www.tandfonline.com/doi/abs/10.1080/15248372.2012.664593 |
| Boaler: timed tests cause early onset of maths anxiety; fluency comes from number sense, not speed drill | Claim; the causal reference trail is thin | https://www.youcubed.org/evidence/fluency-without-fear/ ; critique https://fillingthepail.substack.com/p/timed-tests-and-maths-anxiety |
| Explicit timing / drill-with-modelling *does* build fact fluency; distributed 1-minute timings work | Codding 2011 component meta-analysis; 2026 MD fluency meta g = 0.76 | https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-5826.2010.00323.x ; https://pmc.ncbi.nlm.nih.gov/articles/PMC13069136/ |
| Competition lowered intrinsic motivation in young children, especially girls | Field experiments | https://www.researchgate.net/publication/254349506_Negative_Effects_of_Competition_on_Children's_Intrinsic_Motivation |
| After *losing*, 5-6-year-olds chose to compete less than younger children | 166 children aged 2-6 | https://pmc.ncbi.nlm.nih.gov/articles/PMC5855142/ |
| Cooperative > competitive/individualistic on achievement; effect much stronger for adolescents than young children | 117-164 studies | https://www.semanticscholar.org/paper/Cooperative-learning-methods:-A-meta-analysis.-Johnson-Johnson/93e997fd0e883cf7cceb3b1b612096c27aa40f90 ; review https://files.eric.ed.gov/fulltext/EJ1096789.pdf |
| In gamification, *competition combined with collaboration* is the effective form | Moderator | https://eric.ed.gov/?id=EJ1245270 |

**Honest reading.** The strong claim "timed tests cause maths anxiety" is under-referenced; the moderate claim "time pressure loads working memory and anxiety already exists at 6-7, hitting the children who use good strategies" is solid (Ramirez 2013). Fluency practice with short timings does raise fluency in trials — but those trials are teacher-supervised drills, not self-directed games, and the outcome measured is speed. Neither supports visible countdowns in a no-adult, no-account game for 5-9.

**Fluency vs speed.** Fluency = accurate + efficient + flexible strategy use; speed is a by-product. Measure fluency as "solved without counting-all / without hints", not seconds.

**Design rules.**
1. No visible timer, countdown, or "hurry" cue by default. If a game's mechanic genuinely needs pacing (e.g. a rhythm/skip-count game), pacing is *musical/steady*, optional, and never ends the game.
2. No competition against another player or a computer opponent that can win. Where a second character exists it is a partner (collaborative goal) or a neutral turn-taker that cannot finish first.
3. Optional "quick round" modes, if ever specified, are off by default, unlocked only from a settings icon, and report *items solved*, never time.
4. Fluency progression is expressed as fading supports (counters disappear, hints delay), never as a clock.

### 7. Adaptive difficulty, desirable difficulties, the ~85% finding, "success is certain" ★★

| Finding | Numbers | Source |
|---|---|---|
| For gradient-descent binary-classification learners the optimal training error is ≈ 15.87% (accuracy ≈ 85%) | Derived for algorithms; human evidence is by analogy only | Wilson et al. 2019, https://www.nature.com/articles/s41467-019-12552-4 |
| Young children need *high* retrieval success before spacing/testing benefits appear | 5-6-year-olds | https://srcd.onlinelibrary.wiley.com/doi/full/10.1111/cdev.70018 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC6110808/ |
| Productive failure (problem-solving first) works overall but **much less for elementary than for ≥ grade 6** | g = 0.36 overall; weaker for younger | Sinha & Kapur 2021, https://journals.sagepub.com/doi/10.3102/00346543211019105 |
| Interleaving is a desirable difficulty that does transfer to elementary maths | Test scores doubled | https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.1598 |
| Expertise reversal: supports that help novices hurt once the child is competent | See §3 | https://www.sciencedirect.com/science/article/pii/S0959475225000660 |

**Reading for 5-9.** The 85% rule is a machine-learning result and should not be quoted as a classroom law; but it agrees with the child studies that the target success band is high (~80-90%), not 50%. Desirable difficulties to *use* at this age: spacing, interleaving, cue-fading. Difficulties to *avoid*: open problem-solving before any instruction, unprompted free recall, ambiguous tasks.

**What "success is certain" looks like.**
- Every item has a bounded support ladder: attempt 1 unaided → attempt 2 with a targeted hint (from the misconception table) → attempt 3 with a worked demonstration → the child completes the demonstrated item. There is no attempt 4; the item is solved, the game moves on and re-queues the item later.
- The session ends when the item count is reached, never on failure.

**Design rules.**
1. Adaptation rule (specify per game): 3 consecutive first-attempt corrects → step difficulty up one level; 2 errors within the last 3 items → step down one level. Never step down below level 1; never step up more than one level at a time.
2. Target a first-attempt success rate of 80-90% across the session; the difficulty ladder is designed so that level 1 is achievable by the lower edge of the band with no support.
3. Supports fade with success (the counters stay for the first level, appear only on error at level 2, appear only on the second error at level 3).
4. For 8-9 only, a game may open with one exploratory "try it first" item before demonstration; for 5-8, demonstrate first.

### 8. Error handling — productive failure vs failure aversion; growth-mindset wording ★★ (feedback wording) / ★ (mindset interventions)

| Finding | Numbers | Source |
|---|---|---|
| Problem-solving-before-instruction is less effective for young children (they cannot yet analyse their own errors) | Grade moderator | https://journals.sagepub.com/doi/10.3102/00346543211019105 |
| Process/effort praise → persistence and better recovery after failure; intelligence praise → helplessness | 5th graders | https://pubmed.ncbi.nlm.nih.gov/9686450/ |
| Growth-mindset *interventions* on achievement: tiny to nil overall; small benefits for at-risk/low-SES groups | d = 0.08 (Sisk 2018); n.s. in rigorous studies (Macnamara & Burgoyne 2023) | https://www.researchgate.net/publication/323565554_To_What_Extent_and_Under_Which_Circumstances_Are_Growth_Mind-Sets_Important_to_Academic_Achievement_Two_Meta-Analyses ; https://artscimedia.case.edu/wp-content/uploads/sites/141/2020/06/26110416/Macnamara-Burgoyne-2023.pdf ; https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12723 |
| Feedback that shifts attention to the self hurts performance | 38% of interventions negative | https://www.researchgate.net/publication/232458848_The_Effects_of_Feedback_Interventions_on_Performance_A_Historical_Review_a_Meta-Analysis_and_a_Preliminary_Feedback_Intervention_Theory |
| Low-prior-knowledge children benefit from immediate correction; they do not benefit from being left to struggle | Elementary | https://eric.ed.gov/?id=EJ1086990 |

**Reading.** "Growth mindset" as a *curriculum* is oversold; the narrow, replicated finding is about *praise wording* (process not person) and about feedback staying at the task level. Failure-tolerant design is justified by the retrieval-success and reward literatures, not by mindset theory.

**Design rules.**
1. An error changes the *object*, not the child's status: the piece bounces back, the counter un-fills, the wrong card gently returns. No red cross, buzzer, life lost, or score decrement.
2. Every wrong-answer message is a task-level pointer ("look — this row has one more") never a self-level verdict ("oops, not quite, try harder").
3. Praise strings, if used, are process-level and varied; never "smart", "genius", "clever".
4. The child always gets another attempt on the same item with more support (§7 ladder); the item never disappears unsolved.

### 9. Evidence on digital maths / reading games specifically ★★

| Finding | Numbers | Source |
|---|---|---|
| Serious games vs conventional instruction: better learning and retention, *not* more motivating; better when combined with other instruction and multiple sessions | learning d = 0.29, retention d = 0.36, motivation d = 0.26 n.s. | Wouters et al. 2013, https://eric.ed.gov/?id=EJ1008015 |
| Maths video games PreK-12 vs traditional: small effect, heterogeneous | d = 0.13 | Tokac, Novak & Thompson 2019, https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12347 |
| Game-based learning in early childhood (3-8): moderate effects; **puzzle games g = 0.63 vs other types g = 0.31**; longer sessions better for motivation; feedback not a significant moderator | cognitive g = 0.46, motivation 0.40, engagement 0.44; 136 studies | https://pmc.ncbi.nlm.nih.gov/articles/PMC11018941/ |
| Digital interventions for children with maths difficulties improve performance | mean ES 0.55 | https://www.sciencedirect.com/science/article/pii/S0360131520301512 |
| Elementary DGBL: effectiveness varies by content and year group | 2026 JCAL meta | https://onlinelibrary.wiley.com/doi/10.1002/jcal.70295 |
| Bedtime Math app (1st grade, N = 587 families): maths gains, strongest where parents were maths-anxious; **contested** on reanalysis | RCT; comment + response in Science | https://news.uchicago.edu/story/math-story-time-home-bolsters-achievement-school ; comment https://www.science.org/doi/10.1126/science.aad8008 ; response https://www.science.org/doi/10.1126/science.aad8555 |
| Khan Academy Kids: small RCT (N = 49, ages 4-5, low income) — phonological awareness +11.3 points for ≥ 1 h/week users | Journal of Children and Media | https://blog.khanacademy.org/khan-academy-kids-improves-pre-literacy-skills-in-preschoolers-research-confirms/ |
| DragonBox 12+ (middle school algebra): no significant performance change in one study | Wilcoxon n.s. | https://mdsoar.org/items/82bc868c-9f71-4203-995b-377e6efbd798 |
| Digital maths training reduced maths anxiety in grades 1-2 | RCT-style | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9120910/ |
| EEF early maths guidance: manipulatives and representations, board games, integrating maths into the day; the *how and why* of manipulative use matters more than the object | Guidance report | https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/early-maths |

**What actually moved outcomes.** (a) The game's core loop *is* the target skill (puzzle-type games outperform quiz-wrappers in the ECE meta-analysis); (b) repeated sessions, not one exposure; (c) games used *alongside* other instruction; (d) a representation the child manipulates (ten-frames, number lines, arrays) rather than a decorated multiple-choice; (e) for reading, explicit phonological work drove the Khan Kids gain. What did *not* move outcomes: motivation-first designs (games are not reliably more motivating than good instruction, Wouters), one-off use, quiz-plus-arcade.

**Design rules.**
1. The interaction *is* the mathematics: the child counts, partitions, composes, compares, sorts, blends. A quiz whose answer is typed into a spaceship is disallowed (brief §7).
2. Prefer puzzle/manipulative structures (arrange, complete, match, build) over recall-and-shoot.
3. Assume each game is one of several sessions on the objective; do not try to teach the whole concept in one game.
4. Where a physical manipulative has evidence (ten-frame, bead string, number line, base-ten blocks, arrays), the on-screen object mirrors it exactly, including its conventions (ten-frame fills top row left→right).

### 10. Touch-interface findings for 5-7-year-olds ★★★

| Finding | Numbers | Source |
|---|---|---|
| Tap and drag-and-drop accuracy improves steadily from 3 to 6; still below adults at 6; correlates with finger dexterity and visuospatial skills | 89 children + 30 adults | Vatavu, Cramariuc & Schipor 2015, https://www.sciencedirect.com/science/article/abs/pii/S1071581914001426 |
| Drag-and-drop: error rate roughly doubles with smaller targets; finger 12.6% vs stylus 9.3% errors | Tablet Fitts study with children | FittsFarm (Anthony / MacKenzie) 2019, https://www.yorku.ca/mack/interact2019.html |
| Larger targets significantly change how 4-5-year-olds perform gestures; 5-year-olds outperform 4-year-olds | iPad, 16 children | https://www.researchgate.net/publication/344072277_Study_of_Touch_Gestures_Performance_in_Touch_Devices_by_Young_Children |
| Children need visible feedback during gestures on mobile | IDC 2013 | https://dl.acm.org/doi/10.1145/2485760.2485775 |
| NN/g: 3-5-year-olds need ≥ 2 cm × 2 cm targets (≈ 4× the adult minimum); can tap/swipe, can drag coarsely but not precisely; 6-8 still find precise/long drags frustrating and prefer trackpad/touch to mouse | Practitioner synthesis | https://www.nngroup.com/articles/children-ux-physical-development/ |
| Preschoolers with a mouse: slower, more errors; dragging worse than pointing | ACM TOCHI | Hourcade et al., https://dl.acm.org/doi/10.1145/1035575.1035577 ; mouse skill 1992 https://www.sciencedirect.com/science/article/abs/pii/036013159290113J |
| Age 5→10: mouse/joystick improve with age more than touchscreen does — touch is the flattest, most accessible input for the youngest | Cited in NN/g | https://www.nngroup.com/articles/children-ux-physical-development/ |
| WCAG 2.5.5 target ≥ 44 × 44 CSS px (AAA); Apple 44 pt; Android 48 dp; padding counts | Standards | https://www.w3.org/WAI/WCAG21/Understanding/target-size.html |

**Design rules.**
1. Tap targets: 5-6 band ≥ 64 px *visible* (≈ 2 cm on a typical tablet — the NN/g figure; the brief's 64 px floor is consistent), 6-9 ≥ 48 px; hit-areas padded to ≥ 72 px; ≥ 12 px gap between adjacent targets.
2. **Drag-and-drop is a 6-9 pattern.** For 5-6, replace with *tap source → tap destination* (two taps) or tap-to-toggle; if a 5-6 game drags at all, the drop zone is huge (≥ 2× the object) and snaps from anywhere in a generous radius.
3. Every drag shows continuous feedback (the object lifts, follows the finger, drop zone highlights on hover, snaps or springs back) — never a silent failure.
4. Assume touch first; mouse/trackpad must work but no design may depend on hover, right-click, precision pointing, or double-click. Keyboard: every action reachable with Tab/Enter/arrows (brief §7).
5. Avoid gestures beyond tap and single-finger drag (no pinch, two-finger, long-press timing).

---

## PART 2 — Misconception catalogue (ages 5-9)

Format per concept: **Error** · what it looks like · source · remediation (research) → game response.

### MATHS

#### M1. Counting

| # | Error | What it looks like | Source | Remediation → game response |
|---|---|---|---|---|
| 1 | One-to-one correspondence failure (double-count / skip) | "1,2,3,3,4" or touching one object twice, missing one | Gelman & Gallistel principles; error catalogue https://www.cse.iitk.ac.in/users/apps/articles/Counting%20principles%20article%201.pdf ; toddler mastery study https://www.sciencedirect.com/science/article/abs/pii/S1041608009000120 | Organise objects in a line, move each as counted (EEF manipulatives). Game: objects arranged in a row; each tap greys the object and shows the numeral; a second tap on a counted object does nothing; on miscount, replay the count with each object lighting in turn. |
| 2 | Stable-order violation | Skips or repeats number words ("1,2,3,5,6") | same | Game: number strip visible; on skip, highlight the gap between the two numerals. |
| 3 | Cardinality error: "last number = how many" not understood | Counts to 5 then, asked "how many?", recounts or says a different number | https://www.cse.iitk.ac.in/users/apps/articles/Counting%20principles%20article%201.pdf ; Stanford PreK maths https://prek-math-te.stanford.edu/system/files/media/document/2017/The%20Principal%20Counting%20Principles.pdf | Ask "how many?" after every count; give-N tasks. Game: after the count, the set gathers under one big numeral; ask "how many?" with numeral choices; on error, re-gather with the last numeral pulsing. |
| 4 | Starting from 1 every time (count-all) rather than counting on | To add 4+3 counts 1-2-3-4 then 1-2-3 then 1…7 | Siegler strategy work summarised at https://www.sciencedirect.com/science/article/abs/pii/S0022096504000335 ; https://www.tandfonline.com/doi/full/10.1080/10986065.2020.1842968 | Hide the first addend (cover it) so counting-on is the only route. Game: first group shown as a closed box labelled with its numeral; only the second group is countable. |
| 5 | Length/spread bias (Piaget conservation) | Judges the longer/spread-out row as "more" | Virtually all 3-4-year-olds; inhibition needed to overcome https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0040802 | Require one-to-one matching lines between rows. Game: comparing rows must be answered by tapping pairs; the spread row is always a distractor at level ≥ 2. |
| 6 | Order-irrelevance not grasped | Believes counting from the other end gives a different total | Gelman & Gallistel, https://www.cse.iitk.ac.in/users/apps/counting_principles.html | Game: recount from the other end shows the same numeral; explicit comparison. |

#### M2. Numeral recognition and writing

| # | Error | Source | Remediation → game response |
|---|---|---|---|
| 1 | Reversals of single digits (3, 5, 7, 6↔9) — visual-spatial, normal to ~6 | https://www.allaboutlearningpress.com/blog/number-reversals/ ; https://ilslearningcorner.com/2016-07-reversals-why-my-child-cant-grasp-letter-and-number-reversals-b-d-6-9-not-always-dyslexia/ | Treat as expected; anchor 6/9 to a picture cue. Game: never mark a mirror-image as a "hard" error; show the correct orientation beside the child's choice and ask again. |
| 2 | Order reversal 12↔21, 13↔31 (teens spoken ones-first) | Transcoding: lexical vs syntactic errors, 19% error rate in grade 1 https://www.sciencedirect.com/science/article/abs/pii/S0022096522001394 ; language effects https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3990049/ | Pair numeral with a tens-and-ones picture every time. Game: 12 always shown with 1 ten-rod + 2 ones; distractor 21 shown with 2 rods + 1 one when the child picks it. |
| 3 | Writing numbers as heard: "sixteen" → 61, "one hundred and five" → 1005 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.642153/full ; https://komodomath.com/us/blog/Common_math_mistakes_and_misconceptions | Game: build the numeral from place-value tiles rather than typing digits. |
| 4 | Naming errors on multi-digit numbers reflect misunderstanding of place structure | https://www.sciencedirect.com/science/article/abs/pii/S0022096522001394 | Same as above. |

#### M3. Comparing quantities

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Uses length/area/size instead of number (see M1.5) | https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0040802 | Pairing lines; density distractors. |
| 2 | Bigger object = more | Size-value compatibility https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7096438/ | Vary object size independently of count from level 2. |
| 3 | Confuses "more/fewer/same" language; "fewer" acquired last | EEF guidance on maths language https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/early-maths | Icons for more/fewer (arrow with count) paired with words. |

#### M4. Number bonds / decomposition (part-whole)

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Misidentifies the whole — puts the largest number as a part | https://therecoveringtraditionalist.com/number-bonds-for-elementary-students/ ; https://www.thethinkacademy.com/blog/edubriefs-math-what-is-a-number-bond-in-math/ | The whole is drawn as the container physically holding the parts (bar model), not three equal circles. |
| 2 | Adds the two known numbers whatever the diagram | same | Show counters moving from whole into parts before any numerals. |
| 3 | Knows 3+7 but not 7+3 or "10−3" as the same bond | https://teachablemath.com/teaching-addition-and-subtraction-for-numbers-to-20/ | Each bond practised in all three forms on the same ten-frame picture. |
| 4 | Jumping straight to abstract circles causes anxiety, no understanding | https://therecoveringtraditionalist.com/number-bonds-for-elementary-students/ | Concrete (counters) → pictorial → numerals within one session. |

#### M5. Addition strategies

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Count-all persists when count-on / min strategy is available | Geary/Siegler summaries https://www.sciencedirect.com/science/article/abs/pii/S0022096504000335 ; https://www.tandfonline.com/doi/full/10.1080/10986065.2020.1842968 | Cover the first addend; start from the larger addend (min). |
| 2 | Counting on begins *at* the first addend ("4, 5, 6" for 4+3 = 6) — off-by-one | Counting-model account https://www.sciencedirect.com/science/article/abs/pii/S0010027715300597 | Feedback: highlight that "4" is already there; the first jump lands on 5. |
| 3 | Irregular arrays make strategies worse; linear/spatial layouts improve them | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6312299/ | Always arrange addends linearly or in ten-frames. |
| 4 | Over-reliance on finger counting into grade 3 | https://www.tandfonline.com/doi/full/10.1080/10986065.2020.1842968 | Fade counters; introduce known-fact anchors (doubles, make-ten). |

#### M6. Subtraction

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Smaller-from-larger bug in columns (42−17 → 35) | Brown & Burton 1978; https://exquisitive.com/library/DiagnosingBugsSimpleProceduralSkill.pdf ; https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog0404_3 | Base-ten blocks: cannot take 7 from 2 → must open a ten. Feedback shows the ones column physically. |
| 2 | Counting-back off-by-one (8−3: "8,7,6" = 6) | Counting-model https://www.sciencedirect.com/science/article/abs/pii/S0010027715300597 | Number line with jumps; the start number is not a jump. |
| 3 | Take-away only; cannot see subtraction as difference/comparison | Carpenter & Moser problem types; compare problems hardest https://files.eric.ed.gov/fulltext/ED292683.pdf ; https://cindyelkins.edublogs.org/2017/11/18/__trashed/ | Separate games for "take away" and "how many more" with matching-line representations for the latter. |
| 4 | Children believe buggy algorithms are valid shortcuts | https://www.sciencedirect.com/science/article/abs/pii/095947529390022R | Let the manipulative refuse the impossible move rather than saying "wrong". |
| 5 | Treats subtraction as commutative (3−8 = 5) | Follows from bug 1 | Show that 3 objects cannot lose 8. |

#### M7. The equals sign

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Operational view: "=" means "the answer comes next"; 3+4 = _ + 5 → 7 | McNeil et al. https://cladlab.nd.edu/assets/384440/mcneilhornburgbrletic_shipleymatthews_inpress.pdf ; https://www.sciencedirect.com/science/article/abs/pii/S1041608015000060 | Balance-scale representation; equations shown as two pans. |
| 2 | Add-all: 3+4 = _ + 5 → 12 | same | Pans: putting 12 on the right tips the scale visibly. |
| 3 | Rejects non-standard forms (7 = 3+4, 3+4 = 4+3) | https://files.eric.ed.gov/fulltext/EJ1184961.pdf | Include reversed and both-sides forms from the first level. |
| 4 | Persists to grade 4 and predicts algebra difficulty | https://pmc.ncbi.nlm.nih.gov/articles/PMC6421116/ | Justifies dedicated games at 6-8 and 8-9. |

#### M8. Place value

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Digits as independent numbers: 47 = "4 and 7" | https://www.mathnasium.com/math-centers/paoli/news/place-value-mistakes-elementary-school | Tens shown as bundled rods that cannot be split without an action. |
| 2 | Teen numbers: "eleventeen", 16 as 61 | https://fhsu.pressbooks.pub/ecumath/chapter/chapter-10-whole-number-place-value/ ; https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.642153/full | Ten-frame + extra ones for every teen; show "ten and six". |
| 3 | Syntactic transcoding: 105 → 1005 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.642153/full | Place-value tiles overlay (100 tile, then 5 slides over the 00). |
| 4 | Language interference: German/Dutch/Danish invert tens and ones ("vierundsechzig"), raising transcoding errors | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3990049/ | Locale note: for de/nl/da, always pair spoken order with the visual tens-then-ones layout; do not rely on word order. |
| 5 | Zero as placeholder ignored (three hundred five → 35) | https://www.mathnasium.com/math-centers/paoli/news/place-value-mistakes-elementary-school | Empty tens column must be shown as an empty slot. |

#### M9. Skip counting

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Skip-counting as a rote chant, not as counting groups (can say 2,4,6 but cannot count 6 socks in pairs) | Gervasoni https://www2.merga.net.au/documents/RR_gervason.pdf ; "They still can't count" https://files.eric.ed.gov/fulltext/EJ1093257.pdf | Objects grouped visibly; each chant word lights a group. |
| 2 | Loses place / mixes sequences (2s → 5s mid-run) | https://www.monstermath.app/blog/why-skip-counting-can-be-a-lifeline-for-dyscalculia-learners | Hundred-square highlight trail. |
| 3 | Cannot start from a non-multiple (count by 2 from 3) | https://www.edboost.org/math-skills/skip-counting-2s-5s-10s | Level 3 starts from off-multiples. |
| 4 | Over-generalises "ends in 0 or 5" | same | Include 2s/3s. |

#### M10. Multiplication

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Groups vs group-size confused (3×4 built as 4 groups of 3 then read wrongly) | https://mathsnoproblem.com/blog/teaching-maths-mastery/maths-misconceptions-multiplication | Array representation with rows/columns labelled by icon. |
| 2 | "Multiplication always makes bigger" | https://mathsnoproblem.com/blog/teaching-maths-mastery/maths-misconceptions-multiplication ; https://apasseducation.com/education-blog/4-misconceptions-students-multiplication/ | Include ×1 and ×0 items; arrays with 1 row. |
| 3 | Commutativity not seen (3×4 and 4×3 are different facts) | https://elementarymath.edc.org/resources/multiplication/ | Rotate the array 90° as feedback. |
| 4 | Repeated-addition-only model breaks later | https://www.sciencedirect.com/science/article/abs/pii/S0732312316301055 | Use arrays and "groups of" pictures alongside repeated addition, not instead. |
| 5 | Additive error under multiplicative wording ("3 times as many" → +3) | Same cluster | Distinct "times as many" comparison bar. |

#### M11. Division

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Sharing (partitive) is easy; grouping (quotitive) acquired later through instruction | https://www.sciencedirect.com/science/article/abs/pii/S088520140300039X ; https://www.researchgate.net/publication/230080581_From_sharing_to_dividing_Young_children%27s_understanding_of_division | Separate games: "share among N" (5-8) before "how many groups of N" (8-9). |
| 2 | Gives the divisor as the answer when objects are pre-grouped by quotient | https://www.sciencedirect.com/science/article/abs/pii/S088520140300039X | Ask explicitly "how many in each?" vs "how many groups?" with the icon. |
| 3 | Unequal sharing tolerated (one gets more) | Fair-sharing profiles https://www.sciencedirect.com/science/article/abs/pii/S0959475221000190 | Feedback shows the unequal group pulsing. |
| 4 | Remainders: cannot deal with leftovers / ignores them | Same literature | Level 3 introduces remainders as "left over" items that stay visible. |

#### M12. Fractions

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | "Half" means "cut", not two *equal* parts; kindergarteners cut unequal halves | Pothier & Sawada 1983 via https://www.nzcer.org.nz/nzcerpress/set/articles/fractions-partitioning-and-part-whole-concept ; https://link.springer.com/article/10.1023/A:1017513716026 | Equal-parts check: overlay the parts to compare; unequal parts refuse to "seal". |
| 2 | Bigger denominator = bigger fraction (1/8 > 1/4) | Whole-number bias https://eric.ed.gov/?id=ED572370 ; https://www.oise.utoronto.ca/robertson/blog/whole-number-bias-and-3-misconceptions-about-fractions-junior-math-2022-05-26 | Compare fraction bars of the same whole. |
| 3 | Numerator-only comparison (2/3 = 2/5) | https://jillianstarrteaching.com/misconceptions-about-fractions/ | Same. |
| 4 | Halves/quarters easy, thirds/fifths hard (odd partitions) | https://www.nzcer.org.nz/nzcerpress/set/articles/fractions-partitioning-and-part-whole-concept | Level order: halves → quarters → thirds. |
| 5 | The whole changes but child compares parts (half of a small pizza = half of a big one) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3794363/ | Always show the whole; vary wholes only at 8-9. |

#### M13. Telling time

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Reads the hour hand as pointing to the *nearest* number (7:30 read as 8:30 / 6:30) | https://attaineducation.com.au/inspiration/top-3-common-mistakes-kids-make-when-telling-time ; longitudinal misconceptions https://www.researchgate.net/publication/376246039_Children_'s_Understanding_of_Analog_Time_Keeping_Longitudinal_View_and_Potential_Misconceptions | Show the hour hand's *sector* shaded ("still in 7's hour"). |
| 2 | Reads the minute hand as the clock numeral (big hand on 2 → "2 past") | https://therecoveringtraditionalist.com/teaching-kids-to-tell-time-analog/ | Minute ring with 5-step marks revealed on error. |
| 3 | Swaps hour/minute hands; reads counter-clockwise; starts the 5-count in the wrong place | Error frequency table https://www.researchgate.net/figure/Frequency-of-false-answers-of-different-types-of-errors-on-clock-reading-tasks-in_tbl1_51230822 | Hands differ in length *and* colour *and* shape (accessibility). |
| 4 | Whole/quarter hours easier than half past; numberless clocks much later | https://www.researchgate.net/publication/376246039_Children_'s_Understanding_of_Analog_Time_Keeping_Longitudinal_View_and_Potential_Misconceptions | Level order: o'clock → half past → quarter → 5-minute. Locale note: "half seven" means 6:30 in de/nl/sv/da/no/fi and 7:30 in en — never render spoken half-hour idioms in a shared string. |

#### M14. Measurement (length)

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Starts measuring at 1 (or at the ruler's end) instead of 0 | https://escholarship.org/content/qt5cz2r7vj/qt5cz2r7vj_noSplash_977c3c793a51d2d529f807d247272840.pdf ; cross-national study https://www.sciencedirect.com/science/article/pii/S0732312323000184 | Object placed at non-zero offsets; child counts *intervals* highlighted. |
| 2 | Counts tick marks, not intervals ("tick counting") | https://www.mathcoachscorner.com/2012/05/measurement-misconceptions/ ; NRC appendix https://nap.nationalacademies.org/read/12519/chapter/17 | Disconfirming evidence: show unit chips laid under the object (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11278360/). |
| 3 | Unit iteration with gaps or overlaps | NRC appendix https://nap.nationalacademies.org/read/12519/chapter/17 | Units snap edge-to-edge; a gap shows as a visible hole. |
| 4 | Mixed units / thinks bigger unit → bigger number | https://www.mathcoachscorner.com/2012/05/measurement-misconceptions/ | Same object measured with two unit sizes side by side. |
| — | Locale: units are metric everywhere except the US; specs use non-standard units (cubes, paperclips) for 5-8 and cm for 8-9; never inches. | Brief §7 | — |

#### M15. 2D / 3D shapes

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Prototype orientation: rotated square = "diamond, not a square"; ~⅓ of 4-6-year-olds and many older fail | Clements & Sarama https://www.researchgate.net/publication/258933238_Young_Children's_Ideas_about_Geometric_Shapes ; square study https://www.scielo.br/j/bolema/a/M469Kf7YBhwHGdygTHsrxVq/?lang=en | Rotate the shape live to its prototype pose as feedback. |
| 2 | Triangles: 93-96% identify the prototype, ~half fail on flipped/rotated/skinny triangles | https://www.ejmste.com/article/young-childrens-conceptual-understanding-of-triangle-4480 | Vary orientation and type from level 1; count sides as feedback. |
| 3 | Counting sides/vertices: loses place, double-counts | same | Sides light one by one on tap. |
| 4 | 3D: cube = cuboid; curved surfaces "have no faces"; faces/edges/vertices blur | https://thirdspacelearning.com/blog/what-are-vertices-faces-edges/ | Explode the net; tap each face. |
| 5 | Calls 3D objects by 2D names ("ball is a circle") | https://thirdspacelearning.com/blog/what-are-vertices-faces-edges/ | Show the shadow vs the object. |

#### M16. Patterns

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Cannot identify the unit of repeat (hardest task); copies/extends but cannot say "the bit that repeats" | Rittle-Johnson et al. https://cdn.vanderbilt.edu/vu-sub/wp-content/uploads/sites/280/2023/07/19031022/2013RittleJohnsonFyfeMcLeanMcEldoon_ATPT4a.pdf ; https://www.sciencedirect.com/science/article/abs/pii/S0885200619300870 | Bracket the unit visually; ask the child to tap the unit before extending. |
| 2 | Extends by copying the last element rather than continuing the unit (ABB → ABBB…) | https://www.researchgate.net/publication/372717612_Young_Children_Explain_Repeating_Patterns | Feedback re-brackets the units. |
| 3 | Patterns ending mid-unit are harder | https://link.springer.com/article/10.1007/s10649-017-9762-7 | Level 1 ends on complete units; level 3 ends mid-unit. |
| 4 | Translating a pattern to new materials (ABB in colours → ABB in shapes) is hard | https://www.sciencedirect.com/science/article/abs/pii/S0885200619300870 | 8-9 level: "same pattern, different things". |

#### M17. Money

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Bigger coin = worth more | https://www.numeracyteachersacademy.com/blog/teachingmoney ; size-value effect https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7096438/ | Represent each coin's value as a stack of unit cubes beside it. |
| 2 | Counts coins as items, not values (3 coins = 3) | https://files.eric.ed.gov/fulltext/ED427978.pdf | Each coin unrolls into its unit value. |
| 3 | Cannot combine mixed coins | same | Skip-count trail by coin value. |
| — | Locale: currencies differ across 11 markets; specs use an abstract coin set with values 1, 2, 5, 10 and no national imagery; `?lang=` may only swap the currency symbol string. | Brief §7 | — |

#### M18. Data (bar charts, pictographs)

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Graph-as-picture: reads the chart as a literal picture of the objects | https://www.researchgate.net/publication/221249297_Graph-as-Picture_Misconceptions_in_Young_Students | Build the chart by moving the objects into columns first. |
| 2 | Ignores the key; counts symbols when one symbol = 2 or more | https://www.csc.cymru/api/storage/185f9c91-9b04-4d6f-87b3-1f86b019d6ae/3.%20CSC%20Ensuring%20progress%20and%20dealing%20with%20misconceptions%20in%20data%20handling%20.pdf | One-to-one pictographs for 5-8; scaled keys only at 8-9 with the key pulsing on error. |
| 3 | Reads the bar's top as an item, not a value; misreads scale without gridlines | Bar-tip error https://www.wellesley.edu/news/missing-the-bar-how-people-misinterpret-data-in-bar-graphs | Gridlines and integer labels always on. |
| 4 | Can "read the data" but not "read between" (compare two bars) | Curcio levels via https://www.researchgate.net/publication/221249297_Graph-as-Picture_Misconceptions_in_Young_Students | Level 1 read-one-bar; level 2 compare; level 3 total. |

### LITERACY

#### L1. Letter recognition / reversals

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | b/d/p/q mirror reversals — developmentally normal to ~7, not a dyslexia sign; the brain's mirror invariance must be *unlearned* for letters | https://www.understood.org/en/articles/faqs-about-reversing-letters-writing-letters-backwards-and-dyslexia ; Dehaene mirror errors via https://www.thedyslexiaclassroom.com/blog/is-there-a-link-between-reversals-and-dyslexia | Never treat as random error; show the two letters side by side with a stable anchor (b has its bump on the *right* of the stick). Game: a reversal choice gets a "look which side the belly is" highlight, not a generic retry. |
| 2 | Upper/lowercase not linked (A ≠ a) | Ehri phases https://www.95percentgroup.com/insights/the-stages-of-literacy-development-a-complete-guide/ | Matching game pairs both forms; feedback morphs one into the other. |

#### L2. Letter names vs sounds

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Uses the letter *name* as its sound: y → /w/ ("yes" spelled "wes"), w → /d/, h → /ch/ | Treiman: https://www.cambridge.org/core/journals/applied-psycholinguistics/article/abs/role-of-letter-names-in-childrens-learning-of-phonemegrapheme-relations/6F759B12740139462FDC39A3C10E6FFF ; https://www.shanahanonliteracy.com/blog/letter-names-or-sounds-first-you-might-be-surprised-by-the-answer | Letters whose names *contain* their sound (b, d, k) are easy; teach y, w, h explicitly with a picture anchor. Game: y/w/h items get an extra picture-cued round. |
| 2 | Sounds at the *end* of the name (f = "eff", m = "em") harder than at the start (b = "bee") | https://www.sciencedirect.com/science/article/abs/pii/S0022096504000360 | Order items: name-initial letters first. |
| — | Locale: letter-name/sound mismatches are language-specific; each locale's letter set and confusable pairs must be supplied separately (the English "y/w" issue does not exist in de/es/fi). | — | Specs keep letter content in a per-locale table, not in shared code. |

#### L3. Short vowels

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | /e/ ↔ /i/ confusion (pen/pin), /a/ ↔ /o/ | https://www.thedyslexiaclassroom.com/blog/top-tips-for-clearing-up-sound-confusions ; Treiman spelling of vowels https://link.springer.com/article/10.1007/s11145-012-9377-4 | Minimal-pair picture choice (pen vs pin) with the vowel highlighted. |
| 2 | Vowel omitted altogether in early spelling ("bt" for bat) | Invented spelling review https://www.researchgate.net/publication/286032057_A_retrospective_on_invented_spelling_and_a_look_forward | Sound boxes with a mandatory middle box. |

#### L4. Blending and segmenting

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Says each sound but cannot synthesise ("c-a-t … dog?") — phonemic awareness / working-memory issue | https://www.doe.mass.edu/massliteracy/reading-difficulties/phonics-decoding.html ; https://pld-literacy.org/continuous-or-discontinuous-blending-for-early-readers-what-does-the-evidence-say/ | *Connected* (continuous) phonation: sounds slide together with no gap. Game: the letters physically slide together as the tone glides. |
| 2 | Omits the nasal/liquid in clusters ("sink" → "sik", "pilt" → "pit") — treats it as part of the vowel | Treiman https://pubmed.ncbi.nlm.nih.gov/7758269/ | Extra sound box appears for the cluster; count sounds before spelling. |
| 3 | Segments into onset-rime, not phonemes (c-at) | Treiman 1985 https://onlinelibrary.wiley.com/doi/10.1002/cd.23219852703 | Accept onset-rime at level 1 (5-6), require phonemes at level 2+. |
| 4 | Digraphs split into two sounds (sh → /s/+/h/) | https://readinguniverse.org/skill-explainer/phonics-patterns/consonant-digraphs-skill-explainer/overview-of-consonant-digraphs | Digraph tile is one physical tile that cannot be split. |
| — | Locale: digraph inventories differ (English sh/ch/th; German sch/ch; Dutch oe/ij; Finnish nearly none). Per-locale tile tables. | — | — |

#### L5. Sight words / decoding strategy

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Guesses from first letter + picture (three-cueing habit) | https://www.thereadingleague.org/wp-content/uploads/2018/09/3-Cueing-Systems-Hempenstall-2006.pdf ; https://www.edweek.org/teaching-learning/is-this-the-end-of-three-cueing/2020/12 | Never place a helpful picture next to a word to be decoded; distractors share the first letter (cat/can/cap) so guessing fails informatively. |
| 2 | Reads the word as a picture (logographic), fails on new font/case | Ehri partial-alphabetic phase https://www.95percentgroup.com/insights/the-stages-of-literacy-development-a-complete-guide/ | Vary case and font across items. |

#### L6. Rhyme and syllables

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Can detect rhyme before producing it; production much later | https://pubs.asha.org/doi/pdf/10.1044/cicsd_30_S_41 ; https://www.researchgate.net/publication/334530206_Creation_of_rhymes_as_part_of_the_development_of_phonemic_awareness_of_preschool_children | 5-6: odd-one-out rhyme detection; production only at 6-8. |
| 2 | Matches on first sound or meaning instead of rhyme (cat–cow, cat–dog) | Same | Distractors include a same-onset word and a semantically related word; feedback highlights the rime. |
| 3 | Syllable counting: ~50% of 4-year-olds, most by 5; fast-speech elision ("choc-late") and losing the clap count | https://www.95percentgroup.com/insights/syllable-awareness-guide/ ; https://www.newcastlespeechpathology.com.au/post/counting-syllables-phonological-awareness-skills | Tap-a-drum per syllable with visible tokens; slow model playback. |
| — | Locale: syllable conventions and rhyme richness vary by language (Finnish/Spanish transparent, English opaque; Nordic compound seams). Per-locale word lists must be native-authored. | — | — |

#### L7. Spelling

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Phonetic spelling ("wuns" for once) — expected in partial/full alphabetic phases | Ehri via https://www.95percentgroup.com/insights/the-stages-of-literacy-development-a-complete-guide/ ; stage-likeness https://link.springer.com/article/10.1023/A:1007903330463 | Accept as evidence of phoneme awareness; feedback shows the conventional pattern on the same sound boxes. |
| 2 | Silent-e omitted or misplaced (bak / bakee) | Same stage literature | Magic-e tile that visibly changes the vowel sound (a → ā) when dropped on. |
| 3 | Doubling: final doublets easier than initial; children drop or misplace doubles | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3790077/ | Doubling introduced at 8-9 only. |
| 4 | Vowel spelling depends on instruction and context | https://link.springer.com/article/10.1007/s11145-012-9377-4 | Locale-specific rule sets. |

#### L8. Sentences, capitals, punctuation

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Cannot find sentence boundaries (runs sentences together; full stop at line end) | https://learningspy.co.uk/writing/capital-letter-problem-part-1/ | Reassemble cut-up sentences; boundary shown as a gap that must be closed with a stop. |
| 2 | Knows the rule but does not apply it in own writing (application, not knowledge) | same | Practise on *others'* sentences (editing) — the game is a proofreading task. |
| 3 | Capitals mid-word / random capitals; capital letters treated as decoration | https://primaryenglished.co.uk/blog/quick-tips-for-grammar-capital-letters-and-full-stops | Two-option toggle at sentence start only. |
| 4 | Punctuation-awareness predicts comprehension | https://www.sciencedirect.com/science/article/pii/S095947522300049X | Justifies the objective at 6-8. |
| 5 | Exclamation marks used playfully / over-used | https://www.tandfonline.com/doi/full/10.1080/09500782.2026.2642690 | Not an error to punish at this age. |
| — | Locale: word order and sentence-building differ (V2 in de/nl/sv/da/no; verb-final subordinate in de; freer order in fi). Sentence-order games need per-locale sentence sets, not translated English. | — | — |

#### L9. Comprehension

| # | Error | Source | Game response |
|---|---|---|---|
| 1 | Literal recall fine, inference poor; 6-year-olds more accurate on literal than inferential | https://www.tandfonline.com/doi/full/10.1080/0163853X.2023.2225980 ; Oakhill & Cain https://link.springer.com/article/10.1023/A:1008084120205 | Inference items need ≥ 2-3 clues visible; picture-supported. |
| 2 | Poor comprehenders make fewer inferences and don't integrate across sentences | https://onlit.org/wp-content/uploads/2023/08/Oakhill-Cain-Supporting-Reading-Comprehension-Development.pdf | Feedback highlights the two sentences that together give the answer. |
| 3 | Sequencing: orders by salience, not by story time | Same literature | Picture-sequence games with cause→effect arrows as feedback. |

### SCIENCE (light)

| Concept | Error | Source | Game response |
|---|---|---|---|
| Living / non-living | "If it moves it's alive" (wind, cars alive; plants, seeds not alive) | https://www.tandfonline.com/doi/pdf/10.1080/02635140120046240 ; animism https://www.researchgate.net/publication/374663433_Animism_in_Childhood_Thinking_A_New_Look_at_an_Old_Question | Sort by *needs* (food/water/growth/reproduce) with icons, not by movement; include plants and a moving non-living distractor from level 1. |
| Plants | Plants get food from the soil; seeds "eat" soil; fruit/vegetables/trees not plants | https://pmc.ncbi.nlm.nih.gov/articles/PMC5524439/ ; https://www.littlegreenthumbs.org/2018/05/07/grow-understanding-common-plant-misconceptions/ | Plant-needs game: sun + water + air; soil shown as *support*, not food. |
| Animal classification | Only large land mammals are "animals"; insects, worms, fish, birds excluded; anything in water is a "fish"; whales are fish | https://www.mossvalleyacademy.uk/documents/teaching-and-learning/curriculum/common-misconceptions-in-science.pdf ; https://www.homeofbob.com/science/concepts/physicalLife/lifeScienceConceptsAll.html | Sort by observable features (legs, feathers, fur, fins) at 5-8; whale/bat/penguin as deliberate level-3 items. |
| Day / night | Sun "goes away" / moves around Earth; 40% of 6th graders still wrong | https://beyondpenguins.ehe.osu.edu/issue/polar-patterns-day-night-and-seasons/common-misconceptions-about-day-and-night-seasons | 5-8: sequence day events only; rotation model only at 8-9 with a spinning globe. |
| Seasons / weather | Winter = Earth farther from sun (71% of 9-10-year-olds); seasons same everywhere | Same; NSTA list https://static.nsta.org/connections/elementaryschool/201209appropriatetopics-elementarystudentsciencemisconceptions.pdf | 5-9: seasons as observable patterns (clothes, trees, temperature); no causal astronomy. Locale: seasons are reversed in southern Brazil and mild in the tropics — never use snow as the only winter cue. |
| Materials | Object confused with material ("rock", "spoon" as materials); all plastic has one property; melting/boiling understood only for water | https://www.tandfonline.com/doi/pdf/10.1080/02635140120046240 ; https://www.thenational.academy/teachers/programmes/science-primary-ks1/units/everyday-materials/lessons/everyday-objects-and-materials | Sort the *same object* made of different materials (wooden/metal/plastic spoon); property tests (bends, floats, transparent). |

---

## Footer — confidence and gaps

| Section | Confidence | Notes |
|---|---|---|
| 1 Retrieval practice | ★★★ | Preschool boundary conditions are well specified (Fazio & Marsh; Káldi 2025). |
| 2 Spacing | ★★★ overall / ★★ within-session for 5-7 | Expanding-lag evidence in preschoolers is from toy-name learning; the Leonard 2024 convergence caveat means within-session spacing may be less powerful than it first looks. |
| 3 CLT | ★★★ direction / ★★ magnitudes at 5-9 | Meta-analyses are dominated by older learners; no K-3-specific seductive-details meta-analysis found. |
| 4 Feedback | ★★★ | Van der Kleij's "primary school smaller effects" moderator deserves care: elaborated feedback must be non-verbal for pre-readers. |
| 5 Rewards | ★★★ undermining / ★★ gamification in K-3 | Camp disagreement is documented; both camps agree on the harmful case. Gamification K-3 metas are few and quality-mixed. |
| 6 Timers / competition | ★★ | The causal "timed tests → anxiety" claim is weaker than commonly stated; the design conclusion (no visible timers) still follows from WM/anxiety and reward evidence. |
| 7 Adaptive / 85% | ★★ | The 85% figure is a machine-learning derivation; treat as a heuristic consistent with child data, not a law. |
| 8 Error handling | ★★ | Mindset *interventions* weak; praise-wording and task-level feedback findings solid. |
| 9 Games evidence | ★★ | Effects small-moderate and heterogeneous; two flagship RCTs (Bedtime Math, Khan Kids) are contested or tiny. |
| 10 Touch | ★★★ | Consistent across HCI studies and platform guidelines. |
| Maths misconceptions | ★★★ counting / equals / place value / subtraction bugs / shapes / measurement / patterns; ★★ time, money, data, skip counting | Time/money/data rely partly on practitioner sources. |
| Literacy misconceptions | ★★★ reversals, letter names, clusters, three-cueing; ★★ rhyme, syllables, spelling stages; ★ punctuation | Punctuation development has little empirical work (noted by the BERJ / Language & Education papers). All literacy items are English-derived and need per-locale native re-derivation. |
| Science misconceptions | ★★ | Mostly review / practitioner catalogues; ages often 9-12 rather than 5-9. |

**Gaps to flag in ASSUMPTIONS.md.**
1. No study measured within-session expanding re-queue rules in a 5-7-minute *digital* game for 5-9; the lag schedule in §2 is transferred from preschool word-learning.
2. No child-specific evidence for the exact 44/64 px numbers beyond NN/g's 2 cm guidance and the error-doubling with smaller targets; the brief's thresholds are conservative and consistent with them.
3. Locale-specific misconceptions (German inverted number words, Nordic half-hour idioms, per-language digraphs and letter-name interference, southern-hemisphere seasons) are noted where found but were not systematically researched per language.
4. The adaptation rule (3-up / 2-down) is a design choice consistent with the 80-90% success target, not a tested algorithm.
5. Cross-session spacing cannot be implemented without state; treated as a catalogue-level property.
6. Fetch of the Káldi 2025 full text was blocked (403); its retrieval-success finding is taken from the abstract via search summary.
