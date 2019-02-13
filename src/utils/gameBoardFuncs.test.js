import * as GameBoardFuncs from './gameBoardFuncs';

describe('createBoard', () => {
  test('createBoard should create the correct array', () => {
    expect(GameBoardFuncs.createBoard(2)).toEqual([
      { id: 1, bgPosition: { x: -1, y: -0 }, position: { x: 0, y: 1 } },
      { id: 2, bgPosition: { x: -0, y: -1 }, position: { x: 1, y: 0 } },
      { id: 3, bgPosition: { x: -1, y: -1 }, position: { x: 1, y: 1 } },
    ]);
  });

  test('createBoard with 3 should call createColumn 8 times (3*3)', () => {
    const spyCreatColumn = jest.spyOn(GameBoardFuncs, 'createColumn');
    GameBoardFuncs.createBoard(3);
    expect(spyCreatColumn).toBeCalledTimes(9);
  });
});

describe('isAllowedToMove', () => {
  test("isAllowedToMove with (({ x: '0', y: '0' }, { x: '0', y: '1' }) should be truth", () => {
    expect(
      GameBoardFuncs.isAllowedToMove({ x: '0', y: '0' }, { x: '0', y: '1' })
    ).toBeTruthy();
  });

  test("isAllowedToMove with ({ x: '0', y: '0' }, { x: '5', y: '5' }) should be false", () => {
    expect(
      GameBoardFuncs.isAllowedToMove({ x: '0', y: '0' }, { x: '5', y: '5' })
    ).toBeFalsy();
  });
});

describe('moveState', () => {
  test('moveState should invert position and freePosition (allowed to move)', () => {
    expect(
      GameBoardFuncs.moveState(0)({
        cases: [{ position: { x: '1', y: '1' } }],
        freePosition: { x: '1', y: '2' },
      })
    ).toEqual({
      cases: [{ position: { x: '1', y: '2' } }],
      freePosition: { x: '1', y: '1' },
    });
  });

  test('moveState should do nothing (not allowed to move)', () => {
    expect(
      GameBoardFuncs.moveState(0)({
        cases: [{ position: { x: '3', y: '3' } }],
        freePosition: { x: '1', y: '1' },
      })
    ).toEqual({
      cases: [{ position: { x: '3', y: '3' } }],
      freePosition: { x: '1', y: '1' },
    });
  });

  test('moveState should call isAllowedToMove', () => {
    const spyIsAllowedToMove = jest.spyOn(GameBoardFuncs, 'isAllowedToMove');
    GameBoardFuncs.moveState(0)({
      cases: [{ position: { x: '1', y: '2' } }],
      freePosition: { x: '1', y: '1' },
    });
    expect(spyIsAllowedToMove).toHaveBeenCalled();
  });
});

describe('randomizesCases', () => {
  test('randomizesCases should return something different than CASES', () => {
    expect(GameBoardFuncs.randomizesCases()).not.toEqual(GameBoardFuncs.CASES);
  });

  test('randomizesCases should have the same length that CASES', () => {
    expect(GameBoardFuncs.randomizesCases()).toHaveLength(
      GameBoardFuncs.CASES.length
    );
  });
});
