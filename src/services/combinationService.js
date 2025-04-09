const { collectGroups } = require("../utils/helpers");

const createItemNames = (itemCounts) => {
  const items = [];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < itemCounts.length; i++) {
    const letter = letters[i];
    for (let j = 1; j <= itemCounts[i]; j++) {
      items.push(`${letter}${j}`);
    }
  }
  return items;
}

function findValidCombinations(items, targetLength) {
  const result = [];
  const currentCombination = [];
  const usedFirstLetters = new Set();

  collectGroups(0, items, targetLength, currentCombination, usedFirstLetters, result);

  return result;
}

module.exports = {
  createItemNames,
  findValidCombinations,
};
