import useSound from 'use-sound';
import { useEffect } from 'react';
import moveSoundSrc from '../assets/audio/move.mp3';
import captureSoundSrc from '../assets/audio/capture.mp3';
import notifySoundSrc from '../assets/audio/notify.mp3';
import { Coordinates } from '../types/types';
import { useUser } from '../context/useUser';

const useSoundControler = ({
  moves,
  gameId,
}: {
  moves: {
    from: Coordinates;
    to: Coordinates;
    isCaptured?: boolean;
    isChecked?: boolean;
  }[];
  gameId: string;
}) => {
  const [moveSound] = useSound(moveSoundSrc);
  const [captureSound] = useSound(captureSoundSrc);
  const [notifySound] = useSound(notifySoundSrc);
  const { user } = useUser();

  useEffect(() => {
    if (moves.length && gameId && user) {
      const lastMove = moves[moves.length - 1];
      if (lastMove.isCaptured) {
        captureSound();
      } else if (lastMove.isChecked) {
        notifySound();
      } else {
        moveSound();
      }
    }
  }, [captureSound, gameId, moveSound, moves, notifySound, user]);
};
export default useSoundControler;
