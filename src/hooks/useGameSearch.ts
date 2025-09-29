import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameSearchProps } from '../types/types';
import { WebsocketMessages } from '../utils/enums';
import { useWebsocket } from '../context/useWebsocket';
import { useGame } from '../context/useGame';
import initialBoard from '../routes/Main/components/Board/data';
import { useUser } from '../context/useUser';

const useGameSearch = () => {
  const { emitMessage, onMessage } = useWebsocket();
  const {
    setSearchingGame,
    setPlayerColor,
    setPlayersMove,
    setGameId,
    setIsOnline,
    setBoardState,
    setGameResult,
    searchingGame,
    setGameOffer,
    gameOffer,
  } = useGame();
  const { user } = useUser();
  const navigate = useNavigate();

  // const handleCreateGameMessage = useCallback(() => {
  //   onMessage(WebsocketMessages.CreateGame, (payload) => {
  //     setSearchingGame(false);
  //     const { game } = payload;
  //     setBoardState(game.gameState.board);
  //     setPlayerColor(game.isWhite ? 'w' : 'b');
  //     setPlayersMove(game.isPlayerTurn);
  //     setGameId(game.gameId);
  //     setPlayerId(game.playerId);
  //     setOpponentId(game.opponentId);
  //     setIsOnline(true);
  //     navigate('/main');
  //     setGameResult({
  //       finished: false,
  //       reason: '',
  //       result: '',
  //       whoWon: '',
  //     });
  //   });
  // }, [
  //   navigate,
  //   onMessage,
  //   setBoardState,
  //   setGameId,
  //   setGameResult,
  //   setIsOnline,
  //   setOpponentId,
  //   setPlayerColor,
  //   setPlayerId,
  //   setPlayersMove,
  //   setSearchingGame,
  // ]);
  const initGame = useCallback(
    (props: GameSearchProps) => {
      console.log(props);
      if (props!.isOnline) {
        emitMessage(WebsocketMessages.StartSearch, {
          ...(props.opponentId
            ? {
                opponentId: props.opponentId,
              }
            : {}),
          userId: user?.id,
        });

        onMessage(WebsocketMessages.StartSearch, () => {
          setSearchingGame(true);
        });
      } else {
        setBoardState(initialBoard);
        setSearchingGame(false);
        setPlayerColor('w');
        setPlayersMove(true);
        setGameId('offline');
        setIsOnline(false);
        navigate('/main');
        setGameResult({ finished: false, reason: '', result: '', whoWon: '' });
      }
    },
    [
      emitMessage,
      navigate,
      onMessage,
      setBoardState,
      setGameId,
      setGameResult,
      setIsOnline,
      setPlayerColor,
      setPlayersMove,
      setSearchingGame,
      user?.id,
    ]
  );

  const cancelGameSearch = useCallback(() => {
    if (searchingGame) {
      emitMessage(WebsocketMessages.CancelSearch, { userId: user?.id });
      onMessage(WebsocketMessages.CancelSearch, () => {
        setSearchingGame(false);
        setGameResult({ finished: false, reason: '', result: '', whoWon: '' });
      });
    }
  }, [
    emitMessage,
    onMessage,
    searchingGame,
    setGameResult,
    setSearchingGame,
    user?.id,
  ]);

  const acceptGameOffer = useCallback(() => {
    if (!gameOffer) return;
    emitMessage(WebsocketMessages.AcceptGameOffer, {
      gameOffer: true,
      opponentId: gameOffer.userId,
      opponentClientId: gameOffer.clientId,
      userId: user?.id,
      opponentUserId: gameOffer,
    });
  }, [emitMessage, gameOffer, user?.id]);

  const rejectGameOffer = useCallback(() => {
    emitMessage(WebsocketMessages.RejectGameOffer, { userId: user?.id });
    setGameOffer(null);
  }, [emitMessage, setGameOffer, user?.id]);

  return { initGame, cancelGameSearch, acceptGameOffer, rejectGameOffer };
};

export default useGameSearch;
