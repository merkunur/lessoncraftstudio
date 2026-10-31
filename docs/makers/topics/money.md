# Maker: Money (`money`)

Group **math** · language need **little** · 14 existing templates + 3 new · replaces old app(s): —

## Settings a teacher sets

- currency follows the language (en-US $, es-MX $, pt-BR R$, € for de/fr/it/nl/fi, kr DKK/SEK/NOK)
- coins only / coins + notes
- max amount
- task: count / compare / shop / change
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Locale conventions (en = American English, es = Mexican Spanish, pt = Brazilian Portuguese)

- en-US: cents and dollars, $1.25 notation
- pt-BR: R$ 1,25
- es-MX: $1.25 (peso, dot decimal)
- Nordic: kr with comma

## Templates from today's worksheet types

**Count coins in a purse (one kind, two kinds, all coins) and compare two purses**

- `G1-211` Counting Coins — Count the coins in each purse. Write the total amount in the box. · screen version (scripts/worksheet-gen/types/g1/G1-211-counting-coins.js)
- `G1-228` Counting Coins: First Steps — Count the coins in each purse. Write the total amount in the box. · screen version (scripts/worksheet-gen/types/g1/G1-228-counting-coins-first-steps.js)
- `G1-229` Counting Money: All the Coins — Count the coins in each purse. Write the total amount in the box. · screen version (scripts/worksheet-gen/types/g1/G1-229-counting-money-all-coins.js)
- `G1-230` Coin Counting Practice — Count the coins in each purse. Write the total amount in the box. · screen version (scripts/worksheet-gen/types/g1/G1-230-coin-counting-practice.js)
- `G1-231` Two-Coin Counting — Count the coins in each purse. Write the total amount in the box. · screen version (scripts/worksheet-gen/types/g1/G1-231-two-coin-counting.js)
- `G1-232` Which Purse Has More? — Count the money in both purses. Circle the purse that has more. · screen version (scripts/worksheet-gen/types/g1/G1-232-which-purse-has-more.js)

**Add up shelf prices, decide whether there is enough money, find how much more, and make change**

- `G2-276` Shopping Math — Find each thing on the shelf and read its price. Then answer the questions about the money. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-276-shopping-math.js)
- `G2-289` Shopping Math: Two Stories — Read each story and use the shelf prices to answer it. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-289-shopping-math-two-stories.js)
- `G2-290` Shopping Math: Four Questions — Four cards, four different shopping questions to answer. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-290-shopping-math-four-questions.js)
- `G2-291` Shopping Math: Add Up the Basket — Every card asks for a total. Add the prices together. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-291-shopping-math-add-up-the-basket.js)
- `G2-292` Shopping Math: Buying Three Things — Each basket holds three things. Add all three prices. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-292-shopping-math-three-things.js)
- `G2-293` Shopping Math: How Much Change? — Count the coins paid, then work out the change. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-293-shopping-math-how-much-change.js)
- `G2-294` Shopping Math: Is There Enough Money? — Compare the money with the price. Circle yes or no, then write the total. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-294-shopping-math-is-there-enough-money.js)
- `G2-295` Shopping Math: How Much More? — Compare two prices and work out the difference between them. · screen version · picture themes (scripts/worksheet-gen/types/g2/G2-295-shopping-math-how-much-more.js)

## New templates to add

- **Make the amount: draw coins to pay** — producing an amount is missing
- **Fewest coins** — efficiency strategy
- **Price tags shop to cut out (classroom shop)** — role-play material

## FABLE-QUESTIONS (answered before the build)

1. [money-Q1] Coin pictures: are realistic coin images per currency allowed (copyright / counterfeit rules for $ , R$, MX$, €, kr) or must they stay drawn tokens? data/money/currencies.js and primitives/coins.js decide today — confirm the rule and the es-MX and pt-BR denominations.
