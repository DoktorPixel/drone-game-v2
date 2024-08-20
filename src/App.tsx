import { useState } from 'react';
import { Cave } from './components/Cave';
import { GameOverPopup } from './components/GameOverPopup';
import { Speedometer } from './components/Speedometer';
import { Scoreboard } from './components/Scoreboard';
import { useGame } from './hooks/useGame';
import { Button, TextField } from '@mui/material';
import { useGameContext } from './context/GameContext';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState(0);
  const { startGame } = useGame();
  const { state, dispatch } = useGameContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: e.target.value });
  };
  return (
    <div key={state.gameOver || state.gameWon ? 'reset' : 'game'}>
      <h1>Drone Cave Game</h1>
      <TextField label="Name" value={state.playerName} onChange={handleNameChange} />
      <TextField
        label="Difficulty"
        type="number"
        value={difficulty}
        onChange={(e) => setDifficulty(Number(e.target.value))}
      />
      <Button onClick={() => startGame(state.playerName, difficulty)}>
        Start Game
      </Button>

      <Cave />
      <Speedometer />
      <Scoreboard />
      <GameOverPopup />
    </div>
  );
};

export default App;
