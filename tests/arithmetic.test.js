const { add, subtract, multiply, divide } = require('../src/arithmetic');

describe('arithmetic', () => {
  describe('add()', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds a positive and a negative number', () => {
      expect(add(10, -4)).toBe(6);
    });

    test('adds two negative numbers', () => {
      expect(add(-3, -7)).toBe(-10);
    });

    test('adds zeros', () => {
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('subtract()', () => {
    test('subtracts two positive numbers', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('subtracts a larger number from a smaller one', () => {
      expect(subtract(3, 7)).toBe(-4);
    });

    test('subtracts zero', () => {
      expect(subtract(5, 0)).toBe(5);
    });
  });

  describe('multiply()', () => {
    test('multiplies two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test('multiplying by zero returns zero', () => {
      expect(multiply(99, 0)).toBe(0);
    });

    test('multiplies a positive and a negative number', () => {
      expect(multiply(5, -2)).toBe(-10);
    });

    test('multiplies two negative numbers', () => {
      expect(multiply(-3, -3)).toBe(9);
    });
  });

  describe('divide()', () => {
    test('divides two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('returns a decimal result', () => {
      expect(divide(7, 2)).toBe(3.5);
    });

    test('divides a negative number', () => {
      expect(divide(-12, 4)).toBe(-3);
    });

    test('throws an error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
    });
  });
});
