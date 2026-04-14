const { mean, median, mode, range } = require('../src/statistics');

describe('statistics', () => {
  describe('mean()', () => {
    test('calculates the mean of positive numbers', () => {
      expect(mean([1, 2, 3, 4, 5])).toBe(3);
    });

    test('calculates the mean of a single-element array', () => {
      expect(mean([7])).toBe(7);
    });

    test('calculates the mean including negative numbers', () => {
      expect(mean([-5, 0, 5])).toBe(0);
    });

    test('throws on empty array', () => {
      expect(() => mean([])).toThrow('Input array must not be empty');
    });

    test('throws on null input', () => {
      expect(() => mean(null)).toThrow('Input array must not be empty');
    });
  });

  describe('median()', () => {
    test('returns middle value for odd-length array', () => {
      expect(median([3, 1, 2])).toBe(2);
    });

    test('returns average of two middle values for even-length array', () => {
      expect(median([4, 1, 3, 2])).toBe(2.5);
    });

    test('does not mutate the original array', () => {
      const input = [5, 3, 1];
      median(input);
      expect(input).toEqual([5, 3, 1]);
    });

    test('throws on empty array', () => {
      expect(() => median([])).toThrow('Input array must not be empty');
    });
  });

  describe('mode()', () => {
    test('returns the single most frequent value', () => {
      expect(mode([1, 2, 2, 3])).toEqual([2]);
    });

    test('returns multiple values when there is a tie', () => {
      const result = mode([1, 1, 2, 2, 3]);
      expect(result.sort()).toEqual([1, 2]);
    });

    test('returns all values when all are equally frequent', () => {
      const result = mode([1, 2, 3]).sort();
      expect(result).toEqual([1, 2, 3]);
    });

    test('throws on empty array', () => {
      expect(() => mode([])).toThrow('Input array must not be empty');
    });
  });

  describe('range()', () => {
    test('returns the difference between max and min', () => {
      expect(range([1, 5, 3, 9, 2])).toBe(8);
    });

    test('returns 0 for a single-element array', () => {
      expect(range([42])).toBe(0);
    });

    test('handles negative numbers', () => {
      expect(range([-10, -3, -1])).toBe(9);
    });

    test('throws on empty array', () => {
      expect(() => range([])).toThrow('Input array must not be empty');
    });
  });
});
