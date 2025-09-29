import { useState } from 'react';
import Board from './components/Board/Board';
import ControlBar from './components/ControlBar/ControlBar';
import GameOverMenu from './components/GameOverMenu/GameOverMenu';

const Main = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClose();
    }
  };

  return (
    <div
      className="page main"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <Board />
      <GameOverMenu />
      <ControlBar setShowSettings={setShow} showSettings={show} />
    </div>
  );
};

export default Main;
