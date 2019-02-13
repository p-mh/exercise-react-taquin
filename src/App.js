import React, { PureComponent } from 'react';

import { BEGIN, PLAY } from './utils/constantes';

import Begin from './components/Begin';
import GameBoard from './components/GameBoard';

import './App.css';

class App extends PureComponent {
  state = {
    gameState: BEGIN,
  };

  play = () => {
    this.setState({
      gameState: PLAY,
    });
  };

  render() {
    const gameStateComponent = {
      BEGIN: <Begin play={this.play} />,
      PLAY: <GameBoard />,
    };

    return (
      <div className="App">
        <h1>Taquin</h1>
        {gameStateComponent[this.state.gameState]}
      </div>
    );
  }
}

export default App;
