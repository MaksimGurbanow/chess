/* eslint-disable import/prefer-default-export */
export enum WebsocketMessages {
  StartSearch = 'start-search',
  CancelSearch = 'cancel-search',
  CreateGame = 'create-game',
  Move = 'move',
  TransformPawn = 'transform-pawn',
  GameOver = 'game-over',
  DrawOffer = 'draw-offer',
  AcceptDraw = 'accept-draw',
  Surrender = 'surrender',
  GameOffer = 'game-offer',
  AcceptGameOffer = 'accept-game-offer',
  RejectGameOffer = 'reject-game-offer',
  GetGame = 'get-game',
}
