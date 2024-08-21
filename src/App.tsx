import { useState } from 'react';
import { Cave } from './components/Cave';
import { GameOverPopup } from './components/GameOverPopup';
import { Scoreboard } from './components/Scoreboard';
import { useGame } from './hooks/useGame';
import GameStartForm from './components/GameStartForm';
import { CircularProgress } from '@mui/material';
import { useGameContext } from './context/GameContext';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState(0);
  const { startGame } = useGame();
  const { state } = useGameContext();
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = async () => {
    setLoading(true);
    await startGame(state.playerName, difficulty);
    setLoading(false);
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameStarted(false);
  };

  return (
    <main>
      {!gameStarted && (
        <GameStartForm
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={handleStartGame}
          loading={loading}
        />
      )}

      {loading && <CircularProgress />}

      {gameStarted && !loading && !state.gameOver && !state.gameWon && <Cave />}

      {(state.gameOver || state.gameWon) && (
        <GameOverPopup onPlayAgain={handlePlayAgain} />
      )}

      <Scoreboard />
    </main>
  );
};

export default App;
