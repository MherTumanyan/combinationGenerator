function getFirstLetterOfItem(itemName) {
  return itemName[0];
}

function collectGroups(startIndex, itemList, groupSize, groupInProgress, usedLetters, allGroups) {
  if (groupInProgress.length === groupSize) {
    allGroups.push([...groupInProgress]);
    return;
  }

  for (let i = startIndex; i < itemList.length; i++) {
    const item = itemList[i];
    const letter = getFirstLetterOfItem(item);

    if (usedLetters.has(letter)) continue;

    groupInProgress.push(item);
    usedLetters.add(letter);

    collectGroups(i + 1, itemList, groupSize, groupInProgress, usedLetters, allGroups);
    groupInProgress.pop();
    usedLetters.delete(letter);
  }
}

module.exports = {
  collectGroups,
};
