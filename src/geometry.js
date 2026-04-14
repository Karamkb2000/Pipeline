/**
 * geometry.js
 * Area and perimeter calculations for common shapes.
 */

function circleArea(radius) {
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  return Math.PI * radius * radius;
}

function circlePerimeter(radius) {
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  return 2 * Math.PI * radius;
}

function rectangleArea(width, height) {
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be non-negative numbers');
  }
  return width * height;
}

function rectanglePerimeter(width, height) {
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be non-negative numbers');
  }
  return 2 * (width + height);
}

function triangleArea(base, height) {
  if (base < 0 || height < 0) {
    throw new Error('Base and height must be non-negative numbers');
  }
  return 0.5 * base * height;
}

module.exports = {
  circleArea,
  circlePerimeter,
  rectangleArea,
  rectanglePerimeter,
  triangleArea,
};
