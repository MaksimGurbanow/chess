import classes from './WaitWindow.module.scss';
import { useGame } from '../../context/useGame';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import useGameSearch from '../../hooks/useGameSearch';

const WaitWindow = () => {
  const { searchingGame } = useGame();
  const { cancelGameSearch } = useGameSearch();

  if (!searchingGame) {
    return null;
  }

  return (
    <div className={classes.waitWindowPage}>
      <Loader />
      <p className={classes.message}>Searching for players...</p>
      <Button
        className={classes.waitWindowCancelButton}
        onClick={() => cancelGameSearch()}
      >
        Cancel
      </Button>
    </div>
  );
};

export default WaitWindow;
