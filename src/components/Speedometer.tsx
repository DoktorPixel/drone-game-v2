import * as React from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import { useGameContext } from '../context/GameContext';

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export const Speedometer: React.FC = () => {
  const { state } = useGameContext();

  const verticalSpeed = Math.abs(state.verticalSpeed);
  const horizontalSpeed = -state.horizontalSpeed;
  const horizontalDirection =
    horizontalSpeed > 0 ? 'Right' : horizontalSpeed < 0 ? 'Left' : '';
  return (
    <div className="speedometers">
      <div className="speedometer">
        <h3>Vertical Speed:</h3>
        <GaugeContainer
          width={100}
          height={100}
          startAngle={-180}
          endAngle={180}
          value={verticalSpeed * 5}
        >
          <GaugeReferenceArc />
          <GaugeValueArc />
          <GaugePointer />
        </GaugeContainer>
        <p className="speed-value">{verticalSpeed} m/s</p>
      </div>

      <div className="speedometer">
        <h3>Horizontal Speed:</h3>
        <GaugeContainer
          width={100}
          height={100}
          startAngle={-180}
          endAngle={180}
          value={horizontalSpeed * 5}
        >
          <GaugeReferenceArc />
          <GaugeValueArc />
          <GaugePointer />
        </GaugeContainer>
        <p className="speed-value">
          {horizontalDirection && <span>{horizontalDirection.toLowerCase()} </span>}
          {Math.abs(horizontalSpeed)} m/s
        </p>
      </div>
      <div className="speedometer">
        <h3>Score: </h3>
        <div className="score-container">{state.score}</div>
      </div>
    </div>
  );
};

// import { useGameContext } from '../context/GameContext';

// export const Speedometer: React.FC = () => {
//   const { state } = useGameContext();

//   return (
//     <div>
//       <h2>Speed</h2>
//       <p>Vertical: {Math.abs(state.verticalSpeed)}</p>
//       <p>Horizontal: {state.horizontalSpeed}</p>
//       <p>Score: {state.score}</p>
//     </div>
//   );
// };
