import cn from 'classnames';
import { Check, X } from 'react-bootstrap-icons';
import classes from './GameOfferAlert.module.scss';
import { useGame } from '../../context/useGame';
import UserAvatar from '../../routes/Main/components/UserAvatar/UserAvatar';
import useGameSearch from '../../hooks/useGameSearch';

const GameOfferAlert = () => {
  const { gameOffer } = useGame();
  const { acceptGameOffer, rejectGameOffer } = useGameSearch();

  return (
    <div
      className={cn(classes.gameOfferAlert, { [classes.active]: gameOffer })}
    >
      <div className={classes.gameOfferAlertContainer}>
        <UserAvatar />
        <p className={classes.gameOfferAlertText}>
          {gameOffer ? `${gameOffer} has offered you a game` : ''}
        </p>
        <div className={classes.gameOfferAlertButtons}>
          <Check
            width={30}
            height={30}
            className={classes.gameOfferAlertCheck}
            onClick={acceptGameOffer}
          />
          <X
            width={30}
            height={30}
            className={classes.gameOfferAlertCancel}
            onClick={rejectGameOffer}
          />
        </div>
      </div>
    </div>
  );
};

export default GameOfferAlert;
