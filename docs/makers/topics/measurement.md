# Maker: Measurement & Size (`measurement`)

Group **math** · language need **little** · 20 existing templates + 3 new · replaces old app(s): `big-small`

## Settings a teacher sets

- attribute: size / height / length / weight / capacity / temperature
- task: compare 2 / order 3-5 / measure with units / read scales
- units: non-standard / customary (en-US) / metric
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Locale conventions (en = American English, es = Mexican Spanish, pt = Brazilian Portuguese)

- en-US: inches, feet, pounds, cups, °F alongside metric where the grade uses it; all others metric only

## Templates from today's worksheet types

**Find the biggest / tallest / longest (and all the big ones) in a row, incl. shapes**

- `K-032` Big and Small — Circle the BIGGEST one in each row. · picture themes (scripts/worksheet-gen/types/k/K-032-biggest-and-smallest.js)
- `K-035` Tall and Short — Circle the TALLEST one in each row. · picture themes (scripts/worksheet-gen/types/k/K-035-tallest-and-shortest.js)
- `K-037` Long and Short — Circle the LONGEST one in each row. · picture themes (scripts/worksheet-gen/types/k/K-037-longest-and-shortest.js)
- `K-040` Big Ones Only — Circle every BIG picture. Leave the small ones alone. · picture themes (scripts/worksheet-gen/types/k/K-040-circle-all-big.js)
- `K-079` Big Shapes, Small Shapes — Circle the BIGGEST shape in each row. (scripts/worksheet-gen/types/k/K-079-big-small-shapes.js)

**Seriate 3–5 pictures by size or height (smallest → biggest, shortest → tallest)**

- `K-033` Small, Medium, Big — Number the pictures from 1 (smallest) to 3 (biggest). · picture themes (scripts/worksheet-gen/types/k/K-033-order-by-size.js)
- `K-034` Smallest to Biggest — Number the pictures from 1 (smallest) to 5 (biggest). · picture themes (scripts/worksheet-gen/types/k/K-034-order-by-size-5.js)
- `K-036` Short to Tall — Number the pictures from 1 (shortest) to 4 (tallest). · picture themes (scripts/worksheet-gen/types/k/K-036-order-by-height.js)

**Compare weight: which is heavier / lighter, knowing that bigger is not always heavier**

- `K-038` Heavy or Light? — Think about real life! Circle the HEAVIER one. · screen version · picture themes (scripts/worksheet-gen/types/k/K-038-heavier-or-lighter.js)

**Measure length with unit cubes/squares and order three objects by length**

- `G1-139` Cube by Cube — Each object sits on unit squares. Count them and write the length. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-139-measure-with-cubes.js)
- `G1-140` Short to Long — Measure each object with its squares. Number them 1 (shortest) to 3 (longest). · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-140-order-by-length.js)

**Measure an object with a ruler starting at 0**

- `G2-235` Measure It! — Each object starts at 0. Read the ruler and write how many units long it is. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-235-measure-with-ruler.js)

**Measure two objects and find how much longer**

- `G2-236` How Much Longer? — Measure both objects. Write how many units longer one is. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-236-compare-lengths.js)

**Read mass in grams on a balance with weights and on a scale with small steps (incl. the mixed jug + scale sheets)**

- `G2-252` Measuring Jugs and Scales — Read each measuring jug and balance scale. Write the amount with its unit. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-252-capacity-mass.js)
- `G2-261` Balance Scales in Grams — Look at the weights on each scale. Write how many grams the object weighs. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-261-balance-scales-grams.js)
- `G2-262` Reading Scales: Small Steps — Read each measuring jug and balance scale. Write the amount with its unit. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-262-reading-scales-fine-marks.js)

**Read the liquid in a measuring jug in millilitres (to 1000 and 2000 ml)**

- `G2-260` Reading Measuring Jugs — Read the scale on each jug. Write how many milliliters are inside. · screen version (scripts/worksheet-gen/types/g2/G2-260-reading-measuring-jugs.js)
- `G2-263` Measuring Jugs to 2000 ml — Read the scale on each jug. Write how many milliliters are inside. · screen version (scripts/worksheet-gen/types/g2/G2-263-measuring-jugs-to-2000.js)

**Read a thermometer whose scale counts by 2, 5 or 10**

- `G3-345` Hot or Cold? — Read each thermometer. Write the temperature it shows. · screen version (scripts/worksheet-gen/types/g3/G3-345-read-thermometer.js)

**Count unit cubes in a solid, including hidden ones (volume)**

- `G3-346` Cube Towers — Count all the cubes in each tower. Write the total. · screen version (scripts/worksheet-gen/types/g3/G3-346-volume-unit-cubes.js)

## New templates to add

- **Order by size (the screenshot sheet, 3 sizes of the same picture)** — exists for 3-5 pictures; add the boxed 6-row layout
- **Measure with paper clips / cubes** — non-standard units, K-1
- **Ruler to cut out** — manipulative

## FABLE-QUESTIONS (answered before the build)

1. [measurement-Q1] en-US needs customary units (inches, pounds, °F) while the existing generator is metric. Decide unit systems per locale and whether rulers/scales/thermometers need a customary variant in the primitives.
