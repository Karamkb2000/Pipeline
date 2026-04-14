/**
 * statistics.js
 * Basic statistical calculations on arrays of numbers.
 */

function mean(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Input array must not be empty');
  }
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

function median(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Input array must not be empty');
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mode(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Input array must not be empty');
  }
  const frequency = {};
  numbers.forEach((n) => {
    frequency[n] = (frequency[n] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(frequency));
  return Object.keys(frequency)
    .filter((key) => frequency[key] === maxFreq)
    .map(Number);
}

function range(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Input array must not be empty');
  }
  return Math.max(...numbers) - Math.min(...numbers);
}

module.exports = { mean, median, mode, range };
