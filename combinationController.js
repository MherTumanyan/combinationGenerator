const combinationService = require('../services/combinationService');
const { saveResponse } = require('../models/response');

async function generateCombinations(req, res) {
  const { items: itemCounts, length } = req.body;

  if (!Array.isArray(itemCounts) || !Number.isInteger(length) || length < 1) {
    return res.status(400).json({
      error:
        'Invalid input - expected an array of numbers and a positive integer length',
    });
  }

  try {
    const itemNames = combinationService.createItemNames(itemCounts);

    const combinations = combinationService.findValidCombinations(
      itemNames,
      length,
    );
    const responseId = await saveResponse(
      itemCounts,
      length,
      itemNames,
      combinations,
    );

    res.json({
      id: responseId,
      combination: combinations,
    });
  } catch (err) {
    console.error('Error generating combinations:', err);

    if (err.message === 'Database error') {
      return res.status(500).json({ error: 'Database operation failed' });
    }

    res.status(500).json({ error: 'Failed to generate combinations' });
  }
}

module.exports = {
  generateCombinations,
};
