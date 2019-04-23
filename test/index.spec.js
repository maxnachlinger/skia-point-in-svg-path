'use strict';

const getPathsContainingPoints = require('../');

describe('getPathsContainingPoints tests', () => {
  it('sanity checks input', () => {
    [[], [null, null, null], ['string', 'string', 'string']].forEach((input) => {
      expect(() => getPathsContainingPoints(...input)).toThrow();
    });
  });

  it('handles bad path data', () => {
    expect(getPathsContainingPoints(
      [{id: 'path-0', data: 'test'}],
      [{id: 'point-0', x: 100, y: 100}],
    )).toEqual([{intersectingPathIds: [], pointId: 'point-0'}]);
  });

  it('correctly identifies a point inside a path', () => {
    [{
      input: [
        [{id: 'path-0', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z'}],
        [{id: 'point-0', x: 100, y: 100}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z'}],
        [{id: 'point-0', x: 100.1, y: 100.1}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z'}],
        [{id: 'point-0', x: 220, y: 100}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z'}],
        [{id: 'point-0', x: 115, y: 235}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z'}],
        [{id: 'point-0', x: 300, y: 235}],
      ],
      expected: [{intersectingPathIds: ['path-0'], pointId: 'point-0'}],
    }].forEach(({input, expected}) => {
      expect(getPathsContainingPoints(...input)).toEqual(expected);
    });
  });

  it('correctly identifies a point outside a path', () => {
    [{
      input: [
        [{id: 'path-0', data: 'M80 80A 45 45, 0, 0, 0, 125 125L 125 80 Z'}],
        [{id: 'point-0', x: 200, y: 100}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 80A 45 45, 0, 1, 0, 275 125L 275 80 Z'}],
        [{id: 'point-0', x: 220, y: 50}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M80 230A 45 45, 0, 0, 1, 125 275L 125 230 Z'}],
        [{id: 'point-0', x: 115, y: 200}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0'}],
    }, {
      input: [
        [{id: 'path-0', data: 'M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z'}],
        [{id: 'point-0', x: 250, y: 235}],
      ],
      expected: [{intersectingPathIds: [], pointId: 'point-0'}],
    }].forEach(({input, expected}) => {
      expect(getPathsContainingPoints(...input)).toEqual(expected);
    });
  });
});
