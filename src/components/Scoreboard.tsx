export const Scoreboard: React.FC = () => {
  const scores = JSON.parse(localStorage.getItem('scores') || '[]');

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>

      {scores.length === 0 ? (
        <p>No scores yet</p>
      ) : (
        <ul>
          {scores.map(
            (
              score: {
                id: string;
                playerName: string;
                difficulty: number;
                score: number;
              },
              index: number,
            ) => (
              <li key={score.id}>
                {index + 1}. {score.playerName} - Difficulty: {score.difficulty} -
                Score: {score.score}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};
