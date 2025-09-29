import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChessBoard,
  Color,
  Coordinates,
  FilterCellsProps,
  GameResult,
  GameState,
  Move,
} from '../types/types';
import initialBoard from '../routes/Main/components/Board/data';
import Bishop from '../app/figures/Bishop';
import King from '../app/figures/King';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';
import useBoardHelper from '../hooks/useBoardHelper';
import { useUser } from './useUser';
import useBoardMoveController from '../hooks/useBoardMoveController';
import { hashBoard } from '../utils/hashBoard';
import useSoundControler from '../hooks/useSoundControler';

type ChessPiece = King | Queen | Pawn | Bishop | Rook | Knight;

export interface GameStateContext extends GameState {
  setPlayerColor: Dispatch<SetStateAction<Color>>;
  setIsKingAttacked: Dispatch<SetStateAction<boolean>>;
  setBoardState: Dispatch<SetStateAction<ChessBoard>>;
  availableCells: Move[];
  setAvailableCells: Dispatch<SetStateAction<Move[]>>;
  chosenFigure: ChessPiece | null;
  setChosenFigure: Dispatch<SetStateAction<ChessPiece | null>>;
  kingPosition: { wk: Coordinates; bk: Coordinates };
  searchingGame: boolean;
  setSearchingGame: Dispatch<SetStateAction<boolean>>;
  gameId: string;
  setGameId: Dispatch<SetStateAction<string>>;
  isOnline: boolean;
  setIsOnline: Dispatch<SetStateAction<boolean>>;
  playersMove: boolean;
  setPlayersMove: Dispatch<SetStateAction<boolean>>;
  playerId: string | null;
  setPlayerId: Dispatch<SetStateAction<string | null>>;
  opponentId: string | null;
  setOpponentId: Dispatch<SetStateAction<string | null>>;
  lastMoveInfo: {
    isChecked?: boolean;
    isCaptured?: boolean;
    from?: Coordinates;
    to?: Coordinates;
  };
  moves: {
    isChecked?: boolean;
    isCaptured?: boolean;
    from: Coordinates;
    to: Coordinates;
  }[];
  setMoves: Dispatch<
    SetStateAction<
      {
        isChecked?: boolean;
        isCaptured?: boolean;
        from: Coordinates;
        to: Coordinates;
      }[]
    >
  >;
  gameResult: GameResult;
  setGameResult: Dispatch<SetStateAction<GameResult>>;
  filterCells: (options?: Partial<FilterCellsProps>) => Move[];
  gameOffer: {
    clientId: string;
    userId: string;
  } | null;
  setGameOffer: Dispatch<
    SetStateAction<{
      clientId: string;
      userId: string;
    } | null>
  >;
  boardHistory: ChessBoard[];
  setBoardHistory: Dispatch<SetStateAction<ChessBoard[]>>;
  currentBoardIndex: number;
  setCurrentBoardIndex: Dispatch<SetStateAction<number>>;
}

const throwError = (name: string) => {
  throw new Error(`${name} must be used within the GameProvider`);
};

const gameContext = createContext<GameStateContext>({
  playerColor: 'w',
  boardState: initialBoard,
  isKingAttacked: false,
  setPlayerColor: () => throwError('setPlayerColor'),
  setIsKingAttacked: () => throwError('setIsKingAttacked'),
  setBoardState: () => throwError('setBoardState'),
  availableCells: [],
  setAvailableCells: () => throwError('setAvailableCells'),
  chosenFigure: null,
  setChosenFigure: () => throwError('setChosenFigure'),
  kingPosition: {
    wk: { x: 0, y: 0 },
    bk: { x: 0, y: 0 },
  },
  playersMove: true,
  setPlayersMove: () => throwError('playersMove'),
  searchingGame: false,
  setSearchingGame: () => throwError('setSearchingGame'),
  gameId: '',
  setGameId: () => throwError('setGameId'),
  isOnline: false,
  setIsOnline: () => throwError('setIsOnline'),
  playerId: null,
  setPlayerId: () => throwError('setPlayerId'),
  opponentId: null,
  setOpponentId: () => throwError('setOpponentId'),
  lastMoveInfo: {
    isChecked: false,
    isCaptured: false,
  },
  moves: [],
  setMoves: () => throwError('setMoves'),
  gameResult: {
    finished: false,
    result: '',
    reason: '',
    whoWon: '',
  },
  setGameResult: () => throwError('setGameResult'),
  filterCells: () => throwError('filterCells'),
  gameOffer: null,
  setGameOffer: () => throwError('setGameOffered'),
  boardHistory: [],
  currentBoardIndex: 0,
  setBoardHistory: () => throwError('setBoardHistory'),
  setCurrentBoardIndex: () => throwError('setCurrentBoardIndex'),
});

export const useGame = () => useContext(gameContext);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [searchingGame, setSearchingGame] = useState(false);
  const [boardState, setBoardState] = useState<ChessBoard>(initialBoard);
  const [boardHistory, setBoardHistory] = useState<ChessBoard[]>([
    initialBoard,
  ]);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [isKingAttacked, setIsKingAttacked] = useState(false);
  const [playerColor, setPlayerColor] = useState<Color>('w');
  const [availableCells, setAvailableCells] = useState<Move[]>([]);
  const [chosenFigure, setChosenFigure] = useState<ChessPiece | null>(null);
  const [kingPosition, setKingPosition] = useState<{
    wk: Coordinates;
    bk: Coordinates;
  }>({
    bk: { x: 0, y: 0 },
    wk: { x: 0, y: 0 },
  });
  const [playersMove, setPlayersMove] = useState(true);
  const [gameId, setGameId] = useState('');
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [moves, setMoves] = useState<
    {
      isChecked?: boolean;
      isCaptured?: boolean;
      from: Coordinates;
      to: Coordinates;
    }[]
  >([]);
  const [gameResult, setGameResult] = useState<GameResult>({
    finished: false,
    result: '',
    reason: '',
    whoWon: '',
  });
  const {
    isAttacked,
    getAllMoves,
    getNewBoard,
    filterCells: innerFilterCells,
  } = useBoardHelper();
  const [gameOffer, setGameOffer] = useState<{
    clientId: string;
    userId: string;
  } | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const currentMovePlayerColor = useMemo((): Color => {
    if (isOnline) {
      return playerColor;
    }
    return playersMove ? 'w' : 'b';
  }, [isOnline, playerColor, playersMove]);

  const lastMoveInfo = useMemo(() => {
    console.log(moves);
    return moves[currentBoardIndex - 1];
  }, [currentBoardIndex, moves]);

  useBoardMoveController({
    setBoardState,
    setChosenFigure,
    setPlayersMove,
    setAvailableCells,
    setGameOffer,
    setGameResult,
    setSearchingGame,
    setGameId,
    setPlayerColor,
    setPlayerId,
    setOpponentId,
    setIsOnline,
    isOnline,
    setMoves,
  });
  useSoundControler({ moves, gameId });

  useEffect(() => {
    if (
      hashBoard(boardHistory[boardHistory.length - 1]) !== hashBoard(boardState)
    ) {
      setBoardHistory((prev) => [...prev, boardState]);
    }
  }, [boardHistory, boardHistory.length, boardState, currentBoardIndex]);

  useEffect(() => {
    setCurrentBoardIndex(boardHistory.length - 1);
  }, [boardHistory.length]);

  // const isAttacked = useCallback(
  //   (
  //     board: ChessBoard,
  //     kingX: number,
  //     kingY: number,
  //     currentPlayerColor?: string
  //   ) => {
  //     let opponentColor: string;

  //     if (currentPlayerColor !== undefined) {
  //       opponentColor = currentPlayerColor === 'w' ? 'b' : 'w';
  //     } else {
  //       opponentColor = playerColor === 'w' ? 'b' : 'w';
  //     }

  //     for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
  //       for (
  //         let cellIndex = 0;
  //         cellIndex < board[rowIndex].length;
  //         cellIndex += 1
  //       ) {
  //         if (
  //           rowIndex >= 0 &&
  //           rowIndex < 8 &&
  //           cellIndex >= 0 &&
  //           cellIndex < 8
  //         ) {
  //           const cell = board[rowIndex][cellIndex];
  //           if (cell.name[0] === opponentColor) {
  //             const figure = createFigure(
  //               { name: cell.name, firstMove: cell.firstMove || false },
  //               cellIndex,
  //               rowIndex
  //             );

  //             if (
  //               figure
  //                 .getMoves(board)
  //                 .some((move) => move.x === kingX && move.y === kingY)
  //             ) {
  //               return true;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     return false;
  //   },
  //   [playerColor]
  // );

  // some issues are possible
  const filteredCells = useMemo(() => {
    return availableCells.filter((move) => {
      const newBoard = JSON.parse(JSON.stringify(boardState)) as ChessBoard;

      const piece = newBoard[move.from.y][move.from.x];
      const [, type] = piece.name;
      // used only during development
      // if (piece.name[0] === 'b') return true;

      newBoard[move.from.y][move.from.x] = { name: '' };
      newBoard[move.to.y][move.to.x] = { ...piece, firstMove: false };

      const isKingStillSafe = !isAttacked({
        board: newBoard,
        kingX:
          type === 'k'
            ? move.to.x
            : kingPosition[`${currentMovePlayerColor}k`].x,
        kingY:
          type === 'k'
            ? move.to.y
            : kingPosition[`${currentMovePlayerColor}k`].y,
        playerColor: currentMovePlayerColor,
      });

      return isKingStillSafe;
    });
  }, [
    availableCells,
    boardState,
    currentMovePlayerColor,
    isAttacked,
    kingPosition,
  ]);

  const filterCells = useCallback(
    (options?: Partial<FilterCellsProps>) => {
      return innerFilterCells({
        boardState: options?.boardState || boardState,
        kingPosition: options?.kingPosition || kingPosition,
        currentMovePlayerColor:
          options?.currentMovePlayerColor || currentMovePlayerColor,
        availableCells: options?.availableCells || filteredCells,
      });
    },
    [
      boardState,
      currentMovePlayerColor,
      filteredCells,
      innerFilterCells,
      kingPosition,
    ]
  );

  useEffect(() => {
    if (!isOnline) {
      const allMoves = getAllMoves({
        board: boardState,
        playerColor: currentMovePlayerColor,
      }).filter((move) => {
        const newBoard = getNewBoard({
          oldBoard: boardState,
          move,
          x: move.x,
          y: move.y,
          chosenFigure: move.figure,
        }) as ChessBoard;

        const { name } = move.figure;

        return !isAttacked({
          board: newBoard,
          kingX:
            name[1] === 'k'
              ? move.to.x
              : kingPosition[`${currentMovePlayerColor}k`].x,
          kingY:
            name[1] === 'k'
              ? move.to.y
              : kingPosition[`${currentMovePlayerColor}k`].y,
          playerColor: currentMovePlayerColor,
        });
      });

      if (allMoves.length === 0) {
        if (allMoves.length === 0) {
          const isKingUnderAttack = isAttacked({
            board: boardState,
            kingX: kingPosition[`${currentMovePlayerColor}k`].x,
            kingY: kingPosition[`${currentMovePlayerColor}k`].y,
            playerColor: currentMovePlayerColor,
          });

          setGameResult({
            finished: true,
            result: isKingUnderAttack ? 'win' : 'draw',
            reason: isKingUnderAttack ? 'checkmate' : '',

            whoWon: '',
          });
        }
      }
      if (!gameId) {
        if (user) {
          navigate('/');
        } else {
          navigate('/login');
        }
      }
    }
  }, [
    boardState,
    currentMovePlayerColor,
    gameId,
    getAllMoves,
    getNewBoard,
    isAttacked,
    isOnline,
    kingPosition,
    navigate,
    playerColor,
    playersMove,
    user,
  ]);

  useEffect(() => {
    setIsKingAttacked(
      isAttacked({
        board: boardState,
        playerColor: currentMovePlayerColor,
        kingX: kingPosition[playerColor === 'w' ? 'wk' : 'bk'].x,
        kingY: kingPosition[playerColor === 'w' ? 'wk' : 'bk'].y,
      })
    );
  }, [
    boardState,
    currentMovePlayerColor,
    isAttacked,
    isOnline,
    kingPosition,
    playerColor,
    playersMove,
  ]);

  useEffect(() => {
    boardState.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.name === 'bk') {
          setKingPosition((prev) => ({ ...prev, bk: { x, y } }));
        } else if (cell.name === 'wk') {
          setKingPosition((prev) => ({ ...prev, wk: { x, y } }));
        }
      });
    });
  }, [boardState, playerColor]);

  const value = useMemo(
    () => ({
      boardHistory,
      boardState,
      setBoardState,
      isKingAttacked,
      setIsKingAttacked,
      playerColor,
      setPlayerColor,
      availableCells,
      setAvailableCells,
      chosenFigure,
      setChosenFigure,
      kingPosition,
      playersMove,
      setPlayersMove,
      searchingGame,
      setSearchingGame,
      gameId,
      setGameId,
      isOnline,
      setIsOnline,
      playerId,
      setPlayerId,
      lastMoveInfo,
      gameResult,
      setGameResult,
      filterCells,
      opponentId,
      setOpponentId,
      gameOffer,
      setGameOffer,
      setBoardHistory,
      currentBoardIndex,
      setCurrentBoardIndex,
      moves,
      setMoves,
    }),
    [
      boardHistory,
      boardState,
      isKingAttacked,
      playerColor,
      availableCells,
      chosenFigure,
      kingPosition,
      playersMove,
      searchingGame,
      gameId,
      isOnline,
      playerId,
      lastMoveInfo,
      gameResult,
      filterCells,
      opponentId,
      gameOffer,
      currentBoardIndex,
      moves,
    ]
  );

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};

export default GameProvider;
