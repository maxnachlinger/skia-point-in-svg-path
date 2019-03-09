'use strict';

const contains = require('../');

describe('contains tests', () => {
  it('sanity checks input', () => {
    [[], [null, null, null], ['string', 'string', 'string']].forEach((input) => {
      expect(() => contains(...input)).toThrow()
    });
  });

  it('correctly identifies a point inside a path', () => {
    [{
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', { x: 100, y: 100 }],
      expected: true
    }, {
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', { x: 100.1, y: 100.1 }],
      expected: true
    }, {
      input: ['M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z', { x: 220, y: 100 }],
      expected: true
    }, {
      input: ['M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', { x: 115, y: 235 }],
      expected: true
    }, {
      input: ['M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z', { x: 300, y: 235 }],
      expected: true
    }].forEach(({ input, expected }) => {
      expect(contains(...input)).toBe(expected)
    });
  });

  it('correctly identifies a point outside a path', () => {
    [{
      input: ['M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z', { x: 200, y: 100 }],
      expected: false
    }, {
      input: ['M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z', { x: 220, y: 50 }],
      expected: false
    }, {
      input: ['M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z', { x: 115, y: 200 }],
      expected: false
    }, {
      input: ['M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z', { x: 250, y: 235 }],
      expected: false
    }].forEach(({ input, expected }) => {
      expect(contains(...input)).toBe(expected)
    });
  });
});
