export interface CaveSegment {
  left: number;
  right: number;
}

export interface GameState {
  playerId: string;
  playerName: string;
  difficulty: number;
  score: number;
  verticalSpeed: number;
  horizontalSpeed: number;
  cave: CaveSegment[];
  gameOver: boolean;
  gameWon: boolean;
}

export interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export type GameAction =
  | { type: 'SET_PLAYER'; payload: { id: string; name: string } }
  | { type: 'SET_CAVE'; payload: { left: number; right: number } }
  | { type: 'INCREMENT_SCORE'; payload: number }
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'SET_GAME_OVER' }
  | { type: 'SET_GAME_WON' }
  | { type: 'SET_HORIZONTAL_SPEED'; payload: number }
  | { type: 'SET_VERTICAL_SPEED'; payload: number }
  | { type: 'RESET_GAME' };
