import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import { WebsocketMessages } from '../utils/enums';
import {
  ChessBoard,
  Coordinates,
  FigureType,
  Move,
  UserClientId,
} from '../types/types';

const URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000';

interface ServerGameResult {
  finished: boolean;
  whoWon: string;
  reason:
    | 'checkmate'
    | 'surrendered'
    | ''
    | 'timeout'
    | 'left-game'
    | 'no-moves-left'
    | 'repetitive-moves'
    | 'both-accepted-draw';
  result: 'win' | 'lose' | 'draw' | '';
}

export interface Game {
  gameId: string;
  gameState: {
    board: ChessBoard;
    gameResult: ServerGameResult;
    whoWon?: string;
    whoChecked?: string;
    isCaptured?: boolean;
    checkStatus: {
      isCheck: boolean;
      whoIsChecked?: string; // playerId
    };
    isChecked: boolean;
  };
  clientIds: [string, string];
  userIds: [string, string];
  isWhite: boolean;
  isPlayerTurn: boolean;
  playerId: string;
  opponentId: string;
}

export interface IWebsocketContext {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  emitMessage: EmitMessageFunction;
  onMessage: <T extends keyof OnMessagePayloadType>(
    message: T,
    handler: (payload: OnMessagePayloadType[T]) => void
  ) => () => void;
  socket: typeof socket;
  clientId: string | null;
}

export type OnMessagePayloadType = {
  [WebsocketMessages.CreateGame]: {
    message: string;
    game: Game;
  };
  [WebsocketMessages.StartSearch]: { message: string };
  [WebsocketMessages.Move]: {
    message: string;
    game: Game;
    move: Move;
  };
  [WebsocketMessages.CancelSearch]: {
    message: string;
  };
  [WebsocketMessages.TransformPawn]: {
    message: string;
    game: Game;
    move: {
      from: Coordinates;
      to: Coordinates;
      newFigureName: Exclude<FigureType, 'wp' | 'bp' | 'wk' | 'bk'>;
    };
  };
  [WebsocketMessages.GameOver]: {
    message: string;
    gameResult: ServerGameResult;
  };
  [WebsocketMessages.DrawOffer]: {
    message: string;
    gameId: string;
  };
  [WebsocketMessages.GameOffer]: {
    opponent: UserClientId;
    player: UserClientId;
  };
  [WebsocketMessages.GetGame]: {
    game: Game;
    message: string;
  };
};

export type EmitMessageFunction = <T extends WebsocketMessages>(
  message: T,
  payload?: object,
  callback?: () => void
) => void;

export const socket = io(URL, {
  // change to false if required
  autoConnect: false,
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('token'),
  },
});

export const WebsocketContext = createContext<IWebsocketContext>({
  isConnected: false,
  emitMessage: () => {},
  onMessage: () => {
    throw new Error('Function not implemented.');
  },
  socket,
  setIsConnected: () => {
    throw new Error('Function not implemented.');
  },
  clientId: null,
});

export const useWebsocket = () => useContext(WebsocketContext);

const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const emitMessage: EmitMessageFunction = useCallback(
    (message, payload, callback?: () => void) => {
      socket.emit(message, JSON.stringify(payload || ''));
      if (callback) {
        callback();
      }
    },
    []
  );
  const onMessage = useCallback(
    <T extends keyof OnMessagePayloadType>(
      message: T,
      handler: (payload: OnMessagePayloadType[T]) => () => void
    ) => {
      socket.on(message, handler);
      return () => {
        socket.off(message, handler);
      };
    },
    []
  );

  useEffect(() => {
    setIsConnected(socket.connected);
    const onConnect = () => {
      setIsConnected(true);
      if (socket.id) {
        setClientId(socket.id);
      }
    };

    socket.on('connect', onConnect);
    socket.on('connect_error', () => {
      setIsConnected(false);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isConnected,
      emitMessage,
      onMessage,
      socket,
      setIsConnected,
      clientId,
    }),
    [clientId, emitMessage, isConnected, onMessage]
  );
  return (
    <WebsocketContext.Provider value={contextValue}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
