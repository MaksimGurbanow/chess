// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
// } from 'react';
// import { ChessBoard, Coordinates, Move } from '../types/types';
// import Bishop from '../app/figures/Bishop';
// import King from '../app/figures/King';
// import Knight from '../app/figures/Knight';
// import Pawn from '../app/figures/Pawn';
// import Queen from '../app/figures/Queen';
// import Rook from '../app/figures/Rook';
// import initialBoard from '../routes/Main/components/Board/data';
// import createFigure from '../utils/createFigure';

// type ChessPiece = King | Queen | Pawn | Bishop | Rook | Knight;

// export interface GetNewBoardProps {
//   move: Move;
//   x: number;
//   y: number;
// }

// export interface BoardStateContext {
//   boardState: ChessBoard;
//   setBoardState: Dispatch<SetStateAction<ChessBoard>>;
//   isKingAttacked: boolean;
//   setIsKingAttacked: Dispatch<SetStateAction<boolean>>;
//   availableCells: Move[];
//   setAvailableCells: Dispatch<SetStateAction<Move[]>>;
//   chosenFigure: ChessPiece | null;
//   setChosenFigure: Dispatch<SetStateAction<ChessPiece | null>>;
//   kingPosition: { wk: Coordinates; bk: Coordinates };
//   setKingPosition: Dispatch<
//     SetStateAction<{
//       wk: Coordinates;
//       bk: Coordinates;
//     }>
//   >;
//   getNewBoard: ({ move, x, y }: GetNewBoardProps) => ChessBoard | null;
// }

// const throwError = (name: string) => {
//   throw new Error(`${name} must be used within the BoardProvider`);
// };

// export const boardContext = createContext<BoardStateContext>({
//   boardState: initialBoard,
//   setBoardState: () => throwError('setBoardState'),
//   isKingAttacked: false,
//   setIsKingAttacked: () => throwError('setIsKingAttacked'),
//   availableCells: [],
//   setAvailableCells: () => throwError('setAvailableCells'),
//   chosenFigure: null,
//   setChosenFigure: () => throwError('setChosenFigure'),
//   kingPosition: {
//     wk: { x: 0, y: 0 },
//     bk: { x: 0, y: 0 },
//   },
//   setKingPosition: () => throwError('setKingPosition'),
//   getNewBoard: () => throwError('getNewBoard'),
// });

// export const useBoard = () => useContext(boardContext);

// export const BoardProvider = ({ children }: { children: ReactNode }) => {
//   const [boardState, setBoardState] = useState<ChessBoard>(initialBoard);
//   const [isKingAttacked, setIsKingAttacked] = useState(false);
//   const [availableCells, setAvailableCells] = useState<Move[]>([]);
//   const [chosenFigure, setChosenFigure] = useState<ChessPiece | null>(null);
//   const [kingPosition, setKingPosition] = useState<{
//     wk: Coordinates;
//     bk: Coordinates;
//   }>({
//     bk: { x: 0, y: 0 },
//     wk: { x: 0, y: 0 },
//   });

//   const getNewBoard = useCallback(
//     ({ move, x, y }: GetNewBoardProps): ChessBoard | null => {
//       if (!chosenFigure || !move) return null;
//       // Probably need to delete
//       const {
//         pieceToRemove,
//         isEnpassant,
//         isCastling,
//         castlingRook,
//         castlingKing,
//       } = move;
//       const newBoard = boardState.map((row, rowIndex) =>
//         row.map((cell, cellIndex) => {
//           if (rowIndex === y && cellIndex === x && !isCastling) {
//             return {
//               name: chosenFigure.name,
//               firstMove: false,
//               [chosenFigure.name[1] === 'p' ? 'enPassant' : '']:
//                 chosenFigure.firstMove,
//             };
//           }
//           if (
//             rowIndex === chosenFigure.y &&
//             cellIndex === chosenFigure.x &&
//             !isCastling
//           )
//             return { name: '' };
//           return { ...cell, enPassant: false };
//         })
//       ) as ChessBoard;
//       if (isEnpassant && pieceToRemove) {
//         newBoard[pieceToRemove.y][pieceToRemove.x] = { name: '' };
//       }
//       if (isCastling && castlingRook && castlingKing) {
//         const { from: fromRook, to: toRook } = castlingRook;
//         const { from: fromKing, to: toKing } = castlingKing;
//         const rookToReplace = newBoard[fromRook.y][fromRook.x];
//         const kingToReplace = newBoard[fromKing.y][fromKing.x];
//         newBoard[toRook.y][toRook.x] = {
//           ...rookToReplace,
//           firstMove: false,
//         };
//         newBoard[toKing.y][toKing.x] = {
//           ...kingToReplace,
//           firstMove: false,
//         };
//         newBoard[fromRook.y][fromRook.x] = { name: '' };
//         newBoard[fromKing.y][fromKing.x] = { name: '' };
//       }
//       return newBoard;
//     },
//     [boardState, chosenFigure]
//   );

//   const isAttacked = useCallback(
//     (
//       board: ChessBoard,
//       kingX: number,
//       kingY: number,
//       currentPlayerColor?: string
//     ) => {
//       let opponentColor: string;

//       if (currentPlayerColor !== undefined) {
//         opponentColor = currentPlayerColor === 'w' ? 'b' : 'w';
//       } else {
//         opponentColor = playerColor === 'w' ? 'b' : 'w';
//       }

//       for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
//         for (
//           let cellIndex = 0;
//           cellIndex < board[rowIndex].length;
//           cellIndex += 1
//         ) {
//           if (
//             rowIndex >= 0 &&
//             rowIndex < 8 &&
//             cellIndex >= 0 &&
//             cellIndex < 8
//           ) {
//             const cell = board[rowIndex][cellIndex];
//             if (cell.name[0] === opponentColor) {
//               const figure = createFigure(
//                 { name: cell.name, firstMove: cell.firstMove || false },
//                 cellIndex,
//                 rowIndex
//               );

//               if (
//                 figure
//                   .getMoves(board)
//                   .some((move) => move.x === kingX && move.y === kingY)
//               ) {
//                 return true;
//               }
//             }
//           }
//         }
//       }
//       return false;
//     },
//     [playerColor]
//   );

//   const filteredCells = useMemo(() => {
//     return availableCells.filter((move) => {
//       const newBoard = JSON.parse(JSON.stringify(boardState)) as ChessBoard;

//       const piece = newBoard[move.from.y][move.from.x];
//       const [color, type] = piece.name;
//       // used only during development
//       // if (piece.name[0] === 'b') return true;

//       newBoard[move.from.y][move.from.x] = { name: '' };
//       newBoard[move.to.y][move.to.x] = { ...piece, firstMove: false };

//       const isKingStillSafe = !isAttacked(
//         newBoard,
//         type === 'k'
//           ? move.to.x
//           : kingPosition[playerColor === 'w' ? 'wk' : 'bk'].x,
//         type === 'k'
//           ? move.to.y
//           : kingPosition[playerColor === 'w' ? 'wk' : 'bk'].y
//       );

//       const isOppositeKingSave = !isAttacked(
//         newBoard,
//         type === 'k'
//           ? move.to.x
//           : kingPosition[playerColor === 'b' ? 'wk' : 'bk'].x,
//         type === 'k'
//           ? move.to.y
//           : kingPosition[playerColor === 'b' ? 'wk' : 'bk'].y,
//         'b'
//       );

//       return (
//         (color === playerColor && isKingStillSafe) ||
//         (!isOnline && color !== playerColor && isOppositeKingSave)
//       );
//     });
//   }, [
//     availableCells,
//     boardState,
//     isAttacked,
//     isOnline,
//     kingPosition,
//     playerColor,
//   ]);

//   const value: BoardStateContext = useMemo(
//     () => ({
//       boardState,
//       setBoardState,
//       isKingAttacked,
//       setIsKingAttacked,
//       availableCells,
//       setAvailableCells,
//       chosenFigure,
//       setChosenFigure,
//       kingPosition,
//       setKingPosition,
//       getNewBoard,
//     }),
//     [
//       availableCells,
//       boardState,
//       chosenFigure,
//       getNewBoard,
//       isKingAttacked,
//       kingPosition,
//     ]
//   );
//   return (
//     <boardContext.Provider value={value}>{children}</boardContext.Provider>
//   );
// };
