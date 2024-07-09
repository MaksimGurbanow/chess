/* eslint-disable class-methods-use-this */
import {
  Coordinates,
  FigureProps,
  FigureType,
  IFigure,
} from '../../types/types';

export default class Figure implements IFigure {
  public value: number;

  public name: FigureType;

  public isTransformable: boolean;

  public x: number;

  public y: number;

  public firstMove: boolean = true;

  public isWhite: boolean;

  constructor({
    value,
    x,
    y,
    isTransformable = false,
    isWhite,
    name,
    firstMove,
  }: FigureProps & {
    isTransformable?: boolean;
    name: FigureType;
    firstMove: boolean;
  }) {
    this.value = value;
    this.isTransformable = isTransformable;
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;
    this.name = name;
    this.firstMove = firstMove;
  }

  public filter(coords: Coordinates[]): Coordinates[] {
    return coords.filter(
      (coord) => coord.x >= 0 && coord.y >= 0 && coord.x < 8 && coord.y < 8
    );
  }

  public move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
