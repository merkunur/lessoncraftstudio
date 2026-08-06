// Combined locale templates - merges part1 (de, fr, es, pt, it) and part2 (nl, sv, da, no, fi)
const part1 = require("./locale-templates-part1");
const part2 = require("./locale-templates-part2");

module.exports = { ...part1, ...part2 };
