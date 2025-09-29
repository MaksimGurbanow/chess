import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import classes from './TransformPawnMenu.module.scss';
import Cell from '../Cell/Cell';
import { ChessBoard, Color, FigureType } from '../../../../types/types';
import { useGame } from '../../../../context/useGame';
import { useWebsocket } from '../../../../context/useWebsocket';
import { WebsocketMessages } from '../../../../utils/enums';
import { useUser } from '../../../../context/useUser';

const TransformPawnMenu = ({
  pawnColor,
  y,
  x,
  setTransformInfo,
}: {
  pawnColor: Color;
  x: number;
  y: number;
  setTransformInfo: (
    info: { pawnColor: Color; x: number; y: number } | null
  ) => void;
}) => {
  const {
    setAvailableCells,
    boardState,
    setBoardState,
    setPlayersMove,
    chosenFigure,
    isOnline,
    gameId,
  } = useGame();
  const { user } = useUser();
  const { emitMessage } = useWebsocket();
  const transformPawn = useCallback(
    (figureType: FigureType) => {
      if (isOnline) {
        emitMessage(
          WebsocketMessages.TransformPawn,
          {
            gameId,
            userId: user?.id,
            move: {
              from: { x: chosenFigure?.y, y: chosenFigure?.x },
              to: { x, y },
              newFigureName: figureType,
            },
          },
          () => {
            setTransformInfo(null);
          }
        );
        return;
      }
      const newBoard = boardState.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (rowIndex === x && cellIndex === y) {
            return { name: figureType, firstMove: false };
          }
          if (chosenFigure) {
            console.log(
              `Chosen figure: ${chosenFigure.name}, at position: (${chosenFigure.x}, ${chosenFigure.y})`
            );
          }
          if (
            chosenFigure &&
            chosenFigure.y === rowIndex &&
            chosenFigure.x === cellIndex
          ) {
            // If the cell is the chosen figure, we reset it
            return { name: '', firstMove: false };
          }
          return cell;
        })
      ) as ChessBoard;
      setBoardState(newBoard);
      setAvailableCells([]);
      setPlayersMove(false);
      setTransformInfo(null);
    },
    [
      boardState,
      chosenFigure,
      emitMessage,
      gameId,
      isOnline,
      setAvailableCells,
      setBoardState,
      setPlayersMove,
      setTransformInfo,
      user?.id,
      x,
      y,
    ]
  );

  const transform = useMemo(() => {
    let translateY: number;

    if (!isOnline) {
      if (pawnColor === 'w') {
        translateY = -120;
      } else {
        translateY = 820;
      }
    } else {
      translateY = -120;
    }

    const translateX = y > 3 ? 103 : 0;

    return `translateY(${translateY}%) translateX(${translateX}%)`;
  }, [isOnline, pawnColor, y]);

  return (
    <div
      className={cn(classes.menuContainer)}
      style={{
        transform,
      }}
    >
      <div className={classes.menu}>
        {['r', 'b', 'q', 'n'].map((figure) => (
          <Cell
            figure={{
              name: (pawnColor + figure) as FigureType,
              firstMove: false,
            }}
            x={999}
            y={999}
            className={classes.menuCell}
            key={figure}
            onClick={() => transformPawn((pawnColor + figure) as FigureType)}
          />
        ))}
      </div>
    </div>
  );
};

export default TransformPawnMenu;
