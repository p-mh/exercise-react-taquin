import _ from 'lodash';

import * as GameBoard from './gameBoardFuncs';
import { DIFFICULTY } from './constantes';

export const createColumn = (nb, line, result = [], column = 0) => {
  if (column === nb - 1) {
    return [
      ...result,
      {
        id: line * nb + column,
        position: { x: line, y: column },
        bgPosition: { x: -column, y: -line },
      },
    ];
  }
  return GameBoard.createColumn(
    nb,
    line,
    [
      ...result,
      {
        id: line * nb + column,
        position: { x: line, y: column },
        bgPosition: { x: -column, y: -line },
      },
    ],
    column + 1
  );
};
export const createBoard = (nb, line = 0, result = []) => {
  if (line === nb - 1) {
    const allCases = [...result, ...GameBoard.createColumn(nb, line)];
    const [firstCase, ...restCase] = allCases;
    return [...restCase];
  }
  return createBoard(nb, line + 1, [
    ...result,
    ...GameBoard.createColumn(nb, line),
  ]);
};

export const CASES = GameBoard.createBoard(DIFFICULTY);
export const WIN_POSITIONS = CASES.map(({ position }) => position);

export const isAllowedToMove = (
  { x: caseX, y: caseY },
  { x: freeX, y: freeY }
) => {
  return (
    (Math.abs(caseX - freeX) === 1 && caseY === freeY) ||
    (Math.abs(caseY - freeY) === 1 && caseX === freeX)
  );
};

export const moveState = index => ({ cases, freePosition }) => {
  const caseToMove = cases[index];

  if (GameBoard.isAllowedToMove(caseToMove.position, freePosition)) {
    const newCase = { ...caseToMove, position: freePosition };
    const prevCases = cases.slice(0, index);
    const nextCases = cases.slice(index + 1);
    return {
      cases: [...prevCases, newCase, ...nextCases],
      freePosition: caseToMove.position,
    };
  }
  return {
    cases,
    freePosition,
  };
};

export const randomizesCases = () => {
  const casesPositions = GameBoard.CASES.map(({ position }) => position);
  const randomizedCasesPositions = _.shuffle(casesPositions);

  return GameBoard.CASES.map((box, index) => ({
    ...box,
    position: randomizedCasesPositions[index],
  }));
};
