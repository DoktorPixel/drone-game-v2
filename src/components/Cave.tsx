import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { Drone } from './Drone';
import { useGame } from '../hooks/useGame';
import { Speedometer } from './Speedometer';

export const Cave: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const [dronePosition, setDronePosition] = useState({ x: 250, y: 0 });
  const { incrementScore, checkForWin } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          dispatch({
            type: 'SET_HORIZONTAL_SPEED',
            payload: state.horizontalSpeed - 1,
          });
          break;
        case 'ArrowRight':
          dispatch({
            type: 'SET_HORIZONTAL_SPEED',
            payload: state.horizontalSpeed + 1,
          });
          break;
        case 'ArrowDown':
          dispatch({
            type: 'SET_VERTICAL_SPEED',
            payload: state.verticalSpeed - 1,
          });
          break;
        case 'ArrowUp':
          if (state.verticalSpeed < 0) {
            dispatch({
              type: 'SET_VERTICAL_SPEED',
              payload: state.verticalSpeed + 1,
            });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, state.horizontalSpeed, state.verticalSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDronePosition((prev) => {
        const newX = prev.x + state.horizontalSpeed;
        const newY = prev.y + state.verticalSpeed;

        const currentSegment = Math.floor(Math.abs(newY) / 10);
        const totalSegments = state.cave.length;
        // console.log('currentSegment', currentSegment);
        // console.log('totalSegments', totalSegments);
        if (totalSegments === 0) return prev;

        incrementScore(dispatch, state.verticalSpeed, state.difficulty);

        checkForWin(currentSegment, totalSegments, dispatch);

        return { x: newX, y: newY };
      });
    }, 10);

    return () => clearInterval(interval);
  }, [
    state.horizontalSpeed,
    state.verticalSpeed,
    dispatch,
    state.cave.length,
    state.difficulty,
    checkForWin,
    incrementScore,
  ]);

  useEffect(() => {
    const droneX = dronePosition.x;

    const isCollision = state.cave.some((segment, index) => {
      const y = index * 10 + dronePosition.y;
      return (
        (droneX < 250 + segment.left || droneX > 250 + segment.right) &&
        y >= 10 &&
        y <= 20
      );
    });

    if (isCollision) {
      dispatch({ type: 'SET_GAME_OVER' });
    }
  }, [dronePosition, state.cave, dispatch]);

  return (
    <>
      <Speedometer />
      <svg width="500" height="800" style={{ border: '1px solid black' }}>
        {state.cave.map((segment, index) =>
          isNaN(segment.left) || isNaN(segment.right) ? null : (
            <polygon
              key={index}
              points={`0,${index * 10 + dronePosition.y} ${250 + segment.left},${
                index * 10 + dronePosition.y
              } ${250 + segment.left},${(index + 1) * 10 + dronePosition.y} 0,${
                (index + 1) * 10 + dronePosition.y
              }`}
              fill="black"
            />
          ),
        )}
        <Drone x={dronePosition.x} />
        {state.cave.map((segment, index) =>
          isNaN(segment.left) || isNaN(segment.right) ? null : (
            <polygon
              key={index}
              points={`500,${index * 10 + dronePosition.y} ${250 + segment.right},${
                index * 10 + dronePosition.y
              } ${250 + segment.right},${(index + 1) * 10 + dronePosition.y} 500,${
                (index + 1) * 10 + dronePosition.y
              }`}
              fill="black"
            />
          ),
        )}
      </svg>
    </>
  );
};
