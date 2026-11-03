/**
 * types/_shared/characters.js — the pictures that can be a story CHARACTER (review 2026-11-02): an animal, a person or a
 * toy figure — something that can talk, like, live somewhere and feel. The Stories & Writing pages that give a picture a
 * voice or a personality (G1-507 comic strip, G1-509 describe the character, K-555 level 2 speech bubble) draw only from
 * these; a slide, a sandbox or a domino gives a child nothing to say. A theme without enough characters is left out of
 * that template in that language (the maker's per-language theme list).
 * The list is a literal (browser-safe): the vocabulary keys of the animal themes (animals, birds, birds 2, dinosaurs, farm
 * animals, forest creatures, insects and bugs, ocean life, pets, reptiles and amphibians, zoo animals — coral, seaweed,
 * oyster and scallop left out) and of occupations, plus the people, figures and animals of the mixed themes.
 */
'use strict';

const CHARACTERS = new Set((
  // animal themes + occupations
  'actor alligator allosaurus angelfish ankylosaurus ant antelope apatosaurus architect argentinosaurus armadillo artist ' +
  'astronaut athlete author badger baker ballerina barber bat bear beaver bee bison brachiosaurus brontosaurus bull ' +
  'butterfly calf camel canary cardinal carnotaurus carpenter cashier cat caterpillar centipede chameleon cheetah chef chick ' +
  'chicken chimpanzee chinchilla chipmunk clownfish coach cobra cockatiel cook cow crab crane cricket crow deer deinonychus ' +
  'detective dimetrodon diplodocus doctor dog dolphin donkey dove dragonfly duck duckling eagle earthworm elephant falcon ' +
  'farmer ferret finch firefighter firefly fish flamingo florist foal fox frog gardener gazelle gecko gerbil giganotosaurus ' +
  'giraffe goat goldfish goose gopher gorilla grasshopper hamster hawk hedgehog hen heron hippopotamus hornbill horse ' +
  'hummingbird hyena ichthyosaurus iguana iguanodon jaguar janitor jellyfish judge kangaroo kingfisher koala ladybug lamb ' +
  'lemur leopard librarian lion lizard llama macaw magpie maiasaura manatee mechanic meerkat millipede monkey moose ' +
  'mosasaurus mosquito mouse musician narwhal nurse octopus orangutan orca ostrich otter oviraptor owl ox pachycephalosaurus ' +
  'panda paramedic parasaurolophus parrot peacock pelican penguin pharmacist photographer pig pigeon pilot plesiosaurus ' +
  'porcupine pufferfish puffin quail rabbit raccoon ray reindeer rhinoceros robin rooster salamander seagull seal shark ' +
  'sheep shrimp singer sloth slug snail sparrow spider squid squirrel starfish stegosaurus stork styracosaurus swallow swan ' +
  'tailor teacher therizinosaurus tiger toad tortoise toucan triceratops tuna turkey turtle velociraptor veterinarian ' +
  'vulture waitress wasp weasel whale wolf woodpecker worm zebra ' +
  // people, figures and animals of the mixed themes (toys, christmas, beach, spring, things that fly, classroom …)
  'baby girl boy doll robot dinosaur angel elf rudolph santa snowman gingerbread nutcracker scarecrow dragon pegasus ' +
  'lifeguard student bunny bird beetle'
).split(' '));

/** True when the entry (entriesFor) is a picture that can be a story character. */
function isCharacter(e) { return !!(e && CHARACTERS.has(e.vocabKey)); }

module.exports = { isCharacter, CHARACTERS };
