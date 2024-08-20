import React from 'react';
import { useGameContext } from '../context/GameContext';

export const Speedometer: React.FC = () => {
  const { state } = useGameContext();

  return (
    <div>
      <h2>Speed</h2>
      <p>Vertical: {Math.abs(state.verticalSpeed)}</p>
      <p>Horizontal: {state.horizontalSpeed}</p>
      <p>Score: {state.score}</p>
    </div>
  );
};
