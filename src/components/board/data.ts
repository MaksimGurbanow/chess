import { ChessBoard } from '../../types/types';

const initialBoard: ChessBoard = [
  [
    { name: 'br', firstMove: true },
    { name: 'bn', firstMove: true },
    { name: 'bb', firstMove: true },
    { name: 'bq', firstMove: true },
    { name: 'bk', firstMove: true },
    { name: 'bb', firstMove: true },
    { name: 'bn', firstMove: true },
    { name: 'br', firstMove: true },
  ],
  [
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
    { name: 'bp', firstMove: true },
  ],
  [
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
  ],
  [
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
  ],
  [
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
  ],
  [
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
  ],
  [
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
    { name: 'wp', firstMove: true },
  ],
  [
    { name: 'wr', firstMove: true },
    { name: 'wn', firstMove: true },
    { name: 'wb', firstMove: true },
    { name: 'wq', firstMove: true },
    { name: 'wk', firstMove: true },
    { name: 'wb', firstMove: true },
    { name: 'wn', firstMove: true },
    { name: 'wr', firstMove: true },
  ],
];

export default initialBoard;