import { useState } from 'react';
import { Cave } from './components/Cave';
import { GameOverPopup } from './components/GameOverPopup';
import { Scoreboard } from './components/Scoreboard';
import { useGame } from './hooks/useGame';
import GameStartForm from './components/GameStartForm';
import { CircularProgress } from '@mui/material';
import { useGameContext } from './context/GameContext';

const App: React.FC = () => {
  const { startGame } = useGame();
  const { state } = useGameContext();
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = async () => {
    setLoading(true);
    await startGame(state.playerName, state.difficulty);
    setLoading(false);
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameStarted(false);
  };

  return (
    <main>
      {!gameStarted && (
        <>
          <GameStartForm onStart={handleStartGame} loading={loading} />{' '}
          <Scoreboard />
        </>
      )}

      {loading && <CircularProgress />}

      {gameStarted && !loading && !state.gameOver && !state.gameWon && <Cave />}

      {(state.gameOver || state.gameWon) && (
        <GameOverPopup onPlayAgain={handlePlayAgain} />
      )}
    </main>
  );
};

export default App;
