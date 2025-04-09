const combinationService = require('../services/combinationService');
const { saveResponse } = require('../models/response');

const handleCombinationRequest = async (req, res) => {
  const { items: itemCounts, length: groupSize } = req.body;

  const isValidInput =
    Array.isArray(itemCounts) && Number.isInteger(groupSize) && groupSize > 0;

  if (!isValidInput) {
    return res.status(400).json({
      error: 'Please provide array of items and a length.',
    });
  }

  try {
    const allItemNames = combinationService.createItemNames(itemCounts);
    const matchingGroups = combinationService.findValidCombinations(
      allItemNames,
      groupSize
    );

    const savedId = await saveResponse(
      itemCounts,
      groupSize,
      allItemNames,
      matchingGroups
    );

    res.json({
      id: savedId,
      combination: matchingGroups,
    });
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

module.exports = {
  handleCombinationRequest,
};
