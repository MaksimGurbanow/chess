import { ChessBoard, Color } from '../../types/types';

export default class Game {
  playerColor: Color;
  constructor(board: ChessBoard, color: Color = 'w') {
    this.playerColor = color;
  }
}
