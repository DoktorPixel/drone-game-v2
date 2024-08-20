import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useGameContext } from '../context/GameContext';
import { GameOverPopupProps } from '../types';

export const GameOverPopup: React.FC<GameOverPopupProps> = ({ onPlayAgain }) => {
  const { state, dispatch } = useGameContext();

  const handleClose = () => {
    dispatch({ type: 'RESET_GAME' });
    onPlayAgain();
  };
  return (
    <Dialog open={state.gameOver || state.gameWon} onClose={handleClose}>
      <DialogTitle>{state.gameWon ? 'Congratulations!' : 'Game Over'}</DialogTitle>
      <DialogContent>
        {state.gameWon ? 'You won the game!' : 'The drone has been destroyed.'}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Play again</Button>
      </DialogActions>
    </Dialog>
  );
};
