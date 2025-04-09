const comboService = require('../src/services/combinationService');

describe('Combination Service', () => {
  describe('createItemNames', () => {
    test('should convert item counts to named items', () => {
      const result1 = comboService.createItemNames([1, 2, 1]);
      expect(result1).toEqual(['A1', 'B1', 'B2', 'C1']);

      const result2 = comboService.createItemNames([3, 1]);
      expect(result2).toEqual(['A1', 'A2', 'A3', 'B1']);

      const result3 = comboService.createItemNames([]);
      expect(result3).toEqual([]);
    });
  });

  describe('findValidCombinations', () => {
    test('should generate valid combinations respecting prefix rule', () => {
      const items1 = ['A1', 'B1', 'B2', 'C1'];
      const result1 = comboService.findValidCombinations(items1, 2);

      const expected1 = [
        ['A1', 'B1'],
        ['A1', 'B2'],
        ['A1', 'C1'],
        ['B1', 'C1'],
        ['B2', 'C1'],
      ];

      expect(result1).toHaveLength(expected1.length);

      for (const combo of expected1) {
        expect(result1).toContainEqual(combo);
      }

      const items2 = ['A1', 'B1', 'C1'];
      const result2 = comboService.findValidCombinations(items2, 3);
      expect(result2).toEqual([items2]);

      const result3 = comboService.findValidCombinations(items1, 0);
      expect(result3).toEqual([[]]);

      const result4 = comboService.findValidCombinations(items1, 5);
      expect(result4).toEqual([]);
    });

    test('should not combine items with same letter', () => {
      const items = ['A1', 'A2', 'B1', 'C1'];
      const result = comboService.findValidCombinations(items, 2);

      const invalidCombos = [['A1', 'A2']];

      for (const combo of invalidCombos) {
        expect(result).not.toContainEqual(combo);
      }
    });
  });
});
