import { useCallback, useState, DragEventHandler, useMemo } from 'react';
import { useWebsocket } from '../context/useWebsocket';
import { ChessBoard } from '../types/types';
import { WebsocketMessages } from '../utils/enums';
import { useGame } from '../context/useGame';
import { useUser } from '../context/useUser';
import useBoardHelper from './useBoardHelper';

export interface UseCellHandlersProps {
  x: number;
  y: number;
  onClick?: () => void;
  setTransformInfo?: (
    info: {
      pawnColor: 'w' | 'b';
      x: number;
      y: number;
    } | null
  ) => void;
}

const useCellHandlers = ({
  x,
  y,
  onClick,
  setTransformInfo,
}: UseCellHandlersProps) => {
  const { emitMessage } = useWebsocket();
  const {
    chosenFigure,
    gameId,
    availableCells,
    setBoardState,
    setChosenFigure,
    setAvailableCells,
    boardState,
    setPlayersMove,
    isOnline,
    setMoves,
    kingPosition,
  } = useGame();
  const { getNewBoard, isAttacked } = useBoardHelper();
  const { user } = useUser();

  const availableCell = useMemo(
    () => availableCells.find((cell) => cell.x === x && cell.y === y),
    [availableCells, x, y]
  );
  const onlineHandler = useCallback(() => {
    console.log(chosenFigure, 123);
    if (!chosenFigure) return;
    emitMessage(WebsocketMessages.Move, {
      gameId,
      userId: user?.id,
      move: {
        ...availableCell,
        name: chosenFigure.name,
        firstMove: chosenFigure.firstMove,
        enPassant:
          chosenFigure.name[1] === 'p' ? chosenFigure.firstMove : false,
        castlingRook: availableCell?.castlingRook,
        castlingKing: availableCell?.castlingKing,
        pieceToRemove: availableCell?.pieceToRemove,
      },
      // chosenFigure,
    });
  }, [availableCell, chosenFigure, emitMessage, gameId, user?.id]);
  const [isDragEntered, setIsDragEntered] = useState(false);
  const offlineHandler = useCallback(() => {
    if (!chosenFigure || !availableCell) return;
    const newBoard = getNewBoard({
      move: availableCell,
      x,
      y,
      chosenFigure,
      oldBoard: boardState,
    }) as ChessBoard;
    setBoardState(newBoard);
    setPlayersMove((prev: boolean) => !prev);
    setChosenFigure(null);
    setAvailableCells([]);
    setMoves((prev) =>
      prev.concat({
        from: { x: chosenFigure.x, y: chosenFigure.y },
        to: { x: availableCell.x, y: availableCell.y },
        isCaptured: !!boardState[availableCell.y][availableCell.x].name,
        isChecked:
          isAttacked({
            board: newBoard,
            playerColor: 'b',
            kingX: kingPosition.bk.x,
            kingY: kingPosition.bk.y,
          }) ||
          isAttacked({
            board: newBoard,
            playerColor: 'w',
            kingX: kingPosition.wk.x,
            kingY: kingPosition.wk.y,
          }),
      })
    );
  }, [
    availableCell,
    boardState,
    chosenFigure,
    getNewBoard,
    isAttacked,
    kingPosition.bk.x,
    kingPosition.bk.y,
    kingPosition.wk.x,
    kingPosition.wk.y,
    setAvailableCells,
    setBoardState,
    setChosenFigure,
    setMoves,
    setPlayersMove,
    x,
    y,
  ]);
  const moveHandler = useCallback(() => {
    if (onClick) {
      onClick();
      return;
    }
    if (!chosenFigure || !availableCell) return;

    if (setTransformInfo) {
      if (
        (chosenFigure.name === 'wp' && y === 0) ||
        (chosenFigure.name === 'bp' && y === 7)
      ) {
        setTransformInfo({
          pawnColor: chosenFigure.name[0] as 'w' | 'b',
          x: y,
          y: x,
        });
        return;
      }
      setTransformInfo(null);
    }
    if (isOnline) {
      onlineHandler();
    } else {
      offlineHandler();
    }
  }, [
    availableCell,
    chosenFigure,
    isOnline,
    offlineHandler,
    onClick,
    onlineHandler,
    setTransformInfo,
    x,
    y,
  ]);
  const handleDragEnter: DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (!availableCell) return;
      setIsDragEntered(true);
    },
    [availableCell]
  );
  const handleDragLeave: DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (!availableCell) return;
      setIsDragEntered(false);
    },
    [availableCell]
  );

  return {
    moveHandler,
    handleDragEnter,
    handleDragLeave,
    isDragEntered,
    availableCell,
  };
};

export default useCellHandlers;
