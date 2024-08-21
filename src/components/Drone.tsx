import { useGameContext } from '../context/GameContext';

interface DroneProps {
  x: number;
  y?: number;
}

export const Drone: React.FC<DroneProps> = ({ x, y = 8 }) => {
  const { state } = useGameContext();
  const transformStyle = {
    transform: `translate(${x + state.horizontalSpeed}px, ${y}px)`,
  };

  return (
    <g style={transformStyle}>
      <polygon points="-8,-8 8,-8 0,8" fill="green" />
    </g>
  );
};
