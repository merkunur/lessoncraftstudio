/**
 * data/puzzles/blocklist.js — words a K-3 teacher must never find in a puzzle grid (2026-11-03, ENGINES Part 3 §A): sexual,
 * scatological and insulting words per language, in FOLDED form (lower case, accents stripped, ß → ss). Never displayed.
 * A grid is scanned against the UNION of the eleven lists in all eight directions (a Danish grid must not spell a
 * Swedish rude word; a word reads backwards as well), fillers and placed words alike (lib/puzzles/grid-fill.js).
 * An entry that sits INSIDE a placed word, in that word's own direction, is allowed (the innocent «glass», «conejo»): only
 * a rude word that uses filler cells or crosses two words is refused (redrawn). Grown by the B7 native review (2026-11-03);
 * an innocent word on a list (sv rova, pt coco, da kat …) costs only a redraw — never a placed word, never a message.
 */
'use strict';
const BLOCKLIST = {
  en: 'fuck fuk shit sht cunt dick cock prick twat piss pee poo poop crap arse ass butt boob tit tits wank slut whore hoe fag gay nigger nigga retard dumb idiot stupid kill sex porn nude damn hell bitch bastard turd fart puke rape pussy penis cum suck dildo homo nazi spic chink kike',
  de: 'fick ficken scheisse scheiss kacke pisse arsch arschloch titte titten muschi fotze pimmel schwanz hure nutte schlampe wichser wixer depp idiot blod doof schwuchtel neger nazi furz kotz sau mose bumsen spast behindert kanake zigeuner penis porno popo pups',
  fr: 'merde putain pute salope connard conne con cul bite zizi chatte nichon couille enculer encule nique niquer batard pede negre caca pipi prout chier crotte sexe porno zob teub foutre bordel salaud nazi',
  es: 'puta puto pinche cabron cabrona pendejo pendeja verga chingar chinga mierda culo coño cono pene pito teta tetas joto marica maricon idiota estupido caca pedo cagar mamar naco culero ojete mamon panocha chichis chingada sexo porno',
  pt: 'porra caralho merda puta puto buceta boceta piroca pinto cuzao bosta foder foda viado bicha otario idiota caca coco peido mijo xixi xoxota xereca babaca punheta cacete rola sexo porno',
  it: 'cazzo merda culo puttana troia stronzo stronza figa fica minchia vaffanculo coglione cacca pipi scemo idiota frocio negro tetta tette bastardo zoccola fottere pene sesso porno ricchione suca',
  nl: 'kut lul pik kak poep shit fuck tering kanker hoer slet klootzak eikel teef homo neger mongool tiet tieten pis pies scheet neuken neuk flikker tyfus debiel piemel kont seks',
  sv: 'fan javla javel kuk fitta skit bajs kiss piss hora slyna rov rova pung neger bog idiot mongo knulla knull satan helvete snopp porr kat',
  da: 'fanden fuck pik fisse lort tis pis prut rov ludder kusse luder idiot neger bosse kneppe pule satan helvede fandme skid spasser perker patter tissemand',
  no: 'faen fitte kuk pikk dritt tiss piss promp rompe hore ludder kukk neger homo idiot knulle pule satan helvete jaevel homse pakkis svarting pupp kodd fokk',
  fi: 'vittu perkele saatana paska kusi kakka pissa pieru perse kyrpa huora homo neekeri idiootti hintti mulkku vitun paskiainen kusipaa pillu tissit nussia runkkari ryssa mamu seksi',
};
module.exports = { BLOCKLIST };
