import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
import { OnMessagePayloadType, useWebsocket } from '../context/useWebsocket';
import { WebsocketMessages } from '../utils/enums';
import notifySoundSrc from '../assets/audio/notify.mp3';
import {
  Color,
  ChessBoard,
  Move,
  GameResult,
  Coordinates,
} from '../types/types';
import King from '../app/figures/King';
import Bishop from '../app/figures/Bishop';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';

type ChessPiece = King | Queen | Pawn | Bishop | Rook | Knight;

export interface UseBoardMoveControllerProps {
  setPlayerColor: Dispatch<SetStateAction<Color>>;
  setBoardState: Dispatch<SetStateAction<ChessBoard>>;
  setAvailableCells: Dispatch<SetStateAction<Move[]>>;
  setChosenFigure: Dispatch<SetStateAction<ChessPiece | null>>;
  setSearchingGame: Dispatch<SetStateAction<boolean>>;
  setGameId: Dispatch<SetStateAction<string>>;
  setIsOnline: Dispatch<SetStateAction<boolean>>;
  setPlayersMove: Dispatch<SetStateAction<boolean>>;
  setPlayerId: Dispatch<SetStateAction<string | null>>;
  setOpponentId: Dispatch<SetStateAction<string | null>>;
  setGameResult: Dispatch<SetStateAction<GameResult>>;
  setGameOffer: Dispatch<
    SetStateAction<{
      clientId: string;
      userId: string;
    } | null>
  >;
  isOnline: boolean;
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
}

const useBoardMoveController = ({
  setBoardState,
  setChosenFigure,
  setPlayersMove,
  setAvailableCells,
  setGameOffer,
  setGameResult,
  setSearchingGame,
  setPlayerColor,
  setGameId,
  setPlayerId,
  setOpponentId,
  setIsOnline,
  setMoves,
}: UseBoardMoveControllerProps) => {
  const [notifySound] = useSound(notifySoundSrc);
  const { onMessage } = useWebsocket();
  const navigate = useNavigate();

  const handleMove = useCallback(
    <
      T extends
        | OnMessagePayloadType['move']
        | OnMessagePayloadType['transform-pawn'],
    >(
      payload: T
    ) => {
      const { game, move } = payload;
      setBoardState(game.gameState.board);
      setPlayersMove(game.isPlayerTurn);
      setChosenFigure(null);
      setAvailableCells([]);
      setMoves((prev) =>
        prev.concat({
          from: move.from,
          to: move.to,
          isCaptured: game.gameState.isCaptured,
          isChecked:
            game.gameState.checkStatus.isCheck &&
            game.gameState.checkStatus.whoIsChecked === game.playerId,
        })
      );
    },
    [
      setAvailableCells,
      setBoardState,
      setChosenFigure,
      setMoves,
      setPlayersMove,
    ]
  );
  const handleGameOver = useCallback(
    (payload: OnMessagePayloadType['game-over']) => {
      const { gameResult: serverGameResult } = payload;
      setGameOffer(null);
      setGameResult(serverGameResult);
    },
    [setGameOffer, setGameResult]
  );

  const handleGameOffer = useCallback(
    (payload: OnMessagePayloadType['game-offer']) => {
      const { opponent } = payload;
      notifySound();
      setGameOffer({ clientId: opponent.clientId, userId: opponent.userId });
    },
    [notifySound, setGameOffer]
  );
  const initializeGame = useCallback(
    <
      T extends
        | OnMessagePayloadType['get-game']
        | OnMessagePayloadType['create-game'],
    >({
      game,
    }: T) => {
      setSearchingGame(false);
      setGameOffer(null);
      setBoardState(game.gameState.board);
      setPlayerColor(game.isWhite ? 'w' : 'b');
      setPlayersMove(game.isPlayerTurn);
      setGameId(game.gameId);
      setPlayerId(game.playerId);
      setOpponentId(game.opponentId);
      setIsOnline(true);
      setMoves([]);
      navigate('/main');
      setGameResult({
        finished: false,
        reason: '',
        result: '',
        whoWon: '',
      });
    },
    [
      navigate,
      setBoardState,
      setGameId,
      setGameOffer,
      setGameResult,
      setIsOnline,
      setMoves,
      setOpponentId,
      setPlayerColor,
      setPlayerId,
      setPlayersMove,
      setSearchingGame,
    ]
  );
  useEffect(() => {
    const cleanups = [
      onMessage(WebsocketMessages.Move, handleMove),
      onMessage(WebsocketMessages.TransformPawn, handleMove),
      onMessage(WebsocketMessages.GameOver, handleGameOver),
      onMessage(WebsocketMessages.GameOffer, handleGameOffer),
      onMessage(WebsocketMessages.CreateGame, initializeGame),
      onMessage(WebsocketMessages.GetGame, initializeGame),
    ];
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [handleGameOffer, handleGameOver, handleMove, initializeGame, onMessage]);
};

export default useBoardMoveController;
