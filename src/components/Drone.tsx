import { useGameContext } from '../context/GameContext';

interface DroneProps {
  x: number;
  y?: number;
}

export const Drone: React.FC<DroneProps> = ({ x, y = 10 }) => {
  const { state } = useGameContext();
  const transformStyle = {
    transform: `translate(${x + state.horizontalSpeed}px, ${y}px)`,
  };

  return (
    <g style={transformStyle}>
      <polygon points="-10,-10 10,-10 0,10" fill="green" />
    </g>
  );
};
