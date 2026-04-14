/**
 * index.js
 * Public API — re-exports all functions from every module.
 */

const arithmetic = require('./arithmetic');
const statistics = require('./statistics');
const geometry = require('./geometry');

module.exports = { ...arithmetic, ...statistics, ...geometry };
