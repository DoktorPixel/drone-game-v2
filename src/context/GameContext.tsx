import { createContext, useContext, useReducer } from 'react';
import { GameAction, GameState } from '../types';
import { GameContextProps } from '../types';

const initialState: GameState = {
  playerId: '',
  playerName: '',
  difficulty: 0,
  score: 0,
  verticalSpeed: 0,
  horizontalSpeed: 0,
  cave: [],
  gameOver: false,
  gameWon: false,
};

export const GameContext = createContext<GameContextProps>({
  state: initialState,
  dispatch: () => null,
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        playerId: action.payload.id,
        playerName: action.payload.name,
      };
    case 'SET_CAVE':
      return { ...state, cave: [...state.cave, action.payload] };
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
      };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: true };
    case 'SET_GAME_WON':
      return { ...state, gameWon: true };
    case 'SET_HORIZONTAL_SPEED':
      return { ...state, horizontalSpeed: action.payload };
    case 'SET_VERTICAL_SPEED':
      return { ...state, verticalSpeed: action.payload };
    case 'RESET_GAME':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
