import classNames from 'classnames';
import { useMemo, useState } from 'react';
import Row from '../Row/Row';
import classes from './Board.module.scss';
import { useGame } from '../../../../context/useGame';
import TransformPawnMenu from '../TransformPawnMenu/TransformPawnMenu';
import { Color } from '../../../../types/types';

const Board = () => {
  const { playerColor, boardHistory, currentBoardIndex } = useGame();
  const [transformInfo, setTransformInfo] = useState<{
    pawnColor: Color;
    x: number;
    y: number;
  } | null>(null);

  const boardToShow = useMemo(
    () => boardHistory[currentBoardIndex],
    [boardHistory, currentBoardIndex]
  );

  return (
    <div
      className={classNames(classes.board, {
        [classes.blackBoard]: playerColor === 'b',
      })}
    >
      {boardToShow.map((row, i) => {
        const rowKey = `row_${i}`;
        return (
          <Row
            key={rowKey}
            positions={row}
            yCoord={i}
            setTransformInfo={setTransformInfo}
          />
        );
      })}
      {/* {[
        { rowIndex: 0, pawn: 'wp', color: 'w' },
        { rowIndex: 7, pawn: 'bp', color: 'b' },
      ].map(({ rowIndex, pawn, color }) => {
        const row = boardState[rowIndex];
        const index = row.findIndex((cell) => cell.name === pawn);

        if (index === -1) return null;

        return (
          <TransformPawnMenu
            key={`transform-${rowIndex}-${index}`}
            pawnColor={color as Color}
            x={rowIndex}
            y={index}
          />
        );
      })} */}
      {transformInfo && (
        <TransformPawnMenu
          pawnColor={transformInfo.pawnColor}
          x={transformInfo.x}
          y={transformInfo.y}
          setTransformInfo={setTransformInfo}
        />
      )}
    </div>
  );
};

export default Board;
