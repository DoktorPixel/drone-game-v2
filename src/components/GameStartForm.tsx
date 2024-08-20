import { Button, Slider, TextField, Typography } from '@mui/material';
import { useGameContext } from '../context/GameContext';
import { GameStartFormProps } from '../types';

const GameStartForm: React.FC<GameStartFormProps> = ({
  difficulty,
  setDifficulty,
  onStart,
}) => {
  const { state, dispatch } = useGameContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: e.target.value });
  };

  return (
    <div className="game-start-form">
      <h1>Drone Cave Game</h1>
      <TextField
        label="Player Name"
        value={state.playerName}
        onChange={handleNameChange}
        required
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
      />
      <Typography gutterBottom>Select the desired difficulty</Typography>
      <Button onClick={onStart} variant="contained" color="primary">
        Start Game
      </Button>
    </div>
  );
};

export default GameStartForm;
