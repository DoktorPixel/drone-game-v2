import { useEffect, useState } from 'react';
import { initGame, getToken } from '../services/api';
import { connectWebSocket } from '../services/websocket';
import { useGameContext } from '../context/GameContext';
import { GameAction } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useGame = () => {
  const { dispatch } = useGameContext();
  const [ws, setWs] = useState<WebSocket | null>(null);

  const startGame = async (name: string, difficulty: number) => {
    try {
      const id = await initGame(name, difficulty);
      dispatch({ type: 'SET_PLAYER', payload: { id, name } });

      const token = await getToken(id);

      const webSocket = connectWebSocket(id, token, (data) => {
        if (data)
          dispatch({ type: 'SET_CAVE', payload: { left: data[0], right: data[1] } });
      });

      setWs(webSocket);

      webSocket.onclose = () => {
        console.log('WebSocket closed');
        // dispatch({ type: 'SET_GAME_OVER' });
      };
    } catch (error) {
      console.error('Error during game start:', error);
    }
  };

  const checkForWin = (
    currentSegment: number,
    totalSegments: number,
    dispatch: React.Dispatch<GameAction>,
    playerName: string,
    difficulty: number,
    score: number,
  ) => {
    if (totalSegments === 0) return;

    if (currentSegment >= totalSegments - 1) {
      dispatch({ type: 'SET_GAME_WON' });
      const scores = JSON.parse(localStorage.getItem('scores') || '[]');
      const isDuplicate = scores.some(
        (entry: { playerName: string; score: number }) =>
          entry.playerName === playerName && entry.score === score,
      );

      if (!isDuplicate) {
        const newScore = {
          id: uuidv4(),
          playerName,
          difficulty,
          score,
        };
        const updatedScores = [...scores, newScore].sort(
          (a, b) => b.score - a.score,
        );
        localStorage.setItem('scores', JSON.stringify(updatedScores));
      }

      dispatch({ type: 'SAVE_SCORE' });
    }
  };

  const scoreMultiplier = 1; // it is possible to change this

  const calculateScoreIncrement = (verticalSpeed: number, complexity: number) => {
    return scoreMultiplier * (Math.abs(verticalSpeed * 2) + complexity * 2);
  };

  const incrementScore = (
    dispatch: React.Dispatch<GameAction>,
    verticalSpeed: number,
    complexity: number,
  ) => {
    const scoreIncrement = calculateScoreIncrement(verticalSpeed, complexity);
    dispatch({ type: 'INCREMENT_SCORE', payload: scoreIncrement });
  };

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return { startGame, checkForWin, incrementScore };
};
