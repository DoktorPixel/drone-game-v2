import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useGameContext } from '../context/GameContext';

export const GameOverPopup: React.FC = () => {
  const { state, dispatch } = useGameContext();

  const handleClose = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <Dialog open={state.gameOver || state.gameWon} onClose={handleClose}>
      <DialogTitle>{state.gameWon ? 'Congratulations!' : 'Game Over'}</DialogTitle>
      <DialogContent>
        {state.gameWon ? 'You won the game!' : 'You lost the game.'}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
