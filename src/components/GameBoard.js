import React, { PureComponent } from 'react';

import _ from 'lodash';

import { RESET_STATE } from '../utils/constantes';
import { Board, Case, VictoryBlock } from './gameBoardStyle';

import {
  moveState,
  randomizesCases,
  WIN_POSITIONS,
} from '../utils/gameBoardFuncs';

export default class GameBoard extends PureComponent {
  state = RESET_STATE;

  componentDidMount() {
    this.setState({
      cases: randomizesCases(),
    });
  }

  moveCase = index => {
    this.setState(moveState(index), this.checkIsWin);
  };

  checkIsWin = () => {
    const casesPositions = this.state.cases.map(({ position }) => position);
    this.setState({
      isWin: _.isEqual(WIN_POSITIONS, casesPositions) ? true : false,
    });
  };

  playAgain = () => {
    this.setState({ ...RESET_STATE, cases: randomizesCases() });
  };

  render() {
    const { cases, isWin } = this.state;

    const casesMapped = cases.map(({ id, position, bgPosition }, index) => (
      <Case
        key={id}
        position={position}
        bgPosition={bgPosition}
        onClick={this.moveCase.bind(this, index)}
      />
    ));

    const victoryBlock = (
      <VictoryBlock>
        <div>
          <p>Congratulation, you win !</p>
        </div>
        <div>
          <button onClick={this.playAgain}>Play again</button>
        </div>
      </VictoryBlock>
    );

    return (
      <div>
        <Board>
          {casesMapped}
          {isWin && victoryBlock}
        </Board>
        <div>
          <button onClick={this.playAgain}>Reset</button>
        </div>
      </div>
    );
  }
}
