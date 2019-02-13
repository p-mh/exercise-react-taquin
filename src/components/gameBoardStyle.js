import PropTypes from 'prop-types';

import styled from 'styled-components';

import { DIFFICULTY } from '../utils/constantes';

const pieceSize = Math.floor(
  Math.min(window.innerWidth / DIFFICULTY, window.innerHeight / DIFFICULTY, 150)
);

export const Board = styled.div`
  margin: auto;
  position: relative;
  display: inline-block;
  width: ${DIFFICULTY * pieceSize}px;
  height: ${DIFFICULTY * pieceSize}px;
`;

export const Case = styled.div`
  width: ${pieceSize}px;
  height: ${pieceSize}px;
  position: absolute;
  box-sizing: border-box;
  border: #fff 1px solid;
  background-image: url('https://animalcenter.org/wp-content/uploads/2016/02/Blue-Eyed-Kittens.jpg');
  background-size: ${DIFFICULTY * 101}%;
  background-position-x: ${({ bgPosition: { x } }) => x * pieceSize}px;
  background-position-y: ${({ bgPosition: { y } }) => y * pieceSize}px;
  top: ${({ position: { x } }) => x * pieceSize}px;
  left: ${({ position: { y } }) => y * pieceSize}px;
  transition: all 0.4s ease-in;
`;

export const VictoryBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000000b5;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

Case.propTypes = {
  position: PropTypes.object,
  bgPosition: PropTypes.object,
};
