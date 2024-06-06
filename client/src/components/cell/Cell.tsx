import { FigureType } from '../../types/types';
import Figure from '../figure/Figure';
import './cell.css';

const Cell = ({ figure }: { figure: FigureType }) => {
  return (
    <div className="cell">
      {figure ? <Figure figure={figure[1]} color={figure[0]} /> : null}
    </div>
  );
};

export default Cell;
