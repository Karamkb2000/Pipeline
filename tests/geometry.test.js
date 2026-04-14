const {
  circleArea,
  circlePerimeter,
  rectangleArea,
  rectanglePerimeter,
  triangleArea,
} = require('../src/geometry');

describe('geometry', () => {
  describe('circleArea()', () => {
    test('calculates area for radius 1', () => {
      expect(circleArea(1)).toBeCloseTo(Math.PI);
    });

    test('calculates area for radius 5', () => {
      expect(circleArea(5)).toBeCloseTo(78.539);
    });

    test('area is 0 for radius 0', () => {
      expect(circleArea(0)).toBe(0);
    });

    test('throws for negative radius', () => {
      expect(() => circleArea(-1)).toThrow('Radius must be a non-negative number');
    });
  });

  describe('circlePerimeter()', () => {
    test('calculates circumference for radius 1', () => {
      expect(circlePerimeter(1)).toBeCloseTo(2 * Math.PI);
    });

    test('calculates circumference for radius 7', () => {
      expect(circlePerimeter(7)).toBeCloseTo(43.982);
    });

    test('throws for negative radius', () => {
      expect(() => circlePerimeter(-2)).toThrow('Radius must be a non-negative number');
    });
  });

  describe('rectangleArea()', () => {
    test('calculates area for a 4x5 rectangle', () => {
      expect(rectangleArea(4, 5)).toBe(20);
    });

    test('area is 0 when one side is 0', () => {
      expect(rectangleArea(0, 10)).toBe(0);
    });

    test('throws for negative width', () => {
      expect(() => rectangleArea(-3, 5)).toThrow(
        'Width and height must be non-negative numbers'
      );
    });

    test('throws for negative height', () => {
      expect(() => rectangleArea(3, -5)).toThrow(
        'Width and height must be non-negative numbers'
      );
    });
  });

  describe('rectanglePerimeter()', () => {
    test('calculates perimeter for a 4x5 rectangle', () => {
      expect(rectanglePerimeter(4, 5)).toBe(18);
    });

    test('calculates perimeter for a square', () => {
      expect(rectanglePerimeter(6, 6)).toBe(24);
    });
  });

  describe('triangleArea()', () => {
    test('calculates area for base 6 height 4', () => {
      expect(triangleArea(6, 4)).toBe(12);
    });

    test('area is 0 when base is 0', () => {
      expect(triangleArea(0, 10)).toBe(0);
    });

    test('throws for negative base', () => {
      expect(() => triangleArea(-1, 5)).toThrow(
        'Base and height must be non-negative numbers'
      );
    });
  });
});
