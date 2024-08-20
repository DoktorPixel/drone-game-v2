import React from 'react';

export const Scoreboard: React.FC = () => {
  const scores = JSON.parse(localStorage.getItem('scores') || '[]');

  return (
    <div>
      <h2>Scoreboard</h2>
      <ul>
        {scores.map((score: number, index: number) => (
          <li key={index}>{score}</li>
        ))}
      </ul>
    </div>
  );
};
