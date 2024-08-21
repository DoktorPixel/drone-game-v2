import { useState } from 'react';
import { Button, Slider, TextField, Typography } from '@mui/material';
import { useGameContext } from '../context/GameContext';
import { GameStartFormProps } from '../types';

const GameStartForm: React.FC<GameStartFormProps> = ({
  difficulty,
  setDifficulty,
  onStart,
  loading,
}) => {
  const { state, dispatch } = useGameContext();
  const [attemptedToStart, setAttemptedToStart] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: e.target.value });
  };

  const isNameEmpty = !state.playerName || state.playerName.trim() === '';

  const handleStart = () => {
    setAttemptedToStart(true);

    if (!isNameEmpty) {
      onStart();
    }
  };

  return (
    <div className="game-start-form">
      <h1>Drone Cave Game</h1>
      <TextField
        label="Player Name"
        value={state.playerName}
        onChange={handleNameChange}
        required
        error={attemptedToStart && isNameEmpty}
        helperText={attemptedToStart && isNameEmpty ? 'Name is required' : ''}
      />
      <Slider
        value={difficulty}
        onChange={(_, val) => setDifficulty(val as number)}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="on"
        aria-labelledby="difficulty-slider"
        aria-label="custom thumb label"
        marks
        className="game-start-slider"
      />
      <Typography gutterBottom>Select the desired difficulty</Typography>
      <Button
        onClick={handleStart}
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Starting...' : 'Start Game'}
      </Button>
    </div>
  );
};

export default GameStartForm;
