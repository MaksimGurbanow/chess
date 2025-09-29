import cn from 'classnames';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './GameOverMenu.module.scss';
import { useGame } from '../../../../context/useGame';
import useBoardHelper from '../../../../hooks/useBoardHelper';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from '../../../../components/Button/Button';
import useGameSearch from '../../../../hooks/useGameSearch';

const GameOverMenu = () => {
  const { gameResult, isOnline, opponentId } = useGame();
  const { defineGameResult } = useBoardHelper();
  const { initGame } = useGameSearch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   return setGameResult({
  //     result: 'win',
  //     finished: true,
  //     reason: 'checkmate',
  //     whoWon: '',
  //   });
  // }, []);

  const getScore = useCallback(() => {
    switch (gameResult.result) {
      case 'win':
        return '1 - 0';
      case 'lose':
        return '0 - 1';
      case 'draw':
        return '1/2 - 1/2';
      default:
        return '0 - 0';
    }
  }, [gameResult.result]);

  if (!gameResult.finished) return null;
  return (
    <div className={cn(classes.gameOverMenuContainer)}>
      <div className={cn(classes.gameOverMenuTitleBlock)}>
        <h3 className={cn(classes.gameOverMenuTitle)}>{gameResult.result}</h3>
        <h4 className={cn(classes.gameOverSubTitle)}>
          {defineGameResult(gameResult)}
        </h4>
      </div>
      <div className={cn(classes.gameOverMenuUsers)}>
        <UserAvatar />
        <div className={cn(classes.gameOverMenuScore)}>{getScore()}</div>
        <UserAvatar />
      </div>
      <div className={cn(classes.gameOverMenuButtonContainer)}>
        <Button
          className={classes.gameOverMenuButton}
          onClick={() => initGame({ isOnline })}
        >
          Start new game
        </Button>
        <Button
          className={classes.gameOverMenuButton}
          onClick={() => {
            if (opponentId) {
              initGame({
                isOnline,
                opponentId,
              });
            }
          }}
        >
          Rematch
        </Button>
        <Button
          className={cn(classes.gameOverMenuButton, classes.goToMainMenu)}
          onClick={() => navigate('/')}
        >
          Go To main Menu
        </Button>
      </div>
    </div>
  );
};

export default GameOverMenu;
