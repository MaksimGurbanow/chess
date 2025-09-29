import { useState } from 'react';
import Button from '../../../../components/Button/Button';
// import Description from '../description/Description';
import classes from './Content.module.scss';
import { useWebsocket } from '../../../../context/useWebsocket';
import Alert from '../../../../components/Alert/Alert';
import useGameSearch from '../../../../hooks/useGameSearch';

const Content = () => {
  const { isConnected } = useWebsocket();
  const { initGame } = useGameSearch();
  const [error, setError] = useState('');

  return (
    <div className={classes.content}>
      {/* <Description /> */}
      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError('')}
          duration={3000}
        />
      )}
      <div className={classes.buttonList}>
        <Button onClick={() => initGame({ isOnline: false })}>
          Play on same device
        </Button>
        <Button
          onClick={() => initGame({ isOnline: true })}
          style={{
            opacity: isConnected ? 1 : 0.4,
            cursor: isConnected ? 'pointer' : 'not-allowed',
          }}
        >
          Play online
        </Button>
      </div>
    </div>
  );
};

export default Content;
