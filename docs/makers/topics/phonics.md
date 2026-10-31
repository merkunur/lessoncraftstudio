# Maker: Phonics & Sounds (`phonics`)

Group **literacy** · language need **bound** · 18 existing templates + 2 new · replaces old app(s): —

## Settings a teacher sets

- skill: beginning / ending / middle sound / count syllables / sound boxes / blending / digraphs
- letters or teams
- pictures
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Templates from today's worksheet types

**Identify and sort by the beginning sound (letter of the week, m or n)**

- `K-221` Beginning Sounds — Write the letter that each picture begins with. (scripts/worksheet-gen/types/k/K-221-beginning-sounds.js)
- `K-228` Sort by Beginning Sound — Draw a line from each picture to the letter it begins with. (scripts/worksheet-gen/types/k/K-228-sort-by-beginning-sound.js)

**Hear a sound at the beginning, middle or end; ending sounds; the middle vowel**

- `K-226` Ending Sounds — Write the letter that each picture ends with. (scripts/worksheet-gen/types/k/K-226-ending-sounds.js)
- `K-227` Middle Sounds — Write the vowel you hear in the middle of each word. (scripts/worksheet-gen/types/k/K-227-middle-sounds.js)

**Count the syllables in a word; sort pictures by syllable count**

- `K-233` Count the Syllables — Write how many syllables you hear in each word. (scripts/worksheet-gen/types/k/K-233-syllable-count.js)
- `K-234` Sort by Syllables — Draw a line from each picture to its number of syllables. (scripts/worksheet-gen/types/k/K-234-syllable-sort.js)

**Segment a word into its sounds — one sound per box, count the sounds, two letters for one sound share one box**

- `K-318` Sound Boxes — Say the picture word slowly. Write one sound in each box. A wide box with a curve under it holds two letters that make one sound. · screen version · picture themes (scripts/worksheet-gen/types/k/K-318-sound-boxes.js)
- `K-329` Count the Sounds — Say the picture word slowly. Draw one dot in the long box for every sound you hear. Then write how many sounds in the small box. · screen version · picture themes (scripts/worksheet-gen/types/k/K-329-sound-boxes-count-the-sounds.js)
- `K-330` First Sound Given — The first sound is written for you. Say the picture word slowly and write one sound in each empty box. A wide box holds two letters for one sound. · screen version · picture themes (scripts/worksheet-gen/types/k/K-330-sound-boxes-first-sound-given.js)

**Hear the digraph (sh / ch) at the start of a word**

- `K-378` Digraph Sort for Kindergarten: sh or ch — Say each picture's name. Draw a line from each picture to the letter team you hear. · screen version (scripts/worksheet-gen/types/k/K-378-digraphs-sort-by-letter-team.js)

**Segment a word into its sounds (sound boxes) and blend sounds into a word**

- `G1-312` Sound Strip: How Many Sounds? — Say the word slowly. Write one sound in each box, starting from the left. Leave the boxes you do not need empty. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-312-sound-boxes-sound-strip.js)
- `G1-314` Blend the Sounds — Read the sounds in the boxes and blend them into a word. Circle the picture that matches the word. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-314-sound-boxes-blend-the-sounds.js)

**Clap and split words into syllables, missing syllable, syllable scramble, 2 or 3 syllables, syllable cards**

- `G1-313` Syllables and Sounds — Clap the syllables of the picture word. Then say each syllable slowly and write one sound in each box under its arc. · screen version · picture themes (scripts/worksheet-gen/types/g1/G1-313-sound-boxes-syllables-and-sounds.js)

**Consonant digraphs sh/ch/th: hear the letter team, write it, read and match, where in the word; sound of the week**

- `G1-380` Digraphs sh, ch and th: Which Letter Team Do You Hear? — Say the name of each picture. Circle the letter team you hear. · screen version (scripts/worksheet-gen/types/g1/G1-380-digraphs.js)
- `G1-392` Missing Digraphs: Write sh, ch or th — Say each picture word. Write the missing letter team from the top in the dashed space. · screen version (scripts/worksheet-gen/types/g1/G1-392-digraphs-write-the-missing-letter-team.js)
- `G1-393` Read Digraph Words and Match the Pictures — Read each word. The letter team is marked. Draw a line to the picture the word names. · screen version (scripts/worksheet-gen/types/g1/G1-393-digraphs-read-and-match.js)
- `G1-394` Where Is the Digraph? sh, ch and th in the Word — Say each picture word. Where do you hear the letter team? Color one space: beginning, middle or end. · screen version (scripts/worksheet-gen/types/g1/G1-394-digraphs-where-is-the-letter-team.js)

**Find and count a digraph (sh) in sentences**

- `G2-372` Digraphs in Sentences: Circle and Count sh — Read the sentences. Circle every sh. Write how many you found in each sentence in its box. · screen version (scripts/worksheet-gen/types/g2/G2-372-digraphs-in-sentences.js)

## New templates to add

- **Beginning sound clip cards to cut** — hands-on
- **Blends (bl, st, tr …) per language** — a step after digraphs

## FABLE-QUESTIONS (answered before the build)

1. [phonics-Q1] Phonics data is per locale and sound-based (vocabulary-phonics.json, the approved-words safety pipeline). Teacher-typed words cannot be verified for sounds. Decide: phonics makers use reviewed banks only, with no custom words?
